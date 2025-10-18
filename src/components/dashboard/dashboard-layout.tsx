
"use client";

import { useState, type ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';

export default function DashboardLayout({ children, role }: { children: ReactNode; role: string; }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} role={role} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} role={role}/>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
