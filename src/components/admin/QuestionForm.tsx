import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';
import { PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  question_text: z.string().min(1, 'Question text is required.'),
  question_type: z.literal('mcq'),
  options: z.array(z.string().min(1, 'Option cannot be empty.')).min(2, 'Must have at least two options.'),
  correct_answer: z.string().min(1, 'A correct answer must be selected.'),
  quiz_id: z.string().uuid(),
}).refine(data => data.options.includes(data.correct_answer), {
  message: "Correct answer must be one of the options.",
  path: ["correct_answer"],
});

interface QuestionFormProps {
  quizId: string;
  question?: QuizQuestion | null;
  onSuccess: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ quizId, question, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_text: '',
      question_type: 'mcq',
      options: ['', ''],
      correct_answer: '',
      quiz_id: quizId,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options" as const,
  });

  useEffect(() => {
    if (question) {
      form.reset({ ...question });
    } else {
      form.reset({
        question_text: '',
        question_type: 'mcq',
        options: ['', ''],
        correct_answer: '',
        quiz_id: quizId,
      });
    }
  }, [question, quizId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (question) {
        const { error } = await supabase.from('quiz_questions').update(values).eq('id', question.id);
        if (error) throw error;
        showSuccess('Question updated successfully!');
      } else {
        const { error } = await supabase.from('quiz_questions').insert(values);
        if (error) throw error;
        showSuccess('Question added successfully!');
      }
      onSuccess();
    } catch (error: any) {
      showError(`Failed to save question: ${error.message}`);
    }
  };

  const options = form.watch('options');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="question_text" render={({ field }) => (
          <FormItem><FormLabel>Question Text</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <div>
          <FormLabel>Options</FormLabel>
          <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField control={form.control} name={`options.${index}`} render={({ field }) => (
                  <FormItem className="flex-grow"><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 2}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append('')}><PlusCircle className="mr-2 h-4 w-4" /> Add Option</Button>
        </div>

        <FormField control={form.control} name="correct_answer" render={({ field }) => (
          <FormItem><FormLabel>Correct Answer</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select the correct answer" /></SelectTrigger></FormControl><SelectContent>{options.map((opt, i) => opt && <SelectItem key={i} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Question'}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;