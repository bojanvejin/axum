import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumPhaseOverviewCard from "@/components/CurriculumPhaseOverviewCard";
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility
import { getLocalStudentProgress, setLocalStudentProgress } from '@/utils/localProgress'; // Import local progress utility
import CourseCalendar from '@/components/CourseCalendar'; // New import

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
  const [localUser, setLocalUser] = useState<{ id: string; name: string } | null>(null); // State for local user
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalUser();
    if (!user) {
      navigate('/enter-name'); // Redirect if no user name is set
      return;
    }
    setLocalUser(user);

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

        // Load student progress from local storage
        if (user) {
          setStudentProgress(getLocalStudentProgress(user.id));
        }

      } catch (error: any)
      {
        showError(`Failed to load curriculum: ${error.message}`);
        console.error('Error fetching curriculum data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) { // Only fetch data if a local user is present
      fetchData();
    }
  }, [navigate]); // Depend on navigate to ensure redirect works

  const totalLessons = allLessons.length;
  const completedLessonsCount = studentProgress.filter(p => p.status === 'completed').length;
  const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const handleContinueLearning = () => {
    if (!localUser) {
      navigate('/enter-name');
      return;
    }

    const completedLessonIds = new Set(studentProgress.filter(p => p.status === 'completed').map(p => p.lesson_id));
    const firstIncompleteLesson = [...allLessons]
      .sort((a, b) => a.order_index - b.order_index)
      .find(lesson => !completedLessonIds.has(lesson.id));

    if (firstIncompleteLesson) {
      navigate(`/lessons/${firstIncompleteLesson.id}`);
    } else {
      showSuccess("You've completed all lessons! Congratulations!");
    }
  };

  // Calculate the course start date: last Monday from today (Sept 11, 2025)
  // September is month 8 (0-indexed)
  const courseStartDate = new Date(2025, 8, 8); 

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          Welcome to the Axum Training Curriculum
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
          Your journey to mastering the art of hair styling starts here. Track your progress, complete lessons, and unlock your potential.
        </p>

        {dataLoading ? ( // Use dataLoading for overall content loading
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-lg text-muted-foreground mb-4">Loading curriculum data...</p>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : localUser ? ( // Show progress if local user exists and data is loaded
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <div className="flex items-center gap-4">
              <Progress value={overallProgress} className="flex-grow" />
              <span className="text-sm font-medium">{overallProgress.toFixed(0)}% Complete</span>
            </div>
            <Button onClick={handleContinueLearning} className="mt-4 w-full">
              {completedLessonsCount === totalLessons ? "Review Curriculum" : "Continue Learning"}
            </Button>
          </div>
        ) : ( // Fallback if no local user (should be redirected by now)
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Please enter your name to track your progress and access full features.
            </p>
            <Button onClick={() => navigate('/enter-name')} className="w-full md:w-auto">
              Enter Your Name
            </Button>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Course Schedule</h2>
        <CourseCalendar startDate={courseStartDate} />

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Curriculum Phases</h2>
        {dataLoading ? (
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : phases.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No curriculum phases found.</p>
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