import React from "react";
import type { TOCItem } from "../context/TOCContext";
import { staticTOC } from "../data/staticTOC";
import { Sidebar } from "./Sidebar";
import { RightTableOfContents } from "./TableOfContents";
import { Topbar } from "./Topbar";

interface DocsLayoutProps {
  activePage: string;
  onPageChange: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  tocItems: TOCItem[] | null;
  children: React.ReactNode;
}

export function DocsLayout({
  activePage,
  onPageChange,
  isSidebarOpen,
  setIsSidebarOpen,
  tocItems,
  children,
}: DocsLayoutProps) {
  const displayTOC = tocItems !== null ? tocItems : staticTOC[activePage] || [];

  return (
    <div className="flex flex-col min-h-screen bg-aer-background font-sans text-aer-foreground selection:bg-aer-primary/10 selection:text-aer-primary">
      <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Main Sidebar */}
        <Sidebar
          activePage={activePage}
          onPageChange={(page) => {
            onPageChange(page);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Layout */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ms-64">
          <main className="flex-1 flex gap-8 px-4 py-8 md:px-12 md:py-16">
            <div className="flex-1 max-w-5xl mx-auto w-full">{children}</div>

            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-20">
                <RightTableOfContents items={displayTOC} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
