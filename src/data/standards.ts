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
    shortDesc: "Use cases and best practices (UsageGuidelines)",
    fullDesc:
      "Guide users on choosing the right variant. Use the standardized `<UsageGuidelines />` component from `shared.tsx`. Include both 'Use it when:' and 'Don't use it:' points.",
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
    title: "Framework Agnostic Design",
    shortDesc: "Design for future framework migrations",
    fullDesc:
      "Avoid passing complex React Nodes as props where a simple string, number, or boolean would suffice. This ensures easier migration to other frameworks (Vue/Angular) via Web Components in the future.",
    id: "framework-agnostic",
  },
  {
    title: "Accessibility First",
    shortDesc: "ARIA, keyboard, and focus management",
    fullDesc:
      "Every interactive element must have proper ARIA attributes, keyboard support, and focus management.",
    id: "a11y",
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

/**
 * COLOR_PALETTE - App-Wide Decorative Color Scheme
 *
 * Purpose: Provides a cohesive, modern color palette for decorative elements
 * (gradients, hero sections, badges, illustrations) that works beautifully in
 * both light and dark modes.
 *
 * IMPORTANT: This palette is ONLY for decorative/accent purposes.
 * DO NOT use these colors for:
 * - Theme system (Sapphire, Carbon, Ruby, Emerald, Sunset, Amber, Amethyst, Ocean)
 * - Component variants (primary, secondary, etc.)
 * - Semantic colors (success, error, warning, info)
 *
 * These colors are theme-agnostic and safe to use in any theme.
 */
export const COLOR_PALETTE = {
  /**
   * Primary Palette - Main decorative colors
   * Use for: Hero sections, primary gradients, main accents
   */
  primary: {
    blue: {
      light: "from-blue-500 to-blue-600",
      base: "blue-500",
      dark: "blue-600",
      description: "Trustworthy, professional, tech-forward",
    },
    cyan: {
      light: "from-cyan-400 to-cyan-500",
      base: "cyan-500",
      dark: "cyan-600",
      description: "Modern, fresh, innovative",
    },
    emerald: {
      light: "from-emerald-400 to-emerald-500",
      base: "emerald-500",
      dark: "emerald-600",
      description: "Growth, success, vibrant energy",
    },
  },

  /**
   * Complementary Palette - Supporting colors
   * Use for: Secondary accents, variety in multi-element displays
   */
  complementary: {
    teal: {
      base: "teal-500",
      description: "Balanced, calming, sophisticated",
    },
    sky: {
      base: "sky-500",
      description: "Light, airy, open",
    },
    green: {
      base: "green-500",
      description: "Natural, positive, completion",
    },
  },

  /**
   * Gradient Combinations - Pre-defined gradient pairs
   * Use for: Backgrounds, hero sections, cards
   */
  gradients: {
    // Primary gradients
    ocean: "from-blue-500 via-cyan-500 to-emerald-500",
    sky: "from-blue-400 via-cyan-400 to-sky-400",
    forest: "from-emerald-500 via-teal-500 to-cyan-500",

    // Subtle backgrounds (with opacity)
    oceanSubtle: "from-blue-500/10 via-cyan-500/10 to-emerald-500/10",
    skySubtle: "from-blue-400/10 via-cyan-400/10 to-sky-400/10",

    // Accent gradients
    progress: "from-green-500 via-blue-500 to-cyan-500",
    highlight: "from-blue-600 to-cyan-600",
  },

  /**
   * Usage Guidelines
   */
  guidelines: {
    dos: [
      "✅ Use for hero sections and landing page elements",
      "✅ Use for progress bars and completion indicators",
      "✅ Use for decorative badges and labels",
      "✅ Use for gradient backgrounds with low opacity (/10)",
      "✅ Combine with theme-aware text colors (text-aer-foreground)",
    ],
    donts: [
      "❌ Don't use for interactive component states",
      "❌ Don't use for semantic meanings (error, success, etc.)",
      "❌ Don't override theme system colors",
      "❌ Don't use high opacity gradients on text backgrounds",
      "❌ Don't mix with purple (deprecated color)",
    ],
  },

  /**
   * Examples
   */
  examples: {
    heroBackground:
      "bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10",
    iconBadge: "bg-gradient-to-br from-blue-500 to-cyan-500",
    headingText:
      "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
    progressBar: "bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500",
    accentBadge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
};

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

export const TAB_STRUCTURE = {
  description:
    "Every component documentation must use the 3-tab structure with separate TOC for each tab",
  tabs: [
    {
      id: "overview",
      label: "Overview",
      tocSource: "staticTOC.ts - component key (e.g., 'popover')",
      tocContent: "All Overview sections (Introduction → Real World Example)",
    },
    {
      id: "api",
      label: "API",
      tocSource: "Inline in component doc file",
      tocContent:
        "Component Props, Hook APIs, Compound Components, Variant Guides",
    },
    {
      id: "theming",
      label: "Theming",
      tocSource: "Inline in component doc file",
      tocContent: "CSS Variables, Granular Styling",
    },
  ],
  implementation: `// In ComponentDoc.tsx
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
/>`,
  notes: [
    "staticTOC.ts should ONLY contain Overview tab sections",
    "API and Theming TOC items are defined inline in the component doc",
    "Each tab's TOC updates when switching tabs",
    "Do NOT mix Overview/API/Theming items in staticTOC.ts",
  ],
};
