'use client';

import { useState } from 'react';
import { YouTubePlayer } from '@/components/audio/youtube-player';
import { audioData, categories } from '@/data/audio-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles, Moon, Heart } from 'lucide-react';

const iconMap = {
  BookOpen,
  Sparkles,
  Moon,
  Heart
};

const AudioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAudio = selectedCategory
    ? audioData.filter(audio => audio.category === selectedCategory)
    : audioData;

  return ( 
    <section className="px-4 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              Relaxing Audio Collection
            </h2>
            <p className="text-muted-foreground">
              A curated collection of soothing and relaxing audio tracks for study, meditation, and peace of mind.
            </p>
          </div>
          <div className="hidden md:block">{/* This column is intentionally left empty as per the requirements */}</div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={selectedCategory === null ? "secondary" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="gap-2"
          >
            All
          </Button>
          {Object.entries(categories).map(([key, category]) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? "secondary" : "outline"}
                onClick={() => setSelectedCategory(key)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAudio.map((audio) => {
            const category = categories[audio.category];
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            
            return (
              <Card key={audio.id} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </div>
                  <YouTubePlayer
                    title={audio.title}
                    videoId={audio.videoId}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AudioPage;