import React from 'react';
import Layout from '@/components/Layout';
// useUserRole is no longer needed
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  // role and loading are no longer needed
  // const { role, loading } = useUserRole();

  // Since we removed Supabase auth, there's no concept of 'admin' role.
  // For now, we'll assume anyone who navigates here can see it,
  // but in a real application, you'd implement a different authorization mechanism.

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
          {/* User Management card removed */}
          <Card>
            <CardHeader>
              <CardTitle>View Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Access student progress and quiz performance reports.</p>
              <Link to="#" className="text-blue-500 hover:underline mt-4 block">Go to Reports</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;