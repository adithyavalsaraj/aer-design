import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Dialog, DialogContent, DialogHeader } from "@/components/Dialog";
import { Input } from "@/components/Input";
import {
  ROADMAP_DATA,
  getCategoryStats,
  getStats,
  type Category,
} from "@/data/roadmap";
import { fuzzyScore } from "@/lib/fuzzy";
import { cn } from "@/lib/utils";
import {
  Check,
  Clock,
  Command,
  Filter,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

/**
 * RoadmapDoc - Modern visual representation of the project roadmap
 *
 * Powered by Single Source of Truth: src/data/roadmap.ts
 */
export function RoadmapDoc() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | "Completed" | "Planned"
  >("All");

  const stats = getStats();
  const categoryStats = getCategoryStats();
  const completionPercentage = Math.round(
    (stats.completed / stats.total) * 100
  );

  // Filter components based on search, category, and status
  const filteredComponents = useMemo(() => {
    const filtered = ROADMAP_DATA.filter((component) => {
      // Fuzzy search logic
      const matchesSearch =
        searchQuery === "" ||
        fuzzyScore(component.name, searchQuery) > 0 ||
        fuzzyScore(component.description, searchQuery) > 0;

      const matchesCategory =
        selectedCategory === "All" || component.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Completed" && component.status === "Completed") ||
        (selectedStatus === "Planned" && component.status !== "Completed");

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Score-based sorting if searching
    if (searchQuery) {
      return filtered.sort((a, b) => {
        const scoreA = Math.max(
          fuzzyScore(a.name, searchQuery) * 2, // Title weight
          fuzzyScore(a.description, searchQuery)
        );
        const scoreB = Math.max(
          fuzzyScore(b.name, searchQuery) * 2,
          fuzzyScore(b.description, searchQuery)
        );
        return scoreB - scoreA;
      });
    }

    // Custom sorting: Completed > High Priority > Medium > Low
    return filtered.sort((a, b) => {
      const statusOrder = {
        Completed: 0,
        "In Progress": 1,
        Planned: 2,
        "not-implemented": 3,
      };
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };

      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return (
          (statusOrder[a.status as keyof typeof statusOrder] ?? 99) -
          (statusOrder[b.status as keyof typeof statusOrder] ?? 99)
        );
      }

      // If status is same, sort by priority
      const aPrio = a.priority
        ? priorityOrder[a.priority as keyof typeof priorityOrder]
        : 99;
      const bPrio = b.priority
        ? priorityOrder[b.priority as keyof typeof priorityOrder]
        : 99;

      if (aPrio !== bPrio) {
        return aPrio - bPrio;
      }

      // Final fallback: alphabetical
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const selectedItem = selectedComponent
    ? ROADMAP_DATA.find((i) => i.name === selectedComponent)
    : null;

  const categories: (Category | "All")[] = [
    "All",
    "General",
    "Layout",
    "Navigation",
    "Data Entry",
    "Data Display",
    "Feedback",
    "Configuration",
    "Utilities",
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with Vision */}
      <div className="relative rounded-aer-xl bg-linear-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10 p-12 border border-aer-border">
        <div className="absolute inset-0 bg-grid-white/5 mask-[radial-gradient(white,transparent_85%)] rounded-aer-xl overflow-hidden" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-16 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Command className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight pb-1">
                Aer Design Roadmap
              </h1>
              <p className="text-lg text-aer-muted-foreground mt-1 pb-1">
                Building the future of React UI, one component at a time
              </p>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="space-y-4 mb-8">
            <p className="text-aer-foreground leading-relaxed">
              <strong className="text-aer-primary">Our Mission:</strong> Create
              a comprehensive, accessible, and performant component library that
              empowers developers to build beautiful applications without
              compromise.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-aer-lg bg-aer-background/50 border border-aer-border">
                <Zap className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Performance First</div>
                  <div className="text-xs text-aer-muted-foreground">
                    Virtualization, lazy loading, optimized rendering
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-aer-lg bg-aer-background/50 border border-aer-border">
                <Target className="size-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">
                    Accessibility Built-in
                  </div>
                  <div className="text-xs text-aer-muted-foreground">
                    ARIA compliant, keyboard navigation, screen reader support
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-aer-lg bg-aer-background/50 border border-aer-border">
                <Sparkles className="size-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Developer Joy</div>
                  <div className="text-xs text-aer-muted-foreground">
                    TypeScript-first, intuitive APIs, comprehensive docs
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="glass" className="p-4">
              <div className="text-3xl font-bold text-green-500">
                {stats.completed}
              </div>
              <div className="text-sm text-aer-muted-foreground">
                Components Ready
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-3xl font-bold text-amber-500">
                {stats.highPriority}
              </div>
              <div className="text-sm text-aer-muted-foreground">
                High Priority
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-3xl font-bold text-blue-500">
                {stats.mediumPriority}
              </div>
              <div className="text-sm text-aer-muted-foreground">
                In Pipeline
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="text-3xl font-bold bg-linear-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                {completionPercentage}%
              </div>
              <div className="text-sm text-aer-muted-foreground">Complete</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Progress Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-aer-primary" />
            Development Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-semibold text-aer-primary">
                  {stats.completed} / {stats.total} Components
                </span>
              </div>
              <div className="relative w-full bg-aer-muted rounded-full h-4 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-green-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white mix-blend-difference">
                  {completionPercentage}%
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h4 className="text-sm font-semibold mb-4">By Category</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {categoryStats.map((category) => {
                  const percentage = Math.round(
                    (category.completed / category.total) * 100
                  );
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <span className="text-xs text-aer-muted-foreground">
                          {category.completed}/{category.total}
                        </span>
                      </div>
                      <div className="w-full bg-aer-muted rounded-full h-2">
                        <div
                          className="bg-aer-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search - Premium UI */}
      <Card id="filters" className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-aer-lg bg-aer-primary/10 flex items-center justify-center">
              <Filter className="size-5 text-aer-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Filter Components</h3>
              <p className="text-sm text-aer-muted-foreground">
                Find exactly what you need
              </p>
            </div>
          </div>

          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Input
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="size-4" />}
              clearable
              onClear={() => setSearchQuery("")}
              className="w-full md:w-60 shrink-0 h-7"
              inputClassName="text-xs"
            />

            <div className="flex flex-col space-y-0">
              {/* Category Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-aer-muted-foreground uppercase tracking-wider shrink-0">
                  Category:
                </span>
                {categories.map((category) => (
                  <Badge
                    size="sm"
                    key={category}
                    status={
                      selectedCategory === category ? "primary" : "default"
                    }
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      selectedCategory === category
                        ? "shadow-md"
                        : "hover:border-aer-primary/50 hover:bg-aer-primary/5"
                    )}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Status Chips */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-semibold text-aer-muted-foreground uppercase tracking-wider shrink-0">
                  Status:
                </span>
                {(["All", "Completed", "Planned"] as const).map((status) => (
                  <Badge
                    size="sm"
                    key={status}
                    status={selectedStatus === status ? "primary" : "default"}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      selectedStatus === status
                        ? "shadow-md"
                        : "hover:border-aer-primary/50 hover:bg-aer-primary/5"
                    )}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status === "Completed" && (
                      <Check className="size-3 mr-1" />
                    )}
                    {status === "Planned" && <Clock className="size-3 mr-1" />}
                    {status}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery ||
            selectedCategory !== "All" ||
            selectedStatus !== "All") && (
            <div className="flex items-center gap-2 p-3 bg-aer-muted/30 rounded-aer-lg border border-aer-border">
              <Sparkles className="size-4 text-aer-primary" />
              <span className="text-sm text-aer-muted-foreground">
                Showing{" "}
                <strong className="text-aer-foreground">
                  {filteredComponents.length}
                </strong>{" "}
                {filteredComponents.length === 1 ? "component" : "components"}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                className="ml-auto text-xs text-aer-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Component Grid */}
      <div id="components">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Components</h2>
            <p className="text-sm text-aer-muted-foreground">
              {filteredComponents.length} component
              {filteredComponents.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredComponents.map((component) => {
            const isCompleted = component.status === "Completed";
            return (
              <Card
                key={component.name}
                className="group hover:shadow-lg transition-all duration-300 hover:border-aer-primary/50 min-w-0"
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-aer-primary transition-colors">
                        {component.name}
                      </h3>
                      <p className="text-xs text-aer-muted-foreground mt-1">
                        {component.category}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {isCompleted ? (
                        <Badge variant="soft" status="success" size="sm">
                          <Check className="size-3 mr-1" />
                          {component.version}
                        </Badge>
                      ) : component.priority === "High" ? (
                        <Badge variant="soft" status="warning" size="sm">
                          <Clock className="size-3 mr-1" />
                          High Priority
                        </Badge>
                      ) : (
                        <Badge variant="soft" status="primary" size="sm">
                          Planned
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-aer-muted-foreground mb-4 line-clamp-2">
                    {component.description}
                  </p>

                  {component.features && component.features.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-aer-muted-foreground mb-2">
                        Key Features:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {component.features.slice(0, 3).map((feature, i) => (
                          <Badge
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="text-xs max-w-full"
                            title={feature}
                          >
                            <span className="truncate">{feature}</span>
                          </Badge>
                        ))}
                        {component.features.length > 3 && (
                          <Badge
                            variant="ghost"
                            size="sm"
                            className="text-xs shrink-0"
                          >
                            +{component.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {isCompleted ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          window.location.hash = `/${component.name.toLowerCase()}`;
                        }}
                      >
                        View Docs
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedComponent(component.name);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Spec
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="size-16 rounded-full bg-aer-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="size-8 text-aer-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No components found</h3>
            <p className="text-sm text-aer-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <Card id="contribute" variant="aer" className="p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="size-16 rounded-full bg-aer-primary/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="size-8 text-aer-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-aer-foreground">
            Want to Contribute?
          </h2>
          <p className="text-aer-muted-foreground mb-6 leading-relaxed">
            Help us build the future of React UI! Pick a component from our
            roadmap and contribute to making Aer Design even better. Every
            contribution, big or small, makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </Card>

      {/* Component Specification Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader title={`${selectedComponent} Specification`} />
          {selectedItem && (
            <div className="space-y-6 p-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="soft" status="primary">
                    {selectedItem.category}
                  </Badge>
                  {selectedItem.priority && (
                    <Badge
                      variant="soft"
                      status={
                        selectedItem.priority === "High"
                          ? "warning"
                          : selectedItem.priority === "Medium"
                          ? "primary"
                          : "default"
                      }
                    >
                      {selectedItem.priority} Priority
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-aer-muted-foreground">
                  {selectedItem.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Required Features
                </h3>
                {selectedItem.features && selectedItem.features.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedItem.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="size-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-aer-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-aer-muted-foreground italic">
                    Feature list not yet defined.
                  </p>
                )}
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
