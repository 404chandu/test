"use client";

import Link from "next/link";
import { Instagram, Linkedin, Phone, Mail as MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const GameXLogo = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="hsl(var(--primary-foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 4V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="hsl(var(--accent))" stroke="hsl(var(--primary-foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 16L17 32" stroke="hsl(var(--background))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16L31 32" stroke="hsl(var(--background))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <GameXLogo />
              <h3 className="text-2xl font-bold">GameX</h3>
            </div>
            <p className="text-muted-foreground text-secondary-foreground/70 mb-6">Gamified learning for a sustainable future. Join us in making a difference, one game at a time.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5"/>
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5"/>
                <span>contact@gamex.com</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Link href="https://instagram.com/gamex_placeholder" target="_blank" aria-label="Instagram">
                <Button variant="outline" size="icon" className="bg-transparent border-secondary-foreground/50 hover:bg-secondary-foreground/20 rounded-full transition-transform hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/boddula-sunandha-033991294/" target="_blank" aria-label="LinkedIn">
                <Button variant="outline" size="icon" className="bg-transparent border-secondary-foreground/50 hover:bg-secondary-foreground/20 rounded-full transition-transform hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-7">
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" className="bg-secondary-foreground/10 border-secondary-foreground/30 focus:bg-secondary-foreground/20"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" className="bg-secondary-foreground/10 border-secondary-foreground/30 focus:bg-secondary-foreground/20"/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your Message" className="bg-secondary-foreground/10 border-secondary-foreground/30 focus:bg-secondary-foreground/20"/>
              </div>
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary-foreground/20 pt-6 text-center text-sm text-secondary-foreground/50">
          <p>&copy; {new Date().getFullYear()} GameX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
