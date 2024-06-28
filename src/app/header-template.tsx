"use client";

import Header from "./header";

interface HeaderTemplateProps {
  children: React.ReactNode;
  onOpenHelp?: () => void;
}

export default function HeaderTemplate({ children, onOpenHelp }: HeaderTemplateProps) {
  return (
    <div className="h-full flex flex-col">
      <Header onOpenHelp={onOpenHelp} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
