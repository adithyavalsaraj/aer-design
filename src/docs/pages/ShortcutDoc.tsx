import { Button } from "@/components/Button";
import { ShortcutRecorder, useShortcut } from "@/components/Shortcut";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
} from "@/docs/components/shared";
import { AlertTriangle, Info, Save } from "lucide-react";
import * as React from "react";

export function ShortcutDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A robust system for handling keyboard shortcuts with user customization support."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Shortcut system provides a centralized way to manage keyboard
            interactions in your application. Unlike simple global event
            listeners, it offers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Centralized Registry</strong>: Manage all shortcuts in one
              place.
            </li>
            <li>
              <strong>User Customization</strong>: Allow end-users to record
              their own keybindings.
            </li>
            <li>
              <strong>Persistence</strong>: Automatically saves user overrides
              to local storage.
            </li>
            <li>
              <strong>Conflict Resolution</strong>: Intelligent handling of
              modifiers and platform specifics (Mac vs Windows).
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Scenarios where a global shortcut system is essential."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              Power User Workflows
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use for professional applications where keyboard speed is critical
              (IDE, Design tools, Dashboards).
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              Accessibility
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Improve accessibility by allowing users to remap difficult key
              combinations to something more comfortable.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="setup"
        title="Setup"
        description="Wrap your application with the ShortcutProvider."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Add the provider at the root of your application (e.g., in{" "}
          <code>App.tsx</code>).
        </p>
        <CodeBlock
          ts={`import { ShortcutProvider } from "aer-design";

export default function App() {
  return (
    <ShortcutProvider>
      <YourApp />
    </ShortcutProvider>
  );
}`}
          fullCode={`import { ShortcutProvider } from "aer-design";

export default function App() {
  return (
    <ShortcutProvider>
      {/* Your application root */}
      <YourApp />
    </ShortcutProvider>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="Register and listen for shortcuts using the useShortcut hook."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <SaveShortcutExample />
        </div>
        <CodeBlock
          ts={`import { useShortcut } from "aer-design";

export function SaveButton() {
  // Listen for Cmd+S (or Ctrl+S on Windows)
  useShortcut(
    "save-document", 
    (e) => {
      console.log("Saving...");
      alert("Saved!");
    },
    {
      defaultKeys: ["Meta", "S"], 
    }
  );

  return <button>Save (Cmd+S)</button>;
}`}
          fullCode={`import { useShortcut, Button } from "aer-design";
import { Save } from "lucide-react";

export function SaveButton() {
  // Listen for Cmd+S (or Ctrl+S on Windows)
  useShortcut(
    "save-document", 
    (e) => {
      e.preventDefault(); // Prevent browser save
      alert("Document Saved!");
    },
    {
      defaultKeys: ["Meta", "S"], 
      preventDefault: true
    }
  );

  return (
    <Button onClick={() => alert("Document Saved!")}>
        <Save className="w-4 h-4 mr-2"/>
        Save (Cmd+S)
    </Button>
  );
}`}
        />
        <div className="flex items-start gap-3 p-4 rounded-md bg-amber-500/10 text-amber-500 text-sm mt-4">
          <Info className="w-5 h-5 shrink-0" />
          <p>
            <strong>Note on Modifiers:</strong> Use standard key names like{" "}
            <code>Meta</code>, <code>Control</code>, <code>Alt</code>,{" "}
            <code>Shift</code>. The system automatically normalizes them for
            display (e.g., showing ⌘ on Mac).
          </p>
        </div>
      </DocSection>

      <DocSection
        id="scoped"
        title="Scoped Shortcuts"
        description="Restrict shortcuts to a specific container (e.g., a modal or form)."
      >
        <div className="flex gap-6 p-6 border rounded-lg bg-aer-muted/5 items-start">
          <ScopedShortcutExample />
        </div>
        <div className="mt-4">
          <p className="text-sm text-aer-muted-foreground mb-4">
            Pass a `ref` to the `scopeRef` option. The shortcut will only
            trigger if the focused element is within that container.
          </p>
        </div>
        <CodeBlock
          ts={`import { useShortcut } from "aer-design";
import { useRef } from "react";

export function ScopedForm() {
  const containerRef = useRef(null);

  // Only works when focus is inside this div (e.g. input focused)
  useShortcut(
    "submit-form",
    () => alert("Form Submitted!"),
    {
      defaultKeys: ["Meta", "Enter"],
      scopeRef: containerRef, // <--- Scoping
    }
  );

  return (
    <div ref={containerRef} tabIndex={-1} className="p-4 border rounded">
      <input placeholder="Focus me..." />
      <button>Submit (Cmd+Enter)</button>
    </div>
  );
}`}
          fullCode={`import { useShortcut } from "aer-design";
import * as React from "react";

export function ScopedForm() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Only works when focus is inside this div (e.g. input focused)
  useShortcut(
    "submit-form",
    () => alert("Form Submitted!"),
    {
      defaultKeys: ["Meta", "Enter"],
      scopeRef: containerRef, // <--- Scoping: Pass RefObject<HTMLElement>
    }
  );

  return (
    <div ref={containerRef} className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
      <h3 className="font-bold mb-4">Scoped Form</h3>
      <div className="flex gap-2">
        <input 
            className="border p-2 rounded w-full bg-transparent"
            placeholder="Focus me and press Cmd+Enter" 
        />
        <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => alert("Form Submitted!")}
        >
            Submit
        </button>
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="customization"
        title="User Customization"
        description="Allow users to rebind keys using the ShortcutRecorder component."
      >
        <div className="flex flex-col gap-6 p-6 border rounded-lg bg-aer-muted/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Save Document</span>
            <ShortcutRecorder actionId="save-document" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Toggle Dark Mode</span>
            <ShortcutRecorder actionId="toggle-theme" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-aer-muted-foreground mb-2">
            Try clicking the recorder above and pressing a new combination
            (e.g., <code>Shift + X</code>).
          </p>
        </div>
        <CodeBlock
          ts={`import { ShortcutRecorder } from "aer-design";

// Place this in your Settings page
<div className="flex justify-between">
  <span>Save Action</span>
  <ShortcutRecorder actionId="save-document" />
</div>`}
          fullCode={`import { ShortcutRecorder } from "aer-design";

export default function SettingsPage() {
  return (
    <div className="p-6 border rounded-lg max-w-md mx-auto space-y-4">
      <h3 className="font-bold border-b pb-2">Keyboard Shortcuts</h3>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Save Document</span>
        <ShortcutRecorder 
            actionId="save-document" 
            placeholder="Record..."
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Toggle Theme</span>
        <ShortcutRecorder 
            actionId="toggle-theme" 
        />
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="granular-styling"
        title="Granular Styling"
        description="The shortcut recorder can be styled with standard utility classes."
      >
        <div className="flex flex-col gap-6 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <ShortcutRecorder
            actionId="styling-demo"
            className="w-64 h-12 rounded-full border-sky-200 bg-sky-50 text-sky-700 focus:ring-sky-500"
          />
        </div>
        <CodeBlock
          ts={`<ShortcutRecorder
  actionId="my-action"
  className="w-64 border-sky-200 bg-sky-50 text-sky-700"
/>`}
        />
      </DocSection>

      <DocSection
        id="conflicts"
        title="System Conflicts"
        description="Handling browser and OS reserved shortcuts."
      >
        <div className="flex items-start gap-3 p-4 rounded-md bg-red-500/10 text-red-500 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div className="space-y-2">
            <p className="font-semibold">Reserved Keys</p>
            <p>
              Browsers reserve certain keys (like <code>Cmd+T</code> for new
              tab, <code>Cmd+W</code> for close tab) that cannot be overridden
              even with <code>preventDefault()</code>.
            </p>
            <p>
              The <code>ShortcutRecorder</code> attempts to capture input, but
              if a user presses a reserved system combination, the browser
              action may take precedence or the event might not be fully
              captured.
            </p>
          </div>
        </div>
      </DocSection>
    </div>
  );

  function SaveShortcutExample() {
    // We'll define a slightly different ID so it doesn't conflict with global native save
    // But actually we want to demonstrate overriding system save if possible (Ctrl+S usually preventable)
    useShortcut(
      "save-document",
      () => {
        alert("Document Saved!");
      },
      {
        defaultKeys: ["Control", "S"], // Common save
        preventDefault: true,
      }
    );

    useShortcut(
      "toggle-theme",
      () => {
        alert("Toggled Theme (Demo Action)");
      },
      {
        defaultKeys: ["Control", "D"],
      }
    );

    return (
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">
          Press{" "}
          <kbd className="font-sans px-1 py-0.5 bg-aer-muted rounded border">
            Ctrl + S
          </kbd>{" "}
          to Trigger
        </p>
        <Button onClick={() => alert("Document Saved!")}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    );
  }

  function ScopedShortcutExample() {
    const scopeRef = React.useRef<HTMLDivElement>(null);
    const [lastAction, setLastAction] = React.useState<string | null>(null);

    useShortcut(
      "scoped-action",
      () => setLastAction("Triggered inside scope!"),
      {
        defaultKeys: ["Control", "E"],
        scopeRef: scopeRef as React.RefObject<HTMLElement>,
      }
    );

    return (
      <div className="flex flex-col gap-4 w-full">
        <div
          ref={scopeRef}
          className="p-6 border-2 border-dashed border-aer-primary/30 rounded-lg bg-aer-primary/5 focus-within:border-aer-primary transition-colors"
        >
          <h4 className="font-bold text-aer-foreground mb-2">Scoped Area</h4>
          <p className="text-sm text-aer-muted-foreground mb-4">
            Focus the input below and press{" "}
            <kbd className="font-sans px-1 py-0.5 bg-aer-background rounded border">
              Control + E
            </kbd>
            .
          </p>
          <input
            className="w-full px-3 py-2 rounded-md border border-aer-border bg-aer-background focus:ring-2 focus:ring-aer-ring outline-none"
            placeholder="Focus me first..."
          />
        </div>

        <div className="p-4 border rounded-lg bg-aer-muted/50">
          <h4 className="font-bold text-aer-foreground mb-2">Outside Area</h4>
          <p className="text-sm text-aer-muted-foreground mb-2">
            Shortcuts won't work here.
          </p>
          <input
            className="w-full px-3 py-2 rounded-md border border-aer-border bg-aer-background focus:ring-2 focus:ring-aer-ring outline-none"
            placeholder="Focus here to test isolation..."
          />
        </div>

        {lastAction && (
          <div className="p-2 text-center text-sm font-bold text-green-500 bg-green-500/10 rounded animate-in fade-in slide-in-from-top-2">
            {lastAction}
          </div>
        )}
      </div>
    );
  }

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="use-shortcut" className="text-lg font-bold mb-4">
          useShortcut Hook
        </h3>
        <ApiTable
          data={[
            {
              prop: "actionId",
              type: "string",
              default: "-",
              description: "Unique identifier for the action.",
            },
            {
              prop: "onTrigger",
              type: "(e) => void",
              default: "-",
              description: "Callback function when shortcut is activated.",
            },
            {
              prop: "options.defaultKeys",
              type: "string[]",
              default: "[]",
              description: "Default key combination (e.g. ['Meta', 'K']).",
            },
            {
              prop: "options.preventDefault",
              type: "boolean",
              default: "true",
              description: "Whether to call e.preventDefault().",
            },
            {
              prop: "options.scopeRef",
              type: "RefObject<HTMLElement>",
              default: "-",
              description:
                "Ref to an element. Shortcut triggers only when focus is within this element.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="shortcut-recorder" className="text-lg font-bold mb-4">
          ShortcutRecorder
        </h3>
        <ApiTable
          data={[
            {
              prop: "actionId",
              type: "string",
              default: "-",
              description: "ID of the action to bind.",
            },
            {
              prop: "placeholder",
              type: "string",
              default: "'Click to record shortcut'",
              description: "Placeholder text when no shortcut is set.",
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
          Shortcuts
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Centralized keyboard navigation manager with user customization
          support.
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
              { id: "setup", title: "Setup" },
              { id: "basic", title: "Basic Usage" },
              { id: "scoped", title: "Scoped Shortcuts" },
              { id: "customization", title: "User Customization" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "conflicts", title: "System Conflicts" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "use-shortcut", title: "useShortcut" },
              { id: "shortcut-recorder", title: "ShortcutRecorder" },
            ],
          },
        ]}
      />
    </div>
  );
}
