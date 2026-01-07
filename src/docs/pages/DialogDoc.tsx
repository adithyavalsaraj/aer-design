import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/Dialog";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function DialogDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A feature-rich, highly customizable dialog/modal component."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Dialog component provides a powerful modal system with extensive
            customization options. It supports advanced features like custom
            positioning, dragging, resizing, and maximize/minimize controls.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>9 preset positions</strong> plus custom x,y coordinates
            </li>
            <li>
              <strong>Draggable</strong> with viewport constraints
            </li>
            <li>
              <strong>Resizable</strong> with 8-direction handles
            </li>
            <li>
              <strong>Maximize/Minimize</strong> controls - Minimize moves
              dialog to bottom-left, hides backdrop, and allows page interaction
            </li>
            <li>
              <strong>Advanced Window Management</strong> - Taskbar-style
              stacking with multi-row wrapping and global z-index management for
              a true desktop experience.
            </li>
            <li>
              <strong>4 variants</strong> including glassmorphism
            </li>
            <li>
              <strong>Full accessibility</strong> with focus trap and ARIA
            </li>
            <li>
              <strong>Portal rendering</strong> outside DOM hierarchy
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right dialog configuration for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Standard Dialogs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                default
              </code>{" "}
              variant for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Form submissions and data entry</li>
              <li>Confirmation prompts</li>
              <li>User settings and preferences</li>
              <li>General modal content</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Alert Dialogs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                alert
              </code>{" "}
              or{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                confirm
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Warning messages</li>
              <li>Destructive action confirmations</li>
              <li>Critical notifications</li>
              <li>Error messages requiring acknowledgment</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Draggable Dialogs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Enable{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                draggable
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Multi-window interfaces</li>
              <li>Tool palettes and inspectors</li>
              <li>Chat windows</li>
              <li>Reference panels</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Resizable Dialogs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Enable{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                resizable
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Content viewers (images, videos)</li>
              <li>Code editors</li>
              <li>Data tables</li>
              <li>Long-form content</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="The simplest implementation using standard TypeScript/React patterns."
      >
        <BasicDialogExample />
        <CodeBlock
          ts={`const [isOpen, setIsOpen] = useState(false);

<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <DialogHeader title="Welcome" />
  <DialogContent>
    <p>This is a basic dialog with default settings.</p>
  </DialogContent>
  <DialogFooter defaultActions={{ onConfirm: handleSave }} />
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter } from "aer-design";
import { useState } from "react";

export default function BasicDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log("Saved!");
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader title="Welcome" />
        <DialogContent>
          <p>This is a basic dialog with default settings.</p>
          <p>Click outside, press ESC, or use the close button to dismiss.</p>
        </DialogContent>
        <DialogFooter 
          defaultActions={{ 
            onConfirm: handleSave,
            onCancel: () => setIsOpen(false)
          }} 
        />
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Standard stylistic variations for different visual contexts."
      >
        <VariantsExample />
        <CodeBlock
          ts={`// Default variant
<Dialog variant="default">...</Dialog>

// Alert variant (yellow border)
<Dialog variant="alert">...</Dialog>

// Confirm variant (primary border)
<Dialog variant="confirm">...</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter } from "aer-design";
import { AlertTriangle } from "lucide-react";

export default function DialogVariants() {
  return (
    <>
      <Dialog variant="alert" isOpen={alertOpen} onClose={closeAlert}>
        <DialogHeader 
          title="Warning" 
          icon={<AlertTriangle className="text-yellow-500" />} 
        />
        <DialogContent>
          <p>This is an alert variant for critical warnings.</p>
        </DialogContent>
        <DialogFooter defaultActions={{ confirmVariant: "destructive" }} />
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="custom"
        title="Custom Usage (Headless)"
        description="The 'Logic-only' mode for complete design control while retaining modal behaviors."
      >
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-aer-muted-foreground">
            The <code>headless</code> prop strips away all Aer Design visual
            styling, allowing you to build your own UI from scratch while the
            component handles all the complex modal "Heavy Lifting."
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
              <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> What it Removes
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-aer-muted-foreground">
                <li>Aer container (background, borders)</li>
                <li>Visual aesthetics (shadows, rounded corners)</li>
                <li>Standard layout constraints (w-full, max-w-md)</li>
                <li>Variant styling (default, aer, alert)</li>
              </ul>
            </div>
            <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
              <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> What it Keeps
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-aer-muted-foreground">
                <li>Portal rendering (outside DOM hierarchy)</li>
                <li>Focus management & focus trapping</li>
                <li>Backdrop logic & "Click outside to close"</li>
                <li>ESC key dismissal & ARIA accessibility</li>
                <li>Entrance animations & Positioning engine</li>
              </ul>
            </div>
          </div>
        </div>
        <CustomUsageExample />
        <CodeBlock
          ts={`<Dialog headless isOpen={isOpen} onClose={close}>
  {/* You build 100% of the UI here */}
  <div className="bg-black text-white p-8 rounded-full border-2 border-primary">
    <h1>Logic-Only Mode</h1>
    <p>I behave like a modal, but look like whatever I want.</p>
  </div>
</Dialog>`}
          fullCode={`import { Dialog, Button } from "aer-design";
import { useState } from "react";

export default function CustomHeadlessWorkflow() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Custom UI</Button>
      
      <Dialog headless isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* Custom styled container that ignores all Aer Design defaults */}
        <div className="bg-zinc-900 border border-white/10 text-white rounded-3xl p-10 shadow-2xl max-w-xs rotate-3 hover:rotate-0 transition-transform">
          <h2 className="text-2xl font-black mb-4 underline decoration-sky-500">
            HEADLESS
          </h2>
          <p className="text-zinc-400 mb-6">
            Even with this wild styling, I still close on ESC, trap your focus, 
            and render in a portal!
          </p>
          <Button variant="aer" onClick={() => setIsOpen(false)} className="w-full">
            Got it
          </Button>
        </div>
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="Guidance on IDE layout behavior and container constraints."
      >
        <PositioningExample />
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-aer-muted-foreground">
            Dialogs are designed to integrate seamlessly into complex IDE
            layouts. They utilize a high z-index (50+) to float above editor
            panes and toolbars.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Sidebars:</strong> Use <code>position="left"</code> or{" "}
              <code>"right"</code> to dock panels next to main content.
            </li>
            <li>
              <strong>Editor Panes:</strong> Default <code>"center"</code>{" "}
              ensures prominence during focused tasks.
            </li>
            <li>
              <strong>Floating Overlays:</strong> Use custom <code>x,y</code>{" "}
              for precise placement relative to user interaction.
            </li>
          </ul>
        </div>
        <CodeBlock
          ts={`<Dialog position="top-right">...</Dialog>
<Dialog x={400} y={150}>...</Dialog>`}
          fullCode={`import { Dialog } from "aer-design";

export default function LayoutIntegration() {
  return (
    <Dialog position="bottom-right" showBackdrop={false}>
      {/* Floating utility panel */}
    </Dialog>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
      >
        <AerVariantExample />
        <CodeBlock
          ts={`<Dialog variant="aer" size="md">
  <DialogHeader title="Aer Aesthetic" icon={<Sparkles />} />
  <DialogContent>Signature glassmorphism effect.</DialogContent>
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, Button } from "aer-design";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function FlagshipDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="aer-vibrant-container h-48">
      <div className="aer-vibrant-bg" />
      
      <Button variant="aer" onClick={() => setIsOpen(true)}>
        Launch Aer Dialog
      </Button>

      <Dialog variant="aer" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader 
          title="Aer Design" 
          icon={<Sparkles className="text-blue-400" />} 
        />
        <DialogContent>
          Experience multi-layered glassmorphism with dynamic gradients.
        </DialogContent>
      </Dialog>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant is designed for premium,
            high-impact moments like feature highlights or onboarding. It works
            best on dark or colorful backgrounds to emphasize the multi-layered
            glassmorphism and backdrop-blur effects.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="draggable"
        title="Draggable Dialog"
        description="Allow users to reposition dialogs by dragging."
      >
        <DraggableExample />
        <CodeBlock
          ts={`<Dialog 
  draggable
  onDragStart={() => console.log('Drag started')}
  onDragEnd={(pos) => console.log('New position:', pos)}
>
  <DialogHeader title="Drag Me" />
  <DialogContent>
    Click and drag the header to move this dialog.
  </DialogContent>
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent } from "aer-design";
import { useState } from "react";

export default function DraggableDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Draggable Dialog</button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        draggable
        onDragStart={() => console.log('Started dragging')}
        onDragEnd={(position) => {
          console.log('Dropped at:', position);
        }}
      >
        <DialogHeader title="Draggable Dialog" />
        <DialogContent>
          <p>Click and hold the header to drag this dialog around.</p>
          <p>The dialog will stay within viewport boundaries.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="resizable"
        title="Resizable Dialog"
        description="Enable resize handles for user-controlled sizing."
      >
        <ResizableExample />
        <CodeBlock
          ts={`<Dialog 
  resizable
  minWidth={400}
  minHeight={300}
  maxWidth={1000}
  maxHeight={800}
  onResizeEnd={(size) => console.log('New size:', size)}
>
  <DialogHeader title="Resize Me" />
  <DialogContent>
    Drag the corners or edges to resize this dialog.
  </DialogContent>
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent } from "aer-design";

export default function ResizableDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Resizable Dialog</button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        resizable
        minWidth={300}
        minHeight={200}
        maxWidth={1200}
        maxHeight={900}
        onResizeStart={() => console.log('Started resizing')}
        onResizeEnd={(size) => {
          console.log('New size:', size);
        }}
      >
        <DialogHeader title="Resizable Dialog" />
        <DialogContent>
          <p>Drag any corner or edge to resize this dialog.</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Minimum width: 300px</li>
            <li>Minimum height: 200px</li>
            <li>Maximum width: 1200px</li>
            <li>Maximum height: 900px</li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="maximize-minimize"
        title="Maximize & Minimize"
        description="Window-like controls for full-screen and collapsed states."
      >
        <MaximizeMinimizeExample />
        <CodeBlock
          ts={`<Dialog 
  maximizable
  minimizable
  onMaximize={() => console.log('Maximized')}
  onMinimize={() => console.log('Minimized')}
  onRestore={() => console.log('Restored')}
>
  <DialogHeader title="Window Controls" />
  <DialogContent>
    Use the header buttons to maximize or minimize.
  </DialogContent>
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter } from "aer-design";

export default function MaximizeMinimizeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        maximizable
        minimizable
        onMaximize={() => console.log('Dialog maximized')}
        onMinimize={() => console.log('Dialog minimized')}
        onRestore={() => console.log('Dialog restored')}
      >
        <DialogHeader title="Window-like Dialog" />
        <DialogContent>
          <p>Click the maximize button to go full-screen.</p>
          <p>Click the minimize button to collapse to title bar only.</p>
          <p>Click again to restore to normal size.</p>
        </DialogContent>
        <DialogFooter defaultActions={{ onConfirm: () => setIsOpen(false) }} />
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="sizes"
        title="Dialog Sizes"
        description="Predefined size variants for different content amounts."
      >
        <SizesExample />
        <CodeBlock
          ts={`<Dialog size="sm">...</Dialog>
<Dialog size="md">...</Dialog>  {/* default */}
<Dialog size="lg">...</Dialog>
<Dialog size="xl">...</Dialog>
<Dialog size="full">...</Dialog>
<Dialog size="auto">...</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent } from "aer-design";

export default function DialogSizes() {
  return (
    <>
      <Dialog size="sm" isOpen={smOpen}>
        <DialogHeader title="Small Dialog" />
        <DialogContent>Max-width: 400px</DialogContent>
      </Dialog>

      <Dialog size="lg" isOpen={lgOpen}>
        <DialogHeader title="Large Dialog" />
        <DialogContent>Max-width: 800px</DialogContent>
      </Dialog>

      <Dialog size="full" isOpen={fullOpen}>
        <DialogHeader title="Full Screen" />
        <DialogContent>Takes entire viewport</DialogContent>
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="minimized-stacking"
        title="Advanced Window Management"
        description="Desktop-class window capabilities including taskbar stacking and z-index management."
      >
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-aer-muted-foreground">
            Aer Design Dialogs behave like OS-level windows. They feature an
            intelligent layout engine that manages:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Taskbar Stacking:</strong> Minimized dialogs automatically
              stack at the bottom-left of the viewport. If the taskbar fills up,
              windows intelligently <strong>wrap into multiple rows</strong>{" "}
              stacking upwards.
            </li>
            <li>
              <strong>Intelligent Layout:</strong> Newly opened windows use a
              dynamic cascading algorithm to fill available screen space, and
              are automatically <strong>rescued</strong> (clamped) to stay
              within viewport bounds on resize.
            </li>
            <li>
              <strong>Global Z-Order:</strong> The{" "}
              <code>DialogStackingManager</code> tracks interactions. Clicking,
              dragging, or maximizing any dialog automatically brings it to the
              front of the visual stack.
            </li>
            <li>
              <strong>State Memory:</strong> Dialogs remember their size and
              position before minimization, ensuring a seamless restore
              animation.
            </li>
          </ul>
        </div>
        <MinimizedStackingExample />
        <CodeBlock
          ts={`// Open multiple dialogs
// 1. Minimized dialogs stack at bottom-left
// 2. Active dialogs jump to front on click
<Dialog minimizable instanceId="d1" />
<Dialog minimizable instanceId="d2" />`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, Button } from "aer-design";
import { useState } from "react";

export default function MinimizedStacking() {
  const [dialogs, setDialogs] = useState<number[]>([]);

  const addDialog = () => {
    setDialogs(prev => [...prev, Date.now()]);
  };

  const removeDialog = (id: number) => {
    setDialogs(prev => prev.filter(d => d !== id));
  };

  // Intelligent cascading logic
  const getCascadePosition = (index: number) => {
    const step = 40;
    const margin = 60;
    const dialogWidth = 320;
    const dialogHeight = 240;
    
    const usableWidth = window.innerWidth - dialogWidth - margin;
    const usableHeight = window.innerHeight - dialogHeight - margin;
    const itemsPerRow = Math.max(1, Math.floor(usableWidth / step));
    const itemsPerCol = Math.max(1, Math.floor(usableHeight / step));
    
    const maxItems = itemsPerRow * itemsPerCol;
    const localIndex = index % maxItems;
    
    return {
      x: margin + (localIndex % itemsPerRow) * step,
      y: margin + Math.floor(localIndex / itemsPerRow) * step
    };
  };

  return (
    <div className="space-y-4">
      <Button onClick={addDialog}>Open New Window</Button>
      
      {dialogs.map((id, index) => {
        const pos = getCascadePosition(index);
        return (
          <Dialog 
            key={id}
            isOpen={true}
            onClose={() => removeDialog(id)}
            minimizable
            maximizable
            draggable
            resizable
            showBackdrop={false}
            x={pos.x}
            y={pos.y}
            className="w-80"
          >
            <DialogHeader title={\`Window \${index + 1}\`} />
            <DialogContent>
              <p>I am dialog window #\${index + 1}.</p>
              <p className="text-sm text-aer-muted-foreground mt-2 font-medium">
                Try dragging, resizing, or minimizing me to the taskbar!
              </p>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="close-mechanisms"
        title="Close Mechanisms"
        description="Configure how users can dismiss the dialog."
      >
        <CloseMechanismsExample />
        <CodeBlock
          ts={`// All close mechanisms enabled (default)
<Dialog 
  showCloseButton={true}
  closeOnEscape={true}
  closeOnBackdropClick={true}
>...</Dialog>

// Persistent dialog (no close mechanisms)
<Dialog 
  showCloseButton={false}
  closeOnEscape={false}
  closeOnBackdropClick={false}
>...</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter } from "aer-design";

export default function PersistentDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleComplete = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Start Process</button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        closeOnEscape={false}
        closeOnBackdropClick={false}
      >
        <DialogHeader title="Processing" />
        <DialogContent>
          <p>Please wait while we process your request...</p>
          <p className="text-sm text-aer-muted-foreground mt-2">
            This dialog cannot be closed until the process completes.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button 
            onClick={handleComplete}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="states"
        title="Interaction States"
        description="Visual feedback for Hover, Active, Disabled, Loading, and Focused states."
      >
        <InteractionStatesExample />
        <CodeBlock
          ts={`<Button isLoading={true}>Processing</Button>
<Button disabled>Action Blocked</Button>`}
          fullCode={`import { Button, Dialog } from "aer-design";

export default function StateDemo() {
  return (
    <Dialog isOpen={isOpen}>
       <Button isLoading>Save Changes</Button>
       <Button disabled>Delete Record</Button>
    </Dialog>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="specialized"
        title="Specialized Contexts"
        description="Context-aware versions of the component for specialized workflows."
      >
        <SpecializedContextsExample />
        <CodeBlock
          ts={`<Dialog \n  position="bottom-right" \n  showBackdrop={false}\n  className="w-80"\n>\n  <DialogHeader title="Console" />\n  <DialogContent className="bg-zinc-950">...</DialogContent>\n</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter, Button } from "aer-design";\nimport { Info } from "lucide-react";\nimport { useState } from "react";\n\nexport default function IDEConsole() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className="flex flex-col items-center gap-4">\n      <Button onClick={() => setIsOpen(true)}>Open Console</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        position="bottom-right"\n        showBackdrop={false}\n        className="w-80 shadow-2xl border-aer-primary/20"\n      >\n        <DialogHeader\n          title="Debug Console"\n          icon={<Info className="w-4 h-4 text-blue-500" />}\n        />\n        <DialogContent className="bg-zinc-950 font-mono text-xs p-4 h-64 overflow-y-auto">\n          <div className="text-zinc-500 border-b border-white/5 pb-1 mb-2">System initialized...</div>\n          <div className="text-blue-400 mb-1">GET /api/v1/user 200 OK</div>\n          <div className="text-green-400 mb-1">Websocket connected.</div>\n          <div className="text-zinc-300 animate-pulse underline select-none mt-4">_</div>\n        </DialogContent>\n        <DialogFooter className="p-2 border-t border-white/5 bg-zinc-900">\n          <span className="text-[10px] text-zinc-500">Writing Mode: Active</span>\n        </DialogFooter>\n      </Dialog>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            <strong>Tip:</strong> Use <code>position="bottom-right"</code> and{" "}
            <code>showBackdrop={false}</code> for IDE-style "Writing Mode" or
            "Debug Console" overlays.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="validation"
        title="Validation & Errors"
        description="Error handling, rings, and accessibility implementation."
      >
        <ValidationErrorsExample />
        <CodeBlock
          ts={`<input className="border-red-500 ring-red-500/20" />
<p className="text-red-500">Invalid entry</p>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent } from "aer-design";

export default function ErrorDialog() {
  return (
    <Dialog isOpen={isOpen}>
      <DialogHeader title="Error" className="border-b-red-500/50" />
      <DialogContent>
        <div className="text-red-500 text-sm">Required field missing.</div>
      </DialogContent>
    </Dialog>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="styling"
        title="Granular Styling"
        description="Target internal slots using classNames or CSS variable overrides."
      >
        <GranularStylingExample />
        <CodeBlock
          ts={`<Dialog\n  className="bg-linear-to-br from-purple-50 to-white"\n  overlayClassName="backdrop-blur-sm bg-purple-900/10"\n>\n  <DialogHeader titleClassName="text-purple-900 font-serif" />\n  <DialogContent className="text-purple-800">...</DialogContent>\n</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter, Button } from "aer-design";\nimport { useState } from "react";\n\nexport default function CustomStyledDialog() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className="flex flex-col items-center gap-4">\n      <Button onClick={() => setIsOpen(true)}>Open Styled Dialog</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        className="bg-linear-to-br from-purple-50 to-white border-purple-200 shadow-purple-500/10"\n        overlayClassName="backdrop-blur-sm bg-purple-900/10"\n      >\n        <DialogHeader\n          title="Granular Styling"\n          className="border-purple-100 bg-white/50"\n          titleClassName="text-purple-900 font-serif italic"\n        />\n        <DialogContent className="text-purple-800">\n          <p>This dialog uses granular class names to customize every layer:</p>\n          <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">\n            <li><strong>className:</strong> Custom background and border</li>\n            <li><strong>overlayClassName:</strong> Purple-tinted backdrop</li>\n            <li><strong>titleClassName:</strong> Custom font and color</li>\n          </ul>\n        </DialogContent>\n        <DialogFooter className="bg-purple-50/50 border-purple-100">\n          <Button\n            className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none"\n            onClick={() => setIsOpen(false)}\n          >\n            Close Styled Dialog\n          </Button>\n        </DialogFooter>\n      </Dialog>\n    </div>\n  );\n}`}
        />
        <div className="prose prose-sm max-w-none mt-6">
          <p className="text-aer-muted-foreground">
            Styleable "slots" for the Dialog component:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-aer-muted-foreground italic">
            <li>container / root (via className)</li>
            <li>overlay (via overlayClassName)</li>
            <li>backdrop (via backdropClassName)</li>
            <li>header (via DialogHeader className)</li>
            <li>title (via titleClassName)</li>
            <li>content (via DialogContent className)</li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="Complete production-ready implementation of a multi-feature IDE component."
      >
        <RealWorldExample />

        <CodeBlock
          ts={`// Full-featured dialog with dragging, resizing, and maximize
export default function UserProfileDialog() {
  return (
    <Dialog 
      isOpen={isOpen}
      onClose={onClose}
      draggable
      resizable
      maximizable
      size="lg"
    >
      <DialogHeader title="Edit Profile" icon={<User />} />
      <DialogContent>
        {/* Form fields */}
      </DialogContent>
      <DialogFooter defaultActions={{ 
        confirmText: "Save Changes",
        onConfirm: handleSave,
        confirmLoading: isSaving
      }} />
    </Dialog>
  );
}`}
          fullCode={`import { Dialog, DialogHeader, DialogContent, DialogFooter } from "aer-design";
import { User } from "lucide-react";
import { useState } from "react";

export default function UserProfileDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Software developer"
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsOpen(false);
    alert("Profile updated!");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit Profile</button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        draggable
        resizable
        maximizable
        size="lg"
        minWidth={500}
        minHeight={400}
      >
        <DialogHeader title="Edit Profile" icon={<User className="w-5 h-5" />} />
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter 
          defaultActions={{ 
            confirmText: "Save Changes",
            onConfirm: handleSave,
            confirmLoading: isSaving
          }} 
        />
      </Dialog>
    </>
  );
}`}
        />
      </DocSection>
    </div>
  );

  // Example Components
  function BasicDialogExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DialogHeader title="Welcome to Aer Design" />
          <DialogContent>
            <p className="text-aer-foreground">
              This is a basic dialog with default settings.
            </p>
            <p className="text-sm text-aer-muted-foreground mt-2">
              You can close this dialog by clicking outside, pressing ESC, or
              using the close button.
            </p>
          </DialogContent>
          <DialogFooter
            defaultActions={{
              onConfirm: () => setIsOpen(false),
              confirmText: "Got it",
            }}
          />
        </Dialog>
      </div>
    );
  }

  function VariantsExample() {
    const [variant, setVariant] = React.useState<
      "default" | "alert" | "confirm" | "aer" | null
    >(null);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setVariant("default")}>Default</Button>
          <Button onClick={() => setVariant("alert")} variant="outline">
            Alert
          </Button>
          <Button onClick={() => setVariant("confirm")} variant="outline">
            Confirm
          </Button>
          <Button onClick={() => setVariant("aer")} variant="aer">
            Aer
          </Button>
        </div>

        {variant && (
          <Dialog
            isOpen={!!variant}
            onClose={() => setVariant(null)}
            variant={variant}
          >
            <DialogHeader
              title={`${
                variant.charAt(0).toUpperCase() + variant.slice(1)
              } Variant`}
              icon={
                variant === "alert" ? (
                  <AlertTriangle className="text-yellow-500" />
                ) : undefined
              }
            />
            <DialogContent>
              <p>
                This is the <strong>{variant}</strong> variant of the dialog.
              </p>
            </DialogContent>
            <DialogFooter
              defaultActions={{ onConfirm: () => setVariant(null) }}
            />
          </Dialog>
        )}
      </div>
    );
  }

  function PositioningExample() {
    const [position, setPosition] = React.useState<any>(null);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="grid grid-cols-3 gap-2 max-w-md">
          <Button size="sm" onClick={() => setPosition("top-left")}>
            Top Left
          </Button>
          <Button size="sm" onClick={() => setPosition("top")}>
            Top
          </Button>
          <Button size="sm" onClick={() => setPosition("top-right")}>
            Top Right
          </Button>
          <Button size="sm" onClick={() => setPosition("left")}>
            Left
          </Button>
          <Button size="sm" onClick={() => setPosition("center")}>
            Center
          </Button>
          <Button size="sm" onClick={() => setPosition("right")}>
            Right
          </Button>
          <Button size="sm" onClick={() => setPosition("bottom-left")}>
            Bottom Left
          </Button>
          <Button size="sm" onClick={() => setPosition("bottom")}>
            Bottom
          </Button>
          <Button size="sm" onClick={() => setPosition("bottom-right")}>
            Bottom Right
          </Button>
        </div>

        {position && (
          <Dialog
            isOpen={!!position}
            onClose={() => setPosition(null)}
            position={position}
            size="sm"
          >
            <DialogHeader title={`Position: ${position}`} />
            <DialogContent>
              <p className="text-sm">
                Dialog positioned at <strong>{position}</strong>.
              </p>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  function DraggableExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open Draggable Dialog</Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} draggable>
          <DialogHeader title="Drag Me Around" />
          <DialogContent>
            <p>Click and hold the header to drag this dialog.</p>
            <p className="text-sm text-aer-muted-foreground mt-2">
              The dialog will stay within viewport boundaries.
            </p>
          </DialogContent>
          <DialogFooter
            defaultActions={{ onConfirm: () => setIsOpen(false) }}
          />
        </Dialog>
      </div>
    );
  }

  function ResizableExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open Resizable Dialog</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          resizable
          minWidth={300}
          minHeight={200}
          maxWidth={800}
          maxHeight={600}
        >
          <DialogHeader title="Resizable & Responsive" />
          <DialogContent>
            <p>This dialog demonstrates resizable constraints:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>
                <strong>Min size:</strong> 300x200
              </li>
              <li>
                <strong>Max size:</strong> 800x600 (respected)
              </li>
              <li>
                <strong>Viewport:</strong> Will never exceed viewport size
              </li>
            </ul>
            <p className="mt-4 text-xs text-aer-muted-foreground italic">
              Try resizing from any edge or corner. The initial size is captured
              accurately without jumping.
            </p>
          </DialogContent>
          <DialogFooter
            defaultActions={{ onConfirm: () => setIsOpen(false) }}
          />
        </Dialog>
      </div>
    );
  }

  function MaximizeMinimizeExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog with Controls
        </Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          maximizable
          minimizable
        >
          <DialogHeader title="Window Controls" />
          <DialogContent>
            <p>Use the buttons in the header to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Maximize:</strong> Expand to full screen
              </li>
              <li>
                <strong>Minimize:</strong> Collapse to title bar only
              </li>
              <li>
                <strong>Restore:</strong> Return to normal size
              </li>
            </ul>
          </DialogContent>
          <DialogFooter
            defaultActions={{ onConfirm: () => setIsOpen(false) }}
          />
        </Dialog>
      </div>
    );
  }

  function SizesExample() {
    const [size, setSize] = React.useState<any>(null);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => setSize("sm")}>
            Small
          </Button>
          <Button size="sm" onClick={() => setSize("md")}>
            Medium
          </Button>
          <Button size="sm" onClick={() => setSize("lg")}>
            Large
          </Button>
          <Button size="sm" onClick={() => setSize("xl")}>
            Extra Large
          </Button>
          <Button size="sm" onClick={() => setSize("full")}>
            Full Screen
          </Button>
        </div>

        {size && (
          <Dialog isOpen={!!size} onClose={() => setSize(null)} size={size}>
            <DialogHeader title={`Size: ${size.toUpperCase()}`} />
            <DialogContent>
              <p>
                This dialog uses the <strong>{size}</strong> size variant.
              </p>
            </DialogContent>
            <DialogFooter defaultActions={{ onConfirm: () => setSize(null) }} />
          </Dialog>
        )}
      </div>
    );
  }

  function CloseMechanismsExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open Persistent Dialog</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
          closeOnEscape={false}
          closeOnBackdropClick={false}
        >
          <DialogHeader title="Important Notice" />
          <DialogContent>
            <p>
              This dialog cannot be closed by clicking outside or pressing ESC.
            </p>
            <p className="text-sm text-aer-muted-foreground mt-2">
              You must use the button below to close it.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  function RealWorldExample() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: "John Doe",
      email: "john@example.com",
      bio: "Software developer",
    });

    const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsOpen(false);
        alert("Profile updated!");
      }, 1500);
    };

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>
          <User className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          draggable
          resizable
          maximizable
          minimizable
          size="lg"
          minWidth={500}
          minHeight={400}
        >
          <DialogHeader
            title="Edit Profile"
            icon={<User className="w-5 h-5" />}
          />
          <DialogContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-aer-foreground">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-aer-border rounded-md bg-aer-background text-aer-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-aer-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-aer-border rounded-md bg-aer-background text-aer-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-aer-foreground">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-aer-border rounded-md bg-aer-background text-aer-foreground"
                  rows={3}
                />
              </div>
            </div>
          </DialogContent>
          <DialogFooter
            defaultActions={{
              confirmText: "Save Changes",
              onConfirm: handleSave,
              confirmLoading: isSaving,
            }}
          />
        </Dialog>
      </div>
    );
  }

  function AerVariantExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="aer-vibrant-container">
        <div className="aer-vibrant-bg-wrapper">
          <div className="aer-vibrant-bg" />
          <div className="aer-vibrant-blob w-40 h-40 bg-sky-500/30 top-1/4 left-1/3" />
          <div className="aer-vibrant-blob w-40 h-40 bg-blue-500/30 bottom-1/4 right-1/3" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
            Signature Aesthetic
          </p>
          <Button
            variant="aer"
            size="lg"
            onClick={() => setIsOpen(true)}
            className="shadow-2xl shadow-blue-500/20"
          >
            Launch Aer Dialog
          </Button>
        </div>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          variant="aer"
          size="md"
        >
          <DialogHeader
            title="Aer Design System"
            icon={<Sparkles className="w-5 h-5 text-blue-400" />}
          />
          <DialogContent>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                The Aer variant represents our highest level of visual craft. It
                combines multi-layered glassmorphism with dynamic gradients and
                micro-interactions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Blur Radius</p>
                  <p className="text-sm font-medium text-white">
                    40px Ultra Soft
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Translucency</p>
                  <p className="text-sm font-medium text-white">
                    85% Pure Glass
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogFooter
            defaultActions={{
              confirmText: "Experience It",
              onConfirm: () => setIsOpen(false),
            }}
          />
        </Dialog>
      </div>
    );
  }

  function GranularStylingExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-purple-500/50 text-purple-600 hover:bg-purple-50"
        >
          Open Custom Styled Dialog
        </Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="bg-linear-to-br from-purple-50 to-white border-purple-200 shadow-purple-500/10"
          overlayClassName="backdrop-blur-sm bg-purple-900/10"
        >
          <DialogHeader
            title="Granular Styling"
            className="border-purple-100 bg-white/50"
            titleClassName="text-purple-900 font-serif italic"
          />
          <DialogContent className="text-purple-800">
            <p>
              This dialog uses granular class names to customize every layer:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>className:</strong> Custom background and border
              </li>
              <li>
                <strong>overlayClassName:</strong> Purple-tinted backdrop
              </li>
              <li>
                <strong>titleClassName:</strong> Custom font and color
              </li>
            </ul>
          </DialogContent>
          <DialogFooter className="bg-purple-50/50 border-purple-100">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none"
              onClick={() => setIsOpen(false)}
            >
              Close Styled Dialog
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  function MinimizedStackingExample() {
    const [dialogs, setDialogs] = React.useState<number[]>([]);

    const addDialog = () => {
      setDialogs((prev) => [...prev, Date.now()]);
    };

    const removeDialog = (id: number) => {
      setDialogs((prev) => prev.filter((d) => d !== id));
    };

    const getCascadePosition = (index: number) => {
      if (typeof window === "undefined") return { x: 100, y: 100 };

      const step = 40;
      const margin = 60; // Start margin
      const dialogWidth = 320; // Width of w-80
      const dialogHeight = 240; // Estimated height

      const usableWidth = window.innerWidth - dialogWidth - margin;
      const usableHeight = window.innerHeight - dialogHeight - margin;

      const itemsPerRow = Math.max(1, Math.floor(usableWidth / step));
      const itemsPerCol = Math.max(1, Math.floor(usableHeight / step));

      // Total items before we strictly MUST wrap
      const maxItems = itemsPerRow * itemsPerCol;
      const localIndex = index % maxItems;

      const col = localIndex % itemsPerRow;
      const row = Math.floor(localIndex / itemsPerRow);

      return {
        x: margin + col * step,
        y: margin + row * step,
      };
    };

    return (
      <div className="space-y-4 p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold mb-1">
              Window Management Demo
            </h4>
            <p className="text-sm text-aer-muted-foreground">
              Open multiple dialogs. Windows will cascade intelligently and
              remain within viewport bounds.
            </p>
          </div>
          <Button onClick={addDialog} size="sm">
            Open New Dialog
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {dialogs.length === 0 && (
            <p className="text-xs text-aer-muted-foreground italic w-full text-center py-4">
              No active dialogs. Click "Open New Dialog" to start.
            </p>
          )}
          {dialogs.map((id, index) => (
            <div
              key={id}
              className="text-xs border px-2 py-1 rounded bg-aer-muted/20"
            >
              Dialog #{index + 1} (Active)
            </div>
          ))}
        </div>

        {dialogs.map((id, index) => {
          const pos = getCascadePosition(index);
          return (
            <Dialog
              key={id}
              isOpen={true}
              onClose={() => removeDialog(id)}
              minimizable
              maximizable
              draggable
              resizable
              position="center"
              x={pos.x}
              y={pos.y}
              className="w-80"
              showBackdrop={false} // Disable backdrop for multi-window demo
            >
              <DialogHeader title={`Dialog ${index + 1}`} />
              <DialogContent>
                <p className="text-sm text-aer-muted-foreground mb-4">
                  I am dialog window #{index + 1}.
                </p>
                <p className="text-xs">
                  Click the <strong>_</strong> button in the header to minimize
                  me.
                </p>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    );
  }

  function CustomUsageExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-12 border border-aer-border rounded-xl bg-aer-background shadow-inner flex flex-col items-center gap-4">
        <p className="text-xs font-mono text-aer-muted-foreground uppercase tracking-widest">
          Headless Mode Demonstration
        </p>
        <Button
          variant="secondary"
          className="rounded-full px-8 shadow-lg hover:shadow-aer-primary/20 transition-all"
          onClick={() => setIsOpen(true)}
        >
          Launch Logic-Only Dialog
        </Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} headless>
          <div className="bg-zinc-900 text-white rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden w-[340px] p-8 -rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black bg-sky-500 px-2 py-0.5 rounded text-black uppercase">
                  Logic Only
                </span>
                <h3 className="text-2xl font-black mt-2 tracking-tighter">
                  HEADLESS
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              I have <strong>zero</strong> Aer Design CSS. No default padding,
              no white background, no standard borders. I am 100% custom
              HTML/CSS harnessing the Dialog's portal and accessiblity logic.
            </p>

            <Button
              variant="aer"
              className="w-full rounded-2xl h-12 text-md font-bold"
              onClick={() => setIsOpen(false)}
            >
              Close Instance
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }

  function InteractionStatesExample() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleAction = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open States Demo</Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DialogHeader title="Interaction States" />
          <DialogContent>
            <div className="space-y-4">
              <p>Demonstrating various component states within a dialog.</p>
              <div className="flex flex-wrap gap-4">
                <Button isLoading={isLoading} onClick={handleAction}>
                  {isLoading ? "Processing..." : "Loading State"}
                </Button>
                <Button disabled>Disabled Button</Button>
                <div className="flex items-center gap-2 p-2 border rounded-md border-aer-border hover:border-aer-primary transition-colors cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border border-aer-border group-hover:border-aer-primary group-active:bg-aer-primary transition-all" />
                  <span className="text-sm">Hover & Active State</span>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogFooter
            defaultActions={{
              onConfirm: handleAction,
              confirmLoading: isLoading,
            }}
          />
        </Dialog>
      </div>
    );
  }

  function SpecializedContextsExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Open IDE Context Demo</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom-right"
          showBackdrop={false}
          className="w-80 shadow-2xl border-aer-primary/20"
        >
          <DialogHeader
            title="Debug Console"
            icon={<Info className="w-4 h-4 text-blue-500" />}
          />
          <DialogContent className="bg-zinc-950 font-mono text-xs p-4 h-64 overflow-y-auto">
            <div className="text-zinc-500 border-b border-white/5 pb-1 mb-2">
              System initialized...
            </div>
            <div className="text-blue-400 mb-1">GET /api/v1/user 200 OK</div>
            <div className="text-green-400 mb-1">Websocket connected.</div>
            <div className="text-zinc-300 animate-pulse underline select-none mt-4">
              _
            </div>
          </DialogContent>
          <DialogFooter className="p-2 border-t border-white/5 bg-zinc-900">
            <span className="text-[10px] text-zinc-500">
              Writing Mode: Active
            </span>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  function ValidationErrorsExample() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [error, setError] = React.useState(true);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Button onClick={() => setIsOpen(true)}>Validation Demo</Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DialogHeader
            title="Account Setup"
            className={error ? "border-b-red-500/50" : "border-b-green-500/50"}
          />
          <DialogContent>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase text-aer-muted-foreground mb-1 block">
                  Username
                </label>
                <div
                  className={`flex items-center gap-2 p-2 border rounded-md bg-aer-background transition-all ${
                    error
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-aer-border focus-within:border-aer-primary"
                  }`}
                >
                  <input
                    className="bg-transparent border-none outline-none text-sm w-full"
                    placeholder="Enter username"
                    onChange={(e) => setError(e.target.value.length < 3)}
                  />
                  {error ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                {error && (
                  <p className="text-[10px] text-red-500 mt-1">
                    Username must be at least 3 characters.
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogFooter
            defaultActions={{
              onConfirm: () => setIsOpen(false),
              confirmDisabled: error,
            }}
          />
        </Dialog>
      </div>
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="dialog-props" className="text-lg font-bold mb-4">
          DialogProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Dialog component accepts all standard div attributes plus the
          following props.
        </p>
        <ApiTable
          data={[
            {
              prop: "isOpen",
              type: "boolean",
              default: "-",
              description: "Controls the visibility of the dialog. Required.",
            },
            {
              prop: "onClose",
              type: "() => void",
              default: "-",
              description: "Callback when dialog should close. Required.",
            },
            {
              prop: "position",
              type: '"center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"center"',
              description:
                "Preset position for the dialog. Cannot be used with x,y props. Automatically clamps to viewport safety bounds on resize.",
            },
            {
              prop: "x",
              type: "number",
              default: "-",
              description:
                "Custom x position in pixels from left. Cannot be used with position prop.",
            },
            {
              prop: "y",
              type: "number",
              default: "-",
              description:
                "Custom y position in pixels from top. Cannot be used with position prop.",
            },
            {
              prop: "size",
              type: '"sm" | "md" | "lg" | "xl" | "full" | "auto"',
              default: '"md"',
              description:
                "Predefined size variant. sm=400px, md=600px, lg=800px, xl=1000px.",
            },
            {
              prop: "width",
              type: "string | number",
              default: "-",
              description: "Custom width. Overrides size prop.",
            },
            {
              prop: "height",
              type: "string | number",
              default: "-",
              description: "Custom height.",
            },
            {
              prop: "variant",
              type: '"default" | "alert" | "confirm" | "aer"',
              default: '"default"',
              description:
                "Visual style variant. 'alert' has yellow border, 'confirm' has primary border, 'aer' has glassmorphism.",
            },
            {
              prop: "showCloseButton",
              type: "boolean",
              default: "true",
              description: "Show close button in header.",
            },
            {
              prop: "closeOnEscape",
              type: "boolean",
              default: "true",
              description: "Allow closing with ESC key.",
            },
            {
              prop: "closeOnBackdropClick",
              type: "boolean",
              default: "true",
              description: "Allow closing by clicking outside the dialog.",
            },
            {
              prop: "showBackdrop",
              type: "boolean",
              default: "true",
              description:
                "Show backdrop overlay. When false, the overlay uses 'pointer-events-none' to allow interacting with content behind the dialog (optimized for multi-window setups).",
            },
            {
              prop: "backdropBlur",
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Backdrop blur intensity.",
            },
            {
              prop: "draggable",
              type: "boolean",
              default: "false",
              description:
                "Enable dragging by header. Disabled when maximized. Interacting with the header automatically brings the dialog to the front of the visual stack.",
            },
            {
              prop: "resizable",
              type: "boolean",
              default: "false",
              description:
                "Enable resize handles. Disabled when maximized. Resizing automatically brings the dialog to the front.",
            },
            {
              prop: "maximizable",
              type: "boolean",
              default: "false",
              description:
                "Show maximize button in header. Maximizing automatically brings the window to the front.",
            },
            {
              prop: "minimizable",
              type: "boolean",
              default: "false",
              description:
                "Show minimize button in header. When minimized: dialog moves to bottom-left, hides backdrop, and enables click-through on the overlay area while remaining interactive itself. Features multi-row wrapping for many windows.",
            },
            {
              prop: "defaultMaximized",
              type: "boolean",
              default: "false",
              description: "Start dialog in maximized state.",
            },
            {
              prop: "defaultMinimized",
              type: "boolean",
              default: "false",
              description: "Start dialog in minimized state.",
            },
            {
              prop: "headless",
              type: "boolean",
              default: "false",
              description:
                "Remove all default styling for full custom control.",
            },
            {
              prop: "header",
              type: "ReactNode",
              default: "-",
              description:
                "Custom header content. Replaces default DialogHeader.",
            },
            {
              prop: "footer",
              type: "ReactNode",
              default: "-",
              description: "Custom footer content.",
            },
            {
              prop: "minWidth",
              type: "number",
              default: "200",
              description: "Minimum width for resizable dialogs.",
            },
            {
              prop: "minHeight",
              type: "number",
              default: "100",
              description: "Minimum height for resizable dialogs.",
            },
            {
              prop: "maxWidth",
              type: "number",
              default: "-",
              description: "Maximum width for resizable dialogs.",
            },
            {
              prop: "maxHeight",
              type: "number",
              default: "-",
              description: "Maximum height for resizable dialogs.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for dialog container.",
            },
            {
              prop: "overlayClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for overlay wrapper.",
            },
            {
              prop: "contentClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for content area.",
            },
            {
              prop: "backdropClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for backdrop.",
            },
            {
              prop: "animationDuration",
              type: "number",
              default: "200",
              description: "Animation duration in milliseconds.",
            },
            {
              prop: "ariaLabel",
              type: "string",
              default: "-",
              description: "Accessible label for the dialog.",
            },
            {
              prop: "ariaDescribedBy",
              type: "string",
              default: "-",
              description: "ID of element describing the dialog.",
            },
            {
              prop: "onOpen",
              type: "() => void",
              default: "-",
              description: "Callback when dialog opens.",
            },
            {
              prop: "onAfterClose",
              type: "() => void",
              default: "-",
              description: "Callback after dialog close animation completes.",
            },
            {
              prop: "onDragStart",
              type: "() => void",
              default: "-",
              description: "Callback when dragging starts.",
            },
            {
              prop: "onDragEnd",
              type: "(position: { x: number; y: number }) => void",
              default: "-",
              description: "Callback when dragging ends with final position.",
            },
            {
              prop: "onResizeStart",
              type: "() => void",
              default: "-",
              description: "Callback when resizing starts.",
            },
            {
              prop: "onResizeEnd",
              type: "(size: { width: number; height: number }) => void",
              default: "-",
              description: "Callback when resizing ends with final size.",
            },
            {
              prop: "onMaximize",
              type: "() => void",
              default: "-",
              description: "Callback when dialog is maximized.",
            },
            {
              prop: "onMinimize",
              type: "() => void",
              default: "-",
              description: "Callback when dialog is minimized.",
            },
            {
              prop: "onRestore",
              type: "() => void",
              default: "-",
              description:
                "Callback when dialog is restored from maximized/minimized state.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="dialog-header-props" className="text-lg font-bold mb-4">
          DialogHeaderProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "title",
              type: "string",
              default: "-",
              description: "Header title text.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "-",
              description: "Icon to display before title.",
            },
            {
              prop: "showCloseButton",
              type: "boolean",
              default: "true",
              description: "Show close button.",
            },
            {
              prop: "showMaximizeButton",
              type: "boolean",
              default: "false",
              description: "Show maximize button.",
            },
            {
              prop: "showMinimizeButton",
              type: "boolean",
              default: "false",
              description: "Show minimize button.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for header.",
            },
            {
              prop: "titleClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for title.",
            },
            {
              prop: "closeButtonClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for close button.",
            },
            {
              prop: "controlButtonsClassName",
              type: "string",
              default: "-",
              description:
                "Additional CSS classes for control buttons container.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="dialog-content-props" className="text-lg font-bold mb-4">
          DialogContentProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "scrollable",
              type: "boolean",
              default: "true",
              description: "Enable scrolling for overflow content.",
            },
            {
              prop: "padding",
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Content padding size.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for content area.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="dialog-footer-props" className="text-lg font-bold mb-4">
          DialogFooterProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "align",
              type: '"left" | "center" | "right" | "space-between"',
              default: '"right"',
              description: "Footer content alignment.",
            },
            {
              prop: "defaultActions",
              type: "object",
              default: "-",
              description:
                "Configuration for default Cancel/Confirm buttons. See below for details.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for footer.",
            },
          ]}
        />

        <h4 className="text-md font-semibold mt-6 mb-3">
          defaultActions Configuration
        </h4>
        <ApiTable
          data={[
            {
              prop: "showCancel",
              type: "boolean",
              default: "true",
              description: "Show cancel button.",
            },
            {
              prop: "showConfirm",
              type: "boolean",
              default: "true",
              description: "Show confirm button.",
            },
            {
              prop: "cancelText",
              type: "string",
              default: '"Cancel"',
              description: "Cancel button text.",
            },
            {
              prop: "confirmText",
              type: "string",
              default: '"Confirm"',
              description: "Confirm button text.",
            },
            {
              prop: "onCancel",
              type: "() => void",
              default: "-",
              description: "Cancel button click handler.",
            },
            {
              prop: "onConfirm",
              type: "() => void",
              default: "-",
              description: "Confirm button click handler.",
            },
            {
              prop: "confirmVariant",
              type: '"primary" | "destructive"',
              default: '"primary"',
              description:
                "Confirm button variant. 'primary' renders as default, 'destructive' for dangerous actions.",
            },
            {
              prop: "confirmLoading",
              type: "boolean",
              default: "false",
              description: "Show loading state on confirm button.",
            },
            {
              prop: "cancelDisabled",
              type: "boolean",
              default: "false",
              description: "Disable cancel button.",
            },
            {
              prop: "confirmDisabled",
              type: "boolean",
              default: "false",
              description: "Disable confirm button.",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <div className="space-y-8">
      <div>
        <h3 id="css-variables" className="text-lg font-bold mb-4">
          CSS Variables
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Dialog component uses the following CSS variables from the Aer
          Design theme system:
        </p>
        <ApiTable
          data={[
            {
              prop: "--color-aer-background",
              type: "color",
              default: "hsl(0 0% 100%)",
              description: "Dialog background color",
            },
            {
              prop: "--color-aer-foreground",
              type: "color",
              default: "hsl(222.2 84% 4.9%)",
              description: "Dialog text color",
            },
            {
              prop: "--color-aer-border",
              type: "color",
              default: "hsl(214.3 31.8% 91.4%)",
              description: "Dialog border color",
            },
            {
              prop: "--color-aer-muted-foreground",
              type: "color",
              default: "hsl(215.4 16.3% 46.9%)",
              description: "Muted text color for secondary content",
            },
            {
              prop: "--color-aer-accent",
              type: "color",
              default: "hsl(210 40% 96.1%)",
              description: "Hover state for control buttons",
            },
            {
              prop: "--color-aer-ring",
              type: "color",
              default: "hsl(221.2 83.2% 53.3%)",
              description: "Focus ring color",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="animations" className="text-lg font-bold mb-4">
          Animations
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Dialog uses two CSS animations:
        </p>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">fadeIn</h4>
            <p className="text-sm text-aer-muted-foreground">
              Applied to the overlay wrapper. Fades in from opacity 0 to 1.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">scaleIn</h4>
            <p className="text-sm text-aer-muted-foreground">
              Applied to the dialog container. Scales from 0.95 to 1 while
              fading in.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 id="customization" className="text-lg font-bold mb-4">
          Customization Examples
        </h3>
        <CodeBlock
          ts={`// Custom dialog with gradient background
<Dialog 
  className="bg-linear-to-br from-purple-500/10 to-pink-500/10"
  backdropClassName="bg-black/70"
>
  <DialogHeader 
    className="bg-linear-to-r from-purple-600 to-pink-600 text-white border-0"
    titleClassName="text-white"
  />
  <DialogContent className="text-purple-900">
    Custom styled content
  </DialogContent>
</Dialog>

// Dark glass dialog
<Dialog 
  variant="aer"
  className="bg-zinc-900/90 backdrop-blur-2xl border-white/10"
>
  <DialogHeader className="border-white/10" />
  <DialogContent className="text-white">
    Glassmorphism with dark theme
  </DialogContent>
</Dialog>`}
          fullCode={`import { Dialog, DialogHeader, DialogContent } from "aer-design";

export default function CustomStyledDialog() {
  return (
    <Dialog 
      isOpen={isOpen}
      onClose={onClose}
      className="bg-linear-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
      backdropClassName="bg-black/70 backdrop-blur-sm"
    >
      <DialogHeader 
        title="Custom Styled Dialog"
        className="bg-linear-to-r from-purple-600 to-pink-600 text-white border-0"
        titleClassName="text-white"
        closeButtonClassName="text-white hover:bg-white/20"
      />
      <DialogContent className="text-purple-900">
        <p>This dialog has custom gradient styling.</p>
      </DialogContent>
    </Dialog>
  );
}`}
        />
      </div>
      <div>
        <h3 id="auto-contrast" className="text-lg font-bold mb-4">
          Auto-Contrast
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Dialog supports automatic text contrast adjustment based on the
          container background color to ensure WCAG 2.1 accessibility
          compliance.
        </p>
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            <strong>Tip:</strong> This feature is automatically enabled when
            using <code>AerConfigProvider</code> with{" "}
            <code>autoContrast: true</code>.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-aer-foreground">Dialog</h1>
        <p className="text-lg text-aer-muted-foreground">
          A powerful, feature-rich modal dialog component with advanced
          controls.
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
              { id: "variants", title: "Visual Variants" },
              { id: "custom", title: "Custom Usage (Headless)" },
              { id: "positioning", title: "Positioning" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "draggable", title: "Draggable Dialog" },
              { id: "resizable", title: "Resizable Dialog" },
              { id: "maximize-minimize", title: "Maximize & Minimize" },
              { id: "minimized-stacking", title: "Advanced Window Management" },
              { id: "sizes", title: "Dialog Sizes" },
              { id: "close-mechanisms", title: "Close Mechanisms" },
              { id: "states", title: "Interaction States" },
              { id: "specialized", title: "Specialized Contexts" },
              { id: "validation", title: "Validation & Errors" },
              { id: "styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "dialog-props", title: "DialogProps" },
              { id: "dialog-header-props", title: "DialogHeaderProps" },
              { id: "dialog-content-props", title: "DialogContentProps" },
              { id: "dialog-footer-props", title: "DialogFooterProps" },
            ],
          },
          {
            id: "theming",
            label: "Theming",
            content: theming,
            toc: [
              { id: "css-variables", title: "CSS Variables" },
              { id: "auto-contrast", title: "Auto-Contrast" },
              { id: "animations", title: "Animations" },
              { id: "customization", title: "Customization Examples" },
            ],
          },
        ]}
      />
    </div>
  );
}
