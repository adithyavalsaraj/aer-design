import { Checkbox } from "@/components/Checkbox";
import type { SidebarProps } from "@/components/Sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNestedItem,
  SidebarSection,
  useSidebar,
} from "@/components/Sidebar";
import {
  Bell,
  Home,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

function PlaygroundBrand() {
  const { collapsed } = useSidebar();
  return (
    <>
      <div className="size-8 shrink-0 rounded-lg bg-aer-primary flex items-center justify-center text-aer-primary-foreground font-bold">
        A
      </div>
      {!collapsed && (
        <span className="font-bold animate-in fade-in duration-300">
          Aer Design
        </span>
      )}
    </>
  );
}

function SidebarPlayground() {
  const [config, setConfig] = React.useState({
    position: "left" as SidebarProps["position"],
    mode: "fixed" as SidebarProps["mode"],
    collapsed: false,
    hoverable: false,
    overlay: false,
    backdrop: true,
    autoOverlay: true, // Default mobile behavior
  });

  const [isOpen, setIsOpen] = React.useState(true);

  const set = (key: keyof typeof config, value: any) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value };
      // If user changed collapsed manually, update autoOverlay preference default
      if (key === "collapsed") {
        // If collapsed (icon only), don't auto-overlay. If expanded, do.
        next.autoOverlay = !value;
      }
      return next;
    });
  };

  React.useEffect(() => {
    // Auto-open if overlay mode is disabled to avoid confusion
    if (!config.overlay && !isOpen) {
      setIsOpen(true);
    }
  }, [config.overlay, isOpen]);

  // Responsive Mobile Logic
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Compute effective configuration based on mobile state
  // Only auto-switch to overlay if enabled
  const activeMode = isMobile && config.autoOverlay ? "overlay" : config.mode;
  const activeBackdrop =
    isMobile && config.autoOverlay ? true : config.backdrop;

  const [activeItem, setActiveItem] = React.useState("dashboard");
  // Derive collapsed state from mode/prop
  const isEffectiveCollapsed = config.collapsed || config.mode === "icon";

  // Determine layout mode: "Document" (scrolling page) vs "App Shell" (fixed viewport)
  const isDocumentLayout =
    config.mode === "sticky" || config.mode === "absolute";

  // Calculate content spacing based on sidebar config
  const contentStyle = React.useMemo(() => {
    // 1. App Shell Layout (Fixed/Overlay)
    if (!isDocumentLayout) {
      if (activeMode === "overlay" || activeMode === "absolute" || !isOpen)
        return {};

      const isVertical =
        config.position === "left" || config.position === "right";
      const floatingMargin = config.mode === "floating" ? 32 : 0;

      let baseSize = 0;
      if (isVertical) {
        baseSize = isEffectiveCollapsed ? 72 : 256;
      } else {
        baseSize = 64;
      }
      const size = `${baseSize + floatingMargin}px`;

      switch (config.position) {
        case "left":
          return { paddingLeft: size };
        case "right":
          return { paddingRight: size };
        case "top":
          return { paddingTop: size };
        case "bottom":
          return { paddingBottom: size };
        default:
          return {};
      }
    }

    // 2. Document Layout (Sticky/Absolute)
    if (config.mode === "absolute") {
      const isVertical =
        config.position === "left" || config.position === "right";
      // Top/Bottom are usually fixed height (e.g. 4rem/64px)
      const size = isVertical
        ? isEffectiveCollapsed
          ? "4.5rem"
          : "16rem"
        : "4rem";
      switch (config.position) {
        case "left":
          return { paddingLeft: size };
        case "right":
          return { paddingRight: size };
        case "top":
          return { paddingTop: size };
        case "bottom":
          return { paddingBottom: size };
        default:
          return {};
      }
    }
    return {};
  }, [
    config.position,
    config.mode,
    config.collapsed,
    isOpen,
    activeMode,
    isEffectiveCollapsed,
    isDocumentLayout,
  ]);

  const DemoContent = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {isMobile && config.autoOverlay && (
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-aer-muted/20"
          >
            <Menu className="size-6 text-aer-foreground" />
          </button>
          <span className="font-bold text-lg">Aer App</span>
        </div>
      )}

      <div className="h-32 rounded-xl bg-linear-to-br from-aer-muted to-transparent border border-aer-border/50 p-6 flex items-center justify-center text-aer-muted-foreground">
        {isDocumentLayout ? "Document Content" : "App Shell Content"}
      </div>
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          {isDocumentLayout
            ? "Scroll down to see behavior. Sticky sticks to viewport; Absolute scrolls away."
            : isMobile && config.autoOverlay
            ? "Mobile overlay mode maximized space."
            : "Fixed sidebar stays in place while content scrolls."}
        </p>
        <div className="h-4 w-3/4 bg-aer-muted/20 rounded" />
        <div className="h-4 w-1/2 bg-aer-muted/20 rounded" />
        <div className="h-4 w-5/6 bg-aer-muted/20 rounded" />
        <div className="space-y-4 pt-12 opacity-50">
          <p className="text-xs uppercase font-bold text-aer-muted-foreground">
            Long Content
          </p>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="h-8 w-full bg-aer-muted/10 rounded" />
          ))}
        </div>
      </div>
      {(config.overlay || (isMobile && config.autoOverlay)) &&
        !isOpen &&
        !isMobile && (
          <div className="flex justify-center py-12">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-aer-foreground font-bold hover:underline"
            >
              <Menu className="size-4" /> Open Menu
            </button>
          </div>
        )}
    </div>
  );

  const renderSidebar = () => (
    <Sidebar
      position={config.position}
      mode={activeMode}
      collapsed={config.collapsed}
      hoverable={config.hoverable}
      overlay={activeMode === "overlay"}
      backdrop={activeBackdrop}
      isOpen={activeMode === "overlay" ? isOpen : true}
      onOpenChange={setIsOpen}
      onBackdropClick={() => setIsOpen(false)}
      className="border-aer-border"
    >
      <SidebarHeader>
        <PlaygroundBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection title="Platform">
          <SidebarItem
            icon={<Home />}
            active={activeItem === "dashboard"}
            onClick={() => setActiveItem("dashboard")}
          >
            Dashboard
          </SidebarItem>
          <SidebarNestedItem
            icon={<Users />}
            label="Team"
            defaultExpanded={true}
          >
            <SidebarItem
              icon={<User />}
              active={activeItem === "members"}
              onClick={() => setActiveItem("members")}
            >
              Members
            </SidebarItem>
            <SidebarItem
              icon={<Settings />}
              active={activeItem === "roles"}
              onClick={() => setActiveItem("roles")}
            >
              Roles
            </SidebarItem>
            <SidebarItem
              icon={<Bell />}
              active={activeItem === "invites"}
              onClick={() => setActiveItem("invites")}
            >
              Invites
            </SidebarItem>
          </SidebarNestedItem>
          <SidebarNestedItem icon={<MessageSquare />} label="Messages">
            <SidebarItem
              icon={<Bell />}
              active={activeItem === "inbox"}
              onClick={() => setActiveItem("inbox")}
            >
              Inbox
            </SidebarItem>
            <SidebarItem
              icon={<User />}
              active={activeItem === "sent"}
              onClick={() => setActiveItem("sent")}
            >
              Sent
            </SidebarItem>
            {/* Multi-level nesting example */}
            <SidebarNestedItem icon={<Settings />} label="Archives">
              <SidebarItem
                active={activeItem === "archive-2024"}
                onClick={() => setActiveItem("archive-2024")}
              >
                2024
              </SidebarItem>
              <SidebarItem
                active={activeItem === "archive-2023"}
                onClick={() => setActiveItem("archive-2023")}
              >
                2023
              </SidebarItem>
            </SidebarNestedItem>
          </SidebarNestedItem>
        </SidebarSection>
        <SidebarSection title="Tools">
          <SidebarItem
            icon={<Search />}
            active={activeItem === "search"}
            onClick={() => setActiveItem("search")}
          >
            Search
          </SidebarItem>
          <SidebarItem
            icon={<Bell />}
            active={activeItem === "notifications"}
            onClick={() => setActiveItem("notifications")}
          >
            Notifications
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem
          icon={<Settings />}
          active={activeItem === "settings"}
          onClick={() => setActiveItem("settings")}
        >
          Settings
        </SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border rounded-aer-xl bg-aer-muted/5">
        <div className="space-y-3">
          <label className="text-sm font-semibold">Position</label>
          <div className="flex flex-wrap gap-2">
            {(["left", "right", "top", "bottom"] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => set("position", pos)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                  config.position === pos
                    ? "bg-aer-foreground text-aer-background border-aer-foreground"
                    : "bg-aer-background hover:bg-aer-muted"
                }`}
              >
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Mode</label>
            <span className="text-[10px] text-aer-muted-foreground bg-aer-muted/10 px-1.5 py-0.5 rounded">
              {isMobile
                ? "Mobile (Auto Overlay)"
                : config.mode === "sticky"
                ? "Sticks during scroll"
                : config.mode === "absolute"
                ? "Within container"
                : "CSS Position"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "fixed",
                "sticky",
                "absolute",
                "floating",
                "overlay",
                "icon",
              ] as const
            ).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  set("mode", mode);
                  // Auto-enable overlay prop if mode is overlay
                  if (mode === "overlay") set("overlay", true);
                  else set("overlay", false);
                }}
                disabled={isMobile && config.autoOverlay} // Only disable if auto-overlay is taking over
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                  config.mode === mode && (!isMobile || !config.autoOverlay)
                    ? "bg-aer-foreground text-aer-background border-aer-foreground"
                    : isMobile && config.autoOverlay
                    ? "opacity-50 cursor-not-allowed bg-aer-background"
                    : "bg-aer-background hover:bg-aer-muted"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold">Features</label>
          <div className="space-y-2">
            {/* Aliases for Icon Only */}
            <Checkbox
              label="Collapsed (Prop)"
              checked={config.collapsed}
              onChange={(e) => set("collapsed", e.target.checked)}
              disabled={config.mode === "icon"} // Redundant if mode is icon
              description="Manually collapse sidebar"
            />
            <Checkbox
              label="Hoverable (Rail)"
              checked={config.hoverable}
              onChange={(e) => set("hoverable", e.target.checked)}
              disabled={!isEffectiveCollapsed}
              labelClassName={
                !isEffectiveCollapsed ? "text-aer-muted-foreground" : ""
              }
            />
            <Checkbox
              label="Auto-Overlay (Mobile)"
              checked={config.autoOverlay}
              onChange={(e) => set("autoOverlay", e.target.checked)}
              // Can pre-configure? Yes. But maybe clearer if always enabled or only effective on mobile. Let's leave enabled.
              // Actually user wants to customize it.
              description="Switch to overlay on small screens?"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold">Overlay Options</label>
          <div className="space-y-2">
            <Checkbox
              label="Backdrop"
              checked={activeBackdrop}
              onChange={(e) => set("backdrop", e.target.checked)}
              disabled={
                (!config.overlay && !isMobile) ||
                (isMobile && config.autoOverlay)
              } // Disable if auto-managed
              labelClassName={
                !config.overlay && !isMobile ? "text-aer-muted-foreground" : ""
              }
            />
            {(config.overlay || (isMobile && config.autoOverlay)) && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full mt-2 px-3 py-1.5 bg-aer-primary text-aer-primary-foreground text-xs font-bold rounded-md"
              >
                {isOpen ? "Close Sidebar" : "Open Sidebar"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Area - Uses transform to trap fixed elements */}
      <div className="border rounded-aer-xl overflow-hidden bg-aer-background relative h-[500px] w-full transform scale-[1] isolate shadow-inner flex flex-col">
        {/* Header to explain the current layout simulation */}
        {isDocumentLayout && (
          <div className="bg-aer-muted/30 text-[10px] text-center p-2 text-aer-muted-foreground border-b font-medium">
            Page Scroll Simulation (Container scrolls)
          </div>
        )}

        <div
          className={`flex-1 relative w-full ${
            isDocumentLayout ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          {isDocumentLayout ? (
            // --- DOCUMENT LAYOUT (Sticky/Absolute) ---
            <div className="min-h-[200%] flex flex-col bg-aer-muted/5 relative">
              {/* Fake Header for Sticky Demo */}
              <div className="h-32 bg-aer-muted/10 border-b flex items-center justify-center shrink-0">
                <span className="text-aer-muted-foreground font-medium">
                  Header (Scroll past to test Sticky)
                </span>
              </div>

              <div
                className={`flex flex-1 relative ${
                  {
                    left: "flex-row",
                    right: "flex-row-reverse",
                    top: "flex-col",
                    bottom: "flex-col-reverse",
                  }[config.position as "left" | "right" | "top" | "bottom"] ||
                  "flex-row"
                }`}
              >
                {/* Sidebar in flow */}
                {renderSidebar()}

                {/* Content */}
                <div className="flex-1 p-8" style={contentStyle}>
                  <DemoContent />
                </div>
              </div>
            </div>
          ) : (
            // --- APP SHELL LAYOUT (Fixed/Overlay) ---
            <>
              <div
                className="absolute inset-0 overflow-auto bg-aer-muted/5 transition-[padding] duration-300 ease-in-out"
                style={isMobile && config.autoOverlay ? {} : contentStyle}
              >
                <div className="p-8 h-[200%]">
                  <DemoContent />
                </div>
              </div>
              {renderSidebar()}
            </>
          )}
        </div>
      </div>

      {/* Generated Code */}
      <CodeBlock
        ts={`<Sidebar\n  position="${config.position}"\n  mode={${
          config.autoOverlay
        } && isMobile ? "overlay" : "${config.mode}"}\n  overlay={${
          config.autoOverlay
        } && isMobile}\n  isOpen={isMobile && ${
          config.autoOverlay
        } ? isOpen : true}\n  ${
          config.mode !== "icon" ? `collapsed={${config.collapsed}}\n` : ""
        }  onBackdropClick={() => setIsOpen(false)}\n>\n  <SidebarHeader>\n     <Logo />\n     {!collapsed && <Title />}\n  </SidebarHeader>\n  ...\n</Sidebar>`}
        fullCode={`import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem, SidebarSection, useSidebar } from "aer-design";\nimport { Home, User, Settings, Search, Menu } from "lucide-react";\nimport { useState, useEffect } from "react";\n\nfunction useMediaQuery(query: string) {\n  const [matches, setMatches] = useState(false);\n  useEffect(() => {\n    const media = window.matchMedia(query);\n    if (media.matches !== matches) setMatches(media.matches);\n    const listener = () => setMatches(media.matches);\n    media.addEventListener("change", listener);\n    return () => media.removeEventListener("change", listener);\n  }, [matches, query]);\n  return matches;\n}\n\n// Separate component to safely use the hook inside the provider\nfunction AppLogo() {\n    const { collapsed } = useSidebar();\n    return (\n        <div className="flex items-center gap-2 px-2 font-bold text-xl">\n          <div className="size-8 rounded bg-blue-600 text-white flex items-center justify-center">A</div>\n          {!collapsed && <span>Aer Design</span>}\n        </div>\n    )\n}\n\nexport default function ResponsiveApp() {\n  const [isOpen, setIsOpen] = useState(false);\n  // Optional: Manage collapsed state if not using 'icon' mode\n  const [collapsed, setCollapsed] = useState(${
          config.collapsed
        });\n  \n  const isMobile = useMediaQuery("(max-width: 768px)");\n  // Customizable Mobile Behavior: ${
          config.autoOverlay ? "Auto-Overlay" : "Keep Layout"
        }\n  const autoOverlay = ${
          config.autoOverlay
        };\n  const effectiveMode = (isMobile && autoOverlay) ? "overlay" : "${
          config.mode
        }";\n\n  return (\n    <div className="flex h-screen bg-gray-50">\n      <Sidebar\n        position="${
          config.position
        }"\n        mode={effectiveMode}\n        ${
          config.mode !== "icon"
            ? "collapsed={collapsed}"
            : "// collapsed implicit in icon mode"
        }\n        // Only force overlay props if we are in that effective mode\n        overlay={effectiveMode === "overlay"}\n        backdrop={effectiveMode === "overlay"}\n        isOpen={(isMobile && autoOverlay) ? isOpen : true} \n        onOpenChange={setIsOpen}\n        onBackdropClick={() => setIsOpen(false)}\n      >\n        <SidebarHeader>\n           <AppLogo />\n        </SidebarHeader>\n        <SidebarContent>\n          <SidebarSection title="Main">\n            <SidebarItem icon={<Home />} active>Home</SidebarItem>\n            <SidebarItem icon={<Search />}>Search</SidebarItem>\n          </SidebarSection>\n        </SidebarContent>\n        <SidebarFooter>\n           <SidebarItem icon={<Settings />}>Settings</SidebarItem>\n        </SidebarFooter>\n      </Sidebar>\n      \n      <main \n        className="flex-1 p-8 overflow-auto"\n        style={{\n          // padding logic: if mobile AND autoOverlay, 0. Else use sidebar width.\n          paddingLeft: (isMobile && autoOverlay) || "${
          config.position
        }" !== "left" ? undefined : (effectiveMode === 'icon' || collapsed ? '4.5rem' : '16rem'),\n        }}\n      >\n        {isMobile && autoOverlay && (\n          <button onClick={() => setIsOpen(true)} className="mb-6 p-2 -ml-2">\n             <Menu />\n          </button>\n        )}\n        <h1 className="text-2xl font-bold">Page Content</h1>\n        ${
          config.mode !== "icon"
            ? `<button onClick={() => setCollapsed(!collapsed)} className="mt-4 px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">\n           Toggle Collapsed\n        </button>`
            : ""
        }\n      </main>\n    </div>\n  );\n}`}
      />
    </div>
  );
}

export function SidebarDoc() {
  const [activeTab, setActiveTab] = React.useState("home");
  const [activeAerItem, setActiveAerItem] = React.useState("home");

  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="A robust, responsive navigation drawer with multiple layout modes."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Sidebar allows you to build complex application shells. It
            handles the heavy lifting of responsive behavior, offering modes
            like <strong>Fixed</strong> (always visible),{" "}
            <strong>Overlay</strong> (mobile drawers),
            <strong>Sticky</strong> (documentation style), and{" "}
            <strong>Floating</strong> (islands).
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>6 Layout Modes</strong> - Fixed, Sticky, Absolute,
              Floating, Overlay, Icon
            </li>
            <li>
              <strong>Responsive by Design</strong> - Built-in toggle states and
              mobile-first patterns
            </li>
            <li>
              <strong>Collapsible</strong> - "Icon Mode" support with
              auto-expanding rails
            </li>
            <li>
              <strong>Accessible</strong> - ARIA attributes, focus trapping (in
              overlay), and keyboard support
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Choose the right layout strategy for your app."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Application Shells
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="fixed"
              </code>{" "}
              for standard dashboards where navigation is always present.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Mobile Drawers
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="overlay"
              </code>{" "}
              for hidden menus triggered by a hamburger button.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Documentation
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="sticky"
              </code>{" "}
              for lists that should scroll with the page but stick to the
              viewport.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Modern / SaaS
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="floating"
              </code>{" "}
              for a distinct, island-style look.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Configure the sidebar behavior and copy the code."
      >
        <SidebarPlayground />
      </DocSection>

      <DocSection
        title="Nested Items"
        id="nested-items"
        description="Create multi-level navigation with collapsible sections."
      >
        <div className="space-y-4">
          <p className="text-sm text-aer-muted-foreground">
            Use <code>SidebarNestedItem</code> to create expandable/collapsible
            navigation groups. Perfect for organizing complex navigation
            hierarchies.
          </p>
          <div className="p-6 border rounded-lg bg-aer-muted/5 flex justify-center isolate">
            <Sidebar
              mode="absolute"
              position="left"
              className="h-[400px] relative"
            >
              <SidebarHeader>
                <div className="size-8 rounded-lg bg-aer-primary" />
                <span className="font-bold">Dashboard</span>
              </SidebarHeader>
              <SidebarContent>
                <SidebarSection title="Navigation">
                  <SidebarItem icon={<Home />}>Home</SidebarItem>
                  <SidebarNestedItem
                    icon={<Users />}
                    label="Team"
                    defaultExpanded={true}
                  >
                    <SidebarItem icon={<User />}>Members</SidebarItem>
                    <SidebarItem icon={<Settings />}>Roles</SidebarItem>
                    <SidebarItem icon={<Bell />}>Invites</SidebarItem>
                  </SidebarNestedItem>
                  <SidebarNestedItem icon={<MessageSquare />} label="Messages">
                    <SidebarItem icon={<Bell />}>Inbox</SidebarItem>
                    <SidebarItem icon={<User />}>Sent</SidebarItem>
                  </SidebarNestedItem>
                  <SidebarItem icon={<Settings />}>Settings</SidebarItem>
                </SidebarSection>
              </SidebarContent>
            </Sidebar>
          </div>
          <CodeBlock
            ts={`<SidebarNestedItem 
  icon={<Users />} 
  label="Team"
  defaultExpanded={true}
>
  <SidebarItem icon={<User />}>Members</SidebarItem>
  <SidebarItem icon={<Settings />}>Roles</SidebarItem>
</SidebarNestedItem>`}
            fullCode={`import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarSection, 
  SidebarItem,
  SidebarNestedItem 
} from "aer-design";
import { Home, Users, User, Settings, Bell, MessageSquare } from "lucide-react";

export default function NestedSidebarExample() {
  return (
    <Sidebar mode="fixed" position="left">
      <SidebarHeader>
        <div className="size-8 rounded-lg bg-aer-primary" />
        <span className="font-bold">Dashboard</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection title="Navigation">
          <SidebarItem icon={<Home />}>Home</SidebarItem>
          
          {/* Nested section with sub-items */}
          <SidebarNestedItem
            icon={<Users />}
            label="Team"
            defaultExpanded={true}
          >
            <SidebarItem icon={<User />}>Members</SidebarItem>
            <SidebarItem icon={<Settings />}>Roles</SidebarItem>
            <SidebarItem icon={<Bell />}>Invites</SidebarItem>
          </SidebarNestedItem>
          
          {/* Another nested section */}
          <SidebarNestedItem
            icon={<MessageSquare />}
            label="Messages"
          >
            <SidebarItem icon={<Bell />}>Inbox</SidebarItem>
            <SidebarItem icon={<User />}>Sent</SidebarItem>
          </SidebarNestedItem>
          
          <SidebarItem icon={<Settings />}>Settings</SidebarItem>
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  );
}`}
          />
          <div className="mt-4 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
            <p className="text-sm text-sky-700 dark:text-sky-400">
              <strong>Smart Adaptation:</strong> In <strong>collapsed</strong>{" "}
              (icon-only) mode or <strong>horizontal</strong> (top/bottom)
              positions, nested items automatically show as a floating panel
              when clicked. The panel positions itself intelligently based on
              the sidebar's location, ensuring nested navigation is always
              accessible.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Our signature glassmorphism effect for premium interfaces."
      >
        <div className="aer-vibrant-container">
          <div className="aer-vibrant-bg-wrapper">
            <div className="aer-vibrant-bg" />
            <div className="aer-vibrant-blob top-1/3 left-1/4 w-40 h-40 bg-sky-500/40" />
            <div className="aer-vibrant-blob bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/40" />
          </div>

          <div className="relative z-10 w-full h-[300px] border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-2xl flex">
            <Sidebar
              mode="sticky"
              position="left"
              className="h-full bg-transparent border-r border-white/10"
              variant="aer"
            >
              <SidebarHeader className="border-white/10">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-linear-to-tr from-sky-500 to-cyan-500" />
                  <span className="font-bold text-white">Aer</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarSection>
                  <SidebarItem
                    icon={<Home className="text-white" />}
                    active={activeAerItem === "home"}
                    onClick={() => setActiveAerItem("home")}
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    Home
                  </SidebarItem>
                  <SidebarItem
                    icon={<User className="text-white/70" />}
                    active={activeAerItem === "team"}
                    onClick={() => setActiveAerItem("team")}
                    className="text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    Team
                  </SidebarItem>
                  <SidebarItem
                    icon={<Settings className="text-white/70" />}
                    active={activeAerItem === "settings"}
                    onClick={() => setActiveAerItem("settings")}
                    className="text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    Settings
                  </SidebarItem>
                </SidebarSection>
              </SidebarContent>
            </Sidebar>
            <div className="flex-1 p-6 text-white/50 text-sm font-mono">
              Main Content Area
            </div>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="bg-zinc-950 p-12 rounded-xl relative overflow-hidden">\n  <Sidebar\n    variant="aer"\n    mode="sticky"\n    className="bg-transparent border-r border-white/10"\n  >\n    {/* Sidebar Content */}\n  </Sidebar>\n</div>`}
          fullCode={`import { Sidebar, SidebarHeader, SidebarContent, SidebarSection, SidebarItem } from "aer-design";\nimport { Home, User, Settings } from "lucide-react";\nimport { useState } from "react";\n\nexport default function AerSidebarExample() {\n  const [activeItem, setActiveItem] = useState("home");\n\n  return (\n    <div className="relative flex items-center justify-center p-16 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">\n      <div className="absolute inset-0 bg-linear-to-br from-sky-600/20 via-transparent to-blue-600/20" />\n      \n      <div className="relative z-10 w-full h-[300px] border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-2xl flex">\n         <Sidebar\n          mode="sticky"\n          position="left"\n          className="h-full bg-transparent border-r border-white/10"\n          variant="aer"\n        >\n          <SidebarHeader className="border-white/10">\n            <div className="flex items-center gap-3">\n              <div className="size-8 rounded-full bg-linear-to-tr from-sky-500 to-cyan-500" />\n              <span className="font-bold text-white">Aer</span>\n            </div>\n          </SidebarHeader>\n          <SidebarContent>\n            <SidebarSection>\n              <SidebarItem \n                icon={<Home className="text-white" />} \n                active={activeItem === "home"} \n                onClick={() => setActiveItem("home")}\n                className="text-white hover:bg-white/10 hover:text-white"\n              >\n                Home\n              </SidebarItem>\n              <SidebarItem \n                icon={<User className="text-white/70" />} \n                active={activeItem === "team"} \n                onClick={() => setActiveItem("team")}\n                className="text-white/70 hover:bg-white/10 hover:text-white"\n              >\n                Team\n              </SidebarItem>\n              <SidebarItem \n                icon={<Settings className="text-white/70" />} \n                active={activeItem === "settings"} \n                onClick={() => setActiveItem("settings")}\n                className="text-white/70 hover:bg-white/10 hover:text-white"\n              >\n                Settings\n              </SidebarItem>\n            </SidebarSection>\n          </SidebarContent>\n        </Sidebar>\n        <div className="flex-1 p-6 text-white/50 text-sm font-mono">\n          Main Content Area\n        </div>\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Floating Island"
        id="floating"
        description="A specialized styling example for the 'Floating' mode."
      >
        <div className="border rounded-aer-xl overflow-hidden bg-aer-muted/20 relative h-[400px] p-6 flex items-center justify-center transform scale-[1] isolate">
          <Sidebar
            mode="floating"
            position="left"
            className="relative h-[350px] !fixed-0 shadow-2xl"
          >
            <SidebarHeader className="border-none pb-0">
              <div className="size-8 rounded-full bg-aer-primary" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarSection className="mt-4">
                <SidebarItem
                  icon={<Home />}
                  active={activeTab === "home"}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </SidebarItem>
                <SidebarItem
                  icon={<User />}
                  active={activeTab === "team"}
                  onClick={() => setActiveTab("team")}
                >
                  Team
                </SidebarItem>
                <SidebarItem
                  icon={<Settings />}
                  active={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                >
                  Config
                </SidebarItem>
              </SidebarSection>
            </SidebarContent>
          </Sidebar>
        </div>
        <CodeBlock
          ts={`<Sidebar mode="floating" position="left" />`}
          fullCode={`import { Sidebar, SidebarHeader, SidebarContent, SidebarSection, SidebarItem } from "aer-design";\nimport { Home, User, Settings } from "lucide-react";\n\nexport default function FloatingSidebar() {\n  return (\n    // Uses fixed positioning by default, so it floats over content\n    <Sidebar mode="floating" position="left">\n      <SidebarHeader className="border-none pb-0">\n        <div className="size-8 rounded-full bg-aer-primary" />\n      </SidebarHeader>\n      <SidebarContent>\n        <SidebarSection className="mt-4">\n          <SidebarItem icon={<Home />}>Home</SidebarItem>\n          <SidebarItem icon={<User />}>Team</SidebarItem>\n          <SidebarItem icon={<Settings />}>Config</SidebarItem>\n        </SidebarSection>\n      </SidebarContent>\n    </Sidebar>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Customize every slot of the sidebar with specific className props."
      >
        <div className="p-6 border rounded-lg bg-aer-muted/5 flex justify-center isolate">
          <Sidebar
            mode="absolute"
            position="left"
            className="h-[300px] relative border-none bg-sky-500/5 rounded-xl overflow-hidden"
          >
            <SidebarHeader className="bg-sky-500/10 border-sky-500/10">
              <div className="size-8 rounded-lg bg-sky-500" />
              <span className="font-bold">Aer</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarSection>
                <SidebarItem
                  icon={<Home className="text-sky-500" />}
                  className="rounded-lg hover:bg-sky-500/10"
                >
                  Styled Item
                </SidebarItem>
              </SidebarSection>
            </SidebarContent>
          </Sidebar>
        </div>
        <CodeBlock
          ts={`<Sidebar\n  className="bg-sky-500/5 rounded-xl"\n  headerClassName="bg-sky-500/10"\n  contentClassName="px-2"\n>\n  <SidebarItem className="rounded-lg hover:bg-sky-500/10" />\n</Sidebar>`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="A complete application shell with responsive behavior."
      >
        <div className="p-6 border rounded-lg bg-aer-muted/5">
          <p className="text-sm text-aer-muted-foreground text-center italic">
            The main playground at the top serves as our primary real-world
            demonstration.
          </p>
        </div>
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h4 id="sidebar-props" className="text-lg font-bold mb-4">
          SidebarProps
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Configuration props for the valid Sidebar container.
        </p>
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"default" | "aer"',
              default: '"default"',
              description:
                "Visual style variant. 'aer' applies glassmorphism effects.",
            },
            {
              prop: "mode",
              type: "'fixed' | 'sticky' | 'absolute' | 'floating' | 'overlay' | 'icon'",
              default: "'fixed'",
              description:
                "Controls the positioning strategy. 'fixed' stays on screen, 'absolute' stays in container, 'overlay' sits on top.",
            },
            {
              prop: "position",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'left'",
              description: "Anchor position of the sidebar.",
            },
            {
              prop: "collapsed",
              type: "boolean",
              default: "false",
              description: "If true, reduces width to show only icons.",
            },
            {
              prop: "hoverable",
              type: "boolean",
              default: "false",
              description:
                "If true and collapsed, sidebar expands on hover (Rail pattern).",
            },
            {
              prop: "overlay",
              type: "boolean",
              default: "false",
              description:
                "Force overlay mode regardless of screen size. Recommended for mobile.",
            },
            {
              prop: "isOpen",
              type: "boolean",
              default: "true",
              description: "Controls visibility in overlay mode.",
            },
            {
              prop: "onOpenChange",
              type: "(isOpen: boolean) => void",
              default: "-",
              description: "Callback when open state changes.",
            },
            {
              prop: "backdrop",
              type: "boolean",
              default: "true",
              description: "Whether to render a dark backdrop in overlay mode.",
            },
            {
              prop: "closeOnBackdropClick",
              type: "boolean",
              default: "true",
              description: "Close sidebar when clicking the backdrop.",
            },
            {
              prop: "closeOnEscape",
              type: "boolean",
              default: "true",
              description: "Close sidebar when pressing Escape.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for styling.",
            },
          ]}
        />
      </div>

      <div>
        <h4 id="sidebar-nested-item-props" className="text-lg font-bold mb-4">
          SidebarNestedItemProps
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for creating collapsible nested navigation sections.
        </p>
        <ApiTable
          data={[
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "The text label for the nested section.",
            },
            {
              prop: "icon",
              type: "React.ReactNode",
              default: "-",
              description: "Optional icon to display before the label.",
            },
            {
              prop: "defaultExpanded",
              type: "boolean",
              default: "false",
              description:
                "Whether the section is expanded by default in normal mode.",
            },
            {
              prop: "indent",
              type: "string",
              default: '"1rem"',
              description:
                "Indentation for nested children. Accepts any CSS unit (px, rem, em, %, etc.).",
            },
            {
              prop: "children",
              type: "React.ReactNode",
              default: "-",
              description:
                "Child items (SidebarItem or nested SidebarNestedItem components).",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for styling.",
            },
          ]}
        />
        <div className="mt-4 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
          <p className="text-sm text-sky-700 dark:text-sky-400">
            <strong>Smart Behavior:</strong> In collapsed or horizontal modes,
            nested items automatically render as floating panels instead of
            inline expansion. The panel positions itself intelligently based on
            sidebar position. Active child detection is recursive - all ancestor
            nested items show an active indicator when any descendant is active.
          </p>
        </div>
      </div>

      <div>
        <h3 id="feature-guide" className="text-lg font-bold mb-4">
          Feature Usage Guide
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Responsive Logic</h4>
            <p className="text-sm text-aer-muted-foreground">
              The Sidebar is unopinionated about breakpoints. You should use a
              media query hook (like{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                useMediaQuery
              </code>
              ) to toggle the{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="overlay"
              </code>{" "}
              and{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                isOpen
              </code>{" "}
              props based on screen width.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Rail Pattern</h4>
            <p className="text-sm text-aer-muted-foreground">
              Combine{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                collapsed={true}
              </code>{" "}
              with{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                hoverable={true}
              </code>{" "}
              to create a rail sidebar that expands when the user hovers over
              it, preserving valid screen real estate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize sidebar appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Sidebar uses the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-border: 214.3 31.8% 91.4%;
  --aer-muted: 210 40% 96.1%;
}`}
          fullCode={`/* styles/globals.css */
:root {
  /* Sidebar Background */
  --aer-background: 0 0% 100%;
  
  /* Text Color */
  --aer-foreground: 222.2 47.4% 11.2%;
  
  /* Border Color */
  --aer-border: 214.3 31.8% 91.4%;
  
  /* Hover/Active Item Background */
  --aer-muted: 210 40% 96.1%;
}

.dark {
  --aer-background: 222.2 84% 4.9%;
  --aer-foreground: 210 40% 98%;
  --aer-border: 217.2 32.6% 17.5%;
  --aer-muted: 217.2 32.6% 17.5%;
}`}
        />
        <div className="mt-4 p-4 bg-aer-muted/5 border border-aer-border rounded-lg">
          <p className="text-sm text-aer-muted-foreground">
            <strong>Note:</strong> The <strong>Aer</strong> variant applies a
            glassmorphism style with white text, designed for dark or colorful
            backgrounds. For automatic contrast adjustment on custom
            backgrounds, enable the global <code>autoContrast</code> setting.
          </p>
        </div>
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sidebar
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          The ultimate responsive navigation component.
        </p>
      </header>
      <DocTabs
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: overview,
            toc: [
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "basic", title: "Basic Usage" },
              { id: "nested-items", title: "Nested Items" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "floating", title: "Floating Island" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "sidebar-props", title: "SidebarProps" },
              {
                id: "sidebar-nested-item-props",
                title: "SidebarNestedItemProps",
              },
              { id: "feature-guide", title: "Feature Usage Guide" },
            ],
          },
          {
            id: "theming",
            label: "Theming",
            content: theming,
            toc: [{ id: "css-variables", title: "CSS Variables" }],
          },
        ]}
      />
    </div>
  );
}
