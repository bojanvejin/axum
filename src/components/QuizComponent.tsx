import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
}

interface QuizAttempt {
  id: string;
  score: number;
  answers: Record<string, string>;
}

interface QuizComponentProps {
  quizId: string;
  lessonId: string;
  onQuizAttempted?: (score: number, totalQuestions: number) => void;
}

const MAX_ATTEMPTS = 3;
const PASSING_SCORE = 90; // Equivalent to an 'A'

const QuizComponent: React.FC<QuizComponentProps> = ({ quizId, lessonId, onQuizAttempted }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingResultsOf, setViewingResultsOf] = useState<QuizAttempt | null>(null);
  const { user } = useSession();
  const { t } = useLanguage(); // Use translation hook

  const bestAttempt = attempts.reduce((max, current) => (current.score > max.score ? current : max), { score: -1, id: '', answers: {} });
  const hasPassed = bestAttempt.score >= PASSING_SCORE;
  const attemptsMade = attempts.length;
  const canAttempt = !hasPassed && attemptsMade < MAX_ATTEMPTS;

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!quizId || !user) {
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

        const { data: attemptsData, error: attemptsError } = await supabase
          .from('quiz_attempts')
          .select('id, score, answers')
          .eq('user_id', user.id)
          .eq('quiz_id', quizId)
          .order('created_at', { ascending: false });
        if (attemptsError) throw attemptsError;
        const loadedAttempts = attemptsData || [];
        setAttempts(loadedAttempts);

        const latestAttempt = loadedAttempts[0];
        const best = loadedAttempts.reduce((max, current) => (current.score > (max?.score ?? -1) ? current : max), null);
        const passed = best && best.score >= PASSING_SCORE;

        if (passed) {
          setViewingResultsOf(best);
        } else if (latestAttempt) {
          setViewingResultsOf(latestAttempt);
        }

      } catch (error: any) {
        showError(t('failed_to_load_quiz', { message: error.message }));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQuizData();
    } else {
      setLoading(false);
    }
  }, [quizId, user, t]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!user) {
      showError(t('quiz_login_required'));
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
      const { data: newAttempt, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quizId,
          score: calculatedScore,
          answers: userAnswers,
        })
        .select('id, score, answers')
        .single();

      if (error) throw error;
      
      showSuccess(t('attempt_submitted', { attemptNum: attemptsMade + 1, score: calculatedScore.toFixed(0) }));
      
      const updatedAttempts = [newAttempt, ...attempts];
      setAttempts(updatedAttempts);
      setViewingResultsOf(newAttempt);
      
      onQuizAttempted?.(calculatedScore, questions.length);
    } catch (error: any) {
      showError(t('quiz_submit_failed', { message: error.message }));
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

  if (!user) {
    return <p className="text-muted-foreground">{t('quiz_login_required')}</p>;
  }

  if (questions.length === 0) {
    return <p className="text-muted-foreground">{t('quiz_no_questions')}</p>;
  }

  const answersToShow = viewingResultsOf?.answers || userAnswers;
  const isViewingMode = !!viewingResultsOf;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('quiz_title')}</CardTitle>
        <CardDescription>
          {hasPassed && t('quiz_passed_congrats', { score: bestAttempt.score.toFixed(0) })}
          {!hasPassed && attemptsMade >= MAX_ATTEMPTS && t('quiz_attempts_used', { maxAttempts: MAX_ATTEMPTS, bestScore: bestAttempt.score.toFixed(0) })}
          {canAttempt && ` ${t('quiz_can_attempt', { currentAttempt: attemptsMade + 1, maxAttempts: MAX_ATTEMPTS, passingScore: PASSING_SCORE })}`}
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
                    resultIndicator = <span className="text-green-500 ml-2">{t('quiz_correct')}</span>;
                  } else if (isSelected && !isCorrect) {
                    resultIndicator = <span className="text-red-500 ml-2">{t('quiz_incorrect')}</span>;
                  } else if (isCorrect) {
                    resultIndicator = <span className="text-green-600 ml-2">{t('quiz_correct_answer')}</span>;
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
            {isSubmitting ? t('submitting') : t('submit_attempt', { currentAttempt: attemptsMade + 1 })}
          </Button>
        )}
        {canAttempt && isViewingMode && (
          <Button onClick={handleRetakeQuiz}>
            {t('take_attempt', { currentAttempt: attemptsMade + 1 })}
          </Button>
        )}
        {isViewingMode && <p className="text-lg font-bold">{t('score_for_attempt', { score: viewingResultsOf?.score.toFixed(0) })}</p>}
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;