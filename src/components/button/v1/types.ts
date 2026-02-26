import type { LucideIcon } from "lucide-vue-next";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
}
