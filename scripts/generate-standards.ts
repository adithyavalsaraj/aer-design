import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CODE_PUSH_GUIDELINES, DOC_STRUCTURE } from "../src/data/standards";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET_FILE = path.join(__dirname, "../COMPONENT_STANDARDS.md");

const HEADER = `# Aer Design Documentation Standards (Updated)

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

Every section (unless specified as text-only) MUST contain:

1.  **A live working example** (rendered component).
2.  **A \`CodeBlock\`** showing the implementation.
`;

function generateStandards() {
  let content = HEADER;

  // Generate Overview Sections
  DOC_STRUCTURE.forEach((section, index) => {
    content += `#### ${index + 1}. ${section.title}\n\n`;
    content += `${section.fullDesc || section.shortDesc}\n\n`;

    if (section.id === "aer-variant") {
      // Special handling for Aer Variant code block representation if needed,
      // but the text description in separate fullDesc handles it usually.
      // We can check if additional markdown like code blocks need to be appended.
      content += `\`\`\`tsx
<DocSection
  id="aer-variant"
  title="The Aer Variant"
  description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
>
  <AerExample />
  <CodeBlock
    ts={\`<Component variant="aer" />\`}
    fullCode={\`// Show example with backdrop-blur and specific aer-borders\`}
  />
  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
    <p className="text-sm text-blue-700 dark:text-blue-400">
      <strong>Pro tip:</strong> The Aer variant for [Component] works best on
      dark or colorful backgrounds where the glassmorphism effect can shine.
      [Add component-specific usage guidance here.]
    </p>
  </div>
</DocSection>
\`\`\`\n\n`;
    }
  });

  content += `---

## API Tab Requirements

1. **Component Props Table:** Detailed TS types and default values. Descriptions must explain use cases.
2. **Variant Usage Guide:** Cards explaining the "Why" behind each style.

---

## Theming Tab Requirements

1. **CSS Variables:** List all \`:root\` variables.
2. **Auto-Contrast:** Document support for the \`useContrastColor\` hook and WCAG 2.1 compliance.

---

## Quality Checklist

`;
  // Generate Checklist from Required Features? No, Quality Checklist is slightly different.
  // In standards.ts I didn't explicitly preserve the exact checklist used in the MD file inside a variable.
  // The previous MD file had a "Quality Checklist" section. I should have added that to standards.ts.
  // Let's recreate it based on the data we have or hardcode standard checks.
  // Actually, I missed extracting "Quality Checklist" into standards.ts.
  // I entered "REQUIRED_FEATURES" and "CODE_PUSH_GUIDELINES", but "Quality Checklist" was separate.
  // I will construct it here for now to match the original as closely as possible,
  // or arguably I should update standards.ts.
  // Given the task is automation, I will try to map it from existing data where possible.

  content += `- [ ] **Positioning:** Does it explain IDE layout behavior?
- [ ] **Aer Variant:** Is the flagship style given its own high-visibility section?
- [ ] **Aer Variant Pro Tip:** Does the Aer Variant section include a Pro Tip explaining background requirements and use cases?
- [ ] **States:** Are hover/focus/loading states visually demonstrated?
- [ ] **Granular Styling:** Is there a list of styleable "slots" or internal classes?
- [ ] **Introduction:** Does it have 4-6 bullet points with \`<strong>\` tags?
- [ ] **Code Examples:** Are both \`ts\` snippet and \`fullCode\` provided? The \`fullCode\` MUST be a standalone, copy-paste ready React component.
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

`;

  content += `1.  **${CODE_PUSH_GUIDELINES.step1.title}**: Synchronize the following files with your changes:\n`;
  CODE_PUSH_GUIDELINES.step1.items.forEach((item) => {
    // Extract filename for link if possible, or just list
    // Simple regex to linkify common files
    const linkified = item
      .replace(/([A-Z]+\.md)/g, "[$1](./$1)")
      .replace(/(src\/docs\/pages\/[A-Za-z]+\.tsx)/g, "[$1](./$1)");
    content += `    - ${linkified}\n`;
  });

  content += `2.  **${CODE_PUSH_GUIDELINES.step2.title}**: For any updated or edited components, thoroughly verify:\n`;
  CODE_PUSH_GUIDELINES.step2.items.forEach((item) => {
    content += `    - ${item}\n`;
  });

  content += `3.  **Standard Compliance**: Ensure the "Aer Variant" Pro Tip is present and the overview tab follows the required 3-tab layout.\n`;

  fs.writeFileSync(TARGET_FILE, content);
  console.log(`✅ COMPONENT_STANDARDS.md generated successfully!`);
}

generateStandards();
