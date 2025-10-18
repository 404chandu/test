
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Paperclip } from 'lucide-react';

const studentData = [
  { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=a', progress: 85, doubts: [{ video: 'Intro to Solar Power', doubt: 'How does a photovoltaic cell work?' }] },
  { name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?u=b', progress: 100, doubts: [] },
  { name: 'Vihaan Singh', avatar: 'https://i.pravatar.cc/150?u=c', progress: 60, doubts: [{ video: 'Wind Energy Basics', doubt: 'What is the Betz limit?' }, { video: 'Geothermal Energy', doubt: 'Is it feasible everywhere?' }] },
  { name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?u=d', progress: 95, doubts: [] },
  { name: 'Advik Kumar', avatar: 'https://i.pravatar.cc/150?u=e', progress: 40, doubts: [{ video: 'Intro to Hydropower', doubt: 'What are the environmental impacts?' }] },
];


export default function LecturerExploreView() {
    const { toast } = useToast();

    const handleAnswerSubmit = (studentName: string, doubt: string) => {
        toast({
            title: "Answer Submitted",
            description: `Your answer to ${studentName}'s doubt has been sent.`,
        })
    }

  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Student Progress & Doubts</CardTitle>
        <CardDescription>Monitor student engagement and address their questions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentData.map(student => (
          <Accordion key={student.name} type="single" collapsible className="w-full bg-green-50/30 rounded-lg p-4">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-muted-foreground">Overall Progress: {student.progress}%</p>
                        </div>
                    </div>
                    {student.doubts.length > 0 && <span className="text-sm font-bold text-primary mr-4">{student.doubts.length} Doubts</span>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="font-semibold mb-2">Overall Progress:</p>
                <Progress value={student.progress} className="mb-4 h-2"/>
                {student.doubts.length > 0 ? (
                    <div className="space-y-4">
                        <h4 className="font-semibold mt-4">Doubts:</h4>
                        {student.doubts.map((doubt, index) => (
                            <Card key={index} className="bg-white/80">
                                <CardHeader className='pb-2'>
                                    <CardDescription>From: {doubt.video}</CardDescription>
                                    <CardTitle className='text-base'>{doubt.doubt}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea placeholder="Type your answer here..." className='mb-2'/>
                                    <div className="flex justify-between">
                                        <Button size="sm" variant="ghost"><Paperclip className="h-4 w-4 mr-2"/>Attach File</Button>
                                        <Button size="sm" onClick={() => handleAnswerSubmit(student.name, doubt.doubt)}>Send Answer</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : <p className="text-muted-foreground text-center py-4">No doubts from this student.</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}
