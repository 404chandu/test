
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import StudentContests from '@/components/contests/student-contests';
import LecturerContests from '@/components/contests/lecturer-contests';
import { Skeleton } from '@/components/ui/skeleton';

function ContestsContent() {
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
      {role === 'student' ? <StudentContests /> : <LecturerContests />}
    </DashboardLayout>
  );
}

export default function ContestsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ContestsContent />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
