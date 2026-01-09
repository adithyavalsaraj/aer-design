import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  usePopover,
} from "@/components/Popover";
import { RadioGroup, RadioItem } from "@/components/Radio";
import { HelpCircle, Settings, User } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function PopoverDoc() {
  // Headless Hook Example
  function HeadlessExample() {
    const popover = usePopover({
      trigger: "click",
      side: "bottom",
      align: "start",
    });

    return (
      <div className="space-y-4">
        <button
          ref={popover.anchorRef as any}
          {...popover.getAnchorProps()}
          className="px-4 py-2 bg-aer-primary text-white rounded-lg hover:bg-aer-primary/90"
        >
          Open Custom Popover
        </button>

        {popover.open && (
          <div
            ref={popover.floatingRef as any}
            {...popover.getFloatingProps()}
            style={popover.floatingStyles}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-xs z-50"
          >
            <h4 className="font-semibold mb-2">Custom Popover</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with the headless usePopover hook!
            </p>
            <button
              onClick={popover.closePopover}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  // Trigger Modes Example
  function TriggerModesExample() {
    const [trigger, setTrigger] = React.useState<
      "click" | "hover" | "focus" | ("click" | "hover" | "focus")[]
    >("click");

    return (
      <div className="space-y-6">
        <div className="p-4 bg-aer-muted/20 rounded-lg border border-aer-border">
          <label className="text-sm font-medium text-aer-foreground mb-3 block">
            Trigger Mode
          </label>
          <RadioGroup
            value={Array.isArray(trigger) ? "composite" : trigger}
            onChange={(val) => {
              if (val === "composite") {
                setTrigger(["hover", "focus"]);
              } else {
                setTrigger(val as "click" | "hover" | "focus");
              }
            }}
            className="flex flex-wrap gap-4"
          >
            <RadioItem value="click" label="Click" />
            <RadioItem value="hover" label="Hover" />
            <RadioItem value="focus" label="Focus" />
            <RadioItem value="composite" label="Hover + Focus" />
          </RadioGroup>
        </div>

        <div className="flex justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover
            trigger={trigger}
            content={
              <div className="p-4">
                <p className="text-sm">
                  Triggered by:{" "}
                  <strong>
                    {Array.isArray(trigger) ? trigger.join(" + ") : trigger}
                  </strong>
                </p>
              </div>
            }
          >
            <Button variant="outline">Test Trigger</Button>
          </Popover>
        </div>
      </div>
    );
  }

  // Rich Content Example
  function RichContentExample() {
    const [email, setEmail] = React.useState("");

    return (
      <Popover trigger="click">
        <PopoverTrigger asChild>
          <Button variant="outline">
            <User className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Update Email</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Change your account email address
              </p>
            </div>
            <Input
              type="email"
              placeholder="new@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                Save
              </Button>
              <PopoverClose asChild>
                <Button size="sm" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Nested Popovers Example
  function NestedExample() {
    return (
      <Popover trigger="click">
        <PopoverTrigger asChild>
          <Button variant="outline">Open Level 1</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <h4 className="font-semibold mb-3">Level 1 Popover</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You can nest popovers to any depth with automatic z-index stacking
          </p>
          <Popover trigger="click" side="right">
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="w-full">
                Open Level 2
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
              <h4 className="font-semibold mb-2">Level 2 Popover</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Each level gets incremented z-index
              </p>
              <Popover trigger="click" side="right">
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="w-full">
                    Open Level 3
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4">
                  <h4 className="font-semibold mb-2">Level 3 Popover</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deeply nested! All interactions work perfectly.
                  </p>
                </PopoverContent>
              </Popover>
            </PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>
    );
  }

  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="A headless-first popover primitive for rich interactive overlays."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Popover component is a behavioral primitive that provides the
            foundation for building rich, interactive overlays. It's designed as
            a headless-first component that delegates all positioning to the
            existing <code>useAutoPosition</code> hook while managing state,
            triggers, and interactions.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Headless-first</strong> - Use the hook or styled
              components
            </li>
            <li>
              <strong>Flexible triggers</strong> - Click, hover, focus, manual,
              or composite
            </li>
            <li>
              <strong>Rich content</strong> - Forms, buttons, and interactive
              elements
            </li>
            <li>
              <strong>Nested support</strong> - Proper z-index stacking for
              nested popovers
            </li>
            <li>
              <strong>Full accessibility</strong> - ARIA attributes and keyboard
              support
            </li>
            <li>
              <strong>Zero positioning logic</strong> - Delegates to
              useAutoPosition
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Choose the right overlay component for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Use Popover when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>Displaying rich, interactive content</li>
              <li>Building custom dropdowns or menus</li>
              <li>Creating form popovers with inputs</li>
              <li>Showing complex information with actions</li>
              <li>Building a foundation for other components</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Use Tooltip instead when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>Showing simple, non-interactive text</li>
              <li>Providing brief contextual hints</li>
              <li>Explaining icon-only buttons</li>
              <li>Content is read-only information</li>
              <li>Hover trigger is primary interaction</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Simple popover with trigger and content."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover
            trigger="click"
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Popover Title</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a basic popover with some content.
                </p>
              </div>
            }
          >
            <Button>Open Popover</Button>
          </Popover>
        </div>
        <CodeBlock
          ts={`<Popover
  trigger="click"
  content={
    <div className="p-4">
      <h4 className="font-semibold mb-2">Popover Title</h4>
      <p className="text-sm">This is a basic popover.</p>
    </div>
  }
>
  <Button>Open Popover</Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";

export default function BasicPopover() {
  return (
    <Popover
      trigger="click"
      content={
        <div className="p-4">
          <h4 className="font-semibold mb-2">Popover Title</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a basic popover with some content.
          </p>
        </div>
      }
    >
      <Button>Open Popover</Button>
    </Popover>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Compound Components"
        id="compound"
        description="Use compound components for more control over structure."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover trigger="click">
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Quick Settings</h4>
                <div className="space-y-2 text-sm">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Preferences
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Keyboard Shortcuts
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Help & Support
                  </button>
                </div>
              </div>
              <PopoverClose />
            </PopoverContent>
          </Popover>
        </div>
        <CodeBlock
          ts={`<Popover trigger="click">
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Settings className="w-4 h-4 mr-2" />
      Settings
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-72 p-4">
    <h4 className="font-semibold">Quick Settings</h4>
    {/* Content */}
    <PopoverClose />
  </PopoverContent>
</Popover>`}
          fullCode={`import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Button } from "aer-design";
import { Settings } from "lucide-react";

export default function CompoundPopover() {
  return (
    <Popover trigger="click">
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="space-y-3">
          <h4 className="font-semibold">Quick Settings</h4>
          <div className="space-y-2 text-sm">
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Preferences
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Keyboard Shortcuts
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Help & Support
            </button>
          </div>
        </div>
        <PopoverClose />
      </PopoverContent>
    </Popover>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Visual Variants"
        id="variants"
        description="Different visual styles for popovers."
      >
        <div className="flex flex-wrap items-center justify-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover
            trigger="click"
            variant="default"
            content={<div className="p-4">Default variant</div>}
          >
            <Button variant="outline">Default</Button>
          </Popover>
          <Popover
            trigger="click"
            variant="dark"
            content={<div className="p-4">Dark variant</div>}
          >
            <Button variant="outline">Dark</Button>
          </Popover>
          <Popover
            trigger="click"
            variant="light"
            content={<div className="p-4">Light variant</div>}
          >
            <Button variant="outline">Light</Button>
          </Popover>
        </div>
        <CodeBlock
          ts={`<Popover variant="default" content={...}>
  <Button>Default</Button>
</Popover>

<Popover variant="dark" content={...}>
  <Button>Dark</Button>
</Popover>

<Popover variant="light" content={...}>
  <Button>Light</Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";

export default function PopoverVariants() {
  return (
    <div className="flex gap-4">
      <Popover
        trigger="click"
        variant="default"
        content={<div className="p-4">Default variant</div>}
      >
        <Button variant="outline">Default</Button>
      </Popover>
      
      <Popover
        trigger="click"
        variant="dark"
        content={<div className="p-4">Dark variant</div>}
      >
        <Button variant="outline">Dark</Button>
      </Popover>
      
      <Popover
        trigger="click"
        variant="light"
        content={<div className="p-4">Light variant</div>}
      >
        <Button variant="outline">Light</Button>
      </Popover>
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
            <div className="aer-vibrant-blob top-1/2 left-1/3 w-32 h-32 bg-purple-500/30" />
          </div>

          <div className="relative z-10">
            <Popover
              trigger="click"
              variant="aer"
              content={
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Glassmorphism Popover</h4>
                  <p className="text-sm opacity-90">
                    Premium aesthetic with backdrop blur
                  </p>
                </div>
              }
            >
              <Button variant="aer">Open Aer Popover</Button>
            </Popover>
          </div>
        </div>
        <CodeBlock
          ts={`<Popover
  trigger="click"
  variant="aer"
  content={
    <div className="p-4">
      <h4 className="font-semibold mb-2">Glassmorphism Popover</h4>
      <p className="text-sm">Premium aesthetic</p>
    </div>
  }
>
  <Button variant="aer">Open Aer Popover</Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";

export default function AerPopoverExample() {
  return (
    <div className="relative flex items-center justify-center p-24 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-blue-600/20" />
      
      <div className="relative z-10">
        <Popover
          trigger="click"
          variant="aer"
          content={
            <div className="p-4">
              <h4 className="font-semibold mb-2">Glassmorphism Popover</h4>
              <p className="text-sm opacity-90">
                Premium aesthetic with backdrop blur
              </p>
            </div>
          }
        >
          <Button variant="aer">Open Aer Popover</Button>
        </Popover>
      </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for Popover works best on
            dark or colorful backgrounds where the glassmorphism effect can
            shine. Use it for premium interactive overlays that need to stand
            out without overwhelming the interface.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Trigger Modes"
        id="triggers"
        description="Control how popovers are activated."
      >
        <TriggerModesExample />
        <CodeBlock
          ts={`// Click trigger
<Popover trigger="click" content={...}>
  <Button>Click Me</Button>
</Popover>

// Hover trigger
<Popover trigger="hover" content={...}>
  <Button>Hover Me</Button>
</Popover>

// Focus trigger
<Popover trigger="focus" content={...}>
  <Button>Focus Me</Button>
</Popover>

// Composite triggers
<Popover trigger={["hover", "focus"]} content={...}>
  <Button>Hover or Focus</Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";

export default function PopoverTriggers() {
  return (
    <div className="flex gap-4">
      <Popover trigger="click" content={<div className="p-4">Click triggered</div>}>
        <Button variant="outline">Click</Button>
      </Popover>
      
      <Popover trigger="hover" content={<div className="p-4">Hover triggered</div>}>
        <Button variant="outline">Hover</Button>
      </Popover>
      
      <Popover trigger="focus" content={<div className="p-4">Focus triggered</div>}>
        <Button variant="outline">Focus</Button>
      </Popover>
      
      <Popover trigger={["hover", "focus"]} content={<div className="p-4">Composite trigger</div>}>
        <Button variant="outline">Hover + Focus</Button>
      </Popover>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Positioning"
        id="positioning"
        description="Control popover placement with auto-repositioning."
      >
        <div className="flex flex-col items-center gap-8 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover
            trigger="click"
            side="top"
            content={<div className="p-4">Top popover</div>}
          >
            <Button variant="outline">Top</Button>
          </Popover>
          <div className="flex gap-8">
            <Popover
              trigger="click"
              side="left"
              content={<div className="p-4">Left popover</div>}
            >
              <Button variant="outline">Left</Button>
            </Popover>
            <Popover
              trigger="click"
              side="right"
              content={<div className="p-4">Right popover</div>}
            >
              <Button variant="outline">Right</Button>
            </Popover>
          </div>
          <Popover
            trigger="click"
            side="bottom"
            content={<div className="p-4">Bottom popover</div>}
          >
            <Button variant="outline">Bottom</Button>
          </Popover>
        </div>
        <CodeBlock
          ts={`<Popover side="top" content={...}>
  <Button>Top</Button>
</Popover>

<Popover side="bottom" content={...}>
  <Button>Bottom</Button>
</Popover>

<Popover side="left" content={...}>
  <Button>Left</Button>
</Popover>

<Popover side="right" content={...}>
  <Button>Right</Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";

export default function PopoverPositioning() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Popover trigger="click" side="top" content={<div className="p-4">Top popover</div>}>
        <Button variant="outline">Top</Button>
      </Popover>
      
      <div className="flex gap-8">
        <Popover trigger="click" side="left" content={<div className="p-4">Left popover</div>}>
          <Button variant="outline">Left</Button>
        </Popover>
        <Popover trigger="click" side="right" content={<div className="p-4">Right popover</div>}>
          <Button variant="outline">Right</Button>
        </Popover>
      </div>
      
      <Popover trigger="click" side="bottom" content={<div className="p-4">Bottom popover</div>}>
        <Button variant="outline">Bottom</Button>
      </Popover>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Auto-positioning:</strong> Popovers automatically adjust
            their position using the <code>useAutoPosition</code> hook. If there
            isn't enough space in the preferred direction, the popover will flip
            to fit within the viewport.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Rich Interactive Content"
        id="rich-content"
        description="Popovers support forms, buttons, and complex interactions."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <RichContentExample />
        </div>
        <CodeBlock
          ts={`<Popover trigger="click">
  <PopoverTrigger asChild>
    <Button variant="outline">
      <User className="w-4 h-4 mr-2" />
      Account Settings
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80 p-4">
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Update Email</h4>
        <p className="text-sm text-gray-600">
          Change your account email address
        </p>
      </div>
      <Input type="email" placeholder="new@example.com" />
      <div className="flex gap-2">
        <Button size="sm">Save</Button>
        <PopoverClose asChild>
          <Button size="sm" variant="outline">Cancel</Button>
        </PopoverClose>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
          fullCode={`import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Button, Input } from "aer-design";
import { User } from "lucide-react";
import { useState } from "react";

export default function RichContentPopover() {
  const [email, setEmail] = useState("");

  return (
    <Popover trigger="click">
      <PopoverTrigger asChild>
        <Button variant="outline">
          <User className="w-4 h-4 mr-2" />
          Account Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Update Email</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Change your account email address
            </p>
          </div>
          <Input
            type="email"
            placeholder="new@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">Save</Button>
            <PopoverClose asChild>
              <Button size="sm" variant="outline" className="flex-1">
                Cancel
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Nested Popovers"
        id="nested"
        description="Popovers support unlimited nesting depth with automatic z-index stacking."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <NestedExample />
        </div>
        <CodeBlock
          ts={`<Popover trigger="click">
  <PopoverTrigger asChild>
    <Button>Open Level 1</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 p-4">
    <h4>Level 1 Popover</h4>
    <Popover trigger="click" side="right">
      <PopoverTrigger asChild>
        <Button size="sm">Open Level 2</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <h4>Level 2 Popover</h4>
        <Popover trigger="click" side="right">
          <PopoverTrigger asChild>
            <Button size="sm">Open Level 3</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-4">
            <h4>Level 3 Popover</h4>
            <p>Deeply nested!</p>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  </PopoverContent>
</Popover>`}
          fullCode={`import { Popover, PopoverTrigger, PopoverContent, Button } from "aer-design";

export default function NestedPopovers() {
  return (
    <Popover trigger="click">
      <PopoverTrigger asChild>
        <Button variant="outline">Open Level 1</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <h4 className="font-semibold mb-3">Level 1 Popover</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          You can nest popovers to any depth with automatic z-index stacking
        </p>
        <Popover trigger="click" side="right">
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="w-full">
              Open Level 2
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <h4 className="font-semibold mb-2">Level 2 Popover</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Each level gets incremented z-index
            </p>
            <Popover trigger="click" side="right">
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline" className="w-full">
                  Open Level 3
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-4">
                <h4 className="font-semibold mb-2">Level 3 Popover</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deeply nested! All interactions work perfectly.
                </p>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Best Practices:</strong> While the component supports
            unlimited nesting depth, it's recommended to keep nesting to 2-3
            levels maximum for better user experience. Use{" "}
            <code>side="right"</code> or <code>side="left"</code> for nested
            popovers to avoid overlapping. Each level automatically gets an
            incremented z-index (Level 1: 1000, Level 2: 1001, Level 3: 1002,
            etc.).
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Headless Hook"
        id="headless"
        description="Build custom popovers with the usePopover hook."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <HeadlessExample />
        </div>
        <CodeBlock
          ts={`const popover = usePopover({
  trigger: "click",
  side: "bottom",
  align: "start",
});

return (
  <div>
    <button
      ref={popover.anchorRef}
      {...popover.getAnchorProps()}
    >
      Open Custom Popover
    </button>

    {popover.open && (
      <div
        ref={popover.floatingRef}
        {...popover.getFloatingProps()}
        style={popover.floatingStyles}
      >
        {/* Custom content */}
        <button onClick={popover.closePopover}>Close</button>
      </div>
    )}
  </div>
);`}
          fullCode={`import { usePopover } from "aer-design";

export default function HeadlessPopover() {
  const popover = usePopover({
    trigger: "click",
    side: "bottom",
    align: "start",
  });

  return (
    <div className="space-y-4">
      <button
        ref={popover.anchorRef as any}
        {...popover.getAnchorProps()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Custom Popover
      </button>

      {popover.open && (
        <div
          ref={popover.floatingRef as any}
          {...popover.getFloatingProps()}
          style={popover.floatingStyles}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-xs z-50"
        >
          <h4 className="font-semibold mb-2">Custom Popover</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with the headless usePopover hook!
          </p>
          <button
            onClick={popover.closePopover}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Accessibility"
        id="accessibility"
        description="Built-in accessibility features."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Popover component includes comprehensive accessibility features:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>ARIA attributes:</strong> <code>aria-expanded</code>,{" "}
              <code>aria-haspopup</code>, and <code>aria-controls</code> are
              automatically applied
            </li>
            <li>
              <strong>Keyboard support:</strong> Press <kbd>Escape</kbd> to
              close, <kbd>Enter</kbd> or <kbd>Space</kbd> to toggle (click
              trigger)
            </li>
            <li>
              <strong>Focus management:</strong> Focus trigger works for
              keyboard users
            </li>
            <li>
              <strong>Screen reader friendly:</strong> Proper role and modal
              attributes
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="Building a Tooltip on top of Popover."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Popover
            trigger="hover"
            openDelay={200}
            closeDelay={0}
            side="top"
            content={
              <div className="px-3 py-2">
                <p className="text-sm">This is a tooltip built on Popover!</p>
              </div>
            }
            variant="dark"
            arrow
          >
            <Button variant="outline">
              <HelpCircle className="w-4 h-4 mr-2" />
              Hover for Help
            </Button>
          </Popover>
        </div>
        <CodeBlock
          ts={`<Popover
  trigger="hover"
  openDelay={200}
  closeDelay={0}
  side="top"
  content={
    <div className="px-3 py-2">
      <p className="text-sm">Tooltip built on Popover!</p>
    </div>
  }
  variant="dark"
  arrow
>
  <Button variant="outline">
    <HelpCircle className="w-4 h-4 mr-2" />
    Hover for Help
  </Button>
</Popover>`}
          fullCode={`import { Popover, Button } from "aer-design";
import { HelpCircle } from "lucide-react";

export default function TooltipExample() {
  return (
    <Popover
      trigger="hover"
      openDelay={200}
      closeDelay={0}
      side="top"
      content={
        <div className="px-3 py-2">
          <p className="text-sm">This is a tooltip built on Popover!</p>
        </div>
      }
      variant="dark"
      arrow
    >
      <Button variant="outline">
        <HelpCircle className="w-4 h-4 mr-2" />
        Hover for Help
      </Button>
    </Popover>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Foundation for other components:</strong> Popover is
            designed to be the behavioral primitive for Tooltip, Dropdown, Menu,
            and other overlay components. It handles all the complex interaction
            logic while delegating positioning to <code>useAutoPosition</code>.
          </p>
        </div>
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="popover-props" className="text-lg font-bold mb-4">
          PopoverProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the Popover component.
        </p>
        <ApiTable
          data={[
            {
              prop: "children",
              type: "ReactNode",
              default: "-",
              description: "The trigger element (or PopoverTrigger).",
            },
            {
              prop: "content",
              type: "ReactNode",
              default: "-",
              description:
                "The content to display in the popover (alternative to PopoverContent).",
            },
            {
              prop: "trigger",
              type: "'click' | 'hover' | 'focus' | 'manual' | Array",
              default: "'click'",
              description:
                "How the popover is triggered. Can be a single trigger or array for composite triggers.",
            },
            {
              prop: "open",
              type: "boolean",
              default: "-",
              description: "Controlled open state.",
            },
            {
              prop: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Default open state for uncontrolled mode.",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: "Callback when open state changes.",
            },
            {
              prop: "side",
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'bottom'",
              description:
                "Preferred side to position the popover. Auto-adjusts if space is limited.",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: "Alignment relative to the anchor element.",
            },
            {
              prop: "variant",
              type: "'default' | 'dark' | 'light' | 'aer'",
              default: "'default'",
              description: "Visual style variant of the popover.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels from the anchor element.",
            },
            {
              prop: "openDelay",
              type: "number",
              default: "0",
              description: "Delay in ms before opening (for hover trigger).",
            },
            {
              prop: "closeDelay",
              type: "number",
              default: "0",
              description: "Delay in ms before closing (for hover trigger).",
            },
            {
              prop: "closeOnOutsideClick",
              type: "boolean",
              default: "true",
              description: "Close when clicking outside the popover.",
            },
            {
              prop: "closeOnEscape",
              type: "boolean",
              default: "true",
              description: "Close when pressing Escape key.",
            },
            {
              prop: "closeOnResize",
              type: "boolean",
              default: "false",
              description: "Close when window is resized.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable the popover completely.",
            },
            {
              prop: "arrow",
              type: "boolean",
              default: "false",
              description: "Show arrow indicator pointing to anchor.",
            },
            {
              prop: "portal",
              type: "boolean",
              default: "true",
              description: "Render in a portal for proper z-index stacking.",
            },
            {
              prop: "unmountOnClose",
              type: "boolean",
              default: "false",
              description: "Unmount content when closed.",
            },
            {
              prop: "modal",
              type: "boolean",
              default: "false",
              description: "Modal mode (prevents body scroll).",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="use-popover-hook" className="text-lg font-bold mb-4">
          usePopover Hook
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Headless hook for building custom popovers.
        </p>
        <ApiTable
          data={[
            {
              prop: "open",
              type: "boolean",
              default: "-",
              description: "Current open state.",
            },
            {
              prop: "openPopover",
              type: "() => void",
              default: "-",
              description: "Function to open the popover.",
            },
            {
              prop: "closePopover",
              type: "() => void",
              default: "-",
              description: "Function to close the popover.",
            },
            {
              prop: "togglePopover",
              type: "() => void",
              default: "-",
              description: "Function to toggle the popover.",
            },
            {
              prop: "anchorRef",
              type: "RefCallback<Element>",
              default: "-",
              description: "Ref callback for the anchor element.",
            },
            {
              prop: "floatingRef",
              type: "RefCallback<HTMLElement>",
              default: "-",
              description: "Ref callback for the floating element.",
            },
            {
              prop: "floatingStyles",
              type: "CSSProperties",
              default: "-",
              description: "Computed styles for the floating element.",
            },
            {
              prop: "placement",
              type: "{ side: Side; align: Align }",
              default: "-",
              description: "Final placement after collision detection.",
            },
            {
              prop: "getAnchorProps",
              type: "() => Record<string, any>",
              default: "-",
              description: "Get props for the anchor element (includes ARIA).",
            },
            {
              prop: "getFloatingProps",
              type: "() => Record<string, any>",
              default: "-",
              description:
                "Get props for the floating element (includes ARIA).",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="trigger-guide" className="text-lg font-bold mb-4">
          Trigger Strategy Guide
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Click Trigger
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-2">
              Best for: Interactive content, forms, menus
            </p>
            <p className="text-sm text-aer-muted-foreground">
              User must explicitly click to open. Works well on mobile and
              desktop.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Hover Trigger
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-2">
              Best for: Tooltips, quick info, desktop-only
            </p>
            <p className="text-sm text-aer-muted-foreground">
              Opens on mouse enter. Not recommended for mobile devices.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Focus Trigger
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-2">
              Best for: Keyboard navigation, accessibility
            </p>
            <p className="text-sm text-aer-muted-foreground">
              Opens when element receives focus. Essential for keyboard users.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Composite Triggers
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-2">
              Best for: Maximum accessibility
            </p>
            <p className="text-sm text-aer-muted-foreground">
              Combine multiple triggers (e.g., hover + focus) for best UX.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 id="popover-trigger-props" className="text-lg font-bold mb-4">
          PopoverTrigger Props
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the PopoverTrigger compound component.
        </p>
        <ApiTable
          data={[
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Merge props onto child element instead of rendering a button.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="popover-content-props" className="text-lg font-bold mb-4">
          PopoverContent Props
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the PopoverContent compound component.
        </p>
        <ApiTable
          data={[
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Merge props onto child element instead of rendering a div.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="popover-close-props" className="text-lg font-bold mb-4">
          PopoverClose Props
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the PopoverClose compound component.
        </p>
        <ApiTable
          data={[
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Merge props onto child element instead of rendering a button.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
            {
              prop: "onClick",
              type: "(e: MouseEvent) => void",
              default: "-",
              description: "Additional click handler (called before closing).",
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
      description="Customize popover appearance with CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Popovers use the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`/* Popover colors */
--aer-background: /* Background color */
--aer-foreground: /* Text color */
--aer-border: /* Border color */

/* Shadows */
--shadow-lg: /* Popover shadow */

/* Aer variant */
--aer-background: /* With opacity for glassmorphism */
--aer-border: /* Aer border color */`}
          fullCode={`/* Light mode */
:root {
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 84% 4.9%;
  --aer-border: 214.3 31.8% 91.4%;
}

/* Dark mode */
.dark {
  --aer-background: 222.2 84% 4.9%;
  --aer-foreground: 210 40% 98%;
  --aer-border: 217.2 32.6% 17.5%;
}

/* Aer variant uses backdrop-blur */
.popover-aer {
  background: hsl(var(--aer-background) / 0.8);
  backdrop-filter: blur(12px);
  border-color: hsl(var(--aer-border));
}`}
        />
      </div>
    </DocSection>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Popover</h1>
        <p className="text-lg text-aer-muted-foreground">
          A headless-first primitive for building rich interactive overlays.
        </p>
      </div>

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
              { id: "compound", title: "Compound Components" },
              { id: "variants", title: "Visual Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "triggers", title: "Trigger Modes" },
              { id: "positioning", title: "Positioning" },
              { id: "rich-content", title: "Rich Interactive Content" },
              { id: "nested", title: "Nested Popovers" },
              { id: "headless", title: "Headless Hook" },
              { id: "accessibility", title: "Accessibility" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "popover-props", title: "Popover" },
              { id: "use-popover-hook", title: "usePopover Hook" },
              { id: "trigger-guide", title: "Trigger Guide" },
              { id: "popover-trigger-props", title: "PopoverTrigger" },
              { id: "popover-content-props", title: "PopoverContent" },
              { id: "popover-close-props", title: "PopoverClose" },
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
