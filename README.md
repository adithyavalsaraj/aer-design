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

## Installation

```bash
npm install aer-design
# or
pnpm add aer-design
# or
yarn add aer-design
```

## Quick Start

1.  **Wrap your application** in the `ThemeProvider` AND `DirectionProvider`:

```tsx
import { ThemeProvider, DirectionProvider } from "aer-design/components";
import "aer-design/style.css"; // Import global styles

function App() {
  return (
    <ThemeProvider defaultTheme="system" defaultThemeColor="blue">
      <DirectionProvider>
        <YourApp />
      </DirectionProvider>
    </ThemeProvider>
  );
}
```

2.  **Use Components**:

```tsx
import { Button, Input } from "aer-design";

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
| **Checkbox**  | Tri-state checkboxes with rich layout options (card mode, descriptions).               |
| **Radio**     | Radio groups for single-selection, supporting card layouts.                            |
| **Sidebar**   | Responsive, collapsible navigation sidebar with overlay and rail modes.                |
| **Navbar**    | Adaptive top navigation bar with branding and actions.                                 |
| **Textarea**  | Auto-resizing text areas with character counts.                                        |
| **OTP Input** | Secure and accessible one-time password inputs.                                        |

## Theming System

Aer Design features a robust theming engine.

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

### Comparison

| Feature         | Aer Design                | Traditional UI Libs       |
| :-------------- | :------------------------ | :------------------------ |
| **Styling**     | Tailwind CSS 4            | CSS-in-JS (Runtime heavy) |
| **Bundle Size** | Minimal (Tree-shakable)   | Large (often monolithic)  |
| **Theming**     | Native CSS Variables      | JS Context Providers      |
| **RTL**         | Native Logical Properties | Complex JS Logic          |

## Contributing

We welcome contributions! Please feel free to open an issue or submit a Pull Request.

## License

MIT © 2025 Aer Design
