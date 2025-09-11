import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { Toaster } from '@/components/ui/sonner'; // Import Toaster for displaying errors

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Axum Training
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to access your curriculum.
          </p>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]} // No third-party providers unless specified
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
            theme="light" // Default to light theme, will be overridden by global theme
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing In...',
                  link_text: 'Already have an account? Sign In',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a Password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign Up',
                  loading_button_label: 'Signing Up...',
                  link_text: 'Don\'t have an account? Sign Up',
                },
                forgotten_password: {
                  link_text: 'Forgot your password?',
                  button_label: 'Send reset instructions',
                  loading_button_label: 'Sending instructions...',
                  email_input_placeholder: 'Your email address',
                },
                update_password: {
                  password_label: 'New Password',
                  password_input_placeholder: 'Your new password',
                  button_label: 'Update Password',
                  loading_button_label: 'Updating password...',
                },
              },
            }}
          />
        </CardContent>
      </Card>
      <Toaster /> {/* Add Toaster here */}
    </div>
  );
};

export default Login;