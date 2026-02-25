'use client';

import { Suspense } from 'react';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';

interface StudioLayoutProps {
  children: React.ReactNode;
}

export function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="studio-main flex-1 overflow-auto bg-[#f5f5f5] py-6 px-[1.2rem]">
          <Suspense
            fallback={
              <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="loading-spinner" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
