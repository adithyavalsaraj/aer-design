import { Button } from "@/components/Button";
import { Mail, Sparkles } from "lucide-react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function ButtonDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        title="Basic"
        id="basic"
        description="The standard button variants."
      >
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <CodeBlock
          ts={`<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>\n<Button variant="destructive">Destructive</Button>`}
          fullCode={`import { Button } from "aer-design";\n\nexport default function ButtonExample() {\n  return (\n    <div className="flex flex-wrap gap-4 p-8 bg-zinc-900 rounded-xl">\n      <Button variant="default">Save Changes</Button>\n      <Button variant="secondary">Cancel</Button>\n      <Button variant="outline">Learn More</Button>\n      <Button variant="ghost">Settings</Button>\n      <Button variant="link">Privacy Policy</Button>\n      <Button variant="destructive">Delete Account</Button>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="The Aer Variant"
        id="aer"
        description="Our signature weightless glassmorphism effect."
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="aer" size="lg">
            <Sparkles className="size-4" />
            Join the movement
          </Button>
        </div>
        <CodeBlock
          ts={`<Button variant="aer" size="lg">\n  <Sparkles className="size-4" />\n  Join the movement\n</Button>`}
          fullCode={`import { Button } from "aer-design";\nimport { Sparkles } from "lucide-react";\n\nexport default function AerButtonDemo() {\n  return (\n    <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-2xl border border-white/10">\n      <Button variant="aer" size="lg">\n        <Sparkles className="size-4 mr-2" />\n        Get Started\n      </Button>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="States"
        id="states"
        description="Loading, disabled, and active states."
      >
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button
            variant="outline"
            className="active:scale-90 transition-transform"
          >
            Custom Scale
          </Button>
        </div>
        <CodeBlock
          ts={`<Button isLoading>Loading</Button>\n<Button disabled>Disabled</Button>\n<Button className="active:scale-90 transition-transform">Custom Scale</Button>`}
          fullCode={`import { Button } from "aer-design";\nimport { useState } from "react";\n\nexport default function ButtonStates() {\n  const [loading, setLoading] = useState(false);\n  \n  return (\n    <div className="flex gap-4">\n      <Button \n        isLoading={loading} \n        onClick={() => setLoading(true)}\n      >\n        Click to load\n      </Button>\n      <Button disabled>Can't touch this</Button>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="flex flex-wrap items-end gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline">
            <Mail className="size-4" />
          </Button>
        </div>
        <CodeBlock
          ts={`<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>\n<Button size="icon" variant="outline">\n  <Mail className="size-4" />\n</Button>`}
          fullCode={`import { Button } from "aer-design";\nimport { Mail } from "lucide-react";\n\nexport default function ButtonSizes() {\n  return (\n    <div className="flex items-center gap-4">\n      <Button size="sm">Smaller Button</Button>\n      <Button>Standard Button</Button>\n      <Button size="lg">Jumbo Button</Button>\n      <Button size="icon" variant="outline"><Mail /></Button>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">ButtonProps</h3>
        <ApiTable
          data={[
            {
              prop: "variant",
              type: "'default' | 'aer' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'",
              default: "'default'",
              description: "Visual style of the button",
            },
            {
              prop: "size",
              type: "'default' | 'sm' | 'lg' | 'icon'",
              default: "'default'",
              description: "Size of the button",
            },
            {
              prop: "isLoading",
              type: "boolean",
              default: "false",
              description: "Shows a loading spinner",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the button",
            },
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Whether to render as a child component (unimplemented)",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      description="Customize button appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {\n  --aer-primary: 221.2 83.2% 53.3%;\n  --aer-primary-foreground: 210 40% 98%;\n  --aer-secondary: 240 4.8% 95.9%;\n}`}
        fullCode={`/* styles/globals.css */\n:root {\n  --aer-primary: 221.2 83.2% 53.3%;\n  --aer-primary-foreground: 210 40% 98%;\n  --aer-secondary: 240 4.8% 95.9%;\n  /* Add other overridden variables here */\n}`}
      />
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Button
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A flexible button component with multiple variants, sizes, and states.
        </p>
      </header>

      <DocTabs
        tabs={[
          { id: "overview", label: "Overview", content: overview },
          { id: "api", label: "API", content: api },
          { id: "theming", label: "Theming", content: theming },
        ]}
      />
    </div>
  );
}
