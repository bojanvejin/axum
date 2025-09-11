import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility
import { QuizAttempt } from '@/data/curriculum'; // Import QuizAttempt interface

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
}

interface QuizComponentProps {
  quizId: string;
  lessonId: string;
  onQuizAttempted?: (score: number, totalQuestions: number) => void;
}

const MAX_ATTEMPTS = 3;
const PASSING_SCORE = 90; // Equivalent to an 'A'

const QuizComponent: React.FC<QuizComponentProps> = ({ quizId, lessonId, onQuizAttempted }) => {
  const localUser = getLocalUser(); // Get local user
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingResultsOf, setViewingResultsOf] = useState<QuizAttempt | null>(null);

  const bestAttempt = attempts.reduce((max, current) => (current.score > max.score ? current : max), { id: '', score: -1, answers: {}, submitted_at: '' });
  const hasPassed = bestAttempt.score >= PASSING_SCORE;
  const attemptsMade = attempts.length;
  const canAttempt = !hasPassed && attemptsMade < MAX_ATTEMPTS;

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!quizId || !localUser) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', quizId)
          .order('created_at', { ascending: true });
        if (questionsError) throw questionsError;
        setQuestions(questionsData || []);

        // Fetch quiz attempts from Supabase using local user ID
        const { data: attemptsData, error: attemptsError } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('user_id', localUser.id) // Use localUser.id
          .eq('quiz_id', quizId)
          .order('submitted_at', { ascending: true });
        if (attemptsError) throw attemptsError;
        setAttempts(attemptsData || []);

        const latestAttempt = attemptsData?.[attemptsData.length - 1];
        const best = attemptsData?.reduce((max, current) => (current.score > (max?.score ?? -1) ? current : max), null);
        const passed = best && best.score >= PASSING_SCORE;

        if (passed) {
          setViewingResultsOf(best);
        } else if (latestAttempt) {
          setViewingResultsOf(latestAttempt);
        }

      } catch (error: any) {
        showError(`Failed to load quiz: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (localUser) {
      fetchQuizData();
    } else {
      setLoading(false); // Not identified, so no quiz data to load
    }
  }, [quizId, localUser]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!localUser) {
      showError("You must be identified to submit a quiz.");
      return;
    }
    setIsSubmitting(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct_answer) {
        correctCount++;
      }
    });

    const calculatedScore = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

    try {
      const newAttempt: Omit<QuizAttempt, 'id'> = {
        user_id: localUser.id, // Use localUser.id
        quiz_id: quizId,
        score: calculatedScore,
        answers: userAnswers,
        submitted_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('quiz_attempts').insert(newAttempt).select().single();
      if (error) throw error;

      showSuccess(`Attempt ${attemptsMade + 1} submitted! Your score: ${calculatedScore.toFixed(0)}%`);

      const updatedAttempts = [...attempts, data];
      setAttempts(updatedAttempts);
      setViewingResultsOf(data);

      onQuizAttempted?.(calculatedScore, questions.length);
    } catch (error: any) {
      showError(`Failed to submit quiz: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setViewingResultsOf(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    );
  }

  if (!localUser) {
    return <p className="text-muted-foreground">Please enter your name to take the quiz.</p>;
  }

  if (questions.length === 0) {
    return <p className="text-muted-foreground">No questions available for this quiz yet.</p>;
  }

  const answersToShow = viewingResultsOf?.answers || userAnswers;
  const isViewingMode = !!viewingResultsOf;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
        <CardDescription>
          {hasPassed && `Congratulations! You passed with a score of ${bestAttempt.score.toFixed(0)}%.`}
          {!hasPassed && attemptsMade >= MAX_ATTEMPTS && `You have used all ${MAX_ATTEMPTS} attempts. Your best score was ${bestAttempt.score.toFixed(0)}%.`}
          {canAttempt && `Attempt ${attemptsMade + 1} of ${MAX_ATTEMPTS}. You need ${PASSING_SCORE}% to pass.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <p className="font-semibold mb-3">{index + 1}. {q.question_text}</p>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(q.id, value)}
              value={answersToShow[q.id] || ''}
              disabled={!canAttempt || isViewingMode}
            >
              {q.options.map((option, optIndex) => {
                const isSelected = answersToShow[q.id] === option;
                const isCorrect = q.correct_answer === option;
                let resultIndicator = null;
                if (isViewingMode) {
                  if (isSelected && isCorrect) {
                    resultIndicator = <span className="text-green-500 ml-2">Correct!</span>;
                  } else if (isSelected && !isCorrect) {
                    resultIndicator = <span className="text-red-500 ml-2">Incorrect.</span>;
                  } else if (isCorrect) {
                    resultIndicator = <span className="text-green-600 ml-2">Correct answer</span>;
                  }
                }
                return (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${q.id}-opt${optIndex}`} />
                    <Label htmlFor={`q${q.id}-opt${optIndex}`}>{option}</Label>
                    {resultIndicator}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {canAttempt && !isViewingMode && (
          <Button onClick={handleSubmitQuiz} disabled={Object.keys(userAnswers).length !== questions.length || isSubmitting}>
            {isSubmitting ? 'Submitting...' : `Submit Attempt ${attemptsMade + 1}`}
          </Button>
        )}
        {canAttempt && isViewingMode && (
          <Button onClick={handleRetakeQuiz}>
            Take Attempt {attemptsMade + 1}
          </Button>
        )}
        {isViewingMode && <p className="text-lg font-bold">Score for this attempt: {viewingResultsOf?.score.toFixed(0)}%</p>}
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;