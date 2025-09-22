import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch, getDocs, getDoc } from 'firebase/firestore';
import { showError, showSuccess } from '@/utils/toast';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { useAdminRole } from './useAdminRole';

// Define the current version of your seed data. Increment this when seed data changes.
const CURRENT_SEED_VERSION = 3; // Increased version to trigger update for Week 2 lessons

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

      setIsSeeding(true);
      console.log('useAutoSeedDatabase: Attempting automatic database seeding...');
      const batch = writeBatch(db);

      try {
        const appSettingsRef = doc(db, 'app_settings', 'seed_version');
        const appSettingsSnap = await getDoc(appSettingsRef);
        const currentDbSeedVersion = appSettingsSnap.exists() ? appSettingsSnap.data().version : 0;

        console.log(`useAutoSeedDatabase: Current DB seed version: ${currentDbSeedVersion}, Target seed version: ${CURRENT_SEED_VERSION}`);

        if (currentDbSeedVersion < CURRENT_SEED_VERSION) {
          console.log(`useAutoSeedDatabase: Database seed version (${currentDbSeedVersion}) is older than current version (${CURRENT_SEED_VERSION}). Proceeding with seeding...`);

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

          // Update the seed version in Firestore
          batch.set(appSettingsRef, { version: CURRENT_SEED_VERSION }, { merge: true });

          await batch.commit();
          showSuccess('Curriculum data automatically updated to the latest version!');
          console.log('useAutoSeedDatabase: Automatic database seeding complete!');
        } else {
          console.log(`useAutoSeedDatabase: Database seed version (${currentDbSeedVersion}) is up to date. Auto-seeding skipped.`);
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