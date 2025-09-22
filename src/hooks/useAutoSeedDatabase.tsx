import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch, getDocs, getDoc } from 'firebase/firestore';
import { showError, showSuccess } from '@/utils/toast';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { useAdminRole } from './useAdminRole';

const AUTO_SEED_KEY = 'axum_db_seeded_v1'; // Version key to prevent re-seeding on every load

export const useAutoSeedDatabase = () => {
  const { user, loading: authLoading } = useSession();
  const { isAdmin, loadingAdminRole } = useAdminRole();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedAttempted, setSeedAttempted] = useState(false);

  useEffect(() => {
    const performAutoSeed = async () => {
      console.log("useAutoSeedDatabase: performAutoSeed invoked. States: authLoading=", authLoading, "loadingAdminRole=", loadingAdminRole, "isSeeding=", isSeeding, "seedAttempted=", seedAttempted);

      if (authLoading || loadingAdminRole || isSeeding || seedAttempted) {
        console.log("useAutoSeedDatabase: Skipping performAutoSeed due to current state.");
        return;
      }

      // Only attempt to auto-seed if an admin is logged in
      if (!user || !isAdmin) {
        console.log("useAutoSeedDatabase: User is not admin or not logged in. Setting seedAttempted to true.");
        setSeedAttempted(true); // Mark as attempted for non-admins to prevent re-runs
        return;
      }

      // Check if seeding has already been performed for this version
      const hasSeeded = localStorage.getItem(AUTO_SEED_KEY);
      if (hasSeeded === 'true') {
        console.log('useAutoSeedDatabase: Auto-seeding skipped: Database already seeded for this version.');
        setSeedAttempted(true);
        return;
      }

      setIsSeeding(true);
      console.log('useAutoSeedDatabase: Attempting automatic database seeding...');
      const batch = writeBatch(db);

      try {
        // Check if the 'phases' collection is empty as a proxy for overall curriculum data
        const phasesCollectionRef = collection(db, 'phases');
        const phasesSnapshot = await getDocs(phasesCollectionRef);

        if (phasesSnapshot.empty) {
          console.log('useAutoSeedDatabase: Phases collection is empty. Proceeding with seeding...');

          // Add all seed items using their 'id' as the Firebase document ID
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
          localStorage.setItem(AUTO_SEED_KEY, 'true'); // Mark as seeded
          showSuccess('Curriculum data automatically seeded!');
          console.log('useAutoSeedDatabase: Automatic database seeding complete!');
        } else {
          console.log('useAutoSeedDatabase: Phases collection is not empty. Auto-seeding skipped.');
          localStorage.setItem(AUTO_SEED_KEY, 'true'); // Mark as seeded even if not empty, to prevent re-check
        }
      } catch (error: any) {
        showError(`Automatic seeding failed: ${error.message}`);
        console.error('useAutoSeedDatabase: Error during automatic database seeding:', error);
      } finally {
        setIsSeeding(false);
        setSeedAttempted(true);
      }
    };

    if (user && isAdmin) { // Only run if user is an admin
      performAutoSeed();
    } else if (!authLoading && !user) { // If not logged in, ensure seedAttempted is true to prevent re-runs
      setSeedAttempted(true);
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, isSeeding, seedAttempted]);

  return { isSeeding };
};