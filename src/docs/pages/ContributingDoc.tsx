import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
  BEST_PRACTICES,
  CODE_PUSH_GUIDELINES,
  DESIGN_PRINCIPLES,
  DOC_STRUCTURE,
  REQUIRED_FEATURES,
} from "@/data/standards";
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
              <div className="space-y-2">
                {DOC_STRUCTURE.map((section, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-aer-md bg-aer-muted/5 border border-aer-border/50"
                  >
                    <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-aer-muted-foreground">
                        {section.shortDesc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="space-y-3">
                {BEST_PRACTICES.map((practice, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-aer-lg border ${
                      practice.highlight
                        ? "bg-blue-500/5 border-blue-500/20"
                        : "bg-aer-muted/5 border-aer-border/50"
                    }`}
                  >
                    <h4 className="font-semibold text-sm mb-2">
                      {practice.title}
                    </h4>
                    <p className="text-xs text-aer-muted-foreground">
                      {practice.desc}
                    </p>
                  </div>
                ))}
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
                {REQUIRED_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Design Principles</h4>
              <ul className="space-y-2 text-sm text-aer-muted-foreground">
                {DESIGN_PRINCIPLES.map((principle, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 shrink-0">•</span>
                    <span>
                      <strong>{principle.label}:</strong> {principle.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Push Guidelines */}
      <Card id="push-guidelines" className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-amber-500" />
            Code Push Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-aer-muted-foreground">
            Before pushing any code, you must synchronize all project
            documentation:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Badge variant="soft" status="warning" size="sm">
                  Step 1
                </Badge>
                {CODE_PUSH_GUIDELINES.step1.title}
              </h4>
              <ul className="text-xs text-aer-muted-foreground space-y-1 list-disc pl-4">
                {CODE_PUSH_GUIDELINES.step1.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Badge variant="soft" status="warning" size="sm">
                  Step 2
                </Badge>
                {CODE_PUSH_GUIDELINES.step2.title}
              </h4>
              <ul className="text-xs text-aer-muted-foreground space-y-1 list-disc pl-4">
                {CODE_PUSH_GUIDELINES.step2.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
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
