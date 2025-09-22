import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/components/SessionContextProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminRole } from '@/hooks/useAdminRole';
import SeedDatabaseButton from '@/components/admin/SeedDatabaseButton'; // New import

const AdminDashboard: React.FC = () => {
  const { user, loading: authLoading } = useSession();
  const { isAdmin, loadingAdminRole } = useAdminRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !loadingAdminRole) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        // If user is logged in but not an admin, redirect to home
        navigate('/');
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

  if (authLoading || loadingAdminRole) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirect handled by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome, Admin! This is where you can manage various aspects of the platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Add, edit, or remove phases, modules, and lessons.</p>
              <Link to="/admin/curriculum/phases" className="text-blue-500 hover:underline mt-4 block">Go to Curriculum Management</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Create and manage quizzes and their questions.</p>
              <Link to="/admin/curriculum/quizzes" className="text-blue-500 hover:underline mt-4 block">Go to Quiz Management</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analytics Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Access student progress and quiz performance reports.</p>
              <Link to="/admin/analytics" className="text-blue-500 hover:underline mt-4 block">Go to Analytics</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Database Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">Manually re-seed the entire curriculum database.</p>
              <SeedDatabaseButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;