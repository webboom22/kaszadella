'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import AgeVerification from '@/components/AgeVerification';
import { Toaster } from '@/components/ui/toaster';

export default function RootShell({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AgeVerification />
      {children}
      <Toaster />
    </SessionProvider>
  );
}
