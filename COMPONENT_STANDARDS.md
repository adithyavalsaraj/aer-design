# Aer Design Documentation Standards

## Overview

This document defines the quality standards and structure for all component documentation in Aer Design. All components should follow this template to ensure consistency, completeness, and excellent user experience.

---

## Documentation Structure

Every component documentation must have **three tabs**:

1. **Overview** - Examples and usage patterns
2. **API** - Complete props documentation
3. **Theming** - CSS variables and customization

---

## Overview Tab Requirements

### Required Sections (in order)

#### 1. Introduction

**Purpose:** Explain what the component does and its key features

**Structure:**

```tsx
<DocSection
  id="introduction"
  title="Introduction"
  description="Brief one-line description of the component."
>
  <div className="prose prose-sm max-w-none">
    <p className="text-aer-muted-foreground">
      Detailed explanation of the component's purpose and capabilities.
    </p>
    <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
      <li>
        <strong>Feature 1</strong> - Description
      </li>
      <li>
        <strong>Feature 2</strong> - Description
      </li>
      <li>
        <strong>Feature 3</strong> - Description
      </li>
      {/* List 4-6 key features */}
    </ul>
  </div>
</DocSection>
```

**Quality Criteria:**

- ✅ Clear explanation of component purpose
- ✅ 4-6 bullet points highlighting key features
- ✅ Uses `<strong>` tags for feature names
- ✅ Concise but comprehensive

---

#### 2. When to Use

**Purpose:** Guide users on choosing the right variant/component

**Structure:**

```tsx
<DocSection
  id="when-to-use"
  title="When to Use"
  description="Choose the right [variant/feature] for your use case."
>
  <div className="grid md:grid-cols-2 gap-6">
    <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
      <h4 className="font-semibold mb-3 text-aer-foreground">
        Use Case Category 1
      </h4>
      <p className="text-sm text-aer-muted-foreground mb-3">
        Use{" "}
        <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
          variant
        </code>{" "}
        for:
      </p>
      <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
        <li>Specific use case 1</li>
        <li>Specific use case 2</li>
        <li>Specific use case 3</li>
      </ul>
    </div>
    {/* Repeat for 2-4 categories */}
  </div>
</DocSection>
```

**Quality Criteria:**

- ✅ 2-4 category cards in grid layout
- ✅ Each card has clear heading
- ✅ Specific, actionable use cases
- ✅ Uses inline `<code>` for prop/variant names

---

#### 3. Basic Usage / Basic Variants

**Purpose:** Show the simplest usage pattern

**Structure:**

```tsx
<DocSection
  id="basic"
  title="Basic Usage" // or "Basic Variants"
  description="Simple [component] for common use cases."
>
  <BasicExample />
  <CodeBlock
    ts={`// Minimal code snippet`}
    fullCode={`// Complete, copy-paste ready example`}
  />
</DocSection>
```

**Quality Criteria:**

- ✅ Interactive demo component
- ✅ Short `ts` snippet (3-5 lines)
- ✅ Complete `fullCode` example (15-30 lines)
- ✅ Shows all basic variants if applicable

---

#### 4-N. Feature Sections

**Purpose:** Demonstrate each major feature with examples

**Naming Convention:**

- Use descriptive titles: "With Icons", "Loading State", "Size Variants"
- NOT generic titles: "Icons", "Loading", "Sizes"

**Structure:**

```tsx
<DocSection
  id="feature-name"
  title="Descriptive Feature Title"
  description="Clear explanation of what this feature does."
>
  <FeatureExample />
  <CodeBlock
    ts={`// Feature-specific snippet`}
    fullCode={`// Complete example`}
  />
  {/* Optional: Pro tip or best practice */}
  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
    <p className="text-sm text-blue-700 dark:text-blue-400">
      <strong>Pro tip:</strong> Best practice or important note
    </p>
  </div>
</DocSection>
```

**Quality Criteria:**

- ✅ One feature per section
- ✅ Clear, descriptive title
- ✅ Interactive demo
- ✅ Code examples for both snippet and full code
- ✅ Pro tips for complex features (optional)

**Common Feature Sections:**

- Variants (if multiple visual styles)
- Sizes (if size prop exists)
- States (loading, disabled, error)
- Icons/Addons (if supported)
- Advanced features (masking, validation, etc.)

---

#### Last Section: Real World Example

**Purpose:** Show production-ready implementation

**Structure:**

```tsx
<DocSection
  id="real-world"
  title="Real World Example"
  description="Complete [use case] with multiple features working together."
>
  <RealWorldExample />
  <CodeBlock
    ts={`// Brief overview comment`}
    fullCode={`// Complete, production-ready code (30-60 lines)
// Should demonstrate:
// - Multiple features combined
// - State management
// - Event handling
// - Best practices`}
  />
</DocSection>
```

**Quality Criteria:**

- ✅ Realistic use case (form, dashboard, etc.)
- ✅ Combines 3+ component features
- ✅ Includes state management
- ✅ Shows best practices
- ✅ 30-60 lines of complete code

---

## API Tab Requirements

### Required Sections

#### 1. Component Props Table

**Structure:**

```tsx
<div>
  <h3 id="component-props" className="text-lg font-bold mb-4">
    ComponentProps
  </h3>
  <p className="text-sm text-aer-muted-foreground mb-4">
    The [Component] extends native HTML [element] attributes and adds additional
    props for [key features].
  </p>
  <ApiTable
    data={[
      {
        prop: "propName",
        type: "TypeScript type",
        default: "default value or '-'",
        description: "Detailed description with use cases and examples.",
      },
      // Order: Most important props first
      // Group related props together
    ]}
  />
</div>
```

**Quality Criteria:**

- ✅ Introductory paragraph explaining the component
- ✅ All props documented
- ✅ Detailed descriptions (not just "prop for X")
- ✅ Include use cases in descriptions
- ✅ Proper TypeScript types
- ✅ Accurate default values

**Description Guidelines:**

- ❌ Bad: "Size of the button"
- ✅ Good: "Button size affecting height and padding. Can be overridden globally via AerConfigProvider."

- ❌ Bad: "Icon at start"
- ✅ Good: "Icon displayed at the start of input. Typically used for search, user, or contextual icons."

---

#### 2. Variant/Feature Usage Guide

**Purpose:** Explain when to use each variant

**Structure:**

```tsx
<div>
  <h3 id="variant-guide" className="text-lg font-bold mb-4">
    Variant Usage Guide
  </h3>
  <div className="space-y-4">
    <div className="p-4 border border-aer-border rounded-lg">
      <h4 className="font-semibold mb-2">variant-name</h4>
      <p className="text-sm text-aer-muted-foreground">
        Detailed explanation of when and why to use this variant. Include visual
        characteristics and best use cases.
      </p>
    </div>
    {/* Repeat for each variant */}
  </div>
</div>
```

**Quality Criteria:**

- ✅ One card per variant
- ✅ Explains visual characteristics
- ✅ Provides specific use cases
- ✅ Helps users make informed decisions

---

#### 3. Additional Type Definitions (if applicable)

**Purpose:** Document complex types, specialized components, or hooks

**Examples:**

- Specialized components (PasswordInput, EmailInput)
- Hook return values
- Complex type unions
- Callback signatures

---

## Theming Tab Requirements

### Required Content

```tsx
<DocSection
  title="CSS Variables"
  id="css-variables"
  description="Customize [component] appearance using CSS variables."
>
  <div className="space-y-4">
    <p className="text-sm text-aer-muted-foreground">
      [Component] uses the following CSS variables from your theme:
    </p>
    <CodeBlock
      ts={`:root {
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-foreground: 222.2 47.4% 11.2%;
  /* List relevant variables */
}`}
      fullCode={`/* styles/globals.css or your theme file */
:root {
  /* Component-specific variables */
  --aer-primary: 221.2 83.2% 53.3%;
  --aer-primary-foreground: 210 40% 98%;
  
  /* Add all relevant variables with comments */
}

/* Dark mode */
.dark {
  --aer-primary: 217.2 91.2% 59.8%;
  /* Dark mode overrides */
}`}
    />
    <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
      <p className="text-sm text-purple-700 dark:text-purple-400">
        <strong>Tip:</strong> Use the ThemeProvider to switch between 8 built-in
        themes, or customize these variables to match your brand colors.
      </p>
    </div>
  </div>
</DocSection>
```

**Quality Criteria:**

- ✅ Lists all relevant CSS variables
- ✅ Shows both light and dark mode
- ✅ Includes helpful tip about ThemeProvider
- ✅ Variables are properly commented

---

## Table of Contents (TOC)

### Overview Tab TOC

```tsx
toc: [
  { id: "introduction", title: "Introduction" },
  { id: "when-to-use", title: "When to Use" },
  { id: "basic", title: "Basic Usage" }, // or "Basic Variants"
  { id: "feature-1", title: "Descriptive Feature Title" },
  { id: "feature-2", title: "Another Feature Title" },
  // ... more features
  { id: "real-world", title: "Real World Example" },
];
```

### API Tab TOC

```tsx
toc: [
  { id: "component-props", title: "ComponentProps" },
  { id: "variant-guide", title: "Variant Usage Guide" },
  // Additional sections as needed
];
```

### Theming Tab TOC

```tsx
toc: [{ id: "css-variables", title: "CSS Variables" }];
```

---

## Code Examples Best Practices

### TypeScript Snippet (`ts` prop)

- **Length:** 3-10 lines
- **Purpose:** Quick reference
- **Content:** Core usage pattern only
- **No imports or boilerplate**

### Full Code (`fullCode` prop)

- **Length:** 15-60 lines
- **Purpose:** Copy-paste ready example
- **Content:** Complete, working code
- **Includes:** Imports, component definition, export
- **Quality:** Production-ready, follows best practices

### Example:

```tsx
<CodeBlock
  ts={`<Button variant="aer" size="lg">
  <Sparkles className="w-4 h-4 mr-2" />
  Get Started
</Button>`}
  fullCode={`import { Button } from "aer-design";
import { Sparkles } from "lucide-react";

export default function HeroButton() {
  return (
    <div className="flex items-center justify-center p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl">
      <Button variant="aer" size="lg">
        <Sparkles className="w-4 h-4 mr-2" />
        Join the Movement
      </Button>
    </div>
  );
}`}
/>
```

---

## Interactive Examples

### Component Structure

```tsx
function ExampleComponent() {
  const [state, setState] = React.useState(initialValue);

  // Keep examples simple but realistic
  // Show state management when relevant
  // Include event handlers

  return (
    <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
      {/* Component demo */}
    </div>
  );
}
```

**Quality Criteria:**

- ✅ Wrapped in styled container
- ✅ Uses theme-aware colors
- ✅ Interactive when appropriate
- ✅ Clean, readable code
- ✅ Demonstrates the feature clearly

---

## Pro Tips and Best Practices

Use colored alert boxes for important information:

### Blue - Pro Tips

```tsx
<div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
  <p className="text-sm text-blue-700 dark:text-blue-400">
    <strong>Pro tip:</strong> Your helpful tip here
  </p>
</div>
```

### Amber - Best Practices

```tsx
<div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
  <p className="text-sm text-amber-700 dark:text-amber-400">
    <strong>Best practice:</strong> Your recommendation here
  </p>
</div>
```

### Purple - Theme Tips

```tsx
<div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
  <p className="text-sm text-purple-700 dark:text-purple-400">
    <strong>Tip:</strong> Theme-related information
  </p>
</div>
```

---

## Quality Checklist

Before considering documentation complete, verify:

### Overview Tab

- [ ] Introduction with 4-6 key features
- [ ] When to Use guide with 2-4 categories
- [ ] Basic usage example
- [ ] All major features demonstrated
- [ ] Real world example (30-60 lines)
- [ ] All sections have descriptions
- [ ] All code examples work
- [ ] TOC is complete and accurate

### API Tab

- [ ] Component props table with detailed descriptions
- [ ] Introductory paragraph
- [ ] Variant/feature usage guide
- [ ] All props documented
- [ ] TypeScript types are accurate
- [ ] Default values are correct
- [ ] Descriptions include use cases

### Theming Tab

- [ ] CSS variables listed
- [ ] Light and dark mode shown
- [ ] Helpful tip included
- [ ] Variables are commented

### General

- [ ] No spelling or grammar errors
- [ ] Consistent terminology
- [ ] All links work
- [ ] All examples are copy-paste ready
- [ ] Component renders correctly in dev server

---

## Reference Examples

**Gold Standard Documentation:**

1. `PositioningDoc.tsx` - Perfect structure and detail
2. `ButtonDoc.tsx` - Excellent variant coverage
3. `InputDoc.tsx` - Comprehensive feature documentation

**Study these files for:**

- Section structure
- Description quality
- Code example patterns
- API documentation detail
- Pro tip usage

---

## Common Mistakes to Avoid

❌ **Generic section titles**

- Bad: "Variants", "Sizes", "States"
- Good: "Visual Variants", "Size Variants", "Loading State"

❌ **Vague descriptions**

- Bad: "Size of the button"
- Good: "Button size affecting height and padding. Can be overridden globally via AerConfigProvider."

❌ **Missing when-to-use guidance**

- Every component should help users choose the right variant/feature

❌ **Incomplete code examples**

- Always provide both `ts` snippet and `fullCode`
- Full code must be copy-paste ready

❌ **No real-world example**

- Users need to see features working together

❌ **Poor API descriptions**

- Descriptions should explain use cases, not just repeat the prop name

---

## Template Checklist

Use this when creating new documentation:

```markdown
## Component: [Name]

### Overview Tab

- [ ] Introduction section
- [ ] When to Use section
- [ ] Basic usage
- [ ] Feature 1: [name]
- [ ] Feature 2: [name]
- [ ] Feature 3: [name]
- [ ] Real World Example

### API Tab

- [ ] ComponentProps table
- [ ] Variant Usage Guide
- [ ] Additional types (if needed)

### Theming Tab

- [ ] CSS Variables section

### Quality

- [ ] All TOCs updated
- [ ] All code examples tested
- [ ] All descriptions detailed
- [ ] Pro tips added where helpful
```

---

## Accessibility Standards

### Automatic Contrast

All components that accept background colors (via variants or style props) MUST support automatic contrast adjustment to ensure WCAG 2.1 compliance.

**Requirements:**

1.  **Use `useContrastColor` Hook**: Components should use this hook to calculate the optimal text color.
2.  **Respect Global Setting**: Contrast adjustment should only happen if the global `autoContrast` setting is enabled (via `useAerConfig`).
3.  **Handle Style Props**: Check given `style.backgroundColor` prop.
4.  **Fallback**: Provide safe defaults if calculation is not applicable.
5.  **Documentation**: Add a "Theming" note about Auto-Contrast support.

**Implementation Pattern:**

```tsx
const { autoContrast } = useAerConfig();
const contrastColor = useContrastColor(style?.backgroundColor);

const finalStyle = { ...style };
if (autoContrast && style?.backgroundColor) {
  finalStyle.color = contrastColor;
}
```

---

## Summary

**Every component documentation must:**

1. ✅ Have Introduction and When to Use sections
2. ✅ Use descriptive section titles
3. ✅ Provide detailed API documentation
4. ✅ Include real-world examples
5. ✅ Have complete, copy-paste ready code
6. ✅ Cover Overview, API, and Theming tabs
7. ✅ Match the quality of Positioning and Button docs

**Goal:** Users should be able to understand, implement, and customize any component without external resources.
