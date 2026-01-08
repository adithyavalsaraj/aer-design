# Aer Design

**Weightless, High-Performance React Component Library**

Aer Design is a modern, accessible, and highly customizable component library built with [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com), and [Radix UI](https://www.radix-ui.com/). It emphasizes minimal bundle size ("weightless") and premium aesthetics.

![Aer Design](https://github.com/user-attachments/assets/placeholder-banner.png)

## Features

- 🪶 **Weightless**: Zero-runtime CSS-in-JS overhead. Built on standard CSS variables and Tailwind.
- ♿ **Accessible**: Full WAI-ARIA compliance via Radix UI primitives + automatic WCAG 2.1 contrast.
- 🎨 **Themable**: 8 persistent color themes & dark mode support out of the box.
- 🌍 **RTL Support**: First-class support for Right-to-Left layouts.
- ⚡ **Performance**: Optimized for speed with minimal re-renders.
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions.
- 🔍 **Auto-Contrast**: Automatic text color calculation for WCAG AA/AAA compliance.
- 📚 **Production-Ready Docs**: 100% components include copy-pasteable, standalone `fullCode` examples.

## Installation

```bash
npm install aer-design
# or
pnpm add aer-design
# or
yarn add aer-design
```

## Quick Start

1.  **Wrap your application** in the `ThemeProvider` AND `AerConfigProvider`:

```tsx
import { ThemeProvider, AerConfigProvider } from "aer-design/components";
import "aer-design/style.css"; // Import global styles

function App() {
  return (
    <ThemeProvider defaultTheme="system" defaultThemeColor="blue">
      <AerConfigProvider>
        <YourApp />
      </AerConfigProvider>
    </ThemeProvider>
  );
}
```

2.  **Use Components**:

```tsx
import { Button, Input, Dropdown } from "aer-design";

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input label="Email" type="email" placeholder="user@example.com" />
      <Input label="Password" type="password" />
      <Button variant="primary" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
```

## Components

| Component     | Description                                                                                         |
| :------------ | :-------------------------------------------------------------------------------------------------- |
| **Button**    | Highly interactive buttons with variants (primary, outline, ghost) and loading states.              |
| **Avatar**    | User/Entity representation with fallbacks, status indicators, and grouping.                         |
| **Input**     | Enhanced text inputs with label positioning, icons, masking, and validation.                        |
| **Dropdown**  | Virtualized select menus with search, multi-select, grouping, and auto-positioning.                 |
| **Menu**      | Context menus with 360° auto-positioning, nested submenus, and keyboard navigation.                 |
| **Checkbox**  | Tri-state checkboxes with rich layout options (card mode, descriptions).                            |
| **Radio**     | Radio groups for single-selection, supporting card layouts.                                         |
| **Sidebar**   | Responsive, collapsible navigation sidebar with overlay and rail modes.                             |
| **Navbar**    | Adaptive top navigation bar with branding and actions.                                              |
| **Textarea**  | Auto-resizing text areas with character counts and label positioning.                               |
| **OTP Input** | Secure and accessible one-time password inputs.                                                     |
| **Dialog**    | **Desktop-class** window system with drag, resize, taskbar stacking, and active Z-index management. |
| **Badge**     | Compact and semantic status indicators with glassmorphism support.                                  |
| **Card**      | Flexible content containers with premium Aer depth and hover effects.                               |
| **Tabs**      | Responsive tab system with lazy loading and automatic scroll navigation.                            |
| **Toast**     | Non-blocking notifications with swipe gestures, stacking, and 9 positioning zones.                  |
| **Divider**   | A visual separator to group content or define sections.                                             |
| **Skeleton**  | Placeholder loading states for content, improving perceived performance.                            |
| **Accordion** | Collapsible content panels for progressive disclosure with full accessibility.                      |

## Utilities

| Utility                      | Description                                                                     |
| :--------------------------- | :------------------------------------------------------------------------------ |
| **calculateOptimalPosition** | Function for manual position calculation with 360° collision detection.         |
| **useAutoPosition**          | React hook for automatic positioning of floating elements (tooltips, popovers). |
| **useContrastColor**         | React hook for automatic WCAG-compliant text color calculation.                 |
| **getAccessibleTextColor**   | Function to determine accessible text color based on background.                |
| **getContrastRatio**         | Calculate WCAG contrast ratio between two colors.                               |
| **useShortcut**              | React hook for scoped, customizable keyboard shortcuts.                         |
| **ShortcutRecorder**         | UI component for recording and customizing user shortcuts.                      |
| **AerConfigProvider**        | Global configuration provider for RTL support and component sizing.             |

## Theming System

Aer Design features a robust theming engine with CSS variables.

### Built-in Themes

| Theme        | Style    | Description                              |
| :----------- | :------- | :--------------------------------------- |
| **Sapphire** | Blue     | Default, professional and clean.         |
| **Carbon**   | Zinc     | Monochrome, sharp and modern.            |
| **Ruby**     | Red      | Bold and energetic.                      |
| **Amber**    | Orange   | Warm and inviting.                       |
| **Emerald**  | Green    | Natural and calm.                        |
| **Amethyst** | Violet   | Creative and royal.                      |
| **Sunset**   | Gradient | **Funky Mode**: Orange to Pink gradient. |
| **Ocean**    | Gradient | **Funky Mode**: Blue to Cyan gradient.   |

### Global Configuration

Use `AerConfigProvider` to configure global settings:

```tsx
<AerConfigProvider
  direction="rtl" // Enable RTL layout
  size="lg" // Global component size: "sm" | "default" | "lg"
>
  <App />
</AerConfigProvider>
```

## Key Features

### Positioning Utilities

Powerful utilities for building custom floating elements:

```tsx
import { useAutoPosition } from "aer-design";

function Tooltip({ content, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side: "top",
    align: "center",
    scrollBehavior: "reposition", // Smoothly follow trigger on scroll
  });

  return (
    <>
      <div ref={referenceRef} onMouseEnter={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles}>
          {content}
        </div>
      )}
    </>
  );
}
```

### Desktop-Class Window System

Aer Design's Dialog component isn't just a modal—it's a full-**Desktop-Class Window System**.

- **Customizable Stacking**: Choose between the classic **Wrap Grid** (bottom-left stacking) or the premium **Scroll Taskbar** (centered dock with horizontal overflow).
- **Global Z-Order**: Interacting with any window (click, drag, maximize) automatically brings it to the front of the visual stack.
- **Viewport Safety**: Intelligent cascading and auto-clamping ("rescue logic") ensures windows stay visible on all screen sizes and during resize.
- **Non-Blocking Overlays**: Transparent backdrops allow seamless interaction with background elements in multi-tasking environments.
- **Granular Styling**: Dedicated CSS classes for every layer, from headers to backdrop overlays.
- **State Persistence**: Remembers precise position and size across maximization, minimization, and restore cycles.

### Auto-Positioning

Dropdown and Menu components automatically adjust their position to stay within the viewport, intelligently flipping sides and alignments as needed.

### Automatic Contrast

Ensure WCAG 2.1 compliance automatically with the contrast calculation system:

```tsx
import { useContrastColor } from "aer-design";

function Card({ bgColor, children }) {
  const textColor = useContrastColor(bgColor);

  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </div>
  );
}

// The text color automatically adjusts to meet WCAG AA standards (4.5:1 ratio)
<Card bgColor="#3498db">Accessible Text</Card> // White text
<Card bgColor="#f1c40f">Accessible Text</Card> // Black text
```

### Performance & Lazy Loading

Optimized for large-scale applications with built-in lazy loading and manual control:

```tsx
import { Tabs, TabContent } from "aer-design";

function App() {
  return (
    <Tabs lazy defaultValue="overview">
      <TabList>
        <TabTrigger value="overview">Overview</TabTrigger>
        <TabTrigger value="details">Details</TabTrigger>
      </TabList>

      {/* Overview loads immediately */}
      <TabContent value="overview">...</TabContent>

      {/* Details loads only when clicked */}
      <TabContent value="details">...</TabContent>
    </Tabs>
  );
}
```

### Type Safety

Full TypeScript support with comprehensive type definitions, type guards, and proper type narrowing for enhanced developer experience.

### Accessibility

All components follow WAI-ARIA guidelines with proper keyboard navigation, focus management, and screen reader support.

## Comparison

| Feature              | Aer Design                | Traditional UI Libs       |
| :------------------- | :------------------------ | :------------------------ |
| **Styling**          | Tailwind CSS 4            | CSS-in-JS (Runtime heavy) |
| **Bundle Size**      | Minimal (Tree-shakable)   | Large (often monolithic)  |
| **Theming**          | Native CSS Variables      | JS Context Providers      |
| **RTL**              | Native Logical Properties | Complex JS Logic          |
| **Granular Styling** | Yes (sub-element props)   | Limited (global only)     |
| **TypeScript**       | Full type safety          | Varies                    |

## Contributing

We welcome contributions! Please feel free to open an issue or submit a Pull Request.

## License

MIT © 2025 Aer Design
