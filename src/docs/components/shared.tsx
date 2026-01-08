import { cn } from "@/lib/utils";
import { Check, Copy, Eye, Play } from "lucide-react";
import * as React from "react";
import { createHighlighter, type Highlighter } from "shiki";

// --- StackBlitz Integration ---

function openInStackBlitz(code: string, title: string = "Aer Design Example") {
  const form = document.createElement("form");
  form.method = "post";
  form.action = "https://stackblitz.com/run?file=src/App.tsx";
  form.target = "_blank";

  const dependencies = {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    clsx: "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "aer-design": "latest", // Assuming the package will be published
  };

  const files = {
    "public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Aer Design Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              aer: {
                primary: "hsl(var(--aer-primary))",
                background: "hsl(var(--aer-background))",
                // Add reasonable defaults for the demo since CSS vars might be missing
              }
            }
          }
        }
      }
    </script>
    <style>
      :root {
        --aer-background: 0 0% 100%;
        --aer-foreground: 240 10% 3.9%;
        --aer-primary: 240 5.9% 10%;
        --aer-primary-foreground: 0 0% 98%;
        --aer-muted: 240 4.8% 95.9%;
        --aer-muted-foreground: 240 3.8% 46.1%;
        --aer-border: 240 5.9% 90%;
        --aer-input: 240 5.9% 90%;
        --aer-ring: 240 5.9% 10%;
      }
      body {
        background-color: hsl(var(--aer-background));
        color: hsl(var(--aer-foreground));
        padding: 2rem;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    "src/index.tsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "src/App.tsx": code,
  };

  // Add hidden inputs for fields
  const addInput = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addInput("project[title]", title);
  addInput("project[template]", "create-react-app");
  addInput("project[dependencies]", JSON.stringify(dependencies));

  Object.entries(files).forEach(([name, content]) => {
    addInput(`project[files][${name}]`, content);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

// --- Components ---

interface SectionProps {
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  id?: string;
  className?: string; // Allow overriding container styles
}

export function DocSection({
  title,
  description,
  children,
  id,
  className,
}: SectionProps) {
  return (
    <div className="space-y-4 pt-10 first:pt-0" id={id}>
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        {description && (
          <p className="text-aer-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <div
        className={cn(
          "p-6 rounded-aer-lg border bg-card/50 border-aer-border/50",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

// --- Shiki Singleton & Hook ---
let highlighterPromise: Promise<Highlighter> | null = null;

const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["dark-plus"],
      langs: ["typescript", "tsx", "javascript", "jsx"],
    });
  }
  return highlighterPromise;
};

function useSyntaxHighlighting(code: string, lang: string) {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    getHighlighter().then((highlighter) => {
      // Ensure we use the correct lang equivalent for Shiki
      const shikiLang = lang === "js" ? "javascript" : "tsx";

      try {
        const out = highlighter.codeToHtml(code, {
          lang: shikiLang,
          theme: "dark-plus",
        });
        if (mounted) setHtml(out);
      } catch (e) {
        // Fallback or error handling
        console.error("Shiki error:", e);
        if (mounted) setHtml(null); // Fallback to raw code
      }
    });

    return () => {
      mounted = false;
    };
  }, [code, lang]);

  return html;
}

interface CodeBlockProps {
  ts: string;
  js?: string;
  fullCode?: string;
}

export function CodeBlock({ ts, js, fullCode }: CodeBlockProps) {
  const [lang, setLang] = React.useState<"ts" | "js">("ts");
  const [viewMode, setViewMode] = React.useState<"snippet" | "full">("snippet");
  const [copied, setCopied] = React.useState(false);

  // Simple type stripper for auto-generated JS
  const getJsCode = (tsCode: string) => {
    if (js) return js;
    return (
      tsCode
        // Remove interface and type definitions
        .replace(/(export\s+)?(interface|type)\s+\w+[\s\S]*?}\n?/g, "")
        .replace(/(export\s+)?type\s+\w+\s*=\s*[\s\S]*?;\n?/g, "")
        // Remove generics in function calls: useState<boolean>(
        .replace(/<[a-zA-Z0-9_]+>(?=\()/g, "")
        // Remove 'as' assertions
        .replace(/\s+as\s+[a-zA-Z0-9_.]+(<[^>]+>)?(\[\])?/g, "")
        // Remove primitive type annotations
        .replace(/:\s*(string|number|boolean|any|void|never|unknown)/g, "")
        // Remove capitalized type annotations (likely custom types/interfaces)
        // This regex attempts to match : Type<Generic>[] but stop before assignments
        .replace(/:\s*[A-Z][a-zA-Z0-9_<>[\]|.]*/g, "")
        .trim()
    );
  };

  const getDisplayCode = () => {
    const source = viewMode === "full" && fullCode ? fullCode : ts;
    return lang === "ts" ? source : getJsCode(source);
  };

  const currentCode = getDisplayCode();
  const highlightedHtml = useSyntaxHighlighting(currentCode, lang);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="relative group mt-4 overflow-hidden rounded-aer-md border border-aer-border shadow-sm bg-aer-background">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between bg-aer-muted/30 px-3 py-2 border-b border-aer-border">
        {/* Left: Language Toggle */}
        <div className="flex bg-aer-muted/50 rounded-md p-0.5 border border-aer-border/50">
          <button
            onClick={() => setLang("ts")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold tracking-wide rounded-sm transition-all",
              lang === "ts"
                ? "bg-aer-background text-aer-foreground shadow-sm"
                : "text-aer-muted-foreground hover:text-aer-foreground"
            )}
          >
            TS
          </button>
          <button
            onClick={() => setLang("js")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold tracking-wide rounded-sm transition-all",
              lang === "js"
                ? "bg-aer-background text-aer-foreground shadow-sm"
                : "text-aer-muted-foreground hover:text-aer-foreground"
            )}
          >
            JS
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {fullCode && (
            <>
              <button
                onClick={() => openInStackBlitz(fullCode)}
                className="h-7 px-2.5 rounded-md hover:bg-aer-primary/10 text-aer-muted-foreground hover:text-aer-primary transition-colors flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-aer-primary/20"
                title="Open in StackBlitz"
              >
                <Play className="size-3 fill-current" />
                <span className="hidden sm:inline">StackBlitz</span>
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === "snippet" ? "full" : "snippet")
                }
                className={cn(
                  "h-7 px-2.5 rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium border border-transparent",
                  viewMode === "full"
                    ? "bg-aer-muted text-aer-foreground border-aer-border"
                    : "hover:bg-aer-muted/50 text-aer-muted-foreground hover:text-aer-foreground"
                )}
                title={viewMode === "full" ? "Show Snippet" : "Show Full Code"}
              >
                <Eye className="size-3.5" />
                <span className="hidden sm:inline">
                  {viewMode === "full" ? "Snippet" : "Full Code"}
                </span>
              </button>

              <div className="w-px h-3.5 bg-aer-border/50 mx-1" />
            </>
          )}

          <button
            onClick={handleCopy}
            className="h-7 flex items-center justify-center gap-1.5 px-2 rounded-md hover:bg-aer-muted text-aer-muted-foreground hover:text-aer-foreground transition-all"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-500" />
                <span className="text-[10px] font-medium text-green-500 animate-in fade-in zoom-in duration-200">
                  Copied!
                </span>
              </>
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Code View */}
      <div className="relative font-mono text-sm leading-relaxed">
        <div className="max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-aer-border scrollbar-track-transparent">
          {highlightedHtml ? (
            <div
              className="[&>pre]:p-4! [&>pre]:bg-zinc-950! [&>pre]:min-w-full [&>pre]:whitespace-pre-wrap [&>pre]:wrap-break-word [&>pre]:font-mono"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className="p-4 bg-zinc-950 text-zinc-50 min-w-full whitespace-pre-wrap wrap-break-word">
              <code>{currentCode}</code>
            </pre>
          )}
        </div>

        {viewMode === "full" && (
          <div className="absolute top-0 right-4 p-2 pointer-events-none">
            <span className="bg-aer-primary/10 text-aer-primary text-[10px] font-bold px-2 py-1 rounded-sm border border-aer-primary/20 backdrop-blur-md shadow-sm">
              FULL SOURCE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ApiTable({
  data,
}: {
  data: { prop: string; type: string; default: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-aer-md border border-aer-border mt-4">
      <table className="w-full text-sm text-left">
        <thead className="bg-aer-muted/50 text-aer-muted-foreground font-medium border-b border-aer-border">
          <tr>
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-aer-border">
          {data.map((row) => (
            <tr
              key={row.prop}
              className="hover:bg-aer-muted/20 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-aer-primary font-bold">
                {row.prop}
              </td>
              <td className="px-4 py-3 font-mono text-xs">{row.type}</td>
              <td className="px-4 py-3 font-mono text-xs text-aer-muted-foreground">
                {row.default}
              </td>
              <td className="px-4 py-3 text-aer-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useTOC, type TOCItem } from "@/docs/context/TOCContext"; // Adjust import path as needed

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  toc?: TOCItem[];
}

export function DocTabs({ tabs }: { tabs: TabItem[] }) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const { setTocItems } = useTOC();

  // Sync TOC when active tab changes. Reset on unmount to prevent persistence.
  React.useEffect(() => {
    const currentTab = tabs.find((t) => t.id === activeTab);
    setTocItems(currentTab?.toc ?? null);

    return () => {
      setTocItems(null);
    };
  }, [activeTab, tabs, setTocItems]);

  return (
    <div className="space-y-6">
      <div className="flex border-b border-aer-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-all relative",
              activeTab === tab.id
                ? "text-aer-primary"
                : "text-aer-muted-foreground hover:text-aer-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-aer-primary animate-in fade-in slide-in-from-bottom-1" />
            )}
          </button>
        ))}
      </div>
      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
