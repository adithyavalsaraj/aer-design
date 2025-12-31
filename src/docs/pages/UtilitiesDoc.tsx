import { useEffect } from "react";
import { CodeBlock, DocSection } from "../components/shared";
import { useTOC } from "../context/TOCContext";

export function UtilitiesDoc() {
  const { setTocItems } = useTOC();

  // Define TOC items for this page
  const toc = [
    { id: "aer-config-provider", title: "AerConfigProvider" },
    { id: "direction", title: "Direction (RTL)" },
    { id: "sizing", title: "Global Sizing" },
    { id: "use-aer-config", title: "useAerConfig" },
  ];

  useEffect(() => {
    setTocItems(toc);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Utilities
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Global configuration and helper hooks for managing application state.
        </p>
      </header>

      <DocSection title="AerConfigProvider" id="aer-config-provider">
        <p className="mb-4">
          The <code>AerConfigProvider</code> is the root context provider for
          Aer Design. It manages global settings like text direction (RTL/LTR)
          and component sizing. Wrap your application with this provider to
          enable these features.
        </p>
        <CodeBlock
          ts={`import { AerConfigProvider } from "aer-design";

function App() {
  return (
    <AerConfigProvider defaultDirection="ltr" defaultSize="default">
      <YourApp />
    </AerConfigProvider>
  );
}`}
        />
      </DocSection>

      <DocSection title="Direction (RTL)" id="direction">
        <p className="mb-4">
          Aer Design has first-class support for Right-to-Left (RTL) languages.
          The direction is managed globally via the config provider and applied
          to the <code>html</code> or <code>body</code> tag.
        </p>
        <p className="mb-4">
          You can toggle direction using the <code>useAerConfig</code> hook.
        </p>
      </DocSection>

      <DocSection title="Global Sizing" id="sizing">
        <p className="mb-4">
          Control the default size of all inputs and interactive elements
          globally. Individual components can still override this with their own{" "}
          <code>size</code> prop.
        </p>
      </DocSection>

      <DocSection title="useAerConfig" id="use-aer-config">
        <p className="mb-4">
          A hook to access and update the global configuration.
        </p>
        <CodeBlock
          ts={`import { useAerConfig } from "aer-design";

function Settings() {
  const { direction, toggleDirection, setSize } = useAerConfig();

  return (
    <div>
      <p>Current Direction: {direction}</p>
      <button onClick={toggleDirection}>Toggle Direction</button>
      <button onClick={() => setSize("lg")}>Set Large Size</button>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );
}
