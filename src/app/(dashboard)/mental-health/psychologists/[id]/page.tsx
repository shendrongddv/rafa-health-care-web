'use client';

import { notFound } from 'next/navigation';
import { psychologists } from '@/data/psychologists';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Globe, 
  GraduationCap, 
  Languages, 
  MessageSquare, 
  Scroll, 
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function PsychologistDetailPage({ params }: PageProps) {
  const psychologist = psychologists.find((p) => p.id === params.id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  if (!psychologist) {
    notFound();
  }

  const availableTimeSlots = selectedDate 
    ? psychologist.availability[format(selectedDate, 'EEEE').toLowerCase()]?.slots || []
    : [];

  return (
    <div className="container px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={psychologist.avatar} alt={psychologist.name} />
              <AvatarFallback>
                {psychologist.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{psychologist.name}</h1>
              <p className="text-xl text-muted-foreground">{psychologist.title}</p>
              <div className="flex flex-wrap gap-2">
                {psychologist.expertise.map((expertise) => (
                  <Badge key={expertise} variant="secondary">
                    {expertise}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{psychologist.detailedBio || psychologist.shortBio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{psychologist.yearsOfExperience} years of experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      <span>{psychologist.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{psychologist.consultationFee.duration} minutes session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Online consultation available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {psychologist.specializations.map((spec, index) => (
                      <li key={index} className="text-muted-foreground">{spec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Therapeutic Approaches</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {psychologist.approaches.map((approach, index) => (
                      <li key={index} className="text-muted-foreground">{approach}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credentials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{psychologist.education}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {psychologist.certifications.map((cert, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline">{cert.year}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {psychologist.awards && psychologist.awards.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Awards & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {psychologist.awards.map((award, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{award.name}</p>
                            <p className="text-sm text-muted-foreground">{award.issuer}</p>
                          </div>
                          <Badge variant="outline">{award.year}</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="publications" className="space-y-4">
              {psychologist.publications && psychologist.publications.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Publications & Research
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {psychologist.publications.map((pub, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{pub.title}</p>
                            <p className="text-sm text-muted-foreground">{pub.publisher}</p>
                          </div>
                          <Badge variant="outline">{pub.year}</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-muted-foreground text-center py-8">No publications available</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Consultation Fee */}
          <Card>
            <CardHeader>
              <CardTitle>Consultation Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {psychologist.consultationFee.currency} {psychologist.consultationFee.amount}
              </div>
              <p className="text-muted-foreground">
                {psychologist.consultationFee.duration} minutes session
              </p>
            </CardContent>
          </Card>

          {/* Appointment Booking */}
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />

              <div className="space-y-2">
                <h4 className="font-medium">Available Time Slots</h4>
                <ScrollArea className="h-[120px]">
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimeSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full"
                      >
                        {slot.start}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Button className="w-full">
                Continue to Book
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
