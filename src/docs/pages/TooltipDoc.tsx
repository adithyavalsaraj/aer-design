import { Button } from "@/components/Button";
import { Tooltip } from "@/components/Tooltip";
import {
  AlertCircle,
  Copy,
  HelpCircle,
  Info,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function TooltipDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="Contextual information on hover or click."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Tooltip component displays helpful information when users hover
            over or click an element. It features intelligent auto-positioning
            to ensure tooltips are always visible within the viewport.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Auto-positioning</strong> - Automatically adjusts position
              to stay within viewport
            </li>
            <li>
              <strong>Multiple variants</strong> - Default, dark, and light
              styles
            </li>
            <li>
              <strong>Trigger modes</strong> - Hover (default) or click to show
            </li>
            <li>
              <strong>Configurable delays</strong> - Control show/hide timing
            </li>
            <li>
              <strong>Full accessibility</strong> - Keyboard support and proper
              ARIA attributes
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Best practices for tooltip usage."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Use tooltips when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>Providing brief, supplementary information</li>
              <li>Explaining icon-only buttons or controls</li>
              <li>Showing keyboard shortcuts</li>
              <li>Displaying truncated text in full</li>
              <li>Adding context to form fields</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Avoid tooltips when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>Information is critical to task completion</li>
              <li>Content is lengthy or complex (use popover instead)</li>
              <li>On mobile devices (use click trigger or alternatives)</li>
              <li>Repeating visible label text</li>
              <li>Containing interactive elements</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Simple hover tooltip."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="This is a helpful tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function BasicTooltip() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Variants"
        id="variants"
        description="Different visual styles for tooltips."
      >
        <div className="flex flex-wrap items-center justify-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="Default variant" variant="default">
            <Button variant="outline">Default</Button>
          </Tooltip>
          <Tooltip content="Dark variant" variant="dark">
            <Button variant="outline">Dark</Button>
          </Tooltip>
          <Tooltip content="Light variant" variant="light">
            <Button variant="outline">Light</Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`<Tooltip content="Default variant" variant="default">
  <Button>Default</Button>
</Tooltip>

<Tooltip content="Dark variant" variant="dark">
  <Button>Dark</Button>
</Tooltip>

<Tooltip content="Light variant" variant="light">
  <Button>Light</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipVariants() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Default variant" variant="default">
        <Button variant="outline">Default</Button>
      </Tooltip>
      
      <Tooltip content="Dark variant" variant="dark">
        <Button variant="outline">Dark</Button>
      </Tooltip>
      
      <Tooltip content="Light variant" variant="light">
        <Button variant="outline">Light</Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Our signature glassmorphism effect for premium interfaces."
      >
        <div className="aer-vibrant-container p-24">
          <div className="aer-vibrant-bg-wrapper">
            <div className="aer-vibrant-bg" />
            <div className="aer-vibrant-blob top-1/2 left-1/3 w-32 h-32 bg-sky-500/30" />
          </div>

          <div className="relative z-10">
            <Tooltip content="Glassmorphism Tooltip" variant="aer">
              <Button variant="aer">Hover Me</Button>
            </Tooltip>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="bg-zinc-950 p-12 rounded-xl relative overflow-hidden">
  <Tooltip content="Glassmorphism Tooltip" variant="aer">
    <Button variant="aer">Hover Me</Button>
  </Tooltip>
</div>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function AerTooltipExample() {
  return (
    <div className="relative flex items-center justify-center p-24 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sky-600/20 via-transparent to-blue-600/20" />
      
      <div className="relative z-10">
        <Tooltip content="Glassmorphism Tooltip" variant="aer">
          <Button variant="aer">Hover Me</Button>
        </Tooltip>
      </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant provides a subtle,
            crystalline effect for contextual hints. Use it when tooltips need
            to stand out on dark, textured, or high-vibrancy backgrounds without
            visually cluttering the interface.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Positioning"
        id="positioning"
        description="Control tooltip placement around the trigger."
      >
        <div className="flex flex-col items-center gap-8 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="Top tooltip" side="top">
            <Button variant="outline">Top</Button>
          </Tooltip>
          <div className="flex gap-8">
            <Tooltip content="Left tooltip" side="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" side="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" side="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipPositioning() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" side="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
      
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Auto-positioning:</strong> Tooltips automatically adjust
            their position if there isn't enough space in the preferred
            direction. Try scrolling to the edge of the viewport!
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Alignment"
        id="alignment"
        description="Align tooltips relative to the trigger element."
      >
        <div className="flex flex-col gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="Start aligned" side="bottom" align="start">
            <Button variant="outline" className="w-48">
              Align Start
            </Button>
          </Tooltip>
          <Tooltip content="Center aligned" side="bottom" align="center">
            <Button variant="outline" className="w-48">
              Align Center
            </Button>
          </Tooltip>
          <Tooltip content="End aligned" side="bottom" align="end">
            <Button variant="outline" className="w-48">
              Align End
            </Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`<Tooltip content="Start aligned" side="bottom" align="start">
  <Button>Align Start</Button>
</Tooltip>

<Tooltip content="Center aligned" side="bottom" align="center">
  <Button>Align Center</Button>
</Tooltip>

<Tooltip content="End aligned" side="bottom" align="end">
  <Button>Align End</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipAlignment() {
  return (
    <div className="flex flex-col gap-4">
      <Tooltip content="Start aligned" side="bottom" align="start">
        <Button variant="outline" className="w-48">Align Start</Button>
      </Tooltip>
      
      <Tooltip content="Center aligned" side="bottom" align="center">
        <Button variant="outline" className="w-48">Align Center</Button>
      </Tooltip>
      
      <Tooltip content="End aligned" side="bottom" align="end">
        <Button variant="outline" className="w-48">Align End</Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Trigger Modes"
        id="trigger"
        description="Control how tooltips are activated."
      >
        <div className="flex flex-wrap items-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="Hover to see this tooltip" trigger="hover">
            <Button variant="outline">Hover Trigger</Button>
          </Tooltip>
          <Tooltip content="Click to see this tooltip" trigger="click">
            <Button variant="outline">Click Trigger</Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`// Hover trigger (default)
<Tooltip content="Hover to see this" trigger="hover">
  <Button>Hover Trigger</Button>
</Tooltip>

// Click trigger
<Tooltip content="Click to see this" trigger="click">
  <Button>Click Trigger</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipTriggers() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Hover to see this tooltip" trigger="hover">
        <Button variant="outline">Hover Trigger</Button>
      </Tooltip>
      
      <Tooltip content="Click to see this tooltip" trigger="click">
        <Button variant="outline">Click Trigger</Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Delay Configuration"
        id="delay"
        description="Control show and hide delays."
      >
        <div className="flex flex-wrap items-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Tooltip content="Instant tooltip" showDelay={0} hideDelay={0}>
            <Button variant="outline">Instant</Button>
          </Tooltip>
          <Tooltip content="Default delay (200ms)" showDelay={200}>
            <Button variant="outline">Default</Button>
          </Tooltip>
          <Tooltip content="Slow tooltip" showDelay={500} hideDelay={200}>
            <Button variant="outline">Slow</Button>
          </Tooltip>
        </div>
        <CodeBlock
          ts={`// Instant
<Tooltip content="Instant" showDelay={0} hideDelay={0}>
  <Button>Instant</Button>
</Tooltip>

// Default (200ms show delay)
<Tooltip content="Default">
  <Button>Default</Button>
</Tooltip>

// Slow (500ms show, 200ms hide)
<Tooltip content="Slow" showDelay={500} hideDelay={200}>
  <Button>Slow</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipDelays() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Instant tooltip" showDelay={0} hideDelay={0}>
        <Button variant="outline">Instant</Button>
      </Tooltip>
      
      <Tooltip content="Default delay (200ms)" showDelay={200}>
        <Button variant="outline">Default</Button>
      </Tooltip>
      
      <Tooltip content="Slow tooltip" showDelay={500} hideDelay={200}>
        <Button variant="outline">Slow</Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Customize the tooltip bubble and arrow with utility classes."
      >
        <div className="flex flex-wrap items-center justify-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <TooltipStylingExample />
        </div>
        <CodeBlock
          ts={`<Tooltip
  content="Custom bubble style"
  className="bg-sky-600 text-white border-0 shadow-xl"
>
  <Button variant="outline">Custom Style</Button>
</Tooltip>

<Tooltip
  content="Large text"
  className="text-lg px-4 py-2 font-bold"
>
  <Button variant="outline">Large Text</Button>
</Tooltip>`}
          fullCode={`import { Tooltip, Button } from "aer-design";

export default function TooltipStyling() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content="Custom bubble style"
        className="bg-sky-600 text-white border-0 shadow-xl"
      >
        <Button variant="outline">Custom Color</Button>
      </Tooltip>

      <Tooltip
        content="Large text tooltip"
        className="text-lg px-4 py-2 font-bold"
      >
        <Button variant="outline">Typography</Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="Interactive toolbar with contextual tooltips."
      >
        <div className="flex justify-center p-8 border border-aer-border rounded-xl bg-aer-muted/10">
          <DemoToolbar />
        </div>
        <CodeBlock
          ts={`<div className="flex gap-2">
  <Tooltip content="Copy">
    <Button variant="ghost" size="sm"><Copy /></Button>
  </Tooltip>
  
  <Tooltip content="Delete" variant="dark">
    <Button variant="ghost" size="sm" className="text-red-500"><Trash2 /></Button>
  </Tooltip>

  <Tooltip content="Help" trigger="click" variant="light">
    <Button variant="ghost" size="sm"><HelpCircle /></Button>
  </Tooltip>
</div>`}
          fullCode={`import { Tooltip, Button } from "aer-design";
import { Copy, Trash2, Settings, Info, User, HelpCircle } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm">
      <Tooltip content="Copy to clipboard" side="bottom">
        <Button variant="ghost" size="sm">
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip>
      
      <Tooltip content="Delete item" variant="dark" side="bottom">
        <Button variant="ghost" size="sm">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </Tooltip>
      
      <div className="w-px h-6 bg-gray-200" />
      
      <Tooltip content="User profile" side="bottom">
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </Tooltip>
      
      <Tooltip content="Settings" side="bottom">
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>
      
      <Tooltip 
        content="Need help? Click for documentation" 
        trigger="click"
        variant="light"
        side="bottom"
      >
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </Tooltip>
      
      <Tooltip 
        content="This feature is currently in beta"
        variant="default"
        side="bottom"
      >
        <Button variant="ghost" size="sm">
          <Info className="w-4 h-4 text-blue-500" />
        </Button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  function TooltipStylingExample() {
    return (
      <div className="flex gap-4">
        <Tooltip
          content="Custom bubble style"
          className="bg-sky-600 text-white border-0 shadow-xl"
        >
          <Button variant="outline">Custom Color</Button>
        </Tooltip>

        <Tooltip
          content="Large text tooltip"
          className="text-lg px-4 py-2 font-bold"
        >
          <Button variant="outline">Typography</Button>
        </Tooltip>
      </div>
    );
  }

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="tooltip-props" className="text-lg font-bold mb-4">
          TooltipProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the Tooltip component.
        </p>
        <ApiTable
          data={[
            {
              prop: "content",
              type: "ReactNode",
              default: "-",
              description: "The content to display in the tooltip.",
            },
            {
              prop: "children",
              type: "ReactElement",
              default: "-",
              description: "The element that triggers the tooltip.",
            },
            {
              prop: "side",
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'top'",
              description:
                "Preferred side of the trigger to display the tooltip. Auto-adjusts if space is limited.",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: "Alignment relative to the trigger element.",
            },
            {
              prop: "variant",
              type: "'default' | 'dark' | 'light'",
              default: "'default'",
              description: "Visual style variant of the tooltip.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "8",
              description: "Distance in pixels from the trigger element.",
            },
            {
              prop: "showDelay",
              type: "number",
              default: "200",
              description: "Delay in milliseconds before showing the tooltip.",
            },
            {
              prop: "hideDelay",
              type: "number",
              default: "0",
              description: "Delay in milliseconds before hiding the tooltip.",
            },
            {
              prop: "trigger",
              type: "'hover' | 'click'",
              default: "'hover'",
              description:
                "How the tooltip is triggered. Hover for desktop, click for mobile-friendly.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable the tooltip completely.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the tooltip container.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="usage-guide" className="text-lg font-bold mb-4">
          Usage Guide
        </h3>
        <div className="space-y-4 text-sm text-aer-muted-foreground">
          <div>
            <h4 className="font-semibold text-aer-foreground mb-2">
              Auto-Positioning
            </h4>
            <p>
              Tooltips automatically adjust their position using the{" "}
              <code className="text-xs bg-aer-muted px-1 rounded">
                calculateOptimalPosition
              </code>{" "}
              utility. If the preferred <code>side</code> doesn't have enough
              space, the tooltip will flip to the opposite side or adjust
              alignment to stay within the viewport.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-aer-foreground mb-2">
              Accessibility
            </h4>
            <p>
              Tooltips include proper ARIA attributes (
              <code className="text-xs bg-aer-muted px-1 rounded">
                aria-describedby
              </code>
              ) and keyboard support. Press <kbd>Escape</kbd> to close any open
              tooltip. Focus and blur events trigger tooltips for keyboard
              users.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-aer-foreground mb-2">
              Mobile Considerations
            </h4>
            <p>
              For mobile devices, consider using{" "}
              <code className="text-xs bg-aer-muted px-1 rounded">
                trigger="click"
              </code>{" "}
              since hover interactions don't work well on touch screens.
              Alternatively, use a Popover component for more complex
              interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize tooltip appearance with CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Tooltips use the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`/* Tooltip colors */
--aer-popover: /* Background for default variant */
--aer-popover-foreground: /* Text color for default variant */
--aer-border: /* Border color */

/* Shadows */
--shadow-lg: /* Tooltip shadow */`}
          fullCode={`/* Light mode */
:root {
  --aer-popover: 0 0% 100%;
  --aer-popover-foreground: 222.2 84% 4.9%;
  --aer-border: 214.3 31.8% 91.4%;
}

/* Dark mode */
.dark {
  --aer-popover: 222.2 84% 4.9%;
  --aer-popover-foreground: 210 40% 98%;
  --aer-border: 217.2 32.6% 17.5%;
}

/* Custom tooltip styling */
.my-tooltip {
  --aer-popover: 220 13% 95%;
  --aer-popover-foreground: 220 9% 20%;
}`}
        />
        <div className="mt-4 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
          <p className="text-sm text-sky-700 dark:text-sky-400">
            <strong>Tip:</strong> Use the <code>variant</code> prop for
            pre-defined styles, or apply custom classes via{" "}
            <code>className</code> for complete control.
          </p>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Auto-Contrast:</strong> When the global{" "}
            <code className="text-xs bg-blue-500/20 px-1 rounded">
              autoContrast
            </code>{" "}
            setting is enabled, this component will automatically adjust its
            text color to ensure WCAG compliance when a custom background color
            is applied via the <code>style</code> prop.
          </p>
        </div>
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tooltip
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Display contextual information on hover or click with intelligent
          positioning.
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
              { id: "variants", title: "Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "positioning", title: "Positioning" },
              { id: "alignment", title: "Alignment" },
              { id: "trigger", title: "Trigger Modes" },
              { id: "delay", title: "Delay Configuration" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "tooltip-props", title: "TooltipProps" },
              { id: "usage-guide", title: "Usage Guide" },
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

// --- Demo Component ---

function DemoToolbar() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-aer-background border border-aer-border rounded-lg shadow-sm">
      <Tooltip
        content={copied ? "Copied!" : "Copy to clipboard"}
        side="bottom"
        variant="dark"
      >
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            <span>Delete item permanently</span>
          </div>
        }
        variant="dark"
        side="bottom"
      >
        <Button variant="ghost" size="sm">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </Tooltip>

      <div className="w-px h-6 bg-aer-border" />

      <Tooltip content="User profile" side="bottom">
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Application settings" side="bottom">
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip
        content="Click for help documentation"
        trigger="click"
        variant="light"
        side="bottom"
      >
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip
        content={
          <div className="max-w-xs">
            <p className="font-semibold mb-1">Beta Feature</p>
            <p className="text-xs opacity-90">
              This feature is currently in beta. Report any issues to our
              support team.
            </p>
          </div>
        }
        variant="default"
        side="bottom"
      >
        <Button variant="ghost" size="sm">
          <Info className="w-4 h-4 text-blue-500" />
        </Button>
      </Tooltip>
    </div>
  );
}
