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
  Boxes,
  CheckSquare,
  CircleDot,
  CreditCard,
  GitBranch,
  Github,
  Layout,
  MousePointer2,
  Tag,
  Target,
  Terminal,
  Type,
} from "lucide-react";
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
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "badge",
    label: "Badge",
    icon: Tag,
    category: "Components",
    subCategory: "Data Display",
  },
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
    category: "Components",
    subCategory: "Data Display",
  },
  {
    id: "input",
    label: "Input",
    icon: Type,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    icon: Boxes,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "dialog",
    label: "Dialog",
    icon: Layout,
    category: "Components",
    subCategory: "Overlay",
  },
  {
    id: "cascader",
    label: "Cascader",
    icon: Boxes,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "textarea",
    label: "Textarea",
    icon: Layout,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "checkbox",
    label: "Checkbox",
    icon: CheckSquare,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "radio",
    label: "Radio Group",
    icon: CircleDot,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "otp-input",
    label: "OTP Input",
    icon: Boxes,
    category: "Components",
    subCategory: "Inputs",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    icon: Layout,
    category: "Components",
    subCategory: "Layout",
  },
  {
    id: "navbar",
    label: "Navbar",
    icon: Layout,
    category: "Components",
    subCategory: "Layout",
  },
  {
    id: "menu",
    label: "Menu",
    icon: Layout,
    category: "Components",
    subCategory: "Overlay",
  },
  {
    id: "overlay",
    label: "Overlay",
    icon: Layout,
    category: "Components",
    subCategory: "Overlay",
  },
  {
    id: "tooltip",
    label: "Tooltip",
    icon: MousePointer2,
    category: "Components",
    subCategory: "Overlay",
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
  const categories = Array.from(new Set(NAV_ITEMS.map((i) => i.category)));

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
      className="z-50 border-r border-dashed md:ltr:translate-x-0 md:rtl:translate-x-0 md:opacity-100 md:top-14 md:h-[calc(100vh-3.5rem)]"
    >
      <SidebarHeader className="h-16 flex justify-center border-b-0 px-6 mt-2 md:hidden">
        {/* Only show branding on mobile sidebar, since Desktop has Topbar branding */}
        <Branding showBadge />
      </SidebarHeader>

      <SidebarContent className="px-3 mt-4">
        {categories.map((cat) => {
          const items = NAV_ITEMS.filter((i) => i.category === cat);
          const subCategories = Array.from(
            new Set(items.map((i) => i.subCategory).filter(Boolean))
          );

          return (
            <SidebarSection key={cat} title={cat} className="mb-2">
              {subCategories.length > 0 ? (
                <>
                  {subCategories.map((subCat) => (
                    <SidebarNestedItem
                      key={subCat as string}
                      label={subCat as string}
                      defaultExpanded={true}
                    >
                      {items
                        .filter((i) => i.subCategory === subCat)
                        .map((item) => (
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
                  ))}
                </>
              ) : (
                items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    active={activePage === item.id}
                    icon={<item.icon />}
                  >
                    {item.label}
                  </SidebarItem>
                ))
              )}
            </SidebarSection>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t-0 p-4 mb-2 gap-3">
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
