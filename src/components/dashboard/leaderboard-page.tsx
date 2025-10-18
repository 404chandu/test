
"use client";

import { Award, Crown, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypingAnimation from '@/components/landing/typing-animation';
import Link from 'next/link';
import { Progress } from '../ui/progress';

const leaderboardData = [
  { name: 'Aarav Sharma', xp: 4500, avatar: 'https://i.pravatar.cc/150?u=a', progress: 90, badges: 5 },
  { name: 'Diya Patel', xp: 4250, avatar: 'https://i.pravatar.cc/150?u=b', progress: 85, badges: 4 },
  { name: 'Vihaan Singh', xp: 4100, avatar: 'https://i.pravatar.cc/150?u=c', progress: 82, badges: 4 },
  { name: 'Ananya Reddy', xp: 3900, avatar: 'https://i.pravatar.cc/150?u=d', progress: 78, badges: 4 },
  { name: 'Advik Kumar', xp: 3750, avatar: 'https://i.pravatar.cc/150?u=e', progress: 75, badges: 3 },
  { name: 'Ishaan Gupta', xp: 3500, avatar: 'https://i.pravatar.cc/150?u=f', progress: 70, badges: 3 },
  { name: 'Myra Joshi', xp: 3200, avatar: 'https://i.pravatar.cc/150?u=g', progress: 64, badges: 3 },
  { name: 'Kabir Verma', xp: 3000, avatar: 'https://i.pravatar.cc/150?u=h', progress: 60, badges: 2 },
  { name: 'Saanvi Mehta', xp: 2800, avatar: 'https://i.pravatar.cc/150?u=i', progress: 56, badges: 2 },
  { name: 'You', xp: 2750, avatar: 'https://i.pravatar.cc/150?u=student', progress: 55, badges: 3 },
  { name: 'Reyansh Rao', xp: 2600, avatar: 'https://i.pravatar.cc/150?u=j', progress: 52, badges: 2 },
  { name: 'Zara Khan', xp: 2400, avatar: 'https://i.pravatar.cc/150?u=k', progress: 48, badges: 2 },
  { name: 'Arjun Nair', xp: 2200, avatar: 'https://i.pravatar.cc/150?u=l', progress: 44, badges: 1 },
  { name: 'Priya Sharma', xp: 2000, avatar: 'https://i.pravatar.cc/150?u=m', progress: 40, badges: 1 },
  { name: 'Rohan Desai', xp: 1800, avatar: 'https://i.pravatar.cc/150?u=n', progress: 36, badges: 1 },
].sort((a, b) => b.xp - a.xp);

const getTrophyColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-slate-400';
    if (index === 2) return 'text-amber-700';
    return 'text-transparent';
};

export default function LeaderboardPageContent({ role }: { role: string }) {
  const isStudent = role === 'student';
  const studentData = isStudent ? leaderboardData.find(s => s.name === 'You') : null;
  const studentRank = isStudent ? leaderboardData.findIndex(s => s.name === 'You') + 1 : null;

  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard?role=${role}`}>
                    <ArrowLeft />
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
        </div>
        
        {isStudent && studentData && (
            <Card className="rounded-2xl shadow-md bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                <CardHeader className="p-0 text-center">
                    <CardTitle className="text-2xl">Your Current Rank</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                     <div className="flex items-center justify-center gap-6">
                        <span className="text-5xl font-bold text-primary">#{studentRank}</span>
                         <Avatar className="h-20 w-20 border-4 border-primary">
                            <AvatarImage src={studentData.avatar} />
                            <AvatarFallback>YOU</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-bold">{studentData.name}</p>
                            <p className="text-lg font-semibold text-yellow-600">{studentData.xp} XP</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <span className="font-semibold">{studentData.badges} Badges</span>
                            </div>
                        </div>
                     </div>
                </CardContent>
            </Card>
        )}

      <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Students Leaderboard</CardTitle>
          <CardDescription>See how you stack up against other eco-warriors!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 font-bold text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Student</div>
                <div className="col-span-3 text-center">Badges</div>
                <div className="col-span-3 text-right">XP</div>
            </div>
          {leaderboardData.map((student, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-px ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-green-50/30' : 'bg-white/80'
              } ${student.name === 'You' ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="col-span-1 flex items-center gap-2">
                <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                <Crown className={`h-6 w-6 ${getTrophyColor(index)}`} />
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{student.name}</p>
                </div>
              </div>
              <div className="col-span-3 text-center font-semibold flex items-center justify-center gap-2">
                 <Award className="h-5 w-5 text-yellow-500"/>
                 <span>{student.badges}</span>
              </div>
              <div className="col-span-3 text-right font-bold text-primary text-lg">
                {student.xp.toLocaleString()} XP
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
