"use client";

import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface HeaderTemplateProps {
  children: React.ReactNode;
  onOpenHelp?: () => void;
  chipText?: string;
}

export default function HeaderTemplate({ children, onOpenHelp, chipText }: HeaderTemplateProps) {
  // Sidebar state.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col">
      <Header onOpenHelp={onOpenHelp} onOpenMenu={toggleSidebar} chipText={chipText} />
      <div className="flex-1 overflow-auto">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {children}
      </div>
    </div>
  );
}
