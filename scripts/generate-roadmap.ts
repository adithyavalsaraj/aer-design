import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  getCategoryStats,
  getStats,
  Priority,
  ROADMAP_DATA,
} from "../src/data/roadmap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(ROOT_DIR, "ROADMAP.md");

// --- Static Content ---
const HEADER = `# Aer Design Roadmap

- **Version**: \`v0.12.0\`
- **Last Updated**: ${new Date().toISOString().split("T")[0]}
- **Status**: Stable

---

## 📋 Table of Contents

- [Project Vision](#project-vision)
- **Overall Progress**: {{PROGRESS_SUMMARY}}
- [Completed Components](#completed-components)
- [Completed Utilities & Hooks](#completed-utilities--hooks)
- [Missing Components](#missing-components)
- [Future Enhancements](#future-enhancements)
- [Long-Term Vision](#long-term-vision)

---

## 🎯 Project Vision

**Aer Design** is a weightless, high-performance React component library built with React 19, Tailwind CSS 4, and Radix UI. Our mission is to provide developers with:

- **Zero-runtime overhead** through native CSS variables
- **Premium aesthetics** with glassmorphism and modern design patterns
- **Full accessibility** via WAI-ARIA compliance
- **Comprehensive theming** with 8 built-in color themes
- **Developer experience** with TypeScript and granular styling control

---

## ✅ Completed Components

### Core Components ({{COMPLETED_COUNT}})

| Component | Version | Description | Key Features |
| --------- | ------- | ----------- | ------------ |
{{COMPLETED_TABLE}}

### Provider Components ({{PROVIDER_COUNT}})

| Component | Version | Description |
| --------- | ------- | ----------- |
{{PROVIDER_TABLE}}

---

## 🛠️ Completed Utilities & Hooks

### Positioning System

- ✅ \`calculateOptimalPosition\` - Manual position calculation with 360° collision detection
- ✅ \`useAutoPosition\` - React hook for automatic floating element positioning
- ✅ Comprehensive documentation with 7 interactive examples

### Contrast & Accessibility

- ✅ \`useContrastColor\` - Automatic WCAG-compliant text color calculation
- ✅ \`getAccessibleTextColor\` - Utility for accessible text color determination
- ✅ \`getContrastRatio\` - WCAG contrast ratio calculator
- ✅ \`meetsWCAG\` - WCAG AA/AAA compliance checker
- ✅ \`getLuminance\` - Relative luminance calculation

### Keyboard Shortcuts

- ✅ \`useShortcut\` - Hook for scoped keyboard shortcuts
- ✅ \`ShortcutRecorder\` - UI component for recording custom shortcuts
- ✅ \`ShortcutProvider\` - Centralized shortcut management with persistence

### Theming

- ✅ \`cn\` - Tailwind class merging utility
- ✅ CSS variable-based theming system
- ✅ 8 built-in themes (Sapphire, Carbon, Ruby, Amber, Emerald, Amethyst, Sunset, Ocean)

---

## 🚧 Missing Components

### High Priority

{{HIGH_PRIORITY_LIST}}

### Medium Priority

{{MEDIUM_PRIORITY_LIST}}

### Low Priority

{{LOW_PRIORITY_LIST}}

---

## 🚀 Future Enhancements

### Component Improvements

#### Existing Components

- [ ] **Dropdown**: Add virtual scrolling performance optimizations
- [ ] **Sidebar**: Add animation presets for transitions
- [ ] **Menu**: Add mega menu variant for complex navigation
- [ ] **Input**: Add input group component for combining multiple inputs
- [ ] **Button**: Add button group component
- [ ] **All Components**: Expand aer variant coverage to all components

#### Documentation

- [ ] Add Storybook integration for interactive component playground
- [ ] Create video tutorials for complex components
- [ ] Add CodeSandbox/StackBlitz examples for each component
- [ ] Create migration guides from other UI libraries
- [ ] Add accessibility testing guides

### Developer Experience

#### Tooling

- [ ] Create CLI tool for component scaffolding
- [ ] Add Figma design kit with all components
- [ ] Create VS Code extension with snippets
- [ ] Add ESLint plugin for best practices
- [ ] Create component generator templates

#### Testing

- [ ] Add comprehensive unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright)
- [ ] Add visual regression tests
- [ ] Add accessibility automated tests (axe-core)
- [ ] Set up CI/CD pipeline

#### Build & Distribution

- [ ] Optimize bundle size with tree-shaking analysis
- [ ] Add CSS-only distribution option
- [ ] Create separate package for utilities only
- [ ] Add CDN distribution
- [ ] Create framework adapters (Vue, Svelte, Angular)

### Advanced Features

#### Theming

- [ ] Add theme builder UI for custom themes
- [ ] Add theme marketplace/sharing
- [ ] Add CSS-in-JS option for dynamic theming
- [ ] Add theme preview mode in documentation
- [ ] Add seasonal theme packs

#### Accessibility

- [ ] Add screen reader testing suite
- [ ] Create accessibility report generator
- [ ] Add high contrast mode
- [ ] Add reduced motion preferences
- [ ] Add focus visible indicators customization

#### Internationalization

- [ ] Add built-in i18n support
- [ ] Add locale-specific date/time formatting
- [ ] Add currency formatting utilities
- [ ] Expand RTL support documentation
- [ ] Add translation contribution guide

#### Performance

- [ ] Add React Server Components support
- [ ] Add Suspense boundaries for code splitting
- [ ] Create performance monitoring utilities
- [ ] Add lazy loading strategies documentation
- [ ] Optimize re-render performance

---

## 🔮 Long-Term Vision

### Year 1 (2026)

**Goal:** Establish Aer Design as a complete, production-ready UI library

- ✅ Complete all high-priority missing components (Modal, Tabs, Accordion, Popover, Toast)
- ✅ Achieve 80%+ test coverage
- ✅ Publish to npm as public package
- ✅ Reach 1,000+ GitHub stars
- ✅ Create comprehensive Storybook documentation
- ✅ Establish community contribution guidelines

### Year 2 (2027)

**Goal:** Expand ecosystem and community adoption

- 🎯 Add all medium-priority components
- 🎯 Create framework adapters (Vue, Svelte)
- 🎯 Launch Figma design system
- 🎯 Establish enterprise support tier
- 🎯 Reach 10,000+ npm weekly downloads
- 🎯 Host first community conference/meetup

### Year 3 (2028)

**Goal:** Become industry-leading design system

- 🎯 Complete all planned components
- 🎯 Launch AI-powered component generator
- 🎯 Create visual builder/editor
- 🎯 Establish design system certification program
- 🎯 Partner with major frameworks and platforms
- 🎯 Reach 100,000+ npm weekly downloads

---

## 📊 Component Completion Status

### Overall Progress

\`\`\`

Completed Components: {{COMPLETED_STAT}}/{{TOTAL_STAT}} ({{PERCENTAGE_STAT}}%)
High Priority Missing: {{HIGH_PRIORITY_STAT}}/{{TOTAL_STAT}} ({{HIGH_PERCENTAGE_STAT}}%)
Medium Priority Missing: {{MEDIUM_PRIORITY_STAT}}/{{TOTAL_STAT}} ({{MEDIUM_PERCENTAGE_STAT}}%)
Low Priority Missing: {{LOW_PRIORITY_STAT}}/{{TOTAL_STAT}} ({{LOW_PERCENTAGE_STAT}}%)

\`\`\`

### Category Breakdown

| Category | Completed | Missing | Total |
| -------- | --------- | ------- | ----- |
{{CATEGORY_STATS_TABLE}}

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Pick a component** from the "Missing Components" section
2. **Follow the design principles**: Weightless, accessible, themable
3. **Include comprehensive documentation** with examples
4. **Add tests** for all functionality
5. **Submit a PR** with detailed description

For detailed contribution guidelines, see \`CONTRIBUTING.md\` (to be created).

---

## 📝 Notes

- All components must maintain the "weightless" philosophy (minimal runtime overhead)
- Accessibility is non-negotiable - all components must be WAI-ARIA compliant
- Every component should support the "aer" glassmorphism variant
- Documentation must include API tables, examples, and theming information
- TypeScript types must be comprehensive and exported

---

**Last Updated:** ${new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})}
**Maintained by:** Aer Design Team
**License:** MIT

\`\`\`

\`\`\`
`;

// --- Generators ---

function generateCompletedTable() {
  return ROADMAP_DATA.filter(
    (i) =>
      i.status === "Completed" &&
      i.category !== "Configuration" &&
      i.category !== "Utilities"
  )
    .map(
      (i) =>
        `| **${i.name}** | ${i.version} | ${i.description} | ${
          i.features
            ? i.features.join(", ")
            : i.category === "Layout"
            ? "Layout component"
            : "Standard component"
        } |`
    )
    .join("\n");
}

function generateProviderTable() {
  return ROADMAP_DATA.filter(
    (i) => i.status === "Completed" && i.category === "Configuration"
  )
    .map((i) => `| **${i.name}** | ${i.version} | ${i.description} |`)
    .join("\n");
}

function generateMissingList(priority: Priority) {
  const items = ROADMAP_DATA.filter(
    (i) => i.status !== "Completed" && i.priority === priority
  );
  let counter = priority === "High" ? 1 : priority === "Medium" ? 4 : 7; // Just a loose continuation for numbering if needed, but we can just use loop index + offset
  // Actually the logic for numbering in the original file was continuous.
  // High: 1-3. Medium: 4-6. Low: 7-...
  // I entered 12 components in the new data.
  // Let's dynamic numbering based on previous counts.

  // Calculate start offset
  let offset = 1;
  if (priority === "Medium") {
    offset =
      1 +
      ROADMAP_DATA.filter(
        (i) => i.status !== "Completed" && i.priority === "High"
      ).length;
  } else if (priority === "Low") {
    offset =
      1 +
      ROADMAP_DATA.filter(
        (i) => i.status !== "Completed" && i.priority === "High"
      ).length +
      ROADMAP_DATA.filter(
        (i) => i.status !== "Completed" && i.priority === "Medium"
      ).length;
  }

  return items
    .map((item, index) => {
      const num = offset + index;
      return `#### ${num}. **${item.name}**

- **Status:** Not implemented
- **Priority:** ${priority}
- **Description:** ${item.description}
- **Required Features:**
${
  item.features
    ? item.features.map((f) => `  - ${f}`).join("\n")
    : "  - Standard implementation"
}
`;
    })
    .join("\n");
}

function generateCategoryStatsTable() {
  const stats = getCategoryStats();
  return stats
    .map((s) => {
      const missing = s.total - s.completed;
      return `| **${s.name}** | ${s.completed} | ${missing} | ${s.total} |`;
    })
    .join("\n");
}

// --- Main Execution ---

const stats = getStats();
const completedCount = ROADMAP_DATA.filter(
  (i) =>
    i.status === "Completed" &&
    i.category !== "Configuration" &&
    i.category !== "Utilities"
).length;
const providerCount = ROADMAP_DATA.filter(
  (i) => i.status === "Completed" && i.category === "Configuration"
).length;

let content = HEADER.replace(
  "{{PROGRESS_SUMMARY}}",
  `${stats.completed}/${stats.total} components completed (${Math.round(
    (stats.completed / stats.total) * 100
  )}%)`
)
  .replace("{{COMPLETED_COUNT}}", String(completedCount))
  .replace("{{COMPLETED_TABLE}}", generateCompletedTable())
  .replace("{{PROVIDER_COUNT}}", String(providerCount))
  .replace("{{PROVIDER_TABLE}}", generateProviderTable())
  .replace("{{HIGH_PRIORITY_LIST}}", generateMissingList("High"))
  .replace("{{MEDIUM_PRIORITY_LIST}}", generateMissingList("Medium"))
  .replace("{{LOW_PRIORITY_LIST}}", generateMissingList("Low"))
  // Stats Block
  .replace("{{COMPLETED_STAT}}", String(stats.completed))
  .replace("{{TOTAL_STAT}}", String(stats.total))
  .replace(
    "{{PERCENTAGE_STAT}}",
    String(Math.round((stats.completed / stats.total) * 100))
  )
  .replace("{{HIGH_PRIORITY_STAT}}", String(stats.highPriority))
  .replace(
    "{{HIGH_PERCENTAGE_STAT}}",
    String(Math.round((stats.highPriority / stats.total) * 100))
  )
  .replace("{{MEDIUM_PRIORITY_STAT}}", String(stats.mediumPriority))
  .replace(
    "{{MEDIUM_PERCENTAGE_STAT}}",
    String(Math.round((stats.mediumPriority / stats.total) * 100))
  )
  .replace("{{LOW_PRIORITY_STAT}}", String(stats.lowPriority))
  .replace(
    "{{LOW_PERCENTAGE_STAT}}",
    String(Math.round((stats.lowPriority / stats.total) * 100))
  )
  .replace("{{CATEGORY_STATS_TABLE}}", generateCategoryStatsTable());

// Write to file
fs.writeFileSync(TARGET_FILE, content);

console.log(`✅ ROADMAP.md generated successfully!`);
console.log(
  `Stats: ${stats.completed}/${stats.total} (${Math.round(
    (stats.completed / stats.total) * 100
  )}%)`
);
