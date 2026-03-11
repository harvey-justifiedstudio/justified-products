import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual error state (also set aria-invalid when true) */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      aria-invalid={error ?? undefined}
      className={cn(
        "flex h-9 w-full rounded-md bg-secondary text-secondary-foreground px-3 py-1 text-sm",
        "ring-offset-background file:border-0 file:bg-secondary file:text-secondary-foreground file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "hover:bg-secondary-hover transition-colors",
        "disabled:cursor-not-allowed",
        "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/20 aria-invalid:ring-offset-2 aria-invalid:focus-visible:ring-danger",
        "read-only:cursor-default read-only:bg-muted/50 read-only:opacity-90 read-only:hover:bg-muted/50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
