import {
  DirectionProvider,
  useDirection,
} from "@/components/DirectionProvider";
import { AlignLeft, AlignRight, ArrowLeftRight } from "lucide-react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

function DirectionDemoContent() {
  const { direction, toggleDirection } = useDirection();

  return (
    <div
      dir={direction}
      className="flex items-center gap-4 p-6 border rounded-aer-xl bg-aer-muted/10 transition-all duration-300"
    >
      <div className="flex-1">
        <p className="text-sm font-medium mb-1">Current Direction</p>
        <code className="text-xs bg-aer-muted px-2 py-1 rounded text-aer-foreground font-mono">
          {direction}
        </code>
      </div>
      <button
        onClick={toggleDirection}
        className="flex items-center gap-2 px-4 py-2 bg-aer-primary text-aer-primary-foreground rounded-aer-md text-sm font-medium hover:bg-aer-primary/90 transition-colors"
      >
        <ArrowLeftRight className="size-4" />
        Toggle Direction
      </button>
      <div className="flex-1 flex justify-end">
        {direction === "ltr" ? (
          <AlignLeft className="size-6 text-aer-muted-foreground" />
        ) : (
          <AlignRight className="size-6 text-aer-muted-foreground" />
        )}
      </div>
    </div>
  );
}

function DirectionDemo() {
  return (
    <DirectionProvider disablePersistence defaultDirection="ltr">
      <DirectionDemoContent />
    </DirectionProvider>
  );
}

export function DirectionProviderDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Installation"
        id="installation"
        description="Wrap your application root with the DirectionProvider."
      >
        <CodeBlock
          ts={`import { DirectionProvider } from "aer-design";\n\nReactDOM.createRoot(document.getElementById("root")!).render(\n  <DirectionProvider>\n    <App />\n  </DirectionProvider>\n);`}
          fullCode={`import React from "react";\nimport ReactDOM from "react-dom/client";\nimport { DirectionProvider } from "aer-design";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")!).render(\n  <React.StrictMode>\n    <DirectionProvider>\n      <App />\n    </DirectionProvider>\n  </React.StrictMode>\n);`}
        />
      </DocSection>

      <DocSection
        title="Usage"
        id="usage"
        description="Use the useDirection hook to access or control the text direction."
      >
        <div className="mb-6">
          <DirectionDemo />
        </div>
        <CodeBlock
          ts={`import { useDirection } from "aer-design";\n\nexport function DirectionToggle() {\n  const { direction, toggleDirection, setDirection } = useDirection();\n\n  return (\n    <button onClick={toggleDirection}>\n      Current: {direction.toUpperCase()}\n    </button>\n  );\n}`}
          fullCode={`import { useDirection } from "aer-design";\n\nexport default function DirectionToggle() {\n  // Consume the context\n  const { direction, toggleDirection } = useDirection();\n\n  return (\n    <div className="p-4 border rounded-lg bg-card text-card-foreground">\n      <p className="mb-2">Current Direction: <strong>{direction.toUpperCase()}</strong></p>\n      <button \n        onClick={toggleDirection}\n        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"\n      >\n        Toggle Direction\n      </button>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Features"
        id="features"
        description="Key capabilities of the provider."
      >
        <ul className="list-disc list-inside space-y-2 text-aer-muted-foreground">
          <li>
            <strong>Persistence</strong>: Automatically saves preference to{" "}
            <code>localStorage</code>.
          </li>
          <li>
            <strong>HTML Attribute</strong>: Updates the <code>dir</code>{" "}
            attribute on the <code>&lt;html&gt;</code> tag.
          </li>
          <li>
            <strong>Context API</strong>: Provides simple hooks for components
            to react to direction changes.
          </li>
        </ul>
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <div>
        <h4 className="text-lg font-bold mb-4">DirectionProvider Props</h4>
        <ApiTable
          data={[
            {
              prop: "children",
              type: "React.ReactNode",
              default: "-",
              description: "The application or content to wrap.",
            },
            {
              prop: "disablePersistence",
              type: "boolean",
              default: "false",
              description:
                "If true, disables localStorage persistence and HTML dir attribute updates. Useful for isolated demos.",
            },
            {
              prop: "defaultDirection",
              type: "'ltr' | 'rtl'",
              default: "'ltr'",
              description: "Initial direction when persistence is disabled.",
            },
          ]}
        />
      </div>

      <div>
        <h4 className="text-lg font-bold mb-4">useDirection Hook</h4>
        <p className="text-aer-muted-foreground mb-4">
          Returns a context object with the following properties:
        </p>
        <ApiTable
          data={[
            {
              prop: "direction",
              type: "'ltr' | 'rtl'",
              default: "-",
              description: "Current active direction.",
            },
            {
              prop: "toggleDirection",
              type: "() => void",
              default: "-",
              description: "Function to toggle between LTR and RTL.",
            },
            {
              prop: "setDirection",
              type: "(dir: 'ltr' | 'rtl') => void",
              default: "-",
              description: "Function to explicitly set the direction.",
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
          DirectionProvider
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Manages the reading direction (LTR/RTL) of your application with
          persistent state and document attributes.
        </p>
      </header>

      <DocTabs
        tabs={[
          { id: "overview", label: "Overview", content: overview },
          { id: "api", label: "API", content: api },
        ]}
      />
    </div>
  );
}
