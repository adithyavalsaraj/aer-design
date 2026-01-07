export interface DocSection {
  title: string;
  id: string;
  shortDesc: string; // For the ContributingDoc UI
  fullDesc?: string; // For the Markdown file detailed explanation
  required?: boolean;
  proTip?: {
    title: string;
    content: string;
  };
}

export const DOC_STRUCTURE: DocSection[] = [
  {
    title: "Introduction",
    id: "introduction",
    shortDesc: "Brief overview and purpose (4-6 bullets)",
    fullDesc:
      "Explain what the component does and its key features.\n**Quality:** 4-6 bullet points using `<strong>` for feature names.",
  },
  {
    title: "When to Use",
    id: "when-to-use",
    shortDesc: "Use cases and best practices (2-4 grid)",
    fullDesc:
      "Guide users on choosing the right variant. Use the 2-4 category grid layout defined in original standards.",
  },
  {
    title: "Basic Usage",
    id: "basic",
    shortDesc: "Simple implementation with CodeBlock",
    fullDesc:
      "The simplest implementation using standard TypeScript/React patterns.",
  },
  {
    title: "Visual Variants",
    id: "variants",
    shortDesc: "Standard stylistic variations",
    fullDesc:
      "Standard stylistic variations (e.g., Primary, Ghost, Outline). Use the title '**Visual Variants**.'",
  },
  {
    title: "Custom Usage",
    id: "custom",
    shortDesc: "Extensions and render props",
    fullDesc:
      "How to extend the component, pass custom children, or utilize render props.",
  },
  {
    title: "Positioning",
    id: "positioning",
    shortDesc: "IDE layout and container behavior",
    fullDesc:
      "**Purpose:** Guidance on IDE layout integration.\n**Requirement:** Describe behavior in sidebars, editor panes, or floating overlays. Explain alignment, z-index logic, or container constraints.",
  },
  {
    title: "The Aer Variant",
    id: "aer-variant",
    shortDesc: "Premium glassmorphism variant with Pro Tip",
    fullDesc: `**Purpose:** Highlight the premium "Aer" aesthetic. It must be given its own high-visibility section.
**Requirements:**
- ✅ Must include a live example with vibrant background (\`aer-vibrant-container\`)
- ✅ Must include both \`ts\` snippet and \`fullCode\` in CodeBlock
- ✅ **Must include a Pro Tip** explaining:
  - Background requirements (dark/colorful)
  - Glassmorphism benefits
  - Component-specific use cases`,
  },
  {
    title: "Interaction States",
    id: "states",
    shortDesc: "Hover, focus, disabled, loading, etc.",
    fullDesc:
      "**Purpose:** Document interaction states.\n**Requirements:** Must visually demonstrate **Hover**, **Active**, **Disabled**, **Loading**, and **Focused** states using Tailwind modifiers.",
  },
  {
    title: "Specialized Contexts",
    id: "specialized",
    shortDesc: "Specific use cases",
    fullDesc:
      "**Purpose:** Context-aware versions of the component.\n**Example:** How the component behaves differently in 'Debug Mode' vs. 'Writing Mode.'",
  },
  {
    title: "Validation & Errors",
    id: "validation",
    shortDesc: "Error states, Validation and helper text",
    fullDesc:
      "**Purpose:** Error handling and data constraints.\n**Requirements:** Show error rings, helper text, and `aria-invalid` implementation.",
  },
  {
    title: "Granular Styling",
    id: "styling",
    shortDesc: "Custom styling examples",
    fullDesc:
      "**Purpose:** How to override internal slots.\n**Structure:** Explain the `classNames` or `styles` prop for targeting internal elements (e.g., root, label, icon).",
  },
  {
    title: "Real World Example",
    id: "real-world",
    shortDesc: "Production-ready example",
    fullDesc:
      "**Purpose:** A 30-60 line production-ready implementation (e.g., a complex IDE form or dashboard widget).",
  },
];

export const REQUIRED_FEATURES = [
  "TypeScript with comprehensive types",
  "WAI-ARIA accessibility compliance",
  "Keyboard navigation support",
  "RTL (Right-to-Left) support",
  "Theme-aware styling with CSS variables",
  "Aer glassmorphism variant",
];

export const DESIGN_PRINCIPLES = [
  { label: "Weightless", value: "Minimal runtime overhead" },
  { label: "Composable", value: "Small, focused components" },
  { label: "Accessible", value: "WCAG 2.1 AA compliant" },
  { label: "Themable", value: "CSS variable-based theming" },
  { label: "Premium", value: "Modern glassmorphism aesthetics" },
];

export const CODE_PUSH_GUIDELINES = {
  step1: {
    title: "Sync Project Files",
    items: [
      "Update CHANGELOG.md (v0.x.x)",
      "Update README.md features/tables",
      "Update ROADMAP.md & RoadmapDoc.tsx",
      "Update ContributingDoc.tsx if standards changed",
    ],
  },
  step2: {
    title: "Audit Component Docs",
    items: [
      "Verify TOC matches section order",
      "Check API table for all current props",
      "Ensure fullCode contains all imports",
      "Confirm Pro Tip is present for Aer Variant",
    ],
  },
};

export const BEST_PRACTICES = [
  {
    title: "✨ Make Examples Beautiful",
    desc: "Don't show \"Simple Content Card\" - create realistic, visually appealing examples that showcase the component's capabilities. Use real-world data, icons, and proper styling.",
  },
  {
    title: "🎨 Show Visual Differences",
    desc: "For variant examples, make each variant visually distinct. Add icons, descriptions, and context so users can immediately see the differences.",
  },
  {
    title: "📝 Provide Context",
    desc: "Every code example should be production-ready. Include imports, proper TypeScript types, and realistic use cases that developers can copy directly into their projects.",
  },
  {
    title: "🔍 Demonstrate Edge Cases",
    desc: "Show how the component behaves in different scenarios: long text, empty states, error states, loading states, and responsive layouts.",
  },
  {
    title: "✨ Include Aer Variant Pro Tips",
    desc: "Every Aer Variant section MUST include a Pro Tip explaining background requirements (dark/colorful), glassmorphism benefits, and component-specific use cases.",
    highlight: true,
  },
];
