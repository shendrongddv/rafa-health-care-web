'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ArrowUp, Heart, Timer } from 'lucide-react';

type ExerciseType = 'running' | 'cycling' | 'sleep';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ActivityMetric {
  label: string;
  value: string;
  change: number;
  icon: JSX.Element;
}

const mockData = {
  running: {
    weeklyData: [
      { date: '2024-01-17', distance: 5.2, pace: 5.3, duration: 32, heartRate: 145 },
      { date: '2024-01-18', distance: 6.1, pace: 5.1, duration: 38, heartRate: 148 },
      { date: '2024-01-19', distance: 4.8, pace: 5.4, duration: 30, heartRate: 142 },
      { date: '2024-01-20', distance: 7.2, pace: 5.0, duration: 44, heartRate: 150 },
      { date: '2024-01-21', distance: 5.5, pace: 5.2, duration: 34, heartRate: 146 },
      { date: '2024-01-22', distance: 6.8, pace: 4.9, duration: 40, heartRate: 149 },
      { date: '2024-01-23', distance: 5.9, pace: 5.1, duration: 36, heartRate: 147 },
    ],
    metrics: [
      { label: 'Weekly Distance', value: '41.5 km', change: 8.5, icon: <ArrowUp className="text-green-500" /> },
      { label: 'Avg. Pace', value: '5.1 min/km', change: -2.1, icon: <ArrowUp className="text-green-500" /> },
      { label: 'Total Time', value: '4h 14m', change: 12.3, icon: <Timer className="text-blue-500" /> },
      { label: 'Avg. Heart Rate', value: '146 bpm', change: -1.2, icon: <Heart className="text-red-500" /> },
    ],
  },
  cycling: {
    weeklyData: [
      { date: '2024-01-17', distance: 15.2, speed: 22.3, duration: 45, heartRate: 138 },
      { date: '2024-01-18', distance: 18.5, speed: 23.1, duration: 52, heartRate: 142 },
      { date: '2024-01-19', distance: 12.8, speed: 21.4, duration: 38, heartRate: 135 },
      { date: '2024-01-20', distance: 25.2, speed: 24.0, duration: 68, heartRate: 145 },
      { date: '2024-01-21', distance: 16.5, speed: 22.2, duration: 48, heartRate: 140 },
      { date: '2024-01-22', distance: 20.8, speed: 23.9, duration: 58, heartRate: 143 },
      { date: '2024-01-23', distance: 17.9, speed: 22.1, duration: 50, heartRate: 141 },
    ],
    metrics: [
      { label: 'Weekly Distance', value: '126.9 km', change: 15.2, icon: <ArrowUp className="text-green-500" /> },
      { label: 'Avg. Speed', value: '22.7 km/h', change: 3.5, icon: <ArrowUp className="text-green-500" /> },
      { label: 'Total Time', value: '6h 39m', change: 8.7, icon: <Timer className="text-blue-500" /> },
      { label: 'Avg. Heart Rate', value: '140 bpm', change: -0.8, icon: <Heart className="text-red-500" /> },
    ],
  },
  sleep: {
    weeklyData: [
      { date: '2024-01-17', duration: 7.5, quality: 85, deepSleep: 2.3, remSleep: 1.8 },
      { date: '2024-01-18', duration: 8.2, quality: 90, deepSleep: 2.5, remSleep: 2.0 },
      { date: '2024-01-19', duration: 6.8, quality: 75, deepSleep: 1.9, remSleep: 1.5 },
      { date: '2024-01-20', duration: 7.8, quality: 88, deepSleep: 2.4, remSleep: 1.9 },
      { date: '2024-01-21', duration: 7.2, quality: 82, deepSleep: 2.1, remSleep: 1.7 },
      { date: '2024-01-22', duration: 7.9, quality: 87, deepSleep: 2.3, remSleep: 1.8 },
      { date: '2024-01-23', duration: 7.5, quality: 84, deepSleep: 2.2, remSleep: 1.7 },
    ],
    metrics: [
      { label: 'Avg. Duration', value: '7.6 hours', change: 3.2, icon: <Timer className="text-blue-500" /> },
      { label: 'Sleep Quality', value: '84%', change: 5.5, icon: <ArrowUp className="text-green-500" /> },
      { label: 'Deep Sleep', value: '2.2 hours', change: 0.2, icon: <ArrowUp className="text-green-500" /> },
      { label: 'REM Sleep', value: '1.8 hours', change: 0.1, icon: <ArrowUp className="text-green-500" /> },
    ],
  },
};

const activityTitles = {
  running: {
    title: 'Running Activity',
    description: 'Track your running performance and progress',
  },
  cycling: {
    title: 'Cycling Activity',
    description: 'Monitor your cycling metrics and improvements',
  },
  sleep: {
    title: 'Sleep Analysis',
    description: 'Analyze your sleep patterns and quality',
  },
};

export default function ActivityDetailPage() {
  const params = useParams();
  const type = params.type as ExerciseType;
  const [activeTab, setActiveTab] = useState('overview');
  const activityData = mockData[type];
  const { title, description } = activityTitles[type];

  const getChartData = () => {
    switch (activeTab) {
      case 'distance':
        return type === 'sleep' ? 'duration' : 'distance';
      case 'pace':
        return type === 'running' ? 'pace' : type === 'cycling' ? 'speed' : 'quality';
      case 'heartRate':
        return type === 'sleep' ? 'deepSleep' : 'heartRate';
      default:
        return type === 'sleep' ? 'duration' : 'distance';
    }
  };

  return (
    <section className="container space-y-8 py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activityData.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={cn(
                  metric.change > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                {' '}vs last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Trends</CardTitle>
          <CardDescription>Your {type} metrics over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="distance">
                {type === 'sleep' ? 'Duration' : 'Distance'}
              </TabsTrigger>
              <TabsTrigger value="pace">
                {type === 'running' ? 'Pace' : type === 'cycling' ? 'Speed' : 'Quality'}
              </TabsTrigger>
              <TabsTrigger value="heartRate">
                {type === 'sleep' ? 'Deep Sleep' : 'Heart Rate'}
              </TabsTrigger>
            </TabsList>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={getChartData()}
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Activity Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Personalized tips based on your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {type === 'running' && (
              <>
                <p>🎯 Target Pace: Based on your recent performance, try maintaining a pace of 5.0 min/km for your next run.</p>
                <p>💪 Suggested Distance: Aim for 7.5 km on your next run to gradually increase your weekly mileage.</p>
                <p>❤️ Heart Rate Zones: Your average heart rate is optimal. Keep maintaining this intensity level.</p>
              </>
            )}
            {type === 'cycling' && (
              <>
                <p>🚴‍♂️ Target Speed: Try to maintain an average speed of 23 km/h on your next ride.</p>
                <p>🎯 Distance Goal: Consider a 25 km ride this weekend to challenge yourself.</p>
                <p>📈 Progress: Your cycling endurance is improving. Keep up the consistent effort!</p>
              </>
            )}
            {type === 'sleep' && (
              <>
                <p>⏰ Optimal Sleep Time: Your best sleep quality occurs when you sleep between 10 PM and 6 AM.</p>
                <p>🌙 Deep Sleep: Your deep sleep duration is good. Maintain your current pre-sleep routine.</p>
                <p>📱 Recommendation: Consider avoiding screen time 1 hour before bed to improve sleep quality.</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Activity Button */}
      <div className="fixed bottom-8 right-8">
        <Button size="lg" className="rounded-full shadow-lg">
          Log New {type.charAt(0).toUpperCase() + type.slice(1)} Activity
        </Button>
      </div>
    </section>
  );
}
