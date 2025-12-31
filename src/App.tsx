import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { DirectionProvider } from "./components/DirectionProvider";
import { Sidebar } from "./docs/components/Sidebar";
import { RightTableOfContents } from "./docs/components/TableOfContents";
import { Topbar } from "./docs/components/Topbar";
import { ButtonDoc } from "./docs/pages/ButtonDoc";
import { CheckboxDoc } from "./docs/pages/CheckboxDoc";
import { DirectionProviderDoc } from "./docs/pages/DirectionProviderDoc";
import { GetStartedDoc } from "./docs/pages/GetStarted";
import { InputDoc } from "./docs/pages/InputDoc";
import { NavbarDoc } from "./docs/pages/NavbarDoc";
import { OtpDoc } from "./docs/pages/OtpDoc";
import { RadioDoc } from "./docs/pages/RadioDoc";
import { SidebarDoc } from "./docs/pages/SidebarDoc";
import { TextareaDoc } from "./docs/pages/TextareaDoc";

function App() {
  // Initialize state from URL hash
  const getInitialPage = () => {
    const hash = window.location.hash.replace("#/", "");
    return hash || "getting-started";
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync URL hash with activePage and handle scroll-to-top
  useEffect(() => {
    const hash = `#/${activePage}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
    window.scrollTo(0, 0);
  }, [activePage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "");
      setActivePage(hash || "getting-started");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Define TOC items for each page
  const pageTOC: Record<string, { id: string; title: string }[]> = {
    "getting-started": [
      { id: "installation", title: "Installation" },
      { id: "tailwind-setup", title: "Setup" },
      { id: "basic-usage", title: "Basic Usage" },
    ],
    button: [
      { id: "basic", title: "Basic" },
      { id: "aer", title: "Aer Variant" },
      { id: "states", title: "States" },
      { id: "sizes", title: "Sizes" },
    ],
    input: [
      { id: "basic", title: "Basic" },
      { id: "specialized", title: "Specialized" },
      { id: "masking", title: "Masking" },
      { id: "floating-label", title: "Floating Label" },
      { id: "variants", title: "Variants" },
      { id: "icons", title: "Icons & Prefixes" },
      { id: "addons", title: "Addons" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    textarea: [
      { id: "basic", title: "Basic" },
      { id: "floating-label", title: "Floating Label" },
      { id: "variants", title: "Variants" },
      { id: "sizes", title: "Sizes" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],

    checkbox: [
      { id: "basic", title: "Basic" },
      { id: "checkbox-group", title: "Checkbox Group" },
      { id: "states", title: "States" },
      { id: "cards", title: "Card Variant" },
      { id: "positioning", title: "Label Positioning" },
      { id: "alignment", title: "Vertical Alignment" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    radio: [
      { id: "basic", title: "Basic" },
      { id: "cards", title: "Card Selection" },
      { id: "layout", title: "Layout Variants" },
      { id: "alignment", title: "Vertical Alignment" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    "otp-input": [
      { id: "basic", title: "Basic" },
      { id: "length", title: "Custom Length" },
      { id: "alphanumeric", title: "Alphanumeric" },
      { id: "security", title: "Security" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    sidebar: [
      { id: "basic", title: "Basic" },
      { id: "floating", title: "Floating Island" },
    ],
    navbar: [
      { id: "basic", title: "Basic" },
      { id: "bottom-nav", title: "Bottom Navigation" },
    ],
    "direction-provider": [
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      { id: "features", title: "Features" },
    ],
  };

  const renderContent = () => {
    switch (activePage) {
      case "getting-started":
        return <GetStartedDoc />;
      case "button":
        return <ButtonDoc />;
      case "input":
        return <InputDoc />;
      case "textarea":
        return <TextareaDoc />;
      case "checkbox":
        return <CheckboxDoc />;
      case "radio":
        return <RadioDoc />;
      case "otp-input":
        return <OtpDoc />;
      case "sidebar":
        return <SidebarDoc />;
      case "navbar":
        return <NavbarDoc />;
      case "direction-provider":
        return <DirectionProviderDoc />;
      default:
        return <GetStartedDoc />;
    }
  };

  return (
    <DirectionProvider>
      <ThemeProvider defaultTheme="dark" storageKey="aer-theme">
        <div className="flex flex-col min-h-screen bg-aer-background font-sans text-aer-foreground selection:bg-aer-primary/10 selection:text-aer-primary">
          <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

          <div className="flex flex-1 relative">
            {/* Main Sidebar */}
            <Sidebar
              activePage={activePage}
              onPageChange={(page) => {
                setActivePage(page);
                setIsSidebarOpen(false);
              }}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Layout */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ms-64">
              <main className="flex-1 flex gap-8 px-4 py-8 md:px-12 md:py-16">
                <div className="flex-1 max-w-5xl mx-auto w-full">
                  {renderContent()}
                </div>

                <div className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-20">
                    <RightTableOfContents items={pageTOC[activePage] || []} />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </DirectionProvider>
  );
}

export default App;
