import type { Metadata } from 'next';
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from 'react';
import { FilterProvider } from "@/context/filter-context"
import { FilterDialog } from '@/components/filter-dialog'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'BookFindr',
  description: 'A modern Google Books client built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <FilterProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-grow container mx-auto p-4 pt-8">
              {children}
            </main>
            <FilterDialog />
            <Footer />
          </ThemeProvider>
        </FilterProvider>
      </body>
    </html>
  )
}
