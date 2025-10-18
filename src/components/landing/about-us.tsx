"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "../ui/card";

const aboutUsImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-green-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
              About GameX
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              GameX is on a mission to make learning about sustainability engaging and fun for everyone. We believe that games are a powerful tool for education and driving real-world change.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our team of developers, designers, and environmentalists is dedicated to creating high-quality, impactful games that inspire players to build a greener future.
            </p>
          </div>
          <div>
            <Card className="overflow-hidden rounded-2xl shadow-lg shadow-green-200/50">
              {aboutUsImage && (
                <Image
                  src={aboutUsImage.imageUrl}
                  alt={aboutUsImage.description}
                  width={800}
                  height={600}
                  className="object-cover"
                  data-ai-hint={aboutUsImage.imageHint}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
