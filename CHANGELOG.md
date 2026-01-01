# Changelog

All notable changes to the Aer Design project will be documented in this file.

## [v0.6.2] - 2026-01-02

### New Features

- **Positioning Utilities**: Exposed positioning utilities for public use.
  - **`calculateOptimalPosition`**: Function for manual position calculation with 360-degree collision detection.
  - **`useAutoPosition`**: React hook for automatic positioning of floating elements.
  - Both utilities intelligently reposition elements to stay within viewport boundaries.
  - Comprehensive documentation with 7 interactive examples (tooltips, popovers, notifications).
  - Complete API documentation with TypeScript types.
  - Available under Utilities > Positioning in documentation.

### Documentation

- **Positioning Documentation**: Added comprehensive guide with practical examples:
  - Introduction and when-to-use guide
  - Manual calculation examples
  - React hook examples
  - Custom tooltip component
  - Custom popover component
  - Real-world notification system
- **Improved Examples**: Enhanced clarity of positioning demos with better explanations and visual feedback.

## [v0.6.1] - 2026-01-02

### Bug Fixes

- **Dropdown**: Fixed TypeScript type narrowing issue in `flattenOptions` helper function.
  - Resolved error: "Property 'items' does not exist on type 'DropdownOption'".
  - Replaced manual type checking with proper type guard functions (`isGroup`, `isOptionItem`, `isSeparator`).
  - Improved type safety and code maintainability.

### Improvements

- **Type Safety**: Enhanced TypeScript type guards across Dropdown component for better compile-time safety.

## [v0.6.0] - 2026-01-01

### Menu Enhancements

- **360-Degree Positioning**: Implemented robust auto-positioning that intelligently flips the menu to any side (Top, Bottom, Left, Right) and adjusts alignments to ensure full visibility within the viewport.
- **Adaptive SubMenus**: SubMenu widths now match their parent trigger width by default (via CSS variables) while respecting custom width classes.
- **Shared Positioning Utility**: Extracted positioning logic into reusable `calculateOptimalPosition` utility and `useAutoPosition` hook for use across all floating components.
- **Documentation**: Comprehensive API reference update for all Menu components.

## [v0.5.0] - 2025-12-31

### Documentation System Overhaul

- **Architecture**: Refactored the internal architecture of the documentation app.
  - Decomposed `App.tsx` into `DocsLayout` (shell), `PageRenderer` (routing), and `useHashRouter` (logic).
  - Extracted static configuration data to `src/docs/data/staticTOC.ts`.
- **Navigation**: Implemented a **Dynamic Table of Contents** system.
  - Automatically identifies and populates API and Theming sections in the sidebar.
  - Ensured all "On this page" sidebars function correctly across all tabs (API, Theming).
- **Utilities**: Added a dedicated **Utilities** page.
  - Documents `AerConfigProvider` (formerly `DirectionProvider`).
  - Explains Global Sizing and RTL (Right-to-Left) configuration.
- **Fixes**:
  - Replaced the placeholder "Direction Provider" text in the sidebar with "Utilities".
  - Fixed TOC linking issues by adding explicit `id` attributes to component headers ("InputProps", "CSS Variables", etc.).

## [v0.4.0] - 2025-12-30

### Advanced Form Components

- **Dropdown**: Introduced the `Dropdown` component.
  - Features: Virtualized list rendering, search/filter capability, multi-select mode, and custom rendering.
  - Support for grouped options and separators.
  - Keyboard navigation with Arrow keys, Home, End, Enter, and Space.
  - Auto-positioning to prevent viewport overflow.
- **OTP Input**: Introduced the `OtpInput` component.
  - Features: Secure one-time password entry, auto-focus, and copy-paste support.
- **Selection Controls**: Enhanced `Checkbox` and `Radio`.
  - Added "Card" layout variants for rich selection UIs.
  - Added support for descriptions and error states.

## [v0.3.0] - 2025-12-29

### Layout Primitives

- **Sidebar**: Introduced the `Sidebar` component.
  - Modes: Overlay, Floating, Fixed, and Rail (collapsed).
  - Features: Responsive behavior with mobile backdrop support.
- **Navbar**: Introduced the `Navbar` component.
  - Features: Branding slot, action buttons, and responsive bottom-navigation mode for mobile.

## [v0.2.0] - 2025-12-28

### Core Inputs

- **Input**: Major enhancements to the text input.
  - Added Floating Labels support.
  - Added Start/End icons and Prefix/Suffix support.
  - Added Input Masking functionality.
  - Added visual validation states (error, success).
- **Textarea**: Introduced the `Textarea` component.
  - Features: Auto-resizing height, character count display, and floating labels.

## [v0.1.0] - 2025-12-27

### Initial Release

- **Button**: Launched with Primary, Outline, Ghost, and Destructive variants.
  - Included native loading state support.
- **Theming Engine**:
  - Released 8 persistent color themes (Sapphire, Ruby, Emerald, etc.).
  - Built-in Dark Mode support via `ThemeProvider`.
- **RTL**: Established core support for Right-to-Left layouts using CSS Logical Properties.
