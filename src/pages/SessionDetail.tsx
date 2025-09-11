import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumSession, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility

const SessionDetail: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const localUser = getLocalUser(); // Get local user
  const [session, setSession] = useState<CurriculumSession | null>(null);
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUser) {
      navigate('/enter-name');
      return;
    }

    const fetchSessionAndLessons = async () => {
      setLoading(true);
      try {
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (sessionError) throw sessionError;
        setSession(sessionData);

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('session_id', sessionId)
          .order('order_index', { ascending: true });

        if (lessonsError) throw lessonsError;
        setLessons(lessonsData || []);

        // Fetch student progress from Supabase using local user ID
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('*')
          .eq('user_id', localUser.id); // Use localUser.id
        if (progressError) throw progressError;
        setStudentProgress(progressData || []);

      } catch (error: any) {
        showError(`Failed to load session details: ${error.message}`);
        console.error('Error fetching session or lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && localUser) {
      fetchSessionAndLessons();
    }
  }, [sessionId, localUser, navigate]);

  const isLessonCompleted = (lessonId: string) => {
    return studentProgress.some(p => p.lesson_id === lessonId && p.status === 'completed');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Session not found.</h2>
          <Link to="/" className="text-blue-500 hover:underline">Return to Curriculum</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold ml-2">Session {session.session_number}: {session.title}</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mb-8">{session.description}</p>

        {session.topics && session.topics.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Topics Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {session.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {session.assignments && session.assignments.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {session.assignments.map((assignment, index) => (
                  <li key={index}>{assignment}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-semibold my-6">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-muted-foreground">No lessons available for this session yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Link to={`/lessons/${lesson.id}`} key={lesson.id}>
                <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    {localUser && (isLessonCompleted(lesson.id) ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-muted-foreground" size={20} />)}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">{lesson.objectives}</p>
                    {lesson.week_number !== undefined && lesson.day_number !== undefined && (
                      <p className="text-xs text-muted-foreground mt-2">Week {lesson.week_number}, Day {lesson.day_number}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionDetail;