import { TabContent, TabList, Tabs, TabTrigger } from "@/components/Tabs";
import {
  Bell,
  CreditCard,
  Layout,
  Mic,
  Music,
  Radio,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
  UsageGuidelines,
} from "../components/shared";

function TabsPlayground() {
  const [variant, setVariant] = useState<
    "default" | "aer" | "pills" | "underline" | "cards"
  >("default");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [count, setCount] = useState(3);
  const [lazy, setLazy] = useState(false);

  const tabs = Array.from({ length: count }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: `Content for panel ${i + 1}`,
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col border rounded-aer-xl bg-aer-muted/5 divide-y divide-aer-border">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold">Variant</label>
            <div className="flex flex-wrap gap-2">
              {(["default", "aer", "pills", "underline", "cards"] as const).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                      variant === v
                        ? "bg-aer-foreground text-aer-background border-aer-foreground"
                        : "bg-aer-background hover:bg-aer-muted"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold">Orientation</label>
            <div className="flex flex-wrap gap-2">
              {(["horizontal", "vertical"] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setOrientation(o)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                    orientation === o
                      ? "bg-aer-foreground text-aer-background border-aer-foreground"
                      : "bg-aer-background hover:bg-aer-muted"
                  }`}
                >
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold">
              Tab Count (Overflow)
            </label>
            <div className="flex flex-wrap gap-2">
              {[3, 5, 12].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                    count === n
                      ? "bg-aer-foreground text-aer-background border-aer-foreground"
                      : "bg-aer-background hover:bg-aer-muted"
                  }`}
                >
                  {n} Tabs
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold">Features</label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLazy(!lazy)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all text-left ${
                  lazy
                    ? "bg-aer-foreground text-aer-background border-aer-foreground"
                    : "bg-aer-background hover:bg-aer-muted"
                }`}
              >
                {lazy ? "✓ Lazy Loading On" : "Lazy Loading Off"}
              </button>
              <p className="text-[10px] text-aer-muted-foreground italic">
                Try setting count to 12 to test scroll arrows.
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div
          className={`p-8 bg-aer-background relative min-h-[300px] flex transition-all ${
            variant === "aer" ? "dark bg-zinc-950" : ""
          }`}
        >
          {variant === "aer" && (
            <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 via-transparent to-blue-600/10 pointer-events-none" />
          )}
          <div
            className={`relative z-10 w-full ${
              orientation === "horizontal"
                ? "max-w-xl mx-auto"
                : "flex h-[250px] max-w-2xl mx-auto"
            }`}
          >
            <Tabs
              key={`${variant}-${orientation}-${count}`}
              variant={variant}
              orientation={orientation}
              defaultValue="tab1"
              lazy={lazy}
              className="w-full"
            >
              <TabList className={orientation === "vertical" ? "w-32" : ""}>
                {tabs.map((t) => (
                  <TabTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabTrigger>
                ))}
              </TabList>
              <div
                className={`flex-1 ${
                  orientation === "horizontal" ? "mt-4" : "ml-4"
                }`}
              >
                {tabs.map((t) => (
                  <TabContent
                    key={t.value}
                    value={t.value}
                    className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 animate-in fade-in slide-in-from-top-1 h-full flex items-center justify-center text-center"
                  >
                    <div>
                      <h4 className="font-bold text-aer-foreground mb-2">
                        {t.label} Activated
                      </h4>
                      <p className="text-sm text-aer-muted-foreground">
                        {t.content}
                      </p>
                    </div>
                  </TabContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Code */}
      <CodeBlock
        ts={`<Tabs 
  variant="${variant}" 
  orientation="${orientation}"
  ${lazy ? "lazy" : ""}
>
  <TabList>
    {tabs.map(t => <TabTrigger value={t.value}>{t.label}</TabTrigger>)}
  </TabList>
  {tabs.map(t => <TabContent value={t.value}>...</TabContent>)}
</Tabs>`}
        fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function InteractiveDemo() {
  const tabs = Array.from({ length: ${count} }, (_, i) => ({
    value: \`tab\${i + 1}\`,
    label: \`Tab \${i + 1}\`,
    content: \`Panel \${i + 1} content\`
  }));

  return (
    <Tabs 
      variant="${variant}" 
      orientation="${orientation}"
      defaultValue="tab1"
      ${lazy ? "lazy" : ""}
    >
      <TabList>
        {tabs.map((t) => (
          <TabTrigger key={t.value} value={t.value}>
            {t.label}
          </TabTrigger>
        ))}
      </TabList>
      {tabs.map((t) => (
        <TabContent key={t.value} value={t.value} className="p-4 border mt-2 rounded">
          {t.content}
        </TabContent>
      ))}
    </Tabs>
  );
}`}
      />
    </div>
  );
}

export function TabsDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A flexible tabs component with multiple styles and data-driven rendering support."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Tabs component organizes content into multiple sections,
            allowing users to navigate between them. It supports horizontal and
            vertical orientations, various visual styles including a
            glassmorphism "Aer" variant, and a template-based approach for
            cleaner code.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>5 Visual Variants</strong>: Default, Aer, Pills,
              Underline, Cards
            </li>
            <li>
              <strong>Template Approach</strong>: Render tabs from a data array
            </li>
            <li>
              <strong>Responsive Scroll</strong>: Automatically handles overflow
              with scroll buttons
            </li>
            <li>
              <strong>Vertical Support</strong>: Full support for vertical
              orientation
            </li>
            <li>
              <strong>Headless Mode</strong>: For complete custom styling
            </li>
            <li>
              <strong>Accessibility</strong>: Built with proper ARIA roles and
              keyboard navigation
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        title="When to Use"
        id="when-to-use"
        description="Choose the right layout strategy for your navigation."
      >
        <UsageGuidelines
          do={[
            "Toggling between related content views in the same context.",
            "Organizing dashboard modules (e.g., General, Security, Billing).",
            "Switching between chart types or data representations.",
            "Filtering large lists into broad categories.",
          ]}
          dont={[
            "Navigating to fundamentally different parts of the application (use Navbar or Sidebar).",
            "Triggering immediate actions (use Button).",
            "Displaying sequential steps (use Steps component).",
          ]}
        />
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="Standard composition using sub-components."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Tabs defaultValue="account">
            <TabList>
              <TabTrigger value="account">Account</TabTrigger>
              <TabTrigger value="password">Password</TabTrigger>
              <TabTrigger value="settings">Settings</TabTrigger>
            </TabList>
            <TabContent value="account">
              <div className="p-4 border border-aer-border rounded-md mt-4">
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-aer-muted-foreground">
                  Make changes to your account here.
                </p>
              </div>
            </TabContent>
            <TabContent value="password">
              <div className="p-4 border border-aer-border rounded-md mt-4">
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-aer-muted-foreground">
                  Change your password here.
                </p>
              </div>
            </TabContent>
            <TabContent value="settings">
              <div className="p-4 border border-aer-border rounded-md mt-4">
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-aer-muted-foreground">
                  Manage your settings.
                </p>
              </div>
            </TabContent>
          </Tabs>
        </div>
        <CodeBlock
          ts={`<Tabs defaultValue="account">
  <TabList>
    <TabTrigger value="account">Account</TabTrigger>
    <TabTrigger value="password">Password</TabTrigger>
    <TabTrigger value="settings">Settings</TabTrigger>
  </TabList>
  <TabContent value="account">Account content...</TabContent>
  <TabContent value="password">Password content...</TabContent>
  <TabContent value="settings">Settings content...</TabContent>
</Tabs>`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function BasicTabs() {
  return (
    <Tabs defaultValue="account">
      <TabList>
        <TabTrigger value="account">Account</TabTrigger>
        <TabTrigger value="password">Password</TabTrigger>
        <TabTrigger value="settings">Settings</TabTrigger>
      </TabList>
      <TabContent value="account">
        <div className="p-4 border border-aer-border rounded-md mt-4">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-aer-muted-foreground">
            Make changes to your account here.
          </p>
        </div>
      </TabContent>
      <TabContent value="password">
        <div className="p-4 border border-aer-border rounded-md mt-4">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-aer-muted-foreground">
            Change your password here.
          </p>
        </div>
      </TabContent>
      <TabContent value="settings">
        <div className="p-4 border border-aer-border rounded-md mt-4">
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-aer-muted-foreground">
            Manage your settings.
          </p>
        </div>
      </TabContent>
    </Tabs>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Different styles for various contexts."
      >
        <div className="grid gap-8">
          {/* Pills Variant */}
          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Pills Variant</h4>
            <Tabs
              variant="pills"
              defaultValue="music"
              items={[
                {
                  value: "music",
                  label: "Music",
                  content: <div className="p-4">Music Content</div>,
                },
                {
                  value: "podcasts",
                  label: "Podcasts",
                  content: <div className="p-4">Podcast Content</div>,
                },
              ]}
            />
          </div>

          {/* Underline Variant */}
          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Underline Variant</h4>
            <Tabs
              variant="underline"
              defaultValue="details"
              items={[
                {
                  value: "details",
                  label: "Details",
                  content: <div className="p-4">Details View</div>,
                },
                {
                  value: "reviews",
                  label: "Reviews",
                  content: <div className="p-4">Reviews View</div>,
                },
              ]}
            />
          </div>

          {/* Cards Variant */}
          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Cards Variant</h4>
            <Tabs
              variant="cards"
              defaultValue="general"
              items={[
                {
                  value: "general",
                  label: "General",
                  content: <div className="p-4">General Settings</div>,
                },
                {
                  value: "advanced",
                  label: "Advanced",
                  content: <div className="p-4">Advanced Settings</div>,
                },
              ]}
            />
          </div>
        </div>
        <CodeBlock
          ts={`// Pills variant
<Tabs variant="pills" items={...} />

// Underline variant
<Tabs variant="underline" items={...} />

// Cards variant
<Tabs variant="cards" items={...} />`}
          fullCode={`import { Tabs } from "aer-design";

export default function TabsVariants() {
  const items = [
    { value: "1", label: "Tab 1", content: <div className="p-4">Content 1</div> },
    { value: "2", label: "Tab 2", content: <div className="p-4">Content 2</div> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 font-semibold text-sm">Pills</h4>
        <Tabs variant="pills" defaultValue="1" items={items} />
      </div>
      
      <div>
        <h4 className="mb-4 font-semibold text-sm">Underline</h4>
        <Tabs variant="underline" defaultValue="1" items={items} />
      </div>
      
      <div>
        <h4 className="mb-4 font-semibold text-sm">Cards</h4>
        <Tabs variant="cards" defaultValue="1" items={items} />
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
      >
        <AerVariantExample />
        <CodeBlock
          ts={`<Tabs variant="aer" defaultValue="design" items={...} />`}
          fullCode={`import { Tabs } from "aer-design";
import { Sparkles, Code, User } from "lucide-react";

export default function AerTabsExample() {
  return (
    <div className="relative p-8 bg-zinc-950 rounded-xl overflow-hidden min-h-[400px]">
       <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-blue-600/20" />
       
       <div className="relative z-10 max-w-md mx-auto">
         <Tabs
            variant="aer"
            defaultValue="design"
            items={[
              {
                value: "design",
                label: "Design",
                icon: <Sparkles className="size-4" />,
                content: <div className="text-white/80">Premium Design</div>
              },
               {
                value: "code",
                label: "Code",
                icon: <Code className="size-4" />,
                content: <div className="text-white/80">Clean Code</div>
              },
            ]}
         />
       </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for Tabs adds a premium,
            glass-like depth to your interface. It is designed to sit on top of
            complex, colorful, or dark backgrounds, where its translucency and
            subtle borders can shine. Avoid using it on plain white backgrounds
            where the effect may be lost.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="template"
        title="Template Approach"
        description="Data-driven rendering using the 'items' prop for cleaner code."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Tabs
            defaultValue="music"
            items={[
              {
                value: "music",
                label: "Music",
                icon: <Music className="size-4" />,
                content: <div className="p-4">Play your favorite songs.</div>,
              },
              {
                value: "podcasts",
                label: "Podcasts",
                icon: <Mic className="size-4" />,
                content: (
                  <div className="p-4">Listen to the latest episodes.</div>
                ),
              },
              {
                value: "live",
                label: "Live",
                icon: <Radio className="size-4" />,
                content: <div className="p-4">Tune in to live broadcasts.</div>,
              },
            ]}
          />
        </div>
        <CodeBlock
          ts={`const items = [
  { value: "music", label: "Music", icon: <Music />, content: <div>Music content</div> },
  { value: "podcasts", label: "Podcasts", icon: <Mic />, content: <div>Podcast content</div> },
];

<Tabs defaultValue="music" items={items} />`}
          fullCode={`import { Tabs } from "aer-design";
import { Music, Mic, Radio } from "lucide-react";

export default function TemplateTabs() {
  const items = [
    { 
      value: "music", 
      label: "Music", 
      icon: <Music className="size-4" />, 
      content: <div className="p-4">Play your favorite songs.</div> 
    },
    { 
      value: "podcasts", 
      label: "Podcasts", 
      icon: <Mic className="size-4" />, 
      content: <div className="p-4">Listen to the latest episodes.</div> 
    },
    { 
      value: "live", 
      label: "Live", 
      icon: <Radio className="size-4" />, 
      content: <div className="p-4">Tune in to live broadcasts.</div> 
    },
  ];

  return <Tabs defaultValue="music" items={items} />;
}`}
        />
      </DocSection>

      <DocSection
        id="vertical"
        title="Vertical Orientation"
        description="Vertical tabs are great for settings pages or side navigation."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background h-[300px] flex">
          <Tabs
            orientation="vertical"
            defaultValue="profile"
            className="h-full w-full"
            items={[
              {
                value: "profile",
                label: "Profile",
                icon: <User className="size-4" />,
                content: (
                  <div className="p-4 h-full">Profile Settings form...</div>
                ),
              },
              {
                value: "notifications",
                label: "Notifications",
                icon: <Bell className="size-4" />,
                content: (
                  <div className="p-4 h-full">Notification preferences...</div>
                ),
              },
              {
                value: "billing",
                label: "Billing",
                icon: <CreditCard className="size-4" />,
                content: <div className="p-4 h-full">Billing history...</div>,
              },
              {
                value: "system",
                label: "System",
                icon: <Settings className="size-4" />,
                content: (
                  <div className="p-4 h-full">System configuration...</div>
                ),
              },
            ]}
          />
        </div>
        <CodeBlock
          ts={`<Tabs orientation="vertical" defaultValue="profile">
  <TabList>
     <TabTrigger value="profile">Profile</TabTrigger>
     {/* ... */}
  </TabList>
  {/* ... */}
</Tabs>`}
          fullCode={`import { Tabs } from "aer-design";
import { User, Bell, CreditCard, Settings } from "lucide-react";

export default function VerticalTabs() {
  const items = [
    { 
      value: "profile", 
      label: "Profile", 
      icon: <User className="size-4" />, 
      content: <div className="p-4 h-full">Profile Settings form...</div> 
    },
    { 
      value: "notifications", 
      label: "Notifications", 
      icon: <Bell className="size-4" />, 
      content: <div className="p-4 h-full">Notification preferences...</div> 
    },
    { 
      value: "billing", 
      label: "Billing", 
      icon: <CreditCard className="size-4" />, 
      content: <div className="p-4 h-full">Billing history...</div> 
    },
    { 
      value: "system", 
      label: "System", 
      icon: <Settings className="size-4" />, 
      content: <div className="p-4 h-full">System configuration...</div> 
    },
  ];

  return (
    <div className="h-[300px] flex border rounded-lg overflow-hidden bg-white">
      <Tabs orientation="vertical" defaultValue="profile" className="h-full w-full" items={items} />
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="states"
        title="Interaction States"
        description="Visual feedback for user interactions."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background space-y-8">
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-aer-muted-foreground">
              Disabled State
            </h5>
            <Tabs defaultValue="one">
              <TabList>
                <TabTrigger value="one">Active</TabTrigger>
                <TabTrigger value="two" disabled>
                  Disabled
                </TabTrigger>
              </TabList>
              <TabContent value="one">
                <div className="p-4">Active content</div>
              </TabContent>
            </Tabs>
          </div>
        </div>
        <CodeBlock
          ts={`<TabTrigger value="disabled" disabled>Disabled</TabTrigger>`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function InteractionStates() {
  return (
    <Tabs defaultValue="one">
      <TabList>
        <TabTrigger value="one">Active</TabTrigger>
        <TabTrigger value="two" disabled>
          Disabled
        </TabTrigger>
      </TabList>
      <TabContent value="one">
        <div className="p-4">Active content</div>
      </TabContent>
    </Tabs>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="navigation"
        title="Navigation Playground"
        description="Combined keyboard and scroll navigation. Like the Sidebar doc, you can test all layouts and accessibility features here."
      >
        <TabsPlayground />

        <div className="mt-12 space-y-8">
          <div className="p-8 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-bold text-center mb-6">Navigation Guide</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-4 bg-aer-background border rounded-lg shadow-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-aer-primary">
                  Keyboard Shortcuts
                </h4>
                <p className="text-xs text-aer-muted-foreground leading-relaxed">
                  Focus a tab and use arrow keys to switch instantly. We follow
                  WAI-ARIA standards for focus management and activation.
                </p>
              </div>
              <div className="p-4 bg-aer-background border rounded-lg shadow-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-aer-primary">
                  Scroll Navigation
                </h4>
                <p className="text-xs text-aer-muted-foreground leading-relaxed">
                  When tabs overflow, use the chevron arrows or your mouse
                  wheel. Navigating via keyboard will also auto-scroll the
                  active tab into view.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-aer-md border border-aer-border">
            <table className="w-full text-sm text-left">
              <thead className="bg-aer-muted/50 text-aer-muted-foreground font-medium border-b border-aer-border">
                <tr>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-bold">
                    Key
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aer-border">
                <tr>
                  <td className="px-4 py-3 font-mono text-aer-primary text-xs font-bold">
                    ArrowLeft / ArrowRight
                  </td>
                  <td className="px-4 py-3">
                    Navigate tabs in horizontal orientation.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-aer-primary text-xs font-bold">
                    ArrowUp / ArrowDown
                  </td>
                  <td className="px-4 py-3">
                    Navigate tabs in vertical orientation.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-aer-primary text-xs font-bold">
                    Home / End
                  </td>
                  <td className="px-4 py-3">Jump to first or last tab.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-aer-primary text-xs font-bold">
                    Space / Enter
                  </td>
                  <td className="px-4 py-3">Activate focused tab.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="granular-styling"
        title="Granular Styling"
        description="Customize internal elements using className props."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Tabs defaultValue="custom">
            <TabList className="bg-aer-muted/20 p-2 rounded-lg border border-aer-border border-dashed">
              <TabTrigger
                value="custom"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"
              >
                Custom Active
              </TabTrigger>
              <TabTrigger value="default" className="text-aer-foreground/50">
                Default
              </TabTrigger>
            </TabList>
            <TabContent
              value="custom"
              className="mt-4 p-6 bg-blue-500/5 border border-blue-500/20 rounded-lg text-blue-700 dark:text-blue-400"
            >
              Custom content styled via className
            </TabContent>
          </Tabs>
        </div>
        <CodeBlock
          ts={`<TabList className="bg-aer-muted/20 ...">
  <TabTrigger className="data-[state=active]:bg-blue-500 ..." />
</TabList>
<TabContent className="bg-blue-500/5 ..." />`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function GranularStyling() {
  return (
    <Tabs defaultValue="custom">
      <TabList className="bg-aer-muted/20 p-2 rounded-lg border border-aer-border border-dashed">
        <TabTrigger
          value="custom"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"
        >
          Custom Active
        </TabTrigger>
        <TabTrigger value="default" className="text-aer-foreground/50">
          Default
        </TabTrigger>
      </TabList>
      <TabContent
        value="custom"
        className="mt-4 p-6 bg-blue-500/5 border border-blue-500/20 rounded-lg text-blue-700 dark:text-blue-400"
      >
        Custom content styled via className
      </TabContent>
    </Tabs>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="performance"
        title="Performance & Lazy Loading"
        description="Optimize large tab sets using lazy loading and data mapping."
      >
        <div className="space-y-6">
          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="text-sm font-semibold mb-4 text-aer-primary">
              Lazy Loading Example
            </h4>
            <Tabs defaultValue="t1" lazy>
              <TabList>
                <TabTrigger value="t1">Standard</TabTrigger>
                <TabTrigger value="t2">Lazy Panel</TabTrigger>
              </TabList>
              <TabContent value="t1">
                This panel is rendered on load.
              </TabContent>
              <TabContent value="t2">
                This panel is <strong>lazy loaded</strong>. It only enters the
                DOM when you click this tab for the first time.
              </TabContent>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-aer-border rounded-lg">
              <h5 className="font-medium text-sm mb-2">Lazy Loading</h5>
              <p className="text-xs text-aer-muted-foreground">
                Set the <code className="bg-aer-muted px-1 rounded">lazy</code>{" "}
                prop on
                <code className="bg-aer-muted px-1 rounded">Tabs</code> or
                individual
                <code className="bg-aer-muted px-1 rounded">TabContent</code> to
                delay rendering until needed.
              </p>
            </div>
            <div className="p-4 border border-aer-border rounded-lg">
              <h5 className="font-medium text-sm mb-2">Data Mapping</h5>
              <p className="text-xs text-aer-muted-foreground">
                For massive sets of tabs, use the{" "}
                <code className="bg-aer-muted px-1 rounded">items</code> prop to
                map data directly to components, reducing boilerplate.
              </p>
            </div>
          </div>
        </div>
        <CodeBlock
          ts={`// Lazy loading entire tabs set
<Tabs lazy defaultValue="1" items={largeData} />

// Or individual panels
<TabContent value="profile" lazy>...</TabContent>`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function PerformanceDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold mb-2">Lazy Loaded Tabs</h3>
        <Tabs defaultValue="tab1" lazy>
          <TabList>
            <TabTrigger value="tab1">Always Here</TabTrigger>
            <TabTrigger value="tab2">Load on Click</TabTrigger>
          </TabList>
          <TabContent value="tab1">
            Standard content.
          </TabContent>
          <TabContent value="tab2">
            This was just added to the DOM!
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="headless"
        title="Headless Mode"
        description="Complete control over styling by removing all default visual styles."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Tabs headless defaultValue="tab1">
            <TabList className="flex gap-8 border-b border-aer-border mb-4">
              <TabTrigger
                value="tab1"
                className="pb-2 text-sm font-medium data-[state=active]:text-aer-primary data-[state=active]:border-b-2 data-[state=active]:border-aer-primary transition-colors hover:text-aer-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring"
              >
                Custom Tab 1
              </TabTrigger>
              <TabTrigger
                value="tab2"
                className="pb-2 text-sm font-medium data-[state=active]:text-aer-primary data-[state=active]:border-b-2 data-[state=active]:border-aer-primary transition-colors hover:text-aer-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring"
              >
                Custom Tab 2
              </TabTrigger>
            </TabList>
            <TabContent
              value="tab1"
              className="text-sm text-aer-muted-foreground p-2"
            >
              This is a completely custom-styled tab using headless mode.
            </TabContent>
            <TabContent
              value="tab2"
              className="text-sm text-aer-muted-foreground p-2"
            >
              Default styles are removed, giving you full control with Tailwind
              or CSS.
            </TabContent>
          </Tabs>
        </div>
        <CodeBlock
          ts={`<Tabs headless defaultValue="tab1">
  <TabList className="flex gap-8 border-b ...">
    <TabTrigger value="tab1" className="...">Custom Tab 1</TabTrigger>
    <TabTrigger value="tab2" className="...">Custom Tab 2</TabTrigger>
  </TabList>
  <TabContent value="tab1">...</TabContent>
</Tabs>`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";

export default function HeadlessTabs() {
  return (
    <Tabs headless defaultValue="tab1">
      <TabList className="flex gap-8 border-b border-aer-border mb-4">
        <TabTrigger
          value="tab1"
          className="pb-2 text-sm font-medium data-[state=active]:text-aer-primary data-[state=active]:border-b-2 data-[state=active]:border-aer-primary transition-colors hover:text-aer-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring"
        >
          Custom Tab 1
        </TabTrigger>
        <TabTrigger
          value="tab2"
          className="pb-2 text-sm font-medium data-[state=active]:text-aer-primary data-[state=active]:border-b-2 data-[state=active]:border-aer-primary transition-colors hover:text-aer-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring"
        >
          Custom Tab 2
        </TabTrigger>
      </TabList>
      <TabContent value="tab1" className="text-sm text-aer-muted-foreground p-2">
        This is a completely custom-styled tab using headless mode.
      </TabContent>
      <TabContent value="tab2" className="text-sm text-aer-muted-foreground p-2">
        Default styles are removed, giving you full control with Tailwind or CSS.
      </TabContent>
    </Tabs>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A dashboard widget using tabs to switch between views."
      >
        <RealWorldExample />
        <CodeBlock
          ts={`export default function DashboardWidget() {
  return (
    <div className="border border-aer-border rounded-xl bg-aer-background shadow-sm overflow-hidden">
      <div className="p-4 border-b border-aer-border flex justify-between items-center bg-aer-muted/5">
        <h3 className="font-semibold">Project Activity</h3>
        <div className="flex gap-2">
          {/* Actions */}
        </div>
      </div>
      <Tabs defaultValue="all" variant="underline" className="p-0">
         <div className="px-4 pt-4">
             <TabList className="w-full border-b border-aer-border">
                <TabTrigger value="all">All</TabTrigger>
                <TabTrigger value="commits">Commits</TabTrigger>
                <TabTrigger value="prs">PRs</TabTrigger>
             </TabList>
         </div>
         <div className="p-0">
            <TabContent value="all" className="m-0">
               {/* Activity List */}
            </TabContent>
         </div>
      </Tabs>
    </div>
  );
}`}
          fullCode={`import { Tabs, TabList, TabTrigger, TabContent } from "aer-design";
import { Layout } from "lucide-react";

export default function DashboardWidget() {
  return (
    <div className="border border-aer-border rounded-xl bg-aer-background shadow-sm overflow-hidden max-w-2xl">
      <div className="p-4 border-b border-aer-border flex justify-between items-center bg-aer-muted/5">
        <h3 className="font-semibold flex items-center gap-2">
          <Layout className="size-4" /> Project Activity
        </h3>
        <button className="text-xs font-medium text-aer-primary hover:underline">
          View all
        </button>
      </div>
      <Tabs defaultValue="all" variant="underline" className="w-full">
        <div className="px-4 pt-4 border-b border-aer-border">
          <TabList className="w-full">
            <TabTrigger value="all">All</TabTrigger>
            <TabTrigger value="commits">Commits</TabTrigger>
            <TabTrigger value="prs">Pull Requests</TabTrigger>
          </TabList>
        </div>
        <div className="bg-aer-background min-h-[150px]">
          <TabContent value="all" className="m-0 p-0">
            <div className="divide-y divide-aer-border">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 flex items-center gap-3 hover:bg-aer-muted/5"
                >
                  <div className="size-8 rounded-full bg-aer-muted flex items-center justify-center text-xs">
                    AB
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">User {i}</span> pushed to{" "}
                    <span className="font-mono text-xs bg-aer-muted px-1 rounded">
                      main
                    </span>
                  </div>
                  <span className="ml-auto text-xs text-aer-muted-foreground">
                    {i}h ago
                  </span>
                </div>
              ))}
            </div>
          </TabContent>
          <TabContent value="commits" className="m-0 p-8 text-center">
            <div className="text-aer-muted-foreground text-sm">
              No recent commits found.
            </div>
          </TabContent>
          <TabContent value="prs" className="m-0 p-8 text-center">
            <div className="text-aer-muted-foreground text-sm">
              No open pull requests.
            </div>
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="tabs-props" className="text-lg font-bold mb-4">
          TabsProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "defaultValue",
              type: "string",
              default: "-",
              description: "The default active tab value (uncontrolled).",
            },
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "The currently active tab value (controlled).",
            },
            {
              prop: "onValueChange",
              type: "(value: string) => void",
              default: "-",
              description: "Callback when the active tab changes.",
            },
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "The orientation of the tabs.",
            },
            {
              prop: "variant",
              type: '"default" | "aer" | "pills" | "underline" | "cards"',
              default: '"default"',
              description: "Visual style variant.",
            },
            {
              prop: "items",
              type: "TabItem[]",
              default: "-",
              description: "Array of items for data-driven rendering.",
            },
            {
              prop: "headless",
              type: "boolean",
              default: "false",
              description: "If true, removes base styles for custom styling.",
            },
            {
              prop: "forceMount",
              type: "boolean",
              default: "false",
              description: "Propagate forceMount to all TabContent items.",
            },
            {
              prop: "lazy",
              type: "boolean",
              default: "false",
              description: "Propagate lazy loading to all TabContent items.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="tablist-props" className="text-lg font-bold mb-4">
          TabListProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Container for the tab triggers.
        </p>
        <ApiTable
          data={[
            {
              prop: "children",
              type: "ReactNode",
              default: "-",
              description: "Must contain TabTrigger components.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="tabtrigger-props" className="text-lg font-bold mb-4">
          TabTriggerProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Interactive element that activates a tab.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Unique value identifying this tab.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the tab is disabled.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "-",
              description: "Icon to display before the label.",
            },
            {
              prop: "children",
              type: "ReactNode",
              default: "-",
              description: "Label or content of the trigger.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="tabcontent-props" className="text-lg font-bold mb-4">
          TabContentProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Container for the tab panel content.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Value matching the associated trigger.",
            },
            {
              prop: "forceMount",
              type: "boolean",
              default: "false",
              description:
                "If true, content stays mounted in DOM when inactive (hidden with CSS).",
            },
            {
              prop: "lazy",
              type: "boolean",
              default: "false",
              description:
                "If true, content is only rendered when first activated and then stays mounted.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="tabitem-type" className="text-lg font-bold mb-4">
          TabItem Type
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Usage object for data-driven rendering via the `items` prop.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Unique value for the tab.",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description: "Content for the trigger tab.",
            },
            {
              prop: "content",
              type: "ReactNode",
              default: "-",
              description: "Content for the panel.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether this tab is disabled.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "-",
              description: "Icon for the trigger.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="variant-guide" className="text-lg font-bold mb-4">
          Variant Usage Guide
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">default</h4>
            <p className="text-sm text-aer-muted-foreground">
              Simple text tabs. Good for low-emphasis navigation.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">aer</h4>
            <p className="text-sm text-aer-muted-foreground">
              Premium glassmorphism. Best for hero sections or high-impact
              features.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">pills</h4>
            <p className="text-sm text-aer-muted-foreground">
              Solid background shapes. Great for toggles or filters.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">underline</h4>
            <p className="text-sm text-aer-muted-foreground">
              Clean bottom border. Standard for page navigation.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">cards</h4>
            <p className="text-sm text-aer-muted-foreground">
              Segmented control style. Good for small settings groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize tabs using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Tabs use the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  --aer-muted: 240 4.8% 95.9%;
  --aer-muted-foreground: 240 3.8% 46.1%;
  --aer-border: 240 5.9% 90%;
  --aer-ring: 240 10% 3.9%;
}`}
        />
        <p className="text-sm text-aer-muted-foreground pt-4">
          You can also scope variables to a specific tabs component:
        </p>
        <CodeBlock
          ts={`.my-custom-tabs {
  --aer-primary: 262 83% 58%; /* Purple active state */
  --aer-muted: 262 30% 90%;   /* Purple-ish mute */
}`}
        />
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tabs
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A versatile tabs component with multiple styles and data-driven
          rendering.
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
              { id: "basic", title: "Basic Usage" },
              { id: "variants", title: "Visual Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "template", title: "Template Approach" },
              { id: "vertical", title: "Vertical Orientation" },
              { id: "states", title: "Interaction States" },
              { id: "navigation", title: "Navigation Playground" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "performance", title: "Performance & Lazy" },
              { id: "headless", title: "Headless Mode" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "tabs-props", title: "TabsProps" },
              { id: "tablist-props", title: "TabListProps" },
              { id: "tabtrigger-props", title: "TabTriggerProps" },
              { id: "tabcontent-props", title: "TabContentProps" },
              { id: "tabitem-type", title: "TabItem Type" },
              { id: "variant-guide", title: "Variant Usage Guide" },
            ],
          },
          {
            id: "theming",
            label: "Theming",
            content: theming,
            toc: [{ id: "css-variables", title: "CSS Variables" }],
          },
        ]}
      />
    </div>
  );
}

// Example Components
function AerVariantExample() {
  return (
    <div className="aer-vibrant-container dark">
      <div className="aer-vibrant-bg" />
      <div className="w-full max-w-md relative z-10 p-8">
        <h4 className="text-white mb-6 font-semibold flex items-center gap-2">
          <Sparkles className="size-4 text-blue-300" /> Aer Variant
        </h4>
        <Tabs
          variant="aer"
          defaultValue="design"
          items={[
            {
              value: "design",
              label: "Design",
              content: (
                <div className="text-white/80 h-20 flex items-center justify-center">
                  Premium glassmorphism design.
                </div>
              ),
            },
            {
              value: "code",
              label: "Code",
              content: (
                <div className="text-white/80 h-20 flex items-center justify-center">
                  Clean and semantic markup.
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function RealWorldExample() {
  return (
    <div className="border border-aer-border rounded-xl bg-aer-background shadow-sm overflow-hidden max-w-2xl">
      <div className="p-4 border-b border-aer-border flex justify-between items-center bg-aer-muted/5">
        <h3 className="font-semibold flex items-center gap-2">
          <Layout className="size-4" /> Project Activity
        </h3>
        <button className="text-xs font-medium text-aer-primary hover:underline">
          View all
        </button>
      </div>
      <Tabs defaultValue="all" variant="underline" className="w-full">
        <div className="px-4 pt-4 border-b border-aer-border">
          <TabList className="w-full">
            <TabTrigger value="all">All</TabTrigger>
            <TabTrigger value="commits">Commits</TabTrigger>
            <TabTrigger value="prs">Pull Requests</TabTrigger>
          </TabList>
        </div>
        <div className="bg-aer-background min-h-[150px]">
          <TabContent value="all" className="m-0 p-0">
            <div className="divide-y divide-aer-border">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 flex items-center gap-3 hover:bg-aer-muted/5"
                >
                  <div className="size-8 rounded-full bg-aer-muted flex items-center justify-center text-xs">
                    AB
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Adithya</span> pushed to{" "}
                    <span className="font-mono text-xs bg-aer-muted px-1 rounded">
                      main
                    </span>
                  </div>
                  <span className="ml-auto text-xs text-aer-muted-foreground">
                    2h ago
                  </span>
                </div>
              ))}
            </div>
          </TabContent>
          <TabContent value="commits" className="m-0 p-8 text-center">
            <div className="text-aer-muted-foreground text-sm">
              No recent commits found.
            </div>
          </TabContent>
          <TabContent value="prs" className="m-0 p-8 text-center">
            <div className="text-aer-muted-foreground text-sm">
              No open pull requests.
            </div>
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
}
