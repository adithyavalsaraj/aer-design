# Aer Design Roadmap

- **Version**: `v0.12.0`
- **Last Updated**: 2026-01-09
- **Status**: Stable

---

## 📋 Table of Contents

- [Project Vision](#project-vision)
- **Overall Progress**: 27/68 components completed (40%)
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

### Core Components (24)

| Component | Version | Description | Key Features |
| --------- | ------- | ----------- | ------------ |
| **Button** | v0.1.0 | Interactive button component | Standard component |
| **Input** | v0.12.0 | Enhanced text input | Standard component |
| **Textarea** | v0.12.0 | Auto-resizing text area | Standard component |
| **Checkbox** | v0.12.0 | Tri-state checkbox | Standard component |
| **Radio** | v0.12.0 | Radio button groups | Standard component |
| **Dropdown** | v0.14.1 | Advanced select menu | Virtualization & Lazy Loading, Multi-select & Searching, Grouped Options, Keyboard Navigation, Form Validation |
| **Autocomplete** | v0.14.1 | Smart autocomplete with search | Local & Remote Search, Virtualization Support, Multiple Selection Modes, Lazy Loading, Custom Rendering |
| **Cascader** | v0.12.0 | Cascading selection | Standard component |
| **OtpInput** | v0.12.0 | One-time password input | Standard component |
| **Menu** | v0.12.0 | Context menu system | Standard component |
| **Sidebar** | v0.13.1 | Navigation sidebar | Standard component |
| **Navbar** | v0.12.0 | Top navigation bar | Standard component |
| **Tooltip** | v0.12.0 | Contextual tooltips | Standard component |
| **Overlay** | v0.12.0 | Modal overlay system | Standard component |
| **Dialog** | v0.12.0 | Advanced modal system | Standard component |
| **Badge** | v0.12.0 | Compact status markers | Standard component |
| **Card** | v0.12.0 | Structured containers | Standard component |
| **Tabs** | v0.11.0 | Responsive tab system | Horizontal and vertical orientations, Keyboard navigation (Arrow keys), Lazy loading of tab content, Controlled and uncontrolled modes, Custom tab indicators, Variants (line, enclosed, pills) |
| **Avatar** | v0.12.0 | User avatar component | Standard component |
| **Divider** | v0.11.0 | Standalone divider component | Layout component |
| **Skeleton** | v0.11.0 | Loading placeholder | Layout component |
| **Accordion** | v0.13.0 | Collapsible content panels for progressive disclosure | Single and multiple expansion modes, Smooth animations, Keyboard navigation, Custom icons, Nested accordions support |
| **Popover** | v0.14.0 | Headless-first popover primitive for rich interactive overlays | Headless usePopover hook, Flexible triggers (click, hover, focus, manual, composite), Compound components (Trigger, Content, Arrow, Close), Nested popover support, Zero positioning logic (delegates to useAutoPosition), Full accessibility (ARIA + keyboard), Lifecycle hooks, SSR-safe, Foundation for Tooltip/Dropdown/Menu |
| **Toast** | v0.12.0 | Toast notification system for user feedback | 9 Positions with Auto-Stacking, Swipe to Dismiss (Touch Optimized), Standalone & Global Modes, Action buttons & Keyboard Accessible, Variants (success, error, warning, info, neutral, aer), Glassmorphism Aer Variant |

### Provider Components (2)

| Component | Version | Description |
| --------- | ------- | ----------- |
| **ThemeProvider** | v0.1.0 | Theme management |
| **AerConfigProvider** | v0.5.0 | Global configuration |

---

## 🛠️ Completed Utilities & Hooks

### Positioning System

- ✅ `calculateOptimalPosition` - Manual position calculation with 360° collision detection
- ✅ `useAutoPosition` - React hook for automatic floating element positioning
- ✅ Comprehensive documentation with 7 interactive examples

### Contrast & Accessibility

- ✅ `useContrastColor` - Automatic WCAG-compliant text color calculation
- ✅ `getAccessibleTextColor` - Utility for accessible text color determination
- ✅ `getContrastRatio` - WCAG contrast ratio calculator
- ✅ `meetsWCAG` - WCAG AA/AAA compliance checker
- ✅ `getLuminance` - Relative luminance calculation

### Keyboard Shortcuts

- ✅ `useShortcut` - Hook for scoped keyboard shortcuts
- ✅ `ShortcutRecorder` - UI component for recording custom shortcuts
- ✅ `ShortcutProvider` - Centralized shortcut management with persistence

### Theming

- ✅ `cn` - Tailwind class merging utility
- ✅ CSS variable-based theming system
- ✅ 8 built-in themes (Sapphire, Carbon, Ruby, Amber, Emerald, Amethyst, Sunset, Ocean)

---

## 🚧 Missing Components

### High Priority

#### 1. **Calendar**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Comprehensive date and time selection system
- **Required Features:**
  - Date, Range, and Time picker modes
  - Year and Month selection pickers
  - Week selection mode (single week view)
  - Week numbering (toggleable)
  - Inline calendar & Popover modes
  - Meeting and Agenda views
  - Event highlighting and customization
  - Internationalization (i18n) & Localized formats
  - Smart shortcuts (Yesterday, Last 7 days, etc.)
  - Min/Max date constraints & Disabled dates
  - Year/Month quick navigation
  - Keyboard accessibility (grid navigation)

#### 2. **SelectButton**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Multi-option selection interface styled as buttons
- **Required Features:**
  - Single and Multiple selection modes
  - Icon and Image support for options
  - Seamless integration with Aer Variant
  - Accessibility (ARIA Radio/Checkbox pattern)

#### 3. **VibrantStage**

- **Status:** Not implemented
- **Priority:** High
- **Description:** The engine behind Aer's signature glassmorphism
- **Required Features:**
  - Declarative animated background blobs
  - Mouse-reactive parallax effects
  - Optimized GPU-accelerated motion
  - Highly configurable speed, scale, and colors


### Medium Priority

#### 4. **ButtonGroup**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Group multiple buttons into a single cohesive unit
- **Required Features:**
  - Attached and detached layouts
  - Unified variant and size control
  - Selection modes (Single/Multiple)
  - Icon-only group support

#### 5. **Breadcrumb**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Navigation breadcrumb trail
- **Required Features:**
  - Auto-collapse for deep paths
  - Custom separator support
  - Dropdown integration for collapsed items
  - Item max-width truncation
  - Headless hook support

#### 6. **Pagination**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Page navigation component
- **Required Features:**
  - Total item count display
  - Page size switcher
  - Quick jumper input
  - Simple vs Complex modes
  - Mini version

#### 7. **Progress**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Progress indicators
- **Required Features:**
  - Linear and Circular variants
  - Success/Error status styles
  - Striped and animated backgrounds
  - Custom steps/milestone mode
  - Gradient support

#### 8. **Chips**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Compact elements for input, attribute, or action
- **Required Features:**
  - Input chips (dismissible)
  - Choice chips (single select)
  - Filter chips (multi select)
  - Action chips
  - Avatar support

#### 9. **FAB**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Primary action button for screen
- **Required Features:**
  - Extended variant (icon + label)
  - Scroll behavior (hide/shrink)
  - Animation transitions
  - Anchoring

#### 10. **SpeedDial**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Floating button that expands into multiple actions
- **Required Features:**
  - Custom directions (up, down, left, right)
  - Icon rotation
  - Tooltip labels
  - Delay control

#### 11. **CommandPalette**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Mac-style global search and command menu (Ctrl+K)
- **Required Features:**
  - Fuzzy search
  - Keyboard first navigation
  - Dynamic action binding
  - Grouped results

#### 12. **Dock**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** MacOS-style floating icon dock
- **Required Features:**
  - Magnification effect on hover
  - Bounce animation
  - Glassmorphism styling
  - Responsive collapsing

#### 13. **Kanban**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Drag-and-drop board for item management
- **Required Features:**
  - Multiple columns
  - Drag and drop cards
  - Sortable lists
  - Custom card rendering
  - Swimlanes

#### 14. **Charts**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Data visualization library (Line, Bar, Pie, etc.)
- **Required Features:**
  - Responsive container support
  - Line, Bar, Area, Pie, and Doughnut charts
  - Interactive tooltips and legends
  - Animation support
  - Customizable axes and grids
  - Dark mode support

#### 15. **RichTextEditor**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** WYSIWYG editor for rich text content
- **Required Features:**
  - Markdown export/import support
  - Toolbar customization
  - Image upload and handling
  - Block-based editing structure
  - Slash commands support
  - Floating menu for text selection

#### 16. **Drawer**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Slide-out overlay panel
- **Required Features:**
  - Positions (left, right, top, bottom)
  - Multi-level stacking
  - Size configuration
  - Backdrop customization

#### 17. **FileUpload**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** File selection and upload interface
- **Required Features:**
  - Drag and drop zone
  - Multiple file selection
  - Image preview generation
  - Progress bar integration
  - Validation (size, type)

#### 18. **TreeSelect**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Tree structure selection dropdown
- **Required Features:**
  - Hierarchical data support
  - Checkbox selection
  - Search/Filtering
  - Async loading

#### 19. **ToggleButton**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Two-state selection component
- **Required Features:**
  - Smooth state transitions
  - Custom icon state mapping
  - Indeterminate state support

#### 20. **HotKeyOverlay**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Visual hotkey discovery layer
- **Required Features:**
  - Context-aware shortcut display on modifier hold
  - Seamless integration with Shortcut system
  - Non-intrusive semi-transparent UI

#### 21. **StatefulView**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Declarative UI state persistence system
- **Required Features:**
  - Auto-save UI states (sidebar, filters, scroll) to LocalStorage
  - Encryption and validation support
  - Zero-code persistence for wrapped components


### Low Priority

#### 22. **Alert**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Inline alert messages
- **Required Features:**
  - 4 Status types (Success, Info, Warning, Error)
  - Closable with callback
  - Icon support
  - Title and Description layout
  - Banner mode (full width)

#### 23. **Slider**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Range slider input
- **Required Features:**
  - Dual range support
  - Vertical mode
  - Custom marks and steps
  - Tooltip formatting
  - Input field sync

#### 24. **Switch**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Toggle switch
- **Required Features:**
  - Loading state
  - Icon/Text labels inside
  - Size variants (sm, md, lg)
  - Custom background colors

#### 25. **Table**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Data table component
- **Required Features:**
  - Sort, Filter, and Search
  - Pagination & Infinite Scroll
  - Row Selection (Single/Multi)
  - Expandable Rows
  - Custom Column Rendering

#### 26. **Tree**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Hierarchical tree view
- **Required Features:**
  - Drag and Drop nodes
  - Checkable nodes
  - Custom icons
  - Virtual scrolling
  - Search/Filter nodes

#### 27. **Timeline**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Vertical or horizontal event display
- **Required Features:**
  - Alternate and Right/Left modes
  - Custom dot nodes
  - Pending state
  - Label support

#### 28. **List**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Styled list containers
- **Required Features:**
  - Header/Footer support
  - Grid layout mode
  - Item actions
  - Virtual list support
  - Load more wrapper

#### 29. **Steps**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Navigation stepper
- **Required Features:**
  - Vertical and Horizontal modes
  - Clickable steps
  - Status (wait, process, finish, error)
  - Custom icons and dot style

#### 30. **Rating**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Star/Icon rating input
- **Required Features:**
  - Half-star support
  - Custom characters/icons
  - Read-only mode
  - Tooltip headers
  - Clearable

#### 31. **Carousel**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Content slider
- **Required Features:**
  - Autoplay & Infinite loop
  - Touch/Swipe support
  - Custom arrows/indicators
  - Fade transition
  - Multiple items per slide

#### 32. **Transfer**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Double-list transfer interface
- **Required Features:**
  - Search filtering
  - One-way mode
  - Pagination support
  - Custom renderers

#### 33. **Splitter**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Resizable layout panes
- **Required Features:**
  - Vertical/Horizontal split
  - Min/Max styling
  - Nested splitters
  - Collapse to edge

#### 34. **ScrollArea**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Custom cross-browser scrollbars
- **Required Features:**
  - Auto-hide mode
  - Horizontal/Vertical
  - Themed styling
  - Corner smoothing

#### 35. **Tour**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Guided onboarding steps
- **Required Features:**
  - Mask/Spotlight effect
  - Step flow control
  - Custom placement
  - Scroll into view

#### 36. **Empty**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Empty state placeholders
- **Required Features:**
  - Predefined images
  - Custom description/actions
  - Simple mode

#### 37. **Result**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Success/Error feedback pages
- **Required Features:**
  - 403, 404, 500, Success templates
  - Custom icon/image
  - Action buttons area

#### 38. **Watermark**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Security/Copyright overlays
- **Required Features:**
  - Text or Image pattern
  - Rotate/Offset/Gap control
  - Font styling
  - Multi-line support

#### 39. **ColorPicker**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Hex and Gradient color selection
- **Required Features:**
  - Hex, RGB, HSB inputs
  - Alpha channel support
  - Preset palettes
  - Eye dropper API

#### 40. **Mentions**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Input with @mention support
- **Required Features:**
  - Async user loading
  - Custom trigger characters (#, @)
  - Option grouping
  - Placement control

#### 41. **SignaturePad**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Digital signature canvas
- **Required Features:**
  - Pen color/width control
  - Image export (PNG/JPG)
  - Undo/Clear actions
  - Smooth line interpolation


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
- [ ] Implement Web Components wrapper for universal support

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

```

Completed Components: 27/68 (40%)
High Priority Missing: 3/{{TOTAL_STAT}} (4%)
Medium Priority Missing: 18/{{TOTAL_STAT}} (26%)
Low Priority Missing: 20/{{TOTAL_STAT}} (29%)

```

### Category Breakdown

| Category | Completed | Missing | Total |
| -------- | --------- | ------- | ----- |
| **Data Entry** | 8 | 16 | 24 |
| **Data Display** | 5 | 10 | 15 |
| **Feedback** | 5 | 4 | 9 |
| **Navigation** | 3 | 5 | 8 |
| **Layout** | 2 | 2 | 4 |
| **Configuration** | 2 | 1 | 3 |
| **Utilities** | 1 | 2 | 3 |
| **General** | 1 | 1 | 2 |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Pick a component** from the "Missing Components" section
2. **Follow the design principles**: Weightless, accessible, themable
3. **Include comprehensive documentation** with examples
4. **Add tests** for all functionality
5. **Submit a PR** with detailed description

For detailed contribution guidelines, see `CONTRIBUTING.md` (to be created).

---

## 📝 Notes

- All components must maintain the "weightless" philosophy (minimal runtime overhead)
- Accessibility is non-negotiable - all components must be WAI-ARIA compliant
- Every component should support the "aer" glassmorphism variant
- Documentation must include API tables, examples, and theming information
- TypeScript types must be comprehensive and exported

---

**Last Updated:** January 10, 2026
**Maintained by:** Aer Design Team
**License:** MIT

```

```
