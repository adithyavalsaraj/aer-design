import { Badge } from "@/components/Badge";
import { Divider } from "@/components/Divider";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
  UsageGuidelines,
} from "@/docs/components/shared";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export function DividerDoc() {
  const overviewTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-12">
          {/* 1. Introduction */}
          <DocSection id="introduction" title="Introduction">
            <div className="space-y-4">
              <p className="text-aer-muted-foreground">
                A divider is a thin line that groups content in lists and
                layouts. It helps create visual hierarchy and separate distinct
                sections of information.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-aer-muted-foreground">
                <li>
                  <strong>Visual Separation:</strong> Clearly defines boundaries
                  between different content blocks.
                </li>
                <li>
                  <strong>Label Support:</strong> Allows embedding text or icons
                  within the line for better context.
                </li>
                <li>
                  <strong>Orientation Context:</strong> Supports both horizontal
                  and vertical layouts.
                </li>
                <li>
                  <strong>Stylistic Variants:</strong> Choose between solid,
                  dashed, or dotted lines to match your design.
                </li>
                <li>
                  <strong>Theme Integrated:</strong> Automatically uses theme
                  colors with support for custom overrides.
                </li>
              </ul>
            </div>
          </DocSection>

          {/* 2. When to Use */}
          <DocSection id="when-to-use" title="When to Use">
            <UsageGuidelines
              do={[
                "Separating items in a list or menu",
                "Dividing chapters or major sections in a long document",
                "Grouping related fields in a complex form",
                "Creating clear visual breaks between distinct topics",
              ]}
              dont={[
                "White space alone is sufficient for separation",
                "Creating 'box' layouts (Use Card instead)",
                "Over-partitioning content, causing visual clutter",
              ]}
            />
          </DocSection>

          {/* 3. Basic Usage */}
          <DocSection id="basic" title="Basic Usage">
            <div className="space-y-4">
              <div className="py-4">
                <p className="text-sm mb-4">A simple horizontal line.</p>
                <Divider />
              </div>
              <CodeBlock
                ts={`<Divider />`}
                fullCode={`import { Divider } from "aer-design";

export default function BasicExample() {
  return (
    <div className="space-y-4 p-8">
      <p>Section Above</p>
      <Divider />
      <p>Section Below</p>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 4. Visual Variants */}
          <DocSection id="variants" title="Visual Variants">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm">Solid (Default)</p>
                <Divider variant="solid" />
                <p className="text-sm">Dashed</p>
                <Divider variant="dashed" />
                <p className="text-sm">Dotted</p>
                <Divider variant="dotted" />
              </div>
              <CodeBlock
                ts={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />`}
                fullCode={`import { Divider } from "aer-design";

export default function VariantsExample() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-aer-muted-foreground mb-2">Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-aer-muted-foreground mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-aer-muted-foreground mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 5. Custom Usage */}
          <DocSection id="custom" title="Custom Usage">
            <div className="space-y-4">
              <div className="py-4 space-y-6">
                <div>
                  <p className="text-sm mb-2 text-aer-muted-foreground italic">
                    Horizontal with centered text label
                  </p>
                  <Divider>OR</Divider>
                </div>
                <div>
                  <p className="text-sm mb-2 text-aer-muted-foreground italic">
                    Horizontal with start-aligned label and icon
                  </p>
                  <Divider labelPlacement="start">
                    <div className="flex items-center gap-2">
                      <Settings className="size-4" />
                      Configuration
                    </div>
                  </Divider>
                </div>
              </div>
              <CodeBlock
                ts={`<Divider>OR</Divider>
<Divider labelPlacement="start">
  <div className="flex items-center gap-2">
    <Settings className="size-4" />
    Configuration
  </div>
</Divider>`}
                fullCode={`import { Divider } from "aer-design";
import { Settings } from "lucide-react";

export default function CustomUsageExample() {
  return (
    <div className="space-y-8 p-8">
      <Divider>OR</Divider>
      
      <Divider labelPlacement="start">
        <div className="flex items-center gap-2">
          <Settings className="size-4" />
          Settings
        </div>
      </Divider>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 6. Positioning */}
          <DocSection id="positioning" title="Positioning">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground">
                In vertical mode, the Divider should be placed within a flex
                container that has a defined height.
              </p>
              <div className="flex h-10 items-center gap-4 border border-aer-border/50 p-2 rounded-aer-md bg-aer-muted/5">
                <span className="text-sm">Profile</span>
                <Divider orientation="vertical" />
                <span className="text-sm">Settings</span>
                <Divider orientation="vertical" />
                <span className="text-sm">Logout</span>
              </div>
              <CodeBlock
                ts={`<div className="flex h-10 items-center">
  <span>Profile</span>
  <Divider orientation="vertical" />
  <span>Settings</span>
</div>`}
                fullCode={`import { Divider } from "aer-design";

export default function VerticalExample() {
  return (
    <div className="p-8">
      <div className="flex h-6 items-center gap-4">
        <span>Dashboard</span>
        <Divider orientation="vertical" />
        <span>Reports</span>
        <Divider orientation="vertical" />
        <span>Analytics</span>
      </div>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 8. The Aer Variant */}
          <DocSection
            id="aer-variant"
            title="The Aer Variant"
            description="The flagship Aer aesthetic featuring glassmorphism and elevated line weight."
          >
            <div className="space-y-4">
              <div className="p-8 bg-zinc-950 rounded-aer-lg overflow-hidden relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-emerald-500/10" />
                <div className="relative space-y-6 w-full max-w-md">
                  <p className="text-white font-medium">Glassmorphism Flow</p>
                  <Divider
                    className="border-white/20"
                    variant="solid"
                    thickness="2px"
                  />
                  <p className="text-white/60 text-sm">
                    Elevated separation with subtle transparency.
                  </p>
                </div>
              </div>
              <CodeBlock
                ts={`<Divider className="border-white/10" thickness="2px" />`}
                fullCode={`import { Divider } from "aer-design";

export default function AerVariantExample() {
  return (
    <div className="p-12 bg-zinc-950 rounded-lg">
      <div className="space-y-6">
        <h3 className="text-white text-xl">System Update</h3>
        <Divider className="border-white/20" thickness="2px" />
        <p className="text-white/50">Version 2.4.0 is now available for download.</p>
      </div>
    </div>
  );
}`}
              />
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Pro tip:</strong> The Aer variant for Dividers works
                  best with semi-transparent borders on dark or richly colored
                  backgrounds. Use thicker lines (2-3px) to create clear visual
                  hierarchy while maintaining the glassmorphism aesthetic.
                </p>
              </div>
            </div>
          </DocSection>

          {/* 9. Interaction States */}
          <DocSection id="states" title="Interaction States">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground italic">
                Hover over the divider to see the interactive state.
              </p>
              <div className="py-4">
                <Divider
                  className="hover:border-aer-primary transition-colors cursor-help"
                  title="Interactive Divider"
                />
              </div>
              <CodeBlock
                ts={`<Divider className="hover:border-aer-primary transition-colors" />`}
                fullCode={`import { Divider } from "aer-design";

export default function InteractionExample() {
  return (
    <div className="p-8 space-y-4">
      <p>Content above</p>
      <Divider className="hover:border-aer-primary transition-all duration-300 cursor-pointer" />
      <p>Content below (Try hovering the line)</p>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 10. Specialized Contexts */}
          <DocSection id="specialized" title="Specialized Contexts">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground">
                Using thickness and color for clear separation in high-density
                UI.
              </p>
              <div className="flex justify-center p-6 border rounded-lg bg-aer-muted/5">
                <div className="space-y-4 p-4 border rounded-aer-md bg-white w-full max-w-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Order Summary</span>
                    <Badge status="primary">Step 1 of 3</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-aer-primary">
                      Themed Variable
                    </p>
                    <Divider thickness="3px" color="var(--primary)" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-indigo-500">
                      Raw HSL Color
                    </p>
                    <Divider thickness="3px" color="hsl(262 83% 58%)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                    <div className="text-aer-muted-foreground">Subtotal</div>
                    <div className="text-right">$129.00</div>
                  </div>
                </div>
              </div>
              <CodeBlock
                ts={`<Divider thickness="3px" color="var(--primary)" />
<Divider thickness="3px" color="hsl(262 83% 58%)" />`}
                fullCode={`import { Divider } from "aer-design";

export default function HighContrastExample() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Invoice</h2>
      <Divider thickness="4px" className="border-black dark:border-white mb-6" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Consulting</span>
          <span>$1,500.00</span>
        </div>
      </div>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 11. Validation & Errors */}
          <DocSection id="validation" title="Validation & Errors">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground">
                Highlighting a section that requires attention.
              </p>
              <div className="flex justify-center p-6 border rounded-lg bg-aer-muted/5">
                <div className="border border-red-500/20 rounded-aer-md p-4 bg-red-500/5 w-full max-w-md">
                  <p className="text-red-500 font-medium mb-4 italic">
                    Security Check required
                  </p>
                  <Divider color="rgb(239 68 68)" thickness="2px" />
                  <p className="mt-4 text-sm text-aer-muted-foreground">
                    Please confirm your identity before proceeding.
                  </p>
                </div>
              </div>
              <CodeBlock
                ts={`<Divider color="rgb(239 68 68)" thickness="2px" />`}
                fullCode={`import { Divider } from "aer-design";

export default function ValidationErrorExample() {
  return (
    <div className="p-8 border border-red-200 bg-red-50 rounded-lg">
      <h3 className="text-red-800">Invalid Configuration</h3>
      <Divider color="#991b1b" className="my-4" />
      <p className="text-red-700">Please review the marked fields above.</p>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 12. Granular Styling */}
          <DocSection id="styling" title="Granular Styling">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground">
                Overriding internal styles using Tailwind classes for custom
                aesthetics.
              </p>
              <Divider className="border-t-4 border-indigo-500/30" />
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-xs font-bold uppercase text-aer-muted-foreground">
                  Styleable Slots:
                </p>
                <ul className="text-xs space-y-1 text-aer-muted-foreground">
                  <li>
                    • <code>Root</code>: The container element.
                  </li>
                  <li>
                    • <code>Line</code>: The horizontal/vertical rule.
                  </li>
                  <li>
                    • <code>Label</code>: The text/icon container.
                  </li>
                </ul>
              </div>
              <CodeBlock
                ts={`<Divider className="border-t-4 border-indigo-500/30" />`}
                fullCode={`import { Divider } from "aer-design";

export default function GranularStylingExample() {
  return (
    <div className="p-8">
      <Divider 
        className="opacity-20 hover:opacity-100 transition-opacity" 
        style={{ filter: "blur(0.5px)" }}
      />
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 13. Real World Example */}
          <DocSection id="real-world" title="Real World Example">
            <div className="space-y-4">
              <p className="text-sm text-aer-muted-foreground">
                An IDE-style Settings Panel with labeled sections and vertical
                grouping.
              </p>
              <div className="flex justify-center p-6 border rounded-lg bg-aer-muted/5">
                <div className="bg-aer-background border border-aer-border rounded-aer-lg overflow-hidden max-w-2xl w-full">
                  <div className="p-4 bg-aer-muted/30 border-b border-aer-border flex items-center gap-4">
                    <div className="size-8 rounded-aer-md bg-aer-primary/10 flex items-center justify-center">
                      <Settings className="size-4 text-aer-primary" />
                    </div>
                    <span className="font-bold">Workspace Settings</span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-aer-muted-foreground mb-4">
                        General
                      </h4>
                      <div className="space-y-4 px-4 py-2 bg-aer-muted/5 rounded-aer-md">
                        <div className="flex justify-between items-center text-sm">
                          <span>Theme</span>
                          <span className="text-aer-primary cursor-pointer hover:underline">
                            Dark Mode
                          </span>
                        </div>
                        <Divider variant="dashed" />
                        <div className="flex justify-between items-center text-sm">
                          <span>Language</span>
                          <span className="text-aer-primary cursor-pointer hover:underline">
                            English (US)
                          </span>
                        </div>
                      </div>
                    </div>

                    <Divider labelPlacement="start">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-aer-primary/10 text-aer-primary rounded-full">
                        Danger Zone
                      </span>
                    </Divider>

                    <div className="space-y-4 px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-aer-md">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-red-500">Reset Workspace</span>
                        <span className="text-red-500 cursor-pointer hover:underline font-bold">
                          Reset
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock
                ts={`<div className="bg-aer-background border border-aer-border rounded-aer-lg overflow-hidden">
  <div className="p-4 bg-aer-muted/30 border-b border-aer-border flex items-center gap-4">
    <Settings className="size-4 text-aer-primary" />
    <span className="font-bold">Workspace Settings</span>
  </div>
  <div className="p-6 space-y-6">
    <div>
      <h4 className="text-xs uppercase font-bold text-aer-muted-foreground mb-4">General</h4>
      <div className="space-y-4 px-4 py-2 bg-aer-muted/5 rounded-aer-md">
        <span>Theme</span>
        <Divider variant="dashed" />
        <span>Language</span>
      </div>
    </div>

    <Divider labelPlacement="start">
      <Badge status="error">Danger Zone</Badge>
    </Divider>

    <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-aer-md">
      <span className="text-red-500">Reset Workspace</span>
    </div>
  </div>
</div>`}
                fullCode={`import { Divider, Badge } from "aer-design";
import { Settings, User, Mail, MessageSquare } from "lucide-react";

export default function IDEPanel() {
  return (
    <div className="bg-aer-background border border-aer-border rounded-lg max-w-md shadow-xl overflow-hidden">
      <div className="p-4 bg-aer-muted/20 border-b border-aer-border font-bold flex items-center gap-2">
        <Settings size={16} /> User Preferences
      </div>
      
      <div className="p-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-bold uppercase tracking-tighter text-aer-muted-foreground">Accounts</h3>
             <Badge size="sm" status="success">Active</Badge>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-sm">
                <User size={14} className="text-aer-muted-foreground" />
                <span>Profile info</span>
             </div>
             <Divider variant="dashed" />
             <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="text-aer-muted-foreground" />
                <span>Email preferences</span>
             </div>
          </div>
        </section>

        <Divider labelPlacement="start">
          <MessageSquare size={12} className="text-aer-primary" />
        </Divider>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-tighter text-aer-muted-foreground mb-4">Communication</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span>In-app notifications</span>
                <span className="text-aer-primary text-xs font-bold">Manage</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}`}
              />
            </div>
          </DocSection>
        </div>
      ),
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
      content: (
        <div className="space-y-10">
          <DocSection title="Divider Props">
            <ApiTable
              data={[
                {
                  prop: "orientation",
                  type: "'horizontal' | 'vertical'",
                  default: '"horizontal"',
                  description: "Whether the divider is a row or a column.",
                },
                {
                  prop: "variant",
                  type: "'solid' | 'dashed' | 'dotted'",
                  default: '"solid"',
                  description: "The line style of the divider.",
                },
                {
                  prop: "thickness",
                  type: "string",
                  default: '"1px"',
                  description: "Thickness of the line.",
                },
                {
                  prop: "color",
                  type: "string",
                  default: "theme border color",
                  description: "Custom border/background color override.",
                },
                {
                  prop: "labelPlacement",
                  type: "'start' | 'center' | 'end'",
                  default: '"center"',
                  description:
                    "Position of the label along the horizontal line.",
                },
                {
                  prop: "labelGap",
                  type: "string",
                  default: '"1rem"',
                  description:
                    "Space between the label and the surrounding lines.",
                },
              ]}
            />
          </DocSection>

          <DocSection title="Variant Usage Guide">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 border-t-4 border-t-aer-primary">
                <h4 className="font-bold mb-2 text-sm">Solid</h4>
                <p className="text-xs text-aer-muted-foreground">
                  Used for major content divisions and clearly defined
                  boundaries.
                </p>
              </Card>
              <Card className="p-4 border-t-4 border-t-aer-muted">
                <h4 className="font-bold mb-2 text-sm">Dashed</h4>
                <p className="text-xs text-aer-muted-foreground">
                  Ideal for secondary separation or where a lighter visual touch
                  is needed.
                </p>
              </Card>
              <Card className="p-4 border-t-4 border-t-aer-muted">
                <h4 className="font-bold mb-2 text-sm">Dotted</h4>
                <p className="text-xs text-aer-muted-foreground">
                  A minimalist choice for grouping very closely related inline
                  items.
                </p>
              </Card>
            </div>
          </DocSection>
        </div>
      ),
    },
    {
      id: "theming",
      label: "Theming",
      content: (
        <div className="space-y-10">
          <DocSection title="CSS Variables">
            <ApiTable
              data={[
                {
                  prop: "--color-aer-divider",
                  type: "color",
                  default: "hsl(215 20% 80%)",
                  description:
                    "Default color for the divider line in light mode.",
                },
                {
                  prop: "--aer-muted-foreground",
                  type: "color",
                  default: "var(--color-aer-muted-foreground)",
                  description: "Color for the label text.",
                },
              ]}
            />
          </DocSection>

          <DocSection title="Auto-Contrast">
            <div className="p-4 rounded-aer-md bg-blue-500/5 border border-blue-500/20 text-sm text-aer-muted-foreground">
              <p>
                Labels within the divider automatically inherit the current
                theme's muted text color, ensuring high contrast ratios against
                both light and dark backgrounds.
              </p>
            </div>
          </DocSection>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Divider</h1>
        <p className="text-aer-muted-foreground text-lg">
          A visual line that separates content into distinct blocks or groups.
        </p>
      </div>

      <DocTabs tabs={overviewTabs} />
    </div>
  );
}

const Card = ({ children, className, variant = "outline" }: any) => (
  <div
    className={cn(
      "p-6 rounded-aer-lg border bg-card/50",
      variant === "outline"
        ? "border-aer-border/50"
        : "border-t-aer-primary border-t-4 shadow-xl",
      className
    )}
  >
    {children}
  </div>
);
