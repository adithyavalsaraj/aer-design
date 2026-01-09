export type RoadmapStatus =
  | "Completed"
  | "In Progress"
  | "Planned"
  | "not-implemented";
export type Priority = "High" | "Medium" | "Low";
export type Category =
  | "General"
  | "Layout"
  | "Navigation"
  | "Data Entry"
  | "Data Display"
  | "Feedback"
  | "Configuration"
  | "Utilities";

export interface ComponentSpec {
  name: string;
  description: string;
  category: Category;
  status: RoadmapStatus;
  priority?: Priority;
  version?: string;
  features?: string[];
}

export const ROADMAP_DATA: ComponentSpec[] = [
  // --- Completed Components ---
  {
    name: "Button",
    version: "v0.1.0",
    category: "General",
    status: "Completed",
    description: "Interactive button component",
  },
  {
    name: "Input",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "Enhanced text input",
  },
  {
    name: "Textarea",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "Auto-resizing text area",
  },
  {
    name: "Checkbox",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "Tri-state checkbox",
  },
  {
    name: "Radio",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "Radio button groups",
  },
  {
    name: "Dropdown",
    version: "v0.14.1",
    category: "Data Entry",
    status: "Completed",
    description: "Advanced select menu",
    features: [
      "Virtualization & Lazy Loading",
      "Multi-select & Searching",
      "Grouped Options",
      "Keyboard Navigation",
      "Form Validation",
    ],
  },
  {
    name: "Cascader",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "Cascading selection",
  },
  {
    name: "OtpInput",
    version: "v0.12.0",
    category: "Data Entry",
    status: "Completed",
    description: "One-time password input",
  },
  {
    name: "Menu",
    version: "v0.12.0",
    category: "Navigation",
    status: "Completed",
    description: "Context menu system",
  },
  {
    name: "Sidebar",
    version: "v0.13.1",
    category: "Navigation",
    status: "Completed",
    description: "Navigation sidebar",
  },
  {
    name: "Navbar",
    version: "v0.12.0",
    category: "Navigation",
    status: "Completed",
    description: "Top navigation bar",
  },
  {
    name: "Tooltip",
    version: "v0.12.0",
    category: "Feedback",
    status: "Completed",
    description: "Contextual tooltips",
  },
  {
    name: "Overlay",
    version: "v0.12.0",
    category: "Feedback",
    status: "Completed",
    description: "Modal overlay system",
  },
  {
    name: "Dialog",
    version: "v0.12.0",
    category: "Feedback",
    status: "Completed",
    description: "Advanced modal system",
  },
  {
    name: "Badge",
    version: "v0.12.0",
    category: "Data Display",
    status: "Completed",
    description: "Compact status markers",
  },
  {
    name: "Card",
    version: "v0.12.0",
    category: "Data Display",
    status: "Completed",
    description: "Structured containers",
  },
  {
    name: "Tabs",
    version: "v0.11.0",
    category: "Data Display",
    status: "Completed",
    description: "Responsive tab system",
    features: [
      "Horizontal and vertical orientations",
      "Keyboard navigation (Arrow keys)",
      "Lazy loading of tab content",
      "Controlled and uncontrolled modes",
      "Custom tab indicators",
      "Variants (line, enclosed, pills)",
    ],
  },
  {
    name: "Avatar",
    version: "v0.12.0",
    category: "Data Display",
    status: "Completed",
    description: "User avatar component",
  },
  {
    name: "Divider",
    version: "v0.11.0",
    category: "Layout",
    status: "Completed",
    description: "Standalone divider component",
  },
  {
    name: "Skeleton",
    version: "v0.11.0",
    category: "Layout",
    status: "Completed",
    description: "Loading placeholder",
  },
  {
    name: "Accordion",
    version: "v0.13.0",
    category: "Data Display",
    status: "Completed",
    description: "Collapsible content panels for progressive disclosure",
    features: [
      "Single and multiple expansion modes",
      "Smooth animations",
      "Keyboard navigation",
      "Custom icons",
      "Nested accordions support",
    ],
  },
  {
    name: "ThemeProvider",
    version: "v0.1.0",
    category: "Configuration",
    status: "Completed",
    description: "Theme management",
  },
  {
    name: "AerConfigProvider",
    version: "v0.5.0",
    category: "Configuration",
    status: "Completed",
    description: "Global configuration",
  },
  {
    name: "Shortcut",
    version: "v0.8.0",
    category: "Utilities",
    status: "Completed",
    description: "Keyboard shortcut system",
  },
  {
    name: "Popover",
    version: "v0.14.0",
    category: "Feedback",
    status: "Completed",
    description:
      "Headless-first popover primitive for rich interactive overlays",
    features: [
      "Headless usePopover hook",
      "Flexible triggers (click, hover, focus, manual, composite)",
      "Compound components (Trigger, Content, Arrow, Close)",
      "Nested popover support",
      "Zero positioning logic (delegates to useAutoPosition)",
      "Full accessibility (ARIA + keyboard)",
      "Lifecycle hooks",
      "SSR-safe",
      "Foundation for Tooltip/Dropdown/Menu",
    ],
  },
  {
    name: "Toast",
    version: "v0.12.0",
    category: "Feedback",
    status: "Completed",
    description: "Toast notification system for user feedback",
    features: [
      "9 Positions with Auto-Stacking",
      "Swipe to Dismiss (Touch Optimized)",
      "Standalone & Global Modes",
      "Action buttons & Keyboard Accessible",
      "Variants (success, error, warning, info, neutral, aer)",
      "Glassmorphism Aer Variant",
    ],
  },
  {
    name: "Autocomplete",
    version: "v0.14.1",
    category: "Data Entry",
    status: "Completed",
    description: "Searchable input with suggestion list",
    features: [
      "Remote data fetching",
      "Virtualization & Lazy Loading",
      "Custom renderers & Grouping",
      "Multiple selection",
      "Keyboard navigation",
    ],
  },

  // --- High Priority ---
  {
    name: "Calendar",
    category: "Data Entry",
    status: "Planned",
    priority: "High",
    description: "Comprehensive date and time selection system",
    features: [
      "Date, Range, and Time picker modes",
      "Year and Month selection pickers",
      "Week selection mode (single week view)",
      "Week numbering (toggleable)",
      "Inline calendar & Popover modes",
      "Meeting and Agenda views",
      "Event highlighting and customization",
      "Internationalization (i18n) & Localized formats",
      "Smart shortcuts (Yesterday, Last 7 days, etc.)",
      "Min/Max date constraints & Disabled dates",
      "Year/Month quick navigation",
      "Keyboard accessibility (grid navigation)",
    ],
  },

  // --- Medium Priority ---
  {
    name: "Breadcrumb",
    category: "Navigation",
    status: "Planned",
    priority: "Medium",
    description: "Navigation breadcrumb trail",
    features: [
      "Auto-collapse for deep paths",
      "Custom separator support",
      "Dropdown integration for collapsed items",
      "Item max-width truncation",
      "Headless hook support",
    ],
  },
  {
    name: "Pagination",
    category: "Navigation",
    status: "Planned",
    priority: "Medium",
    description: "Page navigation component",
    features: [
      "Total item count display",
      "Page size switcher",
      "Quick jumper input",
      "Simple vs Complex modes",
      "Mini version",
    ],
  },
  {
    name: "Progress",
    category: "Feedback",
    status: "Planned",
    priority: "Medium",
    description: "Progress indicators",
    features: [
      "Linear and Circular variants",
      "Success/Error status styles",
      "Striped and animated backgrounds",
      "Custom steps/milestone mode",
      "Gradient support",
    ],
  },
  {
    name: "Chips",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "Compact elements for input, attribute, or action",
    features: [
      "Input chips (dismissible)",
      "Choice chips (single select)",
      "Filter chips (multi select)",
      "Action chips",
      "Avatar support",
    ],
  },
  {
    name: "FAB",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "Primary action button for screen",
    features: [
      "Extended variant (icon + label)",
      "Scroll behavior (hide/shrink)",
      "Animation transitions",
      "Anchoring",
    ],
  },
  {
    name: "SpeedDial",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "Floating button that expands into multiple actions",
    features: [
      "Custom directions (up, down, left, right)",
      "Icon rotation",
      "Tooltip labels",
      "Delay control",
    ],
  },
  {
    name: "CommandPalette",
    category: "Navigation",
    status: "Planned",
    priority: "Medium",
    description: "Mac-style global search and command menu (Ctrl+K)",
    features: [
      "Fuzzy search",
      "Keyboard first navigation",
      "Dynamic action binding",
      "Grouped results",
    ],
  },
  {
    name: "Dock",
    category: "Navigation",
    status: "Planned",
    priority: "Medium",
    description: "MacOS-style floating icon dock",
    features: [
      "Magnification effect on hover",
      "Bounce animation",
      "Glassmorphism styling",
      "Responsive collapsing",
    ],
  },
  {
    name: "Kanban",
    category: "Data Display",
    status: "Planned",
    priority: "Medium",
    description: "Drag-and-drop board for item management",
    features: [
      "Multiple columns",
      "Drag and drop cards",
      "Sortable lists",
      "Custom card rendering",
      "Swimlanes",
    ],
  },
  {
    name: "Charts",
    category: "Data Display",
    status: "Planned",
    priority: "Medium",
    description: "Data visualization library (Line, Bar, Pie, etc.)",
    features: [
      "Responsive container support",
      "Line, Bar, Area, Pie, and Doughnut charts",
      "Interactive tooltips and legends",
      "Animation support",
      "Customizable axes and grids",
      "Dark mode support",
    ],
  },
  {
    name: "RichTextEditor",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "WYSIWYG editor for rich text content",
    features: [
      "Markdown export/import support",
      "Toolbar customization",
      "Image upload and handling",
      "Block-based editing structure",
      "Slash commands support",
      "Floating menu for text selection",
    ],
  },
  {
    name: "Drawer",
    category: "Feedback",
    status: "Planned",
    priority: "Medium",
    description: "Slide-out overlay panel",
    features: [
      "Positions (left, right, top, bottom)",
      "Multi-level stacking",
      "Size configuration",
      "Backdrop customization",
    ],
  },
  {
    name: "FileUpload",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "File selection and upload interface",
    features: [
      "Drag and drop zone",
      "Multiple file selection",
      "Image preview generation",
      "Progress bar integration",
      "Validation (size, type)",
    ],
  },
  {
    name: "TreeSelect",
    category: "Data Entry",
    status: "Planned",
    priority: "Medium",
    description: "Tree structure selection dropdown",
    features: [
      "Hierarchical data support",
      "Checkbox selection",
      "Search/Filtering",
      "Async loading",
    ],
  },

  // --- Low Priority ---
  {
    name: "Alert",
    category: "Feedback",
    status: "Planned",
    priority: "Low",
    description: "Inline alert messages",
    features: [
      "4 Status types (Success, Info, Warning, Error)",
      "Closable with callback",
      "Icon support",
      "Title and Description layout",
      "Banner mode (full width)",
    ],
  },
  {
    name: "Slider",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Range slider input",
    features: [
      "Dual range support",
      "Vertical mode",
      "Custom marks and steps",
      "Tooltip formatting",
      "Input field sync",
    ],
  },
  {
    name: "Switch",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Toggle switch",
    features: [
      "Loading state",
      "Icon/Text labels inside",
      "Size variants (sm, md, lg)",
      "Custom background colors",
    ],
  },

  {
    name: "Table",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Data table component",
    features: [
      "Sort, Filter, and Search",
      "Pagination & Infinite Scroll",
      "Row Selection (Single/Multi)",
      "Expandable Rows",
      "Custom Column Rendering",
    ],
  },
  {
    name: "Tree",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Hierarchical tree view",
    features: [
      "Drag and Drop nodes",
      "Checkable nodes",
      "Custom icons",
      "Virtual scrolling",
      "Search/Filter nodes",
    ],
  },
  {
    name: "Timeline",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Vertical or horizontal event display",
    features: [
      "Alternate and Right/Left modes",
      "Custom dot nodes",
      "Pending state",
      "Label support",
    ],
  },
  {
    name: "List",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Styled list containers",
    features: [
      "Header/Footer support",
      "Grid layout mode",
      "Item actions",
      "Virtual list support",
      "Load more wrapper",
    ],
  },
  {
    name: "Steps",
    category: "Navigation",
    status: "Planned",
    priority: "Low",
    description: "Navigation stepper",
    features: [
      "Vertical and Horizontal modes",
      "Clickable steps",
      "Status (wait, process, finish, error)",
      "Custom icons and dot style",
    ],
  },
  {
    name: "Rating",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Star/Icon rating input",
    features: [
      "Half-star support",
      "Custom characters/icons",
      "Read-only mode",
      "Tooltip headers",
      "Clearable",
    ],
  },
  {
    name: "Carousel",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Content slider",
    features: [
      "Autoplay & Infinite loop",
      "Touch/Swipe support",
      "Custom arrows/indicators",
      "Fade transition",
      "Multiple items per slide",
    ],
  },
  {
    name: "Transfer",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Double-list transfer interface",
    features: [
      "Search filtering",
      "One-way mode",
      "Pagination support",
      "Custom renderers",
    ],
  },
  {
    name: "Splitter",
    category: "Layout",
    status: "Planned",
    priority: "Low",
    description: "Resizable layout panes",
    features: [
      "Vertical/Horizontal split",
      "Min/Max styling",
      "Nested splitters",
      "Collapse to edge",
    ],
  },
  {
    name: "ScrollArea",
    category: "Layout",
    status: "Planned",
    priority: "Low",
    description: "Custom cross-browser scrollbars",
    features: [
      "Auto-hide mode",
      "Horizontal/Vertical",
      "Themed styling",
      "Corner smoothing",
    ],
  },
  {
    name: "Tour",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Guided onboarding steps",
    features: [
      "Mask/Spotlight effect",
      "Step flow control",
      "Custom placement",
      "Scroll into view",
    ],
  },
  {
    name: "Empty",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Empty state placeholders",
    features: [
      "Predefined images",
      "Custom description/actions",
      "Simple mode",
    ],
  },
  {
    name: "Result",
    category: "Feedback",
    status: "Planned",
    priority: "Low",
    description: "Success/Error feedback pages",
    features: [
      "403, 404, 500, Success templates",
      "Custom icon/image",
      "Action buttons area",
    ],
  },
  {
    name: "Watermark",
    category: "Data Display",
    status: "Planned",
    priority: "Low",
    description: "Security/Copyright overlays",
    features: [
      "Text or Image pattern",
      "Rotate/Offset/Gap control",
      "Font styling",
      "Multi-line support",
    ],
  },
  {
    name: "ColorPicker",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Hex and Gradient color selection",
    features: [
      "Hex, RGB, HSB inputs",
      "Alpha channel support",
      "Preset palettes",
      "Eye dropper API",
    ],
  },
  {
    name: "Mentions",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Input with @mention support",
    features: [
      "Async user loading",
      "Custom trigger characters (#, @)",
      "Option grouping",
      "Placement control",
    ],
  },
  {
    name: "SignaturePad",
    category: "Data Entry",
    status: "Planned",
    priority: "Low",
    description: "Digital signature canvas",
    features: [
      "Pen color/width control",
      "Image export (PNG/JPG)",
      "Undo/Clear actions",
      "Smooth line interpolation",
    ],
  },
];

export const getStats = () => {
  const total = ROADMAP_DATA.length;
  const completed = ROADMAP_DATA.filter((i) => i.status === "Completed").length;
  const highPriority = ROADMAP_DATA.filter((i) => i.priority === "High").length;
  const mediumPriority = ROADMAP_DATA.filter(
    (i) => i.priority === "Medium"
  ).length;
  const lowPriority = ROADMAP_DATA.filter((i) => i.priority === "Low").length;

  return { total, completed, highPriority, mediumPriority, lowPriority };
};

export const getCategoryStats = () => {
  const categories: Category[] = [
    "General",
    "Layout",
    "Navigation",
    "Data Entry",
    "Data Display",
    "Feedback",
    "Configuration",
    "Utilities",
  ];

  return categories
    .map((cat) => ({
      name: cat,
      completed: ROADMAP_DATA.filter(
        (i) => i.category === cat && i.status === "Completed"
      ).length,
      total: ROADMAP_DATA.filter((i) => i.category === cat).length,
    }))
    .sort((a, b) => b.total - a.total);
};
