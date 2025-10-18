
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const studentQuizData = [
  { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=a', quizzes: [
    { title: 'Renewable Energy', progress: 90, score: '9/10' },
    { title: 'Ocean Conservation', progress: 75, score: '15/20' }
  ]},
  { name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?u=b', quizzes: [
    { title: 'Renewable Energy', progress: 100, score: '10/10' }
  ]},
  { name: 'Vihaan Singh', avatar: 'https://i.pravatar.cc/150?u=c', quizzes: [
    { title: 'Climate Change', progress: 60, score: '6/10' },
  ]},
  { name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?u=d', quizzes: [
    { title: 'Forest Ecosystem', progress: 100, score: '15/15' },
    { title: 'Ocean Conservation', progress: 100, score: '20/20' },
  ]},
];


export default function LecturerExploreView() {
  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Student Quiz Progress</CardTitle>
        <CardDescription>Monitor student performance and completion status for all quizzes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentQuizData.map(student => (
          <Accordion key={student.name} type="single" collapsible className="w-full bg-green-50/30 rounded-lg p-4">
            <AccordionItem value={student.name} className="border-b-0">
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">{student.name}</p>
                    </div>
                    <span className="text-sm font-bold text-primary mr-4">{student.quizzes.length} Quizzes Attempted</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {student.quizzes.length > 0 ? (
                    <div className="space-y-4">
                        {student.quizzes.map((quiz, index) => (
                            <Card key={index} className="bg-white/80">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <p className="font-semibold">{quiz.title}</p>
                                    <p className="text-sm font-bold text-green-700">{quiz.score}</p>
                                  </div>
                                  <Progress value={quiz.progress} className="mt-2 h-2"/>
                                  <p className="text-xs text-muted-foreground mt-1">{quiz.progress}% Completed</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : <p className="text-muted-foreground text-center py-4">No quizzes attempted by this student.</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}
