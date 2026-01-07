# Changelog

All notable changes to the Aer Design project will be documented in this file.

## [v0.13.0] - 2026-01-08

### New Features

- **Desktop-Class Window System**
  - **Customizable Stacking**: Choose between the classic **Wrap Grid** (bottom-left stacking) or the premium **Scroll Taskbar** (centered dock with horizontal overflow).
  - **Global Z-Order**: Interacting with any window (click, drag, maximize) automatically brings it to the front of the visual stack.
  - **Viewport Safety**: Intelligent cascading and auto-clamping ("rescue logic") ensures windows stay visible on all screen sizes and during resize.
  - **Non-Blocking Overlays**: Transparent backdrops allow seamless interaction with background elements in multi-tasking environments.
- **Improved Metadata Registry**: Dialogs now support `title` and `icon` props for automatic taskbar identification.
- **Granular Styling**: Dedicated CSS classes for every layer, from headers to backdrop overlays.
- **State Persistence**: Remembers precise position and size across maximization, minimization, and restore cycles.

## [v0.12.0] - 2026-01-07

### Documentation Remediation

- **100% fullCode Coverage**: Completed the documentation remediation for all 16 major components as per `COMPONENT_STANDARDS.md`.
- **Production-Ready Examples**: All code examples now feature a `fullCode` prop, providing standalone, copy-pasteable React components with all required imports.
- **Improved DX**: Simplified the developer experience by ensuring every documentation section has a functional, self-contained code snippet.

### New Features

- **Toast**: Released the Toast notification system (v0.12.0).
  - **Swipe to Dismiss**: Touch-optimized swipe gestures (horizontal/vertical) with configurable threshold.
  - **Positioning**: 9 auto-stacking positions with smart collision detection.
  - **Variants**: Includes standard (Success, Error, etc.) and premium Glassmorphism "Aer" variant.
  - **Modes**: Supports both Zero-Config global usage and Standalone declarative mode.
  - **Accessibility**: Full keyboard support (Esc to dismiss) and ARIA compliance.

### Component Enhancements

- **Cascader**: Added `onBlur` prop support to enable standard validation patterns.
- **Cascader**: Reordered documentation TOC and sections for better logical flow and compliance with standards.
- **Standards**: Established strict **Code Push Guidelines** in `COMPONENT_STANDARDS.md` to maintain documentation integrity.

### Bug Fixes

- **Dropdown**: Fixed a critical bug where the menu would close upon selection due to portal interaction issues. Introduced `menuRef` for more accurate "outside-click" detection.
- **Cascader**: Fixed stateless interactive examples that were failing to update visual selection states.

### Project Sustainability

- **Roadmap Sync**: Synchronized `ROADMAP.md` and `RoadmapDoc.tsx` with latest completion metrics (23/36 components).
- **Contributing Guide**: Updated `ContributingDoc.tsx` to reflect the refined documentation structure requirements.

## [v0.11.0] - 2026-01-06

### New Features

- **Dialog**: Introduced a full-featured, accessible modal system.
  - **Interaction**: Support for draggable and resizable dialogs with position/size memory.
  - **Window Management**: Minimize/Maximize support with intelligent taskbar-style restoration.
  - **Granular Control**: Specific components for Header, Content, and Footer with flexible layout options.
- **Badge**: Added a high-performance semantic marker component.
  - **Hierarchy**: 5 visual styles (filled, outline, soft, ghost, and glassmorphism aer).
  - **Semantics**: Built-in support for success, warning, error, and primary statuses.
- **Divider**: New layout utility with orientation, variant, and label support.
- **Skeleton**: New loading placeholder component with pulse and wave animations.
- **Avatar**: New Avatar and AvatarGroup components with dynamic fallbacks and auto-contrast.
  - **Dynamic Fallbacks**: Automatically generates initials or displays custom icons if images are unavailable.
  - **Status Integration**: Built-in indicators for online, offline, busy, and away states.
  - **Avatar Groups**: Smart overlapping layout for teams with "more" count support and adaptive, size-aware spacing.
  - **Auto-Contrast**: Integrated with `useContrastColor` for accessible initial colors on custom backgrounds.
  - **Transparency Handling**: Improved "soft" variant with an opaque base layer to prevent overlap bleed-through in groups.
- **Card**: Introduced structured flexible containers.
  - **Composition**: Modular sub-components for Title, Description, Content, and Footer.
  - **Aesthetics**: Premium Aer variant with deep glassmorphism and interactive hover transforms.
- **Sidebar**: Enhanced nested navigation configurability.
  - **Border Control**: Added `showNestedBorder` (Sidebar) and `showBorder` (SidebarNestedItem) to toggle left indicators.
  - **Smart Indentation**: Automatically reduces indentation when borders are disabled for a cleaner, unified look.
- **Tabs**: Major performance and navigation overhaul.
  - **Lazy Loading**: Introduced `lazy` and `forceMount` props for optimized tab content rendering.
  - **Scroll Navigation**: Automatic chevron arrows for navigating overflowing tab lists in both orientations.
  - **Interaction**: Unified keyboard arrow key navigation with visual scroll indicators.
- **Positioning**: Introduced customizable scroll behavior for all overlay components.
  - **`scrollBehavior` Prop**: New option to either `"reposition"` (panel follows trigger) or `"close"` (panel dismisses) on container scroll.
  - **Centralized Logic**: Integrated this behavior into `Dropdown`, `Cascader`, `Menu`, and `Tooltip` via a unified `useAutoPosition` hook.
- **Documentation**: Standardized "Aer Variant" sections across all 15+ components.
  - Added component-specific "Pro tips" with usage guidance.
  - Consistent premium background previews in code examples.
  - Explicit recommendations for dark/colorful background compatibility.
  - **Tabs Playground**: New interactive playground for testing variants, orientations, and overflow behavior.

### Bug Fixes

- **Tabs**: Fixed navigation arrow overlap where chevrons could sit on top of tab labels.
- **Tabs**: Fixed JSX syntax error in documentation related to nested DocSections.
- **Overlay**: Fixed Tailwind CSS lint warning in documentation examples.
- **Overlay**: Fixed a critical issue where nested menus in `Cascader` and `Menu` would detach from their parent triggers or get clipped by parent containers during scroll.
  - **Portals**: All nested menu levels are now rendered via Portals with `fixed` strategy for unobstructed visibility.
  - **Auto-Positioning**: Submenus now leverage the full `useAutoPosition` engine for collision detection and scroll-following.
- **Dialog**: Fixed various state z-index and click-through issues during development.

## [v0.10.0] - 2026-01-05

### New Features

- **SidebarNestedItem**: Introduced collapsible nested navigation for Sidebar component.

  - **Multi-Level Nesting**: Support for unlimited nesting depth with recursive structure.
  - **Smart Adaptation**: Automatically renders as floating panels in collapsed/horizontal modes.
  - **Position-Aware Chevrons**: Uses ChevronDown for top, ChevronUp for bottom, ChevronRight for sides.
  - **Active Child Detection**: Recursive detection highlights all ancestor items when any descendant is active.
  - **Customizable Indent**: `indent` prop accepts any CSS unit (px, rem, em, %, etc.) for flexible spacing.
  - **Floating Panels**: Intelligent positioning based on sidebar location (left/right/top/bottom).
  - **Full Width Items**: Panel items properly span container width with labels always visible.
  - **Active Indicators**: Subtle background tint on parent items containing active children.

- **Automatic Contrast System**: Introduced WCAG 2.1 compliant automatic text color calculation.
  - **`useContrastColor`**: React hook for automatic text color calculation based on background.
  - **`getAccessibleTextColor`**: Utility function to determine accessible text color.
  - **`getContrastRatio`**: Calculate WCAG contrast ratio between two colors.
  - **`meetsWCAG`**: Check if contrast ratio meets WCAG AA/AAA standards.
  - **`getLuminance`**: Calculate relative luminance according to WCAG formula.
  - **Color Format Support**: Handles hex, rgb, and rgba color formats.
  - **WCAG Levels**: Supports both AA (4.5:1) and AAA (7:1) compliance levels.
  - **Performance**: Memoized calculations with minimal overhead.
  - **Accessibility First**: Makes WCAG compliance automatic and effortless.

### Component Enhancements

- **Glassmorphism "aer" Variant**: Added premium glassmorphism variant across components.
  - **Button**: Enhanced aer variant with improved transparency and blur effects.
  - **Input**: Added aer variant with glassmorphism styling.
  - **Dropdown**: Added aer variant to both trigger and menu panel with proper z-index handling.
  - **Textarea**: Added aer variant with glassmorphism effect.
  - **Text Contrast**: All aer variant text includes text-shadow for improved readability.

### Documentation

- **Comprehensive Examples**: Added "The Aer Variant" sections to all component documentation pages.
  - Vibrant gradient backgrounds showcasing glassmorphism effect.
  - Live interactive examples with code snippets.
  - Pro tips for optimal usage.
- **Contrast System Documentation**: Created comprehensive guide for automatic contrast utilities.
  - API reference with examples.
  - WCAG standards explanation.
  - Best practices and performance notes.
- **README Updates**: Added contrast utilities to features and utilities sections with examples.

### Bug Fixes

- **Dropdown**: Fixed z-index issues where menu panel was hidden behind containers.
- **Dropdown**: Removed overflow-hidden from aer variant example container to prevent clipping.
- **Dropdown**: Fixed text visibility in aer variant options with proper text color application.

## [v0.9.0] - 2026-01-02

### ⚠️ Breaking Changes

- **Label System Standardization**: Removed the `floatingLabel` prop from `Input`, `Textarea`, `Cascader`, and `Dropdown` components.
  - Replaced with a standard, flexible label system supporting `labelPosition` ("top" | "left"), `helperText`, and `required` indicators.
  - This ensures consistent layout and alignment across all form components.

### Documentation

- **Granular Styling Complete**: Added comprehensive "Granular Styling" sections to 7 major components (`Button`, `Input`, `Cascader`, `OTP`, `Tooltip`, `Overlay`, `Menu`).
  - Each section includes practical examples and code snippets for high-control custom styling.
- **Glassmorphism**: Improved `Overlay` documentation to demonstrate high-contrast "Dark Glass" styling for better visibility.

### Bug Fixes

- **Radio**: Fixed an issue where custom styling (`className`) wasn't applying correctly to the checked state due to CSS precedence.
- **Cascader**: Fixed the granular styling interactive example to properly handle selection state.
- **Overlay**:
  - Fixed Z-index layering issues where the backdrop appeared behind the Sidebar.
  - Improved default glassmorphism example visibility.

## [v0.8.0] - 2026-01-02

### Customizable Shortcuts

- **Shortcut System**: Introduced a robust system for handling keyboard shortcuts.
  - **`ShortcutProvider`**: Centralized manager for all shortcuts and user overrides.
  - **`useShortcut`**: Hook for developers to easily bind actions to keys with conflict handling.
  - **`ShortcutRecorder`**: UI component allowing users to customize and record their own keybindings.
  - **Scoped Shortcuts**: Support for restricting shortcuts to specific containers via `scopeRef`.
  - **Persistence**: User customizations are automatically saved to `localStorage`.
  - **Conflict Handling**: Intelligent handling of browser reserved keys and cross-platform modifier normalization (Mac vs Windows).

## [v0.7.0] - 2026-01-02

### Architecture

- **Granular Styling Engine**: Modernized the className architecture across all interactive components (`Input`, `Textarea`, `Checkbox`, `Radio`, `OtpInput`, `Dropdown`).
  - Added specific className props for every sub-element (e.g., `labelClassName`, `iconClassName`, `checkboxClassName`).
  - Deprecated `containerClassName` in favor of standard `className` for root elements.
  - Improved CSS variable usage for more consistent theming.

### Bug Fixes

- **Checkbox/Radio**: Resolved interaction failure where internal state handlers were being overwritten by spread props.
- **Checkbox**: Restored support for uncontrolled state (`defaultChecked`) which was previously forced to a controlled state.
- **Dropdown**: Fixed `addonAfter` styling inconsistency.
- **OtpInput**: Resolved "Duplicate identifier" TypeScript errors through a clean internal rewrite.

### Documentation

- **Updated API Tables**: Reflected all new granular styling props across all component pages.
- **New Examples**: Added "Granular Styling" sections to documentation demonstrating how to style specific parts of components.

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
