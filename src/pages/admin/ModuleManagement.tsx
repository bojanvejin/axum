import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useParams } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ModuleForm from '@/components/admin/ModuleForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ModuleManagement: React.FC = () => {
  const { role, loading: roleLoading } = useUserRole();
  const { phaseId } = useParams<{ phaseId: string }>();
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [phaseTitle, setPhaseTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CurriculumModule | null>(null);

  const fetchModules = async () => {
    setLoading(true);
    try {
      // Fetch phase title
      const { data: phaseData, error: phaseError } = await supabase
        .from('phases')
        .select('title')
        .eq('id', phaseId)
        .single();

      if (phaseError) throw phaseError;
      setPhaseTitle(phaseData?.title || 'Unknown Phase');

      // Fetch modules for the phase
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('phase_id', phaseId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setModules(data || []);
    } catch (error: any) {
      showError(`Failed to load modules: ${error.message}`);
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roleLoading && role === 'admin' && phaseId) {
      fetchModules();
    }
  }, [role, roleLoading, phaseId]);

  const handleDeleteModule = async (moduleId: string) => {
    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;
      showSuccess('Module deleted successfully!');
      fetchModules(); // Refresh the list
    } catch (error: any) {
      showError(`Failed to delete module: ${error.message}`);
      console.error('Error deleting module:', error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingModule(null);
    fetchModules(); // Refresh the list after successful add/edit
  };

  const openEditForm = (module: CurriculumModule) => {
    setEditingModule(module);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingModule(null);
    setIsFormOpen(true);
  };

  if (roleLoading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Loading user role...</h2>
        </div>
      </Layout>
    );
  }

  if (role !== 'admin') {
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

  if (!phaseId) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Phase ID missing.</h2>
          <Link to="/admin/curriculum/phases" className="text-blue-500 hover:underline">Return to Phase Management</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/curriculum/phases">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">Modules for "{phaseTitle}"</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingModule ? 'Edit Module' : 'Add New Module'}</DialogTitle>
              </DialogHeader>
              <ModuleForm phaseId={phaseId} module={editingModule} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : modules.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No modules found for this phase. Click "Add New Module" to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <p className="text-xs text-muted-foreground">Order: {module.order_index}</p>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditForm(module)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the module and all associated lessons and quizzes.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteModule(module.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ModuleManagement;