import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore'; // Firestore imports
import { CurriculumModule, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/SessionContextProvider'; // New import for session

const ModuleDetail: React.FC = () => {
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const [module, setModule] = useState<CurriculumModule | null>(null);
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session

  useEffect(() => {
    if (authLoading) {
      return; // Wait for auth state to resolve
    }
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchModuleAndLessons = async () => {
      if (!moduleId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Fetch module data
        const moduleDocRef = doc(db, 'modules', moduleId);
        const moduleDocSnap = await getDoc(moduleDocRef);

        if (!moduleDocSnap.exists()) {
          throw new Error('Module not found');
        }
        setModule({ id: moduleDocSnap.id, ...moduleDocSnap.data() } as CurriculumModule);

        // Fetch lessons for the module
        const lessonsCollectionRef = collection(db, 'lessons');
        const lessonsQuery = query(lessonsCollectionRef, where('module_id', '==', moduleId), orderBy('order_index'));
        const lessonsSnapshot = await getDocs(lessonsQuery);
        const lessonsData = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumLesson[];
        setLessons(lessonsData);

        // Fetch student progress for the current user and lessons in this module
        const progressCollectionRef = collection(db, 'student_progress');
        const progressQuery = query(
          progressCollectionRef,
          where('user_id', '==', user.uid),
          where('lesson_id', 'in', lessonsData.map(l => l.id).length > 0 ? lessonsData.map(l => l.id) : ['dummy_id']) // Use 'in' query for multiple lesson IDs
        );
        const progressSnapshot = await getDocs(progressQuery);
        const userProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[];
        setStudentProgress(userProgress);

      } catch (error: any) {
        showError(`Failed to load module details: ${error.message}`);
        console.error('Error fetching module or lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) {
      fetchModuleAndLessons();
    }
  }, [moduleId, user, authLoading, navigate]);

  const isLessonCompleted = (lessonId: string) => {
    return studentProgress.some(p => p.lesson_id === lessonId && p.status === 'completed');
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
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
        <p className="text-lg text-muted-foreground mt-2 mb-8">{module.description}</p>

        <h2 className="text-2xl font-semibold my-6">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link to={`/lessons/${lesson.id}`} key={lesson.id}>
              <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  {user && (isLessonCompleted(lesson.id) ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-muted-foreground" size={20} />)}
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