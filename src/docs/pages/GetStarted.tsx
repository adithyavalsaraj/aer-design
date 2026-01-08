import { cn } from "@/lib/utils";
import { Download, Layers, Rocket, Terminal } from "lucide-react";
import { useEffect } from "react";
import { CodeBlock } from "../components/shared";
import { useTOC } from "../context/TOCContext";

export function GetStartedDoc() {
  const { setTocItems } = useTOC();

  useEffect(() => {
    setTocItems(null);
  }, [setTocItems]);

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8 animate-in fade-in duration-700">
      <header className="space-y-6 text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-aer-2xl bg-aer-primary/10 text-aer-primary mb-2 ring-4 ring-aer-primary/5">
          <Rocket className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-aer-foreground">
            Getting Started
          </h1>
          <p className="text-xl text-aer-muted-foreground max-w-2xl mx-auto">
            Welcome to Aer Design. Follow these steps to integrate weightless,
            premium components into your React application.
          </p>
        </div>
      </header>

      <div className="grid gap-12">
        <StepSection
          number={1}
          id="installation"
          title="Installation"
          icon={<Download className="size-5" />}
          description="Install the core package. No additional peer dependencies required for basic usage."
        >
          <div className="space-y-4">
            <p className="text-aer-muted-foreground">
              Aer Design is a self-contained library. Simply install the main
              package:
            </p>
            <CodeBlock
              ts={`npm install aer-design`}
              fullCode={`# Standard installation\nnpm install aer-design\n\n# Using pnpm\npnpm add aer-design\n\n# Using yarn\nyarn add aer-design`}
            />
          </div>
        </StepSection>

        <StepSection
          number={2}
          id="tailwind-setup"
          title="Framework Integration"
          icon={<Layers className="size-5" />}
          description="Configure Tailwind CSS 4 to recognize Aer Design tokens and components."
        >
          <div className="space-y-6">
            <div className="p-4 rounded-aer-lg bg-blue-500/5 border border-blue-500/10 text-sm text-blue-400">
              <strong>Note:</strong> Aer Design is optimized for Tailwind CSS 4.
              Ensure your environment supports modern CSS features.
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-aer-foreground flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-aer-primary" />
                Tailwind CSS 4 Configuration
              </h4>
              <p className="text-sm text-aer-muted-foreground">
                Import the Aer Design theme into your main CSS file. Tailwind 4
                will automatically discover the components and tokens.
              </p>
              <CodeBlock
                ts={`@import "tailwindcss";\n@import "aer-design/theme";`}
                fullCode={`/* index.css */\n@import "tailwindcss";\n@import "aer-design/theme";\n\n/* Your custom styles */\n:root {\n  --brand-primary: #38bdf8;\n}`}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-bold text-aer-foreground flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-aer-primary" />
                Static CSS Fallback
              </h4>
              <p className="text-sm text-aer-muted-foreground">
                If you choose not to use the Tailwind plugin, you can import the
                pre-built CSS file directly.
              </p>
              <CodeBlock
                ts={`import "aer-design/dist/style.css";`}
                fullCode={`import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\n// Import Aer Design styles\nimport "aer-design/dist/style.css";\nimport "./index.css";\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`}
              />
            </div>
          </div>
        </StepSection>

        <StepSection
          number={3}
          id="app-providers"
          title="App Providers"
          icon={<Layers className="size-5" />}
          description="Wrap your application with the necessary providers for theming and configuration."
        >
          <div className="space-y-4">
            <p className="text-aer-muted-foreground">
              Wrap your root component with the <code>ThemeProvider</code> and{" "}
              <code>AerConfigProvider</code> to enable global theming, RTL
              support, and sizing controls.
            </p>
            <CodeBlock
              ts={`import { ThemeProvider, AerConfigProvider } from "aer-design";\n\nfunction App() {\n  return (\n    <ThemeProvider defaultTheme="system">\n      <AerConfigProvider>\n        <YourContent />\n      </AerConfigProvider>\n    </ThemeProvider>\n  );\n}`}
              fullCode={`import React from 'react';\nimport { ThemeProvider, AerConfigProvider } from "aer-design";\nimport { MainLayout } from "./components/Layout";\n\nexport default function Root() {\n  return (\n    <ThemeProvider \n      defaultTheme="dark" \n      defaultThemeColor="blue"\n    >\n      <AerConfigProvider \n        defaultSize="default" \n        defaultDirection="ltr"\n      >\n        <MainLayout />\n      </AerConfigProvider>\n    </ThemeProvider>\n  );\n}`}
            />
          </div>
        </StepSection>

        <StepSection
          number={4}
          id="basic-usage"
          title="First Components"
          icon={<Terminal className="size-5" />}
          description="Start building your interface with our premium component set."
        >
          <div className="space-y-4">
            <p className="text-aer-muted-foreground">
              Try adding a button with the unique `aer` variant to see the
              glassmorphism effect in action.
            </p>
            <CodeBlock
              ts={`import { Button } from "aer-design";\n\nfunction App() {\n  return (\n    <Button variant="aer">\n      Launch Project\n    </Button>\n  );\n}`}
              fullCode={`import { Button, Input } from "aer-design";\nimport { Send } from "lucide-react";\n\nexport default function BasicApp() {\n  return (\n    <div className="p-12 space-y-4">\n      <Input placeholder="Message..." />\n      <Button variant="aer">\n        <Send className="mr-2 h-4 w-4" />\n        Launch Project\n      </Button>\n    </div>\n  );\n}`}
            />
          </div>
        </StepSection>
      </div>

      <footer className="pt-12 text-center border-t border-aer-border/5">
        <p className="text-aer-muted-foreground mb-6">
          Found any issues? We'd love your feedback.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#/contributing"
            className="text-sm font-bold text-aer-primary hover:underline underline-offset-4"
          >
            Contributing Guide
          </a>
          <span className="text-aer-border/20">•</span>
          <a
            href="#/roadmap"
            className="text-sm font-bold text-aer-primary hover:underline underline-offset-4"
          >
            Project Roadmap
          </a>
        </div>
      </footer>
    </div>
  );
}

function StepSection({
  number,
  title,
  description,
  icon,
  children,
  className,
  id,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "relative pl-12 md:pl-16 space-y-6 scroll-mt-24",
        className
      )}
    >
      {/* Step Marker */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div className="size-8 md:size-10 rounded-full bg-aer-background border-2 border-aer-primary/30 flex items-center justify-center text-aer-primary font-black text-sm z-10 shadow-lg shadow-aer-primary/10">
          {number}
        </div>
        <div className="w-0.5 h-full bg-linear-to-b from-aer-primary/30 to-transparent mt-2 opacity-50 absolute top-8 md:top-10" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3 text-aer-primary">
          {icon}
          <h2 className="text-2xl font-black tracking-tight text-aer-foreground uppercase">
            {title}
          </h2>
        </div>
        <p className="text-lg text-aer-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-aer-2xl border border-aer-border/10 bg-aer-muted/5 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
