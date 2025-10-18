
"use client";

import { useState } from 'react';
import { Award, ArrowLeft, CheckCircle, Clock, FileQuestion, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { Input } from '@/components/ui/input';

type ChallengeStatus = "Not Started" | "Completed";

const challengeData = [
  { id: 1, title: "No-Plastic Day", description: "Avoid using any single-use plastic for a full day.", xp: 50, status: "Not Started" as ChallengeStatus },
  { id: 2, title: "Veggie Meal", description: "Cook and eat a vegetarian or vegan meal.", xp: 75, status: "Completed" as ChallengeStatus },
  { id: 3, title: "Community Cleanup", description: "Participate in or organize a small cleanup in your neighborhood.", xp: 200, status: "Not Started" as ChallengeStatus },
  { id: 4, title: "DIY Eco-Brick", description: "Create an eco-brick from non-biodegradable waste.", xp: 100, status: "Not Started" as ChallengeStatus },
];

export default function StudentChallenges() {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState(challengeData);

  const handleSubmit = (challengeId: number, xp: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId ? { ...c, status: "Completed" } : c
      )
    );
    toast({
      title: "Challenge Submitted!",
      description: `Great job! You've earned ${xp} XP.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard?role=student">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Daily Challenges</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600"><Award className="h-5 w-5" />{challenge.xp} XP</div>
              <div className="flex items-center text-sm">
                {challenge.status === "Completed" ? <CheckCircle className="mr-2 h-4 w-4 text-green-600"/> : <Clock className="mr-2 h-4 w-4 text-gray-500"/>}
                <span className={challenge.status === "Completed" ? "text-green-600 font-semibold" : "text-muted-foreground"}>{challenge.status}</span>
              </div>
            </CardContent>
            <CardFooter>
              {challenge.status === "Not Started" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Start Challenge</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{challenge.title}</DialogTitle>
                      <DialogDescription>
                        Submit proof of your challenge completion. This could be a photo, a short text, or a link.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea placeholder="Describe your submission..." rows={4}/>
                    <Input type="file" />
                    <DialogFooter>
                      <Button onClick={() => handleSubmit(challenge.id, challenge.xp)}>
                        <Send className="mr-2 h-4 w-4" /> Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  <CheckCircle className="mr-2 h-4 w-4" /> Completed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
