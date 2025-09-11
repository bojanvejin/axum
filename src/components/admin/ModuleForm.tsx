import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule } from '@/data/curriculum';
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
  order_index: z.coerce.number().min(0, { message: 'Order index cannot be negative.' }),
  phase_id: z.string().uuid({ message: 'Invalid Phase ID.' }), // Hidden field, but required
});

interface ModuleFormProps {
  phaseId: string;
  module?: CurriculumModule | null;
  onSuccess: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ phaseId, module, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: module?.title || '',
      description: module?.description || '',
      order_index: module?.order_index || 0,
      phase_id: phaseId, // Pre-fill phase_id
    },
  });

  useEffect(() => {
    if (module) {
      form.reset({
        title: module.title,
        description: module.description || '',
        order_index: module.order_index,
        phase_id: module.phase_id,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        order_index: 0,
        phase_id: phaseId, // Ensure phaseId is set for new modules
      });
    }
  }, [module, phaseId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (module) {
        // Update existing module
        const { error } = await supabase
          .from('modules')
          .update(values)
          .eq('id', module.id);

        if (error) throw error;
        showSuccess('Module updated successfully!');
      } else {
        // Insert new module
        const { error } = await supabase
          .from('modules')
          .insert(values);

        if (error) throw error;
        showSuccess('Module added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save module: ${error.message}`);
      console.error('Error saving module:', error);
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
                <Input placeholder="Module Title" {...field} />
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
                <Textarea placeholder="Brief description of the module" {...field} />
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
        {/* Hidden field for phase_id */}
        <FormField
          control={form.control}
          name="phase_id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Phase ID</FormLabel>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : (module ? 'Update Module' : 'Add Module')}
        </Button>
      </form>
    </Form>
  );
};

export default ModuleForm;