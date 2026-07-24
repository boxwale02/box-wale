import {
  Award,
  ShieldCheck,
  Sparkles,
  Ruler,
  Leaf,
  Factory,
  Truck,
  BadgeDollarSign
} from "lucide-react";

export const iconMap = {
  Award,
  ShieldCheck,
  Sparkles,
  Ruler,
  Leaf,
  Factory,
  Truck,
  BadgeDollarSign
} as const;

export type IconName = keyof typeof iconMap;