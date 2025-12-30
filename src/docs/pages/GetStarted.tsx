import { CodeBlock, DocSection } from "../components/shared";

export function GetStartedDoc() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Getting Started
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Aer Design is a weightless React component library focused on speed,
          aesthetics, and developer experience.
        </p>
      </header>

      <DocSection title="Installation" id="installation">
        <div className="space-y-4">
          <p>
            Install the package and its peer dependencies via your preferred
            package manager:
          </p>
          <CodeBlock
            ts={`npm install aer-design lucide-react clsx tailwind-merge`}
            fullCode={`# Recommended dev stack\nnpm install aer-design lucide-react clsx tailwind-merge\n\n# Or using yarn\nyarn add aer-design lucide-react clsx tailwind-merge\n\n# Or using pnpm\npnpm add aer-design lucide-react clsx tailwind-merge`}
          />
        </div>
      </DocSection>

      <DocSection title="Setup Tailwind CSS" id="tailwind-setup">
        <div className="space-y-4">
          <p>
            Aer Design uses Tailwind CSS 4+ features. Add the Aer Design plugin
            to your <code>tailwind.config.ts</code> or imports:
          </p>
          <CodeBlock
            ts={`import { aerDesignPlugin } from "aer-design";\n\nexport default {\n  plugins: [aerDesignPlugin],\n};`}
            fullCode={`import type { Config } from 'tailwindcss'\nimport { aerDesignPlugin } from "aer-design";\n\nexport default {\n  content: ["./src/**/*.{ts,tsx}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [aerDesignPlugin],\n} satisfies Config`}
          />
          <p>
            Alternatively, import the pre-built CSS in your main entry file:
          </p>
          <CodeBlock
            ts={`import "aer-design/dist/style.css";`}
            fullCode={`import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\n// Import Aer Design styles\nimport "aer-design/dist/style.css";\nimport "./index.css";\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`}
          />
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic-usage">
        <div className="space-y-4">
          <p>Import components directly from the package:</p>
          <CodeBlock
            ts={`import { Button } from "aer-design";\n\nfunction App() {\n  return (\n    <Button variant="aer">\n      Hello World\n    </Button>\n  );\n}`}
            fullCode={`import { Button, Input } from "aer-design";\nimport { Send } from "lucide-react";\n\nexport default function BasicApp() {\n  return (\n    <div className="p-12 space-y-4">\n      <Input placeholder="Message..." />\n      <Button variant="aer">\n        <Send className="mr-2 h-4 w-4" />\n        Launch Project\n      </Button>\n    </div>\n  );\n}`}
          />
        </div>
      </DocSection>
    </div>
  );
}
