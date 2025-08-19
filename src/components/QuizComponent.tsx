import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: string[]; // Assuming MCQ options are string arrays
  correct_answer: string; // Assuming correct answer is a single string for MCQ
}

interface QuizComponentProps {
  quizId: string;
  lessonId: string;
  onQuizAttempted?: (score: number, totalQuestions: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quizId, lessonId, onQuizAttempted }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [previousAttempt, setPreviousAttempt] = useState<any | null>(null);
  const { user } = useSession();

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        // Fetch questions for the quiz
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', quizId)
          .order('created_at', { ascending: true });

        if (questionsError) throw questionsError;
        setQuestions(questionsData || []);

        // Fetch previous attempt if user is logged in
        if (user) {
          const { data: attemptData, error: attemptError } = await supabase
            .from('quiz_attempts')
            .select('*')
            .eq('user_id', user.id)
            .eq('quiz_id', quizId)
            .single();

          if (attemptError && attemptError.code !== 'PGRST116') { // PGRST116 means no rows found
            throw attemptError;
          }
          if (attemptData) {
            setPreviousAttempt(attemptData);
            setScore(attemptData.score);
            setSubmitted(true); // If there's a previous attempt, consider it submitted
            setUserAnswers(attemptData.answers || {}); // Load previous answers
          }
        }
      } catch (error: any) {
        showError(`Failed to load quiz: ${error.message}`);
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId, user]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!user) {
      showError("You must be logged in to submit a quiz.");
      return;
    }

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct_answer) {
        correctCount++;
      }
    });

    const calculatedScore = (correctCount / questions.length) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    try {
      const { error } = await supabase.from('quiz_attempts').upsert(
        {
          user_id: user.id,
          quiz_id: quizId,
          score: calculatedScore,
          submitted_at: new Date().toISOString(),
          answers: userAnswers,
        },
        { onConflict: 'user_id,quiz_id' }
      );

      if (error) throw error;
      showSuccess(`Quiz submitted! Your score: ${calculatedScore.toFixed(0)}%`);
      onQuizAttempted?.(calculatedScore, questions.length);
    } catch (error: any) {
      showError(`Failed to submit quiz: ${error.message}`);
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return <p className="text-muted-foreground">No questions available for this quiz yet.</p>;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <p className="font-semibold mb-3">
              {index + 1}. {q.question_text}
            </p>
            {q.question_type === 'mcq' && q.options && (
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(q.id, value)}
                value={userAnswers[q.id] || ''}
                disabled={submitted}
              >
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${q.id}-opt${optIndex}`} />
                    <Label htmlFor={`q${q.id}-opt${optIndex}`}>{option}</Label>
                    {submitted && userAnswers[q.id] === option && (
                      userAnswers[q.id] === q.correct_answer ? (
                        <span className="text-green-500 ml-2">Correct!</span>
                      ) : (
                        <span className="text-red-500 ml-2">Incorrect. Correct answer: {q.correct_answer}</span>
                      )
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
            {submitted && userAnswers[q.id] !== q.correct_answer && (
              <p className="text-sm text-green-600 mt-2">Correct answer: {q.correct_answer}</p>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {!submitted ? (
          <Button onClick={handleSubmitQuiz} disabled={Object.keys(userAnswers).length !== questions.length}>
            Submit Quiz
          </Button>
        ) : (
          <p className="text-lg font-bold">Your Score: {score !== null ? score.toFixed(0) : 'N/A'}%</p>
        )}
        {previousAttempt && (
          <p className="text-sm text-muted-foreground">
            You previously scored {previousAttempt.score.toFixed(0)}% on this quiz.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;