import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Firestore imports
import { Quiz } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, ListChecks } from 'lucide-react';
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
import QuizForm from '@/components/admin/QuizForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const QuizManagement: React.FC = () => {
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session
  const { isAdmin, loadingAdminRole } = useAdminRole(); // Use the new hook
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const quizzesCollectionRef = collection(db, 'quizzes');
      const quizzesSnapshot = await getDocs(query(quizzesCollectionRef, orderBy('created_at', 'desc')));
      const quizzesData = quizzesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Quiz[];
      setQuizzes(quizzesData);
    } catch (error: any) {
      showError(`Failed to load quizzes: ${error.message}`);
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
        fetchQuizzes(); // Only fetch if user is logged in and is an admin
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate]);

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await deleteDoc(doc(db, 'quizzes', quizId));
      showSuccess('Quiz deleted successfully!');
      fetchQuizzes();
    } catch (error: any) {
      showError(`Failed to delete quiz: ${error.message}`);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingQuiz(null);
    fetchQuizzes();
  };

  const openEditForm = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingQuiz(null);
    setIsFormOpen(true);
  };

  if (authLoading || loadingAdminRole || loading) {
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
    return null; // Will be redirected by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Manage Quizzes</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}</DialogTitle>
              </DialogHeader>
              <QuizForm quiz={editingQuiz} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No quizzes found. Click "Add New Quiz" to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{quiz.description}</CardDescription>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/curriculum/quizzes/${quiz.id}/questions`}>
                      <ListChecks className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditForm(quiz)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete the quiz and all its questions.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteQuiz(quiz.id)}>Delete</AlertDialogAction>
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

export default QuizManagement;