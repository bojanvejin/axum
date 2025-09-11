import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import SessionOverviewCard from "@/components/SessionOverviewCard";
import { CurriculumSession, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import CourseCalendar from '@/components/CourseCalendar';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility

const backgroundImages = [
  '/images/axum-salon-interior.jpeg',
  '/images/ancientbarber4.jpg',
];

const courseObjectives = [
  "Understand the history and evolution of line cutting and precision cutting.",
  "Master the tools and techniques used in line cutting and precision cutting.",
  "Develop the skills to create a wide range of designs and styles using line cutting and precision cutting.",
  "Understand the importance of cleanliness and hygiene in the barbering profession.",
  "Gain confidence and proficiency in performing line cutting and precision cutting on live clients.",
];

const Index = () => {
  const localUser = getLocalUser(); // Get local user
  const [sessions, setSessions] = useState<CurriculumSession[]>([]);
  const [allLessons, setAllLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUser) {
      navigate('/enter-name'); // Redirect if no local user
      return;
    }

    const fetchData = async () => {
      setDataLoading(true);
      try {
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('*')
          .order('session_number', { ascending: true });
        if (sessionsError) throw sessionsError;
        setSessions(sessionsData || []);

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*');
        if (lessonsError) throw lessonsError;
        setAllLessons(lessonsData || []);

        // Load student progress from Supabase using local user ID
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('*')
          .eq('user_id', localUser.id); // Use localUser.id
        if (progressError) throw progressError;
        setStudentProgress(progressData || []);

      } catch (error: any) {
        showError(`Failed to load curriculum: ${error.message}`);
        console.error('Error fetching curriculum data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (localUser) {
      fetchData();
    }
  }, [localUser, navigate]);

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

  if (dataLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-8" />
          <Skeleton className="h-48 w-full max-w-3xl mb-12" />
          <Skeleton className="h-10 w-full max-w-3xl mb-12" />
          <Skeleton className="h-8 w-1/4 mb-6 self-start ml-auto mr-auto" />
          <Skeleton className="h-64 w-full max-w-6xl" />
          <Skeleton className="h-8 w-1/4 mb-6 mt-8 self-start ml-auto mr-auto" />
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          Welcome to the Axum Training Curriculum
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
          Your journey to mastering the art of hair styling starts here. Track your progress, complete lessons, and unlock your potential.
        </p>

        <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Course Objectives</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            {courseObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        {localUser ? (
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
        ) : (
          <div className="w-full max-w-3xl mb-12 p-4 border rounded-lg bg-card shadow-sm text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Please enter your name to track your progress and access full features.
            </p>
            <Button onClick={() => navigate('/enter-name')} className="w-full md:w-auto">
              Enter Name
            </Button>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Course Schedule</h2>
        <CourseCalendar startDate={courseStartDate} />

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Course Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No course sessions found.</p>
        ) : (
          <BentoGrid className="w-full max-w-6xl mx-auto grid-cols-1 md:grid-cols-2">
            {sessions.map((session, index) => (
              <SessionOverviewCard
                key={session.id}
                session={session}
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