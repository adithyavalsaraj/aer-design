import {
  Bell,
  Boxes,
  CheckSquare,
  CircleDot,
  CreditCard,
  GitBranch,
  Layout,
  Minus,
  MousePointer2,
  Square,
  Tag,
  Target,
  Terminal,
  Type,
  User,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  category: string;
}

export const NAV_ITEMS: NavItem[] = [
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
    id: "autocomplete",
    label: "Autocomplete",
    icon: Type,
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
    id: "popover",
    label: "Popover",
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
    id: "command-palette",
    label: "Command Palette",
    icon: Terminal,
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
