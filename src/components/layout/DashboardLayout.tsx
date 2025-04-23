import React, { ReactNode, memo } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

// Using memo to prevent unnecessary re-renders of the layout
const DashboardLayout = memo<DashboardLayoutProps>(({ children }) => {
  const { isLoading } = useAuth();

  // For better performance, we'll skip the loading state in local development
  // In a real app with actual authentication, we would keep this

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
});

// Add display name for debugging
DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
