import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Overlay } from "@/components/Overlay";
import { Bell, HelpCircle, Settings, Sparkles, User } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function OverlayDoc() {
  const [controlledOpen, setControlledOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Introduction"
        id="introduction"
        description="A highly configurable overlay component for displaying floating content."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Overlay component provides maximum flexibility for displaying
            any content in a floating overlay. Unlike Menu or Tooltip, Overlay
            gives you complete control over content, positioning, triggers, and
            behaviors.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Any content</strong> - Display forms, cards, rich media,
              or custom components
            </li>
            <li>
              <strong>Flexible triggers</strong> - Click trigger or fully
              controlled mode
            </li>
            <li>
              <strong>Auto-positioning</strong> - Automatically adjusts to stay
              in viewport
            </li>
            <li>
              <strong>Configurable backdrop</strong> - Optional backdrop with
              custom styling
            </li>
            <li>
              <strong>Close behaviors</strong> - Control outside click, escape,
              and scroll
            </li>
            <li>
              <strong>Modal mode</strong> - Focus trapping and body scroll
              prevention
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Choose the right component for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Use Overlay when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>You need custom content (forms, cards, etc.)</li>
              <li>You want full control over positioning</li>
              <li>You need a backdrop or modal behavior</li>
              <li>You're building custom popovers or dropdowns</li>
              <li>You need programmatic control</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Use Menu/Tooltip instead when:
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-2 list-disc pl-5">
              <li>You need a simple menu with items</li>
              <li>You're showing brief help text</li>
              <li>You want pre-styled components</li>
              <li>You don't need custom content</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Simple click-triggered overlay."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay
            content={
              <div className="p-4 min-w-[200px]">
                <h3 className="font-semibold mb-2">Overlay Content</h3>
                <p className="text-sm text-aer-muted-foreground">
                  This is a simple overlay with any content you want!
                </p>
              </div>
            }
          >
            <Button>Open Overlay</Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`<Overlay
  content={
    <div className="p-4">
      <h3>Overlay Content</h3>
      <p>Any content you want!</p>
    </div>
  }
>
  <Button>Open Overlay</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function BasicOverlay() {
  return (
    <Overlay
      content={
        <div className="p-4 min-w-[200px]">
          <h3 className="font-semibold mb-2">Overlay Content</h3>
          <p className="text-sm">Any content you want!</p>
        </div>
      }
    >
      <Button>Open Overlay</Button>
    </Overlay>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Controlled Mode"
        id="controlled"
        description="Control overlay state programmatically."
      >
        <div className="flex flex-col items-center gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Button
            ref={triggerRef}
            onClick={() => setControlledOpen(!controlledOpen)}
          >
            {controlledOpen ? "Close" : "Open"} Controlled Overlay
          </Button>
          <Overlay
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            content={
              <div className="p-4 max-w-sm">
                <h3 className="font-semibold mb-2">Controlled Overlay</h3>
                <p className="text-sm text-aer-muted-foreground mb-4">
                  This overlay is controlled by external state. You can
                  open/close it programmatically.
                </p>
                <Button size="sm" onClick={() => setControlledOpen(false)}>
                  Close
                </Button>
              </div>
            }
          >
            <div ref={triggerRef as any} />
          </Overlay>
        </div>
        <CodeBlock
          ts={`const [open, setOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);

<Button ref={triggerRef} onClick={() => setOpen(!open)}>
  Toggle Overlay
</Button>

<Overlay
  open={open}
  onOpenChange={setOpen}
  content={<div>Controlled content</div>}
>
  <div ref={triggerRef} />
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";
import { useState, useRef } from "react";

export default function ControlledOverlay() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        Toggle Overlay
      </Button>
      <Overlay
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="p-4">
            <h3>Controlled Overlay</h3>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        }
      >
        <div ref={triggerRef} />
      </Overlay>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="With Backdrop"
        id="backdrop"
        description="Add a backdrop behind the overlay."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay
            backdrop
            content={
              <div className="p-6 max-w-md">
                <h3 className="font-semibold mb-2">Overlay with Backdrop</h3>
                <p className="text-sm text-aer-muted-foreground">
                  Click outside or press Escape to close.
                </p>
              </div>
            }
          >
            <Button>Open with Backdrop</Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`<Overlay
  backdrop
  content={<div className="p-6">Content with backdrop</div>}
>
  <Button>Open</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function BackdropOverlay() {
  return (
    <Overlay
      backdrop
      content={
        <div className="p-6 max-w-md">
          <h3>Overlay with Backdrop</h3>
          <p>Click outside to close</p>
        </div>
      }
    >
      <Button>Open with Backdrop</Button>
    </Overlay>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Positioning"
        id="positioning"
        description="Control overlay placement around the trigger."
      >
        <div className="flex flex-col items-center gap-8 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay content={<div className="p-4">Top overlay</div>} side="top">
            <Button variant="outline">Top</Button>
          </Overlay>
          <div className="flex gap-8">
            <Overlay
              content={<div className="p-4">Left overlay</div>}
              side="left"
            >
              <Button variant="outline">Left</Button>
            </Overlay>
            <Overlay
              content={<div className="p-4">Right overlay</div>}
              side="right"
            >
              <Button variant="outline">Right</Button>
            </Overlay>
          </div>
          <Overlay
            content={<div className="p-4">Bottom overlay</div>}
            side="bottom"
          >
            <Button variant="outline">Bottom</Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`<Overlay content={<div>Content</div>} side="top">
  <Button>Top</Button>
</Overlay>

<Overlay content={<div>Content</div>} side="bottom">
  <Button>Bottom</Button>
</Overlay>

<Overlay content={<div>Content</div>} side="left">
  <Button>Left</Button>
</Overlay>

<Overlay content={<div>Content</div>} side="right">
  <Button>Right</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function PositionedOverlay() {
  return (
    <div className="flex gap-4">
      <Overlay content={<div className="p-4">Top</div>} side="top">
        <Button>Top</Button>
      </Overlay>
      <Overlay content={<div className="p-4">Bottom</div>} side="bottom">
        <Button>Bottom</Button>
      </Overlay>
      <Overlay content={<div className="p-4">Left</div>} side="left">
        <Button>Left</Button>
      </Overlay>
      <Overlay content={<div className="p-4">Right</div>} side="right">
        <Button>Right</Button>
      </Overlay>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Auto-positioning:</strong> Overlays automatically adjust
            their position if there isn't enough space in the preferred
            direction.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Alignment"
        id="alignment"
        description="Align overlays relative to the trigger element."
      >
        <div className="flex flex-col gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay
            content={<div className="p-4">Start aligned</div>}
            side="bottom"
            align="start"
          >
            <Button variant="outline" className="w-48">
              Align Start
            </Button>
          </Overlay>
          <Overlay
            content={<div className="p-4">Center aligned</div>}
            side="bottom"
            align="center"
          >
            <Button variant="outline" className="w-48">
              Align Center
            </Button>
          </Overlay>
          <Overlay
            content={<div className="p-4">End aligned</div>}
            side="bottom"
            align="end"
          >
            <Button variant="outline" className="w-48">
              Align End
            </Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`<Overlay content={<div>Content</div>} side="bottom" align="start">
  <Button>Align Start</Button>
</Overlay>

<Overlay content={<div>Content</div>} side="bottom" align="center">
  <Button>Align Center</Button>
</Overlay>

<Overlay content={<div>Content</div>} side="bottom" align="end">
  <Button>Align End</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function AlignedOverlay() {
  return (
    <div className="flex flex-col gap-4">
      <Overlay content={<div className="p-4">Start</div>} side="bottom" align="start">
        <Button className="w-48">Align Start</Button>
      </Overlay>
      <Overlay content={<div className="p-4">Center</div>} side="bottom" align="center">
        <Button className="w-48">Align Center</Button>
      </Overlay>
      <Overlay content={<div className="p-4">End</div>} side="bottom" align="end">
        <Button className="w-48">Align End</Button>
      </Overlay>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Close Behaviors"
        id="close-behaviors"
        description="Configure how the overlay closes."
      >
        <div className="flex flex-wrap gap-4 p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay
            content={<div className="p-4">Won't close on outside click</div>}
            closeOnOutsideClick={false}
          >
            <Button variant="outline">No Outside Click</Button>
          </Overlay>
          <Overlay
            content={<div className="p-4">Won't close on Escape</div>}
            closeOnEscape={false}
          >
            <Button variant="outline">No Escape</Button>
          </Overlay>
          <Overlay
            content={<div className="p-4">Won't close on scroll</div>}
            closeOnScroll={false}
          >
            <Button variant="outline">No Scroll Close</Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`// Disable outside click
<Overlay closeOnOutsideClick={false} content={<div>Content</div>}>
  <Button>No Outside Click</Button>
</Overlay>

// Disable escape key
<Overlay closeOnEscape={false} content={<div>Content</div>}>
  <Button>No Escape</Button>
</Overlay>

// Disable scroll close
<Overlay closeOnScroll={false} content={<div>Content</div>}>
  <Button>No Scroll Close</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function CloseBehaviors() {
  return (
    <div className="flex gap-4">
      <Overlay
        closeOnOutsideClick={false}
        content={<div className="p-4">Won't close on outside click</div>}
      >
        <Button>No Outside Click</Button>
      </Overlay>
      
      <Overlay
        closeOnEscape={false}
        content={<div className="p-4">Won't close on Escape</div>}
      >
        <Button>No Escape</Button>
      </Overlay>
      
      <Overlay
        closeOnScroll={false}
        content={<div className="p-4">Won't close on scroll</div>}
      >
        <Button>No Scroll Close</Button>
      </Overlay>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Modal Mode"
        id="modal"
        description="Create modal-like overlays with focus trapping."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <Overlay
            modal
            backdrop
            content={
              <div className="p-6 max-w-md">
                <h3 className="font-semibold mb-4">Modal Overlay</h3>
                <p className="text-sm text-aer-muted-foreground mb-4">
                  This overlay prevents body scroll and traps focus. Try
                  scrolling the page!
                </p>
                <Input placeholder="Focus is trapped here" className="mb-4" />
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            }
          >
            <Button>Open Modal</Button>
          </Overlay>
        </div>
        <CodeBlock
          ts={`<Overlay
  modal
  backdrop
  content={
    <div className="p-6">
      <h3>Modal Overlay</h3>
      <Input placeholder="Focus is trapped" />
      <Button>Action</Button>
    </div>
  }
>
  <Button>Open Modal</Button>
</Overlay>`}
          fullCode={`import { Overlay, Button, Input } from "aer-design";

export default function ModalOverlay() {
  return (
    <Overlay
      modal
      backdrop
      content={
        <div className="p-6 max-w-md">
          <h3 className="font-semibold mb-4">Modal Overlay</h3>
          <p className="text-sm mb-4">
            This overlay prevents body scroll and traps focus.
          </p>
          <Input placeholder="Focus is trapped here" className="mb-4" />
          <div className="flex gap-2">
            <Button size="sm">Action</Button>
            <Button size="sm" variant="outline">Cancel</Button>
          </div>
        </div>
      }
    >
      <Button>Open Modal</Button>
    </Overlay>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Style the overlay container and backdrop using classes."
      >
        <div className="flex flex-col gap-6 w-full">
          <OverlayStylingExample />
        </div>
        <CodeBlock
          ts={`// Premium Glassmorphism
// Note: Ensure the overlay is placed over a colorful background to see the effect
<Overlay
  side="right"
  sideOffset={20}
  content={
    <div className="p-4 w-52">
      <div className="mb-2 h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <h4 className="font-semibold text-base mb-1 text-white">Glass UI</h4>
      <p className="text-xs text-white/60">
        Backdrop filters blur the content behind this element.
      </p>
    </div>
  }
  className="!bg-white/5 backdrop-blur-md border !border-white/15 shadow-2xl rounded-2xl !text-white ring-1 ring-white/5"
>
  <Button className="border-white/20 bg-white/5 text-white hover:bg-white/10">
    Open Glass Overlay
  </Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";

export default function OverlayStyling() {
  return (
    <div className="flex gap-4">
      <Overlay
        content={<div className="p-4 font-medium">True Glassmorphism</div>}
        className="!bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl text-white"
        side="bottom"
      >
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Button variant="outline" className="bg-white/20 border-white/40 hover:bg-white/30 text-white">
            Glass Effect
          </Button>
        </div>
      </Overlay>

      <Overlay
        backdrop
        backdropClassName="bg-purple-900/20 backdrop-blur-sm"
        content={<div className="p-6 bg-white rounded-lg shadow-xl">Tinted Backdrop</div>}
      >
        <Button variant="outline">Tinted Backdrop</Button>
      </Overlay>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world"
        description="User profile overlay with actions."
      >
        <div className="flex justify-center p-8 border border-aer-border rounded-xl bg-aer-muted/10">
          <DemoUserProfile />
        </div>
        <CodeBlock
          ts={`<Overlay
  content={
    <div className="p-4 w-64">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-aer-border">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
          JD
        </div>
        <div>
          <p className="font-semibold text-sm">John Doe</p>
          <p className="text-xs text-aer-muted-foreground">john@example.com</p>
        </div>
      </div>
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <User className="w-4 h-4 mr-2" /> Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>
        {/* ... */}
      </div>
    </div>
  }
  side="bottom"
  align="end"
>
  <Button variant="outline" size="sm">
    <User className="w-4 h-4 mr-2" /> Account
  </Button>
</Overlay>`}
          fullCode={`import { Overlay, Button } from "aer-design";
import { User, Settings, Bell, HelpCircle } from "lucide-react";

export default function UserProfile() {
  return (
    <Overlay
      content={
        <div className="p-4 w-64">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      }
      side="bottom"
      align="end"
    >
      <Button variant="outline" size="sm">
        <User className="w-4 h-4 mr-2" />
        Account
      </Button>
    </Overlay>
  );
}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="overlay-props" className="text-lg font-bold mb-4">
          OverlayProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the Overlay component.
        </p>
        <ApiTable
          data={[
            {
              prop: "content",
              type: "ReactNode",
              default: "-",
              description: "The content to display in the overlay.",
            },
            {
              prop: "children",
              type: "ReactElement",
              default: "-",
              description:
                "Optional trigger element. Clicking it toggles the overlay.",
            },
            {
              prop: "open",
              type: "boolean",
              default: "-",
              description: "Controlled open state.",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: "Callback when open state changes.",
            },
            {
              prop: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Default open state for uncontrolled mode.",
            },
            {
              prop: "side",
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'bottom'",
              description:
                "Preferred side of the trigger to display the overlay.",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: "Alignment relative to the trigger.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "8",
              description: "Distance in pixels from the trigger.",
            },
            {
              prop: "alignOffset",
              type: "number",
              default: "0",
              description: "Offset along the alignment axis.",
            },
            {
              prop: "strategy",
              type: "'fixed' | 'absolute'",
              default: "'fixed'",
              description: "Positioning strategy.",
            },
            {
              prop: "backdrop",
              type: "boolean",
              default: "false",
              description: "Show backdrop behind overlay.",
            },
            {
              prop: "backdropClassName",
              type: "string",
              default: "-",
              description: "Custom className for backdrop.",
            },
            {
              prop: "closeOnOutsideClick",
              type: "boolean",
              default: "true",
              description: "Close overlay when clicking outside.",
            },
            {
              prop: "closeOnEscape",
              type: "boolean",
              default: "true",
              description: "Close overlay when pressing Escape.",
            },
            {
              prop: "closeOnScroll",
              type: "boolean",
              default: "true",
              description: "Close overlay when scrolling.",
            },
            {
              prop: "modal",
              type: "boolean",
              default: "false",
              description: "Modal mode - traps focus and prevents body scroll.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable the overlay.",
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Overlay
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A highly configurable overlay component for displaying any floating
          content.
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
              { id: "controlled", title: "Controlled Mode" },
              { id: "backdrop", title: "With Backdrop" },
              { id: "positioning", title: "Positioning" },
              { id: "alignment", title: "Alignment" },
              { id: "close-behaviors", title: "Close Behaviors" },
              { id: "modal", title: "Modal Mode" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [{ id: "overlay-props", title: "OverlayProps" }],
          },
        ]}
      />
    </div>
  );
}

function OverlayStylingExample() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 w-full">
      {/* 1. Glassmorphism Demo */}
      <div className="relative h-72 rounded-xl bg-zinc-950 overflow-hidden flex items-center justify-center border border-zinc-800 shadow-inner">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/30 rounded-full blur-[50px]" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/30 rounded-full blur-[50px]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        <Overlay
          content={
            <div className="p-4 w-52">
              <div className="mb-3 h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg ring-1 ring-white/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-base mb-1 text-white">
                Glass UI
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                This element uses backdrop filters to blur the vibrant
                background.
              </p>
            </div>
          }
          className="!bg-white/5 backdrop-blur-xl border !border-white/10 shadow-2xl rounded-2xl !text-white ring-1 ring-white/5"
          side="top"
          sideOffset={20}
        >
          <Button
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-sm relative z-10 transition-all duration-300"
          >
            Open Glass Overlay
          </Button>
        </Overlay>
      </div>

      {/* 2. Tinted Backdrop Demo */}
      <div className="relative h-72 rounded-xl border border-aer-border bg-aer-muted/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/50" />
        <Overlay
          backdrop
          backdropClassName="bg-indigo-950/40 backdrop-blur-[2px]"
          content={
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-aer-border max-w-xs">
              <h4 className="font-semibold mb-2">Tinted Backdrop</h4>
              <p className="text-sm text-aer-muted-foreground">
                The backdrop is styled with a semi-transparent color and subtle
                blur.
              </p>
            </div>
          }
        >
          <Button variant="outline">Tinted Backdrop</Button>
        </Overlay>
      </div>
    </div>
  );
}

// --- Demo Component ---

function DemoUserProfile() {
  return (
    <Overlay
      content={
        <div className="p-4 w-64">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-aer-border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="font-semibold text-sm">John Doe</p>
              <p className="text-xs text-aer-muted-foreground">
                john@example.com
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      }
      side="bottom"
      align="end"
    >
      <Button variant="outline" size="sm">
        <User className="w-4 h-4 mr-2" />
        Account
      </Button>
    </Overlay>
  );
}
