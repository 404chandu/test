"use client";

import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ModalContext } from './main-layout';
import TypingAnimation from './typing-animation';

const Leaf = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      className="fill-green-300 opacity-70"
    />
    <path
      d="M12 4C12 4 8 8 8 12C8 16 12 20 12 20"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

const OrigamiBird = ({ className }: { className?: string }) => (
    <svg className={className} width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.227 10.395L11.51 21.23a1 1 0 001.414 0l9.317-10.867a1 1 0 00-.73-1.68H2.957a1 1 0 00-.73 1.68z" className="fill-white/80" />
        <path d="M12 21.23V2.77" stroke="hsl(var(--accent))" strokeWidth="1" />
        <path d="M12 12.195L3.41 8.71" stroke="hsl(var(--accent))" strokeWidth="1" />
    </svg>
);

const Vine = ({ className }: { className?: string }) => (
  <div className={`absolute origin-top ${className}`}>
    <svg width="4" height="150" viewBox="0 0 4 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 0 V 150" stroke="url(#vine-gradient)" strokeWidth="3" />
      <defs>
        <linearGradient id="vine-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8E6CF" stopOpacity="0" />
          <stop offset="1" stopColor="#A8E6CF" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);


export default function Hero() {
  const { openModal } = useContext(ModalContext);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 to-background pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="relative z-10">
          <TypingAnimation />
          <p className="mt-4 text-lg text-green-800/80 md:text-xl font-medium max-w-2xl mx-auto">
            Gamified learning for a sustainable future.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={openModal} className="w-full sm:w-auto">Start Your Journey</Button>
            <Button size="lg" variant="outline" onClick={openModal} className="w-full sm:w-auto">Learn More</Button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Leaf className="absolute top-1/4 left-[10%] w-12 h-12 animate-float opacity-50" />
        <Leaf className="absolute top-1/2 right-[15%] w-16 h-16 animate-float [animation-delay:-2s] opacity-50" />
        <Leaf className="absolute bottom-1/4 left-[20%] w-8 h-8 animate-float [animation-delay:-4s] opacity-50" />
        
        <div className="absolute top-0 left-0 w-full h-full">
            <OrigamiBird className="absolute top-[10%] -left-10 animate-fly [animation-duration:20s]" />
            <OrigamiBird className="absolute top-[20%] -left-10 animate-fly [animation-delay:5s] [animation-duration:15s] scale-75" />
            <OrigamiBird className="absolute top-[50%] -left-10 animate-fly [animation-delay:10s] [animation-duration:25s] scale-90" />
        </div>
        
        <Vine className="left-1/4 -top-8 animate-sway opacity-30" />
        <Vine className="right-1/4 -top-12 animate-sway opacity-40 [animation-delay:-2s]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-[40vw] h-[40vh] bg-accent/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
