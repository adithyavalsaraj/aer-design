# Aer Design Documentation Standards (Updated)

## Overview

This document defines the quality standards and structure for all component documentation in Aer Design. All components must follow this template to ensure consistency, specifically highlighting the **Aer Variant** as the flagship feature.

---

## Documentation Structure

Every component documentation must have **three tabs**:

1.  **Overview** - Examples, feature deep-dives, and real-world usage.
2.  **API** - Complete props documentation and variant guides.
3.  **Theming** - CSS variables and granular styling.

### TOC (Table of Contents) Structure

**IMPORTANT:** Each tab must have its own separate TOC array:

-   **Overview Tab**: TOC items are defined in `staticTOC.ts` under the component key (e.g., `popover`)
-   **API Tab**: TOC items are defined inline in the component doc file
-   **Theming Tab**: TOC items are defined inline in the component doc file

**Example Implementation:**
```tsx
// In ComponentDoc.tsx
<DocTabs
  tabs={[
    { 
      id: "overview", 
      label: "Overview", 
      content: overview,
      toc: [ /* Overview sections from staticTOC.ts */ ]
    },
    { 
      id: "api", 
      label: "API", 
      content: api,
      toc: [
        { id: "component-props", title: "Component Props" },
        { id: "hook-api", title: "Hook API" },
        // ... other API sections
      ]
    },
    { 
      id: "theming", 
      label: "Theming", 
      content: theming,
      toc: [
        { id: "css-variables", title: "CSS Variables" },
      ]
    },
  ]}
/>
```

**Critical Rules:**
- ✅ **DO** staticTOC.ts should ONLY contain Overview tab sections
- ✅ **DO** API and Theming TOC items are defined inline in the component doc
- ✅ **DO** Each tab's TOC updates when switching tabs
- ❌ **DO NOT** mix Overview/API/Theming items in staticTOC.ts

---

## Overview Tab Requirements

### Required Sections (in order)

Every section (unless specified as text-only) MUST contain:

1.  **A live working example** (rendered component).
2.  **A `CodeBlock`** showing the implementation.
#### 1. Introduction

Explain what the component does and its key features.
**Quality:** 4-6 bullet points using `<strong>` for feature names.

#### 2. When to Use

Guide users on choosing the right variant. Use the standardized `<UsageGuidelines />` component from `shared.tsx`. Include both 'Use it when:' and 'Don't use it:' points.

#### 3. Basic Usage

The simplest implementation using standard TypeScript/React patterns.

#### 4. Visual Variants

Standard stylistic variations (e.g., Primary, Ghost, Outline). Use the title '**Visual Variants**.'

#### 5. Custom Usage

How to extend the component, pass custom children, or utilize render props.

#### 6. Positioning

**Purpose:** Guidance on IDE layout integration.
**Requirement:** Describe behavior in sidebars, editor panes, or floating overlays. Explain alignment, z-index logic, or container constraints.

#### 7. The Aer Variant

**Purpose:** Highlight the premium "Aer" aesthetic. It must be given its own high-visibility section.
**Requirements:**
- ✅ Must include a live example with vibrant background (`aer-vibrant-container`)
- ✅ Must include both `ts` snippet and `fullCode` in CodeBlock
- ✅ **Must include a Pro Tip** explaining:
  - Background requirements (dark/colorful)
  - Glassmorphism benefits
  - Component-specific use cases

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
  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
    <p className="text-sm text-blue-700 dark:text-blue-400">
      <strong>Pro tip:</strong> The Aer variant for [Component] works best on
      dark or colorful backgrounds where the glassmorphism effect can shine.
      [Add component-specific usage guidance here.]
    </p>
  </div>
</DocSection>
```

#### 8. Framework Agnostic Design

Avoid passing complex React Nodes as props where a simple string, number, or boolean would suffice. This ensures easier migration to other frameworks (Vue/Angular) via Web Components in the future.

#### 9. Accessibility First

Every interactive element must have proper ARIA attributes, keyboard support, and focus management.

#### 10. Interaction States

**Purpose:** Document interaction states.
**Requirements:** Must visually demonstrate **Hover**, **Active**, **Disabled**, **Loading**, and **Focused** states using Tailwind modifiers.

#### 11. Specialized Contexts

**Purpose:** Context-aware versions of the component.
**Example:** How the component behaves differently in 'Debug Mode' vs. 'Writing Mode.'

#### 12. Validation & Errors

**Purpose:** Error handling and data constraints.
**Requirements:** Show error rings, helper text, and `aria-invalid` implementation.

#### 13. Granular Styling

**Purpose:** How to override internal slots.
**Structure:** Explain the `classNames` or `styles` prop for targeting internal elements (e.g., root, label, icon).

#### 14. Real World Example

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

## Quality Checklist

- [ ] **Positioning:** Does it explain IDE layout behavior?
- [ ] **Aer Variant:** Is the flagship style given its own high-visibility section?
- [ ] **Aer Variant Pro Tip:** Does the Aer Variant section include a Pro Tip explaining background requirements and use cases?
- [ ] **States:** Are hover/focus/loading states visually demonstrated?
- [ ] **Granular Styling:** Is there a list of styleable "slots" or internal classes?
- [ ] **Introduction:** Does it have 4-6 bullet points with `<strong>` tags?
- [ ] **Code Examples:** Are both `ts` snippet and `fullCode` provided? The `fullCode` MUST be a standalone, copy-paste ready React component.
- [ ] **Working Examples:** Does EVERY section include a live visual demonstration AND a CodeBlock?
- [ ] **Tabs:** Are all three tabs (Overview, API, Theming) implemented?

---

## Maintenance & Release Protocol

Whenever a new feature is added or removed, or a component is updated, the following files MUST be updated:

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

---

## Code Push Guidelines

Before pushing any code to the repository, you MUST follow these steps to ensure documentation integrity:

1.  **Sync Project Files**: Synchronize the following files with your changes:
    - Update [CHANGELOG.md](./CHANGELOG.md) (v0.x.x) - MUST include details for all fixes, patches, and feature updates
    - Update [README.md](./README.md) features/tables
    - Update [ROADMAP.md](./ROADMAP.md) & RoadmapDoc.tsx
    - Update ContributingDoc.tsx if standards changed
2.  **Audit Component Docs**: For any updated or edited components, thoroughly verify:
    - Verify TOC matches section order
    - Check API table for all current props
    - Ensure fullCode contains all imports
    - Confirm Pro Tip is present for Aer Variant
3.  **Standard Compliance**: Ensure the "Aer Variant" Pro Tip is present and the overview tab follows the required 3-tab layout.
