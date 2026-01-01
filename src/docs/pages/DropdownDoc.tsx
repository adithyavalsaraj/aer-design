import { Button } from "@/components/Button";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { Globe, User } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function DropdownDoc() {
  const basicOptions: DropdownOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Disabled Option", value: "4", disabled: true },
    { label: "Option 5", value: "5" },
  ];

  const overview = (
    <div className="space-y-12">
      <DocSection title="Basic" id="basic">
        <div className="max-w-sm space-y-4">
          <Dropdown options={basicOptions} placeholder="Select an option" />
          <Dropdown
            options={basicOptions}
            disabled
            placeholder="Disabled Dropdown"
          />
        </div>
        <CodeBlock
          ts={`const options = [\n  { label: "Option 1", value: "1" },\n  { label: "Option 2", value: "2" },\n  { label: "Disabled Option", value: "4", disabled: true },\n];\n\n<Dropdown options={options} placeholder="Select an option" />`}
          js={`const options = [\n  { label: "Option 1", value: "1" },\n  { label: "Option 2", value: "2" },\n  { label: "Disabled Option", value: "4", disabled: true },\n];\n\n<Dropdown options={options} placeholder="Select an option" />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nconst options = [\n  { label: "Option 1", value: "1" },\n  { label: "Option 2", value: "2" },\n  { label: "Option 3", value: "3" },\n];\n\nexport default function BasicDropdown() {\n  return (\n    <div className="max-w-xs p-8 bg-zinc-900 rounded-xl">\n      <Dropdown options={options} placeholder="Select an option" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Multi-select" id="multi-select">
        <div className="max-w-sm space-y-4">
          <Dropdown
            multiple
            options={basicOptions}
            placeholder="Select multiple..."
          />
          <Dropdown
            multiple
            maxDisplayCount={2}
            options={basicOptions}
            placeholder="Max display count (2)"
          />
        </div>
        <CodeBlock
          ts={`<Dropdown multiple options={options} placeholder="Select multiple..." />\n<Dropdown multiple maxDisplayCount={2} options={options} placeholder="Max display count (2)" />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nexport default function MultiSelectDemo() {\n  return (\n    <div className="space-y-4">\n      <Dropdown multiple options={options} placeholder="Select multiple..." />\n      <Dropdown multiple maxDisplayCount={2} options={options} placeholder="Max display count (2)" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Specialized" id="specialized">
        <div className="max-w-sm space-y-4">
          <Dropdown
            startIcon={<User className="w-4 h-4" />}
            options={basicOptions}
            placeholder="With start icon"
          />
          <Dropdown
            prefix="US"
            options={basicOptions}
            placeholder="With prefix"
          />
          <Dropdown
            startIcon={<Globe className="w-4 h-4" />}
            floatingLabel
            label="Region"
            options={basicOptions}
          />
        </div>
        <CodeBlock
          ts={`<Dropdown startIcon={<User />} placeholder="With start icon" />\n<Dropdown prefix="US" placeholder="With prefix" />\n<Dropdown floatingLabel startIcon={<Globe />} label="Region" />`}
          fullCode={`import { Dropdown } from "aer-design";\nimport { User, Globe } from "lucide-react";\n\nexport default function SpecializedDemo() {\n  return (\n    <div className="space-y-4">\n      <Dropdown startIcon={<User className="w-4 h-4" />} options={opts} placeholder="With start icon" />\n      <Dropdown prefix="US" options={opts} placeholder="With prefix" />\n      <Dropdown floatingLabel startIcon={<Globe className="w-4 h-4" />} label="Region" options={opts} />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Clearable" id="clearable">
        <div className="max-w-sm space-y-4">
          <Dropdown
            clearable
            options={basicOptions}
            placeholder="Clearable (Single)"
          />
          <Dropdown
            multiple
            clearable
            options={basicOptions}
            placeholder="Clearable (Multi)"
          />
        </div>
        <CodeBlock
          ts={`<Dropdown clearable options={options} placeholder="Clearable (Single)" />\n<Dropdown multiple clearable options={options} placeholder="Clearable (Multi)" />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nexport default function ClearableDemo() {\n  return (\n    <div className="space-y-4">\n       <Dropdown clearable options={options} placeholder="Clearable (Single)" />\n       <Dropdown multiple clearable options={options} placeholder="Clearable (Multi)" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Grouped Dropdown"
        id="grouped"
        description="Organize options into logical groups with labels and separators for better UX."
      >
        <div className="max-w-sm space-y-4">
          <Dropdown
            label="Select Category"
            options={[
              {
                type: "group",
                label: "Fruits",
                items: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                  { label: "Orange", value: "orange" },
                ],
              },
              { type: "separator" },
              {
                type: "group",
                label: "Vegetables",
                items: [
                  { label: "Carrot", value: "carrot" },
                  { label: "Lettuce", value: "lettuce" },
                  { label: "Tomato", value: "tomato" },
                ],
              },
            ]}
            placeholder="Choose a category..."
          />

          <Dropdown
            label="Select Framework"
            searchable
            options={[
              {
                type: "group",
                label: "Frontend",
                items: [
                  { label: "React", value: "react" },
                  { label: "Vue", value: "vue" },
                  { label: "Angular", value: "angular" },
                  { label: "Svelte", value: "svelte" },
                ],
              },
              { type: "separator" },
              {
                type: "group",
                label: "Backend",
                items: [
                  { label: "Node.js", value: "node" },
                  { label: "Django", value: "django" },
                  { label: "Laravel", value: "laravel" },
                ],
              },
              { type: "separator" },
              { label: "Other", value: "other" },
            ]}
            placeholder="Search frameworks..."
          />
        </div>
        <CodeBlock
          ts={`const options = [
  { 
    type: "group", 
    label: "Fruits", 
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ]
  },
  { type: "separator" },
  { 
    type: "group", 
    label: "Vegetables", 
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Lettuce", value: "lettuce" },
    ]
  },
];

<Dropdown options={options} placeholder="Choose..." />`}
          fullCode={`import { Dropdown } from "aer-design";

const groupedOptions = [
  { 
    type: "group", 
    label: "Fruits", 
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ]
  },
  { type: "separator" },
  { 
    type: "group", 
    label: "Vegetables", 
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Lettuce", value: "lettuce" },
      { label: "Tomato", value: "tomato" },
    ]
  },
];

export default function GroupedDropdown() {
  return (
    <div className="max-w-xs p-8 bg-zinc-900 rounded-xl">
      <Dropdown 
        options={groupedOptions} 
        placeholder="Choose a category..." 
      />
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection title="Search & Filter" id="search">
        <div className="max-w-sm space-y-4">
          <Dropdown
            searchable
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
              { label: "Svelte", value: "svelte" },
              { label: "Solid", value: "solid" },
            ]}
            placeholder="Search framework..."
          />
        </div>
        <CodeBlock
          ts={`<Dropdown searchable options={frameworks} placeholder="Search framework..." />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nconst frameworks = [\n  { label: "React", value: "react" },\n  { label: "Vue", value: "vue" },\n  { label: "Angular", value: "angular" },\n];\n\nexport default function SearchDemo() {\n  return (\n    <Dropdown searchable options={frameworks} placeholder="Search framework..." />\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Virtualization"
        id="virtualization"
        description="Efficiently render large lists of options."
      >
        <div className="max-w-sm space-y-4">
          <VirtualizedExample />
        </div>
        <CodeBlock
          ts={`// 10,000 items\n<Dropdown \n  virtualized \n  searchable \n  options={largeOptions} \n  placeholder="Select from 10k items" \n/>`}
          fullCode={`import { Dropdown } from "aer-design";\n\n// Generate 10,000 items\nconst largeOptions = Array.from({ length: 10000 }, (_, i) => ({\n  label: "Item " + (i + 1),\n  value: String(i + 1),\n}));\n\nexport default function VirtualizedDemo() {\n  return (\n    <Dropdown \n      virtualized \n      searchable \n      options={largeOptions} \n      placeholder="Select from 10k items" \n    />\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Lazy Loading"
        id="lazy-loading"
        description="Load more items as the user scrolls."
      >
        <div className="max-w-sm space-y-4">
          <LazyLoadExample />
        </div>
        <CodeBlock
          ts={`<Dropdown \n  options={items} \n  loading={isLoading} \n  onLoadMore={loadMore} \n  hasMore={hasMore}\n  virtualized\n  placeholder="Scroll to load more"\n/>`}
          fullCode={`import { Dropdown } from "aer-design";\n\nexport default function LazyLoadDemo() {\n  // Initial items\n  const [items, setItems] = React.useState(() => Array.from({ length: 20 }, (_, i) => ({ label: "Item " + (i + 1), value: String(i + 1) })));\n  const [loading, setLoading] = React.useState(false);\n  \n  const loadMore = () => {\n    setLoading(true);\n    setTimeout(() => {\n       setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => ({ label: "Item " + (prev.length + i + 1), value: String(prev.length + i + 1) }))]);\n       setLoading(false);\n    }, 1000);\n  };\n\n  return (\n    <Dropdown \n      options={items} \n      loading={loading} \n      onLoadMore={loadMore} \n      hasMore={true}\n      placeholder="Scroll to load more"\n    />\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Variants" id="variants">
        <div className="max-w-sm space-y-6">
          <Dropdown
            options={basicOptions}
            variant="outline"
            placeholder="Outline"
          />
          <Dropdown
            options={basicOptions}
            variant="filled"
            placeholder="Filled"
          />
          <Dropdown
            options={basicOptions}
            variant="underlined"
            placeholder="Underlined"
          />
        </div>
        <CodeBlock
          ts={`<Dropdown variant="outline" placeholder="Outline" />\n<Dropdown variant="filled" placeholder="Filled" />\n<Dropdown variant="underlined" placeholder="Underlined" />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nexport default function VariantsDemo() {\n  return (\n    <div className="space-y-4">\n       <Dropdown variant="outline" placeholder="Outline" />\n       <Dropdown variant="filled" placeholder="Filled" />\n       <Dropdown variant="underlined" placeholder="Underlined" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="max-w-sm space-y-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Small</label>
            <Dropdown
              size="sm"
              options={basicOptions}
              placeholder="Small Dropdown"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Default</label>
            <Dropdown
              size="default"
              options={basicOptions}
              placeholder="Default Dropdown"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Large</label>
            <Dropdown
              size="lg"
              options={basicOptions}
              placeholder="Large Dropdown"
            />
          </div>
        </div>
        <CodeBlock
          ts={`<Dropdown size="sm" placeholder="Small" />\n<Dropdown size="default" placeholder="Default" />\n<Dropdown size="lg" placeholder="Large" />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nconst options = [{ label: "Option 1", value: "1" }];\n\nexport default function SizesDemo() {\n  return (\n    <div className="space-y-4">\n       <Dropdown size="sm" options={options} placeholder="Small" />\n       <Dropdown size="default" options={options} placeholder="Default" />\n       <Dropdown size="lg" options={options} placeholder="Large" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Floating Label" id="floating-label">
        <div className="max-w-sm space-y-6">
          <Dropdown
            floatingLabel
            label="Country"
            options={basicOptions}
            placeholder="Select one"
          />
          <Dropdown
            floatingLabel
            variant="filled"
            label="Framework"
            startIcon={<Globe className="w-4 h-4" />}
            options={basicOptions}
            placeholder="Select one"
          />
        </div>
        <CodeBlock
          ts={`<Dropdown floatingLabel label="Country" options={options} />`}
          fullCode={`import { Dropdown } from "aer-design";\n\nexport default function FloatingLabelDemo() {\n  return (\n    <Dropdown floatingLabel label="Country" options={options} />\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Validation" id="validation">
        <div className="max-w-sm space-y-4">
          <Dropdown error options={basicOptions} placeholder="Error state" />
        </div>
        <CodeBlock
          ts={`<Dropdown error placeholder="Error state" />`}
          // No fullCode needed for simple example
        />
      </DocSection>

      <DocSection title="Real World" id="real-world">
        <RealWorldExample />
        <div className="mt-4">
          <p className="text-sm text-aer-muted-foreground mb-4">
            A real-world example handling user profile settings with validation.
          </p>
        </div>
        <CodeBlock
          ts={`const [value, setValue] = useState("");
const [touched, setTouched] = useState(false);
const options = [/*...*/];

// ... inside render
<Dropdown 
  label="Role"
  value={value}
  onChange={setValue}
  options={options}
  error={touched && !value}
  floatingLabel
/>`}
          fullCode={`import { Dropdown, Button } from "aer-design";
import { useState } from "react";
import { User, Shield } from "lucide-react";

const roleOptions = [
  { label: "Administrator", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

export default function UserSettings() {
  const [role, setRole] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !role;

  const handleSubmit = () => {
    setTouched(true);
    if (role) {
      alert(\`Role selected: \${role}\`);
    }
  };

  return (
    <div className="max-w-sm p-6 border rounded-aer-xl bg-aer-muted/5 space-y-6">
      <div>
        <h3 className="font-medium text-aer-foreground">Permissions</h3>
        <p className="text-xs text-aer-muted-foreground">Manage user access levels.</p>
      </div>

      <div className="space-y-1">
        <Dropdown 
          label="Select Role"
          placeholder="Choose a role..."
          value={role}
          onChange={setRole}
          options={roleOptions}
          error={isInvalid}
          floatingLabel
          startIcon={<Shield className="w-4 h-4" />}
          // Simulate "onBlur" by setting touched when menu closes? 
          // Dropdown doesn't have onBlur yet, but we can assume interaction.
        />
        {isInvalid && (
           <span className="text-xs text-red-500 font-medium">Role is required</span>
        )}
      </div>

      <Button variant="aer" className="w-full" onClick={handleSubmit}>
        Save Changes
      </Button>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [role, setRole] = React.useState<any>("");
    const [touched, setTouched] = React.useState(false);

    const isInvalid = touched && !role;
    const roleOptions = React.useMemo(
      () => [
        { label: "Administrator", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
      []
    );

    const handleSubmit = () => {
      setTouched(true);
      if (role) {
        console.log("Role selected:", role);
      }
    };

    return (
      <div className="max-w-sm p-6 border rounded-aer-xl bg-aer-muted/5 space-y-6">
        <div>
          <h3 className="font-medium text-aer-foreground">Permissions</h3>
          <p className="text-xs text-aer-muted-foreground">
            Manage user access levels.
          </p>
        </div>
        <div className="space-y-1">
          <Dropdown
            label="Select Role"
            placeholder="Choose a role..."
            value={role}
            onChange={setRole}
            options={roleOptions}
            error={isInvalid}
            floatingLabel
            startIcon={
              <React.Suspense fallback={null}>
                <User className="w-4 h-4" />
              </React.Suspense>
            }
          />
          {isInvalid && (
            <span className="text-xs text-red-500 font-medium">
              Role is required
            </span>
          )}
        </div>
        <Button variant="aer" className="w-full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    );
  }

  function VirtualizedExample() {
    // Generate static large list once
    const largeOptions = React.useMemo(
      () =>
        Array.from({ length: 1000 }, (_, i) => ({
          label: `Virtual Item ${i + 1}`,
          value: String(i + 1),
        })),
      []
    );
    return (
      <Dropdown
        virtualized
        searchable
        options={largeOptions}
        placeholder="Select from 1000 items (Virtualized)"
      />
    );
  }

  function LazyLoadExample() {
    const [items, setItems] = React.useState(() =>
      Array.from({ length: 20 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: String(i + 1),
      }))
    );
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);

    const loadMore = () => {
      if (loading) return;
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const currentLength = items.length;
        const newItems = Array.from({ length: 10 }, (_, i) => ({
          label: `Item ${currentLength + i + 1}`,
          value: String(currentLength + i + 1),
        }));
        setItems((prev) => [...prev, ...newItems]);
        setLoading(false);
        if (currentLength + 10 >= 100) setHasMore(false); // Stop after 100
      }, 1000);
    };

    return (
      <Dropdown
        virtualized
        options={items}
        loading={loading}
        onLoadMore={loadMore}
        hasMore={hasMore}
        placeholder="Scroll to load (Infinite Scroll)"
      />
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="dropdown-props" className="text-lg font-bold mb-4">
          DropdownProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "options",
              type: "DropdownOption[]",
              default: "[]",
              description: "Array of options to display",
            },
            {
              prop: "value",
              type: "string | number | []",
              default: "-",
              description: "Controlled value",
            },
            {
              prop: "onChange",
              type: "(value: any) => void",
              default: "-",
              description: "Callback when selection changes",
            },
            {
              prop: "multiple",
              type: "boolean",
              default: "false",
              description: "Enable multi-selection",
            },
            {
              prop: "searchable",
              type: "boolean",
              default: "false",
              description: "Enable search functionality",
            },
            {
              prop: "clearable",
              type: "boolean",
              default: "false",
              description: "Show clear button when value selected",
            },
            {
              prop: "virtualized",
              type: "boolean",
              default: "false",
              description: "Enable internal virtualization for large lists",
            },
            {
              prop: "loading",
              type: "boolean",
              default: "false",
              description: "Show loading state (spinners)",
            },
            {
              prop: "onLoadMore",
              type: "() => void",
              default: "-",
              description: "Callback when scrolling to bottom",
            },
            {
              prop: "floatingLabel",
              type: "boolean",
              default: "false",
              description: "Use floating label style",
            },
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined"',
              default: '"outline"',
              description: "Visual style variant",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default" (or global config)',
              description: "Trigger size",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "false",
              description: "Highlight with error color",
            },
            {
              prop: "placeholder",
              type: "string",
              default: '"Select..."',
              description: "Placeholder text",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable interaction",
            },
            {
              prop: "startIcon",
              type: "ReactNode",
              default: "-",
              description: "Icon displayed at the start",
            },
            {
              prop: "prefix",
              type: "ReactNode",
              default: "-",
              description: "Text/Element prefix",
            },
            {
              prop: "onSearch",
              type: "(query: string) => void",
              default: "-",
              description: "External search handler",
            },
            {
              prop: "maxDisplayCount",
              type: "number",
              default: "-",
              description: "Max items to show before grouping",
            },
            {
              prop: "itemHeight",
              type: "number",
              default: "36",
              description: "Height of items for virtualization",
            },
            {
              prop: "containerClassName",
              type: "string",
              default: "-",
              description: "ClassName for root element",
            },
            {
              prop: "menuClassName",
              type: "string",
              default: "-",
              description: "ClassName for dropdown menu",
            },
          ]}
        />
      </div>
      <div>
        <h3 id="dropdown-option-type" className="text-lg font-bold mb-4">
          DropdownOption Type
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The <code>DropdownOption</code> type is a discriminated union that
          supports regular options, grouped options, and separators.
        </p>

        <h4 className="text-md font-semibold mb-2 mt-6">Regular Option</h4>
        <ApiTable
          data={[
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description: "Display label",
            },
            {
              prop: "value",
              type: "string | number",
              default: "-",
              description: "Unique value identifier",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable selection of this option",
            },
          ]}
        />

        <h4 className="text-md font-semibold mb-2 mt-6">Group Option</h4>
        <ApiTable
          data={[
            {
              prop: "type",
              type: '"group"',
              default: "-",
              description: "Identifies this as a group",
            },
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "Group label displayed above items",
            },
            {
              prop: "items",
              type: "DropdownOptionItem[]",
              default: "-",
              description: "Array of options within this group",
            },
          ]}
        />

        <h4 className="text-md font-semibold mb-2 mt-6">Separator</h4>
        <ApiTable
          data={[
            {
              prop: "type",
              type: '"separator"',
              default: "-",
              description: "Renders a horizontal divider line",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      id="css-variables"
      description="Customize dropdown appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {
  --aer-input: 240 5.9% 90%;
  --aer-ring: 240 5.9% 10%;
  --aer-background: 0 0% 100%;
  --aer-muted: 240 4.8% 95.9%;
  --aer-muted-foreground: 240 3.8% 46.1%;
  --aer-border: 240 5.9% 90%;
}`}
        fullCode={`/* app.css */
:root {
  --aer-input: 240 5.9% 90%;
  --aer-ring: 240 5.9% 10%;
  --aer-background: 0 0% 100%;
  --aer-muted: 240 4.8% 95.9%;
  --aer-muted-foreground: 240 3.8% 46.1%;
  --aer-border: 240 5.9% 90%;
}`}
      />
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dropdown
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Advanced selection component with multi-select, search,
          virtualization, and lazy loading capabilities.
        </p>
      </header>

      <DocTabs
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: overview,
            toc: [
              { id: "basic", title: "Basic" },
              { id: "multi-select", title: "Multi-select" },
              { id: "specialized", title: "Specialized" },
              { id: "clearable", title: "Clearable" },
              { id: "grouped", title: "Grouped Dropdown" },
              { id: "search", title: "Search & Filter" },
              { id: "virtualization", title: "Virtualization" },
              { id: "lazy-loading", title: "Lazy Loading" },
              { id: "variants", title: "Variants" },
              { id: "sizes", title: "Sizes" },
              { id: "floating-label", title: "Floating Label" },
              { id: "validation", title: "Validation" },
              { id: "real-world", title: "Real World" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "dropdown-props", title: "DropdownProps" },
              { id: "dropdown-option-type", title: "DropdownOption Type" },
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
