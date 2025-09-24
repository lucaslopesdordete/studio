'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { projects } from '@/lib/data';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUser } from '@/firebase';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      redirect('/login');
    }
  }, [user, isUserLoading]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-card md:block">
        <AppSidebar projects={projects} />
      </div>
      <div className="flex flex-col">
        <AppHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[280px] bg-card">
          <AppSidebar projects={projects} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
