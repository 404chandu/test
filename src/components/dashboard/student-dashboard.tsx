
"use client";

import { BookOpen, Puzzle, Trophy, Zap, Award, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypingAnimation from '@/components/landing/typing-animation';
import Link from 'next/link';

const featureCards = [
  { title: "Video Lectures", description: "Watch and learn from our curated video lectures.", icon: BookOpen, button: "Explore", xp: 50, link: "/dashboard/video-lectures?role=student" },
  { title: "Quizzes", description: "Test your knowledge with our interactive quizzes.", icon: Puzzle, button: "Explore", xp: 100, link: "/dashboard/quizzes?role=student" },
  { title: "Daily Challenges", description: "Complete daily challenges to earn extra points.", icon: Zap, button: "Explore", xp: 75, link: "#" },
  { title: "Materials", description: "Access all the learning materials and resources.", icon: Trophy, button: "Explore", xp: 25, link: "#" },
];

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
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
       <div className="h-20 sm:h-24">
            <TypingAnimation words={["Welcome to your Dashboard"]} />
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card, index) => (
          <Card key={index} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">{card.title}</CardTitle>
              <card.icon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button asChild>
                <Link href={card.link}>{card.button}</Link>
              </Button>
              <div className="flex items-center gap-1 text-sm font-semibold text-yellow-600">
                <Award className="h-5 w-5"/>
                <span>{card.xp} XP</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-2xl shadow-md bg-white/60 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4">Weekly Contest</h3>
          <div className="bg-green-100/70 p-6 rounded-lg text-center">
            <h4 className="text-lg font-semibold text-primary">Eco-Innovators Challenge</h4>
            <p className="text-muted-foreground my-2">Design a solution for a local environmental problem.</p>
            <Button>Participate Now</Button>
          </div>
        </Card>
        <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" /> Leaderboard</h3>
          <div className="space-y-4">
            {leaderboardData.map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.xp} XP</p>
                  </div>
                </div>
                {index === 0 && <Crown className="h-6 w-6 text-yellow-400" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
