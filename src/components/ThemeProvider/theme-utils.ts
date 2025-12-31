export type ThemeColor =
  | "blue"
  | "zinc"
  | "red"
  | "orange"
  | "green"
  | "violet"
  | "sunset"
  | "ocean";

export interface ThemeConfig {
  name: ThemeColor;
  label: string;
  activeColor: string;
}

export const THEMES: ThemeConfig[] = [
  { name: "blue", label: "Sapphire", activeColor: "bg-blue-600" },
  { name: "zinc", label: "Carbon", activeColor: "bg-zinc-950" },
  { name: "red", label: "Ruby", activeColor: "bg-red-600" },
  { name: "orange", label: "Amber", activeColor: "bg-orange-500" },
  { name: "green", label: "Emerald", activeColor: "bg-green-600" },
  { name: "violet", label: "Amethyst", activeColor: "bg-violet-600" },
  {
    name: "sunset",
    label: "Sunset",
    activeColor: "bg-gradient-to-br from-orange-500 to-pink-500",
  },
  {
    name: "ocean",
    label: "Ocean",
    activeColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
];
