# Aer Design Roadmap

- **Version**: `v0.12.0`
- **Last Updated**: 2026-01-07
- **Status**: Stable

---

## 📋 Table of Contents

- [Project Vision](#project-vision)
- **Overall Progress**: 23/62 components completed (37%)
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

### Core Components (20)

| Component | Version | Description | Key Features |
| --------- | ------- | ----------- | ------------ |
| **Button** | v0.1.0 | Interactive button component | Standard component |
| **Input** | v0.12.0 | Enhanced text input | Standard component |
| **Textarea** | v0.12.0 | Auto-resizing text area | Standard component |
| **Checkbox** | v0.12.0 | Tri-state checkbox | Standard component |
| **Radio** | v0.12.0 | Radio button groups | Standard component |
| **Dropdown** | v0.12.0 | Advanced select menu | Standard component |
| **Cascader** | v0.12.0 | Cascading selection | Standard component |
| **OtpInput** | v0.12.0 | One-time password input | Standard component |
| **Menu** | v0.12.0 | Context menu system | Standard component |
| **Sidebar** | v0.12.0 | Navigation sidebar | Standard component |
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

#### 1. **Accordion**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Collapsible content panels for progressive disclosure
- **Required Features:**
  - Single and multiple expansion modes
  - Smooth animations
  - Keyboard navigation
  - Custom icons
  - Nested accordions support

#### 2. **Popover**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Rich popover with interactive content and auto-positioning
- **Required Features:**
  - Auto-positioning (reuse existing utilities)
  - Click and hover triggers
  - Close on outside click
  - Arrow indicator
  - Rich content support (forms, buttons, etc.)

#### 3. **Toast**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Toast notification system for user feedback
- **Required Features:**
  - Multiple positions (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
  - Auto-dismiss with configurable duration
  - Action buttons
  - Variants (success, error, warning, info)
  - Queue management
  - Stacking and animation

#### 4. **Autocomplete**

- **Status:** Not implemented
- **Priority:** High
- **Description:** Searchable input with suggestion list
- **Required Features:**
  - Remote data fetching
  - Custom filtering
  - Grouping
  - Multiple selection
  - Custom renderers for options

#### 5. **Calendar**

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


### Medium Priority

#### 6. **Breadcrumb**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Navigation breadcrumb trail
- **Required Features:**
  - Auto-collapse for deep paths
  - Custom separator support
  - Dropdown integration for collapsed items
  - Item max-width truncation
  - Headless hook support

#### 7. **Pagination**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Page navigation component
- **Required Features:**
  - Total item count display
  - Page size switcher
  - Quick jumper input
  - Simple vs Complex modes
  - Mini version

#### 8. **Progress**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Progress indicators
- **Required Features:**
  - Linear and Circular variants
  - Success/Error status styles
  - Striped and animated backgrounds
  - Custom steps/milestone mode
  - Gradient support

#### 9. **Chips**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Compact elements for input, attribute, or action
- **Required Features:**
  - Input chips (dismissible)
  - Choice chips (single select)
  - Filter chips (multi select)
  - Action chips
  - Avatar support

#### 10. **FAB**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Primary action button for screen
- **Required Features:**
  - Extended variant (icon + label)
  - Scroll behavior (hide/shrink)
  - Animation transitions
  - Anchoring

#### 11. **SpeedDial**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Floating button that expands into multiple actions
- **Required Features:**
  - Custom directions (up, down, left, right)
  - Icon rotation
  - Tooltip labels
  - Delay control

#### 12. **CommandPalette**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Mac-style global search and command menu (Ctrl+K)
- **Required Features:**
  - Fuzzy search
  - Keyboard first navigation
  - Dynamic action binding
  - Grouped results

#### 13. **Dock**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** MacOS-style floating icon dock
- **Required Features:**
  - Magnification effect on hover
  - Bounce animation
  - Glassmorphism styling
  - Responsive collapsing

#### 14. **Kanban**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Drag-and-drop board for item management
- **Required Features:**
  - Multiple columns
  - Drag and drop cards
  - Sortable lists
  - Custom card rendering
  - Swimlanes

#### 15. **Charts**

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

#### 16. **RichTextEditor**

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

#### 17. **Drawer**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Slide-out overlay panel
- **Required Features:**
  - Positions (left, right, top, bottom)
  - Multi-level stacking
  - Size configuration
  - Backdrop customization

#### 18. **FileUpload**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** File selection and upload interface
- **Required Features:**
  - Drag and drop zone
  - Multiple file selection
  - Image preview generation
  - Progress bar integration
  - Validation (size, type)

#### 19. **TreeSelect**

- **Status:** Not implemented
- **Priority:** Medium
- **Description:** Tree structure selection dropdown
- **Required Features:**
  - Hierarchical data support
  - Checkbox selection
  - Search/Filtering
  - Async loading


### Low Priority

#### 20. **Alert**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Inline alert messages
- **Required Features:**
  - 4 Status types (Success, Info, Warning, Error)
  - Closable with callback
  - Icon support
  - Title and Description layout
  - Banner mode (full width)

#### 21. **Slider**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Range slider input
- **Required Features:**
  - Dual range support
  - Vertical mode
  - Custom marks and steps
  - Tooltip formatting
  - Input field sync

#### 22. **Switch**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Toggle switch
- **Required Features:**
  - Loading state
  - Icon/Text labels inside
  - Size variants (sm, md, lg)
  - Custom background colors

#### 23. **Table**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Data table component
- **Required Features:**
  - Sort, Filter, and Search
  - Pagination & Infinite Scroll
  - Row Selection (Single/Multi)
  - Expandable Rows
  - Custom Column Rendering

#### 24. **Tree**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Hierarchical tree view
- **Required Features:**
  - Drag and Drop nodes
  - Checkable nodes
  - Custom icons
  - Virtual scrolling
  - Search/Filter nodes

#### 25. **Timeline**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Vertical or horizontal event display
- **Required Features:**
  - Alternate and Right/Left modes
  - Custom dot nodes
  - Pending state
  - Label support

#### 26. **List**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Styled list containers
- **Required Features:**
  - Header/Footer support
  - Grid layout mode
  - Item actions
  - Virtual list support
  - Load more wrapper

#### 27. **Steps**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Navigation stepper
- **Required Features:**
  - Vertical and Horizontal modes
  - Clickable steps
  - Status (wait, process, finish, error)
  - Custom icons and dot style

#### 28. **Rating**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Star/Icon rating input
- **Required Features:**
  - Half-star support
  - Custom characters/icons
  - Read-only mode
  - Tooltip headers
  - Clearable

#### 29. **Carousel**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Content slider
- **Required Features:**
  - Autoplay & Infinite loop
  - Touch/Swipe support
  - Custom arrows/indicators
  - Fade transition
  - Multiple items per slide

#### 30. **Transfer**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Double-list transfer interface
- **Required Features:**
  - Search filtering
  - One-way mode
  - Pagination support
  - Custom renderers

#### 31. **Splitter**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Resizable layout panes
- **Required Features:**
  - Vertical/Horizontal split
  - Min/Max styling
  - Nested splitters
  - Collapse to edge

#### 32. **ScrollArea**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Custom cross-browser scrollbars
- **Required Features:**
  - Auto-hide mode
  - Horizontal/Vertical
  - Themed styling
  - Corner smoothing

#### 33. **Tour**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Guided onboarding steps
- **Required Features:**
  - Mask/Spotlight effect
  - Step flow control
  - Custom placement
  - Scroll into view

#### 34. **Empty**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Empty state placeholders
- **Required Features:**
  - Predefined images
  - Custom description/actions
  - Simple mode

#### 35. **Result**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Success/Error feedback pages
- **Required Features:**
  - 403, 404, 500, Success templates
  - Custom icon/image
  - Action buttons area

#### 36. **Watermark**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Security/Copyright overlays
- **Required Features:**
  - Text or Image pattern
  - Rotate/Offset/Gap control
  - Font styling
  - Multi-line support

#### 37. **ColorPicker**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Hex and Gradient color selection
- **Required Features:**
  - Hex, RGB, HSB inputs
  - Alpha channel support
  - Preset palettes
  - Eye dropper API

#### 38. **Mentions**

- **Status:** Not implemented
- **Priority:** Low
- **Description:** Input with @mention support
- **Required Features:**
  - Async user loading
  - Custom trigger characters (#, @)
  - Option grouping
  - Placement control

#### 39. **SignaturePad**

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

Completed Components: 23/62 (37%)
High Priority Missing: 5/{{TOTAL_STAT}} (8%)
Medium Priority Missing: 14/{{TOTAL_STAT}} (23%)
Low Priority Missing: 20/{{TOTAL_STAT}} (32%)

```

### Category Breakdown

| Category | Completed | Missing | Total |
| -------- | --------- | ------- | ----- |
| **Data Entry** | 7 | 15 | 22 |
| **Data Display** | 4 | 12 | 16 |
| **Navigation** | 3 | 5 | 8 |
| **Feedback** | 3 | 5 | 8 |
| **Layout** | 2 | 2 | 4 |
| **Configuration** | 2 | 0 | 2 |
| **General** | 1 | 0 | 1 |
| **Utilities** | 1 | 0 | 1 |

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

**Last Updated:** January 7, 2026
**Maintained by:** Aer Design Team
**License:** MIT

```

```
