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
import LessonForm from '@/components/admin/LessonForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const LessonManagement: React.FC = () => {
  const { role, loading: roleLoading } = useUserRole();
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<CurriculumLesson | null>(null);

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
      showError(`Failed to load lessons: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roleLoading && role === 'admin' && moduleId) {
      fetchLessons();
    }
  }, [role, roleLoading, moduleId]);

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const { error } = await supabase.from('lessons').delete().eq('id', lessonId);
      if (error) throw error;
      showSuccess('Lesson deleted successfully!');
      fetchLessons();
    } catch (error: any) {
      showError(`Failed to delete lesson: ${error.message}`);
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

  if (roleLoading || !moduleId) {
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
            <Link to={`/admin/curriculum/phases/${phaseId}/modules`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">Lessons for "{moduleTitle}"</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Lesson
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
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
          <p className="text-muted-foreground text-center py-8">No lessons found. Click "Add New Lesson" to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{lesson.objectives}</p>
                  <p className="text-xs text-muted-foreground mt-2">Order: {lesson.order_index}</p>
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
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete the lesson.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteLesson(lesson.id)}>Delete</AlertDialogAction>
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