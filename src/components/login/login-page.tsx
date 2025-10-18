"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, School, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "lecturer" | null;

const loginImage = PlaceHolderImages.find(img => img.id === 'gallery-1');

const RoleSelection = ({ onSelectRole }: { onSelectRole: (role: Role) => void }) => (
  <Card className="w-full max-w-2xl rounded-2xl shadow-md transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold">Welcome Back to GameX</CardTitle>
      <CardDescription>Please select your role to continue.</CardDescription>
    </CardHeader>
    <CardContent className="grid sm:grid-cols-2 gap-6 p-6">
      <div
        onClick={() => onSelectRole("student")}
        className="group p-6 text-center rounded-2xl border bg-green-50/50 hover:bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-green-200 hover:-translate-y-1"
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-full text-primary shadow-inner">
            <User className="w-10 h-10 transition-transform group-hover:scale-110" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground">Login as Student</h3>
      </div>
      <div
        onClick={() => onSelectRole("lecturer")}
        className="group p-6 text-center rounded-2xl border bg-green-50/50 hover:bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-green-200 hover:-translate-y-1"
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-full text-primary shadow-inner">
            <School className="w-10 h-10 transition-transform group-hover:scale-110" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground">Login as Lecturer</h3>
      </div>
    </CardContent>
  </Card>
);

const LoginForm = ({ role, onBack }: { role: Role; onBack: () => void }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isStudent = role === 'student' && email === 'stu@gmail.com' && password === 'stu@123';
    const isLecturer = role === 'lecturer' && email === 'lec@gmail.com' && password === 'lec@123';

    if (isStudent || isLecturer) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${role}!`,
      });
      router.push(`/dashboard?role=${role}`);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl grid md:grid-cols-2 overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border animate-fade-in-scale">
      <div className="hidden md:block relative">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            className="object-cover"
            data-ai-hint={loginImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
      </div>
      <div className="p-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to role selection
        </Button>
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold capitalize">
            {role} Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="focus:ring-2 focus:ring-primary/50" />
          </div>
          <Button type="submit" className="w-full rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Login
          </Button>
        </form>
        <div className="text-center mt-4 text-sm">
          <Link href="#" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  return (
    <>
      {!selectedRole ? (
        <RoleSelection onSelectRole={setSelectedRole} />
      ) : (
        <LoginForm role={selectedRole} onBack={() => setSelectedRole(null)} />
      )}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out forwards;
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
