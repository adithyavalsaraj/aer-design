import { Accordion } from "@/components/Accordion";
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

// Lazy Loading Example with JSONPlaceholder API
function LazyLoadingExample() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());

  const fetchPost = async (id: number) => {
    if (loadedIndices.has(id)) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      setPosts((prev) => {
        const newPosts = [...prev];
        newPosts[id - 1] = data;
        return newPosts;
      });
      setLoadedIndices((prev) => new Set(prev).add(id));
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
      <h4 className="mb-4 font-semibold">Lazy Loading with API Data</h4>
      <Accordion
        variant="bordered"
        onExpand={(index) => fetchPost(index + 1)}
        lazy
      >
        {[1, 2, 3, 4, 5].map((id, index) => (
          <Accordion.Tab
            key={id}
            header={posts[index]?.title || `Post ${id} (Click to load)`}
          >
            <div className="space-y-2">
              {loading && !posts[index] ? (
                <div className="flex items-center gap-2 text-aer-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-aer-primary border-t-transparent" />
                  Loading...
                </div>
              ) : posts[index] ? (
                <>
                  <p className="text-sm font-medium">{posts[index].title}</p>
                  <p className="text-sm text-aer-muted-foreground">
                    {posts[index].body}
                  </p>
                  <p className="text-xs text-aer-muted-foreground mt-2">
                    Post ID: {posts[index].id} | User ID: {posts[index].userId}
                  </p>
                </>
              ) : (
                <p className="text-sm text-aer-muted-foreground">
                  Content will load when expanded
                </p>
              )}
            </div>
          </Accordion.Tab>
        ))}
      </Accordion>
    </div>
  );
}

// Aer Variant Example
function AerVariantExample() {
  return (
    <div className="aer-vibrant-container">
      <div className="aer-vibrant-bg" />
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500 aer-vibrant-blob"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 aer-vibrant-blob"
        style={{ transform: "translate(50%, 50%)" }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Accordion variant="aer" defaultActiveIndex={0}>
          <Accordion.Tab
            header="Premium Design"
            icon={<Shield className="h-4 w-4" />}
          >
            <p className="text-white/80">
              Experience the glassmorphism effect with backdrop blur and
              elevated depth.
            </p>
          </Accordion.Tab>
          <Accordion.Tab
            header="Advanced Features"
            icon={<Settings className="h-4 w-4" />}
          >
            <p className="text-white/80">
              Full keyboard navigation, accessibility, and smooth animations.
            </p>
          </Accordion.Tab>
          <Accordion.Tab
            header="Customizable"
            icon={<User className="h-4 w-4" />}
          >
            <p className="text-white/80">
              Granular styling control with className props for every element.
            </p>
          </Accordion.Tab>
        </Accordion>
      </div>
    </div>
  );
}

// Controlled Example
function ControlledExample() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveIndex(0)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
            activeIndex === 0
              ? "bg-aer-primary text-aer-primary-foreground border-aer-primary"
              : "bg-aer-background hover:bg-aer-muted"
          }`}
        >
          Open First
        </button>
        <button
          onClick={() => setActiveIndex(1)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
            activeIndex === 1
              ? "bg-aer-primary text-aer-primary-foreground border-aer-primary"
              : "bg-aer-background hover:bg-aer-muted"
          }`}
        >
          Open Second
        </button>
        <button
          onClick={() => setActiveIndex(2)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
            activeIndex === 2
              ? "bg-aer-primary text-aer-primary-foreground border-aer-primary"
              : "bg-aer-background hover:bg-aer-muted"
          }`}
        >
          Open Third
        </button>
        <button
          onClick={() => setActiveIndex(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
            activeIndex === null
              ? "bg-aer-primary text-aer-primary-foreground border-aer-primary"
              : "bg-aer-background hover:bg-aer-muted"
          }`}
        >
          Close All
        </button>
      </div>

      <Accordion
        activeIndex={activeIndex}
        onTabChange={(index) => setActiveIndex(index as number | null)}
      >
        <Accordion.Tab header="Section 1">
          <p>Controlled content 1</p>
        </Accordion.Tab>
        <Accordion.Tab header="Section 2">
          <p>Controlled content 2</p>
        </Accordion.Tab>
        <Accordion.Tab header="Section 3">
          <p>Controlled content 3</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}

// Multiple Mode Example
function MultipleExample() {
  const accordionRef = useRef<any>(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => accordionRef.current?.expandAll()}
          className="px-3 py-1.5 text-xs font-medium rounded-md border transition-all bg-aer-background hover:bg-aer-muted"
        >
          Expand All
        </button>
        <button
          onClick={() => accordionRef.current?.collapseAll()}
          className="px-3 py-1.5 text-xs font-medium rounded-md border transition-all bg-aer-background hover:bg-aer-muted"
        >
          Collapse All
        </button>
      </div>

      <Accordion ref={accordionRef} multiple defaultActiveIndex={[0, 1]}>
        <Accordion.Tab header="Feature 1">
          <p>Multiple tabs can be open at once</p>
        </Accordion.Tab>
        <Accordion.Tab header="Feature 2">
          <p>Use expandAll() and collapseAll() methods</p>
        </Accordion.Tab>
        <Accordion.Tab header="Feature 3">
          <p>Perfect for FAQ sections</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}

export function AccordionDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A production-grade accordion component for progressive disclosure of content."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Accordion component allows users to expand and collapse content
            sections, perfect for FAQs, settings panels, and progressive
            disclosure patterns. It's fully accessible, keyboard-navigable, and
            supports both controlled and uncontrolled modes.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Single & Multiple Modes</strong>: Control how many tabs
              can be open simultaneously
            </li>
            <li>
              <strong>Controlled & Uncontrolled</strong>: Full state management
              flexibility
            </li>
            <li>
              <strong>Keyboard Navigation</strong>: Arrow keys, Home, End,
              Enter, Space
            </li>
            <li>
              <strong>Lazy Rendering</strong>: Mount content only when first
              expanded
            </li>
            <li>
              <strong>Headless Support</strong>: Complete custom markup control
            </li>
            <li>
              <strong>Ref API</strong>: Imperative methods for programmatic
              control
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right accordion configuration for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Single Mode (Default)
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use when only one section should be visible at a time:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Navigation menus</li>
              <li>Wizard steps</li>
              <li>Mobile-first layouts</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Multiple Mode
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use when users need to compare or view multiple sections:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>FAQ pages</li>
              <li>Settings panels</li>
              <li>Documentation sections</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="Simple uncontrolled accordion with default settings."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Accordion defaultActiveIndex={0}>
            <Accordion.Tab header="What is Aer Design?">
              <p>
                Aer Design is a weightless, high-performance React component
                library built with React 19, Tailwind CSS 4, and Radix UI.
              </p>
            </Accordion.Tab>
            <Accordion.Tab header="How do I install it?">
              <p>
                Install via npm: <code>npm install aer-design</code>
              </p>
            </Accordion.Tab>
            <Accordion.Tab header="Is it accessible?">
              <p>
                Yes! All components follow WAI-ARIA guidelines and support full
                keyboard navigation.
              </p>
            </Accordion.Tab>
          </Accordion>
        </div>
        <CodeBlock
          ts={`<Accordion defaultActiveIndex={0}>
  <Accordion.Tab header="What is Aer Design?">
    <p>Aer Design is a weightless...</p>
  </Accordion.Tab>
  <Accordion.Tab header="How do I install it?">
    <p>Install via npm...</p>
  </Accordion.Tab>
  <Accordion.Tab header="Is it accessible?">
    <p>Yes! All components follow...</p>
  </Accordion.Tab>
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function BasicAccordion() {
  return (
    <Accordion defaultActiveIndex={0}>
      <Accordion.Tab header="What is Aer Design?">
        <p>
          Aer Design is a weightless, high-performance React component
          library built with React 19, Tailwind CSS 4, and Radix UI.
        </p>
      </Accordion.Tab>
      <Accordion.Tab header="How do I install it?">
        <p>
          Install via npm: <code>npm install aer-design</code>
        </p>
      </Accordion.Tab>
      <Accordion.Tab header="Is it accessible?">
        <p>
          Yes! All components follow WAI-ARIA guidelines and support full
          keyboard navigation.
        </p>
      </Accordion.Tab>
    </Accordion>
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
          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Default Variant</h4>
            <Accordion defaultActiveIndex={0}>
              <Accordion.Tab header="Section 1">
                <p>Clean and minimal design</p>
              </Accordion.Tab>
              <Accordion.Tab header="Section 2">
                <p>Perfect for most use cases</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Bordered Variant</h4>
            <Accordion variant="bordered" defaultActiveIndex={0}>
              <Accordion.Tab header="Section 1">
                <p>Contained within a border</p>
              </Accordion.Tab>
              <Accordion.Tab header="Section 2">
                <p>Great for cards and panels</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Filled Variant</h4>
            <Accordion variant="filled" defaultActiveIndex={0}>
              <Accordion.Tab header="Section 1">
                <p>Subtle background fill</p>
              </Accordion.Tab>
              <Accordion.Tab header="Section 2">
                <p>Adds visual hierarchy</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Ghost Variant</h4>
            <Accordion variant="ghost" defaultActiveIndex={0}>
              <Accordion.Tab header="Section 1">
                <p>Minimal visual weight</p>
              </Accordion.Tab>
              <Accordion.Tab header="Section 2">
                <p>Perfect for dense layouts</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`// Default
<Accordion variant="default">...</Accordion>

// Bordered
<Accordion variant="bordered">...</Accordion>

// Filled
<Accordion variant="filled">...</Accordion>

// Ghost
<Accordion variant="ghost">...</Accordion>

// Aer (see dedicated section below)
<Accordion variant="aer">...</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function AccordionVariants() {
  return (
    <div className="space-y-8">
      <Accordion variant="default">
        <Accordion.Tab header="Default">
          <p>Clean and minimal</p>
        </Accordion.Tab>
      </Accordion>

      <Accordion variant="bordered">
        <Accordion.Tab header="Bordered">
          <p>Contained within a border</p>
        </Accordion.Tab>
      </Accordion>

      <Accordion variant="filled">
        <Accordion.Tab header="Filled">
          <p>Subtle background</p>
        </Accordion.Tab>
      </Accordion>

      <Accordion variant="ghost">
        <Accordion.Tab header="Ghost">
          <p>Minimal weight</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="single-multiple"
        title="Single vs Multiple Mode"
        description="Control how many tabs can be open simultaneously."
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Single Mode (Default)</h4>
            <Accordion defaultActiveIndex={0}>
              <Accordion.Tab header="Tab 1">
                <p>Only one tab open at a time</p>
              </Accordion.Tab>
              <Accordion.Tab header="Tab 2">
                <p>Opening this closes the previous</p>
              </Accordion.Tab>
              <Accordion.Tab header="Tab 3">
                <p>Perfect for navigation</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Multiple Mode</h4>
            <Accordion multiple defaultActiveIndex={[0, 1]}>
              <Accordion.Tab header="Tab 1">
                <p>Multiple tabs can be open</p>
              </Accordion.Tab>
              <Accordion.Tab header="Tab 2">
                <p>Great for FAQs</p>
              </Accordion.Tab>
              <Accordion.Tab header="Tab 3">
                <p>Users can compare content</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`// Single mode (default)
<Accordion defaultActiveIndex={0}>...</Accordion>

// Multiple mode
<Accordion multiple defaultActiveIndex={[0, 1]}>...</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function SingleVsMultiple() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Single Mode */}
      <Accordion defaultActiveIndex={0}>
        <Accordion.Tab header="Tab 1">
          <p>Only one tab open at a time</p>
        </Accordion.Tab>
        <Accordion.Tab header="Tab 2">
          <p>Opening this closes the previous</p>
        </Accordion.Tab>
      </Accordion>

      {/* Multiple Mode */}
      <Accordion multiple defaultActiveIndex={[0, 1]}>
        <Accordion.Tab header="Tab 1">
          <p>Multiple tabs can be open</p>
        </Accordion.Tab>
        <Accordion.Tab header="Tab 2">
          <p>Great for FAQs</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="sizes"
        title="Size Variants"
        description="Choose from compact, default, or spacious sizes."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold text-sm">Small (sm)</h4>
            <Accordion size="sm" defaultActiveIndex={0}>
              <Accordion.Tab header="Compact Header">
                <p className="text-sm">Compact spacing for dense layouts</p>
              </Accordion.Tab>
              <Accordion.Tab header="Another Tab">
                <p className="text-sm">Perfect for sidebars</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Medium (md) - Default</h4>
            <Accordion size="md" defaultActiveIndex={0}>
              <Accordion.Tab header="Default Header">
                <p>Balanced spacing for most use cases</p>
              </Accordion.Tab>
              <Accordion.Tab header="Another Tab">
                <p>Comfortable and readable</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold text-lg">Large (lg)</h4>
            <Accordion size="lg" defaultActiveIndex={0}>
              <Accordion.Tab header="Spacious Header">
                <p className="text-lg">Extra padding for emphasis</p>
              </Accordion.Tab>
              <Accordion.Tab header="Another Tab">
                <p className="text-lg">Great for touch interfaces</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`// Small - Compact
<Accordion size="sm">...</Accordion>

// Medium - Default
<Accordion size="md">...</Accordion>

// Large - Spacious
<Accordion size="lg">...</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function AccordionSizes() {
  return (
    <div className="space-y-4">
      <Accordion size="sm" defaultActiveIndex={0}>
        <Accordion.Tab header="Compact">
          <p>Small size for dense layouts</p>
        </Accordion.Tab>
      </Accordion>

      <Accordion size="md" defaultActiveIndex={0}>
        <Accordion.Tab header="Default">
          <p>Medium size (default)</p>
        </Accordion.Tab>
      </Accordion>

      <Accordion size="lg" defaultActiveIndex={0}>
        <Accordion.Tab header="Spacious">
          <p>Large size for emphasis</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="controlled"
        title="Controlled Mode"
        description="Full control over accordion state with external buttons."
      >
        <ControlledExample />
        <CodeBlock
          ts={`const [activeIndex, setActiveIndex] = useState<number | null>(0);

<Accordion 
  activeIndex={activeIndex} 
  onTabChange={(index) => setActiveIndex(index as number | null)}
>
  <Accordion.Tab header="Section 1">...</Accordion.Tab>
  <Accordion.Tab header="Section 2">...</Accordion.Tab>
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";
import { useState } from "react";

export default function ControlledAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setActiveIndex(0)}>Open First</button>
        <button onClick={() => setActiveIndex(1)}>Open Second</button>
        <button onClick={() => setActiveIndex(null)}>Close All</button>
      </div>

      <Accordion
        activeIndex={activeIndex}
        onTabChange={(index) => setActiveIndex(index as number | null)}
      >
        <Accordion.Tab header="Section 1">
          <p>Controlled content 1</p>
        </Accordion.Tab>
        <Accordion.Tab header="Section 2">
          <p>Controlled content 2</p>
        </Accordion.Tab>
        <Accordion.Tab header="Section 3">
          <p>Controlled content 3</p>
        </Accordion.Tab>
      </Accordion>
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
          ts={`<Accordion variant="aer" defaultActiveIndex={0}>
  <Accordion.Tab header="Premium Design" icon={<Shield />}>
    <p>Glassmorphism effect with backdrop blur</p>
  </Accordion.Tab>
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";
import { Shield, Settings, User } from "lucide-react";

export default function AerAccordion() {
  return (
    <div className="relative p-12 bg-zinc-950 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-blue-600/20" />
      
      <div className="relative z-10 max-w-md mx-auto">
        <Accordion variant="aer" defaultActiveIndex={0}>
          <Accordion.Tab
            header="Premium Design"
            icon={<Shield className="h-4 w-4" />}
          >
            <p className="text-white/80">
              Experience the glassmorphism effect with backdrop blur.
            </p>
          </Accordion.Tab>
          <Accordion.Tab
            header="Advanced Features"
            icon={<Settings className="h-4 w-4" />}
          >
            <p className="text-white/80">
              Full keyboard navigation and accessibility.
            </p>
          </Accordion.Tab>
        </Accordion>
      </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for Accordion works best
            on dark or colorful backgrounds where the glassmorphism effect can
            shine. Use it for premium features, settings panels, or any content
            that deserves elevated visual treatment. The backdrop-blur creates
            depth while maintaining readability.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="disabled"
        title="Disabled State"
        description="Disable the entire accordion or individual tabs."
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Individual Tab Disabled</h4>
            <Accordion defaultActiveIndex={0}>
              <Accordion.Tab header="Active Tab">
                <p>This tab is interactive</p>
              </Accordion.Tab>
              <Accordion.Tab header="Disabled Tab" disabled>
                <p>This content cannot be accessed</p>
              </Accordion.Tab>
              <Accordion.Tab header="Another Active Tab">
                <p>This tab is also interactive</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Entire Accordion Disabled</h4>
            <Accordion disabled defaultActiveIndex={0}>
              <Accordion.Tab header="Tab 1">
                <p>All tabs are disabled</p>
              </Accordion.Tab>
              <Accordion.Tab header="Tab 2">
                <p>Cannot be interacted with</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`// Individual tab disabled
<Accordion.Tab header="Disabled" disabled>...</Accordion.Tab>

// Entire accordion disabled
<Accordion disabled>...</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function DisabledAccordion() {
  return (
    <div className="space-y-8">
      {/* Individual Tab Disabled */}
      <Accordion defaultActiveIndex={0}>
        <Accordion.Tab header="Active Tab">
          <p>This tab is interactive</p>
        </Accordion.Tab>
        <Accordion.Tab header="Disabled Tab" disabled>
          <p>This content cannot be accessed</p>
        </Accordion.Tab>
      </Accordion>

      {/* Entire Accordion Disabled */}
      <Accordion disabled>
        <Accordion.Tab header="Tab 1">
          <p>All tabs are disabled</p>
        </Accordion.Tab>
        <Accordion.Tab header="Tab 2">
          <p>Cannot be interacted with</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="icons"
        title="Custom Icons"
        description="Customize expand/collapse icons and their positioning."
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Icon at Start</h4>
            <Accordion iconPosition="start" defaultActiveIndex={0}>
              <Accordion.Tab
                header="Documents"
                icon={<FileText className="h-4 w-4" />}
              >
                <p>Icon positioned at the start</p>
              </Accordion.Tab>
              <Accordion.Tab
                header="Settings"
                icon={<Settings className="h-4 w-4" />}
              >
                <p>Custom icons for each tab</p>
              </Accordion.Tab>
            </Accordion>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-background">
            <h4 className="mb-4 font-semibold">Custom Expand Icon</h4>
            <Accordion
              expandIcon={<ChevronRight className="h-4 w-4" />}
              defaultActiveIndex={0}
            >
              <Accordion.Tab header="Section 1">
                <p>Using ChevronRight instead of ChevronDown</p>
              </Accordion.Tab>
              <Accordion.Tab header="Section 2">
                <p>Rotates 90° when expanded</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`// Icon at start
<Accordion iconPosition="start">
  <Accordion.Tab header="Documents" icon={<FileText />}>...</Accordion.Tab>
</Accordion>

// Custom expand icon
<Accordion expandIcon={<ChevronRight />}>...</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";
import { FileText, Settings, ChevronRight } from "lucide-react";

export default function IconAccordion() {
  return (
    <div className="space-y-8">
      {/* Icon at Start */}
      <Accordion iconPosition="start" defaultActiveIndex={0}>
        <Accordion.Tab header="Documents" icon={<FileText className="h-4 w-4" />}>
          <p>Icon positioned at the start</p>
        </Accordion.Tab>
        <Accordion.Tab header="Settings" icon={<Settings className="h-4 w-4" />}>
          <p>Custom icons for each tab</p>
        </Accordion.Tab>
      </Accordion>

      {/* Custom Expand Icon */}
      <Accordion
        expandIcon={<ChevronRight className="h-4 w-4" />}
        defaultActiveIndex={0}
      >
        <Accordion.Tab header="Section 1">
          <p>Using ChevronRight instead of ChevronDown</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="lazy-loading"
        title="Lazy Rendering & API Data"
        description="Load content only when first expanded, perfect for API calls."
      >
        <LazyLoadingExample />
        <CodeBlock
          ts={`<Accordion 
  onExpand={(index) => fetchPost(index + 1)} 
  lazy
>
  <Accordion.Tab header={posts[0]?.title || "Click to load"}>
    {posts[0] ? <PostContent post={posts[0]} /> : <Loader />}
  </Accordion.Tab>
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";
import { useState } from "react";

export default function LazyAccordion() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());

  const fetchPost = async (id: number) => {
    if (loadedIndices.has(id)) return;

    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`
    );
    const data = await response.json();
    setPosts((prev) => {
      const newPosts = [...prev];
      newPosts[id - 1] = data;
      return newPosts;
    });
    setLoadedIndices((prev) => new Set(prev).add(id));
  };

  return (
    <Accordion
      variant="bordered"
      onExpand={(index) => fetchPost(index + 1)}
      lazy
    >
      {[1, 2, 3, 4, 5].map((id, index) => (
        <Accordion.Tab
          key={id}
          header={posts[index]?.title || \`Post \${id} (Click to load)\`}
        >
          {posts[index] ? (
            <div>
              <p className="font-medium">{posts[index].title}</p>
              <p className="text-sm text-muted">{posts[index].body}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Accordion.Tab>
      ))}
    </Accordion>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="ref-api"
        title="Ref API & Programmatic Control"
        description="Use ref methods to control the accordion programmatically."
      >
        <MultipleExample />
        <CodeBlock
          ts={`const accordionRef = useRef<AccordionRefAPI>(null);

// Expand all tabs
accordionRef.current?.expandAll();

// Collapse all tabs
accordionRef.current?.collapseAll();

// Toggle specific tab
accordionRef.current?.toggle(0);`}
          fullCode={`import { Accordion, type AccordionRefAPI } from "aer-design";
import { useRef } from "react";

export default function RefAPIExample() {
  const accordionRef = useRef<AccordionRefAPI>(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => accordionRef.current?.expandAll()}>
          Expand All
        </button>
        <button onClick={() => accordionRef.current?.collapseAll()}>
          Collapse All
        </button>
        <button onClick={() => accordionRef.current?.toggle(0)}>
          Toggle First
        </button>
      </div>

      <Accordion ref={accordionRef} multiple>
        <Accordion.Tab header="Feature 1">
          <p>Content 1</p>
        </Accordion.Tab>
        <Accordion.Tab header="Feature 2">
          <p>Content 2</p>
        </Accordion.Tab>
        <Accordion.Tab header="Feature 3">
          <p>Content 3</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="keyboard"
        title="Keyboard Navigation"
        description="Full keyboard accessibility following WAI-ARIA guidelines."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <h4 className="font-bold text-center mb-6">Keyboard Shortcuts</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  Tab
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Focus next element
                </span>
              </div>
            </div>
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  Shift + Tab
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Focus previous element
                </span>
              </div>
            </div>
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  Enter / Space
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Toggle active tab
                </span>
              </div>
            </div>
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  ↓ / ↑
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Navigate headers
                </span>
              </div>
            </div>
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  Home
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Focus first header
                </span>
              </div>
            </div>
            <div className="p-4 bg-aer-background border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-aer-muted px-2 py-1 rounded">
                  End
                </span>
                <span className="text-sm text-aer-muted-foreground">
                  Focus last header
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border border-aer-border rounded-lg bg-aer-background mt-6">
          <h4 className="mb-4 font-semibold">Try it yourself:</h4>
          <Accordion defaultActiveIndex={0}>
            <Accordion.Tab header="First Tab">
              <p>Use arrow keys to navigate between headers</p>
            </Accordion.Tab>
            <Accordion.Tab header="Second Tab">
              <p>Press Enter or Space to toggle</p>
            </Accordion.Tab>
            <Accordion.Tab header="Third Tab">
              <p>Press Home/End to jump to first/last</p>
            </Accordion.Tab>
          </Accordion>
        </div>
      </DocSection>

      <DocSection
        id="headless"
        title="Headless Mode"
        description="Complete control over markup and styling with headless mode."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Accordion headless defaultActiveIndex={0}>
            <Accordion.Tab
              header="Custom Markup"
              headerTemplate={({ isActive, toggle }) => (
                <button
                  onClick={toggle}
                  className="w-full flex items-center justify-between p-4 bg-linear-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
                >
                  <span className="font-bold">
                    {isActive ? "🔽" : "▶️"} Custom Header
                  </span>
                </button>
              )}
              contentTemplate={() => (
                <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-b-lg">
                  <p className="text-teal-900 dark:text-teal-100">
                    Complete control over your markup and styling!
                  </p>
                </div>
              )}
            />
            <Accordion.Tab
              header="Another Custom Tab"
              headerTemplate={({ isActive, toggle }) => (
                <button
                  onClick={toggle}
                  className="w-full flex items-center justify-between p-4 mt-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all"
                >
                  <span className="font-bold">
                    {isActive ? "🔽" : "▶️"} Another Tab
                  </span>
                </button>
              )}
              contentTemplate={() => (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-b-lg">
                  <p className="text-indigo-900 dark:text-indigo-100">
                    Build any UI you can imagine!
                  </p>
                </div>
              )}
            />
          </Accordion>
        </div>
        <CodeBlock
          ts={`<Accordion headless>
  <Accordion.Tab
    headerTemplate={({ isActive, toggle }) => (
      <button onClick={toggle}>
        {isActive ? "🔽" : "▶️"} Custom Header
      </button>
    )}
    contentTemplate={() => (
      <div>Your custom content</div>
    )}
  />
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function HeadlessAccordion() {
  return (
    <Accordion headless defaultActiveIndex={0}>
      <Accordion.Tab
        header="Custom Markup"
        headerTemplate={({ isActive, toggle }) => (
          <button
            onClick={toggle}
            className="w-full p-4 bg-linear-to-r from-teal-500 to-emerald-500 text-white rounded-lg"
          >
            <span>{isActive ? "🔽" : "▶️"} Custom Header</span>
          </button>
        )}
        contentTemplate={() => (
          <div className="p-4 bg-teal-50 rounded-b-lg">
            <p>Complete control over your markup!</p>
          </div>
        )}
      />
    </Accordion>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="granular-styling"
        title="Granular Styling"
        description="Fine-grained control over every element's appearance."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <Accordion
            classNames={{
              root: "border-2 border-aer-primary rounded-lg overflow-hidden",
              tab: "border-aer-primary/20",
              header: "bg-aer-primary/5 hover:bg-aer-primary/10",
              content: "bg-aer-primary/5",
              icon: "text-aer-primary",
            }}
            defaultActiveIndex={0}
          >
            <Accordion.Tab header="Custom Styled Tab">
              <p>Every element can be styled independently</p>
            </Accordion.Tab>
            <Accordion.Tab header="Another Tab">
              <p>Using the classNames prop</p>
            </Accordion.Tab>
          </Accordion>
        </div>
        <CodeBlock
          ts={`<Accordion
  classNames={{
    root: "border-2 border-primary rounded-lg",
    tab: "border-primary/20",
    header: "bg-primary/5 hover:bg-primary/10",
    content: "bg-primary/5",
    icon: "text-primary",
  }}
>
  <Accordion.Tab header="Custom Styled">...</Accordion.Tab>
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";

export default function StyledAccordion() {
  return (
    <Accordion
      classNames={{
        root: "border-2 border-aer-primary rounded-lg overflow-hidden",
        tab: "border-aer-primary/20",
        header: "bg-aer-primary/5 hover:bg-aer-primary/10",
        content: "bg-aer-primary/5",
        icon: "text-aer-primary",
      }}
      defaultActiveIndex={0}
    >
      <Accordion.Tab header="Custom Styled Tab">
        <p>Every element can be styled independently</p>
      </Accordion.Tab>
      <Accordion.Tab header="Another Tab">
        <p>Using the classNames prop</p>
      </Accordion.Tab>
    </Accordion>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A complete FAQ section with all features combined."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <h3 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h3>
          <Accordion variant="bordered" multiple>
            <Accordion.Tab
              header="What payment methods do you accept?"
              icon={<HelpCircle className="h-4 w-4" />}
            >
              <div className="space-y-2">
                <p>
                  We accept all major credit cards, PayPal, and bank transfers.
                </p>
                <ul className="list-disc pl-5 text-sm text-aer-muted-foreground">
                  <li>Visa, Mastercard, American Express</li>
                  <li>PayPal and PayPal Credit</li>
                  <li>ACH bank transfers (US only)</li>
                </ul>
              </div>
            </Accordion.Tab>
            <Accordion.Tab
              header="How do I cancel my subscription?"
              icon={<HelpCircle className="h-4 w-4" />}
            >
              <p>
                You can cancel your subscription at any time from your account
                settings. Go to Settings → Billing → Cancel Subscription. Your
                access will continue until the end of your billing period.
              </p>
            </Accordion.Tab>
            <Accordion.Tab
              header="Do you offer refunds?"
              icon={<HelpCircle className="h-4 w-4" />}
            >
              <p>
                Yes, we offer a 30-day money-back guarantee. If you're not
                satisfied with our service, contact support within 30 days of
                your purchase for a full refund.
              </p>
            </Accordion.Tab>
            <Accordion.Tab
              header="Is my data secure?"
              icon={<Shield className="h-4 w-4" />}
            >
              <div className="space-y-2">
                <p>
                  We take security seriously. All data is encrypted in transit
                  and at rest.
                </p>
                <ul className="list-disc pl-5 text-sm text-aer-muted-foreground">
                  <li>256-bit SSL encryption</li>
                  <li>SOC 2 Type II certified</li>
                  <li>GDPR compliant</li>
                  <li>Regular security audits</li>
                </ul>
              </div>
            </Accordion.Tab>
          </Accordion>
        </div>
        <CodeBlock
          ts={`<Accordion variant="bordered" multiple>
  <Accordion.Tab header="Question 1" icon={<HelpCircle />}>
    <p>Answer with detailed information...</p>
  </Accordion.Tab>
  {/* More FAQs... */}
</Accordion>`}
          fullCode={`import { Accordion } from "aer-design";
import { HelpCircle, Shield } from "lucide-react";

export default function FAQSection() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h3 className="text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h3>
      
      <Accordion variant="bordered" multiple>
        <Accordion.Tab
          header="What payment methods do you accept?"
          icon={<HelpCircle className="h-4 w-4" />}
        >
          <div className="space-y-2">
            <p>We accept all major credit cards, PayPal, and bank transfers.</p>
            <ul className="list-disc pl-5 text-sm">
              <li>Visa, Mastercard, American Express</li>
              <li>PayPal and PayPal Credit</li>
              <li>ACH bank transfers (US only)</li>
            </ul>
          </div>
        </Accordion.Tab>

        <Accordion.Tab
          header="How do I cancel my subscription?"
          icon={<HelpCircle className="h-4 w-4" />}
        >
          <p>
            You can cancel your subscription at any time from your account
            settings. Go to Settings → Billing → Cancel Subscription.
          </p>
        </Accordion.Tab>

        <Accordion.Tab
          header="Is my data secure?"
          icon={<Shield className="h-4 w-4" />}
        >
          <div className="space-y-2">
            <p>We take security seriously. All data is encrypted.</p>
            <ul className="list-disc pl-5 text-sm">
              <li>256-bit SSL encryption</li>
              <li>SOC 2 Type II certified</li>
              <li>GDPR compliant</li>
            </ul>
          </div>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <DocSection
        id="accordion-props"
        title="Accordion Props"
        description="Main container component props."
      >
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"default" | "aer" | "bordered" | "filled" | "ghost"',
              default: '"default"',
              description: "Visual style variant",
            },
            {
              prop: "multiple",
              type: "boolean",
              default: "false",
              description:
                "Allow multiple tabs to be open simultaneously. Changes activeIndex type to number[]",
            },
            {
              prop: "defaultActiveIndex",
              type: "number | number[] | null",
              default: "null",
              description:
                "Default active index (uncontrolled). Use number for single mode, number[] for multiple mode",
            },
            {
              prop: "activeIndex",
              type: "number | number[] | null",
              default: "undefined",
              description:
                "Controlled active index. Use number for single mode, number[] for multiple mode",
            },
            {
              prop: "onTabChange",
              type: "(activeIndex: number | number[] | null) => void",
              default: "undefined",
              description: "Callback when active tab changes",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable all tabs",
            },
            {
              prop: "collapsible",
              type: "boolean",
              default: "true",
              description: "Allow closing the last open tab in single mode",
            },
            {
              prop: "items",
              type: "AccordionItem[]",
              default: "undefined",
              description: "Array of items for data-driven rendering",
            },
            {
              prop: "headless",
              type: "boolean",
              default: "false",
              description: "Remove all default styling",
            },
            {
              prop: "iconPosition",
              type: '"start" | "end"',
              default: '"end"',
              description: "Position of expand/collapse icon",
            },
            {
              prop: "expandOn",
              type: '"header" | "icon" | "button" | "manual"',
              default: '"header"',
              description: "What triggers tab expansion",
            },
            {
              prop: "expandIcon",
              type: "ReactNode",
              default: "<ChevronDown />",
              description: "Custom icon when tab is collapsed",
            },
            {
              prop: "collapseIcon",
              type: "ReactNode",
              default: "undefined",
              description:
                "Custom icon when tab is expanded (defaults to expandIcon)",
            },
            {
              prop: "lazy",
              type: "boolean",
              default: "false",
              description: "Only mount content when first expanded",
            },
            {
              prop: "unmountOnCollapse",
              type: "boolean",
              default: "false",
              description: "Unmount content when tab collapses",
            },
            {
              prop: "onExpand",
              type: "(index: number) => void",
              default: "undefined",
              description: "Callback when a tab expands",
            },
            {
              prop: "onCollapse",
              type: "(index: number) => void",
              default: "undefined",
              description: "Callback when a tab collapses",
            },
            {
              prop: "classNames",
              type: "{ root?, tab?, header?, content?, icon? }",
              default: "undefined",
              description: "Granular className overrides",
            },
            {
              prop: "styles",
              type: "{ root?, tab?, header?, content?, icon? }",
              default: "undefined",
              description: "Granular inline style overrides",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="accordion-tab-props"
        title="Accordion.Tab Props"
        description="Individual tab component props."
      >
        <ApiTable
          data={[
            {
              prop: "header",
              type: "ReactNode",
              default: "undefined",
              description: "Header content",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable this specific tab",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "undefined",
              description: "Custom icon for this tab",
            },
            {
              prop: "headerTemplate",
              type: "(props: TemplateProps) => ReactNode",
              default: "undefined",
              description: "Custom header render function",
            },
            {
              prop: "contentTemplate",
              type: "(props: TemplateProps) => ReactNode",
              default: "undefined",
              description: "Custom content render function",
            },
            {
              prop: "iconTemplate",
              type: "(props: TemplateProps) => ReactNode",
              default: "undefined",
              description: "Custom icon render function",
            },
            {
              prop: "headerClassName",
              type: "string",
              default: "undefined",
              description: "Custom className for header",
            },
            {
              prop: "contentClassName",
              type: "string",
              default: "undefined",
              description: "Custom className for content",
            },
            {
              prop: "iconClassName",
              type: "string",
              default: "undefined",
              description: "Custom className for icon",
            },
            {
              prop: "lazy",
              type: "boolean",
              default: "undefined",
              description: "Override parent lazy prop for this tab",
            },
            {
              prop: "unmountOnCollapse",
              type: "boolean",
              default: "undefined",
              description: "Override parent unmountOnCollapse for this tab",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="ref-api-methods"
        title="Ref API Methods"
        description="Imperative methods available via ref."
      >
        <ApiTable
          data={[
            {
              prop: "expand(index)",
              type: "(index: number) => void",
              default: "-",
              description: "Expand a specific tab by index",
            },
            {
              prop: "collapse(index)",
              type: "(index: number) => void",
              default: "-",
              description: "Collapse a specific tab by index",
            },
            {
              prop: "toggle(index)",
              type: "(index: number) => void",
              default: "-",
              description: "Toggle a specific tab by index",
            },
            {
              prop: "expandAll()",
              type: "() => void",
              default: "-",
              description: "Expand all tabs (only works in multiple mode)",
            },
            {
              prop: "collapseAll()",
              type: "() => void",
              default: "-",
              description: "Collapse all tabs",
            },
            {
              prop: "getActiveIndices()",
              type: "() => number | number[] | null",
              default: "-",
              description: "Get currently active indices",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="variant-guide"
        title="Variant Usage Guide"
        description="When to use each variant."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-aer-foreground" />
              Default
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Clean and minimal. Best for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>General purpose use</li>
              <li>Content-heavy pages</li>
              <li>When you want subtle separation</li>
            </ul>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-linear-to-r from-violet-500 to-blue-500" />
              Aer
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Premium glassmorphism. Best for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Hero sections</li>
              <li>Premium features</li>
              <li>Dark/colorful backgrounds</li>
            </ul>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full border-2 border-aer-foreground" />
              Bordered
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Contained within a border. Best for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Cards and panels</li>
              <li>Settings sections</li>
              <li>When you need clear boundaries</li>
            </ul>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-aer-muted" />
              Filled
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Subtle background fill. Best for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Visual hierarchy</li>
              <li>Alternating sections</li>
              <li>When you need subtle emphasis</li>
            </ul>
          </div>

          <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full border border-dashed border-aer-foreground" />
              Ghost
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Minimal visual weight. Best for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Dense layouts</li>
              <li>Sidebar navigation</li>
              <li>When space is limited</li>
            </ul>
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
        description="Customize the accordion using CSS variables."
      >
        <div className="space-y-4">
          <p className="text-sm text-aer-muted-foreground">
            Accordion uses the following CSS tokens from your theme:
          </p>
          <CodeBlock
            ts={`/* Core Tokens */
--color-aer-border          /* Border color */
--color-aer-muted           /* Background for default/filled variants */
--color-aer-surface         /* Background for aer variant */
--color-aer-ring            /* Focus ring color */
--color-aer-background      /* Content background color */
--color-aer-foreground      /* General text color */

/* Animations */
--animate-accordion-down    /* Expand animation */
--animate-accordion-up      /* Collapse animation */`}
          />
        </div>
      </DocSection>

      <DocSection
        id="custom-theme"
        title="Custom Theme Example"
        description="Global theme overrides or scoped component variables."
      >
        <div className="p-8 border border-aer-border rounded-lg bg-aer-background">
          <style>{`
            .custom-accordion-purple {
              --color-aer-border: hsl(280 80% 80%);
              --color-aer-muted: hsl(280 80% 96%);
              --color-aer-background: hsl(280 80% 99%);
              --color-aer-ring: hsl(280 80% 60%);
            }
          `}</style>
          <div className="custom-accordion-purple">
            <Accordion variant="bordered" defaultActiveIndex={0}>
              <Accordion.Tab header="Custom Theme (Purple)">
                <p>
                  This accordion uses scoped CSS variables for a purple theme.
                </p>
              </Accordion.Tab>
              <Accordion.Tab header="Accent Colors">
                <p>Notice the purple borders, backgrounds, and focus rings.</p>
              </Accordion.Tab>
            </Accordion>
          </div>
        </div>
        <CodeBlock
          ts={`.custom-accordion-purple {
  --color-aer-border: hsl(280 80% 80%);
  --color-aer-muted: hsl(280 80% 96%);
  --color-aer-background: hsl(280 80% 99%);
  --color-aer-ring: hsl(280 80% 60%);
}

<div className="custom-accordion-purple">
  <Accordion variant="bordered">...</Accordion>
</div>`}
          fullCode={`import { Accordion } from "aer-design";

export default function CustomThemeAccordion() {
  return (
    <div className="custom-accordion-purple p-4 border rounded-lg">
      <style>{\`
        .custom-accordion-purple {
          --color-aer-border: hsl(280 80% 80%);
          --color-aer-muted: hsl(280 80% 96%);
          --color-aer-background: hsl(280 80% 99%);
          --color-aer-ring: hsl(280 80% 60%);
        }
      \`}</style>
      <Accordion variant="bordered" defaultActiveIndex={0}>
        <Accordion.Tab header="Custom Theme (Purple)">
          <p>This accordion uses scoped CSS variables for a purple theme.</p>
        </Accordion.Tab>
        <Accordion.Tab header="Accent Colors">
          <p>Notice the purple borders, backgrounds, and focus rings.</p>
        </Accordion.Tab>
      </Accordion>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Accordion</h1>
        <p className="text-lg text-aer-muted-foreground">
          Collapsible content panels for progressive disclosure with full
          accessibility and keyboard navigation.
        </p>
      </div>

      <DocTabs
        tabs={[
          { id: "overview", label: "Overview", content: overview },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "accordion-props", title: "Accordion Props" },
              { id: "accordion-tab-props", title: "Accordion.Tab Props" },
              { id: "ref-api-methods", title: "Ref API Methods" },
              { id: "variant-guide", title: "Variant Usage Guide" },
            ],
          },
          {
            id: "theming",
            label: "Theming",
            content: theming,
            toc: [
              { id: "css-variables", title: "CSS Variables" },
              { id: "custom-theme", title: "Custom Theme Example" },
            ],
          },
        ]}
      />
    </div>
  );
}
