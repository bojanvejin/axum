import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { Toaster } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const Login: React.FC = () => {
  const { t } = useLanguage(); // Use translation hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-center">
            {t('sign_in_prompt')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            view="magic_link"
            showLinks={false}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary-foreground))',
                    inputBackground: 'hsl(var(--input))',
                    inputBorder: 'hsl(var(--border))',
                    inputBorderHover: 'hsl(var(--ring))',
                    inputBorderFocus: 'hsl(var(--ring))',
                    inputText: 'hsl(var(--foreground))',
                    messageText: 'hsl(var(--foreground))',
                    messageBackground: 'hsl(var(--muted))',
                    anchorTextColor: 'hsl(var(--primary))',
                    anchorTextHoverColor: 'hsl(var(--primary-foreground))',
                  },
                },
              },
            }}
            theme="light"
            localization={{
              variables: {
                magic_link: {
                  email_input_label: t('email_address'),
                  email_input_placeholder: t('your_email_address'),
                  button_label: t('send_magic_link'),
                  loading_button_label: t('sending'),
                },
              },
            }}
          />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;