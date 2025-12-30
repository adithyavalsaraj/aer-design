import plugin from "tailwindcss/plugin";

export const aerDesignPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--aer-background": "0 0% 100%",
        "--aer-foreground": "222.2 84% 4.9%",
        "--aer-card": "0 0% 100%",
        "--aer-card-foreground": "222.2 84% 4.9%",
        "--aer-popover": "0 0% 100%",
        "--aer-popover-foreground": "222.2 84% 4.9%",
        "--aer-primary": "221.2 83.2% 53.3%",
        "--aer-primary-foreground": "210 40% 98%",
        "--aer-secondary": "210 40% 96.1%",
        "--aer-secondary-foreground": "222.2 47.4% 11.2%",
        "--aer-muted": "210 40% 96.1%",
        "--aer-muted-foreground": "215.4 16.3% 46.9%",
        "--aer-accent": "210 40% 96.1%",
        "--aer-accent-foreground": "222.2 47.4% 11.2%",
        "--aer-destructive": "0 84.2% 60.2%",
        "--aer-destructive-foreground": "210 40% 98%",
        "--aer-border": "214.3 31.8% 91.4%",
        "--aer-input": "214.3 31.8% 91.4%",
        "--aer-ring": "221.2 83.2% 53.3%",
        "--aer-radius": "0.5rem",
      },
      ".dark": {
        "--aer-background": "222.2 84% 4.9%",
        "--aer-foreground": "210 40% 98%",
        "--aer-card": "222.2 84% 4.9%",
        "--aer-card-foreground": "210 40% 98%",
        "--aer-popover": "222.2 84% 4.9%",
        "--aer-popover-foreground": "210 40% 98%",
        "--aer-primary": "217.2 91.2% 59.8%",
        "--aer-primary-foreground": "222.2 47.4% 11.2%",
        "--aer-secondary": "217.2 32.6% 17.5%",
        "--aer-secondary-foreground": "210 40% 98%",
        "--aer-muted": "217.2 32.6% 17.5%",
        "--aer-muted-foreground": "215 20.2% 65.1%",
        "--aer-accent": "217.2 32.6% 17.5%",
        "--aer-accent-foreground": "210 40% 98%",
        "--aer-destructive": "0 62.8% 30.6%",
        "--aer-destructive-foreground": "210 40% 98%",
        "--aer-border": "217.2 32.6% 17.5%",
        "--aer-input": "217.2 32.6% 17.5%",
        "--aer-ring": "224.3 76.3% 48%",
      },
    });

    addBase({
      "*": {
        "@apply border-aer-border": {},
      },
      body: {
        "@apply bg-aer-background text-aer-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          "aer-border": "hsl(var(--aer-border))",
          "aer-input": "hsl(var(--aer-input))",
          "aer-ring": "hsl(var(--aer-ring))",
          "aer-background": "hsl(var(--aer-background))",
          "aer-foreground": "hsl(var(--aer-foreground))",
          "aer-primary": {
            DEFAULT: "hsl(var(--aer-primary))",
            foreground: "hsl(var(--aer-primary-foreground))",
          },
          "aer-secondary": {
            DEFAULT: "hsl(var(--aer-secondary))",
            foreground: "hsl(var(--aer-secondary-foreground))",
          },
          "aer-destructive": {
            DEFAULT: "hsl(var(--aer-destructive))",
            foreground: "hsl(var(--aer-destructive-foreground))",
          },
          "aer-muted": {
            DEFAULT: "hsl(var(--aer-muted))",
            foreground: "hsl(var(--aer-muted-foreground))",
          },
          "aer-accent": {
            DEFAULT: "hsl(var(--aer-accent))",
            foreground: "hsl(var(--aer-accent-foreground))",
          },
          "aer-popover": {
            DEFAULT: "hsl(var(--aer-popover))",
            foreground: "hsl(var(--aer-popover-foreground))",
          },
          "aer-card": {
            DEFAULT: "hsl(var(--aer-card))",
            foreground: "hsl(var(--aer-card-foreground))",
          },
        },
        borderRadius: {
          "aer-lg": "var(--aer-radius)",
          "aer-md": "calc(var(--aer-radius) - 2px)",
          "aer-sm": "calc(var(--aer-radius) - 4px)",
        },
      },
    },
  }
);
