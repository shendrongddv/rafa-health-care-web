"use client";

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ThemeProvider } from "./theme-provider";
import QueryProvider from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NuqsAdapter>          
        {children}
        </NuqsAdapter>
      </ThemeProvider>
    </QueryProvider>
  );
}
