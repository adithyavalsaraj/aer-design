import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  FileCode,
  GitBranch,
  Lightbulb,
  ListChecks,
} from "lucide-react";

export function ContributingDoc() {
  return (
    <div className="space-y-12 pb-16" id="hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-aer-xl bg-linear-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 p-8 border border-aer-border">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-full bg-aer-primary/10 flex items-center justify-center">
              <GitBranch className="size-6 text-aer-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contributing Guide</h1>
              <p className="text-aer-muted-foreground">
                Help us build the future of React UI
              </p>
            </div>
          </div>
          <p className="text-aer-muted-foreground mt-4 max-w-3xl">
            We welcome contributions from the community! Whether you're fixing
            bugs, adding new components, or improving documentation, your help
            makes Aer Design better for everyone.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4" id="quick-links">
        <Card className="p-6 hover:border-aer-primary/50 transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <FileCode className="size-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Component Standards</h3>
              <p className="text-sm text-aer-muted-foreground">
                Follow our comprehensive standards for building components
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:border-aer-primary/50 transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <Code2 className="size-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Code Style</h3>
              <p className="text-sm text-aer-muted-foreground">
                TypeScript, ESLint, and Prettier configurations
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:border-aer-primary/50 transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Documentation</h3>
              <p className="text-sm text-aer-muted-foreground">
                Write clear, comprehensive docs for every component
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Component Standards */}
      <Card id="standards">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="size-5 text-aer-primary" />
            Component Documentation Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Badge variant="soft" status="primary" size="sm">
                Required
              </Badge>
              Documentation Structure
            </h3>
            <p className="text-sm text-aer-muted-foreground mb-4">
              Every component documentation must follow this exact structure:
            </p>
            <div className="space-y-2">
              {[
                { title: "Introduction", desc: "Brief overview and purpose" },
                { title: "When to Use", desc: "Use cases and best practices" },
                { title: "Basic Usage", desc: "Simple example with code" },
                { title: "Visual Variants", desc: "All available variants" },
                {
                  title: "The Aer Variant",
                  desc: "Premium glassmorphism variant with Pro Tip",
                },
                { title: "Sizes", desc: "All size options" },
                { title: "Custom Usage", desc: "Advanced customization" },
                { title: "Positioning", desc: "Layout and placement" },
                {
                  title: "Interaction States",
                  desc: "Hover, focus, disabled, etc.",
                },
                { title: "Specialized Contexts", desc: "Specific use cases" },
                {
                  title: "Validation & Errors",
                  desc: "Error states and validation",
                },
                { title: "Granular Styling", desc: "Custom styling examples" },
                {
                  title: "Real World Example",
                  desc: "Production-ready example",
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-aer-md bg-aer-muted/5 border border-aer-border/50"
                >
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className="text-xs text-aer-muted-foreground">
                      {section.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Badge variant="soft" status="warning" size="sm">
                Important
              </Badge>
              Every Section Must Include
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-aer-lg bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="size-4 text-blue-500" />
                  <span className="font-semibold text-sm">
                    Live Visual Demo
                  </span>
                </div>
                <p className="text-xs text-aer-muted-foreground">
                  Working, interactive example that users can see and interact
                  with
                </p>
              </div>
              <div className="p-4 rounded-aer-lg bg-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="size-4 text-purple-500" />
                  <span className="font-semibold text-sm">CodeBlock</span>
                </div>
                <p className="text-xs text-aer-muted-foreground">
                  Copy-paste ready code with both snippet and full code versions
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Lightbulb className="size-5 text-amber-500" />
              Best Practices
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-aer-lg bg-aer-muted/5 border border-aer-border/50">
                <h4 className="font-semibold text-sm mb-2">
                  ✨ Make Examples Beautiful
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  Don't show "Simple Content Card" - create realistic, visually
                  appealing examples that showcase the component's capabilities.
                  Use real-world data, icons, and proper styling.
                </p>
              </div>
              <div className="p-4 rounded-aer-lg bg-aer-muted/5 border border-aer-border/50">
                <h4 className="font-semibold text-sm mb-2">
                  🎨 Show Visual Differences
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  For variant examples, make each variant visually distinct. Add
                  icons, descriptions, and context so users can immediately see
                  the differences.
                </p>
              </div>
              <div className="p-4 rounded-aer-lg bg-aer-muted/5 border border-aer-border/50">
                <h4 className="font-semibold text-sm mb-2">
                  📝 Provide Context
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  Every code example should be production-ready. Include
                  imports, proper TypeScript types, and realistic use cases that
                  developers can copy directly into their projects.
                </p>
              </div>
              <div className="p-4 rounded-aer-lg bg-aer-muted/5 border border-aer-border/50">
                <h4 className="font-semibold text-sm mb-2">
                  🔍 Demonstrate Edge Cases
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  Show how the component behaves in different scenarios: long
                  text, empty states, error states, loading states, and
                  responsive layouts.
                </p>
              </div>
              <div className="p-4 rounded-aer-lg bg-blue-500/5 border border-blue-500/20">
                <h4 className="font-semibold text-sm mb-2">
                  ✨ Include Aer Variant Pro Tips
                </h4>
                <p className="text-xs text-aer-muted-foreground">
                  Every Aer Variant section MUST include a Pro Tip explaining
                  background requirements (dark/colorful), glassmorphism
                  benefits, and component-specific use cases. This helps users
                  understand when and how to use the premium variant
                  effectively.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Standards */}
      <Card id="implementation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="size-5 text-aer-primary" />
            Component Implementation Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">✅ Required Features</h4>
              <ul className="space-y-2 text-sm text-aer-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>TypeScript with comprehensive types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>WAI-ARIA accessibility compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>RTL (Right-to-Left) support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Theme-aware styling with CSS variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Aer glassmorphism variant</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Design Principles</h4>
              <ul className="space-y-2 text-sm text-aer-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>
                    <strong>Weightless:</strong> Minimal runtime overhead
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>
                    <strong>Composable:</strong> Small, focused components
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>
                    <strong>Accessible:</strong> WCAG 2.1 AA compliant
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>
                    <strong>Themable:</strong> CSS variable-based theming
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>
                    <strong>Premium:</strong> Modern glassmorphism aesthetics
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card variant="aer" className="p-8" id="getting-started">
        <h2 className="text-2xl font-bold mb-4">Ready to Contribute?</h2>
        <div className="space-y-4 text-aer-muted-foreground">
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-aer-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-aer-foreground mb-1">
                Pick a Component
              </h3>
              <p className="text-sm">
                Check the{" "}
                <span
                  onClick={() => (window.location.hash = "/roadmap")}
                  className="text-aer-primary hover:underline cursor-pointer"
                >
                  Roadmap
                </span>{" "}
                for components that need implementation
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-aer-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-aer-foreground mb-1">
                Follow the Standards
              </h3>
              <p className="text-sm">
                Use COMPONENT_STANDARDS.md as your guide for implementation and
                documentation
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-aer-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-aer-foreground mb-1">
                Submit a Pull Request
              </h3>
              <p className="text-sm">
                Create a PR with your component, documentation, and examples.
                We'll review and provide feedback!
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
