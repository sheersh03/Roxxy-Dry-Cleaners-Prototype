import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
