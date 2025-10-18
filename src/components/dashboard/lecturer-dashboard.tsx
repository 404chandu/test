
"use client";

import { BookOpen, Puzzle, Trophy, Zap, Upload, Crown, FileText, Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypingAnimation from '@/components/landing/typing-animation';
import Link from 'next/link';


const featureCards = [
  { title: "Video Lectures", description: "Manage and upload video lectures for students.", icon: BookOpen, exploreLink: "/dashboard/video-lectures?role=lecturer", uploadLink: "/dashboard/video-lectures?role=lecturer&view=upload" },
  { title: "Quizzes", description: "Create and manage quizzes to test student knowledge.", icon: Puzzle, exploreLink: "/dashboard/quizzes?role=lecturer", uploadLink: "/dashboard/quizzes?role=lecturer&view=upload" },
  { title: "Daily Challenges", description: "Set up daily challenges to engage students.", icon: Zap, exploreLink: "/dashboard/challenges?role=lecturer", uploadLink: "/dashboard/challenges?role=lecturer&view=upload" },
  { title: "Materials", description: "Upload and organize learning materials.", icon: FileText, exploreLink: "/dashboard/materials?role=lecturer", uploadLink: "/dashboard/materials?role=lecturer&view=upload" },
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

export default function LecturerDashboard() {
  return (
    <div className="space-y-8">
      <div className="h-20 sm:h-24">
            <TypingAnimation words={["Welcome to your Dashboard, Lecturer"]} />
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
                <Link href={card.exploreLink}>Explore</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={card.uploadLink}><Upload className="mr-2 h-4 w-4" /> Upload</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 rounded-2xl shadow-md bg-white/60 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Rocket className="text-blue-500" /> Weekly Contest</h3>
          <div className="bg-blue-100/60 p-6 rounded-lg text-center">
            <h4 className="text-lg font-semibold text-blue-800">Create & Manage Contests</h4>
            <p className="text-muted-foreground my-2">Engage your students with new and exciting weekly contests.</p>
            <div className="flex justify-center gap-4 mt-4">
                <Button asChild>
                    <Link href="/dashboard/contests?role=lecturer">Explore</Link>
                </Button>
                <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700" asChild>
                    <Link href="/dashboard/contests?role=lecturer&view=upload">
                        <Upload className="mr-2 h-4 w-4" /> Upload Contest
                    </Link>
                </Button>
            </div>
          </div>
        </Card>
        <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" /> Top 10 Students</h3>
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
