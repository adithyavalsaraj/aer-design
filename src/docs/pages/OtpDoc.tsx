import { OtpInput } from "@/components/OtpInput";
import { Shield } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function OtpDoc() {
  const [otp, setOtp] = React.useState("");

  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Focused input for variable length one-time passwords and verification codes."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The OTP Input component streamlines the entry of security codes. It
            manages focus automatically, moving to the next field as digits are
            entered, and supports pasting entire codes from the clipboard.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Ease of Use</strong> - Auto-focus rules and keyboard
              navigation (Arrow keys, Backspace)
            </li>
            <li>
              <strong>Paste Support</strong> - Intelligent handling of pasted
              content across multiple fields
            </li>
            <li>
              <strong>Flexible Security</strong> - Support for password masking
              and custom characters
            </li>
            <li>
              <strong>Validation</strong> - regex patterns to restrict input
              (e.g., numbers only)
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Best practices for using OTP inputs."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Verification Flows
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use this component whenever you need to verify:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Email verification links</li>
              <li>SMS 2FA codes</li>
              <li>Device authorization pins</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Segmented Data
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Also useful for fixed-format data entry:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Credit card expiry (MM / YY)</li>
              <li>License keys</li>
              <li>Coupon codes</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
        <div className="flex flex-col items-start gap-4">
          <OtpInput value={otp} onChange={setOtp} />
          <div className="text-sm font-mono p-2 bg-aer-muted rounded-md border">
            Current Value: {otp || "------"}
          </div>
        </div>
        <CodeBlock
          ts={`const [otp, setOtp] = useState("");\n\n<OtpInput value={otp} onChange={setOtp} />`}
          fullCode={`import { OtpInput } from "aer-design";\nimport { useState } from "react";\n\nexport default function VerificationForm() {\n  const [code, setCode] = useState("");\n  \n  return (\n    <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 flex flex-col items-center gap-6">\n      <div className="text-center space-y-2">\n        <h2 className="text-xl font-bold text-white">Enter Code</h2>\n        <p className="text-sm text-zinc-400">We sent a 6-digit code to your email.</p>\n      </div>\n      <OtpInput value={code} onChange={setCode} />\n      <button className="text-aer-primary text-sm font-medium hover:underline">Resend Code</button>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Small
            </span>
            <OtpInput size="sm" length={4} />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Default
            </span>
            <OtpInput size="default" length={4} />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-aer-muted-foreground tracking-wider">
              Large
            </span>
            <OtpInput size="lg" length={4} />
          </div>
        </div>
        <CodeBlock
          ts={`<OtpInput size="sm" length={4} />\n<OtpInput size="default" length={4} />\n<OtpInput size="lg" length={4} />`}
        />
      </DocSection>

      <DocSection
        title="Custom Length"
        id="length"
        description="Change the number of input fields."
      >
        <div className="space-y-4">
          <OtpInput length={4} />
          <OtpInput length={8} />
        </div>
        <CodeBlock
          ts={`<OtpInput length={4} />\n<OtpInput length={8} />`}
          fullCode={`import { OtpInput } from "aer-design";\n\nexport default function VariableOtp() {\n  return (\n    <div className="space-y-8">\n      <div className="space-y-2">\n        <p className="text-xs uppercase font-bold text-zinc-500">4-Digit PIN</p>\n        <OtpInput length={4} />\n      </div>\n      <div className="space-y-2">\n        <p className="text-xs uppercase font-bold text-zinc-500">8-Digit Security Key</p>\n        <OtpInput length={8} />\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Alphanumeric"
        id="alphanumeric"
        description="Accept letters and numbers for alphanumeric codes."
      >
        <div className="space-y-4">
          <OtpInput pattern={/^[a-zA-Z0-9]$/} />
        </div>
        <CodeBlock
          ts={`<OtpInput pattern={/^[a-zA-Z0-9]$/} />`}
          fullCode={`import { OtpInput } from "aer-design";\n\nexport default function AlphaOtp() {\n  return (\n    <div className="space-y-2">\n      <p className="text-xs uppercase font-bold text-zinc-500">Enter Promo Code</p>\n      <OtpInput pattern={/^[a-zA-Z0-9]$/} />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        title="Security"
        id="security"
        description="Mask the input for sensitive codes."
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Standard Password</h4>
            <OtpInput type="password" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Custom Mask (Dot)</h4>
            <OtpInput
              type="password"
              maskChar={<div className="h-2 w-2 rounded-full bg-aer-primary" />}
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Custom Mask (Icon)</h4>
            <OtpInput
              type="password"
              maskChar={
                <Shield className="h-4 w-4 text-aer-muted-foreground" />
              }
            />
          </div>
        </div>
        <CodeBlock
          ts={`<OtpInput type="password" />\n\n<OtpInput \n  type="password" \n  maskChar={<div className="h-2 w-2 rounded-full bg-aer-primary" />} \n/>\n\n<OtpInput \n  type="password" \n  maskChar={<Shield className="h-4 w-4" />} \n/>`}
          fullCode={`import { OtpInput } from "aer-design";\nimport { Shield } from "lucide-react";\n\nexport default function SecureOtp() {\n  return (\n    <div className="space-y-6">\n      <OtpInput type="password" />\n      <OtpInput \n        type="password" \n        maskChar={<Shield className="size-4 text-aer-primary" />} \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Validation" id="validation">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Error State</h4>
            <OtpInput error />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">With Error Message</h4>
            <OtpInput error="Invalid code. Please try again." />
          </div>
        </div>
        <CodeBlock
          ts={`<OtpInput error />\n<OtpInput error="Invalid code. Please try again." />`}
          fullCode={`import { OtpInput } from "aer-design";\n\nexport default function Validation() {\n  return (\n    <div className="flex flex-col gap-8">\n      <OtpInput error />\n      <OtpInput error="Invalid code. Please try again." />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Real World Example" id="real-world-validation">
        <RealWorldExample />
        <CodeBlock
          ts={`const [value, setValue] = useState("");\nconst [touched, setTouched] = useState(false);\nconst isInvalid = touched && value.length < 6;\n\n<label>Verification Code <span className="text-red-500">*</span></label>\n<OtpInput \n  value={value}\n  onChange={setValue}\n  onBlur={() => setTouched(true)}\n  error={isInvalid ? "Code must be 6 digits" : undefined}\n/>`}
          fullCode={`import { OtpInput } from "aer-design";\nimport { useState } from "react";\n\nexport default function RealWorldValidation() {\n  const [value, setValue] = useState("");\n  const [touched, setTouched] = useState(false);\n  const isInvalid = touched && value.length < 6;\n\n  return (\n    <div className="flex flex-col items-center gap-4 p-8 border rounded-aer-xl bg-aer-muted/5 max-w-lg mx-auto">\n      <div className="text-center">\n        <span className="text-sm font-medium text-aer-foreground">\n          Verification Code <span className="text-red-500">*</span>\n        </span>\n      </div>\n      <OtpInput\n        value={value}\n        onChange={setValue}\n        onBlur={() => setTouched(true)}\n        error={isInvalid ? "Code must be 6 digits" : undefined}\n      />\n      <div className="text-xs text-aer-muted-foreground font-mono mt-2">\n        Status: {isInvalid ? "Error" : "Valid"}\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const isInvalid = touched && value.length < 6;

    return (
      <div className="flex flex-col items-center gap-4 p-8 border rounded-aer-xl bg-aer-muted/5 max-w-lg mx-auto">
        <div className="text-center space-y-1">
          <h4 className="font-semibold">Verify Identity</h4>
          <p className="text-sm text-aer-muted-foreground">
            Enter the code sent to your email.
          </p>
        </div>

        <div className="w-full space-y-2">
          {/* Manual label since OtpInput doesn't have one built-in */}
          <div className="text-center">
            <span className="text-sm font-medium text-aer-foreground">
              Verification Code <span className="text-red-500">*</span>
            </span>
          </div>
          <OtpInput
            value={value}
            onChange={setValue}
            // OtpInput handles focus internally, so we simulate onBlur when specific actions happen
            // For a real app, you might wrap this or check validity on form submission
            // Here we'll simulate "touched" simply if length > 0 or on explicit blur if supported
            onBlur={() => setTouched(true)}
            error={isInvalid ? "Code must be 6 digits" : undefined}
          />
        </div>

        <div className="text-xs text-aer-muted-foreground font-mono mt-2">
          Status: {isInvalid ? "Error" : "Valid"} • Touched:{" "}
          {touched ? "Yes" : "No"}
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-12">
      <div>
        <h3 id="otp-input-props" className="text-lg font-bold mb-4">
          OtpInputProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Component props for configuring the OTP input behavior.
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "''",
              description: "The controlled value of the OTP input.",
            },
            {
              prop: "onChange",
              type: "(val: string) => void",
              default: "-",
              description: "Callback fired when the value changes.",
            },
            {
              prop: "length",
              type: "number",
              default: "6",
              description: "Number of OTP input slots to render.",
            },
            {
              prop: "type",
              type: "'text' | 'password' | 'tel'",
              default: "'text'",
              description:
                "Input type. Use 'password' for masking, 'tel' for mobile numeric keypads.",
            },
            {
              prop: "maskChar",
              type: "ReactNode",
              default: "-",
              description:
                "Custom character or icon to render when type is 'password'.",
            },
            {
              prop: "pattern",
              type: "RegExp",
              default: "/^\\d$/",
              description:
                "Validation pattern for each character. Defaults to digits only.",
            },
            {
              prop: "autoFocus",
              type: "boolean",
              default: "false",
              description: "Whether to auto-focus the first input on mount.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all input slots.",
            },
            {
              prop: "readOnly",
              type: "boolean",
              default: "false",
              description: "Makes all inputs read-only.",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description:
                "Indicates an error state, changing the border color.",
            },
            {
              prop: "onBlur",
              type: "() => void",
              default: "-",
              description: "Callback when the input loses focus.",
            },
            {
              prop: "onFocus",
              type: "() => void",
              default: "-",
              description: "Callback when the input gains focus.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "CSS classes for the root container element.",
            },
            {
              prop: "cellClassName",
              type: "string",
              default: "-",
              description: "CSS classes for each individual input cell.",
            },
            {
              prop: "errorClassName",
              type: "string",
              default: "-",
              description: "CSS classes for the error message text.",
            },
            {
              prop: "size",
              type: "'sm' | 'default' | 'lg'",
              default: "'default'",
              description: "Size of the input slots.",
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
      description="Customize OTP input appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          OTP Input uses the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-input: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%;
  --aer-background: 0 0% 100%;
  --aer-foreground: 222.2 47.4% 11.2%;
}`}
          fullCode={`/* styles/globals.css */
:root {
  /* Border Color */
  --aer-input: 214.3 31.8% 91.4%; 
  
  /* Focus Ring */
  --aer-ring: 221.2 83.2% 53.3%;
  
  /* Slot Background */
  --aer-background: 0 0% 100%;
  
  /* Text Color */
  --aer-foreground: 222.2 47.4% 11.2%;
  
  /* Error State */
  --aer-destructive: 0 84.2% 60.2%;
}

.dark {
  --aer-input: 217.2 32.6% 17.5%;
  --aer-ring: 217.2 91.2% 59.8%;
  --aer-background: 222.2 84% 4.9%;
}`}
        />
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          OTP Input
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A specialized input for one-time passwords with focus management and
          paste support.
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
              { id: "sizes", title: "Sizes" },
              { id: "length", title: "Custom Length" },
              { id: "alphanumeric", title: "Alphanumeric" },
              { id: "security", title: "Security" },
              { id: "validation", title: "Validation" },
              { id: "real-world-validation", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [{ id: "otp-input-props", title: "OtpInputProps" }],
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
