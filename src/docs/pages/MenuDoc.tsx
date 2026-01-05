import { Button } from "@/components/Button";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
  SubMenu,
} from "@/components/Menu";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
} from "@/docs/components/shared";
import {
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  PenTool,
  PlusCircle,
  Settings,
  Terminal,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

export function MenuDoc() {
  /* Introduction and When to Use sections */
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A flexible menu component for displaying actions and options."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Menus are temporary surfaces that display a list of choices or
            actions. They appear when users interact with a button, action, or
            other control. The Menu component is highly composable, supporting
            nested submenus, keyboard navigation, and rich item content like
            icons and shortcuts.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Accessible</strong>: Full keyboard support (arrows,
              home/end, type-ahead).
            </li>
            <li>
              <strong>Smart Positioning</strong>: Automatically calls collision
              detection to fit in the viewport.
            </li>
            <li>
              <strong>Nested Submenus</strong>: Unlimited levels of nesting with
              hover/click interactions.
            </li>
            <li>
              <strong>Rich Content</strong>: Support for icons, shortcuts,
              checkboxes, and radio items.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Scenarios where a Menu is the right choice."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              Action Menus
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use for a list of actions related to a specific element (e.g.,
              "Edit," "Delete," "Share").
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              Navigation
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use for dropdown navigation menus in headers or sidebars.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="A simple menu with text items."
      >
        <div className="flex gap-4 mb-4">
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => console.log("Clicked Profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => console.log("Clicked Billing")}>
                Billing
              </MenuItem>
              <MenuItem onClick={() => console.log("Clicked Settings")}>
                Settings
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <CodeBlock
          ts={`<Menu>
  <MenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Billing</MenuItem>
    <MenuItem>Settings</MenuItem>
  </MenuContent>
</Menu>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, Button } from "aer-design";

export default function BasicMenu() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => console.log("Profile")}>Profile</MenuItem>
        <MenuItem onClick={() => console.log("Billing")}>Billing</MenuItem>
        <MenuItem onClick={() => console.log("Settings")}>Settings</MenuItem>
      </MenuContent>
    </Menu>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Our signature glassmorphism effect for premium interfaces."
      >
        <div className="relative flex items-center justify-center p-24 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Vibrant Background Elements */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-blue-600/20" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500/40 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <Menu>
              <MenuTrigger asChild>
                <Button variant="aer">Open Menu</Button>
              </MenuTrigger>
              <MenuContent variant="aer">
                <MenuLabel>My Account</MenuLabel>
                <MenuSeparator />
                <MenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </MenuItem>
                <MenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
        <CodeBlock
          ts={`<Menu>
  <MenuTrigger asChild>
    <Button variant="aer">Open Menu</Button>
  </MenuTrigger>
  <MenuContent variant="aer">
    {/* Menu Items... */}
  </MenuContent>
</Menu>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator, Button } from "aer-design";
import { User, Settings } from "lucide-react";

export default function AerMenuExample() {
  return (
    <div className="relative flex items-center justify-center p-24 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-blue-600/20" />
      
      <div className="relative z-10">
        <Menu>
          <MenuTrigger asChild>
            <Button variant="aer">Open Menu</Button>
          </MenuTrigger>
          <MenuContent variant="aer">
            <MenuLabel>My Account</MenuLabel>
            <MenuSeparator />
            <MenuItem>
               <User className="mr-2 h-4 w-4" /> Profile
            </MenuItem>
            <MenuItem>
               <Settings className="mr-2 h-4 w-4" /> Settings
            </MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="icons"
        title="With Icons & Shortcuts"
        description="MenuItems can contain icons and other elements."
      >
        <div className="mb-4">
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuLabel>My Account</MenuLabel>
              <MenuSeparator />
              <MenuItem onClick={() => console.log("Clicked Profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <span className="ml-auto text-xs tracking-widest text-aer-muted-foreground">
                  ⇧⌘P
                </span>
              </MenuItem>
              <MenuItem onClick={() => console.log("Clicked Billing")}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <span className="ml-auto text-xs tracking-widest text-aer-muted-foreground">
                  ⌘B
                </span>
              </MenuItem>
              <MenuItem onClick={() => console.log("Clicked Settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <span className="ml-auto text-xs tracking-widest text-aer-muted-foreground">
                  ⌘S
                </span>
              </MenuItem>
              <MenuSeparator />
              <MenuItem
                onClick={() => console.log("Clicked Logout")}
                className="text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <CodeBlock
          ts={`<MenuContent className="w-56">
  <MenuLabel>My Account</MenuLabel>
  <MenuSeparator />
  <MenuItem>
    <User className="mr-2 h-4 w-4" />
    <span>Profile</span>
    <span className="ml-auto text-xs tracking-widest">⇧⌘P</span>
  </MenuItem>
  {/* ... */}
</MenuContent>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator, Button } from "aer-design";
import { User, CreditCard, Settings, LogOut } from "lucide-react";

export default function IconsMenu() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </MenuTrigger>
      <MenuContent className="w-56">
        <MenuLabel>My Account</MenuLabel>
        <MenuSeparator />
        <MenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <span className="ml-auto text-xs tracking-widest">⇧⌘P</span>
        </MenuItem>
        <MenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <span className="ml-auto text-xs tracking-widest">⌘B</span>
        </MenuItem>
        <MenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <span className="ml-auto text-xs tracking-widest">⌘S</span>
        </MenuItem>
        <MenuSeparator />
        <MenuItem className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="nested"
        title="Nested Submenus"
        description="Support for multi-level nested menus using SubMenu."
      >
        <div className="mb-4">
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">Invite Users</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuGroup>
                <MenuLabel>Invite</MenuLabel>
                <MenuItem onClick={() => console.log("Invite via Email")}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </MenuItem>
                <MenuItem onClick={() => console.log("Invite via Message")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </MenuItem>
                <MenuSeparator />
                <SubMenu
                  trigger={
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Add to Team</span>
                    </>
                  }
                >
                  <MenuItem onClick={() => console.log("Add to Engineering")}>
                    <Terminal className="mr-2 h-4 w-4" />
                    <span>Engineering</span>
                  </MenuItem>
                  <MenuItem onClick={() => console.log("Add to Design")}>
                    <PenTool className="mr-2 h-4 w-4" />
                    <span>Design</span>
                  </MenuItem>
                  <SubMenu
                    trigger={
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Marketing</span>
                      </>
                    }
                  >
                    <MenuItem onClick={() => console.log("Add to SEO")}>
                      SEO Team
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Add to Content")}>
                      Content Team
                    </MenuItem>
                  </SubMenu>
                </SubMenu>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More... (Disabled)</span>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <CodeBlock
          ts={`<Menu>
  <MenuContent>
    <MenuGroup>
      <MenuLabel>Invite</MenuLabel>
      <MenuItem icon={<Mail />}>Email</MenuItem>
      
      <SubMenu trigger={<MenuItem icon={<UserPlus />}>Add to Team</MenuItem>}>
        <MenuItem icon={<Terminal />}>Engineering</MenuItem>
        
        <SubMenu trigger={<MenuItem icon={<Users />}>Marketing</MenuItem>}>
          <MenuItem>SEO Team</MenuItem>
          <MenuItem>Content Team</MenuItem>
        </SubMenu>
      </SubMenu>
      
    </MenuGroup>
  </MenuContent>
</Menu>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuGroup, SubMenu, Button } from "aer-design";
import { Mail, MessageSquare, UserPlus, Terminal, PenTool, Users, PlusCircle } from "lucide-react";

export default function NestedMenu() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Invite Users</Button>
      </MenuTrigger>
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuLabel>Invite</MenuLabel>
          <MenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </MenuItem>
          <MenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Message</span>
          </MenuItem>
          <MenuSeparator />
          <SubMenu
            trigger={
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Add to Team</span>
              </>
            }
          >
            <MenuItem>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Engineering</span>
            </MenuItem>
            <MenuItem>
              <PenTool className="mr-2 h-4 w-4" />
              <span>Design</span>
            </MenuItem>
            <SubMenu
              trigger={
                <>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Marketing</span>
                </>
              }
            >
              <MenuItem>SEO Team</MenuItem>
              <MenuItem>Content Team</MenuItem>
            </SubMenu>
          </SubMenu>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="Control the alignment and side of the menu."
      >
        <div className="mb-4 space-y-2 text-sm text-aer-muted-foreground">
          <p>
            The menu uses <strong>Smart Positioning</strong>. It attempts to
            respect your preferred <code>side</code> and <code>align</code>{" "}
            props. However, if the menu would overflow the screen, it
            automatically:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Flips to the opposite side (e.g., Top → Bottom).</li>
            <li>
              Moves to a cross-axis side if necessary (e.g., Right → Bottom),
              ensuring 360-degree visibility.
            </li>
            <li>
              Adjusts alignment (Start/End/Center) to fit available space.
            </li>
          </ul>
          <p className="mt-2">
            <strong>SubMenus</strong> automatically match the width of their
            parent item by default (min 8rem). You can override this using
            standard width classes (e.g., <code>w-56</code> or{" "}
            <code>min-w-[200px]</code>).
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-aer-muted-foreground">
              Top
            </h4>
            <div className="flex flex-col gap-4">
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Top Start
                  </Button>
                </MenuTrigger>
                <MenuContent side="top" align="start">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Top Center
                  </Button>
                </MenuTrigger>
                <MenuContent side="top" align="center">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Top End
                  </Button>
                </MenuTrigger>
                <MenuContent side="top" align="end">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-aer-muted-foreground">
              Bottom
            </h4>
            <div className="flex flex-col gap-4">
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Bottom Start
                  </Button>
                </MenuTrigger>
                <MenuContent side="bottom" align="start">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Bottom Center
                  </Button>
                </MenuTrigger>
                <MenuContent side="bottom" align="center">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Bottom End
                  </Button>
                </MenuTrigger>
                <MenuContent side="bottom" align="end">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-aer-muted-foreground">
              Left
            </h4>
            <div className="flex flex-col gap-4">
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Left Start
                  </Button>
                </MenuTrigger>
                <MenuContent side="left" align="start">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Left Center
                  </Button>
                </MenuTrigger>
                <MenuContent side="left" align="center">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Left End
                  </Button>
                </MenuTrigger>
                <MenuContent side="left" align="end">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-aer-muted-foreground">
              Right
            </h4>
            <div className="flex flex-col gap-4">
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Right Start
                  </Button>
                </MenuTrigger>
                <MenuContent side="right" align="start">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Right Center
                  </Button>
                </MenuTrigger>
                <MenuContent side="right" align="center">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Right End
                  </Button>
                </MenuTrigger>
                <MenuContent side="right" align="end">
                  <MenuItem>Item 1</MenuItem>
                  <MenuItem>Item 2</MenuItem>
                </MenuContent>
              </Menu>
            </div>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="grid grid-cols-4 gap-4">
  {/* Top Positions */}
  <MenuContent side="top" align="start">...</MenuContent>
  <MenuContent side="top" align="center">...</MenuContent>
  <MenuContent side="top" align="end">...</MenuContent>

  {/* Bottom Positions */}
  <MenuContent side="bottom" align="start">...</MenuContent>
  ...
</div>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, Button } from "aer-design";

export default function PositioningMenu() {
  return (
    <div className="grid grid-cols-4 gap-8">
      {/* Top Column */}
      <div className="flex flex-col gap-4">
        <Menu>
          <MenuTrigger asChild><Button>Top Start</Button></MenuTrigger>
          <MenuContent side="top" align="start">
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
        {/* ... Top Center, Top End */}
      </div>
      
      {/* ... Bottom, Left, Right Columns */}
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Every part of the menu can be styled with standard className props."
      >
        <div className="flex flex-wrap items-center justify-center gap-8 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <MenuStylingExample />
        </div>
        <CodeBlock
          ts={`// Interactive item styling
<MenuItem className="hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-100 focus:text-purple-600">
  Custom Hover Item
</MenuItem>

// Destructive styling
<MenuItem className="text-red-500 hover:bg-red-50 focus:bg-red-50">
  Delete Account
</MenuItem>

// Custom content styling
<MenuContent className="w-64 border-purple-200 shadow-xl rounded-xl">
  {...}
</MenuContent>`}
          fullCode={`import { Menu, MenuTrigger, MenuContent, MenuItem, Button } from "aer-design";
import { User, Trash2 } from "lucide-react";

export default function MenuStyling() {
  return (
    <div className="flex gap-4">
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">Custom Menu</Button>
        </MenuTrigger>
        <MenuContent className="w-56 border-purple-200 shadow-xl rounded-xl">
          <MenuItem className="hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-100 focus:text-purple-600">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </MenuItem>
          <MenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 mt-2">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A complete User Profile menu with groups, submenus, and keyboard shortcuts."
      >
        <div className="flex justify-center p-8 border border-aer-border/50 rounded-xl bg-zinc-950/90 relative z-10">
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-blue-600/20" />
          </div>
          <Menu>
            <MenuTrigger asChild>
              <Button
                variant="aer"
                className="h-12 px-4 gap-3 rounded-full hover:scale-105 transition-transform"
              >
                <div className="size-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/20">
                  JD
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-bold">John Doe</span>
                  <span className="text-[10px] text-aer-muted-foreground">
                    Pro Plan
                  </span>
                </div>
              </Button>
            </MenuTrigger>
            <MenuContent className="w-64" align="end" sideOffset={8}>
              <div className="px-2 py-1.5 border-b border-aer-border/50 mb-1">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-xs text-aer-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
              <MenuGroup>
                <MenuLabel>Platform</MenuLabel>
                <MenuItem onClick={() => console.log("Dashboard")}>
                  <Terminal className="mr-2 h-4 w-4 text-indigo-400" />
                  <span>Dashboard</span>
                  <span className="ml-auto text-xs tracking-widest text-aer-muted-foreground">
                    ⌘D
                  </span>
                </MenuItem>
                <MenuItem onClick={() => console.log("Settings")}>
                  <Settings className="mr-2 h-4 w-4 text-emerald-400" />
                  <span>Settings</span>
                  <span className="ml-auto text-xs tracking-widest text-aer-muted-foreground">
                    ⌘S
                  </span>
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuGroup>
                <MenuLabel>Team</MenuLabel>
                <SubMenu
                  trigger={
                    <>
                      <Users className="mr-2 h-4 w-4 text-orange-400" />
                      <span>Manage Team</span>
                    </>
                  }
                >
                  <MenuItem onClick={() => console.log("Invite Member")}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Invite Member</span>
                  </MenuItem>
                  <MenuItem onClick={() => console.log("Permissions")}>
                    <PenTool className="mr-2 h-4 w-4" />
                    <span>Permissions</span>
                  </MenuItem>
                </SubMenu>
                <MenuItem onClick={() => console.log("Billing")}>
                  <CreditCard className="mr-2 h-4 w-4 text-blue-400" />
                  <span>Billing</span>
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem
                onClick={() => console.log("Log out")}
                className="text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <span className="ml-auto text-xs tracking-widest opacity-60">
                  ⇧⌘Q
                </span>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <CodeBlock
          ts={`<Menu>
  <MenuTrigger asChild>
    <Button variant="aer" className="h-12 px-4 gap-3 rounded-full">
      <div className="size-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 ...">JD</div>
      <div className="flex flex-col items-start text-left">
        <span className="text-xs font-bold">John Doe</span>
        <span className="text-[10px] opacity-70">Pro Plan</span>
      </div>
    </Button>
  </MenuTrigger>
  
  <MenuContent className="w-64" align="end" sideOffset={8}>
    <div className="px-2 py-1.5 border-b mb-1 opacity-70">
      <p className="text-sm font-bold">John Doe</p>
      <p className="text-xs">john.doe@example.com</p>
    </div>

    <MenuGroup>
      <MenuLabel>Platform</MenuLabel>
      <MenuItem>
        <Terminal className="mr-2 h-4 w-4" />
        <span>Dashboard</span>
        <span className="ml-auto text-xs opacity-60">⌘D</span>
      </MenuItem>
      {/* ... other items ... */}
    </MenuGroup>

    <MenuSeparator />

    <MenuGroup>
      <MenuLabel>Team</MenuLabel>
      <SubMenu trigger={<MenuItem><Users /><span>Manage Team</span></MenuItem>}>
        <MenuItem><Mail /><span>Invite Member</span></MenuItem>
        <MenuItem><PenTool /><span>Permissions</span></MenuItem>
      </SubMenu>
    </MenuGroup>

    <MenuSeparator />

    <MenuItem className="text-red-500 hover:text-red-600 focus:text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <span className="ml-auto text-xs opacity-60">⇧⌘Q</span>
    </MenuItem>
  </MenuContent>
</Menu>`}
          fullCode={`import { 
  Button, 
  Menu, 
  MenuContent, 
  MenuGroup, 
  MenuItem, 
  MenuLabel, 
  MenuSeparator, 
  MenuTrigger, 
  SubMenu 
} from "aer-design";
import { 
  Terminal, 
  Settings, 
  Users, 
  Mail, 
  PenTool, 
  CreditCard, 
  LogOut 
} from "lucide-react";

export default function UserMenu() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="aer" className="h-12 px-4 gap-3 rounded-full">
          <div className="size-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-bold">John Doe</span>
            <span className="text-[10px] opacity-70">Pro Plan</span>
          </div>
        </Button>
      </MenuTrigger>
      
      <MenuContent className="w-64" align="end" sideOffset={8}>
        <div className="px-2 py-1.5 border-b mb-1 opacity-70">
          <p className="text-sm font-bold">John Doe</p>
          <p className="text-xs">john.doe@example.com</p>
        </div>

        <MenuGroup>
          <MenuLabel>Platform</MenuLabel>
          <MenuItem>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <span className="ml-auto text-xs opacity-60">⌘D</span>
          </MenuItem>
          <MenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <span className="ml-auto text-xs opacity-60">⌘S</span>
          </MenuItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup>
          <MenuLabel>Team</MenuLabel>
          <SubMenu
            trigger={
              <>
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Team</span>
              </>
            }
          >
            <MenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Invite Member</span>
            </MenuItem>
            <MenuItem>
              <PenTool className="mr-2 h-4 w-4" />
              <span>Permissions</span>
            </MenuItem>
          </SubMenu>
          <MenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </MenuItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuItem className="text-red-500 hover:text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <span className="ml-auto text-xs opacity-60">⇧⌘Q</span>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="menu-props" className="text-lg font-bold mb-4">
          Menu
        </h3>
        <ApiTable
          data={[
            {
              prop: "isOpen",
              type: "boolean",
              default: "-",
              description: "Controlled open state of the menu.",
            },
            {
              prop: "variant",
              type: "'default' | 'aer'",
              default: "'default'",
              description:
                "Visual style variant. 'aer' applies glassmorphism effects.",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: "Event handler called when the open state changes.",
            },
          ]}
        />

        <h3 id="menu-trigger-props" className="text-lg font-bold mt-8 mb-4">
          MenuTrigger
        </h3>
        <ApiTable
          data={[
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Merge props with child element instead of rendering a button.",
            },
          ]}
        />

        <h3 id="menu-content-props" className="text-lg font-bold mt-8 mb-4">
          MenuContent
        </h3>
        <ApiTable
          data={[
            {
              prop: "align",
              type: '"start" | "end" | "center"',
              default: '"start"',
              description:
                "Alignment of the menu relative to the trigger. Auto-adjusts on collision.",
            },
            {
              prop: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description:
                "Preferred side of the trigger. Auto-flips 360° on collision.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels from the trigger.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes. Supports width overrides (e.g., w-64).",
            },
          ]}
        />

        <h3 id="menu-item-props" className="text-lg font-bold mt-8 mb-4">
          MenuItem
        </h3>
        <ApiTable
          data={[
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "When true, prevents interaction.",
            },
            {
              prop: "inset",
              type: "boolean",
              default: "false",
              description:
                "Adds left padding for alignment with checkboxes/icons.",
            },
            {
              prop: "onClick",
              type: "(e: MouseEvent) => void",
              default: "-",
              description: "Callback when the item is clicked.",
            },
            {
              prop: "variant",
              type: '"default" | "destructive"',
              default: '"default"',
              description: "Visual style variant.",
            },
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description: "Merge props with child element.",
            },
          ]}
        />

        <h3 id="submenu-props" className="text-lg font-bold mt-8 mb-4">
          SubMenu
        </h3>
        <ApiTable
          data={[
            {
              prop: "trigger",
              type: "ReactNode",
              default: "-",
              description: "Content for the submenu trigger.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the submenu.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes. Matches parent width by default. Override with w-/min-w- classes.",
            },
          ]}
        />

        <h3 id="other-props" className="text-lg font-bold mt-8 mb-4">
          Other Components
        </h3>
        <div className="text-sm text-aer-muted-foreground mb-4">
          <strong>MenuGroup</strong>, <strong>MenuLabel</strong>, and{" "}
          <strong>MenuSeparator</strong> are simple wrapper components.
        </div>
        <ApiTable
          data={[
            {
              prop: "MenuGroup.asChild",
              type: "boolean",
              default: "false",
              description: "Merge props with child element.",
            },
            {
              prop: "MenuLabel.inset",
              type: "boolean",
              default: "false",
              description: "Adds left padding to align with inset items.",
            },
            {
              prop: "MenuLabel.asChild",
              type: "boolean",
              default: "false",
              description: "Merge props with child element.",
            },
            {
              prop: "MenuSeparator.asChild",
              type: "boolean",
              default: "false",
              description: "Merge props with child element.",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      id="css-variables"
      title="CSS Variables"
      description="Customize menu appearance using CSS variables."
    >
      <CodeBlock
        ts={`/* Global theme overrides */
:root {
  --aer-component-bg: 0 0% 100%;
  --aer-component-fg: 240 10% 3.9%;
  --aer-border: 240 5.9% 90%;
  --aer-accent: 240 4.8% 95.9%; /* Hover state */
}

/* Or specific to menu variants */
.menu-content {
  /* ... */
}`}
        fullCode={`/* app.css */
:root {
  --aer-component-bg: 0 0% 100%;
  --aer-component-fg: 240 10% 3.9%;
  --aer-border: 240 5.9% 90%;
  --aer-accent: 240 4.8% 95.9%; /* Hover state */
}
`}
      />
      <div className="mt-4 p-4 bg-aer-muted/5 border border-aer-border rounded-lg">
        <p className="text-sm text-aer-muted-foreground">
          <strong>Note:</strong> The <strong>Aer</strong> variant applies a
          glassmorphism style with white text, designed for dark or colorful
          backgrounds. For automatic contrast adjustment on custom backgrounds,
          enable the global <code>autoContrast</code> setting.
        </p>
      </div>
    </DocSection>
  );

  function MenuStylingExample() {
    return (
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">Custom Menu Style</Button>
        </MenuTrigger>
        <MenuContent className="w-56 border-purple-200 shadow-xl rounded-xl p-2">
          <MenuLabel className="text-purple-900">Customized</MenuLabel>
          <MenuSeparator className="bg-purple-100" />
          <MenuItem className="hover:bg-purple-100 hover:text-purple-600 focus:bg-purple-100 focus:text-purple-600 rounded-md transition-colors">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </MenuItem>
          <MenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 mt-1 rounded-md transition-colors">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Menu
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Displays a list of choices on temporary surfaces. Accessible via
          keyboard (Tab, Enter, Space, Escape, Arrows).
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
              { id: "icons", title: "Icons & Shortcuts" },
              { id: "nested", title: "Nested Submenus" },
              { id: "positioning", title: "Positioning" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "menu-props", title: "Menu" },
              { id: "menu-trigger-props", title: "MenuTrigger" },
              { id: "menu-content-props", title: "MenuContent" },
              { id: "menu-item-props", title: "MenuItem" },
              { id: "submenu-props", title: "SubMenu" },
              { id: "other-props", title: "Other Components" },
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
