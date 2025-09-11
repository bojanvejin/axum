import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';
import { useSession } from '@/components/SessionContextProvider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserRoleForm from '@/components/admin/UserRoleForm';

const UserManagement: React.FC = () => {
  const { user, isAdmin, loading: sessionLoading } = useSession();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role, full_name, avatar_url');

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      showError(`Failed to load users: ${error.message}`);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading && isAdmin) {
      fetchUsers();
    }
  }, [sessionLoading, isAdmin]);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    fetchUsers();
  };

  const openEditForm = (userProfile: UserProfile) => {
    setEditingUser(userProfile);
    setIsFormOpen(true);
  };

  if (sessionLoading || loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Loading users...</h2>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
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
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">Manage Users</h1>
        </div>

        {users.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((userProfile) => (
              <Card key={userProfile.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{userProfile.full_name || `${userProfile.first_name} ${userProfile.last_name}`}</CardTitle>
                  <CardDescription>Role: {userProfile.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">ID: {userProfile.id}</p>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditForm(userProfile)}>
                    <Edit className="h-4 w-4" /> Edit Role
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Role</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <UserRoleForm
                userId={editingUser.id}
                currentRole={editingUser.role}
                onSuccess={handleFormSuccess}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserManagement;