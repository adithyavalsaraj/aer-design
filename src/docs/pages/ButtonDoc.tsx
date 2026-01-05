import { Button } from "@/components/Button";
import { Download, Mail, Plus, Save, Sparkles, Trash2, X } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function ButtonDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A versatile button component for user interactions."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            The Button component is the primary way users interact with your
            application. It supports multiple visual styles, sizes, and states
            to accommodate different use cases and design requirements.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>7 variants</strong> for different contexts (default, aer,
              secondary, outline, ghost, link, destructive)
            </li>
            <li>
              <strong>4 sizes</strong> including an icon-only variant
            </li>
            <li>
              <strong>Loading states</strong> with built-in spinner animation
            </li>
            <li>
              <strong>Full accessibility</strong> with proper ARIA attributes
            </li>
            <li>
              <strong>Composable</strong> with icons, text, and custom content
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right button variant for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Primary Actions
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                default
              </code>{" "}
              or{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                aer
              </code>{" "}
              variants for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Form submissions (Save, Submit, Continue)</li>
              <li>Primary call-to-action buttons</li>
              <li>Confirming important actions</li>
              <li>Hero section CTAs</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Secondary Actions
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                secondary
              </code>
              ,{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                outline
              </code>
              , or{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                ghost
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Cancel or back actions</li>
              <li>Secondary options in dialogs</li>
              <li>Toolbar actions</li>
              <li>Less prominent interactions</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Destructive Actions
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                destructive
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Delete or remove actions</li>
              <li>Permanent data changes</li>
              <li>Actions that cannot be undone</li>
              <li>Warning confirmations</li>
            </ul>
          </div>

          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-3 text-aer-foreground">
              Navigation
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                link
              </code>{" "}
              or{" "}
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                ghost
              </code>{" "}
              for:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>In-text navigation links</li>
              <li>Breadcrumb navigation</li>
              <li>Subtle navigation options</li>
              <li>Footer links</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Variants"
        description="All available button styles for different contexts."
      >
        <BasicVariantsExample />
        <CodeBlock
          ts={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
          fullCode={`import { Button } from "aer-design";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Save Changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Learn More</Button>
      <Button variant="ghost">Settings</Button>
      <Button variant="link">Privacy Policy</Button>
      <Button variant="destructive">Delete Account</Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="Our signature glassmorphism effect for premium CTAs."
      >
        <AerVariantExample />
        <CodeBlock
          ts={`<Button variant="aer" size="lg">
  <Sparkles className="w-4 h-4 mr-2" />
  Get Started
</Button>`}
          fullCode={`import { Button } from "aer-design";
import { Sparkles } from "lucide-react";

export default function AerButton() {
  return (
    <div className="flex items-center justify-center p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10">
      <Button variant="aer" size="lg">
        <Sparkles className="w-4 h-4 mr-2" />
        Join the Movement
      </Button>
    </div>
  );
}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant works best on dark
            backgrounds and for hero CTAs. It features a subtle glassmorphism
            effect with animated gradients.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="with-icons"
        title="With Icons"
        description="Combine buttons with icons for better visual communication."
      >
        <IconButtonsExample />
        <CodeBlock
          ts={`// Icon with text
<Button>
  <Mail className="w-4 h-4 mr-2" />
  Send Email
</Button>

// Icon only
<Button size="icon" variant="outline">
  <Plus className="w-4 h-4" />
</Button>

// Icon on right
<Button>
  Download
  <Download className="w-4 h-4 ml-2" />
</Button>`}
          fullCode={`import { Button } from "aer-design";
import { Mail, Plus, Download, Save } from "lucide-react";

export default function IconButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Icon with text */}
      <Button>
        <Mail className="w-4 h-4 mr-2" />
        Send Email
      </Button>

      {/* Icon only */}
      <Button size="icon" variant="outline">
        <Plus className="w-4 h-4" />
      </Button>

      {/* Icon on right */}
      <Button variant="secondary">
        Download Report
        <Download className="w-4 h-4 ml-2" />
      </Button>

      {/* Multiple icons */}
      <Button variant="outline">
        <Save className="w-4 h-4 mr-2" />
        Save Draft
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="loading-state"
        title="Loading State"
        description="Show loading feedback during async operations."
      >
        <LoadingStateExample />
        <CodeBlock
          ts={`const [isLoading, setIsLoading] = useState(false);

<Button 
  isLoading={isLoading}
  onClick={() => setIsLoading(true)}
>
  Submit Form
</Button>`}
          fullCode={`import { Button } from "aer-design";
import { useState } from "react";

export default function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    alert("Form submitted!");
  };

  return (
    <Button isLoading={isLoading} onClick={handleSubmit}>
      {isLoading ? "Submitting..." : "Submit Form"}
    </Button>
  );
}`}
        />
        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>Best practice:</strong> Always disable the button during
            loading (handled automatically) and provide clear feedback about
            what's happening.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="sizes"
        title="Sizes"
        description="Four size variants to fit different layouts."
      >
        <SizesExample />
        <CodeBlock
          ts={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Mail /></Button>`}
          fullCode={`import { Button } from "aer-design";
import { Mail } from "lucide-react";

export default function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small Button</Button>
      <Button>Default Button</Button>
      <Button size="lg">Large Button</Button>
      <Button size="icon" variant="outline">
        <Mail className="w-4 h-4" />
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="disabled-state"
        title="Disabled State"
        description="Prevent interaction when actions are unavailable."
      >
        <DisabledStateExample />
        <CodeBlock
          ts={`<Button disabled>Cannot Click</Button>
<Button variant="outline" disabled>
  Disabled Outline
</Button>`}
          fullCode={`import { Button } from "aer-design";

export default function DisabledButtons() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2">
        <input 
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        I agree to the terms
      </label>
      
      <Button disabled={!agreed}>
        Continue
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Granular Styling"
        id="granular-styling"
        description="Precise control over styling with element-specific className props."
      >
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center">
          <ButtonStylingExample />
        </div>
        <CodeBlock
          ts={`// Custom button styling
<Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 border-0">
  Gradient Button
</Button>

// Custom icon styling
<Button iconClassName="text-yellow-400">
  <Star className="mr-2" />
  Starred
</Button>`}
          fullCode={`import { Button } from "aer-design";
import { Star } from "lucide-react";

export default function ButtonStylingExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 border-0 hover:opacity-90 transition-opacity">
        Gradient Button
      </Button>
      
      <Button 
        variant="outline" 
        className="border-dashed border-2"
        iconClassName="text-yellow-400"
      >
        <Star className="w-4 h-4 mr-2" />
        Dashed & Starred
      </Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="Complete form with multiple button variants and states."
      >
        <RealWorldExample />
        <CodeBlock
          ts={`// Form with primary, secondary, and destructive actions`}
          fullCode={`import { Button } from "aer-design";
import { Save, X, Trash2 } from "lucide-react";
import { useState } from "react";

export default function UserProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setHasChanges(false);
    alert("Profile saved!");
  };

  const handleReset = () => {
    setFormData({ name: "John Doe", email: "john@example.com" });
    setHasChanges(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted");
    }
  };

  return (
    <div className="max-w-md p-6 border border-aer-border rounded-lg bg-aer-background">
      <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            isLoading={isLoading}
            disabled={!hasChanges}
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            variant="outline"
            disabled={!hasChanges}
            onClick={handleReset}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  // Example Components
  function BasicVariantsExample() {
    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    );
  }

  function AerVariantExample() {
    return (
      <div className="relative flex items-center justify-center p-16 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
        {/* Vibrant Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500/40 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-500/40 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/30 rounded-full blur-[50px]" />

        <Button variant="aer" size="lg" className="relative z-10">
          <Sparkles className="w-4 h-4 mr-2" />
          Join the Movement
        </Button>
      </div>
    );
  }

  function IconButtonsExample() {
    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button size="icon" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="secondary">
            Download Report
            <Download className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>
    );
  }

  function LoadingStateExample() {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex gap-4">
          <Button isLoading={isLoading} onClick={handleClick}>
            {isLoading ? "Submitting..." : "Submit Form"}
          </Button>
          <Button variant="outline" isLoading={isLoading}>
            Processing
          </Button>
        </div>
      </div>
    );
  }

  function SizesExample() {
    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex items-center flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  function DisabledStateExample() {
    const [agreed, setAgreed] = React.useState(false);

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4"
          />
          I agree to the terms and conditions
        </label>
        <div className="flex gap-4">
          <Button disabled={!agreed}>Continue</Button>
          <Button variant="outline" disabled>
            Always Disabled
          </Button>
        </div>
      </div>
    );
  }

  function RealWorldExample() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: "John Doe",
      email: "john@example.com",
    });
    const [hasChanges, setHasChanges] = React.useState(false);

    const handleSave = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setHasChanges(false);
        alert("Profile saved!");
      }, 1500);
    };

    const handleReset = () => {
      setFormData({ name: "John Doe", email: "john@example.com" });
      setHasChanges(false);
    };

    const handleDelete = () => {
      if (confirm("Are you sure you want to delete your account?")) {
        alert("Account deleted");
      }
    };

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-aer-foreground">
            Profile Settings
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-aer-foreground">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-aer-border rounded-md bg-aer-background text-aer-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-aer-foreground">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-aer-border rounded-md bg-aer-background text-aer-foreground"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                isLoading={isLoading}
                disabled={!hasChanges}
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                disabled={!hasChanges}
                onClick={handleReset}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>

            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function ButtonStylingExample() {
    return (
      <div className="flex flex-wrap gap-4">
        <Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 border-0 hover:opacity-90 transition-opacity text-white">
          Gradient Button
        </Button>

        <Button variant="outline" className="border-dashed border-2">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
          Dashed & Starred
        </Button>
      </div>
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="button-props" className="text-lg font-bold mb-4">
          ButtonProps
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          The Button component extends native HTML button attributes and adds
          additional props for styling and behavior.
        </p>
        <ApiTable
          data={[
            {
              prop: "variant",
              type: '"default" | "aer" | "secondary" | "outline" | "ghost" | "link" | "destructive"',
              default: '"default"',
              description:
                "Visual style variant. Use 'default' or 'aer' for primary actions, 'destructive' for dangerous actions.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg" | "icon"',
              default: '"default"',
              description:
                "Button size. Use 'icon' for icon-only buttons (square shape).",
            },
            {
              prop: "isLoading",
              type: "boolean",
              default: "false",
              description:
                "Shows loading spinner and disables the button. Automatically adds spinner before children.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description:
                "Disables button interaction. Also triggered when isLoading is true.",
            },
            {
              prop: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Renders button as a child component using Radix Slot. Useful for rendering as a link.",
            },
            {
              prop: "className",
              type: "string",
              default: "-",
              description:
                "Additional CSS classes to apply. Merged with variant styles.",
            },
            {
              prop: "children",
              type: "ReactNode",
              default: "-",
              description:
                "Button content. Can include text, icons, or any React elements.",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="variant-guide" className="text-lg font-bold mb-4">
          Variant Usage Guide
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">default</h4>
            <p className="text-sm text-aer-muted-foreground">
              Solid background with primary color. Use for main CTAs and form
              submissions.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">aer</h4>
            <p className="text-sm text-aer-muted-foreground">
              Signature glassmorphism effect. Best for hero sections and premium
              CTAs on dark backgrounds.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">secondary</h4>
            <p className="text-sm text-aer-muted-foreground">
              Muted background. Use for secondary actions like Cancel or Back.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">outline</h4>
            <p className="text-sm text-aer-muted-foreground">
              Border only, transparent background. Good for less prominent
              actions.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">ghost</h4>
            <p className="text-sm text-aer-muted-foreground">
              No background or border, hover effect only. Use in toolbars and
              menus.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">link</h4>
            <p className="text-sm text-aer-muted-foreground">
              Styled as a link with underline on hover. Use for in-text
              navigation.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg">
            <h4 className="font-semibold mb-2">destructive</h4>
            <p className="text-sm text-aer-muted-foreground">
              Red/danger color. Use for delete, remove, or other destructive
              actions.
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
      description="Customize button appearance using CSS variables."
    >
      <div className="space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          Buttons use the following CSS variables from your theme:
        </p>
        <CodeBlock
          ts={`:root {
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  --aer-secondary: 240 4.8% 95.9%;
  --aer-secondary-foreground: 222.2 47.4% 11.2%;
  --aer-destructive: 0 84.2% 60.2%;
  --aer-destructive-foreground: 210 40% 98%;
}`}
          fullCode={`/* styles/globals.css or your theme file */
:root {
  /* Primary button colors */
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  
  /* Secondary button colors */
  --aer-secondary: 240 4.8% 95.9%;
  --aer-secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Destructive button colors */
  --aer-destructive: 0 84.2% 60.2%;
  --aer-destructive-foreground: 210 40% 98%;
  
  /* Border and ring colors for outline/ghost */
  --aer-border: 214.3 31.8% 91.4%;
  --aer-ring: 221.2 83.2% 53.3%;
}

/* Dark mode */
.dark {
  --aer-primary: 217.2 91.2% 59.8%;
  --aer-primary-foreground: 222.2 47.4% 11.2%;
  /* ... other dark mode overrides */
}`}
        />
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            <strong>Tip:</strong> Use the ThemeProvider to switch between 8
            built-in themes, or customize these variables to match your brand
            colors.
          </p>
        </div>
      </div>
    </DocSection>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Button
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          A versatile button component with multiple variants, sizes, and states
          for all your interaction needs.
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
              { id: "basic", title: "Basic Variants" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "with-icons", title: "With Icons" },
              { id: "loading-state", title: "Loading State" },
              { id: "sizes", title: "Sizes" },
              { id: "disabled-state", title: "Disabled State" },
              { id: "granular-styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              { id: "button-props", title: "ButtonProps" },
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
