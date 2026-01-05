import { Button } from "@/components/Button";
import { Cascader } from "@/components/Cascader";
import { Checkbox } from "@/components/Checkbox";
import { RadioGroup, RadioItem } from "@/components/Radio";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
} from "@/docs/components/shared";
import * as React from "react";

export function CascaderDoc() {
  const geoOptions = [
    {
      label: "North America",
      value: "na",
      children: [
        {
          label: "USA",
          value: "usa",
          children: [
            { label: "New York", value: "ny" },
            { label: "Los Angeles", value: "la" },
            { label: "Chicago", value: "chi" },
          ],
        },
        {
          label: "Canada",
          value: "can",
          children: [
            { label: "Toronto", value: "tor" },
            { label: "Vancouver", value: "van" },
          ],
        },
      ],
    },
    {
      label: "Europe",
      value: "eu",
      children: [
        { label: "France", value: "fr" },
        { label: "Germany", value: "de" },
      ],
    },
  ];

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A hierarchical selection component for browsing nested data."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Cascader component is used to select a value from a set of
            associated data sets. Such a data set often has a hierarchical
            relationship, such as administrative regions (Province / City /
            District) or taxonomies (Category / Subcategory).
          </p>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right selection component for your data."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Hierarchical Data
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Cascader when the options are logically grouped and have
              parent-child relationships, such as:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Geographic Locations (Country/State/City)</li>
              <li>Product Categories (Electronics/Phones/Accessories)</li>
              <li>Organizational Charts</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Alternative to Select
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Cascader allows you to select from a large dataset without
              overwhelming the user, unlike a standard Select dropdown which
              lists all options flatly.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic-usage"
        title="Basic Usage"
        description="Standard interaction with nested options."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <BasicCascaderExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`import { Cascader } from "aer-design";

const options = [
  {
    label: "North America",
    value: "na",
    children: [
      { label: "USA", value: "usa", children: [{ label: "New York", value: "ny" }] },
      { label: "Canada", value: "can" }
    ]
  }
];

export function Example() {
  const [value, setValue] = useState(null);

  return (
    <Cascader 
        options={options} 
        value={value} 
        onChange={setValue} 
        placeholder="Select Region" 
    />
  );
}`}
          fullCode={`import { Cascader } from "aer-design";
import { useState } from "react";

const options = [
  {
    label: "North America",
    value: "na",
    children: [
      { label: "USA", value: "usa", children: [{ label: "New York", value: "ny" }] },
      { label: "Canada", value: "can" }
    ]
  },
  {
    label: "Europe",
    value: "eu",
    children: [
      { label: "France", value: "fr" },
      { label: "Germany", value: "de" }
    ]
  }
];

export default function BasicCascader() {
  const [value, setValue] = useState(null);

  return (
    <div className="w-64">
        <Cascader 
            options={options} 
            value={value} 
            onChange={setValue} 
            placeholder="Select Region" 
        />
        <div className="mt-4 text-sm text-gray-500">
            Selected Value: {value || "None"}
        </div>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="custom-display"
        title="Custom Display"
        description="Customize the way the selected path is rendered."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <CustomDisplayExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader 
    options={options} 
    displayRender={(labels) => labels.join(" > ")} 
/>`}
          fullCode={`import { Cascader } from "aer-design";
import { useState } from "react";

const options = [{ label: "Europe", value: "eu", children: [{ label: "Germany", value: "de" }] }];

export default function CustomDisplay() {
  const [value, setValue] = useState<string | number>("de");

  return (
    <div className="w-64 space-y-4">
        <Cascader 
            options={options} 
            value={value} 
            onChange={setValue}
            displayRender={(labels) => (
                <span className="font-mono text-blue-600">
                    {labels.join(" >> ")}
                </span>
            )}
        />
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Variants"
        description="Choose from supported visual styles."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <VariantsExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader variant="outline" ... />
<Cascader variant="filled" ... />
<Cascader variant="underlined" ... />
<Cascader variant="aer" ... />`}
        />
      </DocSection>

      <DocSection
        id="sizes"
        title="Sizes"
        description="Configure the size of the trigger to match your layout."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <SizesExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader size="sm" ... />
<Cascader size="default" ... />
<Cascader size="lg" ... />`}
        />
      </DocSection>

      <DocSection
        id="error-state"
        title="Error State"
        description="Display validation errors."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <ErrorExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader error ... />
<Cascader error="Selection is required" ... />`}
        />
      </DocSection>

      <DocSection
        id="show-last-item"
        title="Show Last Item Only"
        description="Display only the selected leaf node's label instead of the full path."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <ShowLastItemExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader 
    options={options} 
    displayRender={(labels) => labels[labels.length - 1]} 
/>`}
          fullCode={`import { Cascader } from "aer-design";
import { useState } from "react";

const options = [
    { label: "North America", value: "na", children: [{ label: "USA", value: "usa", children: [{ label: "New York", value: "ny" }] }] }
];

export default function ShowLastItem() {
    const [value, setValue] = useState<string | number>("ny");

    return (
        <div className="w-64">
            <Cascader 
                options={options} 
                value={value} 
                onChange={setValue} 
                displayRender={(labels) => labels[labels.length - 1]} 
            />
        </div>
    );
}`}
        />
      </DocSection>

      <DocSection
        id="label"
        title="Label"
        description="Add labels to cascaders with flexible positioning and helper text options."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5">
          <CascaderLabelExample options={geoOptions} />
        </div>
      </DocSection>

      <DocSection
        id="addons"
        title="Addons & Icons"
        description="Add icons, prefixes, suffixes, or addons to the input."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <AddonsExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader startIcon={<CreditCard />} suffix="USD" ... />
<Cascader addonBefore="https://" addonAfter=".com" ... />`}
        />
      </DocSection>

      <DocSection
        id="lazy-load"
        title="Lazy Loading"
        description="Load options dynamically when a parent node is clicked."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <LazyLoadExample />
        </div>
        <CodeBlock
          ts={`const loadData = (selectedOption) => {
  // Fetch children and update options
  targetOption.children = [...];
  setOptions([...options]);
};

<Cascader options={options} loadData={loadData} />`}
        />
      </DocSection>

      <DocSection
        id="disabled-state"
        title="Disabled State"
        description="Disable the entire component or specific options."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <DisabledExample />
        </div>
        <CodeBlock
          ts={`<Cascader disabled placeholder="I am disabled" options={[]} />`}
          fullCode={`import { Cascader } from "aer-design";
import { useState } from "react";

const options = [
    { label: "Enabled Parent", value: "1", children: [
        { label: "Disabled Child", value: "1-1", disabled: true },
        { label: "Enabled Child", value: "1-2" }
    ]}
];

export default function DisabledExample() {
  return (
    <div className="w-64 space-y-4">
        <Cascader disabled placeholder="Component Disabled" options={[]} />
        <Cascader placeholder="Option Disabled" options={options} />
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Style specific parts of the cascader using utility classes."
      >
        <div className="flex items-center justify-center p-8 border border-aer-border rounded-lg bg-aer-muted/5">
          <CascaderStylingExample options={geoOptions} />
        </div>
        <CodeBlock
          ts={`<Cascader 
  options={options}
  value={value}
  onChange={setValue}
  className="w-64"
  triggerClassName="border-purple-200 bg-purple-50 hover:border-purple-300"
  itemClassName="hover:bg-purple-100 hover:text-purple-700"
  placeholder="Purple Theme"
/>`}
          fullCode={`import { Cascader } from "aer-design";
import { useState } from "react";

export default function CascaderStyling() {
  const [val, setVal] = useState<string | number>();
  
  return (
    <Cascader 
      options={options}
      value={val}
      onChange={setVal}
      className="w-72"
      triggerClassName="border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-300 transition-colors"
      itemClassName="hover:bg-purple-100 hover:text-purple-700 focus:bg-purple-100 focus:text-purple-700 data-[selected=true]:bg-purple-200"
      placeholder="Purple Theme"
    />
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A category selector within a settings form."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center w-full">
          <RealWorldExample />
        </div>
        <CodeBlock
          ts={`// Product Category Selection
<Cascader 
    options={categories} 
    value={form.category} 
    placeholder="Select Product Category"
    onChange={(val) => setForm({...form, category: val})} 
/>`}
          fullCode={`import { Cascader, Button, Input } from "aer-design";
import { useState } from "react";

const categories = [
    {
        label: "Electronics",
        value: "elec",
        children: [
            { label: "Computers", value: "comp", children: [{ label: "Laptops", value: "laptop" }, { label: "Desktops", value: "desktop" }] },
            { label: "Phones", value: "phone" }
        ]
    },
    {
        label: "Home & Garden",
        value: "home",
        children: [
            { label: "Furniture", value: "furn" },
            { label: "Decor", value: "decor" }
        ]
    }
];

export default function ProductForm() {
    const [data, setData] = useState({ name: "", category: undefined as string | number | undefined });

    return (
        <div className="w-full max-w-sm p-6 border rounded-lg bg-aer-background space-y-4">
            <h3 className="font-bold text-lg">Add New Product</h3>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input 
                    value={data.name} 
                    onChange={(e) => setData({...data, name: e.target.value})}
                    placeholder="e.g. Pro Laptop X1" 
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Cascader 
                    options={categories}
                    value={data.category}
                    onChange={(val) => setData({...data, category: val})}
                    placeholder="Select Category"
                    className="w-full"
                />
            </div>

            <div className="pt-2 flex justify-end">
                <Button onClick={() => alert(JSON.stringify(data))}>
                    Save Product
                </Button>
            </div>
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
        <h3 id="cascader-props" className="text-lg font-bold mb-4">
          Cascader Props
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Cascader component accepts the following props for configuration.
        </p>
        <ApiTable
          data={[
            {
              prop: "options",
              type: "CascaderOption[]",
              default: "[]",
              description:
                "The recursive data structure defining the menu hierarchy.",
            },
            {
              prop: "value",
              type: "string | number",
              default: "undefined",
              description: "Controlled value of the selected leaf option.",
            },
            {
              prop: "onChange",
              type: "(value: string | number) => void",
              default: "-",
              description: "Callback fired when a leaf node is selected.",
            },
            {
              prop: "placeholder",
              type: "string",
              default: '"Select..."',
              description: "Text displayed when no value is selected.",
            },
            {
              prop: "displayRender",
              type: "(labels: string[]) => ReactNode",
              default: "labels.join(' / ')",
              description:
                "Function to customize how the selected path is shown in the trigger.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction with the component.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the trigger element.",
            },
            {
              prop: "triggerClassName, menuClassName, itemClassName, ...",
              type: "string",
              default: "-",
              description: "Granular styling classes for internal elements.",
            },
            {
              prop: "clearable",
              type: "boolean",
              default: "false",
              description: "Whether the value can be cleared.",
            },
            {
              prop: "loadData",
              type: "(option) => Promise<void>",
              default: "-",
              description: "Callback for lazy loading children options.",
            },
            {
              prop: "startIcon / endIcon",
              type: "ReactNode",
              default: "-",
              description: "Icons to render inside the trigger.",
            },
            {
              prop: "addonBefore / addonAfter",
              type: "ReactNode",
              default: "-",
              description: "Content to render outside the trigger.",
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
              description: "Size of the input trigger.",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "false",
              description: "Error state or error message to display.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="cascader-option-type" className="text-lg font-bold mb-4">
          CascaderOption Type
        </h3>
        <ApiTable
          data={[
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "The display text for the option.",
            },
            {
              prop: "value",
              type: "string | number",
              default: "-",
              description: "Unique identifier for the option.",
            },
            {
              prop: "children",
              type: "CascaderOption[]",
              default: "-",
              description: "Nested options for this node.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether this specific option is disabled.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              default: "-",
              description: "Optional icon to display next to the label.",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <div className="space-y-12">
      <DocSection
        id="theming"
        title="Theming"
        description="Customize the look and feel using CSS variables. Note: Auto-contrast is enabled by default for 'aer' variant and background colors."
      >
        <ThemingExample />
        <CodeBlock
          ts={`/* CSS Variables */`}
          fullCode={`/* Global overrides */
:root {
  --aer-primary: 222.2 47.4% 11.2%;
  --aer-border: 214.3 31.8% 91.4%;
}

/* Scoped overrides */
.custom-cascader {
  --aer-primary: 262.1 83.3% 57.8%; /* Purple focus */
}`}
        />
      </DocSection>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Cascader
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Cascade selection box for browsing and selecting from multi-level
          hierarchical data.
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
              { id: "basic-usage", title: "Basic Usage" },
              { id: "custom-display", title: "Custom Display" },
              { id: "label", title: "Label" },
              { id: "addons", title: "Addons & Icons" },
              { id: "lazy-load", title: "Lazy Loading" },
              { id: "variants", title: "Variants" },
              { id: "sizes", title: "Sizes" },
              { id: "error-state", title: "Error State" },
              { id: "show-last-item", title: "Show Last Item Only" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "cascader-props", title: "Cascader Props" },
              { id: "cascader-option-type", title: "CascaderOption Type" },
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

  function BasicCascaderExample({ options }: { options: any[] }) {
    const [value, setValue] = React.useState<string | number | undefined>(
      undefined
    );
    return (
      <div className="w-full max-w-xs">
        <Cascader
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select Region"
        />
      </div>
    );
  }

  function CustomDisplayExample({ options }: { options: any[] }) {
    const [value, setValue] = React.useState<string | number | undefined>(
      undefined
    );
    return (
      <div className="w-full max-w-xs">
        <Cascader
          options={options}
          value={value}
          onChange={setValue}
          displayRender={(labels) => labels.join(" > ")}
        />
      </div>
    );
  }

  function ShowLastItemExample({ options }: { options: any[] }) {
    const [value, setValue] = React.useState<string | number | undefined>("ny");
    return (
      <div className="w-full max-w-xs">
        <Cascader
          options={options}
          value={value}
          onChange={setValue}
          displayRender={(labels) => labels[labels.length - 1]}
          placeholder="Select City"
        />
      </div>
    );
  }

  function DisabledExample() {
    const options = [
      {
        label: "Enabled Parent",
        value: "1",
        children: [
          { label: "Disabled Child", value: "1-1", disabled: true },
          { label: "Enabled Child", value: "1-2" },
        ],
      },
    ];
    return (
      <div className="w-full max-w-xs space-y-4">
        <Cascader disabled placeholder="Component Disabled" options={[]} />
        <Cascader placeholder="Option Disabled" options={options} />
      </div>
    );
  }

  function RealWorldExample() {
    const categories = [
      {
        label: "Electronics",
        value: "elec",
        children: [
          {
            label: "Computers",
            value: "comp",
            children: [
              { label: "Laptops", value: "laptop" },
              { label: "Desktops", value: "desktop" },
            ],
          },
          { label: "Phones", value: "phone" },
        ],
      },
      {
        label: "Home & Garden",
        value: "home",
        children: [
          { label: "Furniture", value: "furn" },
          { label: "Decor", value: "decor" },
        ],
      },
      {
        label: "Fashion",
        value: "fashion",
        children: [
          { label: "Men", value: "men" },
          { label: "Women", value: "women" },
        ],
      },
    ];

    const [data, setData] = React.useState<{
      name: string;
      category: string | number | undefined;
    }>({ name: "", category: undefined });

    return (
      <div className="w-full max-w-sm p-6 border rounded-lg bg-aer-muted/10 space-y-4">
        <h3 className="font-bold text-lg">Add New Product</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <input
            className="flex h-10 w-full rounded-md border border-aer-border bg-aer-background px-3 py-2 text-sm placeholder:text-aer-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring focus-visible:ring-offset-2"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="e.g. Pro Laptop X1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Cascader
            options={categories}
            value={data.category}
            onChange={(val) => setData({ ...data, category: val })}
            placeholder="Select Category"
            className="w-full"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            onClick={() => alert("Product Saved: " + JSON.stringify(data))}
          >
            Save Product
          </Button>
        </div>
      </div>
    );
  }

  function ThemingExample() {
    return (
      <DocSection
        title="CSS Variables"
        id="css-variables"
        description="Customize cascader appearance using CSS variables."
      >
        <div className="space-y-4">
          <p className="text-sm text-aer-muted-foreground">
            Cascader uses standard Aer Design variables for consistent theming:
          </p>
          <CodeBlock
            ts={`:root {
  --aer-input: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%;
  --aer-background: 0 0% 100%;
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-foreground: 222.2 47.4% 11.2%;
}`}
            fullCode={`/* styles/globals.css */
:root {
  /* Border color */
  --aer-input: 214.3 31.8% 91.4%; 
  
  /* Focus ring color */
  --aer-ring: 221.2 83.2% 53.3%;
  
  /* Background color */
  --aer-background: 0 0% 100%;
  
  /* Primary color for selection/active states */
  --aer-primary: 221.2 83.2% 53.3%;
  
  /* Text color */
  --aer-foreground: 222.2 47.4% 11.2%;
  
  /* Muted background for hover/disabled */
  --aer-muted: 210 40% 96.1%;
}

.dark {
  --aer-input: 217.2 32.6% 17.5%;
  --aer-ring: 217.2 91.2% 59.8%;
  --aer-background: 222.2 84% 4.9%;
}`}
          />
          <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-400">
              <strong>Tip:</strong> Cascader styles are derived from base
              variables, ensuring it automatically matches your theme without
              extra configuration.
            </p>
          </div>
        </div>
      </DocSection>
    );
  }

  function VariantsExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    return (
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          variant="outline"
          placeholder="Outline (Default)"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          variant="filled"
          placeholder="Filled"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          variant="underlined"
          placeholder="Underlined"
        />
      </div>
    );
  }

  function SizesExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    return (
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          size="sm"
          placeholder="Small"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          size="default"
          placeholder="Default"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          size="lg"
          placeholder="Large"
        />
      </div>
    );
  }

  function ErrorExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    return (
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          error
          placeholder="Error (Boolean)"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          error="This field is required"
          placeholder="Error (Message)"
        />
      </div>
    );
  }

  function AddonsExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    return (
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          placeholder="Credit Card"
          startIcon={<span className="text-xs">💳</span>}
          suffix="USD"
        />
        <Cascader
          options={options}
          value={val}
          onChange={setVal}
          placeholder="Website"
          addonBefore="https://"
          addonAfter=".com"
        />
      </div>
    );
  }

  function CascaderLabelExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    const [labelPosition, setLabelPosition] = React.useState<"top" | "left">(
      "top"
    );
    const [required, setRequired] = React.useState(false);
    const [helperText, setHelperText] = React.useState(false);

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

        {/* Example */}
        <div className="max-w-2xl">
          <Cascader
            options={options}
            value={val}
            onChange={setVal}
            label="Region"
            labelPosition={labelPosition}
            required={required}
            helperText={helperText ? "Select your region" : undefined}
          />
        </div>

        {/* Code */}
        <CodeBlock
          ts={`<Cascader
  label="Region"
  labelPosition="${labelPosition}"${required ? "\n  required" : ""}${
            helperText ? '\n  helperText="Select your region"' : ""
          }
  options={options}
  value={value}
  onChange={setValue}
/>`}
        />
      </div>
    );
  }

  function LazyLoadExample() {
    interface Option {
      value: string | number;
      label: string;
      isLeaf?: boolean;
      children?: Option[];
    }

    const [options, setOptions] = React.useState<Option[]>([
      { value: "zhejiang", label: "Zhejiang", isLeaf: false },
      { value: "jiangsu", label: "Jiangsu", isLeaf: false },
    ]);

    const loadData = (selectedOption: any) => {
      const targetOption = selectedOption;

      // Simulate async request
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          targetOption.children = [
            {
              label: `${targetOption.label} Dynamic 1`,
              value: `${targetOption.value}-dynamic1`,
            },
            {
              label: `${targetOption.label} Dynamic 2`,
              value: `${targetOption.value}-dynamic2`,
            },
          ];
          setOptions([...options]);
          resolve();
        }, 1000);
      });
    };

    const [value, setValue] = React.useState<string | number>();

    return (
      <div className="w-full max-w-xs">
        <Cascader
          options={options}
          value={value}
          onChange={setValue}
          loadData={loadData}
          placeholder="Load on demand"
        />
      </div>
    );
  }

  function CascaderStylingExample({ options }: { options: any[] }) {
    const [val, setVal] = React.useState<string | number>();
    return (
      <Cascader
        options={options}
        value={val}
        onChange={setVal}
        className="w-72"
        triggerClassName="border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-300 transition-colors"
        itemClassName="hover:bg-purple-100 hover:text-purple-700 focus:bg-purple-100 focus:text-purple-700 data-[selected=true]:bg-purple-200"
        placeholder="Purple Theme"
      />
    );
  }
}
