import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumPhaseOverviewCard from "@/components/CurriculumPhaseOverviewCard";
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from "@/data/curriculum";
import { db } from '@/integrations/firebase/client';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import CourseCalendar from '@/components/CourseCalendar';
import { useSession } from '@/components/SessionContextProvider';

const weeklyBackgroundImages = [
  '/images/week-1-bg.jpg',
  '/images/week-2-bg.jpg',
  '/images/week-3-bg.jpg',
  '/images/week-4-bg.jpg',
  '/images/week-5-bg.jpg',
  '/images/week-6-bg.jpg',
];

const defaultBackgroundImage = '/images/axum-salon-interior.jpeg';

const Index = () => {
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [modulesByPhase, setModulesByPhase] = useState<Record<string, CurriculumModule[]>>({});
  const [allLessons, setAllLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession();

  // Effect for public curriculum data
  useEffect(() => {
    const fetchPublicData = async () => {
      setDataLoading(true);
      try {
        const phasesCollection = collection(db, 'phases');
        const phasesSnapshot = await getDocs(query(phasesCollection, orderBy('order_index')));
        const phasesData = phasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumPhase[];
        setPhases(phasesData);

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

        const lessonsCollection = collection(db, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsData = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumLesson[];
        setAllLessons(lessonsData);
      } catch (error: any) {
        showError(`Failed to load curriculum structure: ${error.message}`);
        console.error('Error fetching public curriculum data:', error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  // Effect for user-specific progress data
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserProgress = async () => {
      try {
        const progressCollectionRef = collection(db, 'student_progress');
        const progressQuery = query(progressCollectionRef, where('user_id', '==', user.uid));
        const progressSnapshot = await getDocs(progressQuery);
        const userProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[];
        setStudentProgress(userProgress);
      } catch (error: any) {
        console.error('Could not fetch student progress, this might be due to Firestore rules propagation delay:', error);
        setStudentProgress([]);
      }
    };

    fetchUserProgress();
  }, [user, authLoading, navigate]);

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
            {phases.map((phase) => {
              let backgroundImage = defaultBackgroundImage;
              const match = phase.title.match(/Week (\d+)/);
              if (match) {
                const weekNumber = parseInt(match[1], 10);
                if (weekNumber > 0 && weekNumber <= weeklyBackgroundImages.length) {
                  backgroundImage = weeklyBackgroundImages[weekNumber - 1];
                }
              }

              return (
                <CurriculumPhaseOverviewCard
                  key={phase.id}
                  phase={phase}
                  modules={modulesByPhase[phase.id] || []}
                  allLessons={allLessons}
                  studentProgress={studentProgress}
                  backgroundImage={backgroundImage}
                />
              );
            })}
          </BentoGrid>
        )}
      </div>
    </Layout>
  );
};

export default Index;