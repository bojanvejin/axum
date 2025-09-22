import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Firestore imports
import { CurriculumPhase } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, BookOpenText } from 'lucide-react'; // Added BookOpenText icon
import { useSession } from '@/components/SessionContextProvider'; // New import for session
import { useAdminRole } from '@/hooks/useAdminRole'; // New import
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

const PhaseManagement: React.FC = () => {
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session
  const { isAdmin, loadingAdminRole } = useAdminRole(); // Use the new hook
  const navigate = useNavigate();
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPhase, setEditingPhase] = useState<CurriculumPhase | null>(null);

  const fetchPhases = async () => {
    setLoading(true);
    try {
      const phasesCollectionRef = collection(db, 'phases');
      const phasesSnapshot = await getDocs(query(phasesCollectionRef, orderBy('order_index')));
      const phasesData = phasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumPhase[];
      setPhases(phasesData);
    } catch (error: any) {
      showError(`Failed to load phases: ${error.message}`);
      console.error('Error fetching phases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !loadingAdminRole) {
      if (!user) {
        navigate('/login'); // Redirect if no user is logged in
      } else if (!isAdmin) {
        navigate('/'); // Redirect if user is not an admin
      } else {
        fetchPhases(); // Only fetch if user is logged in and is an admin
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

  const handleDeletePhase = async (phaseId: string) => {
    try {
      await deleteDoc(doc(db, 'phases', phaseId));
      showSuccess('Phase deleted successfully!');
      fetchPhases(); // Refresh the list
    } catch (error: any) {
      showError(`Failed to delete phase: ${error.message}`);
      console.error('Error deleting phase:', error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingPhase(null);
    fetchPhases(); // Refresh the list after successful add/edit
  };

  const openEditForm = (phase: CurriculumPhase) => {
    setEditingPhase(phase);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingPhase(null);
    setIsFormOpen(true);
  };

  if (authLoading || loadingAdminRole || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Manage Curriculum Phases</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Phase
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingPhase ? 'Edit Phase' : 'Add New Phase'}</DialogTitle>
              </DialogHeader>
              <PhaseForm phase={editingPhase} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {phases.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No phases found. Click "Add New Phase" to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <Card key={phase.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{phase.title}</CardTitle>
                  <CardDescription>Duration: {phase.weeks} Weeks</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                  <p className="text-xs text-muted-foreground">Order: {phase.order_index}</p>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/curriculum/phases/${phase.id}/modules`}>
                      <BookOpenText className="h-4 w-4 mr-2" /> View Modules
                    </Link>
                  </Button>
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
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the phase and all associated modules, lessons, and quizzes.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePhase(phase.id)}>
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

export default PhaseManagement;