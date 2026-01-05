import { Button } from "@/components/Button";
import {
  calculateOptimalPosition,
  useAutoPosition,
  type Align,
  type Side,
} from "@/hooks";
import { Info, X } from "lucide-react";
import * as React from "react";
import { ApiTable, CodeBlock, DocSection, DocTabs } from "../components/shared";

export function PositioningDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="Utilities for positioning floating elements with automatic collision detection."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Aer Design provides two powerful utilities for positioning floating
            elements (tooltips, popovers, dropdowns, etc.) that automatically
            adjust their position to stay within the viewport:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                calculateOptimalPosition
              </code>{" "}
              - A function for manual position calculation
            </li>
            <li>
              <code className="text-xs bg-aer-muted px-1.5 py-0.5 rounded">
                useAutoPosition
              </code>{" "}
              - A React hook for automatic positioning
            </li>
          </ul>
          <p className="text-aer-muted-foreground mt-4">
            Both utilities use <strong>360-degree collision detection</strong>{" "}
            to intelligently reposition elements when they would overflow the
            viewport.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choose the right utility for your use case."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              calculateOptimalPosition
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use when you need manual control over positioning logic:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>Custom positioning requirements</li>
              <li>Non-React environments</li>
              <li>Performance-critical scenarios</li>
              <li>Integration with existing positioning code</li>
            </ul>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              useAutoPosition
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use for automatic React-based positioning:
            </p>
            <ul className="text-sm text-aer-muted-foreground space-y-1 list-disc pl-5">
              <li>React components (tooltips, popovers)</li>
              <li>Automatic updates on resize/scroll</li>
              <li>Declarative positioning</li>
              <li>Minimal boilerplate code</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="calculate-position"
        title="calculateOptimalPosition"
        description="Manual position calculation with collision detection."
      >
        <ManualPositionExample />
        <CodeBlock
          ts={`import { calculateOptimalPosition } from "aer-design";

const triggerRect = triggerElement.getBoundingClientRect();
const contentRect = contentElement.getBoundingClientRect();

const result = calculateOptimalPosition({
  referenceRect: triggerRect,
  floatingRect: contentRect,
  side: "bottom",
  align: "start",
  sideOffset: 8,
});

console.log(result); // { side: "bottom", align: "start" }
// If bottom doesn't fit, it might return { side: "top", align: "start" }`}
          fullCode={`import { calculateOptimalPosition } from "aer-design";

function positionTooltip(trigger: HTMLElement, tooltip: HTMLElement) {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const result = calculateOptimalPosition({
    referenceRect: triggerRect,
    floatingRect: tooltipRect,
    side: "bottom",
    align: "center",
    sideOffset: 8,
  });

  // Apply positioning based on result
  if (result.side === "bottom") {
    tooltip.style.top = \`\${triggerRect.bottom + 8}px\`;
  } else if (result.side === "top") {
    tooltip.style.bottom = \`\${window.innerHeight - triggerRect.top + 8}px\`;
  }
  // ... handle left/right and alignment
}`}
        />
      </DocSection>

      <DocSection
        id="use-auto-position"
        title="useAutoPosition Hook"
        description="React hook for automatic positioning with collision detection."
      >
        <AutoPositionExample />
        <CodeBlock
          ts={`import { useAutoPosition } from "aer-design";

function Tooltip({ children, content }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles, placement } = useAutoPosition({
    isOpen,
    side: "top",
    align: "center",
    sideOffset: 8,
  });

  return (
    <>
      <div ref={referenceRef} onMouseEnter={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles}>
          {content}
        </div>
      )}
    </>
  );
}`}
          fullCode={`import { useAutoPosition } from "aer-design";
import * as React from "react";

function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles, placement } = useAutoPosition({
    isOpen,
    side: "top",
    align: "center",
    sideOffset: 8,
    avoidCollisions: true,
  });

  return (
    <div className="relative inline-block">
      <div
        ref={referenceRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={floatingRef}
          style={floatingStyles}
          className="px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg"
        >
          {content}
          <div className="text-xs text-gray-400 mt-1">
            Position: {placement.side} / {placement.align}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="p-8">
      <Tooltip content="This tooltip auto-positions!">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Hover me
        </button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="custom-tooltip"
        title="Custom Tooltip Component"
        description="Build a reusable tooltip component with auto-positioning."
      >
        <CustomTooltipExample />
        <CodeBlock
          ts={`function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side,
    align: "center",
    sideOffset: 8,
  });

  return (
    <div className="relative inline-block">
      <div
        ref={referenceRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles} className="...">
          {content}
        </div>
      )}
    </div>
  );
}`}
          fullCode={`import { useAutoPosition } from "aer-design";
import * as React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Tooltip({ content, children, side = "top", align = "center" }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side,
    align,
    sideOffset: 8,
  });

  return (
    <div className="relative inline-block">
      <div
        ref={referenceRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={floatingRef}
          style={floatingStyles}
          className="px-3 py-2 bg-gray-900 text-white text-xs rounded-md shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {content}
        </div>
      )}
    </div>
  );
}

// Usage
export default function App() {
  return (
    <div className="flex gap-4 p-8">
      <Tooltip content="Top tooltip" side="top">
        <button>Top</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <button>Bottom</button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <button>Right</button>
      </Tooltip>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="custom-popover"
        title="Custom Popover Component"
        description="Build an interactive popover with click-to-open behavior."
      >
        <CustomPopoverExample />
        <CodeBlock
          ts={`function Popover({ trigger, children, side = "bottom" }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);
  
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side,
    align: "start",
    sideOffset: 8,
  });

  // ... Close on outside click logic

  return (
    <div ref={containerRef} className="relative inline-block">
      <div ref={referenceRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles} className="...">
          {children}
        </div>
      )}
    </div>
  );
}`}
          fullCode={`import { useAutoPosition } from "aer-design";
import * as React from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function Popover({ trigger, children, side = "bottom" }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side,
    align: "start",
    sideOffset: 8,
  });

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div ref={referenceRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={floatingRef}
          style={floatingStyles}
          className="min-w-[200px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Usage
export default function App() {
  return (
    <Popover trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded">Open Popover</button>}>
      <h3 className="font-bold mb-2">Popover Title</h3>
      <p className="text-sm text-gray-600">This is a popover with auto-positioning!</p>
    </Popover>
  );
}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="Complete notification system with smart positioning."
      >
        <RealWorldExample />
        <CodeBlock
          ts={`function NotificationSystem() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles, placement } = useAutoPosition({
    isOpen,
    side: "bottom",
    align: "end",
    sideOffset: 12,
  });

  return (
    <div className="p-8">
      <div ref={referenceRef}>
        <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
      </div>
      
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles}>
          <Notification 
            title="Auto-positioned" 
            message={\`Placed at: \${placement.side}\`} 
          />
        </div>
      )}
    </div>
  );
}`}
          fullCode={`import { useAutoPosition } from "aer-design";
import { Info, X } from "lucide-react";
import * as React from "react";

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

function Notification({ title, message, onClose }: NotificationProps) {
  return (
    <div className="min-w-[300px] max-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow-xl">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-gray-600 mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function NotificationSystem() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const { referenceRef, floatingRef, floatingStyles, placement } = useAutoPosition({
    isOpen,
    side: "bottom",
    align: "end",
    sideOffset: 12,
  });

  return (
    <div className="p-8">
      <div ref={referenceRef} className="inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show Notification
        </button>
      </div>
      
      {isOpen && (
        <div ref={floatingRef} style={floatingStyles} className="animate-in slide-in-from-top-2 duration-200">
          <Notification
            title="New Update Available"
            message="Version 2.0 is now available with exciting new features!"
            onClose={() => setIsOpen(false)}
          />
          <div className="text-xs text-gray-400 mt-2 text-center">
            Positioned: {placement.side} / {placement.align}
          </div>
        </div>
      )}
    </div>
  );
}`}
        />
      </DocSection>
    </div>
  );

  // Example Components
  function ManualPositionExample() {
    const [position, setPosition] = React.useState<{
      side: Side;
      align: Align;
    } | null>(null);

    const handleCalculate = () => {
      const trigger = document.getElementById("manual-trigger");
      const content = document.getElementById("manual-content");

      if (trigger && content) {
        const result = calculateOptimalPosition({
          referenceRect: trigger.getBoundingClientRect(),
          floatingRect: content.getBoundingClientRect(),
          side: "bottom",
          align: "start",
          sideOffset: 8,
        });
        setPosition(result);
      }
    };

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5 space-y-4">
        <p className="text-sm text-aer-muted-foreground">
          This example demonstrates manual position calculation. Click the
          button below to calculate where the "Content Element" should be
          positioned relative to the "Trigger Element".
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <div
            id="manual-trigger"
            className="px-4 py-2 bg-aer-primary text-white rounded-md font-medium"
          >
            Trigger Element
          </div>
          <div
            id="manual-content"
            className="px-4 py-2 bg-aer-muted border border-aer-border rounded-md font-medium"
          >
            Content Element
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleCalculate} variant="outline" size="sm">
            Calculate Optimal Position
          </Button>
          {position && (
            <div className="text-sm px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-md border border-green-500/20">
              <strong>Result:</strong> side = "{position.side}", align = "
              {position.align}"
            </div>
          )}
        </div>
        {!position && (
          <p className="text-xs text-aer-muted-foreground italic">
            Click the button to see the calculated optimal position based on
            viewport constraints.
          </p>
        )}
      </div>
    );
  }

  function AutoPositionExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    const { referenceRef, floatingRef, floatingStyles, placement } =
      useAutoPosition({
        isOpen,
        side: "top",
        align: "center",
        sideOffset: 8,
      });

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="relative inline-block">
          <div
            ref={referenceRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Button variant="outline">Hover for tooltip</Button>
          </div>
          {isOpen && (
            <div
              ref={floatingRef}
              style={floatingStyles}
              className="px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg whitespace-nowrap"
            >
              Auto-positioned tooltip!
              <div className="text-xs text-gray-400 mt-1">
                {placement.side} / {placement.align}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function CustomTooltipExample() {
    function Tooltip({
      content,
      children,
      side = "top",
    }: {
      content: string;
      children: React.ReactNode;
      side?: Side;
    }) {
      const [isOpen, setIsOpen] = React.useState(false);

      const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
        isOpen,
        side,
        align: "center",
        sideOffset: 8,
      });

      return (
        <div className="relative inline-block">
          <div
            ref={referenceRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {children}
          </div>
          {isOpen && (
            <div
              ref={floatingRef}
              style={floatingStyles}
              className="px-3 py-2 bg-gray-900 text-white text-xs rounded-md shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200"
            >
              {content}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Top tooltip" side="top">
            <Button variant="outline" size="sm">
              Top
            </Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip content="Left tooltip" side="left">
            <Button variant="outline" size="sm">
              Left
            </Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <Button variant="outline" size="sm">
              Right
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }

  function CustomPopoverExample() {
    function Popover({
      trigger,
      children,
    }: {
      trigger: React.ReactNode;
      children: React.ReactNode;
    }) {
      const [isOpen, setIsOpen] = React.useState(false);
      const containerRef = React.useRef<HTMLDivElement>(null);

      const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
        isOpen,
        side: "bottom",
        align: "start",
        sideOffset: 8,
      });

      React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false);
          }
        };

        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, [isOpen]);

      return (
        <div ref={containerRef} className="relative inline-block">
          <div ref={referenceRef} onClick={() => setIsOpen(!isOpen)}>
            {trigger}
          </div>
          {isOpen && (
            <div
              ref={floatingRef}
              style={floatingStyles}
              className="min-w-[200px] p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95"
            >
              {children}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <Popover
          trigger={
            <Button variant="outline">
              <Info className="w-4 h-4 mr-2" />
              Open Popover
            </Button>
          }
        >
          <h3 className="font-bold mb-2 text-zinc-900 dark:text-zinc-50">
            Popover Title
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            This popover automatically positions itself to stay within the
            viewport!
          </p>
        </Popover>
      </div>
    );
  }

  function RealWorldExample() {
    const [isOpen, setIsOpen] = React.useState(false);

    const { referenceRef, floatingRef, floatingStyles, placement } =
      useAutoPosition({
        isOpen,
        side: "bottom",
        align: "end",
        sideOffset: 12,
      });

    return (
      <div className="p-6 border border-aer-border rounded-lg bg-aer-muted/5">
        <p className="text-sm text-aer-muted-foreground mb-4">
          Click the button to see a notification that automatically positions
          itself relative to the button. Try scrolling or resizing to see it
          adapt!
        </p>
        <div className="relative">
          <div ref={referenceRef} className="inline-block">
            <Button onClick={() => setIsOpen(!isOpen)} variant="default">
              <Info className="w-4 h-4 mr-2" />
              {isOpen ? "Hide" : "Show"} Notification
            </Button>
          </div>

          {isOpen && (
            <div
              ref={floatingRef}
              style={floatingStyles}
              className="animate-in slide-in-from-top-2 duration-200"
            >
              <div className="min-w-[300px] max-w-[400px] p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                      New Update Available
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Version 2.0 is now available with exciting new features!
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                  Auto-positioned:{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-500">
                    {placement.side}
                  </span>{" "}
                  /{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-500">
                    {placement.align}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const api = (
    <div className="space-y-8">
      <div>
        <h3 id="calculate-position-api" className="text-lg font-bold mb-4">
          calculateOptimalPosition
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          Function that calculates the optimal position for a floating element
          with 360-degree collision detection.
        </p>
        <h4 className="text-md font-semibold mb-2 mt-6">Parameters</h4>
        <ApiTable
          data={[
            {
              prop: "referenceRect",
              type: "DOMRect",
              default: "-",
              description: "Bounding rect of the reference (trigger) element",
            },
            {
              prop: "floatingRect",
              type: "DOMRect",
              default: "-",
              description: "Bounding rect of the floating (content) element",
            },
            {
              prop: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: "-",
              description: "Preferred side to position the floating element",
            },
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              default: "-",
              description: "Preferred alignment relative to reference",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "4",
              description: "Offset in pixels from the reference element",
            },
            {
              prop: "viewportWidth",
              type: "number",
              default: "window.innerWidth",
              description: "Viewport width for collision detection",
            },
            {
              prop: "viewportHeight",
              type: "number",
              default: "window.innerHeight",
              description: "Viewport height for collision detection",
            },
          ]}
        />
        <h4 className="text-md font-semibold mb-2 mt-6">Returns</h4>
        <ApiTable
          data={[
            {
              prop: "side",
              type: "Side",
              default: "-",
              description: "Optimal side after collision detection",
            },
            {
              prop: "align",
              type: "Align",
              default: "-",
              description: "Optimal alignment after collision detection",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="use-auto-position-api" className="text-lg font-bold mb-4">
          useAutoPosition
        </h3>
        <p className="text-sm text-aer-muted-foreground mb-4">
          React hook for automatic positioning with collision detection.
          Automatically updates position when the floating element opens or
          viewport changes.
        </p>
        <h4 className="text-md font-semibold mb-2 mt-6">Options</h4>
        <ApiTable
          data={[
            {
              prop: "isOpen",
              type: "boolean",
              default: "-",
              description: "Whether the floating element is open/visible",
            },
            {
              prop: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: "Preferred side to position the floating element",
            },
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: "Preferred alignment relative to reference",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "4",
              description: "Offset in pixels from the reference element",
            },
            {
              prop: "alignOffset",
              type: "number",
              default: "0",
              description: "Offset in pixels for alignment",
            },
            {
              prop: "avoidCollisions",
              type: "boolean",
              default: "true",
              description: "Enable collision detection and auto-repositioning",
            },
          ]}
        />
        <h4 className="text-md font-semibold mb-2 mt-6">Returns</h4>
        <ApiTable
          data={[
            {
              prop: "referenceRef",
              type: "RefCallback<Element>",
              default: "-",
              description: "Ref to attach to the reference (trigger) element",
            },
            {
              prop: "floatingRef",
              type: "RefCallback<HTMLElement>",
              default: "-",
              description: "Ref to attach to the floating (content) element",
            },
            {
              prop: "floatingStyles",
              type: "CSSProperties",
              default: "-",
              description: "CSS styles to apply to the floating element",
            },
            {
              prop: "placement",
              type: "{ side: Side; align: Align }",
              default: "-",
              description: "Final computed placement after collision detection",
            },
          ]}
        />
      </div>

      <div>
        <h3 id="types" className="text-lg font-bold mb-4">
          Type Definitions
        </h3>
        <ApiTable
          data={[
            {
              prop: "Side",
              type: '"top" | "bottom" | "left" | "right"',
              default: "-",
              description: "Possible sides for positioning",
            },
            {
              prop: "Align",
              type: '"start" | "center" | "end"',
              default: "-",
              description: "Possible alignments for positioning",
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Positioning
        </h1>
        <p className="text-xl text-aer-muted-foreground">
          Utilities for positioning floating elements with automatic collision
          detection and 360-degree viewport awareness.
        </p>
      </header>

      <DocTabs
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: overview,
            toc: [
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "calculate-position", title: "calculateOptimalPosition" },
              { id: "use-auto-position", title: "useAutoPosition Hook" },
              { id: "custom-tooltip", title: "Custom Tooltip" },
              { id: "custom-popover", title: "Custom Popover" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          {
            id: "api",
            label: "API",
            content: api,
            toc: [
              {
                id: "calculate-position-api",
                title: "calculateOptimalPosition",
              },
              { id: "use-auto-position-api", title: "useAutoPosition" },
              { id: "types", title: "Type Definitions" },
            ],
          },
        ]}
      />
    </div>
  );
}
