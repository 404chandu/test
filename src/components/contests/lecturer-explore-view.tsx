
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Trophy } from 'lucide-react';

const contestResults = [
  { 
    contestTitle: 'Eco-Innovators Challenge',
    status: 'Ongoing',
    participants: [
        { name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?u=d', submission: 'Proposal for community composting...' },
        { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=a', submission: 'Idea for a plastic bottle reuse system...' },
    ]
  },
  { 
    contestTitle: 'Recycling Drive Contest',
    status: 'Ended',
    participants: [
      { name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?u=b', score: '15.2 kg', rank: 1 },
      { name: 'Vihaan Singh', avatar: 'https://i.pravatar.cc/150?u=c', score: '12.8 kg', rank: 2 },
      { name: 'Myra Joshi', avatar: 'https://i.pravatar.cc/150?u=g', score: '11.5 kg', rank: 3 },
    ]
  },
];

export default function LecturerExploreView() {
  return (
    <div className="space-y-6 mt-6">
        {contestResults.map(contest => (
            <Card key={contest.contestTitle} className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>{contest.contestTitle}</CardTitle>
                    <CardDescription>Status: {contest.status}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {contest.status === 'Ongoing' && contest.participants.map((p: any) => (
                         <Card key={p.name} className="p-4 bg-green-50/30">
                            <div className="flex items-center gap-3">
                                <Avatar><AvatarImage src={p.avatar} /><AvatarFallback>{p.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-sm text-muted-foreground">Submission: "{p.submission}"</p>
                                </div>
                            </div>
                         </Card>
                    ))}
                    {contest.status === 'Ended' && (
                        <div>
                             <h4 className="font-semibold mb-2 flex items-center gap-2"><Trophy className="text-yellow-500"/>Leaderboard</h4>
                             <div className="space-y-3">
                                {contest.participants.map((p: any) => (
                                    <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/80">
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-lg w-6 text-center">{p.rank}</span>
                                            <Avatar><AvatarImage src={p.avatar} /><AvatarFallback>{p.name.charAt(0)}</AvatarFallback></Avatar>
                                            <div>
                                                <p className="font-semibold">{p.name}</p>
                                                <p className="text-sm text-muted-foreground">Score: {p.score}</p>
                                            </div>
                                        </div>
                                        {p.rank === 1 && <Crown className="h-6 w-6 text-yellow-400" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
