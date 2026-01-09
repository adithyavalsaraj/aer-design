import { CommandPalette } from "@/components/CommandPalette";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
  UsageGuidelines,
} from "@/docs/components/shared";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  Terminal,
  User,
} from "lucide-react";
import React from "react";

// --- Examples ---

const items = [
  { id: "1", title: "Profile", icon: User, category: "General" },
  { id: "2", title: "Billing", icon: CreditCard, category: "General" },
  { id: "3", title: "Settings", icon: Settings, category: "General" },
  {
    id: "4",
    title: "New Project",
    icon: Terminal,
    category: "Actions",
    onSelect: () => alert("New Project clicked"),
  },
  { id: "5", title: "Calculate", icon: Calculator, category: "actions" },
  { id: "6", title: "Calendar", icon: Calendar, category: "Apps" },
  { id: "7", title: "Search Emoji", icon: Smile, category: "Apps" },
];

const BasicExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-aer-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-aer-muted px-1.5 font-mono text-[10px] font-medium text-aer-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open
      </p>
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        placeholder="Type a command or search..."
      />
    </div>
  );
};

const AerExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="aer-vibrant-container p-8 rounded-xl flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-aer-md text-white backdrop-blur-md transition-all"
      >
        Open Aer Palette
      </button>
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        variant="aer"
        placeholder="Search with style..."
      />
    </div>
  );
};

// --- Content ---

const overview = (
  <div className="space-y-8">
    <DocSection
      id="introduction"
      title="Introduction"
      description="A fast, composable, and unstyled command menu for React."
    >
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2 text-aer-muted-foreground">
          <li>
            <strong>Fuzzy Search</strong>: Built-in fuzzy filtering for handling
            typos and partial matches.
          </li>
          <li>
            <strong>Keyboard First</strong>: Full keyboard navigation support
            (Arrows, Enter, Escape).
          </li>
          <li>
            <strong>Categorization</strong>: Group items automatically by
            category.
          </li>
          <li>
            <strong>Actionable</strong>: Support for callbacks, links, and
            custom rendering.
          </li>
          <li>
            <strong>Global Shortcut</strong>: Easily bind to global shortcuts
            like Ctrl+K.
          </li>
        </ul>
      </div>
    </DocSection>

    <DocSection id="when-to-use" title="When to Use">
      <UsageGuidelines
        do={[
          "For global search or command menus (like Spotlight or Raycast).",
          "When you have a large list of actions or navigation items.",
          "To provide power users with quick access to features.",
        ]}
        dont={[
          "For simple dropdowns or select inputs (use Select or Combobox).",
          "For critical primary navigation that requires visibility.",
        ]}
      />
    </DocSection>

    <DocSection id="basic-usage" title="Basic Usage">
      <BasicExample />
      <CodeBlock
        ts={`
import { CommandPalette } from "aer-design";
import { User, Settings } from "lucide-react";

const items = [
  { id: "1", title: "Profile", icon: User, category: "General" },
  { id: "2", title: "Settings", icon: Settings, category: "General" },
];

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle with Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandPalette 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      items={items}
    />
  );
}
        `}
        fullCode={`
import { CommandPalette } from "aer-design";
import { User, CreditCard, Settings } from "lucide-react";
import * as React from "react";

export const BasicExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const items = [
    { id: "1", title: "Profile", icon: User, category: "General" },
    { id: "2", title: "Billing", icon: CreditCard, category: "General" },
    { id: "3", title: "Settings", icon: Settings, category: "General" },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Command Palette</button>
      <CommandPalette 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        items={items}
      />
    </>
  );
};
`}
      />
    </DocSection>

    <DocSection
      id="aer-variant"
      title="The Aer Variant"
      description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
    >
      <AerExample />
      <CodeBlock
        ts={`<CommandPalette variant="aer" items={items} />`}
        fullCode={`
import { CommandPalette } from "aer-design";

export const AerExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // ... items
  
  return (
    <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-8">
      <CommandPalette 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        variant="aer"
        items={items}
      />
    </div>
  );
};
`}
      />
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          <strong>Pro tip:</strong> The Aer variant for CommandPalette works
          best with a dark overlay or on top of complex, colorful interfaces
          (like dashboards) where the
          <strong>glassmorphism</strong> effect can blur the content behind it,
          providing context while maintaining focus.
        </p>
      </div>
    </DocSection>

    <DocSection id="custom-rendering" title="Custom Rendering">
      <p className="text-aer-muted-foreground mb-4">
        You can customize how items are rendered using the `renderItem` prop.
        ensuring flexibility for displaying avatars, shortcuts, or tags.
      </p>
      <CodeBlock
        ts={`
<CommandPalette
  renderItem={(item, active) => (
    <div className={cn("flex items-center justify-between p-2", active && "bg-aer-accent")}>
      <span className="font-bold">{item.title}</span>
      <Badge variant="outline">{item.category}</Badge>
    </div>
  )}
/>
`}
        fullCode={`/* See Basic Usage for full context */`}
      />
    </DocSection>

    <DocSection id="shortcuts" title="Customizing Shortcuts">
      <p className="text-aer-muted-foreground mb-4">
        CommandPalette is a controlled component, meaning you are responsible
        for its open state. This gives you complete freedom to bind it to any
        keyboard shortcut using standard React hooks or our `useShortcut`
        utility.
      </p>
      <CodeBlock
        ts={`
// Using standard useEffect
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen((open) => !open);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

// OR using aer-design's useShortcut
useShortcut("Ctrl+K", () => setIsOpen(true));
`}
        fullCode={`/* See Basic Usage for full context */`}
      />
    </DocSection>

    <DocSection id="filtering" title="Filtering & Groups">
      <p className="text-aer-muted-foreground mb-4">
        The component automatically handles:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-aer-muted-foreground">
        <li>
          <strong>Smart Fuzzy Search</strong>: Advanced scoring algorithm
          matches items by title, description, and keywords. Handles typos
          (e.g., "sttings" finds "Settings") and prioritizes exact matches.
        </li>
        <li>
          <strong>Categorization</strong>: Automatically groups items by their
          `category` property. Pass `showCategories={false}` to disable headers.
        </li>
        <li>
          <strong>Ranking</strong>: Exact matches and starts-with matches are
          prioritized over fuzzy matches.
        </li>
      </ul>
    </DocSection>

    <DocSection id="accessibility" title="Accessibility First">
      <p className="text-aer-muted-foreground">
        CommandPalette is built with accessibility in mind:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-aer-muted-foreground">
        <li>
          <strong>Role Management</strong>: Uses `dialog` and `listbox` roles.
        </li>
        <li>
          <strong>Focus Trapping</strong>: Focus is trapped within the modal
          when open.
        </li>
        <li>
          <strong>Aria Attributes</strong>: Properly managed `aria-expanded`,
          `aria-activedescendant`, and `aria-label`.
        </li>
        <li>
          <strong>Screen Reader</strong>: Announcing selected items and filter
          results.
        </li>
      </ul>
    </DocSection>
  </div>
);

const api = (
  <div className="space-y-8">
    <DocSection id="component-props" title="Component Props">
      <ApiTable
        data={[
          {
            prop: "isOpen",
            type: "boolean",
            default: "false",
            description: "Controls the visibility of the command palette.",
          },
          {
            prop: "onClose",
            type: "() => void",
            default: "-",
            description: "Callback fired when the palette should be closed.",
          },
          {
            prop: "items",
            type: "CommandItem[]",
            default: "[]",
            description: "Array of items to search and display.",
          },
          {
            prop: "variant",
            type: '"default" | "aer"',
            default: '"default"',
            description: "Visual style variant of the palette.",
          },
          {
            prop: "placeholder",
            type: "string",
            default: '"Type a command or search..."',
            description: "Placeholder text for the search input.",
          },
          {
            prop: "renderItem",
            type: "(item: CommandItem, active: boolean) => ReactNode",
            default: "-",
            description: "Custom renderer for command items.",
          },
          {
            prop: "overlayClassName",
            type: "string",
            default: "-",
            description: "Class name for the backdrop overlay.",
          },
          {
            prop: "contentClassName",
            type: "string",
            default: "-",
            description: "Class name for the modal content container.",
          },
        ]}
      />
    </DocSection>

    <DocSection id="types" title="Types">
      <h3 className="text-lg font-medium mb-2">CommandItem</h3>
      <CodeBlock
        ts={`
interface CommandItem {
  id: string | number;
  title: string;
  description?: string;
  keywords?: string[];
  category?: string;
  icon?: LucideIcon | React.ReactNode;
  matches?: string[]; // Internal search matches
  onSelect?: (item: CommandItem) => void;
  url?: string; // Auto-navigation URL
  disabled?: boolean;
}
`}
        fullCode=""
      />
    </DocSection>
  </div>
);

const theming = (
  <div className="space-y-8">
    <DocSection id="css-variables" title="CSS Variables">
      <ApiTable
        data={[
          {
            prop: "--aer-background",
            type: "Color",
            default: "255 255 255",
            description: "Background color of the palette.",
          },
          {
            prop: "--aer-foreground",
            type: "Color",
            default: "15 23 42",
            description: "Text color.",
          },
          {
            prop: "--aer-border",
            type: "Color",
            default: "226 232 240",
            description: "Border color.",
          },
          {
            prop: "--aer-muted",
            type: "Color",
            default: "241 245 249",
            description:
              "Background for categorization headers and muted elements.",
          },
        ]}
      />
    </DocSection>
  </div>
);

export const CommandPaletteDoc = () => {
  return (
    <DocTabs
      tabs={[
        {
          id: "overview",
          label: "Overview",
          content: overview,
          toc: [
            { id: "introduction", title: "Introduction" },
            { id: "when-to-use", title: "When to Use" },
            { id: "basic-usage", title: "Basic Usage" },
            { id: "aer-variant", title: "The Aer Variant" },
            { id: "shortcuts", title: "Customizing Shortcuts" },
            { id: "filtering", title: "Filtering & Groups" },
            { id: "custom-rendering", title: "Custom Rendering" },
            { id: "accessibility", title: "Accessibility First" },
          ],
        },
        {
          id: "api",
          label: "API",
          content: api,
          toc: [
            { id: "component-props", title: "Component Props" },
            { id: "types", title: "Types" },
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
  );
};
