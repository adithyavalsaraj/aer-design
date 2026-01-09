import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { ArrowRight, Star } from "lucide-react";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
  UsageGuidelines,
} from "../components/shared";

function BasicUsageExample() {
  return (
    <div className="p-8 border rounded-xl bg-aer-muted/5 flex items-center justify-center">
      <Card className="max-w-[350px]">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Project Dashboard</CardTitle>
              <p className="text-sm text-aer-muted-foreground mt-1">
                Track your progress
              </p>
            </div>
            <Badge status="success" variant="soft">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-aer-muted-foreground">
                Tasks Completed
              </span>
              <span className="font-semibold">24/30</span>
            </div>
            <div className="w-full bg-aer-muted rounded-full h-2">
              <div
                className="bg-aer-primary h-2 rounded-full"
                style={{ width: "80%" }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            View Details
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function AerCardExample() {
  return (
    <div className="aer-vibrant-container dark flex flex-col items-center justify-center">
      <div className="aer-vibrant-bg" />
      <div className="relative z-10 w-full max-w-[400px]">
        <Card variant="aer" hoverable className="p-0 overflow-hidden">
          <div className="aspect-video bg-linear-to-br from-cyan-600/30 to-emerald-600/30 flex items-center justify-center">
            <Star className="size-12 text-white/50 animate-pulse" />
          </div>
          <CardHeader className="p-6 pb-0">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">Premium Glass</CardTitle>
              <Badge variant="aer" status="primary">
                Featured
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-aer-foreground/80 leading-relaxed">
              Experience the pinnacle of Aer design with advanced backdrop
              filters and dynamic lighting effects. Perfect for dashboards and
              hero cards.
            </p>
          </CardContent>
          <CardFooter className="p-6 pt-0 border-t-0">
            <Button variant="aer" className="w-full">
              Unlock Access
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export function CardDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A structured flexible container for grouping related content."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Cards are the fundamental building blocks of dashboard and
            information-heavy applications. They help maintain hierarchy and
            visual order by encapsulating elements into logical units.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Composable architecture</strong> using sub-components for
              Title, Description, Header, Content, and Footer.
            </li>
            <li>
              <strong>Premium visual variants</strong> including flagship glass
              and aerodynamic depth styles.
            </li>
            <li>
              <strong>Interactive elevation</strong> system with smart hover and
              transition effects.
            </li>
            <li>
              <strong>Flexible density</strong> controls with four levels of
              internal padding.
            </li>
            <li>
              <strong>Semantic theming</strong> integration for consistent
              look-and-feel across your application.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Guidelines for organizing content with cards."
      >
        <UsageGuidelines
          do={[
            "Grouping related information into a single container",
            "Creating dashboard widgets or summary components",
            "Displaying collection items like products, posts, or users",
            "Establishing visual hierarchy in complex layouts",
          ]}
          dont={[
            "Over-nesting cards within other cards",
            "Using cards for simple list items (use standard lists instead)",
            "Creating overwhelming cards with too much disjointed information",
          ]}
        />
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="A simple structured card."
      >
        <BasicUsageExample />
        <CodeBlock
          ts={`<Card>\n  <CardHeader>\n    <CardTitle>Project Dashboard</CardTitle>\n  </CardHeader>\n  <CardContent>\n    {/* Your content */}\n  </CardContent>\n  <CardFooter>\n    <Button>View Details</Button>\n  </CardFooter>\n</Card>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "aer-design";\nimport { Button, Badge } from "aer-design";\nimport { ArrowRight } from "lucide-react";\n\nexport default function BasicCard() {\n  return (\n    <Card className="max-w-[350px]">\n      <CardHeader>\n        <div className="flex items-start justify-between">\n          <div>\n            <CardTitle>Project Dashboard</CardTitle>\n            <p className="text-sm text-aer-muted-foreground mt-1">\n              Track your progress\n            </p>\n          </div>\n          <Badge status="success" variant="soft">Active</Badge>\n        </div>\n      </CardHeader>\n      <CardContent>\n        <div className="space-y-3">\n          <div className="flex justify-between items-center">\n            <span className="text-sm text-aer-muted-foreground">Tasks Completed</span>\n            <span className="font-semibold">24/30</span>\n          </div>\n          <div className="w-full bg-aer-muted rounded-full h-2">\n            <div className="bg-aer-primary h-2 rounded-full" style={{ width: '80%' }} />\n          </div>
        </div>\n      </CardContent>\n      <CardFooter>\n        <Button className="w-full">\n          View Details\n          <ArrowRight className="size-4 ml-2" />\n        </Button>\n      </CardFooter>\n    </Card>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Stylistic variations for different depth levels."
      >
        <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-xl bg-aer-muted/5">
          <Card variant="default" className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-full bg-aer-primary/10 flex items-center justify-center">
                <Star className="size-5 text-aer-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Default</h4>
                <p className="text-xs text-aer-muted-foreground">
                  Solid background
                </p>
              </div>
            </div>
            <p className="text-sm text-aer-muted-foreground">
              Standard card with solid background and subtle shadow. Perfect for
              most use cases.
            </p>
          </Card>

          <Card variant="outline" className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-full bg-aer-primary/10 flex items-center justify-center">
                <Star className="size-5 text-aer-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Outline</h4>
                <p className="text-xs text-aer-muted-foreground">
                  Transparent background
                </p>
              </div>
            </div>
            <p className="text-sm text-aer-muted-foreground">
              Minimal card with transparent background. Ideal for layered
              interfaces.
            </p>
          </Card>

          {/* Glass variant with colorful background to show the effect */}
          <div className="relative rounded-aer-lg overflow-hidden bg-linear-to-br from-blue-500/20 via-cyan-500/20 to-emerald-500/20 p-6">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc=')] opacity-30" />
            <Card variant="glass" className="p-6 relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Star className="size-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Glass</h4>
                  <p className="text-xs text-aer-muted-foreground">
                    Frosted glass effect
                  </p>
                </div>
              </div>
              <p className="text-sm text-aer-muted-foreground">
                Semi-transparent with backdrop blur. Great for overlays and
                modals.
              </p>
            </Card>
          </div>

          <Card variant="aer" className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-full bg-aer-primary/10 flex items-center justify-center">
                <Star className="size-5 text-aer-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Aer</h4>
                <p className="text-xs text-aer-muted-foreground">
                  Premium glassmorphism
                </p>
              </div>
            </div>
            <p className="text-sm text-aer-muted-foreground">
              Advanced glassmorphism with gradient overlay. For hero sections
              and featured content.
            </p>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card variant="default">...</Card>\n<Card variant="outline">...</Card>\n<Card variant="glass">...</Card>\n<Card variant="aer">...</Card>`}
          fullCode={`import { Card } from "aer-design";\nimport { Star } from "lucide-react";\n\nexport default function CardVariants() {\n  return (\n    <div className="grid grid-cols-2 gap-6">\n      <Card variant="default" className="p-6">\n        <div className="flex items-center gap-3 mb-3">\n          <div className="size-10 rounded-full bg-aer-primary/10 flex items-center justify-center">\n            <Star className="size-5 text-aer-primary" />\n          </div>\n          <div>\n            <h4 className="font-semibold">Default</h4>\n            <p className="text-xs text-aer-muted-foreground">Solid background</p>\n          </div>\n        </div>\n        <p className="text-sm text-aer-muted-foreground">\n          Standard card with solid background and subtle shadow.\n        </p>\n      </Card>\n      {/* Repeat for other variants */}\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="custom"
        title="Custom Usage"
        description="Extending cards with custom layouts."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center">
          <Card className="p-0 overflow-hidden border-2 border-dashed border-aer-primary/30">
            <div className="h-20 bg-aer-primary/10 flex items-center justify-center">
              <p className="text-sm text-aer-primary font-medium">
                Custom Slot
              </p>
            </div>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card className="border-2 border-dashed border-aer-primary/30 p-0">\n  <div className="bg-aer-primary/10 h-20">...</div>\n</Card>`}
          fullCode={`import { Card } from "aer-design";\n\nexport default function CustomCard() {\n  return (\n    <Card className="p-0 overflow-hidden border-2 border-dashed border-aer-primary/30">\n      <div className="h-20 bg-aer-primary/10 flex items-center justify-center">\n        <p className="text-sm text-aer-primary font-medium">\n          Direct DOM Injection\n        </p>\n      </div>
    </Card>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="How cards behave in different layouts."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center gap-4 flex-wrap">
          <Card className="w-64" padding="sm">
            <CardHeader>
              <CardTitle className="text-sm">Sidebar Panel</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
              Fixed width container.
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[200px]" padding="sm">
            <CardHeader>
              <CardTitle className="text-sm">Flexible Content</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
              Expands to fill space.
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card className="w-64">Sidebar Content</Card>\n<Card className="flex-1">Main Content</Card>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent } from "aer-design";\n\nexport default function PositioningExample() {\n  return (\n    <div className="flex gap-4 flex-wrap">\n      <Card className="w-64" padding="sm">\n        <CardHeader>\n          <CardTitle className="text-sm">Fixed Panel</CardTitle>\n        </CardHeader>\n        <CardContent className="text-xs">Sidebar style</CardContent>\n      </Card>\n      <Card className="flex-1 min-w-[200px]" padding="sm">\n        <CardHeader>\n          <CardTitle className="text-sm">Fluid Content</CardTitle>\n        </CardHeader>\n        <CardContent className="text-xs">Main area style</CardContent>\n      </Card>\n    </div>\n  );\n}`}
        />
        <div className="prose prose-sm max-w-none text-aer-muted-foreground mt-4">
          <p>
            Cards are block-level elements that expand to fill their container's
            width unless specified otherwise.
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Grid Layouts:</strong> Perfect for dashboard widgets.
            </li>
            <li>
              <strong>Sidebar Panels:</strong> Use <code>padding="sm"</code> for
              high-density navigation.
            </li>
            <li>
              <strong>Floating Overlays:</strong> Combine with{" "}
              <code>glass</code> variant for context menus.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="High-fidelity glassmorphism with advanced depth styling."
      >
        <AerCardExample />
        <CodeBlock
          ts={`<Card variant="aer" hoverable>\n  <CardHeader>...</CardHeader>\n</Card>`}
          fullCode={`import { Card, Badge, Button } from "aer-design";\n\nexport default function AerCard() {\n  return (\n    <div className="aer-vibrant-container">\n      <div className="aer-vibrant-bg-wrapper">\n        <div className="aer-vibrant-bg" />\n      </div>\n      <Card variant="aer" hoverable className="max-w-[400px]">\n        <h3 className="text-xl font-bold">Premium Tier</h3>\n        <p className="mt-2 text-sm text-white/70">Access all high-performance tools.</p>\n        <Button variant="aer" className="mt-4 w-full">Upgrade</Button>\n      </Card>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer Card uses{" "}
            <code>backdrop-blur-2xl</code> and dynamic <code>hover</code>{" "}
            transforms. It's designed to float beautifully over gradients or
            colorful hero sections.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="states"
        title="Interaction States"
        description="Demonstrating visual feedback for interactive cards."
      >
        <div className="grid md:grid-cols-2 gap-4 p-6 border rounded-xl bg-aer-muted/5">
          <Card hoverable className="cursor-pointer">
            Hoverable State
          </Card>
          <Card className="opacity-50 grayscale">Disabled Card</Card>
        </div>
        <CodeBlock
          ts={`<Card hoverable className="cursor-pointer">Hover</Card>\n<Card className="opacity-50 grayscale">Disabled</Card>`}
          fullCode={`import { Card } from "aer-design";\n\nexport default function CardStates() {\n  return (\n    <div className="grid grid-cols-2 gap-4">\n      <Card hoverable className="cursor-pointer border-aer-primary/50 flex items-center justify-center aspect-video">\n        Interactive\n      </Card>\n      <Card className="opacity-50 grayscale flex items-center justify-center aspect-video">\n        Read Only\n      </Card>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="specialized"
        title="Specialized Contexts"
        description="Context-aware card implementations."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center">
          <Card className="border-aer-primary ring-2 ring-aer-primary/20">
            <CardHeader>
              <CardTitle className="text-sm">Active Editor State</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
              The card transitions to a focused state when editing.
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card className="border-aer-primary ring-2 ring-aer-primary/20">Active Editor State</Card>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent } from "aer-design";\n\nexport default function SpecializedContext() {\n  return (\n    <Card className="border-aer-primary ring-2 ring-aer-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">\n      <CardHeader>\n        <CardTitle className="text-sm text-aer-primary">Editing...</CardTitle>\n      </CardHeader>\n      <CardContent className="text-xs">This card is currently locked for editing.</CardContent>\n    </Card>\n  );\n}`}
        />
        <div className="mt-4 p-4 border border-aer-border rounded-lg bg-aer-muted/5">
          <p className="text-sm text-aer-muted-foreground">
            In <strong>Editing Mode</strong>, cards can highlight their focus
            state with a primary border ring using the{" "}
            <code>focus-within:</code> utility.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="validation"
        title="Validation & Errors"
        description="Handling error states in containers."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center">
          <Card className="border-red-500 bg-red-500/5 max-w-[300px]">
            <CardHeader>
              <CardTitle className="text-red-600 text-sm">
                Error Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-red-500/80">
              The configuration in this card contains invalid parameters.
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card className="border-red-500 bg-red-500/5">Error Detected</Card>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent } from "aer-design";\n\nexport default function ValidationError() {\n  return (\n    <Card className="border-red-500 bg-red-500/5 max-w-[300px]">\n      <CardHeader>\n        <CardTitle className="text-red-600 text-sm italic">Error</CardTitle>\n      </CardHeader>\n      <CardContent className="text-xs text-red-500/80">Missing required fields.</CardContent>\n    </Card>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="styling"
        title="Granular Styling"
        description="Precise control over card sub-components."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center">
          <Card className="p-0 border-none shadow-none bg-zinc-900 rounded-none overflow-hidden">
            <CardHeader className="p-4 bg-zinc-800 border-none mb-0">
              <CardTitle className="text-white text-sm">
                Terminal Header
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 font-mono text-xs text-emerald-400">
              $ aer-design --version
              <br />
              v1.2.0
            </CardContent>
          </Card>
        </div>
        <div className="prose prose-sm max-w-none text-aer-muted-foreground mt-4">
          <p>
            You can style each part of the card using individual components. Use
            Tailwind's <code>className</code> on specific parts for granular
            control:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>CardHeader:</strong> Control top alignment and spacing.
            </li>
            <li>
              <strong>CardTitle:</strong> Target typography and branding.
            </li>
            <li>
              <strong>CardContent:</strong> Adjust internal padding or scrolling
              behavior.
            </li>
            <li>
              <strong>CardFooter:</strong> Set border visibility and alignment.
            </li>
          </ul>
        </div>
        <CodeBlock
          ts={`<CardHeader className="bg-zinc-800 p-4">...</CardHeader>\n<CardContent className="font-mono text-emerald-400">...</CardContent>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent } from "aer-design";\n\nexport default function TerminalCard() {\n  return (\n    <Card className="p-0 border-none shadow-none bg-zinc-950 rounded-none overflow-hidden">\n      <CardHeader className="p-3 bg-zinc-900 border-none mb-0">\n        <CardTitle className="text-zinc-400 text-[10px] font-mono">SSH - root@aer-design</CardTitle>\n      </CardHeader>\n      <CardContent className="p-4 font-mono text-xs text-emerald-500">\n        $ npm install aer-design\n      </CardContent>\n    </Card>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A premium project status dashboard card."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center">
          <Card className="w-full max-w-sm" variant="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
              <Star className="h-4 w-4 text-aer-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-aer-muted-foreground">
                +20.1% from last month
              </p>
              <div className="mt-4 h-2 w-full bg-aer-muted rounded-full overflow-hidden">
                <div className="h-full bg-aer-primary w-2/3" />
              </div>
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          ts={`<Card variant="glass">\n  <CardHeader>\n    <CardTitle>Activity</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <div className="text-2xl font-bold">+2,350</div>\n    <ProgressBar value={66} />\n  </CardContent>\n</Card>`}
          fullCode={`import { Card, CardHeader, CardTitle, CardContent } from "aer-design";\nimport { Star } from "lucide-react";\n\nexport default function ActivityCard() {\n  return (\n    <Card className="w-full max-w-sm" variant="glass">\n      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">\n        <CardTitle className="text-sm font-medium">Activity</CardTitle>\n        <Star className="h-4 w-4 text-aer-muted-foreground" />\n      </CardHeader>\n      <CardContent>\n        <div className="text-2xl font-bold">+2,350</div>\n        <p className="text-xs text-aer-muted-foreground">\n          +20.1% from last month\n        </p>\n        <div className="mt-4 h-2 w-full bg-aer-muted rounded-full overflow-hidden">\n          <div className="h-full bg-aer-primary w-2/3" />\n        </div>\n      </CardContent>\n    </Card>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <DocSection
        id="card-props"
        title="Card Props"
        description="Comprehensive configuration for the Card container."
      >
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"default" | "outline" | "glass" | "aer"',
              default: '"default"',
              description: "The visual style and transparency level.",
            },
            {
              prop: "padding",
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Internal spacing level.",
            },
            {
              prop: "hoverable",
              type: "boolean",
              default: "false",
              description: "Enables elevation and transform effects on hover.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Custom classes for the root element.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="variant-guide"
        title="Variant Guide"
        description="Choosing the appropriate surface style."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-aer-card">
            <h4 className="font-bold text-sm mb-2">Default</h4>
            <p className="text-xs text-aer-muted-foreground text-pretty">
              Standard surface for application content. Provides shadow and
              background elevation.
            </p>
          </div>
          <div className="p-4 border rounded-lg border-aer-border">
            <h4 className="font-bold text-sm mb-2">Outline</h4>
            <p className="text-xs text-aer-muted-foreground text-pretty">
              Minimalist style. Best for secondary information or nested
              containers.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-md">
            <h4 className="font-bold text-sm mb-2">Glass</h4>
            <p className="text-xs text-aer-muted-foreground text-pretty">
              Semi-transparent with backdrop blur. Great for overlays and mobile
              interfaces.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-black/5 dark:bg-white/5 backdrop-blur-2xl">
            <h4 className="font-bold text-sm mb-2">Aer</h4>
            <p className="text-xs text-aer-muted-foreground text-pretty">
              Flagship aesthetic. Features deep blur and light-reactive borders.
            </p>
          </div>
        </div>
      </DocSection>
    </div>
  );

  const theming = (
    <div className="space-y-12">
      <DocSection
        id="css-variables"
        title="CSS Variables"
        description="Theming tokens for cards."
      >
        <CodeBlock
          ts={`:root {\n  --color-aer-card: hsl(0 0% 100%);\n  --color-aer-card-foreground: hsl(222.2 84% 4.9%);\n  --radius-aer-lg: 0.5rem;\n}`}
        />
      </DocSection>

      <DocSection
        id="auto-contrast"
        title="Auto-Contrast"
        description="Intelligent accessibility logic."
      >
        <p className="text-sm text-aer-muted-foreground">
          Cards support <code>autoContrast</code>, ensuring any children using
          themed text classes maintain visibility against the card's background.
        </p>
      </DocSection>
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Card</h1>
        <p className="text-lg text-aer-muted-foreground italic">
          Weightless containers for structured application shells.
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
              { id: "custom", title: "Custom Usage" },
              { id: "positioning", title: "Positioning" },
              { id: "aer-variant", title: "The Aer Variant" },
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
              { id: "card-props", title: "Card Props" },
              { id: "variant-guide", title: "Variant Guide" },
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
    </div>
  );
}
