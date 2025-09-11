import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { CheckCircle, Circle, ArrowLeft } from 'lucide-react'; // Removed Settings
import { useAuth } from '@/contexts/AuthContext'; // Changed from useSession
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const ModuleDetail: React.FC = () => {
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const [module, setModule] = useState<CurriculumModule | null>(null);
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userName, loading: authLoading } = useAuth(); // Changed from useSession
  const { t } = useLanguage(); // Use translation hook

  useEffect(() => {
    const fetchModuleAndLessons = async () => {
      setLoading(true);
      try {
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*')
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

        // Load progress from local storage if authenticated
        if (isAuthenticated && userName) {
          const storedProgress = localStorage.getItem(`progress_${userName}`);
          if (storedProgress) {
            setStudentProgress(JSON.parse(storedProgress));
          }
        }

      } catch (error: any) {
        showError(t('failed_to_load_modules', { message: error.message }));
      } finally {
        setLoading(false);
      }
    };

    if (moduleId && !authLoading) { // Changed from userLoading
      fetchModuleAndLessons();
    }
  }, [moduleId, isAuthenticated, userName, authLoading, t]); // Added isAuthenticated, userName, authLoading to dependencies

  const isLessonCompleted = (lessonId: string) => {
    return studentProgress.some(p => p.lesson_id === lessonId && p.status === 'completed');
  };

  if (loading || authLoading) { // Changed from roleLoading
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
          <h2 className="text-2xl font-bold">{t('module_not_found')}</h2>
          <Link to={`/phases/${phaseId}`} className="text-blue-500 hover:underline">{t('return_to_phase')}</Link>
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
          {/* Removed admin-specific button */}
        </div>
        <p className="text-lg text-muted-foreground mt-2 mb-8">{module.description}</p>

        <h2 className="text-2xl font-semibold my-6">{t('lessons_plural')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link to={`/lessons/${lesson.id}`} key={lesson.id}>
              <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  {isAuthenticated && (isLessonCompleted(lesson.id) ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-muted-foreground" size={20} />)}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{lesson.objectives}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;