
"use client";

import { useState } from 'react';
import { Award, ArrowLeft, CheckCircle, Clock, FileQuestion, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '../ui/progress';

type QuizStatus = "Not Started" | "In Progress" | "Completed";

const quizData = [
  { id: 1, title: "Renewable Energy", description: "Test your knowledge on solar, wind, and hydro power.", questions: 10, xp: 150, status: "Not Started" as QuizStatus, batch: 1 },
  { id: 2, title: "Ocean Conservation", description: "How much do you know about protecting our oceans?", questions: 15, xp: 200, status: "In Progress" as QuizStatus, batch: 2 },
  { id: 3, title: "Forest Ecosystems", description: "A quiz about the amazing world of forests.", questions: 12, xp: 180, status: "Completed" as QuizStatus, batch: 2 },
  { id: 4, title: "Climate Change Basics", description: "Understand the fundamentals of climate change.", questions: 20, xp: 300, status: "Not Started" as QuizStatus, batch: 3 },
];

const quizQuestions = [
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Solar", "Uranium"],
        answer: "Solar"
    },
    {
        question: "What is the primary cause of ocean acidification?",
        options: ["Oil spills", "Increased atmospheric CO2", "Plastic pollution", "Overfishing"],
        answer: "Increased atmospheric CO2"
    }
]

export default function StudentQuizzes() {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState(quizData);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleStartQuiz = (quizId: number) => {
    const quiz = quizState.find(q => q.id === quizId);
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
  };
  
  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
        // Quiz finished
        setShowResult(true);
        const correctAnswers = userAnswers.filter((answer, index) => answer === quizQuestions[index].answer).length;
        toast({
            title: `Quiz Complete: ${activeQuiz.title}`,
            description: `You scored ${correctAnswers} out of ${quizQuestions.length}. You've earned ${activeQuiz.xp} XP!`
        });
        
        // Update quiz status
        setQuizState(prevState => prevState.map(q => q.id === activeQuiz.id ? {...q, status: "Completed"} : q));
    }
  };

  const handleCloseQuiz = () => {
    setActiveQuiz(null);
  }

  const renderQuizButton = (quiz: typeof quizData[0]) => {
    switch (quiz.status) {
      case 'Not Started':
        return <Button className="w-full" onClick={() => handleStartQuiz(quiz.id)}>Start Quiz</Button>;
      case 'In Progress':
        return <Button className="w-full" variant="secondary" onClick={() => handleStartQuiz(quiz.id)}>Resume Quiz</Button>;
      case 'Completed':
        return <Button className="w-full" variant="outline" onClick={() => handleStartQuiz(quiz.id)}>Review</Button>;
      default:
        return null;
    }
  };

  const score = userAnswers.filter((answer, index) => answer === quizQuestions[index].answer).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard?role=student">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Quizzes</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizState.map(quiz => (
          <Card key={quiz.id} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center text-sm text-muted-foreground"><FileQuestion className="mr-2 h-4 w-4"/> {quiz.questions} Questions</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600"><Award className="h-5 w-5" />{quiz.xp} XP</div>
              <div className="flex items-center text-sm">
                {quiz.status === "Completed" ? <CheckCircle className="mr-2 h-4 w-4 text-green-600"/> : <Clock className="mr-2 h-4 w-4 text-gray-500"/>}
                <span className={quiz.status === "Completed" ? "text-green-600 font-semibold" : "text-muted-foreground"}>{quiz.status}</span>
              </div>
            </CardContent>
            <CardFooter>
              {renderQuizButton(quiz)}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!activeQuiz} onOpenChange={handleCloseQuiz}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{activeQuiz?.title}</DialogTitle>
            <DialogDescription>
                {showResult ? `You have completed the quiz!` : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
            </DialogDescription>
          </DialogHeader>

            {showResult ? (
                <div className="text-center py-8">
                    <h3 className="text-4xl font-bold text-primary">{score} / {quizQuestions.length}</h3>
                    <p className="text-lg mt-2">Your Score</p>
                    <p className="mt-4">You've earned {activeQuiz.xp} XP for completing this quiz!</p>
                    <DialogFooter className="mt-8 sm:justify-center">
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                        <Button type="button" variant="outline" onClick={() => handleStartQuiz(activeQuiz.id)}><RefreshCcw className="mr-2 h-4 w-4"/> Review Answers</Button>
                    </DialogFooter>
                </div>
            ) : (
            <div>
              <Progress value={((currentQuestion + 1)/quizQuestions.length) * 100} className="mb-6"/>
              <p className="font-semibold text-lg mb-4">{quizQuestions[currentQuestion]?.question}</p>
              <RadioGroup onValueChange={handleAnswer} value={userAnswers[currentQuestion]}>
                {quizQuestions[currentQuestion]?.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${currentQuestion}-o${index}`} />
                    <Label htmlFor={`q${currentQuestion}-o${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <DialogFooter className="mt-8">
                <Button onClick={handleNext} disabled={!userAnswers[currentQuestion]}>
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </DialogFooter>
            </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
