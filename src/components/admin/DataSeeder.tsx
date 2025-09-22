import React, { useState } from 'react';
import { db } from '@/integrations/firebase/client';
import { collection, doc, setDoc, writeBatch, getDocs, updateDoc } from 'firebase/firestore'; // Added updateDoc
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminRole } from '@/hooks/useAdminRole';

// Import all markdown attachments as raw strings
import CourseOverviewContent from '@/content/01_Course_Overview_and_Introduction.md?raw';
import HistoryContent from '@/content/02_History_of_Line_Cutting_and_Precision_Cutting.md?raw';
import ToolsTechniquesContent from '@/content/03_Tools_and_Techniques.md?raw';
import CleanlinessHygieneContent from '@/content/04_Cleanliness_and_Hygiene.md?raw';
import SafetyFirstAidContent from '@/content/05_Safety_and_First_Aid.md?raw';
import HairFollicleContent from '@/content/01_Understanding_the_Hair_Follicle.md?raw';
import LineCuttingContent from '@/content/02_Line_Cutting_Techniques.md?raw';
import PrecisionCuttingContent from '@/content/03_Precision_Cutting_Techniques.md?raw';
import CombiningLinePrecisionContent from '@/content/04_Combining_Line_and_Precision_Cutting.md?raw';
import ReviewFeedbackContent from '@/content/05_Review_and_Feedback.md?raw';
import AdvancedLineCuttingContent from '@/content/01_Advanced_Line_Cutting_Techniques.md?raw';
import AdvancedPrecisionCuttingContent from '@/content/02_Advanced_Precision_Cutting_Techniques.md?raw';
import CombiningAdvancedContent from '@/content/03_Combining_Advanced_Techniques.md?raw';
import ReviewFeedbackIntermediateContent from '@/content/04_Review_and_Feedback_Intermediate.md?raw';
import IntroToDesignContent from '@/content/01_Introduction_to_Design.md?raw';
import DesignsWithLineCuttingContent from '@/content/02_Creating_Designs_with_Line_Cutting.md?raw';
import DesignsWithPrecisionCuttingContent from '@/content/03_Creating_Designs_with_Precision_Cutting.md?raw';
import CombiningDesignsContent from '@/content/04_Combining_Designs_Line_and_Precision.md?raw';
import ReviewFeedbackDesignContent from '@/content/05_Review_and_Feedback_Design.md?raw';
import AdvancedDesignContent from '@/content/01_Advanced_Design_Techniques.md?raw';
import PracticalApplicationContent from '@/content/02_Practical_Application.md?raw';
import ReviewFeedbackCraftContent from '@/content/03_Review_and_Feedback_Craft.md?raw';
import FinalProjectPlanningContent from '@/content/01_Final_Project_Planning.md?raw';
import FinalProjectExecutionContent from '@/content/02_Final_Project_Execution.md?raw';
import ReviewFeedbackFinalProjectContent from '@/content/03_Review_and_Feedback_Final_Project.md?raw';
import GraduationCeremonyContent from '@/content/04_Graduation_Ceremony.md?raw';

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
  const { isAdmin, loadingAdminRole } = useAdminRole();

  React.useEffect(() => {
    if (!authLoading && !loadingAdminRole) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

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

  // --- Temporary Admin Role Setter ---
  const ADMIN_USER_UID = 'xHj1ryfvHnNuCOcUTibcKfjT9x82'; // UID for elmntmail@gmail.com
  const ADMIN_USER_EMAIL = 'elmntmail@gmail.com';

  const handleMakeAdmin = async () => {
    if (!user) {
      showError("You must be logged in to perform this action.");
      return;
    }
    // The client-side bypass in useAdminRole handles the admin check for this specific user.
    // We still ensure the logged-in user is the intended admin for this action.
    if (user.uid !== ADMIN_USER_UID) {
      showError("You are not authorized to perform this action.");
      return;
    }

    setLoading(true);
    try {
      const profileDocRef = doc(db, 'profiles', ADMIN_USER_UID);
      // Use setDoc with merge: true to create or update the document
      await setDoc(profileDocRef, { role: 'admin' }, { merge: true });
      showSuccess(`${ADMIN_USER_EMAIL} is now an admin!`);
    } catch (error: any) {
      showError(`Failed to make ${ADMIN_USER_EMAIL} an admin: ${error.message}`);
      console.error('Error setting admin role:', error);
    } finally {
      setLoading(false);
    }
  };
  // --- End Temporary Admin Role Setter ---

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
        <Card className="max-w-lg mx-auto mb-8">
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

        {/* Temporary Admin Role Setter Card */}
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Temporary: Set Admin Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Click this button to set the role of <strong>{ADMIN_USER_EMAIL}</strong> to 'admin' in Firestore. This is a one-time action for setup.</p>
            <Button onClick={handleMakeAdmin} disabled={loading}>
              {loading ? 'Processing...' : `Make ${ADMIN_USER_EMAIL} Admin`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DataSeeder;