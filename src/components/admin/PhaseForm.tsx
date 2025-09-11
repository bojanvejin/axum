import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
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
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

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
  const { t } = useLanguage(); // Use translation hook
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
        const { error } = await supabase
          .from('phases')
          .update(values)
          .eq('id', phase.id);

        if (error) throw error;
        showSuccess(t('phase_updated_successfully'));
      } else {
        const { error } = await supabase
          .from('phases')
          .insert(values);

        if (error) throw error;
        showSuccess(t('phase_added_successfully'));
      }
      onSuccess();
    } catch (error: any) {
      showError(t('failed_to_save_phase', { message: error.message }));
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
              <FormLabel>{t('title')}</FormLabel>
              <FormControl>
                <Input placeholder={t('phase_title')} {...field} />
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
              <FormLabel>{t('description')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('description')} {...field} />
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
              <FormLabel>{t('duration_weeks_label')}</FormLabel>
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
              <FormLabel>{t('order_index')}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('saving') : (phase ? t('update_phase') : t('add_phase'))}
        </Button>
      </form>
    </Form>
  );
};

export default PhaseForm;