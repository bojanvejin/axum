import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { useAdminRole } from '@/hooks/useAdminRole';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Loader2, Database, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const deleteCollection = async (collectionName: string, batch: any) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    if (snapshot.empty) {
      setSeedStatus(`No existing ${collectionName} to delete.`);
      return;
    }
    setSeedStatus(`Deleting existing ${collectionName}...`);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
  };

  const handleResetAndSeedDatabase = async () => {
    if (!user || !isAdmin) {
      showError('You must be logged in as an admin to seed the database.');
      return;
    }

    setIsSeeding(true);
    setSeedStatus('Starting database reset and seeding...');
    let batch = writeBatch(db);

    try {
      // Step 1: Delete all existing curriculum data
      setSeedStatus('Deleting all existing curriculum data...');
      await deleteCollection('lessons', batch);
      await deleteCollection('quiz_questions', batch);
      await deleteCollection('quizzes', batch);
      await deleteCollection('modules', batch);
      await deleteCollection('phases', batch);
      
      // Commit the deletion batch
      await batch.commit();
      setSeedStatus('Existing curriculum data deleted. Starting re-seeding...');
      
      // Start a new batch for seeding
      batch = writeBatch(db);

      // Step 2: Seed new data
      setSeedStatus('Seeding phases...');
      for (const phase of seedPhases) {
        const docRef = doc(collection(db, 'phases'), phase.id);
        batch.set(docRef, phase); // No merge needed after deletion
      }

      setSeedStatus('Seeding modules...');
      for (const module of seedModules) {
        const docRef = doc(collection(db, 'modules'), module.id);
        batch.set(docRef, module);
      }

      setSeedStatus('Seeding quizzes...');
      for (const quiz of seedQuizzes) {
        const docRef = doc(collection(db, 'quizzes'), quiz.id);
        batch.set(docRef, quiz);
      }

      setSeedStatus('Seeding quiz questions...');
      for (const question of seedQuizQuestions) {
        const docRef = doc(collection(db, 'quiz_questions'), question.id);
        batch.set(docRef, question);
      }

      setSeedStatus('Seeding lessons...');
      for (const lesson of seedLessons) {
        const docRef = doc(collection(db, 'lessons'), lesson.id);
        batch.set(docRef, lesson);
      }

      await batch.commit();
      showSuccess('Database reset and seeded successfully!');
      setSeedStatus('Database reset and seeding complete!');
    } catch (error: any) {
      showError(`Failed to reset and seed database: ${error.message}`);
      setSeedStatus(`Error during reset and seeding: ${error.message}`);
      console.error('Error resetting and seeding database:', error);
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
            <CardTitle>Reset and Populate Curriculum Data</CardTitle>
            <CardDescription>
              <span className="font-bold text-red-500 flex items-center gap-1 mb-2">
                <AlertTriangle className="h-4 w-4" /> WARNING: This action is irreversible!
              </span>
              This will first **delete ALL existing data** in the 'phases', 'modules', 'lessons', 'quizzes', and 'quiz_questions' collections in your Firebase Firestore.
              Then, it will upload the curriculum data from your local seed files. This ensures a clean and consistent curriculum structure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={isSeeding}
                  className="w-full"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting & Seeding...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Reset & Seed Database Now
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will **permanently delete all curriculum data** (phases, modules, lessons, quizzes, and quiz questions) from your Firebase Firestore and then re-populate it with the local seed data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetAndSeedDatabase}>
                    Continue & Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {seedStatus && <p className="text-sm text-muted-foreground text-center">{seedStatus}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeedDatabase;