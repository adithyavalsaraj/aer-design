import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  Toast,
  type ToastPosition,
  ToastProvider,
  useToast,
} from "@/components/Toast/index.tsx";
import { Bell, CheckCircle, Sparkles, X } from "lucide-react";
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
              <strong>Dual Mode Architecture</strong>: Use globally via Provider
              or as a standalone component.
            </li>
            <li>
              <strong>Aer Flagship Variant</strong>: Premium glassmorphism with
              dynamic depth.
            </li>
            <li>
              <strong>Zero Dependencies</strong>: Lightweight (3kb gzipped) and
              accessible by default.
            </li>
          </ul>
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
        description="Triggering toasts using the useToast hook."
      >
        <BasicUsageExample />
        <CodeBlock
          ts={`const { toast } = useToast();

const showSuccess = () => {
  toast({
    title: "Project Created",
    description: "Your new project has been successfully initialized.",
    variant: "success",
  });
};`}
          fullCode={`import { Button, useToast } from "aer-design";

export default function BasicToast() {
  const { toast } = useToast();

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
          <p className="text-sm text-blue-700 dark:text-blue-400">
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
          </p>
        </div>
      </DocSection>

      <DocSection
        id="framework-agnostic"
        title="Framework Agnostic Design"
        description="Designed with standard props for easy migration and integration."
      >
        <div className="prose prose-sm max-w-none text-aer-muted-foreground">
          <p>
            The Toast component uses primitive types (strings, numbers,
            booleans) for its core properties involving state and positioning.
            Complex rendering is handled via standard <code>ReactNode</code>{" "}
            children or helper functions, ensuring the logic remains portable.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Strings for Content</strong>: Title and description accept
              simple strings.
            </li>
            <li>
              <strong>Boolean Flags</strong>: Controls for behavior like `open`
              or `duration`.
            </li>
            <li>
              <strong>Standard CSS</strong>: Styling relies on standard CSS
              variables and utility classes, not framework-specific runtime
              styles.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="accessibility"
        title="Accessibility First"
        description="Built-in ARIA support and keyboard navigation."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2">ARIA Features</h4>
            <ul className="text-sm space-y-1 list-disc pl-5 text-aer-muted-foreground">
              <li>
                <strong>Role="status"</strong>: For success, info, and loading
                toasts (polite announcement).
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
                <strong>Alt + T</strong>: Jump to toast viewport (if implemented
                globally).
              </li>
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
      </DocSection>

      <DocSection
        id="interaction-states"
        title="Interaction States"
        description="Visual feedback for user interactions."
      >
        <InteractionStatesExample />
        <CodeBlock
          ts={`// Hover pauses the timer
// Swipe right dismisses the toast
// Action button focus states`}
          fullCode={`import { Button, useToast } from "aer-design";

export default function InteractionDemo() {
  const { toast } = useToast();

  return (
    <div className="flex gap-4">
      <Button 
        onClick={() => toast({
           title: "Action Required",
           description: "Hover me to pause. Click action to dismiss.",
           action: {
             label: "Undo",
             onClick: () => console.log("Undo clicked")
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

      <DocSection
        id="custom"
        title="Standalone Mode"
        description="Using the Toast component directly without the Provider."
      >
        <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-lg text-sm text-amber-800">
          <strong>Note:</strong> Standalone mode gives you manual control via{" "}
          <code>open</code> prop, but you lose the automatic stacking and queue
          features. Multiple standalone toasts at the same position will overlap
          unless manually positioned with <code>x/y</code>.
        </div>
        <StandaloneExample />
        <CodeBlock
          ts={`const [open, setOpen] = useState(false);

return (
  <>
    <Button onClick={() => setOpen(true)}>Show Standalone</Button>
    
    <Toast 
      open={open} 
      onOpenChange={setOpen}
      position="bottom-right"
      title="Standalone Toast"
      description="I am manually controlled."
    />
  </>
)`}
          fullCode={`import { Button, Toast } from "aer-design";
import { useState } from "react";

export default function StandaloneToast() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setOpen((prev) => !prev)}>
        {open ? "Hide Toast" : "Show Standalone Toast"}
      </Button>

      <Toast 
        open={open}
        onOpenChange={setOpen}
        variant="default"
        title="Manual Control"
        description="This toast exists outside the global context."
        position="bottom-right"
        // You can also use custom coordinates
        // x={100} y={100}
      />
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
              type: '"default" | "success" | "error" | "warning" | "info" | "aer"',
              default: '"default"',
              description: "Visual style of the toast.",
            },
            {
              prop: "transparency",
              type: '"light" | "medium" | "dark" | "solid" | string',
              default: '"0.95"',
              description:
                "Opacity level. Can be a preset or any valid CSS opacity value (e.g. '0.5').",
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
              type: "{ label: string; onClick: () => void }",
              default: "-",
              description: "Optional action button.",
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
          ]}
        />
      </div>
      <div>
        <h3 id="variant-usage" className="text-lg font-bold mb-4">
          Variant Usage Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
            <strong className="text-green-800 dark:text-green-300">
              Success
            </strong>
            <p className="text-sm mt-1 text-green-700 dark:text-green-400">
              Completion of a task, saved state, or positive feedback.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
            <strong className="text-red-800 dark:text-red-300">Error</strong>
            <p className="text-sm mt-1 text-red-700 dark:text-red-400">
              Critical failures, network errors, or validation issues.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <strong className="text-amber-800 dark:text-amber-300">
              Warning
            </strong>
            <p className="text-sm mt-1 text-amber-700 dark:text-amber-400">
              Non-blocking issues, expiration notices, or precautions.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <strong className="text-blue-800 dark:text-blue-300">Info</strong>
            <p className="text-sm mt-1 text-blue-700 dark:text-blue-400">
              General updates, system status, or neutral notifications.
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
    <ToastProvider>
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
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "framework-agnostic", title: "Framework Agnostic" },
              { id: "accessibility", title: "Accessibility" },
              { id: "interaction-states", title: "Interaction States" },
              { id: "transparency", title: "Transparency Control" },
              { id: "positioning", title: "Positioning" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
              { id: "custom", title: "Standalone Mode" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "toast-props", title: "ToastProps" },
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
    </ToastProvider>
  );
}

// --- Internal Examples ---

function InteractiveToastExample() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="bg-aer-primary/10 p-4 rounded-full">
        <Bell className="w-8 h-8 text-aer-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Try the Toast</h3>
        <p className="text-aer-muted-foreground max-w-xs mx-auto mt-2">
          Click the button below to trigger a notification. It will stack
          automatically.
        </p>
      </div>
      <Button
        size="lg"
        onClick={() =>
          toast({
            title: "Notification Sent",
            description: "This is a default toast notification.",
            position: "top-right",
          })
        }
      >
        Trigger Notification
      </Button>
    </div>
  );
}

function InteractionStatesExample() {
  const { toast } = useToast();
  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 flex gap-4">
      <Button
        onClick={() =>
          toast({
            title: "Action Required",
            description: "Hover me to pause. Click action to dismiss.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo clicked"),
            },
          })
        }
      >
        Trigger Interactive Toast
      </Button>
    </div>
  );
}

function TransparencyExample() {
  const { toast } = useToast();
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

function BasicUsageExample() {
  const { toast } = useToast();
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
  const { toast } = useToast();

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
  const { toast } = useToast();
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
  const { toast } = useToast();

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
  const { toast } = useToast();

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
  const { toast } = useToast();
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

function StandaloneExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
      <Button onClick={() => setOpen(!open)}>
        {open ? "Hide Standalone" : "Show Standalone"}
      </Button>

      <Toast
        open={open}
        onOpenChange={setOpen}
        position="bottom-right"
        title="Standalone"
        description="I am manually controlled!"
      />
    </div>
  );
}
