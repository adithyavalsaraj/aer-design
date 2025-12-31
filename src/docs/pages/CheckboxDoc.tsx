import { Checkbox, CheckboxGroup } from "@/components/Checkbox";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function CheckboxDoc() {
  const [checked, setChecked] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(["opt1"]);

  const overview = (
    <div className="space-y-12">
      <DocSection title="Basic" id="basic">
        <Checkbox
          label="Accept terms and conditions"
          checked={checked}
          onCheckedChange={(c) => setChecked(c === true)}
        />
        <CodeBlock
          ts={`<Checkbox label="Accept terms and conditions" />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function Example() {\n  return <Checkbox label="Accept terms and conditions" />;\n}`}
        />
      </DocSection>

      <DocSection
        title="Checkbox Group"
        id="checkbox-group"
        description="Manage a group of checkboxes with an optional 'Select All' parent."
      >
        <CheckboxGroup
          label="Select Options"
          options={[
            { label: "Option 1", value: "opt1" },
            { label: "Option 2", value: "opt2" },
            { label: "Option 3", value: "opt3" },
          ]}
          value={selectedGroup}
          onChange={setSelectedGroup}
        />
        <CodeBlock
          ts={`<CheckboxGroup\n  label="Select Options"\n  options={[{ label: "Option 1", value: "opt1" }, ...]}\n  value={selected}\n  onChange={setSelected}\n/>`}
          fullCode={`import { CheckboxGroup } from "aer-design";\nimport { useState } from "react";\n\nexport default function GroupExample() {\n  const [selected, setSelected] = useState(["opt1"]);\n\n  return (\n    <CheckboxGroup\n      label="Select Options"\n      options={[\n        { label: "Option 1", value: "opt1" },\n        { label: "Option 2", value: "opt2" },\n        { label: "Option 3", value: "opt3" },\n      ]}\n      value={selected}\n      onChange={setSelected}\n    />\n  );\n}`}
        />
      </DocSection>

      <DocSection title="States" id="states">
        <div className="flex flex-col gap-4">
          <Checkbox label="Disabled Unchecked" disabled />
          <Checkbox label="Disabled Checked" disabled defaultChecked />
          <Checkbox label="Indeterminate" checked="indeterminate" />
        </div>
        <CodeBlock
          ts={`<Checkbox disabled />\n<Checkbox disabled defaultChecked />\n<Checkbox checked="indeterminate" />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function States() {\n  return (\n    <div className="flex flex-col gap-4">\n      <Checkbox disabled label="Disabled" />\n      <Checkbox disabled defaultChecked label="Disabled Checked" />\n      <Checkbox checked="indeterminate" label="Indeterminate" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Card Variant"
        id="cards"
        description="Turn checkboxes into selectable cards."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Checkbox
            variant="card"
            label="Standard Plan"
            description="$10/month"
            defaultChecked
          />
          <Checkbox variant="card" label="Pro Plan" description="$20/month" />
        </div>
        <CodeBlock
          ts={`<Checkbox variant="card" label="Standard Plan" description="$10/mo" />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function Cards() {\n  return (\n    <div className="grid gap-4 md:grid-cols-2">\n      <Checkbox variant="card" label="Standard" description="$10/mo" defaultChecked />\n      <Checkbox variant="card" label="Pro" description="$20/mo" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="flex items-end gap-x-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Small
            </span>
            <Checkbox size="sm" label="Small Checkbox" defaultChecked />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Default
            </span>
            <Checkbox size="default" label="Default Checkbox" defaultChecked />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Large
            </span>
            <Checkbox size="lg" label="Large Checkbox" defaultChecked />
          </div>
        </div>
        <CodeBlock
          ts={`<Checkbox size="sm" label="Small" />\n<Checkbox size="default" label="Default" />\n<Checkbox size="lg" label="Large" />`}
        />
      </DocSection>

      <DocSection
        title="Label Positioning"
        id="positioning"
        description="Position the label on any side of the checkbox."
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Checkbox
            label="Right (Default)"
            labelPosition="right"
            defaultChecked
          />
          <Checkbox label="Left" labelPosition="left" defaultChecked />
          <Checkbox label="Top" labelPosition="top" defaultChecked />
          <Checkbox label="Bottom" labelPosition="bottom" defaultChecked />
        </div>
        <CodeBlock
          ts={`<Checkbox label="Right" labelPosition="right" />\n<Checkbox label="Left" labelPosition="left" />\n<Checkbox label="Top" labelPosition="top" />\n<Checkbox label="Bottom" labelPosition="bottom" />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function Positioning() {\n  return (\n    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">\n      <Checkbox label="Right" labelPosition="right" defaultChecked />\n      <Checkbox label="Left" labelPosition="left" defaultChecked />\n      <Checkbox label="Top" labelPosition="top" defaultChecked />\n      <Checkbox label="Bottom" labelPosition="bottom" defaultChecked />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Vertical Alignment"
        id="alignment"
        description="Align the checkbox relative to multiline text."
      >
        <div className="space-y-6 max-w-md p-6 border rounded-aer-xl bg-aer-muted/5">
          <Checkbox
            align="start"
            label="align='start'"
            labelPosition="right"
            defaultChecked
            description="Perfect for long legal text or descriptions that wrap to multiple lines. The checkbox stays fixed at the top."
          />
          <div className="border-t border-dashed my-4" />
          <Checkbox
            align="center"
            label="align='center'"
            labelPosition="right"
            defaultChecked
            description="Use center alignment for simple 1-2 line items where you want perfect symmetry."
          />
          <div className="border-t border-dashed my-4" />
          <Checkbox
            align="end"
            label="align='end'"
            labelPosition="right"
            defaultChecked
            description="Bottom alignment is rarer but supported if your design system specifically calls for it."
          />
        </div>
        <CodeBlock
          ts={`<Checkbox align="start" label="..." description="..." />\n<Checkbox align="center" label="..." description="..." />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function Alignment() {\n  return (\n    <div className="space-y-6 max-w-md">\n      <Checkbox \n        align="start" \n        label="Start Aligned" \n        description="Checkbox stays at top of long text." \n      />\n      <Checkbox \n        align="center" \n        label="Center Aligned" \n        description="Checkbox centers with text." \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Validation" id="validation">
        <div className="flex flex-col gap-4">
          <Checkbox
            label="Error State"
            error="This field is required"
            defaultChecked
          />
        </div>
        <CodeBlock
          ts={`<Checkbox label="Agree to terms" error="This field is required" />`}
          fullCode={`import { Checkbox } from "aer-design";\n\nexport default function Validation() {\n  return <Checkbox label="Agree to terms" error="This field is required" />;\n}`}
        />
      </DocSection>

      <DocSection title="Real World" id="real-world-validation">
        <RealWorldExample />
        <CodeBlock
          ts={`const [checked, setChecked] = useState(false);\nconst [touched, setTouched] = useState(false);\nconst isInvalid = touched && !checked;\n\n<Checkbox \n  label="I accept the Terms of Service"\n  required\n  checked={checked}\n  onCheckedChange={(c) => {\n    setChecked(c === true);\n    setTouched(true);\n  }}\n  error={isInvalid ? "You must accept the terms" : undefined}\n/>`}
          fullCode={`import { Checkbox } from "aer-design";\nimport { useState } from "react";\n\nexport default function TermsAgreement() {\n  const [checked, setChecked] = useState(false);\n  const [touched, setTouched] = useState(false);\n  const isInvalid = touched && !checked;\n\n  return (\n    <div className="max-w-md space-y-4 p-6 border rounded-xl">\n      <h4 className="font-semibold">Review & Accept</h4>\n      <Checkbox \n        label="I accept the Terms of Service"\n        required\n        checked={checked}\n        onCheckedChange={(c) => {\n          setChecked(c === true);\n          setTouched(true);\n        }}\n        error={isInvalid ? "You must accept the terms" : undefined}\n      />\n      <div className="text-xs text-muted-foreground">\n        Status: {isInvalid ? "Error" : "Valid"}\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [checked, setChecked] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const isInvalid = touched && !checked;

    return (
      <div className="max-w-md space-y-6 p-6 border rounded-aer-xl bg-aer-muted/5">
        <div className="space-y-4">
          <h4 className="font-semibold">Review & Accept</h4>
          <p className="text-sm text-aer-muted-foreground">
            Please review the terms before creating your account.
          </p>

          <Checkbox
            label="I accept the Terms of Service and Privacy Policy"
            required // Adds red asterisk
            checked={checked}
            onCheckedChange={(c) => {
              setChecked(c === true);
              setTouched(true);
            }}
            error={isInvalid ? "You must accept the terms" : undefined}
          />

          <Checkbox
            label="Subscribe to newsletter"
            description="Optional updates about our products"
          />
        </div>

        <div className="pt-4 border-t border-aer-border/50 text-xs text-aer-muted-foreground font-mono">
          Valid: {(!isInvalid).toString()} • Touched: {touched ? "Yes" : "No"}
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-12">
      <div>
        <h4 id="checkbox-props" className="text-lg font-bold mb-4">
          CheckboxProps
        </h4>
        <ApiTable
          data={[
            {
              prop: "checked",
              type: "boolean | 'indeterminate'",
              default: "false",
              description: "Checked state",
            },
            {
              prop: "onCheckedChange",
              type: "(checked: boolean | 'indeterminate') => void",
              default: "-",
              description: "Callback when state changes",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description: "Primary label text",
            },
            {
              prop: "labelPosition",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description: "Where the label sits relative to the box",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: "Vertical alignment for multiline content",
            },
            {
              prop: "variant",
              type: "'default' | 'card'",
              default: "'default'",
              description: "Visual style variant",
            },
            {
              prop: "description",
              type: "ReactNode",
              default: "-",
              description: "Secondary helper text",
            },
            {
              prop: "contentClassName",
              type: "string",
              default: "-",
              description: "Class for the label/description container",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction",
            },
            {
              prop: "required",
              type: "boolean",
              default: "false",
              description: "Marks as required (adds asterisk)",
            },
            {
              prop: "id",
              type: "string",
              default: "-",
              description: "HTML ID attribute",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description: "Shows error styling/message",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "'default' (or global config)",
              description: "Size of the checkbox",
            },
          ]}
        />
      </div>

      <div>
        <h4 id="checkbox-group-props" className="text-lg font-bold mb-4">
          CheckboxGroupProps
        </h4>
        <ApiTable
          data={[
            {
              prop: "options",
              type: "CheckboxOption[]",
              default: "-",
              description: "Array of options to display",
            },
            {
              prop: "value",
              type: "string[]",
              default: "[]",
              description: "Array of selected values",
            },
            {
              prop: "onChange",
              type: "(value: string[]) => void",
              default: "-",
              description: "Callback when selection changes",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "'Select All'",
              description: "Title for the group / parent checkbox",
            },
            {
              prop: "enableSelectAll",
              type: "boolean",
              default: "true",
              description: "Whether to show the parent 'Select All' checkbox",
            },
            {
              prop: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'vertical'",
              description: "Layout direction of the options",
            },
            {
              prop: "listClassName",
              type: "string",
              default: "-",
              description: "Class name for the options container",
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
      description="Customize checkbox appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {\n  --aer-primary: 240 5.9% 10%;\n  --aer-ring: 240 5.9% 10%;\n}`}
        fullCode={`/* app.css */\n:root {\n  --aer-primary: 240 5.9% 10%;\n  --aer-ring: 240 5.9% 10%;\n}`}
      />
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Checkbox
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Interactive control to toggle between checked and unchecked states,
          featuring advanced layout capabilities and group management.
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
              { id: "checkbox-group", title: "Checkbox Group" },
              { id: "states", title: "States" },
              { id: "cards", title: "Card Variant" },
              { id: "sizes", title: "Sizes" },
              { id: "positioning", title: "Label Positioning" },
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
              { id: "checkbox-props", title: "CheckboxProps" },
              { id: "checkbox-group-props", title: "CheckboxGroupProps" },
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
