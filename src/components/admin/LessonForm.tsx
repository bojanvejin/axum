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
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  objectives: z.string().optional(),
  content_html: z.string().optional(),
  video_url: z.string().url().optional().or(z.literal('')),
  resources_url: z.string().url().optional().or(z.literal('')),
  order_index: z.coerce.number().min(0),
  module_id: z.string().uuid(),
  quiz_id: z.string().uuid().nullable().optional(),
});

interface LessonFormProps {
  moduleId: string;
  lesson?: CurriculumLesson | null;
  onSuccess: () => void;
}

interface Quiz {
  id: string;
  title: string;
}

const LessonForm: React.FC<LessonFormProps> = ({ moduleId, lesson, onSuccess }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { t } = useLanguage(); // Use translation hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      objectives: '',
      content_html: '',
      video_url: '',
      resources_url: '',
      order_index: 0,
      module_id: moduleId,
      quiz_id: null,
    },
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase.from('quizzes').select('id, title');
      if (error) {
        showError(t('failed_to_load_quizzes'));
      } else {
        setQuizzes(data || []);
      }
    };
    fetchQuizzes();
  }, [t]);

  useEffect(() => {
    if (lesson) {
      form.reset({ ...lesson, quiz_id: lesson.quiz_id || null });
    } else {
      form.reset({
        title: '',
        objectives: '',
        content_html: '',
        video_url: '',
        resources_url: '',
        order_index: 0,
        module_id: moduleId,
        quiz_id: null,
      });
    }
  }, [lesson, moduleId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = { ...values, quiz_id: values.quiz_id || null };
      if (lesson) {
        const { error } = await supabase.from('lessons').update(payload).eq('id', lesson.id);
        if (error) throw error;
        showSuccess(t('lesson_updated_successfully'));
      } else {
        const { error } = await supabase.from('lessons').insert(payload);
        if (error) throw error;
        showSuccess(t('lesson_added_successfully'));
      }
      onSuccess();
    } catch (error: any) {
      showError(t('failed_to_save_lesson', { message: error.message }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>{t('title')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="objectives" render={({ field }) => (
          <FormItem><FormLabel>{t('objectives')}</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="content_html" render={({ field }) => (
          <FormItem><FormLabel>{t('content_html')}</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="video_url" render={({ field }) => (
          <FormItem><FormLabel>{t('video_url')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="resources_url" render={({ field }) => (
          <FormItem><FormLabel>{t('resources_url')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="quiz_id" render={({ field }) => (
          <FormItem><FormLabel>{t('quiz')}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || ''}><FormControl><SelectTrigger><SelectValue placeholder={t('select_a_quiz')} /></SelectTrigger></FormControl><SelectContent><SelectItem value="">{t('no_quiz')}</SelectItem>{quizzes.map(q => (<SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="order_index" render={({ field }) => (
          <FormItem><FormLabel>{t('order_index')}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('saving') : t('save_lesson')}
        </Button>
      </form>
    </Form>
  );
};

export default LessonForm;