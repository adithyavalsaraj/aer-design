# Aer Design

**Weightless, High-Performance React Component Library**

Aer Design is a modern, accessible, and highly customizable component library built with [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com), and [Radix UI](https://www.radix-ui.com/). It emphasizes minimal bundle size ("weightless") and premium aesthetics.

![Aer Design](https://github.com/user-attachments/assets/placeholder-banner.png)

## Features

- 🪶 **Weightless**: Zero-runtime CSS-in-JS overhead. Built on standard CSS variables and Tailwind.
- ♿ **Accessible**: Full WAI-ARIA compliance via Radix UI primitives.
- 🎨 **Themable**: 8 persistent color themes & dark mode support out of the box.
- 🌍 **RTL Support**: First-class support for Right-to-Left layouts.
- ⚡ **Performance**: Optimized for speed with minimal re-renders.
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions.

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

| Component     | Description                                                                            |
| :------------ | :------------------------------------------------------------------------------------- |
| **Button**    | Highly interactive buttons with variants (primary, outline, ghost) and loading states. |
| **Input**     | Enhanced text inputs with floating labels, icons, masking, and validation.             |
| **Dropdown**  | Virtualized select menus with search, multi-select, grouping, and auto-positioning.    |
| **Menu**      | Context menus with 360° auto-positioning, nested submenus, and keyboard navigation.    |
| **Checkbox**  | Tri-state checkboxes with rich layout options (card mode, descriptions).               |
| **Radio**     | Radio groups for single-selection, supporting card layouts.                            |
| **Sidebar**   | Responsive, collapsible navigation sidebar with overlay and rail modes.                |
| **Navbar**    | Adaptive top navigation bar with branding and actions.                                 |
| **Textarea**  | Auto-resizing text areas with character counts.                                        |
| **OTP Input** | Secure and accessible one-time password inputs.                                        |

## Utilities

| Utility                      | Description                                                                     |
| :--------------------------- | :------------------------------------------------------------------------------ |
| **calculateOptimalPosition** | Function for manual position calculation with 360° collision detection.         |
| **useAutoPosition**          | React hook for automatic positioning of floating elements (tooltips, popovers). |
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

### Auto-Positioning

Dropdown and Menu components automatically adjust their position to stay within the viewport, intelligently flipping sides and alignments as needed.

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
