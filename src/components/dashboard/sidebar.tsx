"use client";

import { Home, BookOpen, Puzzle, Trophy, BarChartBig, Users, Mail, Settings, Upload } from 'lucide-react';
import Link from 'next/link';

const GameXLogo = () => (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 4V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 16L17 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16L31 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const studentNavItems = [
  { href: '/dashboard?role=student', label: 'Dashboard', icon: Home },
  { href: '#', label: 'Lectures', icon: BookOpen },
  { href: '#', label: 'Quizzes', icon: Puzzle },
  { href: '#', label: 'Challenges', icon: Trophy },
  { href: '#', label: 'Leaderboard', icon: BarChartBig },
];

const lecturerNavItems = [
    { href: '/dashboard?role=lecturer', label: 'Dashboard', icon: Home },
    { href: '#', label: 'Upload Content', icon: Upload },
    { href: '#', label: 'Manage Quizzes', icon: Puzzle },
    { href: '#', label: 'Students', icon: Users },
    { href: '#', label: 'Announcements', icon: Mail },
];

const commonNavItems = [
    { href: '#', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen, role }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; role: string }) {
  const navItems = role === 'student' ? studentNavItems : lecturerNavItems;

  const handleLinkClick = () => {
    if (isOpen) {
        setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 p-6 border-b">
              <GameXLogo />
              <span className="text-2xl font-bold font-headline text-foreground">
                GameX
              </span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{role}</p>
                <ul>
                    {navItems.map((item) => (
                    <li key={item.label}>
                        <Link
                        href={item.href}
                        className="flex items-center gap-4 rounded-lg p-3 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-green-100 hover:text-primary hover:shadow-inner"
                        onClick={handleLinkClick}
                        >
                        <item.icon className="h-6 w-6" />
                        <span>{item.label}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
                <div className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">General</div>
                 <ul>
                    {commonNavItems.map((item) => (
                    <li key={item.label}>
                        <Link
                        href={item.href}
                        className="flex items-center gap-4 rounded-lg p-3 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-green-100 hover:text-primary hover:shadow-inner"
                        onClick={handleLinkClick}
                        >
                        <item.icon className="h-6 w-6" />
                        <span>{item.label}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
