import { Checkbox, CheckboxGroup } from "@/components/Checkbox";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function CheckboxDoc() {
  const [checked, setChecked] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(["opt1"]);

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Versatile selection control with support for groups, cards, and custom layouts."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Checkbox component allows users to select one or more items from
            a set. It goes far beyond the native input by offering rich "Card"
            variants, built-in group management, indeterminate states, and
            flexible label positioning.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Checkbox Groups</strong> - Manage array-based selection
              with ease
            </li>
            <li>
              <strong>Card Variant</strong> - Turn checkboxes into rich,
              selectable cards
            </li>
            <li>
              <strong>Label Positioning</strong> - Place labels on any side
              (top, right, bottom, left)
            </li>
            <li>
              <strong>Tri-state Support</strong> - Full support for
              indeterminate (partial) selection
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right configuration for your selection needs."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Single Options
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use a standalone Checkbox for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>"Accept Terms" agreements</li>
              <li>"Remember Me" toggles</li>
              <li>Enabling/disabling a specific feature</li>
              <li>Binary choices (Yes/No)</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Multiple Choices
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use CheckboxGroup for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Category filters (e.g., e-commerce)</li>
              <li>Permission assignment (e.g., Read, Write, Delete)</li>
              <li>User lists</li>
              <li>Any multi-select scenario</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Rich Selection
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use `variant="card"` for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Pricing plan selection</li>
              <li>Payment method options</li>
              <li>Feature add-ons</li>
              <li>Prominent configuration choices</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
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
            <Checkbox
              className="mb-8 p-4 border rounded-xl bg-aer-primary/5"
              label="Spaced and styled container"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              checkboxClassName - Custom indicator
            </p>
            <Checkbox
              checkboxClassName="bg-purple-600 border-purple-600 rounded-full"
              label="Rounded purple checkbox"
              defaultChecked
            />
          </div>
        </div>
        <CodeBlock
          ts={`// Root container styling
<Checkbox className="mb-8 p-4 border rounded-xl" label="Root style" />

// Indicator styling
<Checkbox 
  checkboxClassName="bg-purple-600 border-purple-600 rounded-full" 
  label="Custom circle" 
  defaultChecked 
/>`}
          fullCode={`import { Checkbox } from "aer-design";

export default function GranularStyling() {
  return (
    <div className="space-y-6">
      <Checkbox 
        className="mb-8 p-4 border rounded-xl bg-aer-primary/5" 
        label="Spaced and styled container" 
      />
      <Checkbox 
        checkboxClassName="bg-purple-600 border-purple-600 rounded-full" 
        label="Rounded purple checkbox" 
        defaultChecked 
      />
    </div>
  );
}`}
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

      <DocSection title="Real World Example" id="real-world-validation">
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
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the individual Checkbox component.
        </p>
        <ApiTable
          data={[
            {
              prop: "checked",
              type: "boolean | 'indeterminate'",
              default: "false",
              description:
                "The controlled checked state. 'indeterminate' shows a dash.",
            },
            {
              prop: "defaultChecked",
              type: "boolean | 'indeterminate'",
              default: "false",
              description: "The default initial state for uncontrolled usage.",
            },
            {
              prop: "onCheckedChange",
              type: "(checked: boolean | 'indeterminate') => void",
              default: "-",
              description: "Callback fired when the state changes.",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "-",
              description:
                "The primary label text displayed next to the checkbox.",
            },
            {
              prop: "description",
              type: "ReactNode",
              default: "-",
              description: "Additional helper text displayed below the label.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction and dims the component.",
            },
            {
              prop: "required",
              type: "boolean",
              default: "false",
              description:
                "Marks the field as required (adds an asterisk to label).",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description:
                "Indicates an error state. Pass a string to display an error message.",
            },
            {
              prop: "variant",
              type: "'default' | 'card' | 'aer'",
              default: "'default'",
              description:
                "Visual style variant. 'card' renders a large clickable box. 'aer' applies glassmorphism.",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "'default'",
              description: "Size of the checkbox indicator.",
            },
            {
              prop: "labelPosition",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description: "Position of the label relative to the checkbox.",
            },
            {
              prop: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description:
                "Vertical alignment of the checkbox relative to multiline labels.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes for the root container element. Use for spacing (margin, padding) and layout.",
            },
            {
              prop: "checkboxClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the custom checkbox indicator box.",
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
              prop: "iconClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the check/indeterminate icon.",
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
              description:
                "HTML ID attribute. If not provided, one is generated automatically.",
            },
          ]}
        />
      </div>

      <div>
        <h4 id="checkbox-group-props" className="text-lg font-bold mb-4">
          CheckboxGroupProps
        </h4>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Props for the CheckboxGroup component, used for managing multiple
          selections.
        </p>
        <ApiTable
          data={[
            {
              prop: "options",
              type: "CheckboxOption[]",
              default: "[]",
              description:
                "Array of options to display. Each option has label, value, etc.",
            },
            {
              prop: "value",
              type: "string[]",
              default: "[]",
              description: "Controlled array of selected values.",
            },
            {
              prop: "defaultValue",
              type: "string[]",
              default: "[]",
              description: "Default initial selected values.",
            },
            {
              prop: "onChange",
              type: "(value: string[]) => void",
              default: "-",
              description:
                "Callback fired when selection changes with the new array of values.",
            },
            {
              prop: "label",
              type: "ReactNode",
              default: "'Select All'",
              description:
                "Title/Legend for the group. Acts as 'Select All' if enabled.",
            },
            {
              prop: "enableSelectAll",
              type: "boolean",
              default: "true",
              description:
                "Whether to render the parent 'Select All' checkbox.",
            },
            {
              prop: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'vertical'",
              description: "Layout direction of the options list.",
            },
            {
              prop: "listClassName",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the options container.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all checkboxes in the group.",
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
            <h4 className="font-semibold mb-2">Indeterminate State</h4>
            <p className="text-sm text-aer-muted-foreground">
              The{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                indeterminate
              </code>{" "}
              state is purely visual. It's strictly controlled via the{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                checked
              </code>{" "}
              prop (set to "indeterminate"). It's commonly used in "Select All"
              logic implementation.
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
      description="Customize checkbox appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Checkbox uses the following CSS variables from your theme:
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
  /* Checked Background */
  --aer-primary: 221.2 83.2% 53.3%;
  
  /* Checkmark Color */
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
              <code>--aer-muted</code> for its hover state and background.
              Ensure this variable is defined in your theme.
            </p>
          </div>
          <div className="p-4 bg-aer-muted/5 border border-aer-border rounded-lg">
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
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "basic", title: "Basic Usage" },
              { id: "checkbox-group", title: "Checkbox Group" },
              { id: "states", title: "States" },
              { id: "cards", title: "Card Variant" },
              { id: "sizes", title: "Sizes" },
              { id: "positioning", title: "Label Positioning" },
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
              { id: "checkbox-props", title: "CheckboxProps" },
              { id: "checkbox-group-props", title: "CheckboxGroupProps" },
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
