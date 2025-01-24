export interface AudioItem {
  id: number;
  title: string;
  videoId: string;
  category: "study" | "meditation" | "sleep" | "motivation";
}

function extractVideoId(url: string): string {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (!videoId) throw new Error("No video ID found");
    return videoId;
  } catch (e) {
    console.error("Error extracting video ID:", e);
    return "";
  }
}

export const categories = {
  study: {
    label: "Study",
    icon: "BookOpen",
  },
  meditation: {
    label: "Meditation",
    icon: "Sparkles",
  },
  sleep: {
    label: "Sleep",
    icon: "Moon",
  },
  motivation: {
    label: "Motivation",
    icon: "Heart",
  },
} as const;

export const audioData: AudioItem[] = [
  {
    id: 1,
    title: "When everything doesn't work",
    videoId: extractVideoId("https://www.youtube.com/watch?v=FjHGZj2IjBk"),
    category: "motivation",
  },
  {
    id: 2,
    title: "It's okay to not be okay sometimes❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=3VUX0jTLLQs"),
    category: "motivation",
  },
  {
    id: 3,
    title: "Share this heart-warming message❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=oMQfXwSbTOo"),
    category: "motivation",
  },
  {
    id: 4,
    title: "The problems you're facing won't last forever❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=GCsoOKNECR4"),
    category: "motivation",
  },
  {
    id: 5,
    title: "You are not alone in this world❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=PjtBAUUW3-U"),
    category: "motivation",
  },
  {
    id: 6,
    title: "Just focus on today, have a nice day❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=t2bulio90R0"),
    category: "motivation",
  },
  {
    id: 7,
    title: "You are beautiful!! I believe in you❤️",
    videoId: extractVideoId("https://youtube.com/watch?v=m9_XzQqnu9I"),
    category: "motivation",
  },
  {
    id: 8,
    title: "Love yourself, you are amazing",
    videoId: extractVideoId("https://youtube.com/watch?v=TEPBjvNi_YU"),
    category: "motivation",
  },
  {
    id: 9,
    title: "Just remember. You are not alone",
    videoId: extractVideoId("https://youtube.com/watch?v=XpVD8CyA-CA"),
    category: "motivation",
  },
  {
    id: 10,
    title: "May peace and calmness fill your life",
    videoId: extractVideoId("https://youtube.com/watch?v=MUkncJy2IRQ"),
    category: "meditation",
  },
  {
    id: 11,
    title: "♪ Rest Here, You are Doing Good. [Cozy Relaxing Guitar Music ♡]",
    videoId: extractVideoId("https://youtube.com/watch?v=UVpWXv10KBY"),
    category: "study",
  },
  {
    id: 12,
    title: "♪ Good Night Song [ Soothing Relaxation Study Sleep BGM ]",
    videoId: extractVideoId("https://youtube.com/watch?v=uxyckp0-YW4"),
    category: "sleep",
  },
  {
    id: 13,
    title: "♪ Study Night 2 [ Soothing Relaxation Study Sleep BGM ]",
    videoId: extractVideoId("https://youtube.com/watch?v=yiRyARPDSPA"),
    category: "study",
  },
  {
    id: 14,
    title: "Relaxing vibe BGMs [ MONOMAN's Winter Selection ]",
    videoId: extractVideoId("https://youtube.com/watch?v=UI7B-5TltMU"),
    category: "study",
  },
  {
    id: 15,
    title: "♪ Winter Song [ Soothing Relaxation Study Sleep BGM ]",
    videoId: extractVideoId("https://youtube.com/watch?v=c-WUDqdPchg"),
    category: "sleep",
  },
] as const;
