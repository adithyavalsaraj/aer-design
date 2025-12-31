import { Button } from "@/components/Button";
import {
  EmailInput,
  Input,
  MaskedInput,
  PasswordInput,
  PhoneInput,
} from "@/components/Input";
import { CreditCard, Globe, Search } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function InputDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection title="Basic" id="basic">
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

      <DocSection title="Specialized" id="specialized">
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

      <DocSection title="Floating Label" id="floating-label">
        <div className="max-w-sm space-y-6">
          <Input floatingLabel label="Username" placeholder=" " />
          <Input
            variant="filled"
            floatingLabel
            label="Email Address"
            placeholder=" "
            startIcon={<Globe />}
          />
          <Input
            variant="underlined"
            floatingLabel
            label="Company"
            placeholder=" "
          />
        </div>
        <CodeBlock
          ts={`<Input floatingLabel label="Username" placeholder=" " />\n\n<Input \n  variant="filled" \n  floatingLabel \n  label="Email Address" \n  startIcon={<Globe />} \n  placeholder=" " \n/>\n\n<Input \n  variant="underlined" \n  floatingLabel \n  label="Company" \n  placeholder=" " \n/>`}
          fullCode={`import { Input } from "aer-design";\nimport { Globe } from "lucide-react";\n\nexport default function FloatingLabelExample() {\n  return (\n    <div className="max-w-sm space-y-6">\n      <Input floatingLabel label="Username" placeholder=" " />\n      <Input \n        variant="filled" \n        floatingLabel \n        label="Email Address" \n        startIcon={<Globe />} \n        placeholder=" " \n      />\n      <Input \n        variant="underlined" \n        floatingLabel \n        label="Company" \n        placeholder=" " \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Variants" id="variants">
        <div className="max-w-sm space-y-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Outline (Default)
            </label>
            <Input placeholder="Outline Style" />
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
          ts={`<Input placeholder="Outline" />\n<Input variant="filled" placeholder="Filled" />\n<Input variant="underlined" placeholder="Underlined" />`}
          fullCode={`import { Input } from "aer-design";\n\nexport default function VariantExample() {\n  return (\n    <div className="max-w-sm space-y-6">\n      <Input placeholder="Outline (Default)" />\n      <Input variant="filled" placeholder="Filled" />\n      <Input variant="underlined" placeholder="Underlined" />\n    </div>\n  );\n}`}
        />
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

      <DocSection title="Validation" id="validation">
        <div className="max-w-sm space-y-4">
          <Input placeholder="Error toggle" error />
          <Input placeholder="With valid state" />
        </div>
        <CodeBlock
          ts={`<Input placeholder="Invalid input" error />`}
          fullCode={`import { Input } from "aer-design";\n\nexport default function ValidationExample() {\n  return (\n    <Input error placeholder="This field has an error" />\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Real World" id="real-world-validation">
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
        <h3 className="text-lg font-bold mb-4">InputProps</h3>
        <ApiTable
          data={[
            {
              prop: "startIcon",
              type: "ReactNode",
              default: "-",
              description: "Icon displayed at the start of input",
            },
            {
              prop: "endIcon",
              type: "ReactNode",
              default: "-",
              description: "Icon displayed at the end of input",
            },
            {
              prop: "prefix",
              type: "ReactNode",
              default: "-",
              description: "Text or element before the input value",
            },
            {
              prop: "suffix",
              type: "ReactNode",
              default: "-",
              description: "Text or element after the input value",
            },
            {
              prop: "addonBefore",
              type: "ReactNode",
              default: "-",
              description: "Fixed element attached to the left",
            },
            {
              prop: "addonAfter",
              type: "ReactNode",
              default: "-",
              description: "Fixed element attached to the right",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description: "Triggers error styling",
            },
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined"',
              default: '"outline"',
              description: "Visual style variant",
            },
            {
              prop: "floatingLabel",
              type: "boolean",
              default: "false",
              description: "Enables floating label animation",
            },
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "Label text for floating label",
            },
            {
              prop: "containerClassName",
              type: "string",
              default: "-",
              description: "ClassName for the outer container",
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">MaskedInputProps</h3>
        <ApiTable
          data={[
            {
              prop: "mask",
              type: "string",
              default: "-",
              description: "Pattern format (e.g. '#### ####')",
            },
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Controlled input value",
            },
            {
              prop: "onChange",
              type: "(val: string) => void",
              default: "-",
              description: "Change callback",
            },
          ]}
        />
      </div>
    </div>
  );

  const theming = (
    <DocSection
      title="CSS Variables"
      description="Customize input appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {\n  --aer-input: 240 5.9% 90%;\n  --aer-ring: 240 5.9% 10%;\n  --aer-background: 0 0% 100%;\n}`}
        fullCode={`/* app.css */\n:root {\n  --aer-input: 240 5.9% 90%;\n  --aer-ring: 240 5.9% 10%;\n  --aer-background: 0 0% 100%;\n}`}
      />
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
          { id: "overview", label: "Overview", content: overview },
          { id: "api", label: "API", content: api },
          { id: "theming", label: "Theming", content: theming },
        ]}
      />
    </div>
  );
}
