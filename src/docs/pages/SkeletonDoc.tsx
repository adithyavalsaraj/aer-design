import { Skeleton } from "@/components/Skeleton";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
} from "@/docs/components/shared";

export function SkeletonDoc() {
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
                A skeleton is a placeholder that simulates the layout of content
                while it is loading. It provides visual feedback and prevents
                layout shifts, making the perceived performance feel faster.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-aer-muted-foreground">
                <li>
                  <strong>Layout Persistence:</strong> Maintains the structure
                  of the page during data fetching.
                </li>
                <li>
                  <strong>Smooth Animations:</strong> Choose between "pulse" or
                  "wave" effects to indicate activity.
                </li>
                <li>
                  <strong>Versatile Shapes:</strong> Supports circular,
                  rectangular, and text-optimized variants.
                </li>
                <li>
                  <strong>Fluid Dimensions:</strong> Easily customizable width,
                  height, and border radius.
                </li>
                <li>
                  <strong>Theme Sync:</strong> Automatically blends with the
                  current theme's muted background.
                </li>
              </ul>
            </div>
          </DocSection>

          {/* 2. When to Use */}
          <DocSection id="when-to-use" title="When to Use">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-aer-md border border-aer-border bg-aer-muted/5">
                <h4 className="font-bold mb-2 text-sm">Use it when:</h4>
                <ul className="text-xs space-y-1 text-aer-muted-foreground">
                  <li>• Content takes more than 300ms to load</li>
                  <li>• You want to avoid jarring layout jumps</li>
                  <li>• Displaying complex data like lists or cards</li>
                </ul>
              </div>
              <div className="p-4 rounded-aer-md border border-aer-border bg-aer-muted/5">
                <h4 className="font-bold mb-2 text-sm">Don't use it:</h4>
                <ul className="text-xs space-y-1 text-aer-muted-foreground">
                  <li>• For static content that is already available</li>
                  <li>
                    • When a simple Spinner or Progress Bar is more appropriate
                  </li>
                </ul>
              </div>
            </div>
          </DocSection>

          {/* 3. Basic Usage */}
          <DocSection id="basic" title="Basic Usage">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                A basic rectangular skeleton.
              </p>
              <Skeleton className="w-[300px] h-[100px]" />
              <CodeBlock
                ts={`<Skeleton className="w-[300px] h-[100px]" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function BasicExample() {
  return (
    <div className="p-8">
      <Skeleton className="w-full max-w-[400px] h-32" />
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 4. Visual Variants */}
          <DocSection id="variants" title="Visual Variants">
            <div className="space-y-8 text-sm">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 font-medium">Text (Default)</p>
                  <Skeleton variant="text" className="w-[80%]" />
                  <Skeleton variant="text" className="w-[60%]" />
                </div>
                <div>
                  <p className="mb-2 font-medium">
                    Circular (Avatar Placeholder)
                  </p>
                  <Skeleton variant="circular" className="size-12" />
                </div>
                <div>
                  <p className="mb-2 font-medium">Rounded (Card Placeholder)</p>
                  <Skeleton variant="rounded" className="w-[200px] h-[100px]" />
                </div>
              </div>
              <CodeBlock
                ts={`<Skeleton variant="text" />
<Skeleton variant="circular" className="size-12" />
<Skeleton variant="rounded" className="w-24 h-24" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function VariantsExample() {
  return (
    <div className="p-8 space-y-8">
       <div className="space-y-2">
         <Skeleton variant="text" className="w-full" />
         <Skeleton variant="text" className="w-3/4" />
       </div>
       
       <Skeleton variant="circular" className="w-16 h-16" />
       
       <Skeleton variant="rounded" className="w-48 h-32" />
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 5. Custom Usage */}
          <DocSection id="custom" title="Custom Usage">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                You can customize the border radius and dimensions for specific
                branding needs.
              </p>
              <Skeleton
                width={120}
                height={40}
                borderRadius="20px"
                className="bg-aer-primary/10"
              />
              <CodeBlock
                ts={`<Skeleton width={120} height={40} borderRadius="20px" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function CustomExample() {
  return (
    <div className="p-8">
      <Skeleton 
        width={150} 
        height={45} 
        borderRadius="9999px" 
        className="bg-blue-500/10" 
      />
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 6. Positioning */}
          <DocSection id="positioning" title="Positioning">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                Skeletons should mimic the z-index and layout properties of the
                components they represent.
              </p>
              <div className="flex items-center gap-4 p-4 border rounded-aer-md bg-aer-muted/5">
                <Skeleton variant="circular" className="size-10 shrink-0" />
                <div className="space-y-2 grow">
                  <Skeleton variant="text" className="w-[40%]" />
                  <Skeleton variant="text" className="w-[30%]" />
                </div>
              </div>
              <CodeBlock
                ts={`<div className="flex gap-4">
  <Skeleton variant="circular" className="size-10" />
  <div className="grow space-y-2">
    <Skeleton variant="text" className="w-1/2" />
    <Skeleton variant="text" className="w-1/3" />
  </div>
</div>`}
                fullCode={`import { Skeleton } from "aer-design";

export default function PositioningExample() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="grow space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-24" />
        </div>
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
            description="The flagship Aer aesthetic featuring glassmorphism and specialized animations."
          >
            <div className="space-y-4 text-sm">
              <div className="p-12 bg-zinc-950 rounded-aer-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-blue-500/10" />
                <div className="relative flex flex-col gap-6">
                  <Skeleton
                    animation="wave"
                    className="h-40 w-full rounded-aer-lg bg-white/5 border border-white/10"
                  />
                  <div className="flex gap-4">
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      className="size-12 bg-white/5 border border-white/10"
                    />
                    <div className="grow space-y-3">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        className="w-full bg-white/5"
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        className="w-2/3 bg-white/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock
                ts={`<Skeleton animation="wave" className="bg-white/5 border border-white/10" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function AerVariantSkeleton() {
  return (
    <div className="p-16 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800">
       <div className="space-y-6">
          <Skeleton animation="wave" className="h-48 w-full rounded-xl bg-white/5 border border-white/10" />
          <div className="space-y-3">
             <Skeleton animation="wave" variant="text" className="w-full bg-white/5" />
             <Skeleton animation="wave" variant="text" className="w-1/2 bg-white/5" />
          </div>
       </div>
    </div>
  );
}`}
              />
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Pro tip:</strong> The Aer variant for Skeletons uses
                  semi-transparent backgrounds that work beautifully on dark or
                  gradient surfaces. Pair with the wave animation for a premium
                  loading experience that feels integrated rather than overlaid.
                </p>
              </div>
            </div>
          </DocSection>

          {/* 9. Interaction States */}
          <DocSection id="states" title="Interaction States">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                Demonstrating different animation types: Pulse vs Wave.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase text-aer-primary">
                    Pulse (Default)
                  </p>
                  <Skeleton animation="pulse" className="h-20 w-full" />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase text-aer-primary">
                    Wave
                  </p>
                  <Skeleton animation="wave" className="h-20 w-full" />
                </div>
              </div>
              <CodeBlock
                ts={`<Skeleton animation="pulse" />
<Skeleton animation="wave" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function AnimationsExample() {
  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <div>
        <h4 className="text-sm font-bold mb-4">Pulse Animation</h4>
        <Skeleton animation="pulse" className="h-24 w-full" />
      </div>
      <div>
        <h4 className="text-sm font-bold mb-4">Wave Animation</h4>
        <Skeleton animation="wave" className="h-24 w-full" />
      </div>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 10. Specialized Contexts */}
          <DocSection id="specialized" title="Specialized Contexts">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                Using skeletons within an interactive Grid layout.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border border-aer-border/50 rounded-aer-md space-y-3 bg-aer-muted/5">
                  <p className="text-[10px] font-bold uppercase text-aer-primary">
                    Themed (Utility)
                  </p>
                  <Skeleton className="h-20 w-full bg-aer-primary/20 border-aer-primary/30" />
                  <Skeleton variant="text" className="w-full" />
                </div>
                <div className="p-4 border border-aer-border/50 rounded-aer-md space-y-3 bg-aer-muted/5">
                  <p className="text-[10px] font-bold uppercase text-indigo-500">
                    Raw HSL (Style)
                  </p>
                  <Skeleton
                    className="h-20 w-full"
                    style={{
                      backgroundColor: "hsl(262 83% 58% / 0.2)",
                      borderColor: "hsl(262 83% 58% / 0.3)",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    }}
                  />
                  <Skeleton variant="text" className="w-full" />
                </div>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-4 border border-aer-border/50 rounded-aer-md space-y-3 bg-aer-muted/5"
                  >
                    <p className="text-[10px] font-bold uppercase text-aer-muted-foreground">
                      Default
                    </p>
                    <Skeleton variant="rectangular" className="h-20 w-full" />
                    <Skeleton variant="text" className="w-full" />
                  </div>
                ))}
              </div>
              <CodeBlock
                ts={`<Skeleton className="bg-aer-primary/20" />
<Skeleton style={{ backgroundColor: 'hsl(262 83% 58% / 0.2)' }} />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function GridSkeletonExample() {
  return (
    <div className="p-8 grid grid-cols-3 gap-4">
       {[1, 2, 3].map(i => (
          <div key={i} className="p-4 border border-aer-border rounded-lg space-y-4">
             <Skeleton variant="rectangular" className="h-32 w-full" />
             <div className="space-y-2">
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="text" className="w-3/4" />
             </div>
          </div>
       ))}
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 11. Validation & Errors */}
          <DocSection id="validation" title="Validation & Errors">
            <div className="space-y-4 text-sm text-aer-muted-foreground">
              <p>
                Skeletons usually do not have explicit error states, but can be
                visually modified if the loading process itself encounters an
                error.
              </p>
              <Skeleton
                className="bg-red-500/10 border border-red-500/20"
                height={60}
              />
              <p className="text-red-500 text-xs mt-2 italic">
                Failed to fetch data...
              </p>
              <CodeBlock
                ts={`<Skeleton className="bg-red-500/10 border border-red-500/20" />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function ErrorStateExample() {
  return (
    <div className="p-8">
      <Skeleton className="h-16 w-full bg-red-100 dark:bg-red-900/20 border border-red-300" />
      <p className="text-red-600 dark:text-red-400 text-sm mt-4">Failed to initialize session.</p>
    </div>
  );
}`}
              />
            </div>
          </DocSection>

          {/* 12. Granular Styling */}
          <DocSection id="styling" title="Granular Styling">
            <div className="space-y-4 text-sm">
              <p className="text-aer-muted-foreground">
                Adjust animation speed or intensity via direct style overrides
                or CSS variables.
              </p>
              <Skeleton
                className="h-20 w-full"
                style={{ animationDuration: "3s", opacity: 0.3 }}
              />
              <CodeBlock
                ts={`<Skeleton style={{ animationDuration: '3s', opacity: 0.3 }} />`}
                fullCode={`import { Skeleton } from "aer-design";

export default function GranularExample() {
  return (
    <div className="p-8">
      <Skeleton 
        className="w-full h-24" 
        style={{ animationDuration: '0.5s', transform: 'skewX(-10deg)' }} 
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
              <p className="text-sm text-aer-muted-foreground text-center italic mb-4">
                Simulating a loading Social Media Post card.
              </p>
              <div className="max-w-md mx-auto p-6 border border-aer-border rounded-aer-xl bg-aer-background shadow-lg space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" className="size-12 shrink-0" />
                  <div className="space-y-2 grow">
                    <Skeleton variant="text" className="w-[120px] h-4" />
                    <Skeleton variant="text" className="w-[80px] h-3" />
                  </div>
                  <Skeleton variant="circular" className="size-8" />
                </div>
                <div className="space-y-3">
                  <Skeleton variant="text" className="w-full h-3" />
                  <Skeleton variant="text" className="w-full h-3" />
                  <Skeleton variant="text" className="w-[60%] h-3" />
                </div>
                <Skeleton variant="rounded" className="h-[200px] w-full" />
                <div className="flex justify-between items-center text-aer-muted-foreground border-t border-aer-border pt-4">
                  <div className="flex gap-4">
                    <Skeleton variant="circular" className="size-6" />
                    <Skeleton variant="circular" className="size-6" />
                  </div>
                  <Skeleton className="w-16 h-4 rounded-full" />
                </div>
              </div>
              <CodeBlock
                ts={`<div className="max-w-md p-6 border border-aer-border rounded-aer-xl bg-aer-background shadow-lg space-y-6">
  <div className="flex items-center gap-4">
    <Skeleton variant="circular" className="size-12" />
    <div className="space-y-2 grow">
      <Skeleton variant="text" className="w-[120px] h-4" />
      <Skeleton variant="text" className="w-[80px] h-3" />
    </div>
  </div>
  <div className="space-y-3">
    <Skeleton variant="text" className="w-full h-3" />
    <Skeleton variant="text" className="w-[60%] h-3" />
  </div>
  <Skeleton variant="rounded" className="h-[200px] w-full" />
</div>`}
                fullCode={`import { Skeleton } from "aer-design";

export default function SocialPostSkeleton() {
  return (
    <div className="p-12 bg-aer-muted/5">
      <div className="max-w-sm mx-auto bg-aer-background border border-aer-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" className="w-12 h-12" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-32 h-4" />
            <Skeleton variant="text" className="w-24 h-3" opacity={0.6} />
          </div>
        </div>
        
        <div className="space-y-2">
           <Skeleton variant="text" className="w-full" />
           <Skeleton variant="text" className="w-full" />
           <Skeleton variant="text" className="w-2/3" />
        </div>
        
        <Skeleton variant="rounded" className="h-48 w-full" />
        
        <div className="flex justify-between pt-4 border-t border-aer-border">
           <div className="flex gap-4">
              <Skeleton variant="circular" className="w-6 h-6" />
              <Skeleton variant="circular" className="w-6 h-6" />
           </div>
           <Skeleton className="w-20 h-4 rounded-full" />
        </div>
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
          <DocSection title="Skeleton Props">
            <ApiTable
              data={[
                {
                  prop: "variant",
                  type: "'text' | 'circular' | 'rectangular' | 'rounded'",
                  default: '"text"',
                  description: "The shape of the skeleton.",
                },
                {
                  prop: "animation",
                  type: "'pulse' | 'wave' | 'none'",
                  default: '"pulse"',
                  description: "The loading animation effect.",
                },
                {
                  prop: "width",
                  type: "string | number",
                  default: '"auto"',
                  description: "Custom width override.",
                },
                {
                  prop: "height",
                  type: "string | number",
                  default: "variant-specific",
                  description: "Custom height override.",
                },
                {
                  prop: "borderRadius",
                  type: "string | number",
                  default: "variant-specific",
                  description: "Custom corner rounding.",
                },
              ]}
            />
          </DocSection>

          <DocSection title="Variant Usage Guide">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-aer-md">
                <h4 className="font-bold mb-2 text-sm text-aer-primary">
                  Pulse
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  The default subtle pulse effect, ideal for simple UI elements.
                </p>
              </div>
              <div className="p-4 border rounded-aer-md">
                <h4 className="font-bold mb-2 text-sm text-aer-primary">
                  Wave
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  A more dynamic sweeping sheen, great for larger graphics or
                  image placeholders.
                </p>
              </div>
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
                  prop: "--color-aer-skeleton",
                  type: "color",
                  default: "hsl(215 20% 88%)",
                  description:
                    "The base color of the skeleton placeholder in light mode.",
                },
              ]}
            />
          </DocSection>

          <DocSection title="Animations">
            <div className="p-4 rounded-aer-md bg-blue-500/5 border border-blue-500/20 text-sm text-aer-muted-foreground">
              <p>
                Animation durations are globally defined in{" "}
                <code>index.css</code>. You can override individual speeds using
                the <code>animation-duration</code> property.
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
        <h1 className="text-4xl font-bold tracking-tight mb-2">Skeleton</h1>
        <p className="text-aer-muted-foreground text-lg">
          Placeholder components for simulating layout content during loading
          states.
        </p>
      </div>

      <DocTabs tabs={overviewTabs} />
    </div>
  );
}
