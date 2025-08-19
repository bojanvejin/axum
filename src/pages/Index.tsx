import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumCard from "@/components/CurriculumCard";
import { CurriculumPhase, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUserRole } from '@/hooks/useUserRole';

const Index = () => {
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [allLessons, setAllLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useSession();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch phases
        const { data: phasesData, error: phasesError } = await supabase
          .from('phases')
          .select('*')
          .order('order_index', { ascending: true });
        if (phasesError) throw phasesError;
        setPhases(phasesData || []);

        // Fetch all lessons to calculate overall progress
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('id, module_id, order_index'); // Only need ID and order for progress calculation
        if (lessonsError) throw lessonsError;
        setAllLessons(lessonsData || []);

        // Fetch student progress if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('student_progress')
            .select('*')
            .eq('user_id', user.id);
          if (progressError) throw progressError;
          setStudentProgress(progressData || []);
        }

      } catch (error: any) {
        showError(`Failed to load curriculum: ${error.message}`);
        console.error('Error fetching curriculum data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchData();
    }
  }, [user, userLoading]);

  const totalLessons = allLessons.length;
  const completedLessonsCount = studentProgress.filter(p => p.status === 'completed').length;
  const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const handleContinueLearning = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Find the first incomplete lesson
    const completedLessonIds = new Set(studentProgress.filter(p => p.status === 'completed').map(p => p.lesson_id));
    const firstIncompleteLesson = allLessons
      .sort((a, b) => a.order_index - b.order_index) // Sort by order_index
      .find(lesson => !completedLessonIds.has(lesson.id));

    if (firstIncompleteLesson) {
      navigate(`/lessons/${firstIncompleteLesson.id}`);
    } else {
      showSuccess("You've completed all lessons! Congratulations!");
      // Optionally navigate to a completion page or dashboard
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          AXUM Internal Training Curriculum
        </h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mb-12">
          This platform provides a detailed guide for building the Axum Education Platform.
        </p>

        {!userLoading && user ? (
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <div className="flex items-center gap-4">
              <Progress value={overallProgress} className="flex-grow" />
              <span className="text-sm font-medium">{overallProgress.toFixed(0)}% Complete</span>
            </div>
            <Button onClick={handleContinueLearning} className="mt-4 w-full">
              {completedLessonsCount === totalLessons ? "View Completed Curriculum" : "Continue Learning"}
            </Button>
            {!roleLoading && (
              <p className="text-sm text-muted-foreground mt-4">
                Your role: <span className="font-bold capitalize">{role}</span>
              </p>
            )}
          </div>
        ) : (
          !userLoading && (
            <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Please <Link to="/login" className="text-blue-500 hover:underline">sign in</Link> to track your progress and access full features.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full md:w-auto">
                Go to Login
              </Button>
            </div>
          )
        )}

        {loading ? (
          <BentoGrid className="w-full max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 md:col-span-2" />
            ))}
          </BentoGrid>
        ) : (
          <BentoGrid className="w-full max-w-6xl mx-auto">
            {phases.map((phase) => (
              <Link to={`/phases/${phase.id}`} key={phase.id} className="block">
                <CurriculumCard phase={phase} />
              </Link>
            ))}
          </BentoGrid>
        )}
      </div>
    </Layout>
  );
};

export default Index;