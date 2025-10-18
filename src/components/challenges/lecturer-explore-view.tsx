
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle } from 'lucide-react';

const studentSubmissionData = [
  { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=a', challenges: []},
  { name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?u=b', challenges: [
    { title: 'Veggie Meal', completed: true },
  ]},
  { name: 'Vihaan Singh', avatar: 'https://i.pravatar.cc/150?u=c', challenges: []},
  { name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?u=d', challenges: []},
];

export default function LecturerExploreView() {
  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Student Challenge Submissions</CardTitle>
        <CardDescription>Monitor student participation and review their submissions for daily challenges.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentSubmissionData.map(student => (
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
                    <span className="text-sm font-bold text-primary mr-4">{student.challenges.length} Challenges Submitted</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {student.challenges.length > 0 ? (
                    <div className="space-y-4">
                        {student.challenges.map((challenge, index) => (
                            <Card key={index} className="bg-white/80">
                                <CardContent className="p-4 flex justify-between items-center">
                                  <p className="font-semibold">{challenge.title}</p>
                                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                                    <CheckCircle className="h-5 w-5"/>
                                    <span>Completed</span>
                                  </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : <p className="text-muted-foreground text-center py-4">No challenges submitted by this student.</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}
