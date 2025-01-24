"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import type { SurahDetail, Surah } from "@/types/quran";

// Function to parse HTML and apply styles
function renderArabicText(text: string) {
  return text
    .split(/(<[^>]+>|[^<]+)/)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("<strong>")) {
        return <strong key={index}>{part.replace(/<\/?strong>/g, "")}</strong>;
      }
      if (part.startsWith("<u>")) {
        return <u key={index}>{part.replace(/<\/?u>/g, "")}</u>;
      }
      if (part.startsWith("<i>")) {
        return <i key={index}>{part.replace(/<\/?i>/g, "")}</i>;
      }
      return part;
    });
}

export function SurahDetail() {
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSurah] = useQueryState("surah", {
    defaultValue: "1",
    parse: (value) => value,
  });

  useEffect(() => {
    const fetchSurahDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/quran/surah/${activeSurah}`);
        const data = await response.json();
        setSurah(data);
      } catch (error) {
        console.error("Error fetching surah detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahDetail();
  }, [activeSurah]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-3/4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!surah) return null;

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="space-y-6 p-6">
        {/* Surah Header */}
        <div className="space-y-4 border-b pb-6 text-center">
          <h1 className="font-amiri-quran text-4xl">{surah.nama}</h1>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{surah.nama_latin}</h2>
            <p className="text-muted-foreground">
              {surah.arti} • {surah.jumlah_ayat} Ayat • {surah.tempat_turun}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Play Audio
          </Button>
          <div
            className="prose prose-sm mt-4 max-w-none text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
          />
        </div>

        {/* Ayat List */}
        <div className="space-y-8">
          {surah.ayat.map((ayah) => (
            <div key={ayah.nomor} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                  {ayah.nomor}
                </div>
              </div>
              <div className="text-right">
                <p className="font-amiri-quran text-3xl leading-loose">
                  {ayah.ar}
                </p>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-arabic-transliteration text-sm">
                  {renderArabicText(ayah.tr)}
                </p>
                <p>{ayah.idn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-6">
          {surah && surah.surat_sebelumnya !== false && (
            <Button
              variant="ghost"
              onClick={() => {
                const prevSurah = surah.surat_sebelumnya as Surah;
                window.history.pushState(
                  {},
                  "",
                  `?surah=${prevSurah.nomor}`,
                );
              }}
            >
              ← {(surah.surat_sebelumnya as Surah).nama_latin}
            </Button>
          )}
          {surah && surah.surat_selanjutnya !== false && (
            <Button
              variant="ghost"
              className="ml-auto"
              onClick={() => {
                const nextSurah = surah.surat_selanjutnya as Surah;
                window.history.pushState(
                  {},
                  "",
                  `?surah=${nextSurah.nomor}`,
                );
              }}
            >
              {(surah.surat_selanjutnya as Surah).nama_latin} →
            </Button>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
