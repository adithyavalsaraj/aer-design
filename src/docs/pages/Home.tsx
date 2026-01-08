import { Button } from "@/components/Button";
import { GithubIcon } from "@/docs/components/Icons";
import { ArrowRight, Cpu, Palette, Sparkles, Zap } from "lucide-react";
import { Branding } from "../components/Branding";

interface HomeProps {
  onGetStarted: () => void;
}

export function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="relative min-h-screen w-full bg-aer-background overflow-x-hidden selection:bg-aer-primary/20 selection:text-aer-primary">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aer-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[120px] animate-float [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col">
        {/* Simple Navbar */}
        <nav className="h-20 flex items-center justify-between border-b border-aer-border/10">
          <Branding showBadge />
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/adithyavalsaraj/aer-design"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-aer-muted-foreground hover:text-aer-foreground transition-colors"
            >
              GitHub
            </a>
            <Button variant="aer" size="sm" onClick={onGetStarted}>
              Documentation
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 py-20 translate-y-0 opacity-100 transition-all duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aer-primary/10 border border-aer-primary/20 blur-in [animation-delay:0.1s]">
            <Sparkles className="size-3.5 text-aer-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-aer-primary">
              Introducing Aer Design
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-aer-foreground blur-in [animation-delay:0.2s] uppercase leading-none md:leading-tight">
            Design at the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-sky-400 to-cyan-600 dark:from-sky-400 dark:via-white dark:to-cyan-400 bg-size-[200%] animate-gradient-shift filter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              Speed of Air..!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-aer-muted-foreground max-w-2xl leading-relaxed blur-in [animation-delay:0.35s]">
            A weightless React component library crafted for speed, aesthetics,
            and a premium developer experience. Built with Tailwind CSS 4.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 blur-in [animation-delay:0.5s]">
            <Button
              variant="default"
              size="lg"
              className="h-14 px-10 text-lg font-bold group shadow-2xl shadow-aer-primary/30 animate-shine"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-bold transition-all duration-300 hover:bg-aer-primary/5 hover:text-aer-primary"
              onClick={() =>
                window.open(
                  "https://github.com/adithyavalsaraj/aer-design",
                  "_blank"
                )
              }
            >
              <GithubIcon className="mr-2 size-5" />
              View GitHub
            </Button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="blur-in [animation-delay:0.7s]">
            <FeatureCard
              icon={<Zap className="size-6" />}
              title="Fast"
              description="Built for extreme performance and near-zero runtime overhead."
            />
          </div>
          <div className="blur-in [animation-delay:0.8s]">
            <FeatureCard
              icon={<Palette className="size-6" />}
              title="Aesthetic"
              description="Modern glassmorphism and high-end animations out of the box."
            />
          </div>
          <div className="blur-in [animation-delay:0.9s]">
            <FeatureCard
              icon={<Cpu className="size-6" />}
              title="DX Focused"
              description="Type-safe, composable, and extremely easy to integrate."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-aer-2xl border border-aer-border/10 bg-aer-muted/5 backdrop-blur-sm group hover:border-aer-primary/30 transition-all duration-500 hover:-translate-y-1">
      <div className="size-12 rounded-aer-xl bg-aer-primary/10 text-aer-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(var(--aer-primary),0.3)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-aer-foreground">{title}</h3>
      <p className="text-aer-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
