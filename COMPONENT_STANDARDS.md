# Aer Design Documentation Standards (Updated)

## Overview

This document defines the quality standards and structure for all component documentation in Aer Design. All components must follow this template to ensure consistency, specifically highlighting the **Aer Variant** as the flagship feature.

---

## Documentation Structure

Every component documentation must have **three tabs**:

1. **Overview** - Examples, feature deep-dives, and real-world usage.
2. **API** - Complete props documentation and variant guides.
3. **Theming** - CSS variables and granular styling.

---

## Overview Tab Requirements

### Required Sections (in order)

#### 1. Introduction

Explain what the component does and its key features.
**Quality:** 4-6 bullet points using `<strong>` for feature names.

#### 2. When to Use

Guide users on choosing the right variant. Use the 2-4 category grid layout defined in original standards.

#### 3. Basic Usage

The simplest implementation using standard TypeScript/React patterns.

#### 4. Visual Variants

Standard stylistic variations (e.g., Primary, Ghost, Outline). Use the title "**Visual Variants**."

#### 5. Custom Usage

How to extend the component, pass custom children, or utilize render props.

#### 6. Positioning

**Purpose:** Guidance on IDE layout integration.
**Requirement:** Describe behavior in sidebars, editor panes, or floating overlays. Explain alignment, z-index logic, or container constraints.

#### 7. Feature Sections (Component Specific)

Descriptive titles for unique logic (e.g., "Keyboard Shortcuts", "Virtual Scrolling").

#### 8. The Aer Variant (Key Selling Variant)

**Purpose:** Highlight the premium "Aer" aesthetic. It must be given its own high-visibility section.
**Structure:**

```tsx
<DocSection
  id="aer-variant"
  title="The Aer Variant"
  description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
>
  <AerExample />
  <CodeBlock
    ts={`<Component variant="aer" />`}
    fullCode={`// Show example with backdrop-blur and specific aer-borders`}
  />
</DocSection>
```

#### 9. Interaction States

**Purpose:** Document interaction states.
**Requirements:** Must visually demonstrate **Hover**, **Active**, **Disabled**, **Loading**, and **Focused** states using Tailwind modifiers (e.g., `hover:`, `focus-visible:`).

#### 10. Specialized Contexts

**Purpose:** Context-aware versions of the component.
**Example:** How the component behaves differently in "Debug Mode" vs. "Writing Mode."

#### 11. Validation & Errors

**Purpose:** Error handling and data constraints.
**Requirements:** Show error rings, helper text, and `aria-invalid` implementation.

#### 12. Granular Styling

**Purpose:** How to override internal slots.
**Structure:** Explain the `classNames` or `styles` prop for targeting internal elements (e.g., root, label, icon). Provide a list of styleable "slots" or internal classes.

#### 13. Real World Example

**Purpose:** A 30-60 line production-ready implementation (e.g., a complex IDE form or dashboard widget).

---

## API Tab Requirements

1. **Component Props Table:** Detailed TS types and default values. Descriptions must explain use cases.
2. **Variant Usage Guide:** Cards explaining the "Why" behind each style.

---

## Theming Tab Requirements

1. **CSS Variables:** List all `:root` variables.
2. **Auto-Contrast:** Document support for the `useContrastColor` hook and WCAG 2.1 compliance.

---

## Updated Overview Tab TOC

```tsx
toc: [
  { id: "introduction", title: "Introduction" },
  { id: "when-to-use", title: "When to Use" },
  { id: "basic", title: "Basic Usage" },
  { id: "variants", title: "Visual Variants" },
  { id: "custom", title: "Custom Usage" },
  { id: "positioning", title: "Positioning" },
  { id: "aer-variant", title: "The Aer Variant" },
  { id: "states", title: "Interaction States" },
  { id: "specialized", title: "Specialized Contexts" },
  { id: "validation", title: "Validation & Errors" },
  { id: "styling", title: "Granular Styling" },
  { id: "real-world", title: "Real World Example" },
];
```

---

## Quality Checklist

- [ ] **Positioning:** Does it explain IDE layout behavior?
- [ ] **Aer Variant:** Is the flagship style given its own high-visibility section?
- [ ] **States:** Are hover/focus/loading states visually demonstrated?
- [ ] **Granular Styling:** Is there a list of styleable "slots" or internal classes?
- [ ] **Introduction:** Does it have 4-6 bullet points with `<strong>` tags?
- [ ] **Code Examples:** Are both `ts` snippet and `fullCode` provided and copy-paste ready?
- [ ] **Tabs:** Are all three tabs (Overview, API, Theming) implemented?

---

## Maintenance & Release Protocol

Whenever a new feature is added or removed, the following files MUST be updated:

1.  **CHANGELOG.md**:
    - Add a new version entry if needed.
    - Categorize changes under "New Features", "Component Enhancements", or "Bug Fixes".
2.  **ROADMAP.md**:
    - Update the project version and last updated date.
    - Move implemented components from "Missing" to "Completed".
    - Update overall progress metrics and completion counts.
3.  **README.md**:
    - Update the component/utility tables with new additions.
    - Ensure the "Key Features" or "Installation" sections reflect significant changes.
