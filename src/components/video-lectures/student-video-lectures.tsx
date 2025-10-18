
"use client";
import { useState } from 'react';
import { ArrowLeft, HelpCircle, PlayCircle, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import Link from 'next/link';

const videoData = Array.from({ length: 9 }, (_, i) => {
  let batch;
  if (i < 2) batch = 1;
  else if (i < 5) batch = 2;
  else if (i < 8) batch = 3;
  else batch = 4;

  let xp;
  if (batch === 1) xp = 250;
  else if (batch === 2) xp = 500;
  else if (batch === 3) xp = 750;
  else xp = 1000;

  return {
    id: i + 1,
    title: `Introduction to Sustainable Energy ${i + 1}`,
    thumbnail: PlaceHolderImages[i % 6]?.imageUrl || "https://picsum.photos/seed/vl/600/400",
    thumbnailHint: PlaceHolderImages[i % 6]?.imageHint || "sustainable energy",
    duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    xp,
    batch,
  };
});

export default function StudentVideoLectures() {
  const [progress, setProgress] = useState<{ [key: number]: number }>(
    Object.fromEntries(videoData.map(v => [v.id, Math.floor(Math.random() * 81)]))
  );
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();

  const handleComplete = (id: number, xp: number) => {
    if (progress[id] === 100 && !completed[id]) {
      setCompleted(prev => ({ ...prev, [id]: true }));
      toast({
        title: `Congratulations!`,
        description: `You've earned ${xp} XP for completing the video.`,
      });
      // Here you would also send the student's name to the lecturer's dashboard
    }
  };

  const handleWatch = (id: number) => {
    setProgress(prev => ({ ...prev, [id]: 100 }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard?role=student">
                <ArrowLeft />
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Video Lectures</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoData.map(video => (
          <Card key={video.id} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                data-ai-hint={video.thumbnailHint}
              />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold truncate">{video.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600">
                <Award className="h-5 w-5" />
                <span>{video.xp} XP</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <Progress value={progress[video.id]} className="h-2" />
              <p className="text-xs text-muted-foreground">{progress[video.id]}% Completed</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center gap-2">
              <Button size="sm" onClick={() => handleWatch(video.id)} disabled={progress[video.id] === 100}>
                <PlayCircle className="mr-2 h-4 w-4" /> Watch
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                        <HelpCircle className="mr-2 h-4 w-4" /> Doubt
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Have a Doubt?</DialogTitle>
                        <DialogDescription>
                            Type your question about "{video.title}" below. Your lecturer will be notified.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea placeholder="Type your doubt here..." rows={4}/>
                    <DialogFooter>
                        <Button onClick={() => toast({ title: "Doubt Submitted!", description: "Your lecturer has been notified of your question."})}>Submit Doubt</Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                size="sm"
                variant={completed[video.id] ? "secondary" : "default"}
                disabled={progress[video.id] !== 100}
                onClick={() => handleComplete(video.id, video.xp)}
                className="bg-green-600 hover:bg-green-700"
              >
                {completed[video.id] ? <CheckCircle className="mr-2 h-4 w-4" /> : null}
                {completed[video.id] ? 'Claimed' : 'Complete'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
