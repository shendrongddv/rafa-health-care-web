"use client";

// import { Metadata } from "next"

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Music,
  Dumbbell,
  Brain,
  Sun,
  Cloud,
  Moon,
  ArrowRight,
} from "lucide-react";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// }

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState<React.ReactNode>();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good morning");
        setGreetingIcon(<Sun className="mr-2 h-6 w-6" />);
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good afternoon");
        setGreetingIcon(<Cloud className="mr-2 h-6 w-6" />);
      } else {
        setGreeting("Good evening");
        setGreetingIcon(<Moon className="mr-2 h-6 w-6" />);
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container px-4 py-16">
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h1 className="mb-2 flex items-center text-3xl font-bold">
            {greetingIcon}
            {greeting}!
          </h1>
          <p className="text-muted-foreground">
            Welcome to your personal health and study dashboard. Here you can
            access tools for relaxation, exercise, and mental well-being.
          </p>
        </div>
        <div className="hidden md:block">
          {/* This column is intentionally left empty as per the requirements */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Audio"
          description="Audio for study and relaxation"
          icon={<Music className="h-6 w-6" />}
          href="/audio"
        />
        <DashboardCard
          title="Exercise"
          description="Track your physical activities"
          icon={<Dumbbell className="h-6 w-6" />}
          href="/exercise"
        />
        <DashboardCard
          title="Mental Health"
          description="Connect with psychology experts"
          icon={<Brain className="h-6 w-6" />}
          href="/mental-health"
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function DashboardCard({ title, description, icon, href }: DashboardCardProps) {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <Link href={href} className="block h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              {icon}
              <span className="ml-2">{title}</span>
            </span>
            <ArrowRight className="h-5 w-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
