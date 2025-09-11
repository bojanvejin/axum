import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Quiz, QuizQuestion } from '@/data/curriculum';
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
import QuestionForm from '@/components/admin/QuestionForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const QuestionManagement: React.FC = () => {
  const { role, loading: roleLoading } = useUserRole();
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  const fetchQuestions = async () => {
    if (!quizId) return;
    setLoading(true);
    try {
      const { data: quizData, error: quizError } = await supabase.from('quizzes').select('*').eq('id', quizId).single();
      if (quizError) throw quizError;
      setQuiz(quizData);

      const { data, error } = await supabase.from('quiz_questions').select('*').eq('quiz_id', quizId).order('created_at');
      if (error) throw error;
      setQuestions(data || []);
    } catch (error: any) {
      showError(`Failed to load questions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roleLoading && role === 'admin') {
      fetchQuestions();
    }
  }, [role, roleLoading, quizId]);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const { error } = await supabase.from('quiz_questions').delete().eq('id', questionId);
      if (error) throw error;
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

  if (roleLoading || !quizId) {
    return <Layout><div className="text-center py-8"><p>Loading...</p></div></Layout>;
  }

  if (role !== 'admin') {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
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

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
          </div>
        ) : questions.length === 0 ? (
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