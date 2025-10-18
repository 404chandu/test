"use client";

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ModalContext } from './main-layout';
import { BookOpen, Puzzle, Zap, FileText, Trophy, BarChartBig } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Video Lectures",
    description: "Watch, learn, and earn XP for completing topics.",
  },
  {
    icon: Puzzle,
    title: "Quizzes",
    description: "Test your knowledge and challenge your friends.",
  },
  {
    icon: Zap,
    title: "Daily Challenges",
    description: "Small missions that boost your learning streak.",
  },
  {
    icon: FileText,
    title: "Materials",
    description: "Study resources to master concepts.",
  },
  {
    icon: Trophy,
    title: "Weekly Contests",
    description: "Compete and rise on the leaderboard.",
  },
  {
    icon: BarChartBig,
    title: "Leaderboards",
    description: "Track your XP, badges, and rank in real-time.",
  },
];

export default function LearningAdventure() {
  const { openModal } = useContext(ModalContext);

  return (
    <section id="features" className="py-16 sm:py-24 bg-green-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Your Learning Adventure Starts Here
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Dive into our collection of gamified features designed to make learning about sustainability fun and rewarding.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group text-center rounded-2xl p-2 transition-all duration-300 hover:shadow-2xl hover:shadow-green-200/50 hover:-translate-y-2 hover:border-primary/50"
              style={{ animation: `fade-in 0.5s ${index * 0.1}s ease-in-out forwards`, opacity: 0 }}
            >
              <CardHeader className="items-center">
                <div className="p-4 bg-green-100/70 rounded-full text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="mt-4 font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full relative overflow-hidden group-hover:bg-primary group-hover:text-primary-foreground" onClick={openModal}>
                    <span className="relative z-10">Explore</span>
                    <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
