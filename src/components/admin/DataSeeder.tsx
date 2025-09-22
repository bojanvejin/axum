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

// Import all markdown attachments
import CourseOverviewContent from 'DYAD_ATTACHMENT_5';
import HistoryContent from 'DYAD_ATTACHMENT_1';
import ToolsTechniquesContent from 'DYAD_ATTACHMENT_4';
import CleanlinessHygieneContent from 'DYAD_ATTACHMENT_3';
import SafetyFirstAidContent from 'DYAD_ATTACHMENT_2';
import HairFollicleContent from 'DYAD_ATTACHMENT_10';
import LineCuttingContent from 'DYAD_ATTACHMENT_9';
import PrecisionCuttingContent from 'DYAD_ATTACHMENT_6';
import CombiningLinePrecisionContent from 'DYAD_ATTACHMENT_8';
import ReviewFeedbackContent from 'DYAD_ATTACHMENT_7';
import AdvancedLineCuttingContent from 'DYAD_ATTACHMENT_14';
import AdvancedPrecisionCuttingContent from 'DYAD_ATTACHMENT_11';
import CombiningAdvancedContent from 'DYAD_ATTACHMENT_13';
import ReviewFeedbackIntermediateContent from 'DYAD_ATTACHMENT_12';
import IntroToDesignContent from 'DYAD_ATTACHMENT_19';
import DesignsWithLineCuttingContent from 'DYAD_ATTACHMENT_18';
import DesignsWithPrecisionCuttingContent from 'DYAD_ATTACHMENT_17';
import CombiningDesignsContent from 'DYAD_ATTACHMENT_15';
import ReviewFeedbackDesignContent from 'DYAD_ATTACHMENT_16';
import AdvancedDesignContent from 'DYAD_ATTACHMENT_20';
import PracticalApplicationContent from 'DYAD_ATTACHMENT_22';
import ReviewFeedbackCraftContent from 'DYAD_ATTACHMENT_21';
import FinalProjectPlanningContent from 'DYAD_ATTACHMENT_26';
import FinalProjectExecutionContent from 'DYAD_ATTACHMENT_23';
import ReviewFeedbackFinalProjectContent from 'DYAD_ATTACHMENT_25';
import GraduationCeremonyContent from 'DYAD_ATTACHMENT_24';

// Map attachment IDs to their imported content
const attachmentContentMap: Record<string, string> = {
  'DYAD_ATTACHMENT_5': CourseOverviewContent,
  'DYAD_ATTACHMENT_1': HistoryContent,
  'DYAD_ATTACHMENT_4': ToolsTechniquesContent,
  'DYAD_ATTACHMENT_3': CleanlinessHygieneContent,
  'DYAD_ATTACHMENT_2': SafetyFirstAidContent,
  'DYAD_ATTACHMENT_10': HairFollicleContent,
  'DYAD_ATTACHMENT_9': LineCuttingContent,
  'DYAD_ATTACHMENT_6': PrecisionCuttingContent,
  'DYAD_ATTACHMENT_8': CombiningLinePrecisionContent,
  'DYAD_ATTACHMENT_7': ReviewFeedbackContent,
  'DYAD_ATTACHMENT_14': AdvancedLineCuttingContent,
  'DYAD_ATTACHMENT_11': AdvancedPrecisionCuttingContent,
  'DYAD_ATTACHMENT_13': CombiningAdvancedContent,
  'DYAD_ATTACHMENT_12': ReviewFeedbackIntermediateContent,
  'DYAD_ATTACHMENT_19': IntroToDesignContent,
  'DYAD_ATTACHMENT_18': DesignsWithLineCuttingContent,
  'DYAD_ATTACHMENT_17': DesignsWithPrecisionCuttingContent,
  'DYAD_ATTACHMENT_15': CombiningDesignsContent,
  'DYAD_ATTACHMENT_16': ReviewFeedbackDesignContent,
  'DYAD_ATTACHMENT_20': AdvancedDesignContent,
  'DYAD_ATTACHMENT_22': PracticalApplicationContent,
  'DYAD_ATTACHMENT_21': ReviewFeedbackCraftContent,
  'DYAD_ATTACHMENT_26': FinalProjectPlanningContent,
  'DYAD_ATTACHMENT_23': FinalProjectExecutionContent,
  'DYAD_ATTACHMENT_25': ReviewFeedbackFinalProjectContent,
  'DYAD_ATTACHMENT_24': GraduationCeremonyContent,
};


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

      // Clear existing data from relevant collections
      const collectionsToClear = ['phases', 'modules', 'lessons', 'quizzes', 'quiz_questions', 'student_progress', 'quiz_attempts'];
      for (const colName of collectionsToClear) {
        const querySnapshot = await getDocs(collection(db, colName));
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      }
      await batch.commit(); // Commit deletions first to ensure a clean slate

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

      // Add Lessons, resolving content from attachments
      for (const lesson of seedLessons) {
        const lessonContent = attachmentContentMap[lesson.content_html] || lesson.content_html; // Use mapped content or original if not found (for appendices)
        const docRef = doc(db, 'lessons', lesson.id);
        newBatch.set(docRef, { ...lesson, content_html: lessonContent });
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
            <p>This action will add sample phases, modules, lessons, quizzes, and questions to your Firebase Firestore database. It will first clear existing curriculum-related data to ensure a fresh start.</p>
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