"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Surah } from "@/types/quran";

export function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [activeSurah, setActiveSurah] = useQueryState("surah", {
    defaultValue: "1",
    parse: (value) => value,
  });

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch(
          "https://quran-api.santrikoding.com/api/surah",
        );
        const data = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-10rem)] rounded-md border bg-card">
      <div className="space-y-4 p-4">
        <h2 className="mb-6 text-center font-amiri-quran text-2xl">
          القرآن الكريم
        </h2>
        {surahs.map((surah) => (
          <Button
            key={surah.nomor}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal",
              activeSurah === surah.nomor.toString() && "bg-muted",
            )}
            onClick={() => setActiveSurah(surah.nomor.toString())}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                {surah.nomor}
              </div>
              <div>
                <div className="font-semibold">{surah.nama_latin}</div>
                <div className="text-sm text-muted-foreground">
                  {surah.arti} • {surah.jumlah_ayat} Ayat
                </div>
              </div>
              <div className="ml-auto font-amiri-quran text-lg">
                {surah.nama}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
