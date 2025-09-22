import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc as getFirestoreDoc } from 'firebase/firestore'; // Firestore imports
import { Quiz, QuizQuestion } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
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
import QuestionForm from '@/components/admin/QuestionForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const QuestionManagement: React.FC = () => {
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session
  const { isAdmin, loadingAdminRole } = useAdminRole(); // Use the new hook
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  const fetchQuestions = async () => {
    if (!quizId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // Fetch quiz details
      const quizDocRef = doc(db, 'quizzes', quizId);
      const quizDocSnap = await getFirestoreDoc(quizDocRef);
      if (quizDocSnap.exists()) {
        setQuiz({ id: quizDocSnap.id, ...quizDocSnap.data() } as Quiz);
      } else {
        setQuiz(null);
      }

      // Fetch questions for the quiz
      const questionsCollectionRef = collection(db, 'quiz_questions');
      const questionsQuery = query(questionsCollectionRef, where('quiz_id', '==', quizId), orderBy('created_at'));
      const questionsSnapshot = await getDocs(questionsQuery);
      const questionsData = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as QuizQuestion[];
      setQuestions(questionsData);
    } catch (error: any) {
      showError(`Failed to load questions: ${error.message}`);
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
      } else if (quizId) {
        fetchQuestions(); // Only fetch if user is logged in, is an admin, and quizId is available
      }
    }
  }, [user, authLoading, isAdmin, loadingAdminRole, navigate, quizId]);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await deleteDoc(doc(db, 'quiz_questions', questionId));
      showSuccess('Question deleted successfully!');
      fetchQuestions();
    } catch (error: any) {
      showError(`Failed to delete question: ${error.message}`);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingQuestion(null);
    fetchQuestions();
  };

  const openEditForm = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingQuestion(null);
    setIsFormOpen(true);
  };

  if (authLoading || loadingAdminRole || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will be redirected by useEffect
  }

  if (!quizId) {
    return <Layout><div className="text-center py-8"><p>Quiz ID missing.</p></div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/curriculum/quizzes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">Questions for "{quiz?.title}"</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</DialogTitle>
              </DialogHeader>
              <QuestionForm quizId={quizId} question={editingQuestion} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {questions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No questions found. Click "Add New Question" to get started!</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle>Question {index + 1}</CardTitle>
                    <CardDescription>{q.question_text}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditForm(q)}><Edit className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the question.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteQuestion(q.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {q.options.map((opt, i) => (
                      <li key={i} className={opt === q.correct_answer ? 'font-bold text-green-600' : ''}>- {opt}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuestionManagement;