import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, updateDoc, writeBatch, getDoc, getDocs } from 'firebase/firestore';
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

  // Helper to check if a value is "empty" for content fields
  const isEmptyContent = (value: any) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
  };

  const handleSmartSeedDatabase = async () => {
    if (!user || !isAdmin) {
      showError('You must be logged in as an admin to seed the database.');
      return;
    }

    setIsSeeding(true);
    setSeedStatus('Starting smart database seeding...');
    const batch = writeBatch(db);

    try {
      // Generic function to handle upsert for a collection
      const upsertCollection = async (collectionName: string, seedItems: any[]) => {
        setSeedStatus(`Processing ${collectionName}...`);
        const existingDocsSnapshot = await getDocs(collection(db, collectionName));
        const existingDocsMap = new Map<string, { docRef: any, data: any }>(); // Map internal_id -> {docRef, data}

        existingDocsSnapshot.docs.forEach(docSnap => {
          const data = docSnap.data();
          if (data.id) { // Assuming each document has an 'id' field within its data
            existingDocsMap.set(data.id, { docRef: docSnap.ref, data: data });
          }
        });

        for (const seedItem of seedItems) {
          const existing = existingDocsMap.get(seedItem.id);

          if (existing) {
            // Document exists (matched by internal 'id' field), update it
            const updatePayload: { [key: string]: any } = {};
            let hasChanges = false;

            // Compare and update fields
            for (const key in seedItem) {
              // Special handling for content fields to preserve manual edits
              if (['description', 'content_html', 'objectives', 'video_url', 'resources_url'].includes(key)) {
                // Only update if existing content is empty or different from seed
                if (isEmptyContent(existing.data[key]) && !isEmptyContent(seedItem[key])) {
                  updatePayload[key] = seedItem[key];
                  hasChanges = true;
                } else if (!isEmptyContent(existing.data[key]) && existing.data[key] !== seedItem[key]) {
                  console.warn(`${collectionName} ${seedItem.id} field '${key}' differs from seed and was not empty. Keeping existing. Seed: "${String(seedItem[key]).substring(0, 50)}...", Existing: "${String(existing.data[key]).substring(0, 50)}..."`);
                }
              } else {
                // For all other fields (structural), always update if different
                if (existing.data[key] !== seedItem[key]) {
                  updatePayload[key] = seedItem[key];
                  hasChanges = true;
                }
              }
            }

            if (hasChanges) {
              batch.update(existing.docRef, updatePayload);
            }
          } else {
            // Document does not exist (based on internal 'id' field), create it using seedItem.id as the Firebase document ID
            const newDocRef = doc(collection(db, collectionName), seedItem.id);
            batch.set(newDocRef, seedItem);
          }
        }
      };

      await upsertCollection('phases', seedPhases);
      await upsertCollection('modules', seedModules);
      await upsertCollection('quizzes', seedQuizzes);
      await upsertCollection('quiz_questions', seedQuizQuestions);
      await upsertCollection('lessons', seedLessons);

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
                <li>Existing items will be **updated** based on their internal `id` field.</li>
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