
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen } from 'lucide-react';

const studentAccessData = [
  { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=a', materials: [
      { title: 'Guide to Composting', read: true },
      { title: 'Understanding Solar Panels', read: true },
  ]},
  { name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?u=b', materials: [
      { title: 'Guide to Composting', read: true },
  ]},
  { name: 'Vihaan Singh', avatar: 'https://i.pravatar.cc/150?u=c', materials: []},
  { name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?u=d', materials: [
      { title: 'The Importance of Biodiversity', read: true },
      { title: 'DIY Rainwater Harvesting', read: true },
      { title: 'Beginner\'s Guide to Urban Gardening', read: true },
  ]},
];

export default function LecturerExploreView() {
  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Student Material Access</CardTitle>
        <CardDescription>Track which students have accessed the learning materials.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentAccessData.map(student => (
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
                    <span className="text-sm font-bold text-primary mr-4">{student.materials.length} Materials Read</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {student.materials.length > 0 ? (
                    <div className="space-y-2">
                        {student.materials.map((material, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-white/70">
                                <BookOpen className="h-4 w-4 text-primary"/>
                                <p className="font-medium">{material.title}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-muted-foreground text-center py-4">No materials accessed by this student yet.</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
