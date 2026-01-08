import { AerConfigProvider } from "@/components/AerConfigProvider";
import { ShortcutProvider } from "@/components/Shortcut";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DocsLayout } from "@/docs/components/DocsLayout";
import { PageRenderer } from "@/docs/components/PageRenderer";
import { TOCProvider, useTOC } from "@/docs/context/TOCContext";
import { useHashRouter } from "@/docs/hooks/useHashRouter";
import { useState } from "react";

function InnerApp() {
  const { activePage, setActivePage } = useHashRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tocItems } = useTOC();

  return (
    <AerConfigProvider>
      <ThemeProvider defaultTheme="dark" storageKey="aer-theme">
        <ShortcutProvider>
          {activePage === "home" ? (
            <PageRenderer
              activePage={activePage}
              onGetStarted={() => setActivePage("getting-started")}
            />
          ) : (
            <DocsLayout
              activePage={activePage}
              onPageChange={setActivePage}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              tocItems={tocItems}
            >
              <PageRenderer activePage={activePage} />
            </DocsLayout>
          )}
        </ShortcutProvider>
      </ThemeProvider>
    </AerConfigProvider>
  );
}

function App() {
  return (
    <TOCProvider>
      <InnerApp />
    </TOCProvider>
  );
}

export default App;
