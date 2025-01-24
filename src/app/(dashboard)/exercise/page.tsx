"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ExerciseType = "running" | "cycling" | "sleep";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Exercise {
  type: ExerciseType;
  duration: number;
  distance?: number;
  date: Date;
}

const exerciseIcons = {
  running: "🏃‍♂️",
  cycling: "🚴‍♂️",
  sleep: "😴",
};

const exerciseMetrics = {
  running: {
    weeklyDistance: "41.5 km",
    weeklyTime: "4h 14m",
    lastActivity: "5.9 km",
    trend: "+8.5%",
  },
  cycling: {
    weeklyDistance: "126.9 km",
    weeklyTime: "6h 39m",
    lastActivity: "17.9 km",
    trend: "+15.2%",
  },
  sleep: {
    weeklyTime: "53h 12m",
    avgDuration: "7.6h",
    quality: "84%",
    trend: "+3.2%",
  },
};

const ExercisePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedType, setSelectedType] = useState<ExerciseType>("running");

  return (
    <section className="container space-y-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Exercise Tracking</h1>
        <p className="text-muted-foreground">
          Track your daily activities and monitor your progress
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Activity Cards */}
        {(["running", "cycling", "sleep"] as ExerciseType[]).map((type) => (
          <Link href={`/exercise/${type}`} key={type}>
            <Card
              className={cn(
                "group cursor-pointer transition-all hover:shadow-lg",
                selectedType === type && "border-primary",
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium capitalize">
                  {type}
                </CardTitle>
                <span className="text-2xl">{exerciseIcons[type]}</span>
              </CardHeader>
              <CardContent>
                {type === "sleep" ? (
                  <>
                    <div className="text-2xl font-bold">
                      {exerciseMetrics[type].avgDuration}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average duration per day
                    </p>
                    <div className="mt-2 text-sm">
                      Quality: {exerciseMetrics[type].quality}
                      <span className="ml-2 text-green-500">
                        {exerciseMetrics[type].trend}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {exerciseMetrics[type].weeklyDistance}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total distance this week
                    </p>
                    <div className="mt-2 text-sm">
                      Time: {exerciseMetrics[type].weeklyTime}
                      <span className="ml-2 text-green-500">
                        {exerciseMetrics[type].trend}
                      </span>
                    </div>
                  </>
                )}
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Pick a date to log your activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Activity Form */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Log</CardTitle>
            <CardDescription>
              Quickly log your {selectedType} activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Activity Type</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) =>
                    setSelectedType(value as ExerciseType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running 🏃‍♂️</SelectItem>
                    <SelectItem value="cycling">Cycling 🚴‍♂️</SelectItem>
                    <SelectItem value="sleep">Sleep 😴</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedType !== "sleep" && (
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter distance"
                    step="0.1"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="duration">
                  {selectedType === "sleep"
                    ? "Sleep Duration (hours)"
                    : "Duration (minutes)"}
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  step={selectedType === "sleep" ? "0.5" : "1"}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Activity
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExercisePage;
