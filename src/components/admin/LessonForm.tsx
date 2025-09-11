import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  objectives: z.string().optional(),
  content_html: z.string().optional(),
  video_url: z.string().url().optional().or(z.literal('')),
  resources_url: z.string().url().optional().or(z.literal('')),
  order_index: z.coerce.number().min(0),
  session_id: z.string().uuid(), // Changed from module_id
  quiz_id: z.string().uuid().nullable().optional(),
  week_number: z.coerce.number().min(1).optional(), // New field
  day_number: z.coerce.number().min(1).optional(), // New field
});

interface LessonFormProps {
  sessionId: string; // Changed from moduleId
  lesson?: CurriculumLesson | null;
  onSuccess: () => void;
}

interface Quiz {
  id: string;
  title: string;
}

const LessonForm: React.FC<LessonFormProps> = ({ sessionId, lesson, onSuccess }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      objectives: '',
      content_html: '',
      video_url: '',
      resources_url: '',
      order_index: 0,
      session_id: sessionId, // Changed from module_id
      quiz_id: null,
      week_number: undefined,
      day_number: undefined,
    },
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase.from('quizzes').select('id, title');
      if (error) {
        showError('Failed to load quizzes.');
      } else {
        setQuizzes(data || []);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (lesson) {
      form.reset({
        ...lesson,
        session_id: lesson.session_id, // Ensure session_id is set
        quiz_id: lesson.quiz_id || null,
        week_number: lesson.week_number || undefined,
        day_number: lesson.day_number || undefined,
      });
    } else {
      form.reset({
        title: '',
        objectives: '',
        content_html: '',
        video_url: '',
        resources_url: '',
        order_index: 0,
        session_id: sessionId, // Ensure session_id is set for new lessons
        quiz_id: null,
        week_number: undefined,
        day_number: undefined,
      });
    }
  }, [lesson, sessionId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = { ...values, quiz_id: values.quiz_id || null };
      if (lesson) {
        const { error } = await supabase.from('lessons').update(payload).eq('id', lesson.id);
        if (error) throw error;
        showSuccess('Lesson updated successfully!');
      } else {
        const { error } = await supabase.from('lessons').insert(payload);
        if (error) throw error;
        showSuccess('Lesson added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save lesson: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="objectives" render={({ field }) => (
          <FormItem><FormLabel>Objectives</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="content_html" render={({ field }) => (
          <FormItem><FormLabel>Content (HTML)</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="video_url" render={({ field }) => (
          <FormItem><FormLabel>Video URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="resources_url" render={({ field }) => (
          <FormItem><FormLabel>Resources URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="quiz_id" render={({ field }) => (
          <FormItem><FormLabel>Quiz</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || ''}><FormControl><SelectTrigger><SelectValue placeholder="Select a quiz" /></SelectTrigger></FormControl><SelectContent><SelectItem value="">No Quiz</SelectItem>{quizzes.map(q => (<SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="order_index" render={({ field }) => (
          <FormItem><FormLabel>Order Index</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="week_number" render={({ field }) => (
            <FormItem><FormLabel>Week Number</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="day_number" render={({ field }) => (
            <FormItem><FormLabel>Day Number</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Lesson'}
        </Button>
      </form>
    </Form>
  );
};

export default LessonForm;