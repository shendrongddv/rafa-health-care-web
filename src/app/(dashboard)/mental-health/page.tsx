'use client';

import { useState } from 'react';
import { categories, psychologists, Category } from '@/data/psychologists';
import { PsychologistCard } from '@/components/psychologists/psychologist-card';
import { Button } from '@/components/ui/button';

export default function MentalHealthPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredPsychologists = selectedCategory
    ? psychologists.filter((p) => p.expertise.includes(selectedCategory))
    : psychologists;

  return (
    <section className="container px-4 py-16 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Mental Health Support</h2>
        <p className="text-muted-foreground">
          Connect with psychology experts and find support for your mental well-being
        </p>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Filter by Specialty</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All Specialties
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Psychologists Grid */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPsychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}