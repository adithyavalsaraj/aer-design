import { Navbar, NavbarItem, NavbarSpacer } from "@/components/Navbar";
import { Bell, Home, Search, User } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function NavbarDoc() {
  const [activeTopTab, setActiveTopTab] = React.useState("dashboard");
  const [activeBottomTab, setActiveBottomTab] = React.useState("home");

  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Basic"
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
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h4 className="text-lg font-bold mb-4">NavbarProps</h4>
        <ApiTable
          data={[
            {
              prop: "position",
              type: "'top' | 'bottom'",
              default: "'top'",
              description: "Where the navbar is fixed/positioned",
            },
            {
              prop: "mode",
              type: "'fixed' | 'sticky' | 'static' | 'floating'",
              default: "'sticky'",
              description: "CSS positioning strategy",
            },
            {
              prop: "size",
              type: "'default' | 'sm' | 'lg' | 'auto'",
              default: "'default'",
              description: "Height and padding preset",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: "Content alignment",
            },

            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      description="Customize navbar appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {\n  --aer-background: 240 10% 3.9%;\n  --aer-foreground: 0 0% 98%;\n  --aer-muted: 240 3.7% 15.9%;\n}`}
        fullCode={`/* app.css */\n:root {\n  --aer-background: 240 10% 3.9%;\n  --aer-foreground: 0 0% 98%;\n  --aer-muted: 240 3.7% 15.9%;\n}`}
      />
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
          { id: "overview", label: "Overview", content: overview },
          { id: "api", label: "API", content: api },
          { id: "theming", label: "Theming", content: theming },
        ]}
      />
    </div>
  );
}
