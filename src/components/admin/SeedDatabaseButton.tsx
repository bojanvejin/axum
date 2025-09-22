import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/integrations/firebase/client';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { showError, showSuccess } from '@/utils/toast';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Database } from 'lucide-react';

const SeedDatabaseButton: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    if (!confirm('Are you sure you want to re-seed the database? This will overwrite existing curriculum data.')) {
      return;
    }

    setIsSeeding(true);
    const batch = writeBatch(db);

    try {
      // Clear existing data (optional, but ensures a clean re-seed)
      // For a full clear, you'd fetch all documents and delete them.
      // For now, we'll just overwrite with merge: true.

      // Add/update all seed items using their 'id' as the Firebase document ID
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