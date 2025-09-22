import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumPhaseOverviewCard from "@/components/CurriculumPhaseOverviewCard";
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // Firestore imports
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import CourseCalendar from '@/components/CourseCalendar';
import { useSession } from '@/components/SessionContextProvider'; // New import for session

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
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login'); // Redirect if no user is logged in
      return;
    }

    const fetchData = async () => {
      setDataLoading(true);
      try {
        // Fetch Phases
        const phasesCollection = collection(db, 'phases');
        const phasesSnapshot = await getDocs(query(phasesCollection, orderBy('order_index')));
        const phasesData = phasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumPhase[];
        setPhases(phasesData);

        // Fetch Modules
        const modulesCollection = collection(db, 'modules');
        const modulesSnapshot = await getDocs(query(modulesCollection, orderBy('order_index')));
        const modulesData = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumModule[];

        const organizedModules: Record<string, CurriculumModule[]> = {};
        modulesData.forEach(module => {
          if (!organizedModules[module.phase_id]) {
            organizedModules[module.phase_id] = [];
          }
          organizedModules[module.phase_id].push(module);
        });
        setModulesByPhase(organizedModules);

        // Fetch Lessons
        const lessonsCollection = collection(db, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsData = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumLesson[];
        setAllLessons(lessonsData);

        // Fetch Student Progress for the current user
        if (user) {
          const progressCollectionRef = collection(db, 'student_progress');
          const progressQuery = query(progressCollectionRef, where('user_id', '==', user.uid));
          const progressSnapshot = await getDocs(progressQuery);
          const userProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[];
          setStudentProgress(userProgress);
        } else {
          setStudentProgress([]);
        }

      } catch (error: any) {
        showError(`Failed to load curriculum: ${error.message}`);
        console.error('Error fetching curriculum data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) { // Only fetch data if a user is logged in
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const handleContinueLearning = () => {
    if (!user) {
      navigate('/login');
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

  const courseStartDate = new Date(2025, 8, 8);

  if (authLoading || dataLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-8">
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-8 w-1/4 mb-6 self-start w-full max-w-6xl mx-auto" />
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

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Course Schedule</h2>
        <CourseCalendar startDate={courseStartDate} />

        <h2 className="text-3xl font-bold mb-6 mt-8 self-start w-full max-w-6xl mx-auto">Curriculum Phases</h2>
        {phases.length === 0 ? (
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