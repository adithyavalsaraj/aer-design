import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { RadioGroup, RadioItem } from "@/components/Radio";
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

  function DropdownLabelExample() {
    const [labelPosition, setLabelPosition] = React.useState<"top" | "left">(
      "top"
    );
    const [required, setRequired] = React.useState(false);
    const [helperText, setHelperText] = React.useState(false);

    const codeString = `<Dropdown
  label="Username"
  ${labelPosition === "left" ? 'labelPosition="left"\n  ' : ""}options={options}
  placeholder="Select option"${required ? "\n  required" : ""}${
      helperText ? '\n  helperText="Please select an option"' : ""
    }
/>`;

    return (
      <div className="space-y-6 w-full">
        {/* Controls */}
        <div className="flex flex-col items-center gap-x-4 gap-y-2 p-4 bg-aer-muted/20 rounded-lg border border-aer-border">
          <div className="w-full">
            <label className="text-sm font-medium text-aer-foreground mb-3 block">
              Label Position
            </label>
            <RadioGroup
              value={labelPosition}
              onChange={(val) => setLabelPosition(val as "top" | "left")}
              className="flex flex-row gap-4"
            >
              <RadioItem value="top" label="Top" />
              <RadioItem value="left" label="Left" />
            </RadioGroup>
          </div>
          <div className="flex w-full items-center gap-4">
            <Checkbox
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              label="Required"
            />
            <Checkbox
              checked={helperText}
              onChange={(e) => setHelperText(e.target.checked)}
              label="Helper Text"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
          <Dropdown
            label="Username"
            labelPosition={labelPosition}
            options={basicOptions}
            placeholder="Select option"
            required={required}
            helperText={helperText ? "Please select an option" : undefined}
          />
        </div>

        {/* Code Preview */}
        <CodeBlock
          ts={codeString}
          fullCode={`import { Dropdown } from "aer-design";\n\nconst options = [\n  { label: "Option 1", value: "1" },\n  { label: "Option 2", value: "2" },\n  { label: "Option 3", value: "3" },\n];\n\nexport default function Example() {\n  return (\n    ${codeString
            .split("\n")
            .map((line) => "    " + line)
            .join("\n")}\n  );\n}`}
        />
      </div>
    );
  }

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Advanced select component with search, virtualization, and multi-select capabilities."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Dropdown component is a powerful select menu with advanced
            features for handling large datasets, complex selections, and rich
            user interactions. It automatically positions itself to stay within
            the viewport.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Virtualization</strong> - Efficiently render thousands of
              options
            </li>
            <li>
              <strong>Search & filter</strong> - Built-in search with custom
              filtering
            </li>
            <li>
              <strong>Multi-select</strong> - Select multiple options with
              badges
            </li>
            <li>
              <strong>Grouping</strong> - Organize options into labeled groups
            </li>
            <li>
              <strong>Lazy loading</strong> - Load options on demand
            </li>
            <li>
              <strong>Auto-positioning</strong> - Smart collision detection
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right dropdown configuration for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Single Selection
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use basic dropdown for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Country, state, or category selection</li>
              <li>Status or priority pickers</li>
              <li>Language or theme selectors</li>
              <li>Any single-choice selection</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Multi-Select
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                multiple
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Tag or label selection</li>
              <li>Permission or role assignment</li>
              <li>Filter selections</li>
              <li>Multiple category choices</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Large Datasets
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                virtualized
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Lists with 100+ options</li>
              <li>User or customer selection</li>
              <li>Product catalogs</li>
              <li>Performance-critical scenarios</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Searchable Options
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                searchable
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Long option lists</li>
              <li>User needs to find specific items quickly</li>
              <li>Autocomplete-style selections</li>
              <li>Improving accessibility</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
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

      <DocSection
        title="The Aer Variant"
        id="aer-variant"
        description="Premium glassmorphism effect for modern dropdowns."
      >
        <div className="relative p-12 bg-zinc-950 rounded-2xl border border-zinc-800">
          {/* Vibrant Background */}
          <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-orange-600/20" />
          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-pink-500/30 rounded-full blur-[60px]" />
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-500/30 rounded-full blur-[60px]" />

          <div className="relative z-10 max-w-sm mx-auto">
            <Dropdown
              variant="aer"
              options={basicOptions}
              placeholder="Select with glassmorphism"
            />
          </div>
        </div>
        <CodeBlock
          ts={`<Dropdown variant="aer" options={options} placeholder="Premium dropdown" />`}
          fullCode={`import { Dropdown } from "aer-design";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export default function AerDropdownExample() {
  return (
    <div className="p-12 bg-linear-to-br from-violet-600 to-orange-600 rounded-2xl">
      <div className="max-w-sm">
        <Dropdown 
          variant="aer"
          options={options}
          placeholder="Select with glassmorphism"
        />
      </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant creates a premium
            glassmorphism effect. Use it on colorful or dark backgrounds for the
            best visual impact.
          </p>
        </div>
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

      <DocSection title="Addons & Icons" id="addons-icons">
        <div className="max-w-sm space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-aer-muted-foreground">
              Icons
            </h4>
            <Dropdown
              startIcon={<User className="w-4 h-4" />}
              options={basicOptions}
              placeholder="Start Icon"
            />
            <Dropdown
              endIcon={<Globe className="w-4 h-4" />}
              options={basicOptions}
              placeholder="End Icon"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-aer-muted-foreground">
              Prefix & Suffix
            </h4>
            <Dropdown prefix="US" options={basicOptions} placeholder="Prefix" />
            <Dropdown
              suffix="USD"
              options={basicOptions}
              placeholder="Suffix"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-aer-muted-foreground">
              Addons
            </h4>
            <Dropdown
              addonBefore="https://"
              options={basicOptions}
              placeholder="Addon Before"
            />
            <Dropdown
              addonAfter=".com"
              options={basicOptions}
              placeholder="Addon After"
            />
          </div>
        </div>
        <CodeBlock
          ts={`// Icons
<Dropdown startIcon={<User />} placeholder="Start Icon" />
<Dropdown endIcon={<Globe />} placeholder="End Icon" />

// Prefix & Suffix
<Dropdown prefix="US" placeholder="Prefix" />
<Dropdown suffix="USD" placeholder="Suffix" />

// Addons
<Dropdown addonBefore="https://" placeholder="Addon Before" />
<Dropdown addonAfter=".com" placeholder="Addon After" />`}
          fullCode={`import { Dropdown } from "aer-design";
import { User, Globe } from "lucide-react";

export default function AddonsDemo() {
  const options = [
    { label: "Option 1", value: "1" }, 
    { label: "Option 2", value: "2" }
  ];

  return (
    <div className="space-y-6 max-w-sm">
      {/* Icons */}
      <div className="space-y-2">
        <Dropdown startIcon={<User className="w-4 h-4" />} options={options} placeholder="Start Icon" />
        <Dropdown endIcon={<Globe className="w-4 h-4" />} options={options} placeholder="End Icon" />
      </div>

      {/* Prefix & Suffix */}
      <div className="space-y-2">
        <Dropdown prefix="US" options={options} placeholder="Prefix" />
        <Dropdown suffix="USD" options={options} placeholder="Suffix" />
      </div>

      {/* Addons */}
      <div className="space-y-2">
        <Dropdown addonBefore="https://" options={options} placeholder="Addon Before" />
        <Dropdown addonAfter=".com" options={options} placeholder="Addon After" />
      </div>
    </div>
  );
}`}
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

      <DocSection title="Label" id="label">
        <DropdownLabelExample />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Precise control over styling with element-specific className props."
      >
        <div className="space-y-6 max-w-sm">
          <div className="space-y-4">
            <p className="text-sm font-medium text-aer-muted-foreground">
              className & triggerClassName
            </p>
            <Dropdown
              className="p-4 border rounded-2xl bg-aer-primary/5"
              triggerClassName="bg-white rounded-full border-2 border-aer-primary"
              options={basicOptions}
              placeholder="Custom root and trigger"
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium text-aer-muted-foreground">
              itemClassName & iconClassName
            </p>
            <Dropdown
              itemClassName="hover:bg-purple-500 hover:text-white rounded-none"
              iconClassName="text-purple-500"
              startIcon={<User className="w-4 h-4" />}
              options={basicOptions}
              placeholder="Custom items and icons"
            />
          </div>
        </div>
        <CodeBlock
          ts={`<Dropdown \n  className="p-4 border rounded-2xl bg-aer-primary/5" \n  triggerClassName="bg-white rounded-full border-2 border-aer-primary" \n  options={options} \n/>\n\n<Dropdown \n  itemClassName="hover:bg-purple-500 hover:text-white rounded-none" \n  iconClassName="text-purple-500" \n  options={options} \n/>`}
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

      <DocSection title="Real World Example" id="real-world">
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
  label="Role"
  required
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
          required
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
            required
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
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Dropdown component accepts the following props to control its
          behavior, appearance, and data handling.
        </p>
        <ApiTable
          data={[
            {
              prop: "options",
              type: "DropdownOption[]",
              default: "[]",
              description:
                "Array of options to display. Supports sections, grouping, and disabling specific items.",
            },
            {
              prop: "value",
              type: "string | string[] | null",
              default: "-",
              description:
                "Controlled value(s) of the selected option(s). Pass an array for multi-select mode.",
            },
            {
              prop: "onChange",
              type: "(value: any) => void",
              default: "-",
              description:
                "Callback fired when selection changes. Returns array for multi-select, single value otherwise.",
            },
            {
              prop: "placeholder",
              type: "string",
              default: '"Select..."',
              description:
                "Placeholder text displayed when no option is selected.",
            },
            {
              prop: "multiple",
              type: "boolean",
              default: "false",
              description:
                "Enables selection of multiple options. Selected items are shown as badges.",
            },
            {
              prop: "searchable",
              type: "boolean",
              default: "false",
              description:
                "Enables a search input within the dropdown menu to filter options.",
            },
            {
              prop: "virtualized",
              type: "boolean",
              default: "false",
              description:
                "Enables virtual scrolling for performance with large datasets (1000+ items).",
            },
            {
              prop: "clearable",
              type: "boolean",
              default: "false",
              description:
                "Shows a clear button (x) to reset the selection when a value is present.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all interaction with the dropdown.",
            },
            {
              prop: "loading",
              type: "boolean",
              default: "false",
              description:
                "Shows a loading spinner. Useful for async data fetching.",
            },
            {
              prop: "label",
              type: "string",
              default: "-",
              description:
                "Label text to display above or beside the dropdown.",
            },
            {
              prop: "labelPosition",
              type: "'top' | 'left'",
              default: "'top'",
              description: "Position of the label relative to the dropdown.",
            },
            {
              prop: "required",
              type: "boolean",
              default: "false",
              description:
                "Shows an asterisk (*) next to the label to indicate required field.",
            },
            {
              prop: "helperText",
              type: "string",
              default: "-",
              description: "Helper text displayed below the dropdown.",
            },
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined"',
              default: '"outline"',
              description: "Visual style variant of the input trigger.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description:
                "Size of the dropdown trigger, affecting height and padding.",
            },
            {
              prop: "startIcon",
              type: "ReactNode",
              default: "-",
              description: "Icon displayed at the start of the trigger button.",
            },
            {
              prop: "endIcon",
              type: "ReactNode",
              default: "-",
              description: "Icon displayed at the end of the trigger button.",
            },
            {
              prop: "prefix",
              type: "ReactNode",
              default: "-",
              description:
                "Fixed text or element displayed before the selected value.",
            },
            {
              prop: "suffix",
              type: "ReactNode",
              default: "-",
              description:
                "Fixed text or element displayed after the selected value.",
            },
            {
              prop: "addonBefore",
              type: "ReactNode",
              default: "-",
              description:
                "Content to display before the dropdown trigger (outside the border).",
            },
            {
              prop: "addonAfter",
              type: "ReactNode",
              default: "-",
              description:
                "Content to display after the dropdown trigger (outside the border).",
            },
            {
              prop: "maxDisplayCount",
              type: "number",
              default: "-",
              description:
                "Maximum number of selected items to show before condensing (e.g., '+3 more').",
            },
            {
              prop: "onSearch",
              type: "(query: string) => void",
              default: "-",
              description: "Callback for custom search logic on input change.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes for the root container element. Use for spacing (margin, padding) and layout.",
            },
            {
              prop: "containerClassName",
              type: "string",
              default: "-",
              description: "DEPRECATED: Use className instead.",
            },
            {
              prop: "triggerClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the clickable trigger element.",
            },
            {
              prop: "labelClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the floating label text.",
            },
            {
              prop: "menuClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the dropdown menu popover.",
            },
            {
              prop: "itemClassName",
              type: "string",
              default: "-",
              description: "CSS classes for individual dropdown items.",
            },
            {
              prop: "iconClassName",
              type: "string",
              default: "-",
              description: "CSS classes for start/end icons and checkmarks.",
            },
            {
              prop: "addonClassName",
              type: "string",
              default: "-",
              description: "CSS classes for addon containers.",
            },
            {
              prop: "errorClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the error message text.",
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

      <div>
        <h3 id="feature-guide" className="text-lg font-bold mb-4">
          Feature Usage Guide
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Virtualization</h4>
            <p className="text-sm text-aer-muted-foreground">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                virtualized
              </code>{" "}
              for lists exceeding 100 items. It renders only visible items,
              maintaining high performance even with 10,000+ options.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">Search & Filtering</h4>
            <p className="text-sm text-aer-muted-foreground">
              Enable{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                searchable
              </code>{" "}
              to allow users to filter options. Combine with{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                onSearch
              </code>{" "}
              for server-side filtering logic.
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
      description="Customize dropdown appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Dropdown uses the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-dropdown-bg: 0 0% 100%;
  --aer-dropdown-border: 214.3 31.8% 91.4%;
  --aer-item-hover: 210 40% 96.1%;
  --aer-primary: 221.2 83.2% 53.3%;
  /* See full list below */
}`}
          fullCode={`/* styles/globals.css or your theme file */
:root {
  /* Trigger & Menu Background */
  --aer-background: 0 0% 100%;
  
  /* Borders */
  --aer-border: 214.3 31.8% 91.4%;
  
  /* Text Colors */
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-muted-foreground: 215.4 16.3% 46.9%;
  
  /* Selection & Hover States */
  --aer-primary: 221.2 83.2% 53.3%; /* Selected item background/text */
  --aer-primary-foreground: 210 40% 98%;
  --aer-muted: 210 40% 96.1%; /* Item hover background */
  
  /* Focus Ring */
  --aer-ring: 221.2 83.2% 53.3%;
}

/* Dark mode */
.dark {
  --aer-background: 222.2 84% 4.9%;
  --aer-border: 217.2 32.6% 17.5%;
  --aer-foreground: 210 40% 98%;
  --aer-muted-foreground: 215 20.2% 65.1%;
  --aer-primary: 217.2 91.2% 59.8%;
  --aer-muted: 217.2 32.6% 17.5%;
  --aer-ring: 217.2 91.2% 59.8%;
}`}
        />
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-400">
              <strong>Tip:</strong> Use the ThemeProvider to switch themes
              globally, or override these variables in a specific scope to
              customize just the dropdowns.
            </p>
          </div>
          <div className="mt-4 p-4 bg-aer-muted/5 border border-aer-border rounded-lg">
            <p className="text-sm text-aer-muted-foreground">
              <strong>Note:</strong> The <strong>Aer</strong> variant applies a
              glassmorphism style with white text, designed for dark or colorful
              backgrounds. For automatic contrast adjustment on custom
              backgrounds, enable the global <code>autoContrast</code> setting.
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
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "basic", title: "Basic Usage" },
              { id: "variants", title: "Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "sizes", title: "Sizes" },
              { id: "multi-select", title: "Multi-select" },
              { id: "search", title: "Search & Filter" },
              { id: "virtualization", title: "Virtualization" },
              { id: "lazy-loading", title: "Lazy Loading" },
              { id: "grouped", title: "Grouped Dropdown" },
              { id: "clearable", title: "Clearable" },
              { id: "label", title: "Label" },
              { id: "addons-icons", title: "Addons & Icons" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "validation", title: "Validation" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "dropdown-props", title: "DropdownProps" },
              { id: "dropdown-option-type", title: "DropdownOption Type" },
              { id: "feature-guide", title: "Feature Usage Guide" },
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
