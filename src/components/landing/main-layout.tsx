"use client";

import { useState, type ReactNode, createContext } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import LoginModal from './login-modal';

export const ModalContext = createContext({
  openModal: () => {},
});

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const openModal = () => setModalOpen(true);

  return (
    <ModalContext.Provider value={{ openModal }}>
      <div className="min-h-screen bg-background">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        {children}
        <LoginModal isOpen={isModalOpen} setIsOpen={setModalOpen} />
      </div>
    </ModalContext.Provider>
  );
}
