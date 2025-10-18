"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ModalContext } from './main-layout';

const games = [
  { id: '1', title: 'Recycle Rush', description: 'Sort waste correctly against the clock and learn about recycling.', imageId: 'game-highlight-1' },
  { id: '2', title: 'Eco Explorer', description: 'Discover and learn about different ecosystems and their inhabitants.', imageId: 'game-highlight-2' },
  { id: '3', title: 'Water Saver', description: 'A fun puzzle game that teaches the importance of water conservation.', imageId: 'game-highlight-3' },
  { id: '4', title: 'Carbon Footprint', description: 'Calculate and find ways to reduce your virtual carbon footprint.', imageId: 'game-highlight-4' },
];

const gameImages = new Map(
  PlaceHolderImages.filter(img => img.id.startsWith('game-highlight-')).map(img => [img.id, img])
);

export default function GameHighlights() {
  const { openModal } = useContext(ModalContext);

  return (
    <section id="games" className="py-16 sm:py-24 bg-green-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Featured Games
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Dive into our collection of games designed to be both fun and educational.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {games.map((game) => {
            const image = gameImages.get(game.imageId);
            return (
              <Card key={game.id} className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-200/80 hover:-translate-y-2">
                {image && (
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={image.imageUrl}
                      alt={game.title}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-bold">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{game.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={openModal}>Explore</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
