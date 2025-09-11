import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { Toaster } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const Login: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-center">
            {t('login_prompt_message')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary-foreground))',
                  },
                },
              },
            }}
            theme="dark" // Using dark theme for Auth UI to match app's dark mode
            magicLink
          />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;