'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: ReactNode }) {
  // Simplified provider without AWS configuration
  return <AuthProvider>{children}</AuthProvider>;
}
