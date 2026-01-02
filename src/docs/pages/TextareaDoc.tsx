import { Textarea } from "@/components/Textarea";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function TextareaDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Multi-line text input with rich customization options."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Textarea component renders a multi-line text input for longer
            content. It shares the same visual language and component API as the
            Input component, supporting variants, floating labels, validation
            states, and sizing options.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Elastic Sizing</strong> - Easily control min/max height
              via className
            </li>
            <li>
              <strong>Visual Variants</strong> - Outline, filled, and underlined
              styles
            </li>
            <li>
              <strong>Floating Labels</strong> - Integrated support for
              Material-style floating labels
            </li>
            <li>
              <strong>Validation</strong> - Built-in error states and feedback
              styling
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Guidance on when to use a Textarea versus other inputs."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Long Form Content
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use Textarea for inputs expected to exceed a single line:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Comments and feedback forms</li>
              <li>Bio or description fields</li>
              <li>Support ticket details</li>
              <li>Address inputs</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Fixed Height
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use the `rows` prop or `min-h-*` classes to set initial size:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>When you want to encourage detailed responses</li>
              <li>To prevent layout shifts during input</li>
              <li>To align with other large form elements</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="Basic Usage" id="basic">
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

      <DocSection title="Real World Example" id="real-world-validation">
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
        <p className="text-sm text-aer-muted-foreground mb-4">
          Textarea extends the standard HTMLTextAreaElement attributes and adds
          the following props:
        </p>
        <ApiTable
          data={[
            {
              prop: "value",
              type: "string | number | readonly string[]",
              default: "-",
              description: "The controlled value of the textarea.",
            },
            {
              prop: "defaultValue",
              type: "string | number | readonly string[]",
              default: "-",
              description: "The default value for uncontrolled usage.",
            },
            {
              prop: "onChange",
              type: "(e: ChangeEvent<HTMLTextAreaElement>) => void",
              default: "-",
              description: "Callback fired when the value changes.",
            },
            {
              prop: "placeholder",
              type: "string",
              default: "-",
              description: "Placeholder text displayed when empty.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction and applies disabled styling.",
            },
            {
              prop: "readOnly",
              type: "boolean",
              default: "false",
              description: "Makes the textarea read-only but focusable.",
            },
            {
              prop: "error",
              type: "boolean | string",
              default: "false",
              description:
                "Indicates an error state. Pass a string to (optionally) use it for aria-invalid.",
            },
            {
              prop: "variant",
              type: '"outline" | "filled" | "underlined"',
              default: '"outline"',
              description: "Visual style variant of the textarea.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: "Size affecting padding and font size.",
            },
            {
              prop: "floatingLabel",
              type: "boolean",
              default: "false",
              description: "Enables the floating label animation pattern.",
            },
            {
              prop: "label",
              type: "string",
              default: "-",
              description: "Label text. Required if floatingLabel is true.",
            },
            {
              prop: "rows",
              type: "number",
              default: "-",
              description: "Initial height in lines of text.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes for the textarea element.",
            },
            {
              prop: "containerClassName",
              type: "string",
              default: "-",
              description:
                "Additional CSS classes for the wrapper element (useful for positioning).",
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
            <h4 className="font-semibold mb-2">Auto-Growing</h4>
            <p className="text-sm text-aer-muted-foreground">
              While not built-in, you can easily implement auto-resizing
              textareas using the{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                rows
              </code>{" "}
              prop or integrating with a library like{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                react-textarea-autosize
              </code>
              .
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
      description="Customize textarea appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Textarea shares many variables with Input to ensure consistency:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-input: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%;
  --aer-background: 0 0% 100%;
  --aer-primary: 221.2 83.2% 53.3%;
}`}
          fullCode={`/* styles/globals.css */
:root {
  /* Border color for outline variant */
  --aer-input: 214.3 31.8% 91.4%; 
  
  /* Focus ring color */
  --aer-ring: 221.2 83.2% 53.3%;
  
  /* Background color */
  --aer-background: 0 0% 100%;
  
  /* Text and Floating Label colors */
  --aer-foreground: 222.2 47.4% 11.2%;
  --aer-muted-foreground: 215.4 16.3% 46.9%;
  
  /* Validation */
  --aer-destructive: 0 84.2% 60.2%;
}

.dark {
  --aer-input: 217.2 32.6% 17.5%;
  --aer-ring: 217.2 91.2% 59.8%;
  --aer-background: 222.2 84% 4.9%;
}`}
        />
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-400">
              <strong>Tip:</strong> Textarea uses the same variable{" "}
              <code>--aer-input</code> as normal Inputs, ensuring they always
              look like part of the same family.
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
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "basic", title: "Basic Usage" },
              { id: "floating-label", title: "Floating Label" },
              { id: "variants", title: "Variants" },
              { id: "sizes", title: "Sizes" },
              { id: "validation", title: "Validation" },
              { id: "real-world-validation", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "textarea-props", title: "TextareaProps" },
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
