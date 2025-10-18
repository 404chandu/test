"use client";

import { Home, BarChartBig, Users, Mail } from 'lucide-react';
import Link from 'next/link';

const GameXLogo = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 4V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 16L17 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16L31 32" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '#leaderboard', label: 'Leaderboard', icon: BarChartBig },
  { href: '#about', label: 'About Us', icon: Users },
  { href: '#contact', label: 'Contact Us', icon: Mail },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-green-100 to-green-200 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <GameXLogo />
          <span className="text-2xl font-bold font-headline text-foreground">
            GameX
          </span>
        </div>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={item.label} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-lg p-3 text-lg font-bold text-black transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 active:scale-100 ${index === 0 ? "shadow-md shadow-green-400/50" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-6 w-6 text-primary" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
