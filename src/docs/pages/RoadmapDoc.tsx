import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Dialog, DialogContent, DialogHeader } from "@/components/Dialog";
import { Check, Clock, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

/**
 * RoadmapDoc - Visual representation of the project roadmap
 *
 * ⚠️ IMPORTANT: Keep this data synchronized with /ROADMAP.md
 * When components are added/completed, update both files:
 * 1. Move completed components from highPriority/mediumPriority to completedComponents
 * 2. Update stats object (total, completed, highPriority, mediumPriority counts)
 * 3. Update categoryStats with new completion numbers
 * 4. Update ROADMAP.md to remove completed items from "Missing Components"
 */
export function RoadmapDoc() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const completedComponents = [
    { name: "Button", version: "v0.1.0", category: "Form Controls" },
    { name: "Input", version: "v0.2.0", category: "Form Controls" },
    { name: "Textarea", version: "v0.2.0", category: "Form Controls" },
    { name: "Checkbox", version: "v0.4.0", category: "Form Controls" },
    { name: "Radio", version: "v0.4.0", category: "Form Controls" },
    { name: "Dropdown", version: "v0.4.0", category: "Form Controls" },
    { name: "Cascader", version: "v0.9.0", category: "Form Controls" },
    { name: "OtpInput", version: "v0.4.0", category: "Form Controls" },
    { name: "Menu", version: "v0.6.0", category: "Navigation" },
    { name: "Sidebar", version: "v0.3.0", category: "Navigation" },
    { name: "Navbar", version: "v0.3.0", category: "Navigation" },
    { name: "Tooltip", version: "v0.6.2", category: "Feedback" },
    { name: "Overlay", version: "v0.9.0", category: "Feedback" },
    { name: "Dialog", version: "v0.11.0", category: "Feedback" },
    { name: "Badge", version: "v0.11.0", category: "Data Display" },
    { name: "Card", version: "v0.11.0", category: "Data Display" },
    { name: "Tabs", version: "v0.11.0", category: "Data Display" },
    { name: "Avatar", version: "v0.11.0", category: "Data Display" },
    { name: "Shortcut", version: "v0.8.0", category: "Utilities" },
    { name: "ThemeProvider", version: "v0.1.0", category: "Providers" },
    { name: "AerConfigProvider", version: "v0.5.0", category: "Providers" },
  ];

  const componentSpecs: Record<
    string,
    { description: string; features: string[] }
  > = {
    Tabs: {
      description:
        "Tabbed interface component for organizing content into switchable panels",
      features: [
        "Horizontal and vertical orientations",
        "Keyboard navigation (Arrow keys)",
        "Lazy loading of tab content",
        "Controlled and uncontrolled modes",
        "Custom tab indicators",
        "Variants (line, enclosed, pills)",
      ],
    },
    Accordion: {
      description: "Collapsible content panels for progressive disclosure",
      features: [
        "Single and multiple expansion modes",
        "Smooth animations",
        "Keyboard navigation",
        "Custom icons",
        "Nested accordions support",
      ],
    },
    Popover: {
      description: "Rich popover with interactive content and auto-positioning",
      features: [
        "Auto-positioning (reuse existing utilities)",
        "Click and hover triggers",
        "Close on outside click",
        "Arrow indicator",
        "Rich content support (forms, buttons, etc.)",
      ],
    },
    Toast: {
      description: "Toast notification system for user feedback",
      features: [
        "Multiple positions (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)",
        "Auto-dismiss with configurable duration",
        "Action buttons",
        "Variants (success, error, warning, info)",
        "Queue management",
        "Stacking and animation",
      ],
    },
  };

  const highPriority = [
    { name: "Accordion", description: "Collapsible content panels" },
    { name: "Popover", description: "Rich popover with interactive content" },
    { name: "Toast", description: "Toast notification system" },
  ];

  const mediumPriority = [
    { name: "Breadcrumb", description: "Navigation breadcrumb trail" },
    { name: "Pagination", description: "Page navigation component" },
    { name: "Progress", description: "Progress indicators" },
    { name: "Skeleton", description: "Loading placeholder" },
    { name: "Divider", description: "Standalone divider component" },
  ];

  const stats = {
    total: 36,
    completed: 21,
    highPriority: 3,
    mediumPriority: 5,
    lowPriority: 7,
  };

  const completionPercentage = Math.round(
    (stats.completed / stats.total) * 100
  );

  const categoryStats = [
    { name: "Form Controls", completed: 8, total: 13 },
    { name: "Navigation", completed: 3, total: 6 },
    { name: "Feedback", completed: 3, total: 8 },
    { name: "Data Display", completed: 4, total: 5 },
    { name: "Layout", completed: 0, total: 2 },
    { name: "Providers", completed: 2, total: 2 },
    { name: "Utilities", completed: 1, total: 1 },
  ];

  return (
    <div className="space-y-12 pb-16" id="hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-aer-xl bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 border border-aer-border">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-full bg-aer-primary/10 flex items-center justify-center">
              <Target className="size-6 text-aer-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Aer Design Roadmap</h1>
              <p className="text-aer-muted-foreground">
                Building the future of React UI
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card variant="glass" className="p-4">
              <div className="text-2xl font-bold text-aer-primary">
                {stats.completed}
              </div>
              <div className="text-sm text-aer-muted-foreground">Completed</div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-2xl font-bold text-amber-500">
                {stats.highPriority}
              </div>
              <div className="text-sm text-aer-muted-foreground">
                High Priority
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-2xl font-bold text-blue-500">
                {stats.mediumPriority}
              </div>
              <div className="text-sm text-aer-muted-foreground">
                Medium Priority
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-2xl font-bold text-green-500">
                {completionPercentage}%
              </div>
              <div className="text-sm text-aer-muted-foreground">Complete</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card id="progress">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-aer-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Component Completion</span>
              <span className="text-sm font-semibold">
                {stats.completed}/{stats.total}
              </span>
            </div>
            <div className="w-full bg-aer-muted rounded-full h-3">
              <div
                className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-amber-500/10 rounded-aer-lg border border-amber-500/20">
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {stats.highPriority}
                </div>
                <div className="text-xs text-aer-muted-foreground">
                  High Priority
                </div>
              </div>
              <div className="text-center p-3 bg-blue-500/10 rounded-aer-lg border border-blue-500/20">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {stats.mediumPriority}
                </div>
                <div className="text-xs text-aer-muted-foreground">
                  Medium Priority
                </div>
              </div>
              <div className="text-center p-3 bg-gray-500/10 rounded-aer-lg border border-gray-500/20">
                <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
                  {stats.lowPriority}
                </div>
                <div className="text-xs text-aer-muted-foreground">
                  Low Priority
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card id="categories">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category) => {
              const percentage = Math.round(
                (category.completed / category.total) * 100
              );
              return (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-aer-muted-foreground">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                  <div className="w-full bg-aer-muted rounded-full h-2">
                    <div
                      className="bg-aer-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completed Components */}
      <div id="completed">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="size-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Completed Components</h2>
            <p className="text-sm text-aer-muted-foreground">
              {stats.completed} components ready to use
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {completedComponents.map((component) => (
            <Card
              key={component.name}
              variant="outline"
              className="p-4 hover:border-aer-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{component.name}</h3>
                  <p className="text-xs text-aer-muted-foreground">
                    {component.category}
                  </p>
                </div>
                <Badge variant="soft" status="success" size="sm">
                  {component.version}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs mt-2">
                <Check className="size-3" />
                <span>Available</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* High Priority Missing */}
      <div id="high-priority">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="size-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">High Priority</h2>
            <p className="text-sm text-aer-muted-foreground">
              Next components to be implemented
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {highPriority.map((component) => (
            <Card key={component.name} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{component.name}</h3>
                  <p className="text-sm text-aer-muted-foreground mt-1">
                    {component.description}
                  </p>
                </div>
                <Badge variant="soft" status="warning" size="sm">
                  Planned
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  setSelectedComponent(component.name);
                  setIsDialogOpen(true);
                }}
              >
                View Specification
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Medium Priority Missing */}
      <div id="medium-priority">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Sparkles className="size-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Medium Priority</h2>
            <p className="text-sm text-aer-muted-foreground">
              Upcoming enhancements
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mediumPriority.map((component) => (
            <Card key={component.name} variant="outline" className="p-4">
              <h3 className="font-semibold mb-1">{component.name}</h3>
              <p className="text-xs text-aer-muted-foreground">
                {component.description}
              </p>
              <Badge variant="soft" status="primary" size="sm" className="mt-3">
                In Queue
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* Low Priority Missing */}
      <div id="low-priority">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-full bg-gray-500/10 flex items-center justify-center">
            <Clock className="size-5 text-gray-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Low Priority</h2>
            <p className="text-sm text-aer-muted-foreground">
              Future enhancements
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { name: "Alert", desc: "Inline alert messages" },
            { name: "Slider", desc: "Range slider input" },
            { name: "Switch", desc: "Toggle switch" },
            { name: "DatePicker", desc: "Date selection" },
            { name: "TimePicker", desc: "Time selection" },
            { name: "Table", desc: "Data table component" },
            { name: "Tree", desc: "Hierarchical tree view" },
          ].map((component) => (
            <Card key={component.name} variant="outline" className="p-3">
              <h3 className="font-semibold text-sm mb-1">{component.name}</h3>
              <p className="text-xs text-aer-muted-foreground">
                {component.desc}
              </p>
              <Badge variant="ghost" size="sm" className="mt-2">
                Future
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card variant="aer" className="p-8 text-center" id="contribute">
        <h2 className="text-2xl font-bold mb-3">Want to Contribute?</h2>
        <p className="text-aer-muted-foreground mb-6 max-w-2xl mx-auto">
          Help us build the future of React UI! Pick a component from our
          roadmap and contribute to making Aer Design even better.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "/contributing";
            }}
          >
            View Contributing Guide
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open(
                "https://github.com/adithyavalsaraj/aer-design/issues",
                "_blank"
              )
            }
          >
            Browse Issues
          </Button>
        </div>
      </Card>

      {/* Component Specification Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader title={`${selectedComponent} Specification`} />
          {selectedComponent && componentSpecs[selectedComponent] && (
            <div className="space-y-6 p-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-aer-muted-foreground">
                  {componentSpecs[selectedComponent].description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Required Features
                </h3>
                <ul className="space-y-2">
                  {componentSpecs[selectedComponent].features.map(
                    (feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="size-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-aer-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="pt-4 border-t border-aer-border">
                <p className="text-sm text-aer-muted-foreground">
                  💡 <strong>Want to contribute?</strong> Check the{" "}
                  <span
                    onClick={() => {
                      setIsDialogOpen(false);
                      window.location.hash = "/contributing";
                    }}
                    className="text-aer-primary hover:underline cursor-pointer"
                  >
                    Contributing Guide
                  </span>{" "}
                  for implementation standards and best practices.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
