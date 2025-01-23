'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { psychologists } from '@/data/psychologists';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Award, 
  Clock, 
  Globe, 
  GraduationCap, 
  MessageSquare, 
  CheckCircle2,
  BookMarked,
  FileText,
  Users,
  Brain,
  Stethoscope,
} from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  }
}

const mockProfessionalData = {
  specializations: [
    {
      area: "Anxiety Disorders",
      description: "Specialized treatment for various anxiety disorders including GAD, panic disorder, and social anxiety.",
      experience: "8+ years",
      approaches: ["CBT", "Exposure Therapy", "Mindfulness-Based Therapy"]
    },
    {
      area: "Depression Management",
      description: "Evidence-based treatment for major depressive disorder and persistent depressive disorder.",
      experience: "10+ years",
      approaches: ["Interpersonal Therapy", "Behavioral Activation", "CBT"]
    },
    {
      area: "Trauma Recovery",
      description: "Trauma-informed care for PTSD and complex trauma.",
      experience: "6+ years",
      approaches: ["EMDR", "Trauma-Focused CBT", "Somatic Experiencing"]
    }
  ],
  approaches: [
    {
      name: "Cognitive Behavioral Therapy (CBT)",
      description: "A structured approach focusing on identifying and changing negative thought patterns and behaviors.",
      suitable_for: ["Anxiety", "Depression", "Stress Management", "Phobias"],
      certification_year: 2015
    },
    {
      name: "Mindfulness-Based Cognitive Therapy (MBCT)",
      description: "Combines traditional CBT methods with mindfulness strategies to help prevent depression relapse.",
      suitable_for: ["Depression", "Anxiety", "Stress"],
      certification_year: 2017
    },
    {
      name: "Eye Movement Desensitization and Reprocessing (EMDR)",
      description: "A psychotherapy treatment designed to alleviate the distress associated with traumatic memories.",
      suitable_for: ["PTSD", "Trauma", "Anxiety"],
      certification_year: 2019
    },
    {
      name: "Dialectical Behavior Therapy (DBT)",
      description: "A comprehensive cognitive-behavioral treatment for complex mental disorders.",
      suitable_for: ["Borderline Personality Disorder", "Self-harm", "Emotional Regulation"],
      certification_year: 2018
    }
  ],
  education: [
    {
      degree: "Ph.D. in Clinical Psychology",
      institution: "Stanford University",
      year: "2015",
      thesis: "The Role of Mindfulness in Anxiety Treatment: A Longitudinal Study",
      honors: ["Summa Cum Laude", "Outstanding Research Award"]
    },
    {
      degree: "M.S. in Psychology",
      institution: "University of California, Berkeley",
      year: "2012",
      specialization: "Cognitive and Behavioral Psychology",
      honors: ["Dean's List"]
    },
    {
      degree: "B.A. in Psychology",
      institution: "Yale University",
      year: "2010",
      minor: "Neuroscience",
      honors: ["Phi Beta Kappa"]
    }
  ],
  certifications: [
    {
      name: "Licensed Clinical Psychologist",
      organization: "American Board of Professional Psychology",
      year: "2016",
      expires: "2026",
      license_number: "PSY12345"
    },
    {
      name: "Certified EMDR Therapist",
      organization: "EMDR International Association",
      year: "2019",
      expires: "2025",
      certification_number: "EMDR98765"
    },
    {
      name: "Certified DBT Therapist",
      organization: "DBT-Linehan Board of Certification",
      year: "2018",
      expires: "2024",
      certification_number: "DBT45678"
    }
  ],
  publications: [
    {
      title: "The Impact of Mindfulness-Based Interventions on Anxiety Disorders: A Meta-Analysis",
      journal: "Journal of Clinical Psychology",
      year: 2020,
      doi: "10.1000/jcp.2020.12345",
      citation_count: 156
    },
    {
      title: "Integrating Technology in CBT: A Systematic Review",
      journal: "Cognitive Therapy and Research",
      year: 2019,
      doi: "10.1000/ctr.2019.67890",
      citation_count: 89
    },
    {
      title: "Long-term Outcomes of EMDR in PTSD Treatment",
      journal: "Journal of Traumatic Stress",
      year: 2018,
      doi: "10.1000/jts.2018.13579",
      citation_count: 234
    }
  ],
  research_interests: [
    "Digital Mental Health Interventions",
    "Trauma-Informed Care",
    "Mindfulness-Based Therapies",
    "Anxiety Disorders",
    "Depression Treatment Outcomes"
  ]
};

export default function PsychologistDetailPage({ params }: PageProps) {
  const psychologist = psychologists.find(p => p.id === params.id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  if (!psychologist) {
    notFound();
  }

  const availableTimeSlots = selectedDate 
    ? psychologist.availability[format(selectedDate, 'EEEE').toLowerCase()]?.slots || []
    : [];

  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                <AvatarImage src={psychologist.avatar} alt={psychologist.name} />
                <AvatarFallback>{psychologist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold truncate">{psychologist.name}</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground">{psychologist.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {psychologist.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-muted-foreground text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{psychologist.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{psychologist.yearsOfExperience} Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{psychologist.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max p-1">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specializations">Specializations</TabsTrigger>
                  <TabsTrigger value="approaches">Therapeutic Approaches</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="publications">Publications</TabsTrigger>
                </TabsList>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{psychologist.shortBio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specializations" className="space-y-4">
              {mockProfessionalData.specializations.map((spec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <CardTitle>{spec.area}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{spec.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{spec.experience}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {spec.approaches.map((approach, idx) => (
                        <Badge key={idx} variant="outline">{approach}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="approaches" className="space-y-4">
              {mockProfessionalData.approaches.map((approach, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      <CardTitle>{approach.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{approach.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Suitable for:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {approach.suitable_for.map((condition, idx) => (
                          <Badge key={idx} variant="secondary">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Certified since {approach.certification_year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              {mockProfessionalData.education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <CardTitle>{edu.degree}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{edu.institution}</p>
                        <p className="text-muted-foreground">Class of {edu.year}</p>
                      </div>
                      {edu.thesis && (
                        <div>
                          <p className="font-medium">Thesis</p>
                          <p className="text-muted-foreground">{edu.thesis}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor, idx) => (
                        <Badge key={idx} variant="outline">{honor}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              {mockProfessionalData.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <CardTitle>{cert.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{cert.organization}</p>
                        <p className="text-muted-foreground">License #{cert.license_number || cert.certification_number}</p>
                      </div>
                      <div>
                        <p className="font-medium">Valid Period</p>
                        <p className="text-muted-foreground">{cert.year} - {cert.expires}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="publications" className="space-y-4">
              {mockProfessionalData.publications.map((pub, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-5 h-5 text-primary" />
                      <CardTitle>{pub.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{pub.journal}</p>
                        <p className="text-muted-foreground">Published in {pub.year}</p>
                      </div>
                      <div>
                        <p className="font-medium">Impact</p>
                        <p className="text-muted-foreground">{pub.citation_count} citations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" />
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline">
                        DOI: {pub.doi}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>

          {/* Quick Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
