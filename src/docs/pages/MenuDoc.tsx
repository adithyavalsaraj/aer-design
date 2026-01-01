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
  User,
  UserPlus,
  Users,
} from "lucide-react";

export function MenuDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="basic"
        title="Basic"
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
          ts={`<SubMenu
  trigger={
    <>
      <UserPlus className="mr-2 h-4 w-4" />
      <span>Add to Team</span>
    </>
  }
>
  <MenuItem>Engineering</MenuItem>
  <SubMenu trigger={...}>
    <MenuItem>SEO Team</MenuItem>
  </SubMenu>
</SubMenu>`}
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
          ts={`<!-- Top Positions -->
<MenuContent side="top" align="start">...</MenuContent>
<MenuContent side="top" align="center">...</MenuContent>
<MenuContent side="top" align="end">...</MenuContent>

<!-- Bottom Positions -->
<MenuContent side="bottom" align="start">...</MenuContent>
<MenuContent side="bottom" align="center">...</MenuContent>
<MenuContent side="bottom" align="end">...</MenuContent>

<!-- Left Positions -->
<MenuContent side="left" align="start">...</MenuContent>
<MenuContent side="left" align="center">...</MenuContent>
<MenuContent side="left" align="end">...</MenuContent>

<!-- Right Positions -->
<MenuContent side="right" align="start">...</MenuContent>
<MenuContent side="right" align="center">...</MenuContent>
<MenuContent side="right" align="end">...</MenuContent>`}
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
        id="real-world"
        title="Real World Example"
        description="A complete User Profile menu with groups, submenus, and keyboard shortcuts."
      >
        <div className="flex justify-center p-8 border border-aer-border/50 rounded-xl bg-gradient-to-br from-aer-muted/50 to-aer-background/50">
          <Menu>
            <MenuTrigger asChild>
              <Button
                variant="aer"
                className="h-12 px-4 gap-3 rounded-full hover:scale-105 transition-transform"
              >
                <div className="size-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/20">
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
          ts={`// Interactive User Profile Menu Example`}
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
          <div className="size-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
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
    </DocSection>
  );

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
              { id: "basic", title: "Basic" },
              { id: "icons", title: "Icons & Shortcuts" },
              { id: "nested", title: "Nested Submenus" },
              { id: "positioning", title: "Positioning" },
              { id: "real-world", title: "Real World" },
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
