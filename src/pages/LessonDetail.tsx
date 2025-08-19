import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/SessionContextProvider'; // Import useSession

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<CurriculumLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const { user } = useSession(); // Get the current user from session context

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;
        setLesson(lessonData);

        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('student_progress')
            .select('completed_at')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId)
            .single();

          if (progressError && progressError.code !== 'PGRST116') { // PGRST116 means no rows found
            throw progressError;
          }
          setIsCompleted(!!progressData?.completed_at);
        }

      } catch (error: any) {
        showError(`Failed to load lesson details: ${error.message}`);
        console.error('Error fetching lesson or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLessonAndProgress();
    }
  }, [lessonId, user]); // Re-fetch if user changes

  const handleMarkComplete = async () => {
    if (!user) {
      showError("You must be logged in to mark lessons complete.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('student_progress')
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId!,
            completed_at: new Date().toISOString(),
            status: 'completed',
          },
          { onConflict: 'user_id,lesson_id' } // Update if already exists
        );

      if (error) throw error;
      setIsCompleted(true);
      showSuccess("Lesson marked as complete!");
    } catch (error: any) {
      showError(`Failed to mark lesson complete: ${error.message}`);
      console.error('Error marking lesson complete:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!lesson) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Lesson not found.</h2>
          <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">Objectives: {lesson.objectives}</p>

        <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson.content_html || '<p>No content available for this lesson yet.</p>' }} />

        {lesson.video_url && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Video Demonstration</h2>
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src={lesson.video_url}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {lesson.resources_url && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <a href={lesson.resources_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Download Resources
            </a>
          </div>
        )}

        <Button
          onClick={handleMarkComplete}
          disabled={isCompleted || loading}
          className="w-full md:w-auto"
        >
          {isCompleted ? "Completed!" : "Mark Complete"}
        </Button>
      </div>
    </Layout>
  );
};

export default LessonDetail;