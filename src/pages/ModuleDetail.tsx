import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility
import { getLocalStudentProgress } from '@/utils/localProgress'; // Import local progress utility

const ModuleDetail: React.FC = () => {
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const [module, setModule] = useState<CurriculumModule | null>(null);
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const localUser = getLocalUser(); // Get local user
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUser) {
      navigate('/enter-name'); // Redirect if no local user
      return;
    }

    const fetchModuleAndLessons = async () => {
      setLoading(true);
      try {
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*, phases(title)') // Select module details including phase title
          .eq('id', moduleId)
          .single();

        if (moduleError) throw moduleError;
        setModule(moduleData);

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', moduleId)
          .order('order_index', { ascending: true });

        if (lessonsError) throw lessonsError;
        setLessons(lessonsData);

        // Load student progress from local storage
        if (localUser) {
          setStudentProgress(getLocalStudentProgress(localUser.id));
        }

      } catch (error: any) {
        showError(`Failed to load module details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (moduleId && localUser) { // Only fetch data if a local user is present
      fetchModuleAndLessons();
    }
  }, [moduleId, localUser, navigate]);

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

  if (!module) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Module not found.</h2>
          <Link to={`/phases/${phaseId}`} className="text-blue-500 hover:underline">Return to Phase</Link>
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
              <Link to={`/phases/${phaseId}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold ml-2">{module.title}</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mt-2 mb-2">{module.description}</p>
        {module.course_week !== undefined && (
          <p className="text-md text-muted-foreground mb-8">
            Scheduled: Course Week {module.course_week}
          </p>
        )}

        <h2 className="text-2xl font-semibold my-6">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-muted-foreground">No lessons available for this module yet.</p>
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

export default ModuleDetail;