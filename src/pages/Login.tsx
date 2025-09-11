import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { Toaster } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-center">
            {t('login_removed_message')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-muted-foreground">
            {t('login_removed_explanation')}
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            {t('return_to_home')}
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;