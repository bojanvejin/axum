import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { useAdminRole } from '@/hooks/useAdminRole';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Loader2, Database } from 'lucide-react';

const SeedDatabase: React.FC = () => {
  const { user, loading: authLoading } = useSession();
  const { isAdmin, loadingAdminRole } = useAdminRole();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  useEffect(() => {
    if (!authLoading && !loadingAdminRole) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

  const handleSeedDatabase = async () => {
    if (!user || !isAdmin) {
      showError('You must be logged in as an admin to seed the database.');
      return;
    }

    setIsSeeding(true);
    setSeedStatus('Starting database seeding...');
    const batch = writeBatch(db);

    try {
      // Seed Phases
      setSeedStatus('Seeding phases...');
      for (const phase of seedPhases) {
        const docRef = doc(collection(db, 'phases'), phase.id);
        batch.set(docRef, phase, { merge: true });
      }

      // Seed Modules
      setSeedStatus('Seeding modules...');
      for (const module of seedModules) {
        const docRef = doc(collection(db, 'modules'), module.id);
        batch.set(docRef, module, { merge: true });
      }

      // Seed Quizzes
      setSeedStatus('Seeding quizzes...');
      for (const quiz of seedQuizzes) {
        const docRef = doc(collection(db, 'quizzes'), quiz.id);
        batch.set(docRef, quiz, { merge: true });
      }

      // Seed Quiz Questions
      setSeedStatus('Seeding quiz questions...');
      for (const question of seedQuizQuestions) {
        const docRef = doc(collection(db, 'quiz_questions'), question.id);
        batch.set(docRef, question, { merge: true });
      }

      // Seed Lessons
      setSeedStatus('Seeding lessons...');
      for (const lesson of seedLessons) {
        const docRef = doc(collection(db, 'lessons'), lesson.id);
        batch.set(docRef, lesson, { merge: true });
      }

      await batch.commit();
      showSuccess('Database seeded successfully!');
      setSeedStatus('Database seeding complete!');
    } catch (error: any) {
      showError(`Failed to seed database: ${error.message}`);
      setSeedStatus(`Error during seeding: ${error.message}`);
      console.error('Error seeding database:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  if (authLoading || loadingAdminRole) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirect handled by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Seed Database</h1>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Populate Curriculum Data</CardTitle>
            <CardDescription>
              This action will upload the curriculum data from your local seed files to Firebase Firestore.
              Existing entries with matching IDs will be updated, and new entries will be created.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="w-full"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Seed Database Now
                </>
              )}
            </Button>
            {seedStatus && <p className="text-sm text-muted-foreground text-center">{seedStatus}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeedDatabase;