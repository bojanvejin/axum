import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumPhase } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
// Removed useUserRole import
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
import PhaseForm from '@/components/admin/PhaseForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const PhaseManagement: React.FC = () => {
  // Removed role and loading: roleLoading from useUserRole
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPhase, setEditingPhase] = useState<CurriculumPhase | null>(null);
  const { t } = useLanguage(); // Use translation hook

  const fetchPhases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setPhases(data || []);
    } catch (error: any) {
      showError(t('failed_to_load_phases', { message: error.message }));
      console.error('Error fetching phases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Removed roleLoading and role === 'admin' check
    fetchPhases();
  }, [t]); // Removed role, roleLoading

  const handleDeletePhase = async (phaseId: string) => {
    try {
      const { error } = await supabase
        .from('phases')
        .delete()
        .eq('id', phaseId);

      if (error) throw error;
      showSuccess(t('phase_deleted_successfully'));
      fetchPhases();
    } catch (error: any) {
      showError(t('failed_to_delete_phase', { message: error.message }));
      console.error('Error deleting phase:', error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingPhase(null);
    fetchPhases();
  };

  const openEditForm = (phase: CurriculumPhase) => {
    setEditingPhase(phase);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingPhase(null);
    setIsFormOpen(true);
  };

  // Removed if (roleLoading) block
  // Removed if (role !== 'admin') block

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">{t('manage_curriculum_phases')}</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_phase')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingPhase ? t('edit_phase') : t('add_new_phase')}</DialogTitle>
              </DialogHeader>
              <PhaseForm phase={editingPhase} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : phases.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{t('no_phases_found_admin')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <Card key={phase.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{phase.title}</CardTitle>
                  <CardDescription>{t('duration_weeks', { weeks: phase.weeks })}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                  <p className="text-xs text-muted-foreground">{t('order_index')}: {phase.order_index}</p>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditForm(phase)}>
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
                        <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('delete_phase_description')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePhase(phase.id)}>
                          {t('delete')}
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

export default PhaseManagement;