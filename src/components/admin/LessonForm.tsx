import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore'; // Firestore imports
import { CurriculumLesson } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  objectives: z.string().optional(),
  content_html: z.string().optional(),
  video_url: z.string().url().optional().or(z.literal('')),
  resources_url: z.string().url().optional().or(z.literal('')),
  order_index: z.coerce.number().min(0),
  module_id: z.string().min(1, 'Module ID is required.'),
  quiz_id: z.string().nullable().optional(),
});

interface LessonFormProps {
  moduleId: string;
  lesson?: CurriculumLesson | null;
  onSuccess: () => void;
}

interface Quiz {
  id: string;
  title: string;
}

const LessonForm: React.FC<LessonFormProps> = ({ moduleId, lesson, onSuccess }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      objectives: '',
      content_html: '',
      video_url: '',
      resources_url: '',
      order_index: 0,
      module_id: moduleId,
      quiz_id: null,
    },
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesCollectionRef = collection(db, 'quizzes');
        const quizzesSnapshot = await getDocs(query(quizzesCollectionRef, orderBy('title')));
        const quizzesData = quizzesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Quiz[];
        setQuizzes(quizzesData);
      } catch (error: any) {
        showError('Failed to load quizzes.');
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (lesson) {
      form.reset({ ...lesson, quiz_id: lesson.quiz_id || null });
    } else {
      form.reset({
        title: '',
        objectives: '',
        content_html: '',
        video_url: '',
        resources_url: '',
        order_index: 0,
        module_id: moduleId,
        quiz_id: null,
      });
    }
  }, [lesson, moduleId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = { ...values, quiz_id: values.quiz_id || null };
      if (lesson) {
        const lessonDocRef = doc(db, 'lessons', lesson.id);
        await updateDoc(lessonDocRef, payload);
        showSuccess('Lesson updated successfully!');
      } else {
        await addDoc(collection(db, 'lessons'), payload);
        showSuccess('Lesson added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save lesson: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="objectives" render={({ field }) => (
          <FormItem><FormLabel>Objectives</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="content_html" render={({ field }) => (
          <FormItem><FormLabel>Content (HTML)</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="video_url" render={({ field }) => (
          <FormItem><FormLabel>Video URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="resources_url" render={({ field }) => (
          <FormItem><FormLabel>Resources URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="quiz_id" render={({ field }) => (
          <FormItem><FormLabel>Quiz</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || ''}><FormControl><SelectTrigger><SelectValue placeholder="Select a quiz" /></SelectTrigger></FormControl><SelectContent><SelectItem value="">No Quiz</SelectItem>{quizzes.map(q => (<SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="order_index" render={({ field }) => (
          <FormItem><FormLabel>Order Index</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Lesson'}
        </Button>
      </form>
    </Form>
  );
};

export default LessonForm;