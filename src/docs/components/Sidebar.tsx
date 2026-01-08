import {
  Sidebar as LibSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNestedItem,
  SidebarSection,
} from "@/components/Sidebar";
import {
  Bell,
  Boxes,
  CheckSquare,
  CircleDot,
  CreditCard,
  GitBranch,
  Github,
  Layout,
  Minus,
  MousePointer2,
  Square,
  Tag,
  Target,
  Terminal,
  Type,
  User,
  X,
} from "lucide-react";
import React from "react";
import { Branding } from "./Branding";

export const NAV_ITEMS = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Terminal,
    category: "Welcome",
  },
  {
    id: "button",
    label: "Button",
    icon: MousePointer2,
    category: "General",
  },
  {
    id: "input",
    label: "Input",
    icon: Type,
    category: "Inputs",
  },
  {
    id: "textarea",
    label: "Textarea",
    icon: Layout,
    category: "Inputs",
  },
  {
    id: "checkbox",
    label: "Checkbox",
    icon: CheckSquare,
    category: "Inputs",
  },
  {
    id: "radio",
    label: "Radio Group",
    icon: CircleDot,
    category: "Inputs",
  },
  {
    id: "otp-input",
    label: "OTP Input",
    icon: Boxes,
    category: "Inputs",
  },
  {
    id: "cascader",
    label: "Cascader",
    icon: Boxes,
    category: "Inputs",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    icon: Boxes,
    category: "Inputs",
  },
  {
    id: "avatar",
    label: "Avatar",
    icon: User,
    category: "Data Display",
  },
  {
    id: "badge",
    label: "Badge",
    icon: Tag,
    category: "Data Display",
  },
  {
    id: "skeleton",
    label: "Skeleton",
    icon: Square,
    category: "Feedback",
  },
  {
    id: "toast",
    label: "Toast",
    icon: Bell,
    category: "Feedback",
  },
  {
    id: "dialog",
    label: "Dialog",
    icon: Layout,
    category: "Overlay",
  },
  {
    id: "menu",
    label: "Menu",
    icon: Layout,
    category: "Overlay",
  },
  {
    id: "overlay",
    label: "Overlay",
    icon: Layout,
    category: "Overlay",
  },
  {
    id: "tooltip",
    label: "Tooltip",
    icon: MousePointer2,
    category: "Overlay",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    icon: Layout,
    category: "Layout",
  },
  {
    id: "navbar",
    label: "Navbar",
    icon: Layout,
    category: "Layout",
  },
  {
    id: "accordion",
    label: "Accordion",
    icon: Layout,
    category: "Layout",
  },
  {
    id: "tabs",
    label: "Tabs",
    icon: Layout,
    category: "Layout",
  },
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
    category: "Layout",
  },
  {
    id: "divider",
    label: "Divider",
    icon: Minus,
    category: "Layout",
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Boxes,
    category: "Utilities",
  },
  {
    id: "shortcuts",
    label: "Shortcuts",
    icon: Layout,
    category: "Utilities",
  },
  {
    id: "positioning",
    label: "Positioning",
    icon: MousePointer2,
    category: "Utilities",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: Target,
    category: "Resources",
  },
  {
    id: "contributing",
    label: "Contributing",
    icon: GitBranch,
    category: "Resources",
  },
];
interface SidebarProps {
  activePage: string;
  onPageChange: (id: string) => void;
  isOpen: boolean; // Add manual control
  onClose?: () => void;
}

export function Sidebar({
  activePage,
  onPageChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const categories = Array.from(
    new Set(NAV_ITEMS.map((i) => i.category))
  ).filter((c) => c !== "Resources");
  const resourceItems = NAV_ITEMS.filter((i) => i.category === "Resources");

  // Responsive sticky behavior
  const [isShortScreen, setIsShortScreen] = React.useState(false);

  React.useEffect(() => {
    const checkHeight = () => {
      setIsShortScreen(window.innerHeight < 700);
    };

    // Initial check
    checkHeight();

    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const COLLAPSIBLE_CATEGORIES = [
    "General",
    "Inputs",
    "Data Display",
    "Feedback",
    "Overlay",
    "Layout",
    "Utilities",
  ];

  const handlePageChange = (id: string) => {
    onPageChange(id);
  };

  return (
    <LibSidebar
      isOpen={isOpen}
      position="left"
      mode="fixed"
      overlay={true}
      backdrop={true}
      showNestedBorder={false}
      onBackdropClick={onClose}
      className="z-50 border-r border-dashed md:ltr:translate-x-0 md:rtl:translate-x-0 md:opacity-100 top-0 h-screen md:top-14 md:h-[calc(100vh-3.5rem)]"
    >
      <SidebarHeader className="h-16 flex justify-between items-center border-b-0 px-6 mt-2 md:hidden">
        {/* Only show branding on mobile sidebar, since Desktop has Topbar branding */}
        <Branding showBadge />
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-aer-muted-foreground hover:text-aer-foreground"
        >
          <X className="size-5" />
        </button>
      </SidebarHeader>

      <SidebarContent className="px-3 mt-4">
        {categories.map((cat) => {
          const items = NAV_ITEMS.filter((i) => i.category === cat);
          const isCollapsible = COLLAPSIBLE_CATEGORIES.includes(cat);

          // Show "COMPONENTS" header before the first component category (General)
          const showComponentsHeader = cat === "General";

          if (isCollapsible) {
            return (
              <React.Fragment key={cat}>
                {showComponentsHeader && (
                  <h4 className="px-3 py-2 mt-4 mb-2 text-[10px] uppercase tracking-wider font-bold text-aer-muted-foreground/50">
                    Components
                  </h4>
                )}
                <div className="mb-1">
                  <SidebarNestedItem label={cat} defaultExpanded={true}>
                    {items.map((item) => (
                      <SidebarItem
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        active={activePage === item.id}
                        icon={<item.icon />}
                      >
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarNestedItem>
                </div>
              </React.Fragment>
            );
          }

          return (
            <SidebarSection key={cat} title={cat} className="mb-2">
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  active={activePage === item.id}
                  icon={<item.icon />}
                >
                  {item.label}
                </SidebarItem>
              ))}
            </SidebarSection>
          );
        })}

        {/* Render Resources here on short screens */}
        {isShortScreen && (
          <div className="mt-4 mb-2">
            <h4 className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-aer-muted-foreground/50">
              Resources
            </h4>
            {resourceItems.map((item) => (
              <SidebarItem
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                active={activePage === item.id}
                icon={<item.icon />}
              >
                {item.label}
              </SidebarItem>
            ))}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="flex-col items-stretch! border-t-0 p-4 mb-2 gap-1">
        {!isShortScreen && (
          <>
            <h4 className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-aer-muted-foreground/50">
              Resources
            </h4>
            {resourceItems.map((item) => (
              <SidebarItem
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                active={activePage === item.id}
                icon={<item.icon />}
              >
                {item.label}
              </SidebarItem>
            ))}
            <div className="my-2 border-t border-aer-border/40" />
          </>
        )}
        <SidebarItem
          icon={<Github className="size-4" />}
          className="bg-aer-muted/30 text-aer-muted-foreground hover:text-aer-foreground"
          onClick={() =>
            window.open(
              "https://github.com/adithyavalsaraj/aer-design",
              "_blank"
            )
          }
        >
          Open Source
        </SidebarItem>
      </SidebarFooter>
    </LibSidebar>
  );
}
