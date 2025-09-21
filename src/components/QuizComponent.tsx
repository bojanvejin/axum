import React, { useEffect, useState } from 'react';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore'; // Firestore imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider'; // New import for session

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
}

interface QuizAttempt {
  id?: string; // Firestore will generate this
  user_id: string;
  quiz_id: string;
  score: number;
  answers: Record<string, string>;
  submitted_at: string;
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
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session

  const bestAttempt = attempts.reduce((max, current) => (current.score > max.score ? current : max), { id: '', score: -1, answers: {}, submitted_at: '' });
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
        // Fetch questions
        const questionsCollectionRef = collection(db, 'quiz_questions');
        const questionsQuery = query(questionsCollectionRef, where('quiz_id', '==', quizId), orderBy('created_at'));
        const questionsSnapshot = await getDocs(questionsQuery);
        const questionsData = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as QuizQuestion[];
        setQuestions(questionsData);

        // Fetch quiz attempts for the current user and quiz
        const attemptsCollectionRef = collection(db, 'quiz_attempts');
        const attemptsQuery = query(attemptsCollectionRef, where('user_id', '==', user.uid), where('quiz_id', '==', quizId), orderBy('submitted_at'));
        const attemptsSnapshot = await getDocs(attemptsQuery);
        const loadedAttempts = attemptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as QuizAttempt[];
        setAttempts(loadedAttempts);

        const latestAttempt = loadedAttempts[loadedAttempts.length - 1];
        const best = loadedAttempts.reduce((max, current) => (current.score > (max?.score ?? -1) ? current : max), null);
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

    if (!authLoading && user) { // Only fetch data if user is logged in
      fetchQuizData();
    } else if (!authLoading && !user) {
      setLoading(false); // If not logged in, stop loading
    }
  }, [quizId, user, authLoading]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!user) {
      showError("You must be logged in to submit a quiz.");
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
      const newAttemptData: Omit<QuizAttempt, 'id'> = {
        user_id: user.uid,
        quiz_id: quizId,
        score: calculatedScore,
        answers: userAnswers,
        submitted_at: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'quiz_attempts'), newAttemptData);
      const newAttempt: QuizAttempt = { id: docRef.id, ...newAttemptData };

      showSuccess(`Attempt ${attemptsMade + 1} submitted! Your score: ${calculatedScore.toFixed(0)}%`);

      const updatedAttempts = [...attempts, newAttempt];
      setAttempts(updatedAttempts);
      setViewingResultsOf(newAttempt);

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

  if (authLoading || loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    );
  }

  if (!user) {
    return <p className="text-muted-foreground">Please log in to take the quiz.</p>;
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