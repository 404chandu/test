"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ModalContext } from './main-layout';

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-')).slice(0, 6);

export default function Gallery() {
  const { openModal } = useContext(ModalContext);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Our Green Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore moments of environmental learning and achievement from our community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <Card
              key={image.id}
              className="group overflow-hidden cursor-pointer rounded-2xl"
              onClick={openModal}
              style={{ animation: `fade-in 0.5s ${index * 0.1}s ease-in-out forwards`, opacity: 0 }}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    data-ai-hint={image.imageHint}
                  />
                   <div className="absolute inset-0 bg-green-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </CardContent>
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
