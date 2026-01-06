import { Badge } from "@/components/Badge";
import { Star } from "lucide-react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

function BasicVariantsExample() {
  return (
    <div className="flex flex-wrap gap-4 items-center p-6 border rounded-xl bg-aer-muted/5">
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  );
}

function StatusExample() {
  return (
    <div className="flex flex-wrap gap-4 items-center p-6 border rounded-xl bg-aer-muted/5">
      <Badge status="default">Default</Badge>
      <Badge status="primary">Primary</Badge>
      <Badge status="success">Success</Badge>
      <Badge status="warning">Warning</Badge>
      <Badge status="error">Error</Badge>
    </div>
  );
}

function SizesExample() {
  return (
    <div className="flex flex-wrap gap-4 items-center p-6 border rounded-xl bg-aer-muted/5">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}

function AerVariantExample() {
  return (
    <div className="aer-vibrant-container dark">
      <div className="aer-vibrant-bg" />
      <div className="relative z-10 flex flex-wrap gap-4">
        <Badge variant="aer" status="primary">
          <Star className="size-3 mr-1" /> Premium
        </Badge>
        <Badge variant="aer" status="success">
          Live
        </Badge>
        <Badge variant="aer" status="warning">
          Pending
        </Badge>
        <Badge variant="aer" status="error">
          Expired
        </Badge>
      </div>
    </div>
  );
}

function BasicUsageExample() {
  return (
    <div className="p-8 border rounded-xl bg-aer-muted/5 flex items-center justify-center">
      <Badge>Default Badge</Badge>
    </div>
  );
}

export function BadgeDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A compact status indicator component for highlighting metadata."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Badges are used to inform users of the status of an item or to
            emphasize important metadata. They are small, non-interactive
            elements that provide visual context at a glance.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Multi-variant system</strong> supporting filled, outline,
              soft, ghost, and premium aer styles.
            </li>
            <li>
              <strong>Semantic status mapping</strong> for default, primary,
              success, warning, and error states.
            </li>
            <li>
              <strong>Auto-contrast engine</strong> integration for maintaining
              WCAG compatibility on any background.
            </li>
            <li>
              <strong>Responsive scaling</strong> with small, medium, and large
              presets.
            </li>
            <li>
              <strong>Sub-pixel rendering</strong> optimization for crisp text
              at small sizes.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Guidelines for choosing the right badge style."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">Statuses</h4>
            <p className="text-sm text-aer-muted-foreground">
              Use status colors to communicate semantic meaning:
            </p>
            <ul className="text-sm text-aer-muted-foreground mt-2 space-y-1 list-disc pl-5">
              <li>Success for positive outcomes (Paid, Active, Done)</li>
              <li>Warning for pending actions (In Review, Low Stock)</li>
              <li>Error for critical issues (Failed, Blocked, Overdue)</li>
              <li>Primary for brand emphasis (New, Featured)</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Visual Weight
            </h4>
            <p className="text-sm text-aer-muted-foreground">
              Choose variants based on desired prominence:
            </p>
            <ul className="text-sm text-aer-muted-foreground mt-2 space-y-1 list-disc pl-5">
              <li>Filled for high-visibility highlights</li>
              <li>Soft/Outline for secondary metadata</li>
              <li>Aer for premium, elevated UI contexts</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="The simplest implementation of a Badge."
      >
        <BasicUsageExample />
        <CodeBlock
          ts={`<Badge>Standard Badge</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function BasicExample() {\n  return <Badge>Standard Badge</Badge>;\n}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Different styling patterns for badges."
      >
        <BasicVariantsExample />
        <CodeBlock
          ts={`<Badge variant="filled">Filled</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="soft">Soft</Badge>\n<Badge variant="ghost">Ghost</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <Badge variant="filled">Status</Badge>\n      <Badge variant="outline">Version</Badge>\n      <Badge variant="soft">Category</Badge>\n      <Badge variant="ghost">Hidden</Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="custom"
        title="Custom Usage"
        description="Extending the badge with custom icons or children."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex gap-4 overflow-x-auto">
          <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0">
            Gradient
          </Badge>
          <Badge className="border-dashed">Dashed Border</Badge>
        </div>
        <CodeBlock
          ts={`<Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0">\n  Gradient\n</Badge>\n<Badge className="border-dashed">Dashed Border</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function CustomBadges() {\n  return (\n    <div className="flex gap-4">\n      <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0 font-extrabold">\n        Premium\n      </Badge>\n      <Badge className="border-dashed border-2 px-4 italic" variant="outline">\n        BETA\n      </Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="Guidance on where to place badges in your UI."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex justify-center gap-8">
          <div className="relative inline-block">
            <div className="size-10 bg-aer-muted rounded-full flex items-center justify-center">
              <Star className="size-5" />
            </div>
            <Badge
              size="sm"
              status="primary"
              rounded="full"
              className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px]"
            >
              3
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">New Message</span>
              <Badge size="sm" status="success">
                New
              </Badge>
            </div>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="relative inline-block">\n  <Avatar />\n  <Badge status="primary" rounded="full" className="absolute -top-1 -right-1" />\n</div>`}
          fullCode={`import { Badge } from "aer-design";\nimport { Star } from "lucide-react";\n\nexport default function PositionedBadge() {\n  return (\n    <div className="flex gap-8">\n      <div className="relative inline-block">\n        <div className="size-10 bg-aer-muted rounded-full flex items-center justify-center">\n          <Star className="size-5" />\n        </div>\n        <Badge\n          size="sm"\n          status="primary"\n          rounded="full"\n          className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] shadow-lg"\n        >\n          3\n        </Badge>\n      </div>\n    </div>\n  );\n}`}
        />
        <div className="prose prose-sm max-w-none text-aer-muted-foreground mt-4">
          <p>
            Badges are designed to be inline elements but can be absolute
            positioned for notifications:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Tab Headers:</strong> Use <code>size="sm"</code> to show
              counts.
            </li>
            <li>
              <strong>Avatars:</strong> Position absolute at the top-right
              corner.
            </li>
            <li>
              <strong>Table Rows:</strong> Use <code>variant="soft"</code> for
              low-priority metadata.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="status"
        title="Status Colors"
        description="Semantic colors for different types of information."
      >
        <StatusExample />
        <CodeBlock
          ts={`<Badge status="success">Success</Badge>\n<Badge status="warning">Warning</Badge>\n<Badge status="error">Error</Badge>\n<Badge status="primary">Primary</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function StatusBadges() {\n  return (\n    <div className="flex gap-4">\n      <Badge status="success">Approved</Badge>\n      <Badge status="warning">Pending</Badge>\n      <Badge status="error">Rejected</Badge>\n      <Badge status="primary">New Feature</Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Our premium flagship variant with glassmorphism effects."
      >
        <AerVariantExample />
        <CodeBlock
          ts={`<Badge variant="aer" status="primary">Premium</Badge>\n<Badge variant="aer" status="success">Active</Badge>`}
          fullCode={`import { Badge } from "aer-design";\nimport { Star } from "lucide-react";\n\nexport default function AerBadgeExample() {\n  return (\n    <div className="aer-vibrant-container">\n      <div className="aer-vibrant-bg-wrapper">\n        <div className="aer-vibrant-bg" />\n      </div>\n      <div className="relative z-10 flex gap-4">\n        <Badge variant="aer" status="primary">\n          <Star className="size-3 mr-1" /> Pro\n        </Badge>\n        <Badge variant="aer" status="success">Online</Badge>\n      </div>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant uses backdrop-blur and
            semi-transparent borders. It works best on colorful or dark
            backgrounds to truly showcase the glassmorphism effect.
          </p>
        </div>
      </DocSection>

      <DocSection id="sizes" title="Sizes" description="Available badge sizes.">
        <SizesExample />
        <CodeBlock
          ts={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg">Large</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function BadgeSizes() {\n  return (\n    <div className="flex items-center gap-4">\n      <Badge size="sm">Tiny</Badge>\n      <Badge size="md">Normal</Badge>\n      <Badge size="lg">Prominent</Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="states"
        title="Interaction States"
        description="Demonstrating visual feedback for various conditions."
      >
        <div className="flex flex-wrap gap-4 items-center p-6 border rounded-xl bg-aer-muted/5">
          <Badge className="hover:opacity-80 cursor-help">Hover State</Badge>
          <Badge className="opacity-50 cursor-not-allowed">Disabled</Badge>
        </div>
        <CodeBlock
          ts={`<Badge className="hover:opacity-80 transition-opacity">Hover</Badge>\n<Badge className="opacity-50 cursor-not-allowed">Disabled</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function BadgeStates() {\n  return (\n    <div className="flex gap-4">\n      <Badge className="hover:scale-110 hover:shadow-md transition-all cursor-pointer">\n        Animated Hover\n      </Badge>\n      <Badge status="error" className="opacity-50 cursor-not-allowed select-none">\n        Disabled Error\n      </Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="specialized"
        title="Specialized Contexts"
        description="Context-aware badge behavior."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5">
          <div className="flex items-center gap-2 p-3 bg-aer-background border border-dashed border-aer-border rounded">
            <span className="text-xs font-mono text-aer-muted-foreground font-bold uppercase">
              Debug Mode
            </span>
            <Badge
              size="sm"
              variant="outline"
              className="font-mono text-[10px]"
            >
              fps: 60
            </Badge>
            <Badge
              size="sm"
              variant="outline"
              className="font-mono text-[10px]"
            >
              mem: 2.4gb
            </Badge>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="flex gap-2 items-center">\n  <span>Debug:</span>\n  <Badge size="sm" variant="outline">fps: 60</Badge>\n</div>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function DebugContext() {\n  return (\n    <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded">\n      <span className="text-xs font-mono text-zinc-500 font-bold uppercase">\n        SYSTEM_LOG\n      </span>\n      <Badge size="sm" variant="outline" className="font-mono text-emerald-500 border-emerald-500/30">\n        HEALTHY\n      </Badge>\n      <Badge size="sm" variant="outline" className="font-mono text-sky-500 border-sky-500/30">\n        Uptime: 99.9%\n      </Badge>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 border border-aer-border rounded-lg bg-aer-muted/5">
          <p className="text-sm text-aer-muted-foreground">
            In <strong>Debug Mode</strong>, badges can be used to display
            performance metrics or system flags with high density.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="validation"
        title="Validation & Errors"
        description="Badges as validation indicators."
      >
        <div className="flex gap-4 p-6 border rounded-xl bg-aer-muted/5">
          <div className="flex items-center gap-2">
            <span className="text-sm">Password:</span>
            <Badge status="error" size="sm">
              Too Weak
            </Badge>
          </div>
        </div>
        <CodeBlock
          ts={`<Badge status="error" size="sm">Too Weak</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function ValidationBadge() {\n  return (\n    <div className="space-y-4">\n      <div className="flex items-center gap-2">\n        <label className="text-sm">API Key:</label>\n        <Badge status="error" size="sm">Revoked</Badge>\n      </div>\n      <div className="flex items-center gap-2">\n        <label className="text-sm">Storage:</label>\n        <Badge status="warning" size="sm">90% Full</Badge>\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="styling"
        title="Granular Styling"
        description="Targeting internal elements for precise overrides."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5 flex flex-wrap gap-4">
          <Badge className="bg-pink-500/10 text-pink-600 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
            Neon Glow
          </Badge>
          <Badge className="border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Neubrutalism
          </Badge>
        </div>
        <div className="prose prose-sm max-w-none text-aer-muted-foreground mt-4">
          <p>
            The Badge component uses a single root element. You can apply deep
            customization using the <code>className</code> or <code>style</code>{" "}
            attributes:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Custom Glows:</strong> Use <code>shadow-[...]</code> for
              ambient lighting.
            </li>
            <li>
              <strong>Borders:</strong> Override with <code>border-2</code> or{" "}
              <code>border-dashed</code> for distinct UI states.
            </li>
            <li>
              <strong>Typography:</strong> Adjust <code>font-mono</code> or{" "}
              <code>italic</code> for specialized data.
            </li>
          </ul>
        </div>
        <CodeBlock
          ts={`<Badge className="shadow-[0_0_10px_rgba(236,72,153,0.5)]">Glow</Badge>\n<Badge className="border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Brutal</Badge>`}
          fullCode={`import { Badge } from "aer-design";\n\nexport default function StyledBadges() {\n  return (\n    <div className="flex gap-4">\n      <Badge className="bg-pink-500/10 text-pink-600 border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]">\n        Neon Glow\n      </Badge>\n      <Badge className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">\n        Neubrutalism\n      </Badge>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="Production-ready metadata display."
      >
        <div className="p-6 border rounded-xl bg-aer-muted/5">
          <div className="flex items-center justify-between max-w-md p-4 bg-aer-background border rounded-lg shadow-sm">
            <div className="flex gap-3 items-center">
              <div className="size-10 rounded bg-blue-500/10 flex items-center justify-center">
                <Star className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Design System Pro</p>
                <p className="text-xs text-aer-muted-foreground">
                  Latest Version: v12.4.0
                </p>
              </div>
            </div>
            <Badge status="success" rounded="full">
              Updated
            </Badge>
          </div>
        </div>
        <CodeBlock
          ts={`<div className="flex items-center justify-between p-4 border rounded-lg">\n  <div className="flex gap-3 items-center">\n    <Star className="text-blue-500" />\n    <div>\n      <p>Design System Pro</p>\n    </div>\n  </div>\n  <Badge status="success" rounded="full">Updated</Badge>\n</div>`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <DocSection
        id="badge-props"
        title="Badge Props"
        description="Props available for the Badge component."
      >
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"filled" | "outline" | "soft" | "ghost" | "aer"',
              default: '"filled"',
              description: "The visual style of the badge.",
            },
            {
              prop: "status",
              type: '"default" | "primary" | "success" | "warning" | "error"',
              default: '"default"',
              description: "The semantic color status of the badge.",
            },
            {
              prop: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "The vertical and horizontal scale of the badge.",
            },
            {
              prop: "rounded",
              type: '"sm" | "md" | "lg" | "full"',
              default: '"md"',
              description: "The corner radius of the badge.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for custom styling.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="variant-guide"
        title="Variant Guide"
        description="Choosing the right visual emphasis."
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-sm mb-2">Filled</h4>
            <p className="text-xs text-aer-muted-foreground">
              Maximum prominence. Use for critical status changes like "Failed"
              or "Critical".
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-sm mb-2">Soft</h4>
            <p className="text-xs text-aer-muted-foreground">
              Subtle emphasis. Perfect for secondary metadata in lists or cards.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-sm mb-2">Aer</h4>
            <p className="text-xs text-aer-muted-foreground">
              Premium premium branding. Best for "Pro" features or featured
              content.
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
        description="Customizable variables for global badge styling."
      >
        <div className="prose prose-sm max-w-none text-aer-muted-foreground">
          <p>
            Badges lean heavily on the core semantic color tokens of Aer Design.
          </p>
          <CodeBlock
            ts={`:root {\n  --color-aer-primary: hsl(221.2 83.2% 53.3%);\n  --radius-aer-md: calc(0.5rem - 2px);\n}`}
          />
        </div>
      </DocSection>

      <DocSection
        id="auto-contrast"
        title="Auto-Contrast"
        description="Accessibility features."
      >
        <p className="text-sm text-aer-muted-foreground">
          Badges support the <code>autoContrast</code> global setting,
          automatically adjusting text color based on the computed background
          luminance.
        </p>
      </DocSection>
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Badge</h1>
        <p className="text-lg text-aer-muted-foreground italic">
          High-performance semantic markers.
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
              { id: "status", title: "Status Colors" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "sizes", title: "Sizes" },
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
              { id: "badge-props", title: "Badge Props" },
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
