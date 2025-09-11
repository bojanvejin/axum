import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Quiz, CurriculumLesson } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
  lesson_id: z.string().uuid().nullable().optional(), // Added lesson_id
});

interface QuizFormProps {
  quiz?: Quiz | null;
  onSuccess: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSuccess }) => {
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      lesson_id: null, // Default for new field
    },
  });

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase.from('lessons').select('id, title').order('title');
      if (error) {
        showError('Failed to load lessons.');
      } else {
        setLessons(data || []);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    form.reset({
      title: quiz?.title || '',
      description: quiz?.description || '',
      lesson_id: quiz?.lesson_id || null, // Reset for new field
    });
  }, [quiz, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = { ...values, lesson_id: values.lesson_id || null };
      if (quiz) {
        const { error } = await supabase.from('quizzes').update(payload).eq('id', quiz.id);
        if (error) throw error;
        showSuccess('Quiz updated successfully!');
      } else {
        const { error } = await supabase.from('quizzes').insert(payload);
        if (error) throw error;
        showSuccess('Quiz added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save quiz: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Quiz Title" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Brief description of the quiz" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="lesson_id" render={({ field }) => (
          <FormItem><FormLabel>Associated Lesson</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || ''}><FormControl><SelectTrigger><SelectValue placeholder="Select a lesson (optional)" /></SelectTrigger></FormControl><SelectContent><SelectItem value="">No Associated Lesson</SelectItem>{lessons.map(l => (<SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Quiz'}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;