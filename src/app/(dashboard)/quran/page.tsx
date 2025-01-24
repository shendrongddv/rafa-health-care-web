import { Suspense } from "react";
import { SurahList } from "./_components/surah-list";
import { SurahDetail } from "./_components/surah-detail";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuranPage() {
  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Surah List */}
        <div className="md:col-span-1">
          <Suspense fallback={<Skeleton className="h-[calc(100vh-10rem)]" />}>
            <SurahList />
          </Suspense>
        </div>

        {/* Surah Detail */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="rounded-md border bg-card">
            <Suspense fallback={<Skeleton className="h-[calc(100vh-10rem)]" />}>
              <SurahDetail />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
