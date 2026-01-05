import { useAerConfig } from "@/components/AerConfigProvider";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { useContrastColor } from "@/hooks";
import { getContrastRatio, meetsWCAG } from "@/lib/contrast";
import { Check, Globe, Monitor, Settings, Type, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function UtilitiesDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="Global configuration and state management for Aer Design."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The <code>AerConfigProvider</code> is the heart of your
            application's global state. It manages cross-cutting concerns like
            text direction (RTL/LTR), global component sizing, and persistence
            of user preferences.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Global Direction</strong> - First-class RTL support
              tailored for international apps
            </li>
            <li>
              <strong>Global Sizing</strong> - Control the density of all
              components from a single source
            </li>
            <li>
              <strong>Persistence</strong> - Automatically saves user
              preferences to localStorage
            </li>
            <li>
              <strong>Context Hook</strong> - Access and modify settings
              anywhere with <code>useAerConfig</code>
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Understand when to interact with the global configuration."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              App Initialization
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                AerConfigProvider
              </code>{" "}
              at the root of your application (in <code>App.tsx</code> or{" "}
              <code>layout.tsx</code>) to initialize the design system.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              User Settings
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                useAerConfig
              </code>{" "}
              to build settings panels allowing users to toggle Dark Mode, RTL,
              or UI Density.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Wrap your app with the provider to enable global features."
      >
        <CodeBlock
          ts={`import { AerConfigProvider } from "aer-design";
// Wrap your app root
<AerConfigProvider defaultDirection="ltr" defaultSize="default">
  <App />
</AerConfigProvider>`}
          fullCode={`import { AerConfigProvider } from "aer-design";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    // Initialize Aer Design system
    <AerConfigProvider 
      defaultDirection="ltr" 
      defaultSize="default"
      disablePersistence={false}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AerConfigProvider>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Direction (RTL)"
        id="direction"
        description="Native support for Right-to-Left languages."
      >
        <div className="space-y-4">
          <p className="text-sm text-aer-muted-foreground">
            Toggling direction updates the <code>dir</code> attribute on the{" "}
            <code>html</code> tag, automatically flipping layouts for all Aer
            components and Tailwind utilities (<code>pl-*</code> becomes{" "}
            <code>pr-*</code>, etc.).
          </p>
          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex flex-col gap-4">
            <DemoDirectionToggle />
          </div>
          <CodeBlock
            ts={`const { direction, toggleDirection } = useAerConfig();

<Button onClick={toggleDirection}>
  Current: {direction.toUpperCase()}
</Button>`}
            fullCode={`import { useAerConfig, Button } from "aer-design";

export default function DirectionToggle() {
  const { direction, toggleDirection } = useAerConfig();

  return (
    <div className="flex items-center gap-4">
      <div className="p-4 bg-white border rounded shadow-sm">
        <p>Current Layout: <strong>{direction === 'rtl' ? 'Right-to-Left' : 'Left-to-Right'}</strong></p>
      </div>
      <Button onClick={toggleDirection}>
        Switch to {direction === 'rtl' ? 'LTR' : 'RTL'}
      </Button>
    </div>
  );
}`}
          />
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>Note:</strong> Clicking the demo button above will toggle
              the direction for this entire documentation site!
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Global Sizing"
        id="sizing"
        description="Control the density of your interface globally."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Setting the global size affects the default size of Buttons, Inputs,
          and other interactive elements. It's perfect for creating "Compact" or
          "Touch-friendly" modes.
        </p>
        <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <DemoSizeControl />
        </div>
        <CodeBlock
          ts={`const { size, setSize } = useAerConfig();

<Button onClick={() => setSize("sm")}>Compact</Button>
<Button onClick={() => setSize("default")}>Default</Button>
<Button onClick={() => setSize("lg")}>Large</Button>`}
          fullCode={`import { useAerConfig, Button, Input } from "aer-design";

export default function DensityControl() {
  const { size, setSize } = useAerConfig();

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['sm', 'default', 'lg'] as const).map((s) => (
          <Button 
            key={s} 
            variant={size === s ? "default" : "outline"}
            onClick={() => setSize(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      
      <div className="p-4 border rounded bg-white space-y-4">
        <p className="font-bold">Preview ({size})</p>
        <div className="flex gap-2">
          <Button>Action</Button>
          <Input placeholder="Type something..." />
        </div>
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="A comprehensive User Settings panel."
      >
        <div className="flex justify-center p-8 border border-aer-border rounded-xl bg-aer-muted/10">
          <DemoSettingsPanel />
        </div>
        <CodeBlock
          ts={`function SettingsPanel() {
  const { direction, toggleDirection, size, setSize } = useAerConfig();

  return (
    <div className="p-6 border rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <span>RTL Mode</span>
        <Button onClick={toggleDirection}>
          {direction === 'rtl' ? 'On' : 'Off'}
        </Button>
      </div>

      <div className="space-y-2">
        <span>Density</span>
        <div className="flex gap-2">
          {['sm', 'default', 'lg'].map((s) => (
            <Button 
              key={s} 
              variant={size === s ? "default" : "outline"}
              onClick={() => setSize(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}`}
          fullCode={`import { useAerConfig, Button, Switch, Label } from "aer-design";
import { Moon, Sun, Globe, Monitor } from "lucide-react";

export default function SettingsPanel() {
  const { direction, toggleDirection, size, setSize } = useAerConfig();

  return (
    <div className="w-80 p-6 bg-white border rounded-xl shadow-lg space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold">Interface Settings</h3>
          <p className="text-xs text-gray-500">Customize your workspace</p>
        </div>
      </div>

      {/* Direction Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">RTL Mode</span>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={toggleDirection}
        >
          {direction === 'rtl' ? 'On' : 'Off'}
        </Button>
      </div>

      {/* Density Control */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Density</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['sm', 'default', 'lg'].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s as any)}
              className={\`px-2 py-1 text-xs rounded border transition-colors \${
                size === s 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'hover:bg-gray-50'
              }\`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Automatic Contrast"
        id="automatic-contrast"
        description="WCAG 2.1 compliant text color calculation for accessible interfaces."
      >
        <AutomaticContrastDemo />
      </DocSection>

      <DocSection
        title="Theme Validation"
        id="theme-validation"
        description="Validate contrast ratios of your current theme colors."
      >
        <ThemePaletteValidator />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="provider-props" className="text-lg font-bold mb-4">
          AerConfigProviderProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the root configuration provider.
        </p>
        <ApiTable
          data={[
            {
              prop: "children",
              type: "ReactNode",
              default: "-",
              description: "The application content to be wrapped.",
            },
            {
              prop: "defaultDirection",
              type: "'ltr' | 'rtl'",
              default: "'ltr'",
              description:
                "Initial text direction if no saved preference is found.",
            },
            {
              prop: "defaultSize",
              type: "'sm' | 'default' | 'lg'",
              default: "'default'",
              description:
                "Initial density size if no saved preference is found.",
            },
            {
              prop: "defaultAutoContrast",
              type: "boolean",
              default: "false",
              description:
                "Initial auto-contrast state if no saved preference is found.",
            },
            {
              prop: "disablePersistence",
              type: "boolean",
              default: "false",
              description:
                "If true, settings will not be saved to or read from localStorage.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="hook-return" className="text-lg font-bold mb-4">
          useAerConfig Return Value
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The object returned by the <code>useAerConfig</code> hook.
        </p>
        <ApiTable
          data={[
            {
              prop: "direction",
              type: "'ltr' | 'rtl'",
              default: "-",
              description: "Current text direction.",
            },
            {
              prop: "toggleDirection",
              type: "() => void",
              default: "-",
              description: "Function to switch between LTR and RTL.",
            },
            {
              prop: "setDirection",
              type: "(dir: Direction) => void",
              default: "-",
              description: "Function to set a specific direction.",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "-",
              description: "Current component size density.",
            },
            {
              prop: "setSize",
              type: "(size: Size) => void",
              default: "-",
              description: "Function to set global size.",
            },
            {
              prop: "autoContrast",
              type: "boolean",
              default: "-",
              description: "Current auto-contrast state.",
            },
            {
              prop: "setAutoContrast",
              type: "(enabled: boolean) => void",
              default: "-",
              description: "Function to set auto-contrast state.",
            },
            {
              prop: "toggleAutoContrast",
              type: "() => void",
              default: "-",
              description: "Function to toggle auto-contrast.",
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
      description="How global configuration interacts with CSS."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          The <code>AerConfigProvider</code> mainly manages the <code>dir</code>{" "}
          attribute on the document root. However, the sizing preferences may
          affect component variables.
        </p>
        <CodeBlock
          ts={`/* No specific variables for the provider itself. 
It controls html[dir="rtl"] and component classes. */`}
          fullCode={`/* Example of RTL CSS override if needed */
html[dir="rtl"] {
  /* RTL specific overrides */
  --font-family: 'Amiri', serif; /* Example Arabic font */
}`}
        />
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            <strong>Tip:</strong> You typically don't need to touch CSS
            variables for direction/sizing as Aer Design components handle them
            automatically.
          </p>
        </div>
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Utilities
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Global configuration, internationalization, and density control.
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
              { id: "direction", title: "Direction (RTL)" },
              { id: "sizing", title: "Global Sizing" },
              { id: "real-world", title: "Real World Example" },
              { id: "automatic-contrast", title: "Automatic Contrast" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "provider-props", title: "AerConfigProviderProps" },
              { id: "hook-return", title: "useAerConfig Return" },
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

// --- Demo Components ---

function DemoDirectionToggle() {
  const { direction, toggleDirection } = useAerConfig();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-aer-primary/10 rounded-md">
          <Globe className="size-5 text-aer-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Current Direction</p>
          <p className="text-xs text-aer-muted-foreground uppercase tracking-widest">
            {direction}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={toggleDirection}>
        Toggle Direction
      </Button>
    </div>
  );
}

function DemoSizeControl() {
  const { size, setSize } = useAerConfig();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-aer-primary/10 rounded-md">
          <Type className="size-5 text-aer-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Interface Density</p>
          <p className="text-xs text-aer-muted-foreground">Current: {size}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["sm", "default", "lg"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={size === s ? "default" : "outline"}
            onClick={() => setSize(s)}
          >
            {s === "sm" ? "Small" : s === "default" ? "Default" : "Large"}
          </Button>
        ))}
      </div>

      <div className="p-4 border border-aer-border rounded bg-aer-background space-y-4">
        <p className="text-xs font-bold text-aer-muted-foreground uppercase">
          Preview
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Primary Action</Button>
          <Button variant="outline">Secondary</Button>
          <Checkbox label="Checkbox" checked readOnly />
        </div>
      </div>
    </div>
  );
}

function DemoSettingsPanel() {
  const {
    direction,
    toggleDirection,
    size,
    setSize,
    autoContrast,
    toggleAutoContrast,
  } = useAerConfig();

  return (
    <div className="w-72 p-5 bg-aer-background border border-aer-border rounded-xl shadow-lg space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-aer-border">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg shadow-sm">
          <Settings className="size-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm">Settings</h3>
          <p className="text-[10px] text-aer-muted-foreground">
            App Preferences
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Direction */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="size-3 text-aer-muted-foreground" />
            <span className="text-xs font-medium">RTL Support</span>
          </div>
          <button
            onClick={toggleDirection}
            className={`w-8 h-4 rounded-full transition-colors relative ${
              direction === "rtl" ? "bg-aer-primary" : "bg-aer-muted"
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                direction === "rtl" ? "left-[18px]" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Monitor className="size-3 text-aer-muted-foreground" />
            <span className="text-xs font-medium">Density</span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-aer-muted/10 p-1 rounded-lg">
            {(["sm", "default", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-1 text-[10px] font-medium rounded transition-all ${
                  size === s
                    ? "bg-aer-background text-aer-foreground shadow-sm"
                    : "text-aer-muted-foreground hover:bg-aer-muted/20"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="size-3 text-aer-muted-foreground" />
            <span className="text-xs font-medium">Auto Contrast</span>
          </div>
          <button
            onClick={toggleAutoContrast}
            className={`w-8 h-4 rounded-full transition-colors relative ${
              autoContrast ? "bg-aer-primary" : "bg-aer-muted"
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                autoContrast ? "left-[18px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function AutomaticContrastDemo() {
  const [bgColor, setBgColor] = useState("#3498db");
  const textColor = useContrastColor(bgColor);
  const contrastRatio = getContrastRatio(bgColor, textColor);
  const meetsAA = meetsWCAG(contrastRatio, "AA");
  const meetsAAA = meetsWCAG(contrastRatio, "AAA");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Background Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-20 rounded border border-aer-border cursor-pointer"
            />
            <Input
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="#3498db"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contrast Information</label>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 rounded bg-aer-muted/30">
              <span className="text-aer-muted-foreground">Text Color:</span>
              <code className="px-2 py-0.5 rounded bg-aer-background text-aer-foreground font-mono text-xs">
                {textColor}
              </code>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-aer-muted/30">
              <span className="text-aer-muted-foreground">Ratio:</span>
              <code className="px-2 py-0.5 rounded bg-aer-background text-aer-foreground font-mono text-xs">
                {contrastRatio.toFixed(2)}:1
              </code>
            </div>
            <div className="flex gap-2">
              <div
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs font-medium ${
                  meetsAA
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {meetsAA ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
                WCAG AA
              </div>
              <div
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs font-medium ${
                  meetsAAA
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {meetsAAA ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
                WCAG AAA
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-8 rounded-lg border-2 border-aer-border transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <h3 className="text-2xl font-bold mb-2">Accessible Content</h3>
        <p className="mb-4 opacity-90">
          The text color automatically adjusts to ensure readability on any
          background. Try changing the background color above to see it in
          action!
        </p>
        <div className="flex gap-2">
          <Button
            style={{ backgroundColor: bgColor, color: textColor }}
            className="border-2"
          >
            Primary Action
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>💡 Tip:</strong> The system ensures at least 4.5:1 contrast
          ratio (WCAG AA standard) for normal text. For large text (18pt+ or
          14pt+ bold), a 3:1 ratio is acceptable.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Usage Example</h4>
        <CodeBlock
          ts={`import { useContrastColor } from "aer-design";

function Card({ bgColor, children }) {
  const textColor = useContrastColor(bgColor);
  
  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

function ThemePaletteValidator() {
  const variables = [
    {
      name: "Background",
      bg: "bg-aer-background",
      fg: "text-aer-foreground",
      cssVar: "--aer-background",
    },
    {
      name: "Primary",
      bg: "bg-aer-primary",
      fg: "text-aer-primary-foreground",
      cssVar: "--aer-primary",
    },
    {
      name: "Secondary",
      bg: "bg-aer-secondary",
      fg: "text-aer-secondary-foreground",
      cssVar: "--aer-secondary",
    },
    {
      name: "Muted",
      bg: "bg-aer-muted",
      fg: "text-aer-muted-foreground",
      cssVar: "--aer-muted",
    },
    {
      name: "Accent",
      bg: "bg-aer-accent",
      fg: "text-aer-accent-foreground",
      cssVar: "--aer-accent",
    },
    {
      name: "Destructive",
      bg: "bg-aer-destructive",
      fg: "text-aer-destructive-foreground",
      cssVar: "--aer-destructive",
    },
    {
      name: "Card",
      bg: "bg-aer-card",
      fg: "text-aer-card-foreground",
      cssVar: "--aer-card",
    },
    {
      name: "Popover",
      bg: "bg-aer-popover",
      fg: "text-aer-popover-foreground",
      cssVar: "--aer-popover",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {variables.map((item) => (
        <ThemeColorCard key={item.name} item={item} />
      ))}
    </div>
  );
}

function ThemeColorCard({
  item,
}: {
  item: { name: string; bg: string; fg: string; cssVar: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("");
  const [fgColor, setFgColor] = useState("");

  useEffect(() => {
    if (ref.current) {
      const style = window.getComputedStyle(ref.current);
      setBgColor(style.backgroundColor);
      setFgColor(style.color);
    }
  }, []);

  const calculatedTextColor = useContrastColor(bgColor);

  const currentRatio =
    bgColor && fgColor ? getContrastRatio(bgColor, fgColor) : 0;
  const optimalRatio =
    bgColor && calculatedTextColor
      ? getContrastRatio(bgColor, calculatedTextColor)
      : 0;

  const meetsAA = meetsWCAG(currentRatio, "AA");

  return (
    <div
      ref={ref}
      className={`${item.bg} ${item.fg} p-4 rounded-lg border border-aer-border space-y-3 shadow-sm`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{item.name}</span>
        {meetsAA ? (
          <Check className="w-4 h-4 opacity-50" />
        ) : (
          <X className="w-4 h-4 text-red-500" />
        )}
      </div>

      <div className="space-y-1 text-xs opacity-90">
        <div className="flex justify-between">
          <span>Ratio:</span>
          <span className="font-mono">{currentRatio.toFixed(2)}:1</span>
        </div>
        <div className="flex justify-between">
          <span>Optimal:</span>
          <span className="font-mono">{optimalRatio.toFixed(2)}:1</span>
        </div>
      </div>

      {!meetsAA && (
        <div className="text-[10px] bg-red-500/10 p-1.5 rounded text-red-600 dark:text-red-400">
          Fails WCAG AA. Suggested: {calculatedTextColor}
        </div>
      )}
    </div>
  );
}
