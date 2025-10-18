"use client";

import { useContext } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ModalContext } from "./main-layout";
import { Zap, Droplet, Leaf } from "lucide-react";

const challenges = [
  {
    title: "Energy Expert",
    description: "How much do you know about renewable energy sources? Take the quiz!",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Water Wise",
    description: "Test your knowledge on water conservation and pollution.",
    icon: Droplet,
    color: "text-blue-500",
  },
  {
    title: "Forest Friend",
    description: "Challenge yourself with questions about deforestation and biodiversity.",
    icon: Leaf,
    color: "text-green-500",
  },
];

export default function TestYourSkills() {
  const { openModal } = useContext(ModalContext);

  return (
    <section id="skills" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
            Test Your Skills
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Ready for a challenge? See how much you know about protecting our planet.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <Card key={challenge.title} className="text-center rounded-2xl p-2 transition-all duration-300 hover:shadow-2xl hover:shadow-green-200/50 hover:-translate-y-2">
              <CardHeader className="items-center">
                <div className={`p-4 bg-muted rounded-full ${challenge.color}`}>
                  <challenge.icon className="w-8 h-8"/>
                </div>
                <CardTitle className="mt-4 font-bold">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{challenge.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={openModal}>Try Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
