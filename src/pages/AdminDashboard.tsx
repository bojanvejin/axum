import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/components/SessionContextProvider'; // Import useSession

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading } = useSession();

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Loading user role...</h2>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    // This case should ideally be handled by AdminRoute, but as a fallback
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
          <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
        </div>
      </Layout>
    );
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
              <CardTitle>Manage Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Add, edit, or remove course sessions and their lessons.</p>
              <Link to="/admin/curriculum/sessions" className="text-blue-500 hover:underline mt-4 block">Go to Session Management</Link>
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
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">View and manage user roles and profiles.</p>
              <Link to="/admin/users" className="text-blue-500 hover:underline mt-4 block">Go to User Management</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>View Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Access student progress and quiz performance reports.</p>
              <Link to="#" className="text-blue-500 hover:underline mt-4 block">Go to Reports</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Uploads & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Review student submissions and provide feedback.</p>
              <Link to="#" className="text-blue-500 hover:underline mt-4 block">Go to Uploads & Feedback</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generate Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Generate and manage graduation certificates for students.</p>
              <Link to="#" className="text-blue-500 hover:underline mt-4 block">Go to Certificate Generation</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;