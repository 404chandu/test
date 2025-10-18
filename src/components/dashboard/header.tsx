
"use client";

import { Bell, Menu, X, Award, LogOut, BookOpen, Puzzle, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const GameXLogo = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 4V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 16L17 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16L31 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
  
const StudentDropdown = () => (
    <TooltipProvider>
    <>
        <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Student Name</p>
                <p className="text-xs leading-none text-muted-foreground">stu@gmail.com</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm">
            <div className="flex justify-between mb-1">
                <span className="font-medium">Level 5</span>
                <span>2750 / 5000 XP</span>
            </div>
            <Progress value={55} className="h-2" />
             <p className="text-xs text-muted-foreground mt-1 text-right">2250 XP to next level</p>
        </div>
        <div className="px-2 py-1.5 text-sm">
            <p className="font-medium mb-2">Badges</p>
            <div className="flex gap-2">
                <Tooltip>
                    <TooltipTrigger><Award className="h-6 w-6 text-yellow-500 transition-transform hover:scale-110" /></TooltipTrigger>
                    <TooltipContent>Eco-Innovator (500XP)</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger><Award className="h-6 w-6 text-slate-400 transition-transform hover:scale-110" /></TooltipTrigger>
                    <TooltipContent>Recycle Ranger (250XP)</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger><Award className="h-6 w-6 text-amber-700 transition-transform hover:scale-110" /></TooltipTrigger>
                    <TooltipContent>Bronze Learner (100XP)</TooltipContent>
                </Tooltip>
            </div>
        </div>
        <DropdownMenuSeparator />
         <div className="px-2 py-1.5 text-sm">
            <p className="font-medium mb-2">Progress Summary</p>
            <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary"/><span>Lectures</span></div> <span>5/9</span></div>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Puzzle className="h-4 w-4 text-primary"/><span>Quizzes</span></div> <span>3/4</span></div>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary"/><span>Challenges</span></div> <span>8/15</span></div>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary"/><span>Materials</span></div> <span>4/6</span></div>
            </div>
        </div>
    </>
    </TooltipProvider>
);

const LecturerDropdown = () => (
    <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Lecturer Name</p>
            <p className="text-xs leading-none text-muted-foreground">lec@gmail.com</p>
        </div>
    </DropdownMenuLabel>
);

export default function Header({ toggleSidebar, isSidebarOpen, role }: { toggleSidebar: () => void; isSidebarOpen: boolean, role: string }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="rounded-full relative overflow-hidden md:hidden"
          >
            <Menu className={`h-6 w-6 transition-all duration-300 ${isSidebarOpen ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <X className={`absolute h-6 w-6 transition-all duration-300 ${isSidebarOpen ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
          </Button>
          <Link href={`/dashboard?role=${role}`} className="hidden items-center gap-2 md:flex">

            <GameXLogo />
            <span className="hidden text-2xl font-bold font-headline text-foreground md:block">
              GameX
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-green-100 transition-colors">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <div className="flex flex-col">
                            <p className="font-medium">New Quiz Uploaded!</p>
                            <p className="text-xs text-muted-foreground">"Renewable Energy" quiz is now available.</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex flex-col">
                            <p className="font-medium">Announcement</p>
                            <p className="text-xs text-muted-foreground">Weekly contest starts tomorrow.</p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className='h-10 w-10 border-2 border-primary/50'>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${role === 'student' ? 'student' : 'lecturer'}`} alt="User Avatar" />
                            <AvatarFallback>{role === 'student' ? 'ST' : 'LC'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                    {role === 'student' ? <StudentDropdown /> : <LecturerDropdown />}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
