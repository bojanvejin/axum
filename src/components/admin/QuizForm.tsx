import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'; // Firestore imports
import { Quiz } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().optional(),
});

interface QuizFormProps {
  quiz?: Quiz | null;
  onSuccess: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    form.reset({
      title: quiz?.title || '',
      description: quiz?.description || '',
    });
  }, [quiz, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (quiz) {
        const quizDocRef = doc(db, 'quizzes', quiz.id);
        await updateDoc(quizDocRef, values);
        showSuccess('Quiz updated successfully!');
      } else {
        await addDoc(collection(db, 'quizzes'), values);
        showSuccess('Quiz added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save quiz: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Quiz Title" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Brief description of the quiz" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Quiz'}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;