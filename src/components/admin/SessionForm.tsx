import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumSession } from '@/data/curriculum';
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
  session_number: z.coerce.number().min(1, { message: 'Session number must be at least 1.' }),
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
  topics: z.string().optional().transform(val => val ? val.split('\n').map(s => s.trim()).filter(s => s.length > 0) : []),
  assignments: z.string().optional().transform(val => val ? val.split('\n').map(s => s.trim()).filter(s => s.length > 0) : []),
  covers_days: z.string().optional().transform(val => val ? val.split(',').map(Number).filter(n => !isNaN(n) && n > 0) : []),
});

interface SessionFormProps {
  session?: CurriculumSession | null;
  onSuccess: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      session_number: session?.session_number || 1,
      title: session?.title || '',
      description: session?.description || '',
      topics: session?.topics?.join('\n') || '',
      assignments: session?.assignments?.join('\n') || '',
      covers_days: session?.covers_days?.join(',') || '',
    },
  });

  useEffect(() => {
    if (session) {
      form.reset({
        session_number: session.session_number,
        title: session.title,
        description: session.description || '',
        topics: session.topics?.join('\n') || '',
        assignments: session.assignments?.join('\n') || '',
        covers_days: session.covers_days?.join(',') || '',
      });
    } else {
      form.reset({
        session_number: 1,
        title: '',
        description: '',
        topics: '',
        assignments: '',
        covers_days: '',
      });
    }
  }, [session, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        session_number: values.session_number,
        title: values.title,
        description: values.description,
        topics: values.topics,
        assignments: values.assignments,
        covers_days: values.covers_days,
      };

      if (session) {
        const { error } = await supabase
          .from('sessions')
          .update(payload)
          .eq('id', session.id);

        if (error) throw error;
        showSuccess('Session updated successfully!');
      } else {
        const { error } = await supabase
          .from('sessions')
          .insert(payload);

        if (error) throw error;
        showSuccess('Session added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save session: ${error.message}`);
      console.error('Error saving session:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="session_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Session Title" {...field} />
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
                <Textarea placeholder="Brief description of the session" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topics (one per line)</FormLabel>
              <FormControl>
                <Textarea placeholder="Topic 1\nTopic 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignments (one per line)</FormLabel>
              <FormControl>
                <Textarea placeholder="Assignment 1\nAssignment 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="covers_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Covers Days (comma-separated numbers)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1,2,3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : (session ? 'Update Session' : 'Add Session')}
        </Button>
      </form>
    </Form>
  );
};

export default SessionForm;