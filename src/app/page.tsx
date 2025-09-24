'use client';
import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        redirect('/dashboard');
      } else {
        redirect('/login');
      }
    }
  }, [user, isUserLoading]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* Você pode adicionar um spinner de carregamento aqui */}
      <p>Carregando...</p>
    </div>
  );
}
