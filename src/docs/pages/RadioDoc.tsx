import { RadioGroup, RadioItem } from "@/components/Radio";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function RadioDoc() {
  const [flavor, setFlavor] = React.useState("vanilla");

  const overview = (
    <div className="space-y-12">
      <DocSection title="Basic" id="basic">
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

      <DocSection title="Real World" id="real-world-validation">
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
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Controlled value",
            },
            {
              prop: "defaultValue",
              type: "string",
              default: "-",
              description: "Initial value (uncontrolled)",
            },
            {
              prop: "onChange",
              type: "(value: string) => void",
              default: "-",
              description: "Change handler",
            },
            {
              prop: "name",
              type: "string",
              default: "-",
              description: "Native input name attribute",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable entire group",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "'default' (or global config)",
              description: "Size of all radio items in group",
            },
          ]}
        />
      </div>
      <div>
        <h4 id="radio-item-props" className="text-lg font-bold mb-4">
          RadioItem Props
        </h4>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Value of this item",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description: "Primary label text",
            },
            {
              prop: "description",
              type: "ReactNode",
              default: "-",
              description: "Helper text",
            },
            {
              prop: "variant",
              type: "'default' | 'card'",
              default: "'default'",
              description: "Card style variant",
            },
            {
              prop: "labelPosition",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description: "Label placement",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: "Vertical alignment",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the item",
            },
            {
              prop: "contentClassName",
              type: "string",
              default: "-",
              description: "Class for label/description container",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description: "Error state for individual item",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "inherited",
              description: "Override size for specific item",
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
      description="Customize radio appearance using CSS variables."
    >
      <CodeBlock
        // css
        ts={`:root {\n  --aer-primary: 240 5.9% 10%;\n  --aer-ring: 240 5.9% 10%;\n}`}
        fullCode={`/* app.css */\n:root {\n  --aer-primary: 240 5.9% 10%;\n  --aer-ring: 240 5.9% 10%;\n}`}
      />
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
              { id: "basic", title: "Basic" },
              { id: "cards", title: "Card Selection" },
              { id: "sizes", title: "Sizes" },
              { id: "layout", title: "Layout Variants" },
              { id: "alignment", title: "Vertical Alignment" },
              { id: "validation", title: "Validation" },
              { id: "real-world-validation", title: "Real World" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "radio-group-props", title: "RadioGroup Props" },
              { id: "radio-item-props", title: "RadioItem Props" },
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
