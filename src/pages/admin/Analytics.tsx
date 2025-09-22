import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client';
import { collection, getDocs, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/components/SessionContextProvider';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { showError } from '@/utils/toast';
import { CurriculumLesson, StudentProgress, QuizAttempt } from '@/data/curriculum';

interface AnalyticsData {
  totalStudents: number;
  totalLessons: number;
  totalCompletedLessons: number;
  averageQuizScore: number;
  lessonCompletionData: { name: string; completions: number }[];
}

const AnalyticsPage: React.FC = () => {
  const { user, loading: authLoading } = useSession();
  const { isAdmin, loadingAdminRole } = useAdminRole();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (!authLoading && !loadingAdminRole) {
      if (!user) navigate('/login');
      else if (!isAdmin) navigate('/');
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [profilesSnap, lessonsSnap, progressSnap, attemptsSnap] = await Promise.all([
            getDocs(collection(db, 'profiles')),
            getDocs(collection(db, 'lessons')),
            getDocs(query(collection(db, 'student_progress'))),
            getDocs(collection(db, 'quiz_attempts')),
          ]);

          const profiles = profilesSnap.docs.map(doc => doc.data());
          const lessons = lessonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumLesson[];
          const progress = progressSnap.docs.map(doc => doc.data()) as StudentProgress[];
          const attempts = attemptsSnap.docs.map(doc => doc.data()) as QuizAttempt[];

          // Calculate analytics
          const totalStudents = profiles.filter(p => p.role !== 'admin').length;
          const totalLessons = lessons.length;

          const completedProgress = progress.filter(p => p.status === 'completed');
          const totalCompletedLessons = completedProgress.length;

          const averageQuizScore = attempts.length > 0
            ? attempts.reduce((acc, attempt) => acc + attempt.score, 0) / attempts.length
            : 0;

          const lessonCompletionCounts = new Map<string, number>();
          completedProgress.forEach(p => {
            lessonCompletionCounts.set(p.lesson_id, (lessonCompletionCounts.get(p.lesson_id) || 0) + 1);
          });

          const lessonCompletionData = lessons
            .map(lesson => ({
              name: lesson.title.substring(0, 25) + (lesson.title.length > 25 ? '...' : ''), // Truncate for chart
              completions: lessonCompletionCounts.get(lesson.id) || 0,
            }))
            .sort((a, b) => b.completions - a.completions);

          setAnalytics({
            totalStudents,
            totalLessons,
            totalCompletedLessons,
            averageQuizScore,
            lessonCompletionData,
          });

        } catch (error: any) {
          showError(`Failed to load analytics data: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAdmin]);

  if (authLoading || loadingAdminRole || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return <Layout><p>No analytics data available.</p></Layout>;
  }

  const overallProgress = analytics.totalStudents * analytics.totalLessons > 0
    ? (analytics.totalCompletedLessons / (analytics.totalStudents * analytics.totalLessons)) * 100
    : 0;

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold">Analytics Hub</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">{analytics.totalCompletedLessons} total lessons completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageQuizScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalLessons}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lesson Completions</CardTitle>
            <CardDescription>Number of students who have completed each lesson.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analytics.lessonCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completions" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;