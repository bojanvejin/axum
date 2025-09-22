"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AxumLogo from '@/components/AxumLogo';
import { showError, showSuccess } from '@/utils/toast';
import { auth, db } from '@/integrations/firebase/client'; // Import db
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc
import { useSession } from '@/components/SessionContextProvider';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();

  // Redirect if already logged in
  React.useEffect(() => {
    console.log("LoginPage: User state changed. Current user:", user);
    if (user) {
      console.log("LoginPage: User logged in, redirecting to /");
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = async () => {
    setLoading(true);
    console.log(`LoginPage: Attempting ${isRegistering ? 'registration' : 'login'} for email: ${email}`);
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create a profile document for the new user
        await setDoc(doc(db, 'profiles', userCredential.user.uid), {
          id: userCredential.user.uid,
          first_name: null,
          last_name: null,
          role: 'user', // Default role
          avatar_url: null,
          updated_at: new Date().toISOString(),
        });
        showSuccess('Registration successful! You are now logged in.');
        console.log("LoginPage: Registration successful and profile created.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        showSuccess('Login successful!');
        console.log("LoginPage: Login successful.");
      }
      // The useEffect will handle navigation after auth state changes
    } catch (error: any) {
      console.error('LoginPage: Firebase Auth Error during attempt:', error);
      showError(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
      console.log("LoginPage: Authentication attempt finished.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center space-y-4 mb-6">
          <AxumLogo />
          <CardTitle className="text-2xl font-bold text-center">
            {isRegistering ? 'Register for Axum Training' : 'Login to Axum Training'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            {isRegistering ? 'Create an account to start your learning journey.' : 'Enter your credentials to continue.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              disabled={loading}
            />
          </div>
          <Button onClick={handleAuth} className="w-full" disabled={loading}>
            {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
          </Button>
          <Button variant="link" onClick={() => setIsRegistering(!isRegistering)} className="w-full">
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;