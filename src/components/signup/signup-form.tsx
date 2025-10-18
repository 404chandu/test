"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const step2Schema = z.object({
  grade: z.string().min(1, "Please select your grade level"),
  school: z.string().min(1, "School name is required"),
  district: z.string().min(1, "District name is required"),
  state: z.string().min(1, "Please select your state"),
  pinCode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

const formSchema = step1Schema.merge(step2Schema);

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(step === 1 ? step1Schema : formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      grade: "",
      school: "",
      district: "",
      state: "",
      pinCode: "",
      terms: false,
    },
  });

  async function handleNextStep() {
    const isValid = await form.trigger(["firstName", "lastName", "email", "password"]);
    if (isValid) {
      setStep(2);
    }
  }

  function handlePreviousStep() {
    setStep(1);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Account created:", values);
    // Handle account creation logic here
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl">
        <Card className="rounded-xl shadow-md transition-shadow hover:shadow-lg bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create Your GameX Account
            </CardTitle>
            <CardDescription className="text-center">
              Step {step} of 2: {step === 1 ? "Basic Information" : "Educational Details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade / Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="shadow-sm focus:ring-2 focus:ring-primary/50">
                                    <SelectValue placeholder="Select your grade" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {["Primary (1-5)", "Middle (6-8)", "Secondary (9-10)", "Higher Secondary (11-12)", "Undergraduate", "Post-Graduate"].map(level => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School / University Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Greenwood High" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Springfield" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="shadow-sm focus:ring-2 focus:ring-primary/50">
                                    <SelectValue placeholder="Select your state" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {statesOfIndia.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                   )}
                />
                </div>
                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} className="shadow-sm focus:ring-2 focus:ring-primary/50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:shadow-md transition-shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="transition hover:ring-2 hover:ring-primary/50"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 1 && (
                <>
                <Button variant="outline" asChild className="rounded shadow-sm hover:-translate-y-1 transition-transform">
                    <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
                </Button>
                <Button type="button" onClick={handleNextStep} className="rounded shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </>
            )}
            {step === 2 && (
                <>
                <Button type="button" variant="outline" onClick={handlePreviousStep} className="rounded shadow-sm hover:-translate-y-1 transition-transform">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" disabled={!form.watch("terms")} className="rounded shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-50">
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </Button>
                </>
            )}
          </CardFooter>
        </Card>
      </form>
       <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out forwards;
        }
      `}</style>
    </FormProvider>
  );
}
