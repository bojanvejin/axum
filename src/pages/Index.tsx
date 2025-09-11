import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumPhaseOverviewCard from "@/components/CurriculumPhaseOverviewCard";
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Changed from useSession
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const backgroundImages = [
  '/images/axum-salon-interior.jpeg',
  '/images/ancientbarber4.jpg',
];

const Index = () => {
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [modulesByPhase, setModulesByPhase] = useState<Record<string, CurriculumModule[]>>({});
  const [allLessons, setAllLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { userName, isAuthenticated, loading: authLoading } = useAuth(); // Changed from useSession
  const navigate = useNavigate();
  const { t } = useLanguage(); // Use translation hook

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const { data: phasesData, error: phasesError } = await supabase
          .from('phases')
          .select('*')
          .order('order_index', { ascending: true });
        if (phasesError) throw phasesError;
        setPhases(phasesData || []);

        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .order('order_index', { ascending: true });
        if (modulesError) throw modulesError;

        const organizedModules: Record<string, CurriculumModule[]> = {};
        modulesData?.forEach(module => {
          if (!organizedModules[module.phase_id]) {
            organizedModules[module.phase_id] = [];
          }
          organizedModules[module.phase_id].push(module);
        });
        setModulesByPhase(organizedModules);

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*');
        if (lessonsError) throw lessonsError;
        setAllLessons(lessonsData || []);

        if (isAuthenticated && userName) {
          const storedProgress = localStorage.getItem(`progress_${userName}`);
          if (storedProgress) {
            setStudentProgress(JSON.parse(storedProgress));
          }
        }

      } catch (error: any)
      {
        showError(t('failed_to_load_curriculum', { message: error.message }));
        console.error('Error fetching curriculum data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [isAuthenticated, userName, authLoading, t]);

  const totalLessons = allLessons.length;
  const completedLessonsCount = studentProgress.filter(p => p.status === 'completed').length;
  const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const handleContinueLearning = () => {
    if (!isAuthenticated) {
      navigate('/simple-login');
      return;
    }

    const completedLessonIds = new Set(studentProgress.filter(p => p.status === 'completed').map(p => p.lesson_id));
    const firstIncompleteLesson = [...allLessons]
      .sort((a, b) => a.order_index - b.order_index)
      .find(lesson => !completedLessonIds.has(lesson.id));

    if (firstIncompleteLesson) {
      navigate(`/lessons/${firstIncompleteLesson.id}`);
    } else {
      showSuccess(t('completed_all_lessons'));
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          {t('welcome_title')}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
          {t('welcome_description')}
        </p>

        {authLoading ? (
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-lg text-muted-foreground mb-4">{t('loading_session')}</p>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : isAuthenticated ? (
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{t('your_progress')}</h2>
            <div className="flex items-center gap-4">
              <Progress value={overallProgress} className="flex-grow" />
              <span className="text-sm font-medium">{overallProgress.toFixed(0)}% {t('completed')}</span>
            </div>
            <Button onClick={handleContinueLearning} className="mt-4 w-full">
              {completedLessonsCount === totalLessons ? t('review_curriculum') : t('continue_learning')}
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-lg text-muted-foreground mb-4">
              {t('sign_in_prompt')}
            </p>
            <Button onClick={() => navigate('/simple-login')} className="w-full md:w-auto">
              {t('go_to_login')}
            </Button>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">{t('curriculum_phases')}</h2>
        {dataLoading ? (
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : phases.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{t('no_phases_found')}</p>
        ) : (
          <BentoGrid className="w-full max-w-6xl mx-auto grid-cols-1 md:grid-cols-2">
            {phases.map((phase, index) => (
              <CurriculumPhaseOverviewCard
                key={phase.id}
                phase={phase}
                modules={modulesByPhase[phase.id] || []}
                allLessons={allLessons}
                studentProgress={studentProgress}
                backgroundImage={backgroundImages[index % backgroundImages.length]}
              />
            ))}
          </BentoGrid>
        )}
      </div>
    </Layout>
  );
};

export default Index;