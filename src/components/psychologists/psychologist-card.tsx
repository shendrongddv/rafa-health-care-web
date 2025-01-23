'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Psychologist } from '@/data/psychologists';
import { CalendarPlus } from 'lucide-react';
import Link from 'next/link';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export function PsychologistCard({ psychologist }: PsychologistCardProps) {
  const initials = psychologist.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={psychologist.avatar} alt={psychologist.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold">{psychologist.name}</h3>
          <p className="text-sm text-muted-foreground">{psychologist.title}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1 mb-4">
          {psychologist.expertise.map((expertise) => (
            <Badge key={expertise} variant="secondary">
              {expertise}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {psychologist.shortBio}
        </p>
        <div className="text-sm">
          <p className="text-muted-foreground">
            Experience: {psychologist.yearsOfExperience} years
          </p>
          <p className="text-muted-foreground">
            Languages: {psychologist.languages.join(', ')}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/mental-health/psychologists/${psychologist.id}`}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
