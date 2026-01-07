import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Toast, toast, type ToastPosition } from "@/components/Toast/index.tsx";
import {
  AlertTriangle,
  CheckCircle,
  Hash,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function ToastDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A flexible notification system with 9-position support and stackable history."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Toast component provides brief, non-blocking feedback about an
            operation. It features a robust positioning engine, automatic
            stacking, and keyboard accessibility.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>9 Positioning Zones</strong>: Robust placement engine for
              any layout.
            </li>
            <li>
              <strong>Stackable History</strong>: Auto-queuing system without
              visual overlap.
            </li>
            <li>
              <strong>Dual Mode Architecture</strong>: Use globally (Zero
              Config) or as a standalone component.
            </li>
            <li>
              <strong>Aer Flagship Variant</strong>: Premium glassmorphism with
              dynamic depth.
            </li>
            <li>
              <strong>Zero Dependencies</strong>: Lightweight (3kb gzipped) and
              accessible by default.
            </li>
            <li>
              <strong>Multidirectional Swipe</strong>: Built-in support for
              swipe-to-dismiss interactions (horizontal, vertical, or both).
            </li>
          </ul>
        </div>

        <div className="mt-8 space-y-8 border-t pt-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Accessibility First</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg bg-aer-muted/5">
                <h4 className="font-semibold mb-2">ARIA Features</h4>
                <ul className="text-sm space-y-1 list-disc pl-5 text-aer-muted-foreground">
                  <li>
                    <strong>Role="status"</strong>: For success, info, and
                    loading toasts (polite announcement).
                  </li>
                  <li>
                    <strong>Role="alert"</strong>: For error and warning toasts
                    (assertive announcement).
                  </li>
                  <li>
                    <strong>Aria-live</strong>: Automatically managed based on
                    variant.
                  </li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg bg-aer-muted/5">
                <h4 className="font-semibold mb-2">Keyboard Support</h4>
                <ul className="text-sm space-y-1 list-disc pl-5 text-aer-muted-foreground">
                  <li>
                    <strong>Esc</strong>: Dismisses the focused toast.
                  </li>
                  <li>
                    <strong>Tab</strong>: Focus stays trapped within the toast
                    actions until dismissed.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Framework Agnostic Design
            </h3>
            <div className="prose prose-sm max-w-none text-aer-muted-foreground">
              <p>
                The Toast component uses primitive types (strings, numbers,
                booleans) for its core properties involving state and
                positioning. Complex rendering is handled via standard{" "}
                <code>ReactNode</code> children or helper functions, ensuring
                the logic remains portable.
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>Strings for Content</strong>: Title and description
                  accept simple strings.
                </li>
                <li>
                  <strong>Boolean Flags</strong>: Controls for behavior like
                  `open` or `duration`.
                </li>
                <li>
                  <strong>Standard CSS</strong>: Styling relies on standard CSS
                  variables and utility classes, not framework-specific runtime
                  styles.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Architecture & Internals
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-aer-muted/5">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Global Singleton
                  </h4>
                  <p className="text-sm text-aer-muted-foreground">
                    The content is managed by <code>globalToastManager</code>, a
                    vanilla JS singleton. This allows <code>toast()</code> to
                    work anywhere, even outside React components.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-aer-muted/5">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Auto-Injection
                  </h4>
                  <p className="text-sm text-aer-muted-foreground">
                    If no container is found when <code>toast()</code> is
                    called, the system automatically mounts a{" "}
                    <code>GlobalToastContainer</code> into a new{" "}
                    <code>div</code> in the document body.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-lg">
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Context Isolation Warning
                </h4>
                <p className="text-sm text-aer-muted-foreground">
                  The auto-injected container runs in a{" "}
                  <strong>separate React Root</strong>. This means it cannot
                  access your App's contexts (like <code>Redux</code>,
                  <code>React Router</code>, or <code>ThemeContext</code>).
                  <br />
                  <br />
                  If your toasts need access to Context (e.g. using{" "}
                  <code>Link</code> components inside a toast), you should
                  manually mount <code>&lt;GlobalToastContainer /&gt;</code>{" "}
                  inside your App providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Best practices for using toasts vs other feedback mechanisms."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Use Toasts for
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Success messages (Saved, Updated, Sent)</li>
              <li>Non-critical errors (Network retry, Form invalid)</li>
              <li>System status updates (Download complete)</li>
              <li>Undo actions within a short window</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              Don't Use Toasts for
            </h4>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Critical errors meant to block the user (Use Dialog)</li>
              <li>Complex forms or inputs (Use Modal/Drawer)</li>
              <li>Persistent information that must not disappear</li>
              <li>Lengthy text content</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="Triggering toasts programmatically using the global function."
      >
        <BasicUsageExample />
        <CodeBlock
          ts={`import { toast } from "aer-design";

const showSuccess = () => {
  toast({
    title: "Project Created",
    description: "Your new project has been successfully initialized.",
    variant: "success",
  });
};`}
          fullCode={`import { Button, toast } from "aer-design";

export default function BasicToast() {
  return (
    <div className="flex gap-4">
      <Button 
        onClick={() => toast({ 
          title: "Scheduled: Catch up", 
          description: "Friday, February 10, 2023 at 5:57 PM",
          duration: 3000
        })}
      >
        Show Default Toast
      </Button>
      
      <Button 
        variant="outline"
        onClick={() => toast({ 
          variant: "success",
          title: "Changes Saved",
          description: "Your settings have been updated.",
        })}
      >
        Show Success Toast
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="standalone"
        title="Standalone Mode"
        description="Use toasts globally without a provider (like PrimeReact)."
      >
        <div className="mb-6">
          <StandaloneExample />
        </div>
        <CodeBlock
          ts={`const [seed, setSeed] = useState(0);

return (
  <>
    <Button onClick={() => setSeed(s => s + 1)}>
      Show Stacked Toast
    </Button>
    
    {/* 
      Using 'key' forces a new instance.
      'dismissOnUnmount={false}' prevents the old one from closing 
      when the component updates.
    */}
    {seed > 0 && (
      <Toast 
        key={seed}
        dismissOnUnmount={false}
        title="Declarative"
        description={\`ID: \${seed}\`}
        variant="success"
      />
    )}
  </>
);`}
          fullCode={`import { Toast, Button } from "aer-design";
import { useState } from "react";

// Zero Setup: GlobalToastContainer is auto-injected if missing!

// 2. Isolate your stacking logic
export default function StackedToasts() {
  const [seed, setSeed] = useState(0);

  return (
    <div className="flex flex-col gap-4">
       <Button onClick={() => setSeed(s => s + 1)}>
         Show Stacked Toast
       </Button>

       {seed > 0 && (
         <Toast
           key={seed}
           dismissOnUnmount={false}
           title="Declarative Toast"
           description={\`Instance ID: \${seed}\`}
           variant="success"
         />
       )}
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> Even when using{" "}
            <code>&lt;Toast /&gt;</code> declaratively, it delegates rendering
            to the Global Manager. This ensures improper overlapping is
            impossible, and z-index stacking is handled automatically.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Standard status indicators for different feedbacks."
      >
        <VariantsExample />
        <CodeBlock
          ts={`toast({ variant: "success", title: "Success" });
toast({ variant: "error", title: "Error" });
toast({ variant: "warning", title: "Warning" });
toast({ variant: "info", title: "Info" });`}
          fullCode={`import { Button, useToast } from "aer-design";

export default function ToastVariants() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        variant="outline" 
        className="text-green-600 border-green-200 hover:bg-green-50"
        onClick={() => toast({ variant: "success", title: "Success", description: "Operation completed successfully." })}
      >
        Success
      </Button>
      <Button 
        variant="outline"
        className="text-red-600 border-red-200 hover:bg-red-50"
        onClick={() => toast({ variant: "error", title: "Error", description: "Something went wrong." })}
      >
        Error
      </Button>
      <Button 
        variant="outline"
        className="text-amber-600 border-amber-200 hover:bg-amber-50"
        onClick={() => toast({ variant: "warning", title: "Warning", description: "Your subscription expires soon." })}
      >
        Warning
      </Button>
      <Button 
        variant="outline"
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
        onClick={() => toast({ variant: "info", title: "Update Available", description: "A new version is ready to install." })}
      >
        Info
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Premium glassmorphism effect for high-priority alerts."
      >
        <AerVariantExample />
        <CodeBlock
          ts={`toast({
  variant: "aer",
  title: "Welcome to Aer Pro",
  description: "You have successfully upgraded your plan.",
  duration: 8000
});`}
          fullCode={`import { Button, useToast } from "aer-design";
import { Sparkles } from "lucide-react";

export default function AerToastExample() {
  const { toast } = useToast();

  return (
    <div className="aer-vibrant-container dark p-12 rounded-xl relative overflow-hidden flex items-center justify-center">
       <div className="aer-vibrant-bg" />
       
       <Button 
         variant="aer" 
         size="lg"
         onClick={() => toast({
           variant: "aer",
           title: "Welcome to Aer Pro",
           description: "You have successfully upgraded your plan.",
           position: "top-center"
         })}
       >
         <Sparkles className="w-4 h-4 mr-2" />
         Trigger Aer Toast
       </Button>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro Tip: Maximizing the Glass Effect</strong>
            <br />
            The Aer variant uses a <code>backdrop-blur</code> with
            semi-transparent backgrounds. It looks best when:
            <ul className="list-disc pl-5 mt-2 space-y-1 opacity-80">
              <li>
                Used over <strong>vibrant, colorful backgrounds</strong> or
                images.
              </li>
              <li>
                Used in <strong>Dark Mode</strong> where the glow effect pops.
              </li>
              <li>
                Avoid using it on solid white backgrounds where the effect is
                invisible.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="interaction-states"
        title="Interactions & Gestures"
        description="Hover behaviors, focus management, and touch swipe customization."
      >
        <div className="mb-4">
          <p className="text-aer-muted-foreground">
            Toasts are interactive by default. They pause on hover (or touch
            press) to allow users to read content. On touch devices, users can
            dismiss toasts with swipe gestures. You can configure the allowed
            direction using the <code>swipeDirection</code> prop.
          </p>
        </div>
        <InteractionStatesExample />
        <CodeBlock
          ts={`// Hover pauses the timer
// Action button focus states`}
          fullCode={`import { Button, toast } from "aer-design";

export default function InteractionDemo() {
  return (
    <div className="flex gap-4">
      <Button 
        onClick={() => toast({
           title: "Undo Action",
           description: "Hover to pause. Click Undo to test action.",
           duration: 5000,
           action: {
             label: "Undo",
             onClick: () => alert("Undo clicked!")
           }
        })}
      >
        Trigger Interactive Toast
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="touch-interactions"
        title="Touch Interactions"
        description="Configure swipe direction for mobile devices."
      >
        <div className="mb-4">
          <p className="text-aer-muted-foreground">
            Customize how users dismiss toasts on touch devices using the{" "}
            <code>swipeDirection</code> prop.
          </p>
        </div>
        <SwipeInteractionDemo />
        <CodeBlock
          ts={`toast({
  title: "Vertical Swipe",
  swipeDirection: "vertical", // "horizontal" | "up" | "down" | ...
})`}
          fullCode={`import { Button, toast } from "aer-design";

export default function SwipeDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        onClick={() => toast({
           title: "Horizontal Swipe",
           swipeDirection: "horizontal", // left or right
        })}
      >
        Horizontal
      </Button>

      <Button 
        variant="outline"
        onClick={() => toast({
           title: "Vertical Swipe",
           swipeDirection: "vertical", // up or down
        })}
      >
         Vertical
      </Button>
    </div>
  );
}`}
        />
      </DocSection>
      <DocSection
        id="transparency"
        title="Transparency Control"
        description="Adjust the opacity level of the toast background."
      >
        <TransparencyExample />
        <CodeBlock
          ts={`toast({ \n  transparency: 0.7, \n  title: "70% Opacity", \n  variant: "info" \n});`}
          fullCode={`import { Button, useToast } from "aer-design";
import { useState } from "react";

export default function TransparencyDemo() {
  const { toast } = useToast();
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="space-y-4">
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={opacity}
        onChange={(e) => setOpacity(parseFloat(e.target.value))}
      />
      <Button onClick={() => toast({ transparency: opacity, title: \`\${(opacity * 100).toFixed(0)}%\` })}>
        Show Toast
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="The toast system supports 9 cardinal positions with independent stacking."
      >
        <PositioningExample />
        <CodeBlock
          ts={`toast({ position: "top-left", title: "Top Left" });
toast({ position: "bottom-center", title: "Bottom Center" });
toast({ position: "center-right", title: "Center Right" });`}
          fullCode={`import { Button, useToast, ToastPosition } from "aer-design";
import { LayoutGrid } from "lucide-react";

export default function PositioningExample() {
  const { toast } = useToast();

  const trigger = (pos: ToastPosition) => {
    toast({
      position: pos,
      title: \`Position: \${pos}\`,
      description: "This toast stacks automatically.",
      duration: 3000
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
      <Button variant="outline" size="sm" onClick={() => trigger("top-left")}>TL</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("top-center")}>TC</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("top-right")}>TR</Button>
      
      <Button variant="outline" size="sm" onClick={() => trigger("center-left")}>CL</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("center")}>C</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("center-right")}>CR</Button>
      
      <Button variant="outline" size="sm" onClick={() => trigger("bottom-left")}>BL</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("bottom-center")}>BC</Button>
      <Button variant="outline" size="sm" onClick={() => trigger("bottom-right")}>BR</Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="granular-styling"
        title="Granular Styling"
        description="Override internal styles using the className prop."
      >
        <GranularStylingExample />
        <CodeBlock
          ts={`toast({
  title: "Dark Mode Toast",
  className: "bg-slate-950 text-white border-slate-800",
  description: "Custom colors applied via className."
});`}
          fullCode={`import { Button, useToast } from "aer-design";

export default function StyledToast() {
  const { toast } = useToast();

  return (
    <div className="flex gap-4">
      <Button 
        variant="outline"
        onClick={() => toast({
          title: "Midnight Toast",
          description: "This toast uses custom Tailwind classes.",
          className: "bg-slate-950 text-white border-slate-800 shadow-2xl"
        })}
      >
        Custom Style
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A profile settings form demonstrating practical toast usage."
      >
        <RealWorldExample />
        <CodeBlock
          ts={`toast({ 
  variant: "success", 
  title: "Profile Updated", 
  description: "Your changes have been saved successfully." 
});`}
          fullCode={`import { Button, Input, useToast } from "aer-design";
import { useState } from "react";

export default function ProfileForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        variant: "success",
        title: "Profile Updated",
        description: "Your changes have been saved successfully."
      });
    }, 1000);
  };

  return (
    <div className="max-w-md p-6 border rounded-lg bg-aer-background space-y-4">
      <h3 className="font-semibold text-lg">Profile Settings</h3>
      <div className="space-y-2">
        <label className="text-sm font-medium">Username</label>
        <Input defaultValue="johndoe" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
         <Button variant="ghost">Cancel</Button>
         <Button isLoading={loading} onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="toast-props" className="text-lg font-bold mb-4">
          ToastProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"default" | "neutral" | "success" | "error" | "warning" | "info" | "aer"',
              default: '"default"',
              description: "Visual style of the toast.",
            },
            {
              prop: "transparency",
              type: "number",
              default: "0.95",
              description: "Opacity level (0.0 - 1.0).",
            },
            {
              prop: "position",
              type: "ToastPosition",
              default: '"top-right"',
              description: "Where the toast appears on screen.",
            },
            {
              prop: "duration",
              type: "number",
              default: "5000",
              description:
                "Time in ms before auto-dismissing. Set Infinity to disable.",
            },
            {
              prop: "title",
              type: "ReactNode",
              default: "-",
              description: "Main heading text.",
            },
            {
              prop: "description",
              type: "ReactNode",
              default: "-",
              description: "Secondary body text.",
            },
            {
              prop: "action",
              type: "{ label: string; onClick: () => void; altText?: string }",
              default: "-",
              description: "Optional action button configuration.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the toast root.",
            },
            {
              prop: "x / y",
              type: "number | string",
              default: "-",
              description: "Custom coordinates for manual positioning.",
            },
            {
              prop: "open",
              type: "boolean",
              default: "-",
              description: "Controlled state (Standalone mode only).",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: "State change callback (Standalone mode only).",
            },
            {
              prop: "swipeDirection",
              type: '"left" | "right" | "up" | "down" | "horizontal" | "vertical"',
              default: '"right"',
              description: "Direction to swipe for dismissal (Touch only).",
            },
            {
              prop: "dismissOnUnmount",
              type: "boolean",
              default: "true",
              description:
                "If false, toast persists after component unmounts (fire-and-forget).",
            },
            {
              prop: "id",
              type: "string",
              default: "auto-generated",
              description: "Unique ID. Useful for updating specific toasts.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="global-api" className="text-lg font-bold mb-4">
          Global API
        </h3>
        <p className="text-aer-muted-foreground mb-4">
          The <code>toast</code> function is the main entry point. It returns
          the toast ID.
        </p>
        <ApiTable
          data={[
            {
              prop: "toast(props)",
              type: "(props: ToastProps) => string",
              default: "-",
              description: "Triggers a custom toast. Returns the ID.",
            },
            {
              prop: "toast.success()",
              type: "(title: string, desc?: string) => string",
              default: "-",
              description: "Helper for success variant.",
            },
            {
              prop: "toast.error()",
              type: "(title: string, desc?: string) => string",
              default: "-",
              description: "Helper for error variant.",
            },
            {
              prop: "toast.warning()",
              type: "(title: string, desc?: string) => string",
              default: "-",
              description: "Helper for warning variant.",
            },
            {
              prop: "toast.info()",
              type: "(title: string, desc?: string) => string",
              default: "-",
              description: "Helper for info variant.",
            },
            {
              prop: "toast.neutral()",
              type: "(title: string, desc?: string) => string",
              default: "-",
              description: "Helper for neutral variant.",
            },
            {
              prop: "toast.dismiss()",
              type: "(id: string) => void",
              default: "-",
              description: "Dismisses a specific toast by ID.",
            },
          ]}
        />
      </div>
      <div>
        <h3 id="variant-usage" className="text-lg font-bold mb-4">
          Variant Usage Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-100 text-blue-700 dark:text-blue-700 border border-blue-300 dark:border-blue-400 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5" />
              <strong className="font-semibold">Info (Default)</strong>
            </div>
            <p className="text-sm opacity-90">
              General updates, system status, or neutral notifications.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-100 dark:bg-green-100 text-green-700 dark:text-green-700 border border-green-300 dark:border-green-400 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" />
              <strong className="font-semibold">Success</strong>
            </div>
            <p className="text-sm opacity-90">
              Completion of a task, saved state, or positive feedback.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-100 dark:bg-amber-100 text-amber-600 dark:text-amber-600 border border-amber-400 dark:border-amber-500 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <strong className="font-semibold">Warning</strong>
            </div>
            <p className="text-sm opacity-90">
              Non-blocking issues, expiration notices, or precautions.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-red-100 dark:bg-red-100 text-red-700 dark:text-red-700 border border-red-300 dark:border-red-400 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5" />
              <strong className="font-semibold">Error</strong>
            </div>
            <p className="text-sm opacity-90">
              Critical failures, network errors, or validation issues.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-100 text-gray-700 dark:text-gray-700 border border-gray-300 dark:border-gray-400 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-5 h-5" />
              <strong className="font-semibold">Neutral</strong>
            </div>
            <p className="text-sm opacity-90">
              Generic messages or undo actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const theming = (
    <div className="space-y-6">
      <p className="text-aer-muted-foreground">
        The toast system uses CSS variables for animations.
      </p>
      <DocSection
        id="css-variables"
        title="CSS Variables"
        description="Customizing animations."
      >
        <CodeBlock
          ts={`/* Tailwind Config or CSS */
--radix-toast-swipe-move-x: translateX(var(--radix-toast-swipe-move-x));
--radix-toast-swipe-end-x: translateX(var(--radix-toast-swipe-end-x));`}
          fullCode={`/* 
  To customize the animations, you can override the slide-in/out keyframes 
  in your global CSS or Tailwind config.
  
  The default implementation uses standard Tailwind 'animate-in' and 'slide-in' utilities.
*/`}
        />
      </DocSection>
      <DocSection
        id="auto-contrast"
        title="Auto-Contrast"
        description="Accessibility compliance features."
      >
        <div className="prose prose-sm max-w-none text-aer-muted-foreground">
          <p>
            The Toast component automatically calculates contrast ratios between
            the specialized background colors (e.g., green-50, red-950) and
            their text counterparts. It ensures WCAG 2.1 AA compliance for text
            readability regardless of the <code>transparency</code> level set.
          </p>
        </div>
      </DocSection>
    </div>
  );

  return (
    <>
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
              { id: "standalone", title: "Standalone Mode" },
              { id: "variants", title: "Visual Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "interaction-states", title: "Interactions & Gestures" },
              { id: "touch-interactions", title: "Touch Interactions" },
              { id: "transparency", title: "Transparency Control" },
              { id: "positioning", title: "Positioning" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "toast-props", title: "ToastProps" },
              { id: "global-api", title: "Global API" },
              { id: "variant-usage", title: "Variant Usage Guide" },
            ],
          },
          {
            id: "theming",
            label: "Theming",
            content: theming,
            toc: [
              { id: "css-variables", title: "CSS Variables" },
              { id: "auto-contrast", title: "Auto-Contrast" },
            ],
          },
        ]}
      />
    </>
  );
}

// --- Internal Examples ---

function InteractionStatesExample() {
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex gap-4">
      <Button
        onClick={() =>
          toast({
            title: "Action Required",
            description: "Hover me to pause. Click action to dismiss.",
            action: {
              label: "Undo",
              onClick: () => alert("Undo clicked"),
            },
          })
        }
      >
        Trigger Interactive Toast
      </Button>
    </div>
  );
}

function SwipeInteractionDemo() {
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Horizontal Swipe",
            description: "Swipe left or right to dismiss.",
            swipeDirection: "horizontal",
            duration: 3000,
          })
        }
      >
        <div className="flex items-center gap-2">
          <span>↔️</span> Horizontal
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Vertical Swipe",
            description: "Swipe up or down to dismiss.",
            swipeDirection: "vertical",
            duration: 3000,
          })
        }
      >
        <div className="flex items-center gap-2">
          <span>↕️</span> Vertical
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Swipe Down Only",
            description: "You must swipe down to dismiss this.",
            swipeDirection: "down",
            duration: 3000,
          })
        }
      >
        Swipe Down
      </Button>
    </div>
  );
}

function TransparencyExample() {
  const [opacity, setOpacity] = React.useState(1);

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium min-w-24">
          Opacity: {opacity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="flex-1"
        />
      </div>
      <Button
        onClick={() =>
          toast({
            transparency: opacity,
            title: `Toast with ${(opacity * 100).toFixed(0)}% Opacity`,
            description: `Background opacity is set to ${opacity.toFixed(2)}`,
            variant: "info",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}

function StandaloneExample() {
  const [seed, setSeed] = React.useState(0);

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button onClick={() => setSeed((s) => s + 1)}>
          Show Stacked Toast
        </Button>
        {seed > 0 && (
          <div className="text-sm text-muted-foreground">Seed: {seed}</div>
        )}
      </div>

      {seed > 0 && (
        <Toast
          key={seed}
          dismissOnUnmount={false}
          title="Declarative Toast"
          description={`Instance ID: ${seed}`}
          variant="success"
        />
      )}
    </div>
  );
}

function BasicUsageExample() {
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex gap-4">
      <Button
        onClick={() =>
          toast({ title: "Hello World", description: "This is a basic toast." })
        }
      >
        Basic Toast
      </Button>
    </div>
  );
}

function VariantsExample() {
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex flex-wrap gap-4">
      <Button
        variant="outline"
        className="border-green-500/50 text-green-600 hover:bg-green-50 hover:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
        onClick={() =>
          toast({
            variant: "success",
            title: "Success",
            description: "Operation completed successfully.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: "error",
            title: "Error",
            description: "Something went wrong.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        className="border-amber-500/50 text-amber-600 hover:bg-amber-50 hover:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20"
        onClick={() =>
          toast({
            variant: "warning",
            title: "Warning",
            description: "Please be careful.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        className="border-blue-500/50 text-blue-600 hover:bg-blue-50 hover:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
        onClick={() =>
          toast({
            variant: "info",
            title: "Info",
            description: "Here is some useful information.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        className="border-gray-500/50 text-gray-600 hover:bg-gray-50 hover:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-900/20"
        onClick={() =>
          toast({
            variant: "neutral",
            title: "Neutral",
            description: "A general message without semantic meaning.",
          })
        }
      >
        Neutral
      </Button>
    </div>
  );
}

function AerVariantExample() {
  return (
    <div className="aer-vibrant-container dark h-48 flex items-center justify-center">
      <div className="aer-vibrant-bg" />
      <div className="relative z-10">
        <Button
          variant="aer"
          onClick={() =>
            toast({
              variant: "aer",
              title: "Aer Mode Activated",
              description: "Premium glassmorphism enabled.",
              position: "top-center",
            })
          }
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Test Aer Effect
        </Button>
      </div>
    </div>
  );
}

function PositioningExample() {
  const trigger = (pos: ToastPosition, label: string) => {
    toast({
      position: pos,
      title: label,
      description: "This toast stacks automatically.",
      duration: 3000,
    });
  };

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("top-left", "Top Left")}
        >
          Top Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("top-center", "Top Center")}
        >
          Top Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("top-right", "Top Right")}
        >
          Top Right
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("center-left", "Center Left")}
        >
          Center Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("center", "Center")}
        >
          Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("center-right", "Center Right")}
        >
          Center Right
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("bottom-left", "Bottom Left")}
        >
          Bottom Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("bottom-center", "Bottom Center")}
        >
          Bottom Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => trigger("bottom-right", "Bottom Right")}
        >
          Bottom Right
        </Button>
      </div>
    </div>
  );
}

function GranularStylingExample() {
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Midnight Toast",
            description: "This toast uses custom Tailwind classes.",
            className: "bg-slate-950 text-white border-slate-800 shadow-2xl",
          })
        }
      >
        Custom Style
      </Button>
    </div>
  );
}

function RealWorldExample() {
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        variant: "success",
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex justify-center">
      <div className="w-full max-w-sm rounded-lg border border-aer-border bg-aer-background p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <p className="text-sm text-aer-muted-foreground">
              Manage your public profile information.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input defaultValue="johndoe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue="john@example.com" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button size="sm" isLoading={loading} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
