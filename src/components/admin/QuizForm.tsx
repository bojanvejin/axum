import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Quiz } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { showError, showSuccess } from '@/utils/toast';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
});

interface QuizFormProps {
  quiz?: Quiz | null;
  onSuccess: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSuccess }) => {
  const { t } = useLanguage(); // Use translation hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    form.reset({
      title: quiz?.title || '',
      description: quiz?.description || '',
    });
  }, [quiz, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (quiz) {
        const { error } = await supabase.from('quizzes').update(values).eq('id', quiz.id);
        if (error) throw error;
        showSuccess(t('quiz_updated_successfully'));
      } else {
        const { error } = await supabase.from('quizzes').insert(values);
        if (error) throw error;
        showSuccess(t('quiz_added_successfully'));
      }
      onSuccess();
    } catch (error: any) {
      showError(t('failed_to_save_quiz', { message: error.message }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>{t('title')}</FormLabel><FormControl><Input placeholder={t('quiz_title')} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>{t('description')}</FormLabel><FormControl><Textarea placeholder={t('description')} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('saving') : t('save_quiz')}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;