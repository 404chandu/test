
"use client";

import { useState } from 'react';
import { Award, ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const materialData = [
  { id: 1, title: "Guide to Composting", description: "Learn how to turn your kitchen scraps into nutrient-rich soil.", xp: 30, tag: "Waste Management", image: PlaceHolderImages[0] },
  { id: 2, title: "Understanding Solar Panels", description: "A deep dive into how solar panels work and their benefits.", xp: 50, tag: "Renewable Energy", image: PlaceHolderImages[5] },
  { id: 3, title: "The Importance of Biodiversity", description: "Explore why a variety of life is crucial for a healthy planet.", xp: 40, tag: "Ecosystems", image: PlaceHolderImages[1] },
  { id: 4, title: "DIY Rainwater Harvesting", description: "A step-by-step guide to building your own rainwater collection system.", xp: 60, tag: "Water Conservation", image: PlaceHolderImages[3] },
  { id: 5, title: "Beginner's Guide to Urban Gardening", description: "Grow your own food, even in a small city space.", xp: 45, tag: "Food & Agriculture", image: PlaceHolderImages[4] },
  { id: 6, title: "Reducing Your Carbon Footprint", description: "Practical tips and tricks to lower your environmental impact.", xp: 35, tag: "Climate Action", image: PlaceHolderImages[2] },
];

export default function StudentMaterials() {
  const { toast } = useToast();
  const [readMaterials, setReadMaterials] = useState<Set<number>>(new Set());

  const handleRead = (materialId: number, xp: number) => {
    if (!readMaterials.has(materialId)) {
      const newReadMaterials = new Set(readMaterials);
      newReadMaterials.add(materialId);
      setReadMaterials(newReadMaterials);
      toast({
        title: "Material Read!",
        description: `You've earned ${xp} XP. Keep learning!`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard?role=student">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Learning Materials</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materialData.map(material => (
          <Card key={material.id} className="rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
            <CardHeader>
                <div className="relative aspect-video mb-4">
                    <Image src={material.image.imageUrl} alt={material.title} fill className="object-cover rounded-t-2xl" data-ai-hint={material.image.imageHint}/>
                </div>
              <CardTitle className="text-lg font-bold">{material.title}</CardTitle>
              <Badge variant="secondary" className="w-fit">{material.tag}</Badge>
              <CardDescription>{material.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600"><Award className="h-5 w-5" />{material.xp} XP</div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => handleRead(material.id, material.xp)} disabled={readMaterials.has(material.id)}>
                    {readMaterials.has(material.id) ? <CheckCircle className="mr-2 h-4 w-4"/> : <BookOpen className="mr-2 h-4 w-4"/>}
                    {readMaterials.has(material.id) ? "Completed" : "Read Material"}
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
