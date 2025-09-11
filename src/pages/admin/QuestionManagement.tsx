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
import QuestionForm from '@/components/admin/QuestionForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const QuestionManagement: React.FC = () => {
  // Removed role and loading: roleLoading from useUserRole
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const { t } = useLanguage(); // Use translation hook

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
      showError(t('failed_to_load_questions', { message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Removed roleLoading and role === 'admin' check
    fetchQuestions();
  }, [quizId, t]); // Removed role, roleLoading

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const { error } = await supabase.from('quiz_questions').delete().eq('id', questionId);
      if (error) throw error;
      showSuccess(t('question_deleted_successfully'));
      fetchQuestions();
    } catch (error: any) {
      showError(t('failed_to_delete_question', { message: error.message }));
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

  if (!quizId) { // Removed roleLoading
    return <Layout><div className="text-center py-8"><p>{t('loading')}</p></div></Layout>;
  }

  // Removed if (role !== 'admin') block

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/curriculum/quizzes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">{t('questions_for', { title: quiz?.title || '' })}</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_question')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingQuestion ? t('edit_question') : t('add_new_question')}</DialogTitle>
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
          <p className="text-muted-foreground text-center py-8">{t('no_questions_found')}</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle>{t('question_text')} {index + 1}</CardTitle>
                    <CardDescription>{q.question_text}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditForm(q)}><Edit className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle><AlertDialogDescription>{t('delete_question_description')}</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>{t('cancel')}</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteQuestion(q.id)}>{t('delete')}</AlertDialogAction></AlertDialogFooter>
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