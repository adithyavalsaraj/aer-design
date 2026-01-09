import { Navbar, NavbarItem, NavbarSpacer } from "@/components/Navbar";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
  UsageGuidelines,
} from "@/docs/components/shared";
import { Bell, Home, Search, User } from "lucide-react";
import * as React from "react";

export function NavbarDoc() {
  const [activeTopTab, setActiveTopTab] = React.useState("dashboard");
  const [activeBottomTab, setActiveBottomTab] = React.useState("home");

  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="A specialized structured component for top and bottom navigation bars."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Navbar provides a consistent container for application titles,
            navigation links, and actions. It is designed to be paired with the
            Sidebar or used as the primary navigation in simpler apps. It
            natively supports mobile "Bottom Navigation" patterns.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Top or Bottom</strong> - Switch effortlessly between
              desktop header and mobile footer layouts
            </li>
            <li>
              <strong>Flexible Modes</strong> - Sticky, fixed, floating, or
              standard static positioning
            </li>
            <li>
              <strong>Pre-styled Items</strong> - Includes{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                NavbarItem
              </code>{" "}
              and{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                NavbarSpacer
              </code>{" "}
              components
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Determine the best navigation pattern for your context."
      >
        <UsageGuidelines
          do={[
            "Global application headers with logo and primary links",
            "Mobile-first bottom navigation for app-like experiences",
            "Secondary navigation bars within specific dashboard sections",
            "Floating toolbars that need a premium glassmorphism look",
          ]}
          dont={[
            "Small lists of 2-3 items (use simple links instead)",
            "Complex hierarchies that require multiple levels of nesting (use Sidebar or Mega Menu)",
            "Inline navigation within long text content",
          ]}
        />
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Standard top navigation bar for desktop and web applications."
      >
        <div className="border rounded-aer-xl overflow-hidden bg-aer-muted/5 relative h-32 flex flex-col">
          <Navbar position="top" mode="absolute" size="sm">
            <span className="font-bold text-lg mr-4">Aer</span>
            <NavbarItem
              active={activeTopTab === "dashboard"}
              onClick={() => setActiveTopTab("dashboard")}
            >
              Dashboard
            </NavbarItem>
            <NavbarItem
              active={activeTopTab === "projects"}
              onClick={() => setActiveTopTab("projects")}
            >
              Projects
            </NavbarItem>
            <NavbarItem
              active={activeTopTab === "team"}
              onClick={() => setActiveTopTab("team")}
            >
              Team
            </NavbarItem>
            <NavbarSpacer />
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-4 text-aer-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  className="h-8 rounded-aer-md border bg-aer-background pl-8 text-sm w-48"
                  placeholder="Search..."
                />
              </div>
              <div className="size-8 rounded-full bg-aer-muted ml-2" />
            </div>
          </Navbar>
          <div className="flex-1 flex items-center justify-center text-aer-muted-foreground text-sm pt-12">
            Page Content
          </div>
        </div>
        <CodeBlock
          ts={`<Navbar position="top">\n  <div className="font-bold">Logo</div>\n  <NavbarItem active>Home</NavbarItem>\n  <NavbarSpacer />\n  <div className="relative">\n     <Search className="absolute left-2..." />\n     <input placeholder="Search..." />\n  </div>\n  <UserAvatar />\n</Navbar>`}
          fullCode={`import { Navbar, NavbarItem, NavbarSpacer } from "aer-design";\nimport { Search } from "lucide-react";\n\nexport default function AppHeader() {\n  return (\n    <Navbar position="top">\n      <div className="font-bold text-lg mr-4">Aer</div>\n      <NavbarItem active>Dashboard</NavbarItem>\n      <NavbarItem>Projects</NavbarItem>\n      <NavbarSpacer />\n      <div className="flex items-center gap-2">\n        <div className="relative">\n          <Search className="size-4 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2" />\n          <input\n            className="h-8 rounded-md border bg-background pl-8 text-sm w-48"\n            placeholder="Search..."\n          />\n        </div>\n        <div className="size-8 rounded-full bg-gray-200" />\n      </div>\n    </Navbar>\n  );\n}`}
        />
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

          <div className="relative z-10 w-full max-w-2xl">
            <Navbar
              variant="aer"
              mode="static"
              className="rounded-xl border border-white/10"
            >
              <div className="font-bold text-white text-lg mr-4">Aer</div>
              <NavbarItem active className="text-white">
                Dashboard
              </NavbarItem>
              <NavbarItem className="text-white/70 hover:text-white">
                Projects
              </NavbarItem>
              <NavbarSpacer />
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-white/10" />
              </div>
            </Navbar>
          </div>
        </div>
        <CodeBlock
          ts={`<Navbar variant="aer" position="static" className="rounded-xl">\n  {/* Navbar content... */}\n</Navbar>`}
          fullCode={`import { Navbar, NavbarItem, NavbarSpacer } from "aer-design";\n\nexport default function AerNavbarExample() {\n  return (\n    <div className="relative flex items-center justify-center p-16 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">\n      <div className="absolute inset-0 bg-linear-to-br from-sky-600/20 via-transparent to-blue-600/20" />\n      \n      <div className="relative z-10 w-full max-w-2xl">\n        <Navbar variant="aer" position="top" mode="static" className="rounded-xl border border-white/10">\n          <div className="font-bold text-white text-lg mr-4">Aer</div>\n          <NavbarItem active className="text-white">Dashboard</NavbarItem>\n          <NavbarItem className="text-white/70 hover:text-white">Projects</NavbarItem>\n          <NavbarSpacer />\n          <div className="flex items-center gap-2">\n             <div className="size-8 rounded-full bg-white/10" />\n          </div>\n        </Navbar>\n      </div>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for navbars creates a
            sleek, modern header that feels light and integrated. It works best
            on dark or colorful backgrounds, making it a sophisticated choice
            for fixed top-navigation or floating bars in premium SaaS platforms.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Bottom Navigation"
        id="bottom-nav"
        description="Mobile-first bottom navigation bar, perfect for touch interfaces."
      >
        <div className="border rounded-aer-xl overflow-hidden bg-aer-muted/5 relative h-40 flex flex-col">
          <div className="flex-1 flex items-center justify-center text-aer-muted-foreground text-sm">
            App View
          </div>
          <Navbar position="bottom" mode="absolute" size="auto">
            <NavbarItem
              icon={<Home />}
              className="flex-col gap-1 text-[10px]"
              active={activeBottomTab === "home"}
              onClick={() => setActiveBottomTab("home")}
            >
              Home
            </NavbarItem>
            <NavbarItem
              icon={<Search />}
              className="flex-col gap-1 text-[10px]"
              active={activeBottomTab === "search"}
              onClick={() => setActiveBottomTab("search")}
            >
              Search
            </NavbarItem>
            <NavbarItem
              icon={<Bell />}
              className="flex-col gap-1 text-[10px]"
              active={activeBottomTab === "alerts"}
              onClick={() => setActiveBottomTab("alerts")}
            >
              Alerts
            </NavbarItem>
            <NavbarItem
              icon={<User />}
              className="flex-col gap-1 text-[10px]"
              active={activeBottomTab === "profile"}
              onClick={() => setActiveBottomTab("profile")}
            >
              Profile
            </NavbarItem>
          </Navbar>
        </div>
        <CodeBlock
          ts={`<Navbar position="bottom" size="auto" align="center">\n  <NavbarItem icon={<Home />} className="flex-col">Home</NavbarItem>\n  ...\n</Navbar>`}
          fullCode={`import { Navbar, NavbarItem } from "aer-design";\nimport { Home, Search, Bell, User } from "lucide-react";\n\nexport default function MobileNav() {\n  return (\n    <Navbar position="bottom" size="auto" className="pb-6 pt-3">\n      <NavbarItem icon={<Home />} className="flex-col gap-1 text-[10px]" active>Home</NavbarItem>\n      <NavbarItem icon={<Search />} className="flex-col gap-1 text-[10px]">Search</NavbarItem>\n      <NavbarItem icon={<Bell />} className="flex-col gap-1 text-[10px]">Alerts</NavbarItem>\n      <NavbarItem icon={<User />} className="flex-col gap-1 text-[10px]">Profile</NavbarItem>\n    </Navbar>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Override default styles with custom className properties for each Navbar component."
      >
        <div className="p-8 border rounded-lg bg-aer-muted/5 flex justify-center">
          <Navbar
            mode="static"
            className="bg-sky-500/10 border-sky-500/20 rounded-lg max-w-md"
          >
            <div className="font-bold text-sky-600">Styled</div>
            <NavbarSpacer />
            <NavbarItem className="hover:bg-sky-500/20 text-sky-600 rounded-md">
              Custom Item
            </NavbarItem>
          </Navbar>
        </div>
        <CodeBlock
          ts={`<Navbar className="bg-sky-500/10 border-sky-500/20 rounded-lg">\n  <NavbarItem className="hover:bg-sky-500/20 text-sky-600" />\n</Navbar>`}
          fullCode={`import { Navbar, NavbarItem, NavbarSpacer } from "aer-design";\n\nexport default function CustomNavbar() {\n  return (\n    <div className="p-8 flex justify-center bg-gray-50 rounded-xl">\n      <Navbar\n        mode="static"\n        className="bg-sky-500/10 border-sky-500/20 rounded-lg max-w-md w-full"\n      >\n        <div className="font-bold text-sky-600">Styled</div>\n        <NavbarSpacer />\n        <NavbarItem className="hover:bg-sky-500/20 text-sky-600 rounded-md">\n          Custom Item\n        </NavbarItem>\n      </Navbar>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="Combine Top and Bottom Navigation for a complete mobile-first application."
      >
        <div className="p-8 border rounded-lg bg-aer-muted/5">
          <p className="text-sm text-aer-muted-foreground text-center italic mb-4">
            Our documentation site itself uses the Navbar to guide users through
            components. Below is a complete app header snippet.
          </p>
          <CodeBlock
            ts={`<Navbar position="top" mode="fixed">\n  <Logo />\n  <NavbarItem active>Dashboard</NavbarItem>\n  <NavbarSpacer />\n  <Actions />\n</Navbar>`}
            fullCode={`import { Navbar, NavbarItem, NavbarSpacer } from "aer-design";\nimport { Home, Bell, Search, User, Settings, LogOut } from "lucide-react";\nimport { useState } from "react";\n\nexport default function AppHeader() {\n  const [activeTab, setActiveTab] = useState("dashboard");\n\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <Navbar position="top" mode="sticky" className="border-b bg-white px-6">\n        <div className="flex items-center gap-2 mr-8">\n          <div className="size-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>\n          <span className="font-bold text-xl tracking-tight">Aer Design</span>\n        </div>\n\n        <div className="flex items-center gap-1">\n          <NavbarItem \n            active={activeTab === "dashboard"}\n            onClick={() => setActiveTab("dashboard")}\n            className="px-4"\n          >\n            Dashboard\n          </NavbarItem>\n          <NavbarItem \n            active={activeTab === "analytics"}\n            onClick={() => setActiveTab("analytics")}\n          >\n            Analytics\n          </NavbarItem>\n          <NavbarItem \n            active={activeTab === "settings"}\n            onClick={() => setActiveTab("settings")}\n          >\n            Settings\n          </NavbarItem>\n        </div>\n\n        <NavbarSpacer />\n\n        <div className="flex items-center gap-4">\n          <div className="relative group">\n            <Search className="size-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />\n            <input\n              className="h-9 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"\n              placeholder="Search components..."\n            />\n          </div>\n\n          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative">\n            <Bell className="size-5" />\n            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />\n          </button>\n\n          <div className="h-6 w-px bg-gray-200 mx-2" />\n\n          <div className="flex items-center gap-3 pl-2 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">\n            <div className="text-right hidden sm:block">\n              <p className="text-xs font-bold leading-tight">Adithya Valsaraj</p>\n              <p className="text-[10px] text-gray-500">Administrator</p>\n            </div>\n            <div className="size-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">\n              AV\n            </div>\n          </div>\n        </div>\n      </Navbar>\n\n      <main className="p-8">\n        <div className="max-w-6xl mx-auto">\n          <div className="h-64 rounded-2xl bg-white border border-gray-200 border-dashed flex items-center justify-center text-gray-400 font-medium">\n            Page Content ({activeTab})\n          </div>\n        </div>\n      </main>\n    </div>\n  );\n}`}
          />
        </div>
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h4 id="navbar-props" className="text-lg font-bold mb-4">
          NavbarProps
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Component props for configurations.
        </p>
        <ApiTable
          data={[
            {
              prop: "position",
              type: "'top' | 'bottom'",
              default: "'top'",
              description:
                "Where the navbar is fixed/positioned. 'top' adds a bottom border, 'bottom' adds a top border.",
            },
            {
              prop: "variant",
              type: "'default' | 'aer'",
              default: "'default'",
              description:
                "Visual style variant. 'aer' applies glassmorphism effects.",
            },
            {
              prop: "mode",
              type: "'fixed' | 'sticky' | 'static' | 'floating' | 'absolute'",
              default: "'sticky'",
              description:
                "CSS positioning strategy. 'floating' adds a margin and shadow effects.",
            },
            {
              prop: "size",
              type: "'default' | 'sm' | 'lg' | 'auto'",
              default: "'default'",
              description:
                "Height and padding preset. Use 'auto' for content-based sizing (common for bottom tabs).",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: "Horizontal alignment of the navbar content.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
          ]}
        />
      </div>

      <div>
        <h4 id="navbar-item-props" className="text-lg font-bold mb-4">
          NavbarItem Props
        </h4>
        <ApiTable
          data={[
            {
              prop: "active",
              type: "boolean",
              default: "false",
              description: "Highlights the item as current/active.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "-",
              description: "Icon element to display (useful for mobile tabs).",
            },
            {
              prop: "onClick",
              type: "() => void",
              default: "-",
              description: "Click handler.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize navbar appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Navbar uses the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-muted: 210 40% 96.1%;
  --aer-border: 214.3 31.8% 91.4%;
}`}
          fullCode={`/* styles/globals.css */
:root {
  /* Background Color */
  --aer-background: 0 0% 100%;
  
  /* Text Color */
  --aer-foreground: 222.2 47.4% 11.2%;
  
  /* Border Color */
  --aer-border: 214.3 31.8% 91.4%;
  
  /* Active/Hover Item Background */
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
          Navbar
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A dedicated component for horizontal navigation bars, supporting top
          headers and mobile bottom bars.
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
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "bottom-nav", title: "Bottom Navigation" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "navbar-props", title: "NavbarProps" },
              { id: "navbar-item-props", title: "NavbarItem Props" },
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
