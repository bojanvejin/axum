import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, updateDoc, writeBatch, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { useAdminRole } from '@/hooks/useAdminRole';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Loader2, Database } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // Added import for Skeleton

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

  const handleFullResetAndSeedDatabase = async () => {
    if (!user || !isAdmin) {
      showError('You must be logged in as an admin to seed the database.');
      return;
    }

    setIsSeeding(true);
    setSeedStatus('Starting full database reset and seeding...');
    const batch = writeBatch(db);

    try {
      const collectionsToReset = ['phases', 'modules', 'lessons', 'quizzes', 'quiz_questions'];

      // Step 1: Delete all existing documents in the target collections
      for (const collectionName of collectionsToReset) {
        setSeedStatus(`Deleting existing documents in ${collectionName}...`);
        const existingDocsSnapshot = await getDocs(collection(db, collectionName));
        existingDocsSnapshot.docs.forEach(docSnap => {
          batch.delete(docSnap.ref);
        });
      }

      // Step 2: Add all seed items using their 'id' as the Firebase document ID
      setSeedStatus('Adding new seed data...');
      seedPhases.forEach(item => {
        batch.set(doc(db, 'phases', item.id), item);
      });
      seedModules.forEach(item => {
        batch.set(doc(db, 'modules', item.id), item);
      });
      seedQuizzes.forEach(item => {
        batch.set(doc(db, 'quizzes', item.id), item);
      });
      seedQuizQuestions.forEach(item => {
        batch.set(doc(db, 'quiz_questions', item.id), item);
      });
      seedLessons.forEach(item => {
        batch.set(doc(db, 'lessons', item.id), item);
      });

      await batch.commit();
      showSuccess('Database fully reset and re-seeded successfully!');
      setSeedStatus('Full reset and seeding complete!');
    } catch (error: any) {
      showError(`Failed to reset and seed database: ${error.message}`);
      setSeedStatus(`Error during full reset and seeding: ${error.message}`);
      console.error('Error during full reset and seeding database:', error);
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Seed Database (Full Reset & Replace)</h1>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Reset and Populate Curriculum Data</CardTitle>
            <CardDescription>
              This action will perform a **full reset** of your curriculum-related data in Firebase Firestore.
              <br /><br />
              **Important:**
              <ul>
                <li>All existing documents in `phases`, `modules`, `lessons`, `quizzes`, and `quiz_questions` collections will be **permanently deleted**.</li>
                <li>New documents will then be created using the data from your local seed files.</li>
                <li>This ensures your database is fully synchronized with the seed data, overwriting any previous inconsistencies or manual edits in these specific collections.</li>
              </ul>
              Use this if you are experiencing issues with inconsistent data or want to ensure all curriculum content is loaded fresh from the seed files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleFullResetAndSeedDatabase}
              disabled={isSeeding}
              className="w-full"
              variant="destructive" // Make it visually distinct and warn the user
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting & Seeding...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Full Reset & Seed Curriculum Now
                </>
              )}
            </Button>
            {seedStatus && <p className="text-sm text-muted-foreground text-center mt-2">{seedStatus}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeedDatabase;