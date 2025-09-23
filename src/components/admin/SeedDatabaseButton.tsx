import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/integrations/firebase/client';
import { collection, doc, writeBatch, getDocs, query } from 'firebase/firestore';
import { showError, showSuccess } from '@/utils/toast';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Database } from 'lucide-react';

const SeedDatabaseButton: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const clearCollection = async (collectionName: string, batch: ReturnType<typeof writeBatch>) => {
    const q = query(collection(db, collectionName));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
  };

  const handleSeedDatabase = async () => {
    if (!confirm('Are you sure you want to re-seed the database? This will DELETE all existing curriculum data (phases, modules, lessons, quizzes, questions) and then re-add the seed content.')) {
      return;
    }

    setIsSeeding(true);
    const batch = writeBatch(db);

    try {
      // 1. Clear existing curriculum data
      await clearCollection('phases', batch);
      await clearCollection('modules', batch);
      await clearCollection('lessons', batch);
      await clearCollection('quizzes', batch);
      await clearCollection('quiz_questions', batch);

      // 2. Add/update all seed items using their 'id' as the Firebase document ID
      seedPhases.forEach(item => {
        batch.set(doc(db, 'phases', item.id), item, { merge: true });
      });
      seedModules.forEach(item => {
        batch.set(doc(db, 'modules', item.id), item, { merge: true });
      });
      seedQuizzes.forEach(item => {
        batch.set(doc(db, 'quizzes', item.id), item, { merge: true });
      });
      seedQuizQuestions.forEach(item => {
        batch.set(doc(db, 'quiz_questions', item.id), item, { merge: true });
      });
      seedLessons.forEach(item => {
        batch.set(doc(db, 'lessons', item.id), item, { merge: true });
      });

      await batch.commit();
      showSuccess('Database re-seeded successfully with curriculum data!');
    } catch (error: any) {
      showError(`Database seeding failed: ${error.message}`);
      console.error('Error during database seeding:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button onClick={handleSeedDatabase} disabled={isSeeding} className="w-full">
      {isSeeding ? 'Seeding...' : (
        <>
          <Database className="mr-2 h-4 w-4" /> Re-Seed Database
        </>
      )}
    </Button>
  );
};

export default SeedDatabaseButton;