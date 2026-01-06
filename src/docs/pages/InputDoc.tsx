import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import {
  EmailInput,
  Input,
  MaskedInput,
  PasswordInput,
  PhoneInput,
} from "@/components/Input";
import { RadioGroup, RadioItem } from "@/components/Radio";
import { CreditCard, Globe, Search } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

function LabelExample() {
  const [labelPosition, setLabelPosition] = React.useState<"top" | "left">(
    "top"
  );
  const [required, setRequired] = React.useState(false);
  const [helperText, setHelperText] = React.useState(false);

  return (
    <div className="space-y-6">
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
        <Input
          label="Username"
          labelPosition={labelPosition}
          required={required}
          helperText={helperText ? "Enter your username" : undefined}
          placeholder="johndoe"
        />
      </div>

      {/* Code */}
      <CodeBlock
        ts={`<Input
  label="Username"
  labelPosition="${labelPosition}"${required ? "\n  required" : ""}${
          helperText ? '\n  helperText="Enter your username"' : ""
        }
  placeholder="johndoe"
/>`}
      />
    </div>
  );
}

export function InputDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Flexible text input component for collecting user data."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Input component is a highly customizable text input with support
            for various input types, icons, prefixes, suffixes, and validation
            states. It's designed to handle everything from simple text fields
            to complex formatted inputs.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>3 visual variants</strong> (outline, filled, underlined)
              for different design aesthetics
            </li>
            <li>
              <strong>Specialized inputs</strong> for email, password, and phone
              with built-in validation
            </li>
            <li>
              <strong>Pattern masking</strong> for credit cards, dates, and
              custom formats
            </li>
            <li>
              <strong>Label positioning</strong> with top/left alignment options
            </li>
            <li>
              <strong>Icons and addons</strong> for enhanced visual context
            </li>
            <li>
              <strong>Full accessibility</strong> with proper ARIA attributes
              and keyboard support
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right input variant and features for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Standard Inputs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use basic{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                Input
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Name, address, and general text fields</li>
              <li>Search boxes with icon indicators</li>
              <li>Simple form inputs without special formatting</li>
              <li>Custom input types (number, date, etc.)</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Specialized Inputs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                PasswordInput
              </code>
              ,{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                EmailInput
              </code>
              , or{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                PhoneInput
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Login and registration forms</li>
              <li>Password fields with show/hide toggle</li>
              <li>Email validation with proper formatting</li>
              <li>Phone numbers with country codes</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Masked Inputs
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                MaskedInput
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Credit card numbers (#### #### #### ####)</li>
              <li>Dates and times (DD/MM/YYYY, HH:MM)</li>
              <li>Phone numbers with specific formats</li>
              <li>Custom patterns (SSN, license plates, etc.)</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Basic Usage"
        id="basic"
        description="Simple text inputs for common use cases."
      >
        <div className="max-w-sm space-y-4">
          <Input placeholder="Enter your full name" />
          <Input disabled placeholder="Account restricted" />
        </div>
        <CodeBlock
          ts={`<Input placeholder="Enter your full name" />\n<Input disabled placeholder="Account restricted" />`}
          js={`<Input placeholder="Enter your full name" />\n<Input disabled placeholder="Account restricted" />`}
          fullCode={`import { Input, Button } from "aer-design";\nimport { User, Lock } from "lucide-react";\n\nexport default function LoginForm() {\n  return (\n    <div className="max-w-md space-y-6 p-8 bg-zinc-900 rounded-2xl border border-white/5">\n      <h2 className="text-xl font-bold text-white mb-2">Welcome Back</h2>\n      <div className="space-y-4">\n        <Input \n          startIcon={<User />} \n          placeholder="Email address" \n          type="email" \n        />\n        <Input \n          startIcon={<Lock />} \n          placeholder="Password" \n          type="password" \n        />\n        <Button variant="aer" className="w-full">Sign In</Button>\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Visual Variants"
        id="variants"
        description="Three distinct visual styles for different design aesthetics."
      >
        <div className="max-w-sm space-y-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Outline (Default)
            </label>
            <Input variant="outline" placeholder="Outline Style" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Filled</label>
            <Input variant="filled" placeholder="Filled Style" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Underlined
            </label>
            <Input variant="underlined" placeholder="Underlined Style" />
          </div>
        </div>
        <CodeBlock
          ts={`<Input variant="outline" placeholder="Outline" />\n<Input variant="filled" placeholder="Filled" />\n<Input variant="underlined" placeholder="Underlined" />`}
          fullCode={`import { Input } from "aer-design";\n\nexport default function VariantExample() {\n  return (\n    <div className="max-w-sm space-y-6">\n      <Input variant="outline" placeholder="Outline (Default)" />\n      <Input variant="filled" placeholder="Filled" />\n      <Input variant="underlined" placeholder="Underlined" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="The Aer Variant"
        id="aer-variant"
        description="Premium glassmorphism effect for modern, high-end interfaces."
      >
        <div className="aer-vibrant-container dark">
          <div className="aer-vibrant-bg" />
          <div className="aer-vibrant-blob w-40 h-40 bg-sky-500/30 top-1/4 left-1/3" />
          <div className="aer-vibrant-blob w-40 h-40 bg-blue-500/30 bottom-1/4 right-1/3" />

          <div className="relative z-10 max-w-sm mx-auto space-y-4">
            <Input
              variant="aer"
              placeholder="Premium glassmorphism input"
              startIcon={<Search />}
            />
            <PasswordInput variant="aer" placeholder="Secure password" />
          </div>
        </div>
        <CodeBlock
          ts={`<Input variant="aer" placeholder="Premium input" startIcon={<Search />} />
<PasswordInput variant="aer" placeholder="Secure password" />`}
          fullCode={`import { Input, PasswordInput } from "aer-design";
import { Search } from "lucide-react";

export default function AerInputExample() {
  return (
    <div className="relative flex flex-col items-center justify-center p-16 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sky-600/20 via-transparent to-blue-600/20" />
      
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <Input 
          variant="aer" 
          placeholder="Premium glassmorphism input"
          startIcon={<Search />}
        />
        <PasswordInput 
          variant="aer" 
          placeholder="Secure password"
        />
      </div>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for Inputs is perfect for
            search bars or login forms on high-impact landing pages. It works
            best on dark or colorful backgrounds, where the glassmorphism effect
            creates a sense of depth and focus that feels integrated yet
            distinct.
          </p>
        </div>
      </DocSection>

      <DocSection
        title="Size Variants"
        id="sizes"
        description="Three size options to fit different layouts and use cases."
      >
        <div className="max-w-sm space-y-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Small</label>
            <Input size="sm" placeholder="Small Input" startIcon={<Search />} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Default</label>
            <Input
              size="default"
              placeholder="Default Input"
              startIcon={<Search />}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Large</label>
            <Input size="lg" placeholder="Large Input" startIcon={<Search />} />
          </div>
        </div>
        <CodeBlock
          ts={`<Input size="sm" placeholder="Small" />\n<Input size="default" placeholder="Default" />\n<Input size="lg" placeholder="Large" />`}
          fullCode={`import { Input } from "aer-design";\nimport { Search } from "lucide-react";\n\nexport default function SizesExample() {\n  return (\n    <div className="max-w-sm space-y-6">\n      <Input size="sm" placeholder="Small Input" startIcon={<Search />} />\n      <Input size="default" placeholder="Default Input" startIcon={<Search />} />\n      <Input size="lg" placeholder="Large Input" startIcon={<Search />} />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Specialized Inputs"
        id="specialized"
        description="Pre-configured inputs for email, password, and phone with built-in features."
      >
        <div className="max-w-sm space-y-4">
          <PasswordInput placeholder="Enter password" />
          <EmailInput placeholder="johndoe@aer-design.com" />
          <PhoneInput placeholder="+1 (555) 000-0000" />
        </div>
        <CodeBlock
          ts={`<PasswordInput placeholder="Enter password" />\n<EmailInput placeholder="johndoe@aer-design.com" />\n<PhoneInput placeholder="+1 (555) 000-0000" />`}
          fullCode={`import { PasswordInput, EmailInput, PhoneInput } from "aer-design";\n\nexport default function SpecializedInputs() {\n  return (\n    <div className="space-y-4">\n      <EmailInput label="Email address" />\n      <PasswordInput label="Secure Password" />\n      <PhoneInput label="Mobile Number" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Masking"
        id="masking"
        description="Pattern-based masking for formatted data."
      >
        <div className="max-w-sm space-y-4">
          <MaskedInput
            mask="#### #### #### ####"
            startIcon={<CreditCard />}
            placeholder="Card Number"
          />
          <MaskedInput mask="## / ## / ####" placeholder="DD / MM / YYYY" />
        </div>
        <CodeBlock
          ts={`<MaskedInput mask="#### #### #### ####" startIcon={<CreditCard />} />\n<MaskedInput mask="## / ## / ####" placeholder="DD / MM / YYYY" />`}
          fullCode={`import { MaskedInput } from "aer-design";\nimport { CreditCard } from "lucide-react";\n\nexport default function CardForm() {\n  return (\n    <div className="p-6 bg-zinc-900 border border-white/5 rounded-2xl flex flex-col gap-4">\n      <h3 className="text-sm font-medium text-white">Payment Details</h3>\n      <MaskedInput \n        mask="#### #### #### ####" \n        startIcon={<CreditCard />} \n        placeholder="0000 0000 0000 0000" \n      />\n      <div className="grid grid-cols-2 gap-4">\n        <MaskedInput mask="##/##" placeholder="MM/YY" />\n        <MaskedInput mask="###" placeholder="CVC" />\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Label"
        id="label"
        description="Add labels to inputs with flexible positioning and helper text options."
      >
        <LabelExample />
      </DocSection>

      <DocSection
        title="Icons & Prefixes"
        id="icons"
        description="Enhanced visibility for contextual information."
      >
        <div className="max-w-sm space-y-4">
          <Input startIcon={<Search />} placeholder="Search components..." />
          <Input prefix="https://" placeholder="yourdomain.com" />
          <Input
            startIcon={<Globe />}
            prefix="https://"
            placeholder="portfolio.design"
          />
          <Input prefix="aer-design-workspace-" placeholder="my-team-id" />
        </div>
        <CodeBlock
          ts={`<Input startIcon={<Search />} placeholder="Search..." />\n<Input prefix="https://" placeholder="yourdomain.com" />\n<Input \n  startIcon={<Globe />} \n  prefix="https://" \n  placeholder="portfolio.design" \n/>\n<Input prefix="aer-design-workspace-" placeholder="my-team-id" />`}
          fullCode={`import { Input } from "aer-design";\nimport { Search, Globe } from "lucide-react";\n\nexport default function PrefixDemo() {\n  return (\n    <div className="space-y-4 p-8 bg-zinc-900 rounded-xl">\n      <Input startIcon={<Search />} placeholder="Global Search" />\n      <div className="grid grid-cols-2 gap-4">\n        <Input prefix="https://" placeholder="domain.com" />\n        <Input startIcon={<Globe />} prefix="v-" placeholder="1.0.0" />\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Addons"
        id="addons"
        description="Attached elements like buttons or fixed text."
      >
        <div className="max-w-sm space-y-4">
          <Input addonBefore="https://" placeholder="aer-design.com" />
          <Input
            placeholder="sk_live_51P..."
            addonAfter={
              <Button variant="ghost" size="sm" className="h-7 px-2">
                Regenerate
              </Button>
            }
          />
        </div>
        <CodeBlock
          ts={`<Input addonBefore="https://" placeholder="aer-design.com" />\n<Input \n  placeholder="sk_live..." \n  addonAfter={<Button variant="ghost" size="sm">Regenerate</Button>} \n/>`}
          fullCode={`import { Input, Button } from "aer-design";\n\nexport default function AddonExample() {\n  return (\n    <div className="flex flex-col gap-6 max-w-md">\n      <Input \n        addonBefore={<span className="text-xs uppercase font-bold">Base URL</span>} \n        placeholder="api.v1" \n      />\n      <Input \n        placeholder="Search users..." \n        addonAfter={<Button variant="aer" className="h-full rounded-l-none">Search</Button>} \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Precise control over styling with element-specific className props."
      >
        <div className="max-w-sm space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              className - Root container (spacing/layout)
            </p>
            <Input
              className="mb-4 w-full"
              placeholder="Spacing and layout"
              startIcon={<Search />}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              inputClassName - Input element (text styling)
            </p>
            <Input
              inputClassName="text-lg font-bold text-sky-600"
              placeholder="Custom text styling"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-aer-muted-foreground">
              iconClassName - Icon containers
            </p>
            <Input
              startIcon={<Search />}
              iconClassName="text-emerald-500"
              placeholder="Custom icon color"
            />
          </div>
        </div>
        <CodeBlock
          ts={`// Root container styling (spacing/layout)
<Input className="mb-4 w-full" placeholder="Spacing" />

// Input element styling (text)
<Input inputClassName="text-lg font-bold" placeholder="Text style" />

// Icon styling
<Input 
  startIcon={<Search />} 
  iconClassName="text-emerald-500" 
  placeholder="Icon color" 
/>`}
          fullCode={`import { Input } from "aer-design";
import { Search } from "lucide-react";

export default function GranularStyling() {
  return (
    <div className="space-y-6">
      <Input 
        className="mb-4 w-full" 
        placeholder="Spacing and layout" 
      />
      <Input 
        inputClassName="text-lg font-bold text-sky-600" 
        placeholder="Custom text styling" 
      />
      <Input 
        startIcon={<Search />} 
        iconClassName="text-emerald-500" 
        placeholder="Custom icon color" 
      />
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Validation States"
        id="validation"
        description="Error states and validation feedback for form inputs."
      >
        <div className="max-w-sm space-y-4">
          <Input placeholder="Error toggle" error />
          <Input placeholder="With valid state" />
        </div>
        <CodeBlock
          ts={`<Input placeholder="Invalid input" error />`}
          fullCode={`import { Input } from "aer-design";\n\nexport default function ValidationExample() {\n  return (\n    <Input error placeholder="This field has an error" />\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Real World Example"
        id="real-world-validation"
        description="Complete validation pattern with state management and error handling."
      >
        <RealWorldExample />
        <div className="mt-4">
          <p className="text-sm text-aer-muted-foreground mb-4">
            This example demonstrates best practices:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-aer-muted-foreground">
            <li>
              State tracks <code>value</code> and <code>touched</code> status.
            </li>
            <li>
              Validation runs on change to keep <code>isValid</code> up to date.
            </li>
            <li>
              Error messages only appear when <code>touched</code> is true.
            </li>
            <li>Required fields use a manual label with a red asterisk.</li>
          </ul>
        </div>
        <CodeBlock
          ts={`const [value, setValue] = useState("");\nconst [touched, setTouched] = useState(false);\n\nconst isInvalid = touched && value.trim().length === 0;\n\nreturn (\n  <div className="space-y-1.5">\n    <label className="text-sm font-medium text-white">\n      Full Name <span className="text-red-500">*</span>\n    </label>\n    <Input \n      value={value}\n      onChange={(e) => setValue(e.target.value)}\n      onBlur={() => setTouched(true)}\n      error={isInvalid}\n      placeholder="e.g. John Doe"\n    />\n    {isInvalid && (\n      <span className="text-xs text-red-500 font-medium">\n        Full Name is required\n      </span>\n    )}\n  </div>\n);`}
          fullCode={`import { Input } from "aer-design";\nimport { useState } from "react";\n\nexport default function RequiredField() {\n  const [value, setValue] = useState("");\n  const [touched, setTouched] = useState(false);\n\n  const isInvalid = touched && value.trim().length === 0;\n\n  return (\n    <div className="max-w-sm space-y-1.5 p-6 border rounded-xl">\n      <label className="text-sm font-medium block">\n        Full Name <span className="text-red-500">*</span>\n      </label>\n      <Input \n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        onBlur={() => setTouched(true)}\n        error={isInvalid}\n        placeholder="e.g. John Doe"\n      />\n      {isInvalid && (\n        <span className="text-xs text-red-500 font-medium">\n          Full Name is required\n        </span>\n      )}\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);

    const isInvalid = touched && value.trim().length === 0;

    return (
      <div className="max-w-sm space-y-1.5 p-6 border rounded-aer-xl bg-aer-muted/5">
        <label className="text-sm font-medium text-aer-foreground flex items-center gap-1">
          Full Name <span className="text-red-500 font-bold">*</span>
        </label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          error={isInvalid}
          placeholder="e.g. John Doe"
        />
        <div className="h-4">
          {isInvalid && (
            <span className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200 block">
              Full Name is required
            </span>
          )}
        </div>
        <div className="pt-2 text-xs text-aer-muted-foreground font-mono">
          Status: {isInvalid ? "Error" : "Valid"} • Touched:{" "}
          {touched ? "Yes" : "No"}
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="input-props" className="text-lg font-bold mb-4">
          InputProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Input component extends native HTML input attributes and adds
          additional props for enhanced functionality and styling.
        </p>
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined" | "aer"',
              default: '"outline"',
              description:
                "Visual style variant. 'outline' has border, 'filled' has background, 'underlined' has bottom border only.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default" (or global config)',
              description:
                "Input size affecting height and padding. Can be overridden globally via AerConfigProvider.",
            },
            {
              prop: "startIcon",
              type: "ReactNode",
              default: "-",
              description:
                "Icon displayed at the start of input. Typically used for search, user, or contextual icons.",
            },
            {
              prop: "endIcon",
              type: "ReactNode",
              default: "-",
              description:
                "Icon displayed at the end of input. Useful for clear buttons or status indicators.",
            },
            {
              prop: "prefix",
              type: "ReactNode",
              default: "-",
              description:
                "Text or element before the input value (inside input). Common for URLs (https://) or currency symbols.",
            },
            {
              prop: "suffix",
              type: "ReactNode",
              default: "-",
              description:
                "Text or element after the input value (inside input). Useful for units (kg, %, etc.).",
            },
            {
              prop: "addonBefore",
              type: "ReactNode",
              default: "-",
              description:
                "Fixed element attached to the left (outside input). Can contain buttons or labels.",
            },
            {
              prop: "addonAfter",
              type: "ReactNode",
              default: "-",
              description:
                "Fixed element attached to the right (outside input). Often used for action buttons.",
            },
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "Label text to display above or beside the input.",
            },
            {
              prop: "labelPosition",
              type: "'top' | 'left'",
              default: "'top'",
              description: "Position of the label relative to the input.",
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
              description: "Helper text displayed below the input.",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description:
                "Triggers error styling with red border. If string provided, can be used for error message.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the input and applies disabled styling.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "CSS classes for the root container element. Use for spacing (margin, padding) and layout (width, flex, grid).",
            },
            {
              prop: "inputClassName",
              type: "string",
              default: "-",
              description:
                "CSS classes for the input element itself. Use for text styling (font-size, color, text-align).",
            },
            {
              prop: "labelClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the label element.",
            },
            {
              prop: "iconClassName",
              type: "string",
              default: "-",
              description:
                "CSS classes for icon containers (startIcon and endIcon).",
            },
            {
              prop: "addonClassName",
              type: "string",
              default: "-",
              description:
                "CSS classes for addon containers (addonBefore and addonAfter).",
            },
            {
              prop: "containerClassName",
              type: "string",
              default: "-",
              description:
                "DEPRECATED: Use className instead. Additional CSS classes for the outer container wrapper.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="specialized-inputs" className="text-lg font-bold mb-4">
          Specialized Input Components
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">PasswordInput</h4>
            <p className="text-sm text-aer-muted-foreground">
              Pre-configured password input with show/hide toggle button.
              Automatically sets type="password" and includes an eye icon for
              visibility control.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">EmailInput</h4>
            <p className="text-sm text-aer-muted-foreground">
              Email input with @ icon and type="email" for built-in browser
              validation. Includes proper autocomplete attributes.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">PhoneInput</h4>
            <p className="text-sm text-aer-muted-foreground">
              Phone number input with phone icon and type="tel". Optimized for
              mobile keyboards.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 id="masked-input-props" className="text-lg font-bold mb-4">
          MaskedInputProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          MaskedInput applies pattern-based formatting as the user types. Use
          '#' for any digit in the mask pattern.
        </p>
        <ApiTable
          data={[
            {
              prop: "mask",
              type: "string",
              default: "-",
              description:
                "Pattern format using '#' for digits. Example: '#### #### #### ####' for credit cards, '##/##/####' for dates.",
            },
            {
              prop: "value",
              type: "string",
              default: "-",
              description:
                "Controlled input value (unmasked). Store only the digits, not the formatted string.",
            },
            {
              prop: "onChange",
              type: "(val: string) => void",
              default: "-",
              description:
                "Change callback receiving the unmasked value (digits only).",
            },
          ]}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> MaskedInput automatically formats as you
            type and returns only the digits in onChange, making it easy to
            store clean data.
          </p>
        </div>
      </div>

      <div>
        <h3 id="variant-guide" className="text-lg font-bold mb-4">
          Variant Usage Guide
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">outline (default)</h4>
            <p className="text-sm text-aer-muted-foreground">
              Traditional bordered input. Best for forms with clear field
              separation. Works well on any background.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">filled</h4>
            <p className="text-sm text-aer-muted-foreground">
              Material Design style with background fill. Creates visual
              hierarchy and works great with labels. Ideal for modern, clean
              interfaces.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">underlined</h4>
            <p className="text-sm text-aer-muted-foreground">
              Minimalist style with only bottom border. Perfect for compact
              forms and inline editing. Pairs excellently with labels.
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
      description="Customize input appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Input components use the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-input: 240 5.9% 90%;
  --aer-ring: 221.2 83.2% 53.3%;
  --aer-border: 214.3 31.8% 91.4%;
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 47.4% 11.2%;
}`}
          fullCode={`/* styles/globals.css or your theme file */
:root {
  /* Input background and border colors */
  --aer-input: 240 5.9% 90%;
  --aer-border: 214.3 31.8% 91.4%;
  
  /* Focus ring color (outline variant) */
  --aer-ring: 221.2 83.2% 53.3%;
  
  /* Text colors */
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-muted-foreground: 215.4 16.3% 46.9%;
  
  /* Background colors */
  --aer-background: 0 0% 100%;
  --aer-muted: 210 40% 96.1%;
  
  /* Error state */
  --aer-destructive: 0 84.2% 60.2%;
}

/* Dark mode */
.dark {
  --aer-input: 240 3.7% 15.9%;
  --aer-border: 240 3.7% 15.9%;
  --aer-ring: 217.2 91.2% 59.8%;
  --aer-foreground: 210 40% 98%;
  --aer-muted-foreground: 215 20.2% 65.1%;
  --aer-background: 222.2 84% 4.9%;
  --aer-muted: 217.2 32.6% 17.5%;
  --aer-destructive: 0 62.8% 30.6%;
}

/* Variant-specific variables */
.input-filled {
  background-color: hsl(var(--aer-muted));
}

.input-underlined {
  border-bottom-color: hsl(var(--aer-border));
}

.input-error {
  border-color: hsl(var(--aer-destructive));
  --aer-ring: var(--aer-destructive);
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
              <strong>Pro tip:</strong> The{" "}
              <code className="text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">
                --aer-ring
              </code>{" "}
              variable controls the focus ring color. Set it to your primary
              brand color for consistent focus states across all inputs.
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Auto-Contrast:</strong> When the global{" "}
              <code className="text-xs bg-blue-500/20 px-1 rounded">
                autoContrast
              </code>{" "}
              setting is enabled, this component will automatically adjust its
              text color to ensure WCAG compliance when a custom background
              color is applied via the <code>style</code> prop.
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
          Input
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Flexible text inputs with support for icons, masking, and addons.
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
              { id: "sizes", title: "Size Variants" },
              { id: "specialized", title: "Specialized Inputs" },
              { id: "masking", title: "Masking" },
              { id: "label", title: "Label" },
              { id: "icons", title: "Icons & Prefixes" },
              { id: "addons", title: "Addons" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "validation", title: "Validation States" },
              { id: "real-world-validation", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "input-props", title: "InputProps" },
              { id: "specialized-inputs", title: "Specialized Inputs" },
              { id: "masked-input-props", title: "MaskedInputProps" },
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
