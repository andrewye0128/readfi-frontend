import * as React from "react";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "icon" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none";
  const variantClass =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent"
      : "bg-primary text-primary-foreground hover:opacity-90";
  const sizeClass =
    size === "icon"
      ? "h-9 w-9"
      : size === "sm"
      ? "h-8 px-3 text-sm"
      : "h-9 px-4";

  return (
    <button
      className={cx(base, variantClass, sizeClass, className)}
      {...props}
    />
  );
}

export default Button;
