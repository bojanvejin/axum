import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { showError, showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
});

const CompleteProfile: React.FC = () => {
  const { user, profile, loading: sessionLoading } = useSession();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    },
  });

  React.useEffect(() => {
    if (!sessionLoading && user && profile) {
      // If profile is complete, redirect to home
      if (profile.first_name && profile.last_name) {
        navigate('/');
      } else {
        // If profile is incomplete, pre-fill form with existing data
        form.reset({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
        });
      }
    } else if (!sessionLoading && !user) {
      // If no user, redirect to login
      navigate('/login');
    }
  }, [user, profile, sessionLoading, navigate, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      showError(t('failed_to_update_profile', { message: 'User not logged in.' }));
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
        })
        .eq('id', user.id);

      if (error) throw error;
      showSuccess(t('profile_updated_successfully'));
      navigate('/');
    } catch (error: any) {
      showError(t('failed_to_update_profile', { message: error.message }));
      console.error('Error updating profile:', error);
    }
  };

  if (sessionLoading || (user && profile && profile.first_name && profile.last_name)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-6 text-center">
          <AxumLogo className="mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">{t('loading_session')}</CardTitle>
          <CardDescription>{t('complete_profile_description')}</CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            {t('complete_profile_title')}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-center">
            {t('complete_profile_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('first_name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('first_name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('last_name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('last_name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t('saving_profile') : t('save_profile')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;