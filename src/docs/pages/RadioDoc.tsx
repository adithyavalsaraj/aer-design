import { RadioGroup, RadioItem } from "@/components/Radio";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function RadioDoc() {
  const [flavor, setFlavor] = React.useState("vanilla");

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Mutually exclusive selection control with support for cards and custom layouts."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Radio component allows users to select a single item from a list
            of mutually exclusive options. It is designed to be accessible,
            keyboard navigable, and visually flexible, supporting standard list
            views, grid layouts, and rich content cards.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Accessible</strong> - Full keyboard navigation and ARIA
              support
            </li>
            <li>
              <strong>Card Variant</strong> - Easily create pricing tables or
              rich selection grids
            </li>
            <li>
              <strong>Flexible Layout</strong> - Vertical stacks, horizontal
              rows, or responsive grids
            </li>
            <li>
              <strong>Validation</strong> - Built-in error states for the entire
              group
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Guidance on when to use Radio buttons versus other selection controls."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Few Options (&lt; 5)
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Radio buttons when you have a small list of options and want
              them all visible:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Shipping speed (Standard, Express, Overnight)</li>
              <li>Size selection (S, M, L, XL)</li>
              <li>Yes/No questions</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Rich Comparisons
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use `variant="card"` when options need explanations or visual
              weight:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Subscription tiers (features, price)</li>
              <li>Payment methods (Icon + Name)</li>
              <li>Layout options (Grid vs List)</li>
            </ul>
          </div>

          <div className="md:col-span-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">
              Radio vs Dropdown
            </h4>
            <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
              If you have more than 5-7 options, consider using a{" "}
              <strong>Dropdown</strong> (Select) to save screen space. Radio
              buttons are best when users need to compare options side-by-side.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
        <RadioGroup value={flavor} onChange={setFlavor}>
          <RadioItem value="vanilla" label="Vanilla" />
          <RadioItem value="chocolate" label="Chocolate" />
          <RadioItem value="strawberry" label="Strawberry" />
        </RadioGroup>
        <div className="mt-4 p-2 bg-aer-muted rounded text-sm font-mono border inline-block">
          Selected: {flavor}
        </div>
        <CodeBlock
          ts={`const [val, setVal] = useState("vanilla");\n\n<RadioGroup value={val} onChange={setVal}>\n  <RadioItem value="vanilla" label="Vanilla" />\n  <RadioItem value="chocolate" label="Chocolate" />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\nimport { useState } from "react";\n\nexport default function IceCreamChooser() {\n  const [flavor, setFlavor] = useState("vanilla");\n  \n  return (\n    <RadioGroup value={flavor} onChange={setFlavor}>\n      <RadioItem value="vanilla" label="Vanilla" />\n      <RadioItem value="chocolate" label="Chocolate" />\n    </RadioGroup>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Card Selection"
        id="cards"
        description="Create powerful selection interfaces with the card variant."
      >
        <RadioGroup defaultValue="pro" className="grid gap-4 md:grid-cols-3">
          <RadioItem
            variant="card"
            value="free"
            label="Free Tier"
            description="Up to 3 projects"
          />
          <RadioItem
            variant="card"
            value="pro"
            label="Pro Tier"
            description="Unlimited projects"
          />
          <RadioItem
            variant="card"
            value="cnt"
            label="Enterprise"
            description="Custom solutions"
            disabled
          />
        </RadioGroup>
        <CodeBlock
          ts={`<RadioGroup defaultValue="pro" className="grid grid-cols-3 gap-4">\n  <RadioItem variant="card" value="free" label="Free" description="..." />\n  <RadioItem variant="card" value="pro" label="Pro" description="..." />\n  <RadioItem variant="card" value="ent" label="Enterprise" disabled />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\n\nexport default function CardSelection() {\n  return (\n    <RadioGroup defaultValue="pro" className="grid gap-4 md:grid-cols-3">\n      <RadioItem variant="card" value="free" label="Free" description="3 Projects" />\n      <RadioItem variant="card" value="pro" label="Pro" description="Unlimited" />\n      <RadioItem variant="card" value="ent" label="Enterprise" description="Custom" disabled />\n    </RadioGroup>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="flex items-start gap-x-8">
          <RadioGroup size="sm" defaultValue="1">
            <RadioItem value="1" label="Small Radio" />
          </RadioGroup>
          <RadioGroup size="default" defaultValue="1">
            <RadioItem value="1" label="Default Radio" />
          </RadioGroup>
          <RadioGroup size="lg" defaultValue="1">
            <RadioItem value="1" label="Large Radio" />
          </RadioGroup>
        </div>
        <CodeBlock
          ts={`<RadioGroup size="sm">\n  <RadioItem value="1" label="Small" />\n</RadioGroup>`}
        />
      </DocSection>

      <DocSection
        title="Layout Variants"
        id="layout"
        description="Radio items can be positioned and aligned just like checkboxes."
      >
        <RadioGroup
          defaultValue="right"
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          <RadioItem
            value="right"
            label="Right (Default)"
            labelPosition="right"
          />
          <RadioItem value="left" label="Left Side" labelPosition="left" />
          <RadioItem value="top" label="Top Label" labelPosition="top" />
          <RadioItem
            value="bottom"
            label="Bottom Label"
            labelPosition="bottom"
          />
        </RadioGroup>
        <CodeBlock
          ts={`<RadioGroup className="grid grid-cols-4">\n  <RadioItem label="Right" labelPosition="right" />\n  <RadioItem label="Left" labelPosition="left" />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\n\nexport default function Layouts() {\n  return (\n    <RadioGroup defaultValue="right" className="grid grid-cols-2 gap-8">\n      <RadioItem value="right" label="Right" labelPosition="right" />\n      <RadioItem value="left" label="Left" labelPosition="left" />\n      <RadioItem value="top" label="Top" labelPosition="top" />\n      <RadioItem value="bottom" label="Bottom" labelPosition="bottom" />\n    </RadioGroup>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Vertical Alignment"
        id="alignment"
        description="Align radio buttons against complex content."
      >
        <RadioGroup
          defaultValue="1"
          className="bg-aer-muted/5 p-6 rounded-aer-xl border space-y-4"
        >
          <RadioItem
            value="1"
            align="start"
            label="Start Aligned"
            description="The radio button stays at the top, even with this very long description text that wraps to a second line."
          />
          <div className="h-px bg-aer-border/50" />
          <RadioItem
            value="2"
            align="center"
            label="Center Aligned"
            description="Best for short, balanced text."
          />
          <div className="h-px bg-aer-border/50" />
          <RadioItem
            value="3"
            align="end"
            label="End Aligned"
            description="Aligns to the bottom of the container."
          />
        </RadioGroup>
        <CodeBlock
          ts={`<RadioGroup defaultValue="1" className="space-y-4">\n  <RadioItem align="start" label="Start" description="..." />\n  <RadioItem align="center" label="Center" description="..." />\n  <RadioItem align="end" label="End" description="..." />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\n\nexport default function Alignment() {\n  return (\n    <RadioGroup defaultValue="1" className="space-y-4">\n      <RadioItem value="1" align="start" label="Start" description="Top aligned text" />\n      <RadioItem value="2" align="center" label="Center" description="Center aligned text" />\n      <RadioItem value="3" align="end" label="End" description="Bottom aligned text" />\n    </RadioGroup>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Precise control over styling with element-specific className props."
      >
        <div className="space-y-6 max-w-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              className - Root container (spacing)
            </p>
            <RadioGroup defaultValue="1">
              <RadioItem
                className="mb-4 p-4 border rounded-xl bg-aer-primary/5"
                value="1"
                label="Spaced and styled container"
              />
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              radioClassName - Custom indicator
            </p>
            <RadioGroup defaultValue="1">
              <RadioItem
                radioClassName="bg-purple-600 border-purple-600"
                dotClassName="bg-white"
                value="1"
                label="Purple radio with white dot"
              />
            </RadioGroup>
          </div>
        </div>
        <CodeBlock
          ts={`<RadioItem className="mb-4 p-4 border rounded-xl" label="Root style" />\n\n<RadioItem \n  radioClassName="bg-purple-600 border-purple-600" \n  dotClassName="bg-white" \n  label="Custom colors" \n/>`}
        />
      </DocSection>

      <DocSection title="Validation" id="validation">
        <RadioGroup
          defaultValue="1"
          error="Please make a selection to proceed."
        >
          <RadioItem value="1" label="Option One" />
          <RadioItem value="2" label="Option Two" />
          <RadioItem value="3" label="Option Three" />
        </RadioGroup>
        <CodeBlock
          ts={`<RadioGroup error="Please make a selection">\n  <RadioItem value="1" label="Option 1" />\n  <RadioItem value="2" label="Option 2" />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\n\nexport default function Validation() {\n  return (\n    <RadioGroup error="Selection required">\n      <RadioItem value="1" label="Option 1" />\n      <RadioItem value="2" label="Option 2" />\n    </RadioGroup>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Real World Example" id="real-world-validation">
        <RealWorldExample />
        <CodeBlock
          ts={`const [value, setValue] = useState("");\nconst [touched, setTouched] = useState(false);\nconst isInvalid = touched && !value;\n\n<RadioGroup \n  error={isInvalid ? "Please select a plan" : undefined}\n  value={value}\n  onChange={(val) => {\n    setValue(val);\n    setTouched(true);\n  }}\n>\n  <RadioItem value="free" label="Free Tier" required />\n  <RadioItem value="pro" label="Pro Tier" required />\n</RadioGroup>`}
          fullCode={`import { RadioGroup, RadioItem } from "aer-design";\nimport { useState } from "react";\n\nexport default function PlanSelection() {\n  const [value, setValue] = useState("");\n  const [touched, setTouched] = useState(false);\n  const isInvalid = touched && !value;\n\n  return (\n    <div className="max-w-md space-y-4 p-6 border rounded-xl">\n      <RadioGroup \n        error={isInvalid ? "Please select a plan" : undefined}\n        value={value}\n        onChange={(val) => {\n          setValue(val);\n          setTouched(true);\n        }}\n      >\n        <RadioItem value="free" label="Free Tier" required />\n        <RadioItem value="pro" label="Pro Tier" required />\n      </RadioGroup>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const isInvalid = touched && !value;

    const handleSubmit = () => {
      setTouched(true);
      if (value) alert(`Selected: ${value}`);
    };

    return (
      <div className="max-w-md space-y-6 p-6 border rounded-aer-xl bg-aer-muted/5">
        <div className="space-y-4">
          <h4 className="font-semibold">Select Plan</h4>
          <RadioGroup
            error={isInvalid ? "Please select a plan to continue" : undefined}
            value={value}
            onChange={(val) => {
              setValue(val);
              setTouched(true);
            }}
          >
            {/* required prop adds visual asterisk */}
            <RadioItem
              value="free"
              label="Free Tier"
              description="Forever free"
              required
            />
            <RadioItem
              value="pro"
              label="Pro Tier"
              description="$12/month"
              required
            />
            <RadioItem
              value="enterprise"
              label="Enterprise"
              description="Custom pricing"
              required
            />
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-aer-border/50">
          <div className="text-xs text-aer-muted-foreground font-mono">
            Valid: {(!isInvalid).toString()} • Touched: {touched ? "Yes" : "No"}
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-aer-primary text-white text-sm font-medium rounded-md hover:bg-aer-primary/90 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-12">
      <div>
        <h4 id="radio-group-props" className="text-lg font-bold mb-4">
          RadioGroup Props
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The container component that manages the state of the radio buttons.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "The controlled value of the selected radio item.",
            },
            {
              prop: "defaultValue",
              type: "string",
              default: "-",
              description: "The initial value for uncontrolled usage.",
            },
            {
              prop: "onChange",
              type: "(value: string) => void",
              default: "-",
              description: "Callback fired when the selection changes.",
            },
            {
              prop: "name",
              type: "string",
              default: "-",
              description:
                "Native input name attribute. Useful for form submission.",
            },
            {
              prop: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'vertical'",
              description: "Layout direction (affects keyboard navigation).",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all radio items in the group.",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description: "Indicates an error state for the group.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the group container.",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "'default'",
              description: "Size of all radio items in the group.",
            },
          ]}
        />
      </div>
      <div>
        <h4 id="radio-item-props" className="text-lg font-bold mb-4">
          RadioItem Props
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The individual radio button component.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Unique value for this item.",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description: "Primary label text.",
            },
            {
              prop: "description",
              type: "ReactNode",
              default: "-",
              description: "Helper text displayed below the label.",
            },
            {
              prop: "variant",
              type: "'default' | 'card'",
              default: "'default'",
              description:
                "Visual style variant. 'card' renders a large clickable box.",
            },
            {
              prop: "labelPosition",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description:
                "Position of the label relative to the radio circle.",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: "Vertical alignment for multiline labels.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables this specific item.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes for the root container element. Use for spacing (margin, padding) and layout.",
            },
            {
              prop: "radioClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the custom radio circle indicator.",
            },
            {
              prop: "dotClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the inner selected dot.",
            },
            {
              prop: "labelClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the label text.",
            },
            {
              prop: "descriptionClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the description text.",
            },
            {
              prop: "contentClassName",
              type: "string",
              default: "-",
              description:
                "CSS classes for the text container (label + description).",
            },
            {
              prop: "errorClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the error message text.",
            },
            {
              prop: "id",
              type: "string",
              default: "-",
              description: "HTML ID attribute.",
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
            <h4 className="font-semibold mb-2">Keyboard Navigation</h4>
            <p className="text-sm text-aer-muted-foreground">
              Radio groups support full keyboard navigation. Users can Tab into
              the group and use Arrow keys to change selection. Ensure you set
              the{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                orientation
              </code>{" "}
              prop correctly if you are using a horizontal layout.
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
      description="Customize radio appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Radio uses the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  --aer-border: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%;
}`}
          fullCode={`/* styles/globals.css */
:root {
  /* Checked Circle Background & Border */
  --aer-primary: 221.2 83.2% 53.3%;
  
  /* Inner Dot Color */
  --aer-primary-foreground: 210 40% 98%;
  
  /* Unchecked Border */
  --aer-border: 214.3 31.8% 91.4%;
  
  /* Focus Ring */
  --aer-ring: 221.2 83.2% 53.3%;
  
  /* Card Variant Hover */
  --aer-muted: 210 40% 96.1%;
}

.dark {
  --aer-primary: 217.2 91.2% 59.8%;
  --aer-primary-foreground: 222.2 47.4% 11.2%;
  --aer-border: 217.2 32.6% 17.5%;
  --aer-ring: 217.2 91.2% 59.8%;
  --aer-muted: 217.2 32.6% 17.5%;
}`}
        />
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-400">
              <strong>Tip:</strong> The Card variant uses{" "}
              <code>--aer-muted</code> for its hover state.
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
          Radio Group
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A set of checkable buttons—known as radio buttons—where no more than
          one of the buttons can be checked at a time.
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
              { id: "cards", title: "Card Selection" },
              { id: "sizes", title: "Sizes" },
              { id: "layout", title: "Layout Variants" },
              { id: "alignment", title: "Vertical Alignment" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "validation", title: "Validation" },
              { id: "real-world-validation", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "radio-group-props", title: "RadioGroup Props" },
              { id: "radio-item-props", title: "RadioItem Props" },
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
