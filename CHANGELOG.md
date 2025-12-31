# Changelog

All notable changes to the Aer Design project will be documented in this file.

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
