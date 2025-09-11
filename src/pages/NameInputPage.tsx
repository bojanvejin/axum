import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocalUser } from '@/utils/localUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { showError } from '@/utils/toast';

const NameInputPage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setLocalUser(name.trim());
      navigate('/');
    } else {
      showError("Please enter your name.");
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
          <CardDescription className="text-sm text-muted-foreground text-center">
            Please enter your name to start your learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Start Learning
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameInputPage;