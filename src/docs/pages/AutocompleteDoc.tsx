import type { AutocompleteOption } from "@/components/Autocomplete";
import { Autocomplete } from "@/components/Autocomplete";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

const basicOptions: AutocompleteOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  {
    label:
      "Svelte - A very long framework description to test text wrapping behavior in the dropdown menu",
    value: "svelte",
  },
  { label: "Solid", value: "solid" },
];

export function AutocompleteDoc() {
  // Local filtering example
  function LocalFilterExample() {
    const [value, setValue] = React.useState<string | number>();

    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            options={basicOptions}
            value={value}
            onChange={(val) => setValue(val as string | number)}
            placeholder="Type to search..."
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  options={options}\n  value={value}\n  onChange={setValue}\n  placeholder="Type to search..."\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\nimport { useState } from "react";\n\nconst options = [\n  { label: "React", value: "react" },\n  { label: "Vue", value: "vue" },\n  { label: "Angular", value: "angular" },\n];\n\nexport default function Example() {\n  const [value, setValue] = useState();\n  \n  return (\n    <Autocomplete\n      options={options}\n      value={value}\n      onChange={setValue}\n      placeholder="Type to search..."\n    />\n  );\n}`}
        />
      </div>
    );
  }

  // Multiple selection example
  function MultipleSelectionExample() {
    const [values, setValues] = React.useState<(string | number)[]>([]);

    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            mode="multiple"
            options={basicOptions}
            value={values}
            onChange={(val) => setValues(val as (string | number)[])}
            placeholder="Select multiple..."
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  mode="multiple"\n  options={options}\n  value={values}\n  onChange={setValues}\n  placeholder="Select multiple..."\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\nimport { useState } from "react";\n\nexport default function Example() {\n  const [values, setValues] = useState([]);\n  \n  return (\n    <Autocomplete\n      mode="multiple"\n      options={options}\n      value={values}\n      onChange={setValues}\n      placeholder="Select multiple..."\n    />\n  );\n}`}
        />
      </div>
    );
  }

  // Remote search simulation
  function RemoteSearchExample() {
    const [value, setValue] = React.useState<string | number>();
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<AutocompleteOption[]>([]);

    const handleSearch = (query: string) => {
      if (!query) {
        setOptions([]);
        return;
      }

      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`)
        .then((res) => res.json())
        .then((users) => {
          const newOptions = users.map((user: any) => ({
            label: user.name,
            value: String(user.id),
          }));
          setOptions(newOptions);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            dataSource="remote"
            options={options}
            value={value}
            onChange={(val) => setValue(val as string | number)}
            onSearch={handleSearch}
            loading={loading}
            minChars={2}
            placeholder="Type 2+ chars to search..."
            startIcon={<SearchIcon className="w-4 h-4" />}
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  dataSource="remote"\n  onSearch={handleSearch}\n  loading={loading}\n  minChars={2}\n  placeholder="Type 2+ chars to search..."\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\nimport { useState } from "react";\n\nexport default function Example() {\n  const [loading, setLoading] = useState(false);\n  const [options, setOptions] = useState([]);\n  \n  const handleSearch = (query) => {\n    setLoading(true);\n    fetch(\`/api/search?q=\${query}\`)\n      .then(res => res.json())\n      .then(data => setOptions(data))\n      .finally(() => setLoading(false));\n  };\n  \n  return (\n    <Autocomplete\n      dataSource="remote"\n      options={options}\n      onSearch={handleSearch}\n      loading={loading}\n      minChars={2}\n      placeholder="Type 2+ chars to search..."\n    />\n  );\n}`}
        />
      </div>
    );
  }

  // Virtualization example
  function VirtualizedExample() {
    const [options, setOptions] = React.useState<AutocompleteOption[]>([]);

    React.useEffect(() => {
      // Fetch 5000 photos for virtualization demo
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json())
        .then((data) => {
          const items = data.map((photo: any) => ({
            label: photo.title,
            value: String(photo.id),
          }));
          setOptions(items);
        });
    }, []);

    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            virtualized
            options={options}
            placeholder="Select from 1000 items..."
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  virtualized\n  options={largeOptions}\n  placeholder="Select from 1000 items..."\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\nimport { useEffect, useState } from "react";\n\nexport default function VirtualizedExample() {\n  const [options, setOptions] = useState([]);\n\n  useEffect(() => {\n    // Generate 1000 items\n    const items = Array.from({ length: 1000 }, (_, i) => ({\n      label: \`Virtual Item \${i + 1}\`,\n      value: \`virtual-\${i + 1}\`,\n    }));\n    setOptions(items);\n  }, []);\n\n  return (\n    <Autocomplete\n      virtualized\n      options={options}\n      placeholder="Select from 1000 items..."\n    />\n  );\n}`}
        />
      </div>
    );
  }

  // Lazy Loading example
  function LazyLoadExample() {
    const [items, setItems] = React.useState<AutocompleteOption[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);

    const [page, setPage] = React.useState(1);

    const loadMore = React.useCallback(async () => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
        );
        const data = await res.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          const newItems = data.map((comment: any) => ({
            label: comment.name,
            value: String(comment.id),
          }));
          setItems((prev) => [...prev, ...newItems]);
          setPage((p) => p + 1);
        }
      } catch (error) {
        console.error("Failed to load items", error);
      } finally {
        setLoading(false);
      }
    }, [page, hasMore, loading]);

    // Initial load
    React.useEffect(() => {
      loadMore();
    }, []);

    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            virtualized
            options={items}
            loading={loading}
            onLoadMore={loadMore}
            hasMore={hasMore}
            placeholder="Scroll to load more..."
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  virtualized\n  options={items}\n  loading={loading}\n  onLoadMore={loadMore}\n  hasMore={hasMore}\n  placeholder="Scroll to load more..."\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\nimport { useState, useEffect } from "react";\n\nexport default function LazyLoadExample() {\n  const [items, setItems] = useState([]);\n  const [loading, setLoading] = useState(false);\n  const [hasMore, setHasMore] = useState(true);\n\n  const loadMore = () => {\n    if (loading) return;\n    setLoading(true);\n    setTimeout(() => {\n      const newItems = Array.from({ length: 10 }, (_, i) => ({\n        label: \`Item \${items.length + i + 1}\`,\n        value: String(items.length + i + 1),\n      }));\n      setItems(prev => [...prev, ...newItems]);\n      setLoading(false);\n      if (items.length >= 40) setHasMore(false);\n    }, 1000);\n  };\n\n  useEffect(() => { loadMore(); }, []);\n\n  return (\n    <Autocomplete\n      virtualized\n      options={items}\n      loading={loading}\n      onLoadMore={loadMore}\n      hasMore={hasMore}\n      placeholder="Scroll to load more..."\n    />\n  );\n}`}
        />
      </div>
    );
  }

  function CustomRenderExample() {
    return (
      <div className="space-y-6 w-full">
        <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Autocomplete
            options={basicOptions}
            placeholder="Custom item rendering"
            renderOption={({ option, active, selected, onClick }) => (
              <div
                onClick={onClick}
                className={cn(
                  "flex flex-col px-3 py-2 cursor-pointer transition-colors",
                  active && "bg-aer-accent text-aer-accent-foreground",
                  selected && "font-bold text-aer-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{option.label}</span>
                  {selected && <span className="text-xs">✓</span>}
                </div>
                <span className="text-xs text-muted-foreground opacity-70">
                  Value: {option.value}
                </span>
              </div>
            )}
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete
  options={options}
  renderOption={({ option, active, selected, onClick }) => (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col px-3 py-2 cursor-pointer",
        active && "bg-aer-accent",
        selected && "font-bold text-aer-primary"
      )}
    >
      <span>{option.label}</span>
      <span className="text-xs opacity-70">{option.value}</span>
    </div>
  )}
/>`}
        />
      </div>
    );
  }

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Intelligent search and selection component with autocomplete, remote data fetching, and flexible filtering."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Autocomplete combines a text input with a dropdown list to provide
            intelligent suggestions as users type. It supports local filtering,
            remote data sources, and multiple selection modes.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Smart Filtering</strong> - Local, remote, or mixed data
              sources
            </li>
            <li>
              <strong>Multiple Modes</strong> - Single, multiple, or tags
              selection
            </li>
            <li>
              <strong>Debounced Search</strong> - Configurable delay for remote
              queries
            </li>
            <li>
              <strong>Match Highlighting</strong> - Emphasize matching text
            </li>
            <li>
              <strong>Custom Rendering</strong> - Full control over display
            </li>
            <li>
              <strong>Accessibility First</strong> - ARIA Combobox pattern
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right component for your search and selection needs."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Autocomplete
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Autocomplete for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Search-as-you-type functionality</li>
              <li>Large datasets requiring filtering</li>
              <li>Remote API data fetching</li>
              <li>User needs text input for precision</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">Dropdown</h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Dropdown for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Fixed list of known options</li>
              <li>User browses rather than searches</li>
              <li>Status or category selection</li>
              <li>No text input needed</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Tags Mode
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                mode="tags"
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Free-text entry allowed</li>
              <li>Create custom values</li>
              <li>Tag or keyword input</li>
              <li>Flexible user-defined options</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">Cascader</h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Cascader for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Hierarchical drill-down</li>
              <li>Category → Subcategory selection</li>
              <li>Geographic region selection</li>
              <li>Nested organizational structures</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
        <LocalFilterExample />
      </DocSection>

      <DocSection title="Visual Variants" id="variants">
        <div className="max-w-sm space-y-6">
          <Autocomplete
            variant="outline"
            options={basicOptions}
            placeholder="Outline"
          />
          <Autocomplete
            variant="filled"
            options={basicOptions}
            placeholder="Filled"
          />
          <Autocomplete
            variant="underlined"
            options={basicOptions}
            placeholder="Underlined"
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete variant="outline" placeholder="Outline" />\n<Autocomplete variant="filled" placeholder="Filled" />\n<Autocomplete variant="underlined" placeholder="Underlined" />`}
          fullCode={`import { Autocomplete } from "aer-design";\n\nexport default function VariantsDemo() {\n  return (\n    <div className="space-y-4">\n       <Autocomplete variant="outline" placeholder="Outline" />\n       <Autocomplete variant="filled" placeholder="Filled" />\n       <Autocomplete variant="underlined" placeholder="Underlined" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="The Aer Variant"
        id="aer-variant"
        description="Premium glassmorphism effect for modern search interfaces."
      >
        <div className="aer-vibrant-container">
          <div className="aer-vibrant-bg-wrapper">
            <div className="aer-vibrant-bg" />
            <div className="aer-vibrant-blob w-40 h-40 bg-purple-500/30 top-1/4 right-1/3" />
            <div className="aer-vibrant-blob w-40 h-40 bg-pink-500/30 bottom-1/4 left-1/3" />
          </div>

          <div className="relative z-10 max-w-sm mx-auto">
            <Autocomplete
              variant="aer"
              options={basicOptions}
              placeholder="Search with glassmorphism..."
            />
          </div>
        </div>
        <CodeBlock
          ts={`<Autocomplete variant="aer" options={options} placeholder="Premium search" />`}
          fullCode={`import { Autocomplete } from "aer-design";\n\nexport default function AerAutoExample() {\n  return (\n    <div className="aer-vibrant-container h-48">\n      <div className="aer-vibrant-bg" />\n      <div className="max-w-sm">\n        <Autocomplete \n          variant="aer"\n          options={options}\n          placeholder="Search with glassmorphism..."\n        />\n      </div>\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant works best on dark or
            colorful backgrounds where the glassmorphism effect shines. Perfect
            for search bars in dashboards, IDE command palettes, or premium
            interfaces.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Grouped Options"
        id="grouped"
        description="Organize options into logical groups with headers and separators."
      >
        <div className="space-y-6 w-full">
          <div className="max-w-sm p-6 border border-aer-border rounded-lg bg-aer-muted/5">
            <Autocomplete
              options={[
                {
                  type: "group",
                  label: "Frameworks",
                  items: [
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue" },
                    { label: "Angular", value: "angular" },
                  ],
                },
                { type: "separator" },
                {
                  type: "group",
                  label: "Build Tools",
                  items: [
                    { label: "Vite", value: "vite" },
                    { label: "Webpack", value: "webpack" },
                    { label: "Turbopack", value: "turbopack" },
                  ],
                },
              ]}
              placeholder="Select technology..."
            />
          </div>
          <CodeBlock
            ts={`<Autocomplete
  options={[
    { 
      type: "group", 
      label: "Frameworks", 
      items: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
      ]
    },
    { type: "separator" },
    { 
      type: "group", 
      label: "Build Tools", 
      items: [
        { label: "Vite", value: "vite" },
      ]
    },
  ]}
/>`}
            fullCode={`import { Autocomplete } from "aer-design";
import { useState } from "react";

export default function GroupedExample() {
  const [value, setValue] = useState();
  
  return (
    <Autocomplete
      options={[
        { 
          type: "group", 
          label: "Frameworks", 
          items: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
          ]
        },
        { type: "separator" },
        { 
          type: "group", 
          label: "Build Tools", 
          items: [
            { label: "Vite", value: "vite" },
            { label: "Webpack", value: "webpack" },
            { label: "Turbopack", value: "turbopack" },
          ]
        },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select technology..."
    />
  );
}`}
          />
        </div>
      </DocSection>

      <DocSection title="Multiple Selection" id="multiple">
        <MultipleSelectionExample />
      </DocSection>

      <DocSection title="Remote Search" id="remote">
        <RemoteSearchExample />
      </DocSection>

      <DocSection
        title="Virtualization"
        id="virtualization"
        description="Efficiently render large datasets with virtual scrolling."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Enable virtualization to maintain high performance when displaying
          thousands of items.
        </p>
        <VirtualizedExample />
      </DocSection>

      <DocSection
        title="Lazy Loading"
        id="lazy-loading"
        description="Load data progressively as the user scrolls."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Combine virtualization with infinite scrolling to handle massive
          datasets efficiently.
        </p>
        <LazyLoadExample />
      </DocSection>

      <DocSection
        id="custom-rendering"
        title="Custom Item Rendering"
        description="Customize the appearance of dropdown items."
      >
        <CustomRenderExample />
      </DocSection>

      <DocSection
        title="Positioning"
        id="positioning"
        description="Smart collision detection for IDE layouts and complex UIs."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Autocomplete automatically positions its dropdown to stay within the
          viewport, making it ideal for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-aer-muted-foreground mb-4">
          <li>
            <strong>Sidebars & Panels:</strong> Opens away from panel edges
          </li>
          <li>
            <strong>Modals & Dialogs:</strong> Stays within dialog bounds
          </li>
          <li>
            <strong>Floating Toolbars:</strong> Adjusts based on available space
          </li>
        </ul>
      </DocSection>

      <DocSection
        title="Accessibility First"
        id="accessibility"
        description="Full ARIA Combobox implementation with keyboard support."
      >
        <p className="text-sm text-aer-muted-foreground mb-4">
          Autocomplete follows the ARIA Combobox pattern for complete screen
          reader and keyboard accessibility:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-aer-muted-foreground">
          <li>
            <kbd className="px-2 py-1 bg-aer-muted rounded text-xs">↓</kbd>{" "}
            <span>Open and navigate down</span>
          </li>
          <li>
            <kbd className="px-2 py-1 bg-aer-muted rounded text-xs">↑</kbd>{" "}
            <span>Navigate up</span>
          </li>
          <li>
            <kbd className="px-2 py-1 bg-aer-muted rounded text-xs">Enter</kbd>{" "}
            <span>Select highlighted option</span>
          </li>
          <li>
            <kbd className="px-2 py-1 bg-aer-muted rounded text-xs">Esc</kbd>{" "}
            <span>Close dropdown</span>
          </li>
          <li>
            <kbd className="px-2 py-1 bg-aer-muted rounded text-xs">
              Backspace
            </kbd>{" "}
            <span>Remove last tag (multiple mode)</span>
          </li>
        </ul>
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Precise control with element-specific className props."
      >
        <div className="space-y-6 max-w-sm">
          <Autocomplete
            className="p-4 border rounded-2xl bg-aer-primary/5"
            inputClassName="font-mono"
            options={basicOptions}
            placeholder="Custom styled"
          />
        </div>
        <CodeBlock
          ts={`<Autocomplete\n  className="p-4 border rounded-2xl bg-aer-primary/5"\n  inputClassName="font-mono"\n  itemClassName="hover:bg-sky-500"\n  menuClassName="shadow-2xl"\n  options={options}\n/>`}
          fullCode={`import { Autocomplete } from "aer-design";\n\nexport default function StylingDemo() {\n  return (\n    <Autocomplete\n      className="p-4 border rounded-2xl bg-aer-primary/5"\n      inputClassName="font-mono"\n      itemClassName="hover:bg-sky-500 hover:text-white"\n      menuClassName="shadow-2xl"\n      options={options}\n      placeholder="Custom styled"\n    />\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <DocSection id="component-props" title="Component Props">
        <ApiTable
          data={[
            {
              prop: "options",
              type: "DropdownOption[]",
              default: "[]",
              description:
                "Array of options to display. Supports groups and separators.",
            },
            {
              prop: "dataSource",
              type: '"local" | "remote" | "mixed"',
              default: '"local"',
              description:
                "Filtering strategy: local (client-side), remote (server-side), or mixed.",
            },
            {
              prop: "mode",
              type: '"single" | "multiple" | "tags"',
              default: '"single"',
              description:
                "Selection mode. Tags mode allows creating custom values.",
            },
            {
              prop: "value",
              type: "string | number | (string | number)[]",
              default: "undefined",
              description: "Controlled selected value(s).",
            },
            {
              prop: "onChange",
              type: "(value: any) => void",
              default: "undefined",
              description: "Callback when selection changes.",
            },
            {
              prop: "inputValue",
              type: "string",
              default: "undefined",
              description: "Controlled input value (search query).",
            },
            {
              prop: "onInputChange",
              type: "(value: string) => void",
              default: "undefined",
              description: "Callback when input value changes.",
            },
            {
              prop: "onSearch",
              type: "(query: string) => void",
              default: "undefined",
              description:
                "Callback for remote search. Receives debounced query.",
            },
            {
              prop: "debounceMs",
              type: "number",
              default: "300",
              description: "Debounce delay for remote search (milliseconds)",
            },
            {
              prop: "minChars",
              type: "number",
              default: "0",
              description: "Minimum characters before triggering search.",
            },
            {
              prop: "closeOnSelect",
              type: "boolean",
              default: "true (single), false (multiple)",
              description: "Whether to close dropdown after selection.",
            },
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined" | "aer"',
              default: '"outline"',
              description: "Visual style variant.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: "Input size.",
            },
            {
              prop: "loading",
              type: "boolean",
              default: "false",
              description: "Show loading spinner.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable component.",
            },
            {
              prop: "readOnly",
              type: "boolean",
              default: "false",
              description:
                "Make component read-only (shows value, no editing).",
            },
            {
              prop: "maxSelections",
              type: "number",
              default: "undefined",
              description: "Maximum selections allowed (multiple/tags mode).",
            },
            {
              prop: "allowCustomValues",
              type: "boolean",
              default: "false",
              description: "Allow creating custom values in tags mode.",
            },
            {
              prop: "virtualized",
              type: "boolean",
              default: "false",
              description:
                "Enables virtual scrolling for performance with large datasets (>1000 items).",
            },
            {
              prop: "itemHeight",
              type: "number",
              default: "36",
              description:
                "Height of each option item in pixels for virtualization.",
            },
            {
              prop: "renderOption",
              type: "(props: RenderOptionProps) => ReactNode",
              default: "-",
              description:
                "Function to customize option rendering. Receives option, selected, active, disabled, and onClick.",
            },
            {
              prop: "onLoadMore",
              type: "() => void",
              default: "undefined",
              description:
                "Callback fired when the user scrolls to the bottom of the list.",
            },
            {
              prop: "hasMore",
              type: "boolean",
              default: "false",
              description:
                "Whether there are more items to load (displays spinner at bottom).",
            },
          ]}
        />
      </DocSection>

      <DocSection id="data-sources" title="Data Source Modes">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Local</h4>
            <p className="text-sm text-aer-muted-foreground">
              Client-side filtering of static options. Best for small datasets.
            </p>
            <code className="text-xs bg-aer-muted px-2 py-1 rounded mt-2 inline-block">
              dataSource="local"
            </code>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Remote</h4>
            <p className="text-sm text-aer-muted-foreground">
              Server-side search via API. Use with onSearch callback.
            </p>
            <code className="text-xs bg-aer-muted px-2 py-1 rounded mt-2 inline-block">
              dataSource="remote"
            </code>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Mixed</h4>
            <p className="text-sm text-aer-muted-foreground">
              Local filtering with remote fallback for better UX.
            </p>
            <code className="text-xs bg-aer-muted px-2 py-1 rounded mt-2 inline-block">
              dataSource="mixed"
            </code>
          </div>
        </div>
      </DocSection>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize autocomplete appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Autocomplete shares styling variables with Input and Dropdown
          components:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-input: 240 5.9% 90%;
  --aer-ring: 221.2 83.2% 53.3%;
  --aer-border: 214.3 31.8% 91.4%;
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-popover: 0 0% 100%;
  --aer-popover-foreground: 222.2 47.4% 11.2%;
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
}`}
          fullCode={`/* styles/globals.css or your theme file */
:root {
  /* Input Container */
  --aer-input: 240 5.9% 90%;
  --aer-border: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%; /* Focus ring */
  
  /* Dropdown Menu */
  --aer-popover: 0 0% 100%;
  --aer-popover-foreground: 222.2 47.4% 11.2%;
  
  /* Selection State */
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  
  /* Hover State */
  --aer-accent: 210 40% 96.1%;
  --aer-accent-foreground: 222.2 47.4% 11.2%;
}

/* Dark mode */
.dark {
  --aer-input: 240 3.7% 15.9%;
  --aer-border: 240 3.7% 15.9%;
  --aer-popover: 222.2 84% 4.9%;
  --aer-popover-foreground: 210 40% 98%;
  --aer-primary: 217.2 91.2% 59.8%;
  --aer-muted: 217.2 32.6% 17.5%;
}`}
        />
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
            <p className="text-sm text-sky-700 dark:text-sky-400">
              <strong>Tip:</strong> Use the ThemeProvider to switch between 8
              built-in themes (Sapphire, Carbon, Ruby, Amber, Emerald, Amethyst,
              Sunset, Ocean), or customize these variables to match your brand
              colors.
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Pro tip:</strong> Since Autocomplete builds upon Input and
              Dropdown, customizing <code>--aer-input</code> and{" "}
              <code>--aer-popover</code> will automatically theme your
              Autocomplete components.
            </p>
          </div>
        </div>
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Autocomplete
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Intelligent search with autocomplete, remote data, and flexible
          filtering.
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
              { id: "grouped", title: "Grouped Options" },
              { id: "multiple", title: "Multiple Selection" },
              { id: "remote", title: "Remote Search" },
              { id: "virtualization", title: "Virtualization" },
              { id: "lazy-loading", title: "Lazy Loading" },
              { id: "custom-rendering", title: "Custom Item Rendering" },
              { id: "positioning", title: "Positioning" },
              { id: "accessibility", title: "Accessibility First" },
              { id: "granular-styling", title: "Granular Styling" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "component-props", title: "Component Props" },
              { id: "data-sources", title: "Data Source Modes" },
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
