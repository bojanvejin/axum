import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, updateDoc, writeBatch, getDoc } from 'firebase/firestore';
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

  const handleSmartSeedDatabase = async () => {
    if (!user || !isAdmin) {
      showError('You must be logged in as an admin to seed the database.');
      return;
    }

    setIsSeeding(true);
    setSeedStatus('Starting smart database seeding...');
    const batch = writeBatch(db);

    try {
      // Helper to check if a value is "empty" for content fields
      const isEmptyContent = (value: any) => value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

      // --- Seed Phases ---
      setSeedStatus('Processing phases...');
      for (const phase of seedPhases) {
        const docRef = doc(collection(db, 'phases'), phase.id);
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updatePayload: { [key: string]: any } = {};
          
          // Always update structural fields
          updatePayload.title = phase.title;
          updatePayload.weeks = phase.weeks;
          updatePayload.order_index = phase.order_index;

          // Conditionally update content fields (description)
          if (isEmptyContent(existingData.description)) {
            updatePayload.description = phase.description;
          } else if (existingData.description !== phase.description) {
            // If existing description is different and not empty, log a warning or decide policy
            console.warn(`Phase ${phase.id} description differs from seed and was not empty. Keeping existing. Seed: "${phase.description}", Existing: "${existingData.description}"`);
          }
          batch.update(docRef, updatePayload);
        } else {
          batch.set(docRef, phase);
        }
      }

      // --- Seed Modules ---
      setSeedStatus('Processing modules...');
      for (const module of seedModules) {
        const docRef = doc(collection(db, 'modules'), module.id);
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updatePayload: { [key: string]: any } = {};

          // Always update structural fields
          updatePayload.phase_id = module.phase_id;
          updatePayload.title = module.title;
          updatePayload.order_index = module.order_index;

          // Conditionally update content fields (description)
          if (isEmptyContent(existingData.description)) {
            updatePayload.description = module.description;
          } else if (existingData.description !== module.description) {
            console.warn(`Module ${module.id} description differs from seed and was not empty. Keeping existing. Seed: "${module.description}", Existing: "${existingData.description}"`);
          }
          batch.update(docRef, updatePayload);
        } else {
          batch.set(docRef, module);
        }
      }

      // --- Seed Quizzes ---
      setSeedStatus('Processing quizzes...');
      for (const quiz of seedQuizzes) {
        const docRef = doc(collection(db, 'quizzes'), quiz.id);
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updatePayload: { [key: string]: any } = {};

          // Always update structural fields
          updatePayload.title = quiz.title;
          updatePayload.created_at = quiz.created_at; // Assuming created_at is part of the seed's canonical state

          // Conditionally update content fields (description)
          if (isEmptyContent(existingData.description)) {
            updatePayload.description = quiz.description;
          } else if (existingData.description !== quiz.description) {
            console.warn(`Quiz ${quiz.id} description differs from seed and was not empty. Keeping existing. Seed: "${quiz.description}", Existing: "${existingData.description}"`);
          }
          batch.update(docRef, updatePayload);
        } else {
          batch.set(docRef, quiz);
        }
      }

      // --- Seed Quiz Questions ---
      setSeedStatus('Processing quiz questions...');
      for (const question of seedQuizQuestions) {
        const docRef = doc(collection(db, 'quiz_questions'), question.id);
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updatePayload: { [key: string]: any } = {};

          // Always update structural/core fields
          updatePayload.quiz_id = question.quiz_id;
          updatePayload.question_text = question.question_text;
          updatePayload.question_type = question.question_type;
          updatePayload.options = question.options; // Options are part of the question structure
          updatePayload.correct_answer = question.correct_answer;
          updatePayload.created_at = question.created_at;

          // No specific content fields to conditionally update for questions, as all are core.
          batch.update(docRef, updatePayload);
        } else {
          batch.set(docRef, question);
        }
      }

      // --- Seed Lessons ---
      setSeedStatus('Processing lessons...');
      for (const lesson of seedLessons) {
        const docRef = doc(collection(db, 'lessons'), lesson.id);
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updatePayload: { [key: string]: any } = {};

          // Always update structural fields
          updatePayload.module_id = lesson.module_id;
          updatePayload.title = lesson.title;
          updatePayload.order_index = lesson.order_index;
          updatePayload.quiz_id = lesson.quiz_id; // Quiz ID is structural

          // Conditionally update content fields
          if (isEmptyContent(existingData.objectives)) {
            updatePayload.objectives = lesson.objectives;
          } else if (existingData.objectives !== lesson.objectives) {
            console.warn(`Lesson ${lesson.id} objectives differ from seed and was not empty. Keeping existing. Seed: "${lesson.objectives}", Existing: "${existingData.objectives}"`);
          }

          if (isEmptyContent(existingData.content_html)) {
            updatePayload.content_html = lesson.content_html;
          } else if (existingData.content_html !== lesson.content_html) {
            console.warn(`Lesson ${lesson.id} content_html differs from seed and was not empty. Keeping existing. Seed: "${lesson.content_html.substring(0, 50)}...", Existing: "${existingData.content_html.substring(0, 50)}..."`);
          }

          if (isEmptyContent(existingData.video_url)) {
            updatePayload.video_url = lesson.video_url || null;
          } else if (existingData.video_url !== lesson.video_url) {
            console.warn(`Lesson ${lesson.id} video_url differs from seed and was not empty. Keeping existing. Seed: "${lesson.video_url}", Existing: "${existingData.video_url}"`);
          }

          if (isEmptyContent(existingData.resources_url)) {
            updatePayload.resources_url = lesson.resources_url || null;
          } else if (existingData.resources_url !== lesson.resources_url) {
            console.warn(`Lesson ${lesson.id} resources_url differs from seed and was not empty. Keeping existing. Seed: "${lesson.resources_url}", Existing: "${existingData.resources_url}"`);
          }
          batch.update(docRef, updatePayload);
        } else {
          batch.set(docRef, lesson);
        }
      }

      await batch.commit();
      showSuccess('Database smart-seeded successfully! Existing content was preserved where detected.');
      setSeedStatus('Smart seeding complete! Check console for warnings about preserved content.');
    } catch (error: any) {
      showError(`Failed to smart-seed database: ${error.message}`);
      setSeedStatus(`Error during smart seeding: ${error.message}`);
      console.error('Error smart-seeding database:', error);
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Seed Database (Smart Upsert)</h1>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Populate Curriculum Data (Smart Upsert)</CardTitle>
            <CardDescription>
              This action will upload curriculum data from your local seed files to Firebase Firestore.
              <br /><br />
              **Important:**
              <ul>
                <li>Existing items will be **updated** based on their ID.</li>
                <li>For content fields (like lesson descriptions, HTML content, video/resource URLs), if a value already exists in Firebase, **it will be preserved** and NOT overwritten by the seed data.</li>
                <li>If a content field is empty in Firebase, it will be populated from the seed data.</li>
                <li>Structural fields (like titles, order, parent IDs) will always be updated from the seed.</li>
              </ul>
              This approach prevents accidental overwrites of manual edits while ensuring new content and structural changes from the seed files are applied.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleSmartSeedDatabase}
              disabled={isSeeding}
              className="w-full"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Smart Seeding...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Smart Seed Database Now
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