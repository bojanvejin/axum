"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { setLocalUser } from '@/utils/localUser';
import { showError } from '@/utils/toast';

const NameInputPage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      setLocalUser(name.trim());
      navigate('/');
    } else {
      showError('Please enter your name to continue.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Axum Training
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Enter your name to start your learning journey.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <Button onClick={handleLogin} className="w-full">
            Start Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameInputPage;