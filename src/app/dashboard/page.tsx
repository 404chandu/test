'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import LecturerDashboard from '@/components/dashboard/lecturer-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (!role) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No role specified. Please log in again.</p>
      </div>
    );
  }

  return (
    <DashboardLayout role={role}>
      {role === 'student' ? <StudentDashboard /> : <LecturerDashboard />}
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-background">
      <div className="hidden md:block w-72 bg-gray-100 p-4">
        <Skeleton className="h-10 w-32 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between h-20 border-b p-4">
          <Skeleton className="h-8 w-8 md:hidden" />
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>
        <main className="flex-1 p-6">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
