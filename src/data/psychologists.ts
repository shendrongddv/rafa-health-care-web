export const categories = [
  'Stress',
  'Depression',
  'Anxiety',
  'Relationship',
  'Trauma',
  'Mood Disorders'
] as const;

export type Category = typeof categories[number];

export interface Psychologist {
  id: string;
  name: string;
  title: string;
  expertise: Category[];
  avatar: string;
  yearsOfExperience: number;
  education: string;
  shortBio: string;
  languages: string[];
  detailedBio: string;
  certifications: {
    name: string;
    issuer: string;
    year: number;
  }[];
  specializations: string[];
  approaches: string[];
  publications?: {
    title: string;
    publisher: string;
    year: number;
    url?: string;
  }[];
  awards?: {
    name: string;
    issuer: string;
    year: number;
  }[];
  consultationFee: {
    amount: number;
    currency: string;
    duration: number; // in minutes
  };
  availability: {
    [key: string]: { // day of week
      slots: {
        start: string; // HH:mm format
        end: string;
      }[];
    };
  };
}

export const psychologists: Psychologist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    expertise: ['Anxiety', 'Depression'],
    avatar: '/avatars/psych-1.jpg',
    yearsOfExperience: 8,
    education: 'Ph.D. in Clinical Psychology, Stanford University',
    shortBio: 'Specializes in anxiety disorders and depression with a focus on cognitive behavioral therapy.',
    languages: ['English', 'Mandarin'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    title: 'Trauma Specialist',
    expertise: ['Trauma', 'Anxiety'],
    avatar: '/avatars/psych-2.jpg',
    yearsOfExperience: 12,
    education: 'Psy.D. in Clinical Psychology, Columbia University',
    shortBio: 'Expert in trauma recovery and PTSD treatment using evidence-based approaches.',
    languages: ['English', 'Spanish'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '3',
    name: 'Dr. Emily Thompson',
    title: 'Relationship Counselor',
    expertise: ['Relationship', 'Mood Disorders'],
    avatar: '/avatars/psych-3.jpg',
    yearsOfExperience: 10,
    education: 'Ph.D. in Counseling Psychology, UCLA',
    shortBio: 'Specializes in couples therapy and relationship dynamics.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Stress Management Specialist',
    expertise: ['Stress', 'Anxiety'],
    avatar: '/avatars/psych-4.jpg',
    yearsOfExperience: 15,
    education: 'Ph.D. in Psychology, Harvard University',
    shortBio: 'Helps clients develop effective stress management techniques and coping strategies.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    title: 'Mood Disorders Specialist',
    expertise: ['Mood Disorders', 'Depression'],
    avatar: '/avatars/psych-5.jpg',
    yearsOfExperience: 9,
    education: 'Ph.D. in Clinical Psychology, University of Michigan',
    shortBio: 'Expert in treating bipolar disorder and major depressive disorder.',
    languages: ['English', 'Hindi'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '6',
    name: 'Dr. David Kim',
    title: 'Trauma Therapist',
    expertise: ['Trauma', 'Stress'],
    avatar: '/avatars/psych-6.jpg',
    yearsOfExperience: 11,
    education: 'Psy.D. in Clinical Psychology, NYU',
    shortBio: 'Specializes in trauma-informed therapy and stress management.',
    languages: ['English', 'Korean'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '7',
    name: 'Dr. Sofia Martinez',
    title: 'Anxiety Specialist',
    expertise: ['Anxiety', 'Relationship'],
    avatar: '/avatars/psych-7.jpg',
    yearsOfExperience: 7,
    education: 'Ph.D. in Psychology, UC Berkeley',
    shortBio: 'Focuses on anxiety disorders and relationship counseling.',
    languages: ['English', 'Spanish'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '8',
    name: 'Dr. William Parker',
    title: 'Depression Counselor',
    expertise: ['Depression', 'Mood Disorders'],
    avatar: '/avatars/psych-8.jpg',
    yearsOfExperience: 13,
    education: 'Ph.D. in Clinical Psychology, Yale University',
    shortBio: 'Specializes in treatment-resistant depression and mood disorders.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '9',
    name: 'Dr. Nina Ivanova',
    title: 'Relationship Therapist',
    expertise: ['Relationship', 'Stress'],
    avatar: '/avatars/psych-9.jpg',
    yearsOfExperience: 14,
    education: 'Ph.D. in Counseling Psychology, University of Washington',
    shortBio: 'Expert in couples therapy and family dynamics.',
    languages: ['English', 'Russian'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '10',
    name: 'Dr. Thomas Anderson',
    title: 'Trauma and PTSD Specialist',
    expertise: ['Trauma', 'Anxiety'],
    avatar: '/avatars/psych-10.jpg',
    yearsOfExperience: 16,
    education: 'Psy.D. in Clinical Psychology, Boston University',
    shortBio: 'Specializes in complex trauma and anxiety disorders.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '11',
    name: 'Dr. Lisa Wong',
    title: 'Mood and Anxiety Specialist',
    expertise: ['Mood Disorders', 'Anxiety'],
    avatar: '/avatars/psych-11.jpg',
    yearsOfExperience: 9,
    education: 'Ph.D. in Clinical Psychology, University of Toronto',
    shortBio: 'Focuses on mood disorders and anxiety management.',
    languages: ['English', 'Cantonese'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '12',
    name: 'Dr. Robert Schmidt',
    title: 'Stress and Depression Counselor',
    expertise: ['Stress', 'Depression'],
    avatar: '/avatars/psych-12.jpg',
    yearsOfExperience: 11,
    education: 'Ph.D. in Psychology, University of Chicago',
    shortBio: 'Specializes in work-related stress and depression.',
    languages: ['English', 'German'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '13',
    name: 'Dr. Maya Sharma',
    title: 'Relationship and Family Therapist',
    expertise: ['Relationship', 'Mood Disorders'],
    avatar: '/avatars/psych-13.jpg',
    yearsOfExperience: 12,
    education: 'Ph.D. in Family Therapy, Northwestern University',
    shortBio: 'Expert in family dynamics and relationship counseling.',
    languages: ['English', 'Hindi'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '14',
    name: 'Dr. Kevin O\'Brien',
    title: 'Anxiety and Trauma Specialist',
    expertise: ['Anxiety', 'Trauma'],
    avatar: '/avatars/psych-14.jpg',
    yearsOfExperience: 10,
    education: 'Psy.D. in Clinical Psychology, Fordham University',
    shortBio: 'Specializes in anxiety disorders and trauma recovery.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '15',
    name: 'Dr. Rachel Goldman',
    title: 'Depression and Mood Specialist',
    expertise: ['Depression', 'Mood Disorders'],
    avatar: '/avatars/psych-15.jpg',
    yearsOfExperience: 8,
    education: 'Ph.D. in Clinical Psychology, University of Pennsylvania',
    shortBio: 'Focuses on depression and mood regulation.',
    languages: ['English'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  },
  {
    id: '16',
    name: 'Dr. Carlos Mendoza',
    title: 'Stress and Relationship Counselor',
    expertise: ['Stress', 'Relationship'],
    avatar: '/avatars/psych-16.jpg',
    yearsOfExperience: 13,
    education: 'Ph.D. in Counseling Psychology, University of Texas',
    shortBio: 'Expert in stress management and relationship dynamics.',
    languages: ['English', 'Spanish'],
    detailedBio: '',
    certifications: [],
    specializations: [],
    approaches: [],
    publications: [],
    awards: [],
    consultationFee: {
      amount: 0,
      currency: '',
      duration: 0
    },
    availability: {}
  }
];
