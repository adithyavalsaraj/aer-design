import { Textarea } from "@/components/Textarea";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function TextareaDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection title="Basic" id="basic">
        <div className="max-w-xl">
          <Textarea placeholder="Type your message here..." />
        </div>
        <CodeBlock
          ts={`<Textarea placeholder="Type your message here..." />`}
          fullCode={`import { Textarea } from "aer-design";\n\nexport default function MessageForm() {\n  return (\n    <div className="grid w-full gap-2 p-6 bg-zinc-900 rounded-xl">\n      <label className="text-sm font-medium text-white">Your Message</label>\n      <Textarea placeholder="Write something amazing..." />\n      <p className="text-xs text-zinc-500 italic">Character limit: 500</p>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Floating Label" id="floating-label">
        <div className="max-w-xl space-y-6">
          <Textarea floatingLabel label="Feedback" placeholder=" " />
          <Textarea
            variant="filled"
            floatingLabel
            label="Project Description"
            placeholder=" "
            className="min-h-[120px]"
          />
        </div>
        <CodeBlock
          ts={`<Textarea floatingLabel label="Feedback" placeholder=" " />\n\n<Textarea \n  variant="filled" \n  floatingLabel \n  label="Project Description" \n  placeholder=" " \n  className="min-h-[120px]" \n/>`}
        />
      </DocSection>

      <DocSection title="Variants" id="variants">
        <div className="max-w-xl space-y-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Outline (Default)
            </label>
            <Textarea placeholder="Outline Style" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Filled</label>
            <Textarea variant="filled" placeholder="Filled Style" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Underlined
            </label>
            <Textarea variant="underlined" placeholder="Underlined Style" />
          </div>
        </div>
        <CodeBlock
          ts={`<Textarea placeholder="Outline" />\n<Textarea variant="filled" placeholder="Filled" />\n<Textarea variant="underlined" placeholder="Underlined" />`}
        />
      </DocSection>

      <DocSection title="Sizes" id="sizes">
        <div className="max-w-xl space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Small</label>
            <Textarea size="sm" placeholder="Small textarea" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Default</label>
            <Textarea size="default" placeholder="Default textarea" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Large</label>
            <Textarea size="lg" placeholder="Large textarea" />
          </div>
        </div>
        <CodeBlock
          ts={`<Textarea size="sm" placeholder="Small" />\n<Textarea size="default" placeholder="Default" />\n<Textarea size="lg" placeholder="Large" />`}
          fullCode={`import { Textarea } from "aer-design";\n\nexport default function SizesDemo() {\n  return (\n    <div className="space-y-4">\n      <Textarea size="sm" placeholder="Small" />\n      <Textarea size="default" placeholder="Default" />\n      <Textarea size="lg" placeholder="Large" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection title="Validation" id="validation">
        <div className="max-w-xl">
          <Textarea placeholder="Error state" error />
        </div>
        <CodeBlock ts={`<Textarea placeholder="Error state" error />`} />
      </DocSection>

      <DocSection title="Real World" id="real-world-validation">
        <RealWorldExample />
        <CodeBlock
          ts={`const [value, setValue] = useState("");\nconst [touched, setTouched] = useState(false);\nconst isInvalid = touched && value.trim().length < 10;\n\n<label>Description <span className="text-red-500">*</span></label>\n<Textarea \n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  onBlur={() => setTouched(true)}\n  error={isInvalid}\n/>`}
          fullCode={`import { Textarea } from "aer-design";\nimport { useState } from "react";\n\nexport default function RealWorldValidation() {\n  const [value, setValue] = useState("");\n  const [touched, setTouched] = useState(false);\n  const isInvalid = touched && value.trim().length < 10;\n\n  return (\n    <div className="max-w-xl space-y-1.5 p-6 border rounded-aer-xl bg-aer-muted/5">\n      <label className="text-sm font-medium text-aer-foreground flex items-center gap-1">\n        Description <span className="text-red-500 font-bold">*</span>\n      </label>\n      <Textarea\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        onBlur={() => setTouched(true)}\n        error={isInvalid}\n        placeholder="Please describe your issue (min 10 chars)..."\n        className="min-h-[120px]"\n      />\n      <div className="text-xs text-aer-muted-foreground flex justify-between">\n        <span>{isInvalid ? <span className="text-red-500 font-medium">Too short</span> : "Required field"}</span>\n        <span>{value.length} chars</span>\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  function RealWorldExample() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const isInvalid = touched && value.trim().length < 10;

    return (
      <div className="max-w-xl space-y-1.5 p-6 border rounded-aer-xl bg-aer-muted/5">
        <label className="text-sm font-medium text-aer-foreground flex items-center gap-1">
          Description <span className="text-red-500 font-bold">*</span>
        </label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          error={isInvalid}
          placeholder="Enter at least 10 characters..."
          className="min-h-[100px]"
        />
        <div className="h-4">
          {isInvalid && (
            <span className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200 block">
              Description must be at least 10 characters
            </span>
          )}
        </div>
        <div className="pt-2 text-xs text-aer-muted-foreground font-mono">
          Length: {value.length}/10 • Valid: {(!isInvalid).toString()}
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="textarea-props" className="text-lg font-bold mb-4">
          TextareaProps
        </h3>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "The value of the textarea",
            },
            {
              prop: "onChange",
              type: "(e: ChangeEvent) => void",
              default: "-",
              description: "Change callback",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "-",
              description: "Triggers error styling",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes",
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
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default" (or global config)',
              description: "Textarea size",
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
      description="Customize textarea appearance using CSS variables."
    >
      <CodeBlock
        ts={`:root {\n  --aer-input: 240 5.9% 90%;\n  --aer-ring: 240 5.9% 10%;\n}`}
        fullCode={`/* globals.css */\n:root {\n  --aer-input: 240 5.9% 90%;\n  --aer-ring: 240 5.9% 10%;\n}`}
      />
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Textarea
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A multi-line text input for longer content.
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
              { id: "floating-label", title: "Floating Label" },
              { id: "variants", title: "Variants" },
              { id: "sizes", title: "Sizes" },
              { id: "validation", title: "Validation" },
              { id: "real-world-validation", title: "Real World" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [{ id: "textarea-props", title: "TextareaProps" }],
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
