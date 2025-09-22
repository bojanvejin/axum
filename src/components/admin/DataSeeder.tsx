import React, 'react';
import { db } from '@/integrations/firebase/client';
import { writeBatch, doc } from 'firebase/firestore';
import { seedPhases, seedModules, seedLessons, seedQuizzes, seedQuizQuestions } from '@/data/seedData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminRole } from '@/hooks/useAdminRole';
import { CurriculumLesson } from '@/data/curriculum';

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

// Helper to extract the main title from a markdown string
const extractTitleFromMarkdown = (markdown: string): string | null => {
  const firstLine = markdown.split('\n')[0];
  if (firstLine && firstLine.startsWith('# ')) {
    return firstLine.substring(2).trim();
  }
  return null;
};

const DataSeeder: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
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

      const collectionsToSeed = [
        { name: 'phases', data: seedPhases },
        { name: 'modules', data: seedModules },
        { name: 'lessons', data: seedLessons },
        { name: 'quizzes', data: seedQuizzes },
        { name: 'quiz_questions', data: seedQuizQuestions },
      ];

      for (const { name, data } of collectionsToSeed) {
        for (const item of data) {
          let dataToWrite = { ...item };
          if (name === 'lessons') {
            const lessonItem = item as CurriculumLesson;
            const contentKey = lessonItem.content_html;
            if (contentKey && attachmentContentMap[contentKey]) {
              const markdownContent = attachmentContentMap[contentKey];
              // Update content from markdown file
              (dataToWrite as CurriculumLesson).content_html = markdownContent;
              
              // Update title from markdown file
              const newTitle = extractTitleFromMarkdown(markdownContent);
              if (newTitle) {
                (dataToWrite as CurriculumLesson).title = newTitle;
              }
            }
          }
          const docRef = doc(db, name, item.id);
          batch.set(docRef, dataToWrite); // This will create or overwrite
        }
      }

      await batch.commit();
      showSuccess(`Successfully seeded/updated all sample curriculum data.`);
      navigate('/admin/curriculum/phases');
    } catch (error: any) {
      showError(`Failed to seed data: ${error.message}`);
      console.error('Error seeding data:', error);
    } finally {
      setLoading(false);
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
        <Card className="max-w-lg mx-auto mb-8">
          <CardHeader>
            <CardTitle>Seed / Update Sample Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This action will seed and update the sample curriculum data (phases, modules, lessons, etc.) in your database. It will overwrite existing sample data with the latest version from the code, but will not delete any extra data you have created.</p>
            <Button onClick={handleSeedData} disabled={loading}>
              {loading ? 'Processing...' : 'Seed / Update Sample Data'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DataSeeder;