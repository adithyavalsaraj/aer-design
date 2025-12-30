import { useState } from "react";
import { DirectionProvider } from "./components/DirectionProvider";
import { Sidebar } from "./docs/components/Sidebar";
import { RightTableOfContents } from "./docs/components/TableOfContents";
import { ThemeProvider } from "./docs/components/ThemeProvider";
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
  const [activePage, setActivePage] = useState("getting-started");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define TOC items for each page
  const pageTOC: Record<string, { id: string; title: string }[]> = {
    "getting-started": [
      { id: "installation", title: "Installation" },
      { id: "tailwind-setup", title: "Setup" },
      { id: "basic-usage", title: "Basic Usage" },
    ],
    button: [
      { id: "basic", title: "Basic Variants" },
      { id: "aer", title: "Aer Variant" },
      { id: "sizes", title: "Sizes" },
      { id: "states", title: "States" },
    ],
    input: [
      { id: "variants", title: "Variants" },
      { id: "floating-label", title: "Floating Label" },
      { id: "basic", title: "Basic" },
      { id: "icons", title: "Icons & Prefixes" },
      { id: "addons", title: "Addons" },
      { id: "masking", title: "Masking" },
      { id: "specialized", title: "Specialized" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    textarea: [
      { id: "variants", title: "Variants" },
      { id: "floating-label", title: "Floating Label" },
      { id: "basic", title: "Basic" },
      { id: "sizes", title: "Sizes" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],

    checkbox: [
      { id: "basic", title: "Basic" },
      { id: "basic", title: "Basic" },
      { id: "positioning", title: "Label Positioning" },
      { id: "alignment", title: "Vertical Alignment" },
      { id: "cards", title: "Card Variant" },
      { id: "states", title: "States" },
      { id: "validation", title: "Validation" },
      { id: "real-world-validation", title: "Real World" },
    ],
    radio: [
      { id: "basic", title: "Basic" },
      { id: "layout", title: "Layout Variants" },
      { id: "cards", title: "Card Selection" },
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
      { id: "universal", title: "Universal Navigation" },
      { id: "hoverable", title: "Rail / Hoverable" },
      { id: "floating", title: "Floating Island" },
      { id: "overlay", title: "Overlay Mode" },
    ],
    navbar: [
      { id: "top-nav", title: "Top Navigation" },
      { id: "bottom-nav", title: "Bottom Navigation" },
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
