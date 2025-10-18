"use client";

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import { ModalContext } from './main-layout';

const GameXLogo = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 4V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 16L17 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d_ts-expect-error="M17 16L31 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export default function Header({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void; isSidebarOpen: boolean }) {
  const { openModal } = useContext(ModalContext);

  return (
    <header className="sticky top-0 z-30 w-full bg-gradient-to-b from-sky-100/80 via-background/70 to-background/0 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="rounded-full relative overflow-hidden"
          >
            <Menu className={`h-6 w-6 transition-all duration-300 ${isSidebarOpen ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <X className={`absolute h-6 w-6 transition-all duration-300 ${isSidebarOpen ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <GameXLogo />
            <span className="hidden text-2xl font-bold font-headline text-foreground md:block">
              GameX
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={openModal}>Log In</Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}