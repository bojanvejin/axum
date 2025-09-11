import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import LessonForm from '@/components/admin/LessonForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const LessonManagement: React.FC = () => {
  // Removed role and loading: roleLoading from useUserRole
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<CurriculumLesson | null>(null);
  const { t } = useLanguage(); // Use translation hook

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('title')
        .eq('id', moduleId)
        .single();
      if (moduleError) throw moduleError;
      setModuleTitle(moduleData?.title || 'Unknown Module');

      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index', { ascending: true });
      if (error) throw error;
      setLessons(data || []);
    } catch (error: any) {
      showError(t('failed_to_load_lessons', { message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Removed roleLoading and role === 'admin' check
    if (moduleId) {
      fetchLessons();
    }
  }, [moduleId, t]); // Removed role, roleLoading

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const { error } = await supabase.from('lessons').delete().eq('id', lessonId);
      if (error) throw error;
      showSuccess(t('lesson_deleted_successfully'));
      fetchLessons();
    } catch (error: any) {
      showError(t('failed_to_delete_lesson', { message: error.message }));
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingLesson(null);
    fetchLessons();
  };

  const openEditForm = (lesson: CurriculumLesson) => {
    setEditingLesson(lesson);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingLesson(null);
    setIsFormOpen(true);
  };

  if (!moduleId) { // Removed roleLoading
    return <Layout><div className="text-center py-8"><p>{t('loading')}</p></div></Layout>;
  }

  // Removed if (role !== 'admin') block

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/curriculum/phases/${phaseId}/modules`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">{t('lessons_for', { title: moduleTitle })}</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_lesson')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingLesson ? t('edit_lesson') : t('add_new_lesson')}</DialogTitle>
              </DialogHeader>
              <LessonForm moduleId={moduleId} lesson={editingLesson} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
          </div>
        ) : lessons.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{t('no_lessons_found')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{lesson.objectives}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t('order_index')}: {lesson.order_index}</p>
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditForm(lesson)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('delete_lesson_description')}</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteLesson(lesson.id)}>{t('delete')}</AlertDialogAction>
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

export default LessonManagement;