
"use client";

import { useState } from 'react';
import { Award, ArrowLeft, Rocket, CheckCircle, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';

type ContestStatus = "Ongoing" | "Upcoming" | "Ended";

const contestData = [
  { id: 1, title: "Eco-Innovators Challenge", description: "Design a solution for a local environmental problem. Submit your idea as a short proposal.", xp: 500, startDate: new Date(new Date().setDate(new Date().getDate() - 3)), endDate: new Date(new Date().setDate(new Date().getDate() + 4)), participants: 42, status: "Ongoing" as ContestStatus },
  { id: 2, title: "Green Photo Contest", description: "Capture the beauty of nature in your neighborhood. The best photo wins!", xp: 300, startDate: new Date(new Date().setDate(new Date().getDate() + 5)), endDate: new Date(new Date().setDate(new Date().getDate() + 12)), participants: 0, status: "Upcoming" as ContestStatus },
  { id: 3, title: "Recycling Drive Contest", description: "Collect the most recyclable materials in one week. Track your collection and submit your total weight.", xp: 750, startDate: new Date(new Date().setDate(new Date().getDate() - 10)), endDate: new Date(new Date().setDate(new Date().getDate() - 3)), participants: 128, status: "Ended" as ContestStatus },
];

export default function StudentContests() {
  const { toast } = useToast();
  const [participatedContests, setParticipatedContests] = useState<Set<number>>(new Set([3]));

  const handleParticipate = (contestId: number, xp: number) => {
    if (!participatedContests.has(contestId)) {
      const newParticipated = new Set(participatedContests);
      newParticipated.add(contestId);
      setParticipatedContests(newParticipated);
      toast({
        title: "You're in!",
        description: `You have successfully joined the contest. Good luck!`,
      });
    }
  };
  
  const getStatusBadge = (status: ContestStatus) => {
      switch(status) {
          case 'Ongoing': return <Badge className="bg-green-500 text-white">Ongoing</Badge>;
          case 'Upcoming': return <Badge variant="secondary" className="bg-blue-500 text-white">Upcoming</Badge>;
          case 'Ended': return <Badge variant="outline">Ended</Badge>;
      }
  }

  const renderButton = (contest: typeof contestData[0]) => {
      if(contest.status === 'Ended') {
          return <Button className="w-full" variant="outline" disabled>View Results</Button>
      }
      if(participatedContests.has(contest.id)) {
        return <Button className="w-full" variant="secondary" disabled><CheckCircle className="mr-2 h-4 w-4" /> Joined</Button>
      }
      return <Button className="w-full" onClick={() => handleParticipate(contest.id, contest.xp)} disabled={contest.status !== 'Ongoing'}><Rocket className="mr-2 h-4 w-4"/> Participate</Button>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard?role=student">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Weekly Contests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contestData.map(contest => (
          <Card key={contest.id} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{contest.title}</CardTitle>
                {getStatusBadge(contest.status)}
              </div>
              <CardDescription>{contest.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600"><Award className="h-5 w-5" />{contest.xp} XP Prize</div>
               <div className="flex items-center text-sm text-muted-foreground"><Calendar className="mr-2 h-4 w-4"/> {contest.status === 'Ongoing' ? `Ends in ${formatDistanceToNow(contest.endDate)}` : `Runs from ${format(contest.startDate, 'MMM d')} to ${format(contest.endDate, 'MMM d')}`}</div>
               <div className="flex items-center text-sm text-muted-foreground"><Users className="mr-2 h-4 w-4"/> {contest.participants} Participants</div>
            </CardContent>
            <CardFooter>
              {renderButton(contest)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
