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
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
  order_index: z.coerce.number().min(0, { message: 'Order index cannot be negative.' }),
  phase_id: z.string().uuid({ message: 'Invalid Phase ID.' }),
});

interface ModuleFormProps {
  phaseId: string;
  module?: CurriculumModule | null;
  onSuccess: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ phaseId, module, onSuccess }) => {
  const { t } = useLanguage(); // Use translation hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: module?.title || '',
      description: module?.description || '',
      order_index: module?.order_index || 0,
      phase_id: phaseId,
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
        phase_id: phaseId,
      });
    }
  }, [module, phaseId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (module) {
        const { error } = await supabase
          .from('modules')
          .update(values)
          .eq('id', module.id);

        if (error) throw error;
        showSuccess(t('module_updated_successfully'));
      } else {
        const { error } = await supabase
          .from('modules')
          .insert(values);

        if (error) throw error;
        showSuccess(t('module_added_successfully'));
      }
      onSuccess();
    } catch (error: any) {
      showError(t('failed_to_save_module', { message: error.message }));
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
              <FormLabel>{t('title')}</FormLabel>
              <FormControl>
                <Input placeholder={t('module_title')} {...field} />
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
        <FormField
          control={form.control}
          name="phase_id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>{t('phase_id')}</FormLabel>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('saving') : (module ? t('update_module') : t('add_module'))}
        </Button>
      </form>
    </Form>
  );
};

export default ModuleForm;