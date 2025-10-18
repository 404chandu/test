"use client";

import { Award, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  { name: 'Aarav Sharma', xp: 4500, avatar: 'https://i.pravatar.cc/150?u=a' },
  { name: 'Diya Patel', xp: 4250, avatar: 'https://i.pravatar.cc/150?u=b' },
  { name: 'Vihaan Singh', xp: 4100, avatar: 'https://i.pravatar.cc/150?u=c' },
  { name: 'Ananya Reddy', xp: 3900, avatar: 'https://i.pravatar.cc/150?u=d' },
  { name: 'Advik Kumar', xp: 3750, avatar: 'https://i.pravatar.cc/150?u=e' },
  { name: 'Ishaan Gupta', xp: 3500, avatar: 'https://i.pravatar.cc/150?u=f' },
  { name: 'Myra Joshi', xp: 3200, avatar: 'https://i.pravatar.cc/150?u=g' },
  { name: 'Kabir Verma', xp: 3000, avatar: 'https://i.pravatar.cc/150?u=h' },
  { name: 'Saanvi Mehta', xp: 2800, avatar: 'https://i.pravatar.cc/150?u=i' },
  { name: 'Reyansh Rao', xp: 2600, avatar: 'https://i.pravatar.cc/150?u=j' },
].sort((a, b) => b.xp - a.xp);

const getTrophyColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-slate-400';
    if (index === 2) return 'text-amber-700';
    return 'text-transparent';
};

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Top Eco-Warriors
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Check out the top performers in our community making a difference!
          </p>
        </div>
        <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top 10 students leading the charge in sustainability.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 font-bold text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-8">Student</div>
                <div className="col-span-3 text-right">XP</div>
            </div>
            {leaderboardData.map((student, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-px ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-green-50/30' : 'bg-white/80'
                }`}
              >
                <div className="col-span-1 flex items-center gap-2">
                  <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                  <Crown className={`h-6 w-6 ${getTrophyColor(index)}`} />
                </div>
                <div className="col-span-8 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{student.name}</p>
                  </div>
                </div>
                <div className="col-span-3 text-right font-bold text-primary text-lg">
                  {student.xp.toLocaleString()} XP
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
