import React, { useState } from 'react';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch, getDocs } from 'firebase/firestore';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';

const DataSeeder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession();

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSeedData = async () => {
    if (!user) {
      showError("You must be logged in to seed data.");
      return;
    }
    setLoading(true);
    try {
      const batch = writeBatch(db);

      // Clear existing data (optional, but good for fresh seeding)
      // For a real app, you might want more granular control or a confirmation dialog.
      // For now, we'll just overwrite if IDs match.
      const collectionsToClear = ['phases', 'modules', 'lessons', 'quizzes', 'quiz_questions'];
      for (const colName of collectionsToClear) {
        const querySnapshot = await getDocs(collection(db, colName));
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      }
      await batch.commit(); // Commit deletions first

      const newBatch = writeBatch(db);

      // Add Phases
      for (const phase of seedPhases) {
        const docRef = doc(db, 'phases', phase.id);
        newBatch.set(docRef, phase);
      }

      // Add Modules
      for (const module of seedModules) {
        const docRef = doc(db, 'modules', module.id);
        newBatch.set(docRef, module);
      }

      // Add Lessons
      for (const lesson of seedLessons) {
        const docRef = doc(db, 'lessons', lesson.id);
        newBatch.set(docRef, lesson);
      }

      // Add Quizzes
      for (const quiz of seedQuizzes) {
        const docRef = doc(db, 'quizzes', quiz.id);
        newBatch.set(docRef, quiz);
      }

      // Add Quiz Questions
      for (const question of seedQuizQuestions) {
        const docRef = doc(db, 'quiz_questions', question.id);
        newBatch.set(docRef, question);
      }

      await newBatch.commit();
      showSuccess('Sample curriculum data seeded successfully!');
      navigate('/admin/curriculum/phases'); // Redirect to phase management after seeding
    } catch (error: any) {
      showError(`Failed to seed data: ${error.message}`);
      console.error('Error seeding data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Seed Sample Curriculum Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This action will add sample phases, modules, lessons, quizzes, and questions to your Firebase Firestore database. Existing data with matching IDs will be overwritten.</p>
            <Button onClick={handleSeedData} disabled={loading}>
              {loading ? 'Seeding Data...' : 'Seed Sample Data'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DataSeeder;