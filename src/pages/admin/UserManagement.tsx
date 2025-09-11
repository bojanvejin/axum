import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserRoleForm from '@/components/admin/UserRoleForm';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

interface ManagedUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'admin';
}

const UserManagement: React.FC = () => {
  const { role, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const { t } = useLanguage(); // Use translation hook

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-users');
      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      showError(t('failed_to_load_users', { message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roleLoading && role === 'admin') {
      fetchUsers();
    }
  }, [role, roleLoading, t]);

  const handleFormSuccess = () => {
    setEditingUser(null);
    fetchUsers();
  };

  if (roleLoading) {
    return <Layout><div className="text-center py-8"><p>{t('loading')}</p></div></Layout>;
  }

  if (role !== 'admin') {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">{t('access_denied')}</h2>
          <Link to="/" className="text-blue-500 hover:underline">{t('return_to_home')}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('manage_users_page_title')}</h1>
        
        <Dialog open={!!editingUser} onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('edit_role_for', { email: editingUser?.email || '' })}</DialogTitle>
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

        <div className="border rounded-lg">
          {loading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('role')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>
                        <Edit className="h-4 w-4 mr-2" /> {t('edit_role')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;