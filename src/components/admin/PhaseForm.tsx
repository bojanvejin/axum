import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'; // Firestore imports
import { CurriculumPhase } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
  weeks: z.coerce.number().min(1, { message: 'Weeks must be at least 1.' }),
  order_index: z.coerce.number().min(0, { message: 'Order index cannot be negative.' }),
});

interface PhaseFormProps {
  phase?: CurriculumPhase | null;
  onSuccess: () => void;
}

const PhaseForm: React.FC<PhaseFormProps> = ({ phase, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: phase?.title || '',
      description: phase?.description || '',
      weeks: phase?.weeks || 1,
      order_index: phase?.order_index || 0,
    },
  });

  useEffect(() => {
    if (phase) {
      form.reset({
        title: phase.title,
        description: phase.description || '',
        weeks: phase.weeks,
        order_index: phase.order_index,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        weeks: 1,
        order_index: 0,
      });
    }
  }, [phase, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (phase) {
        // Update existing phase
        const phaseDocRef = doc(db, 'phases', phase.id);
        await updateDoc(phaseDocRef, values);
        showSuccess('Phase updated successfully!');
      } else {
        // Insert new phase
        await addDoc(collection(db, 'phases'), values);
        showSuccess('Phase added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save phase: ${error.message}`);
      console.error('Error saving phase:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Phase Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description of the phase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weeks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (Weeks)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order_index"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Index</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : (phase ? 'Update Phase' : 'Add Phase')}
        </Button>
      </form>
    </Form>
  );
};

export default PhaseForm;