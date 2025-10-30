import * as React from "react"

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: "default" | "secondary"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
  const styles =
    variant === "secondary"
      ? " border border-border/50 bg-muted/30 text-foreground"
      : " border border-primary/30 bg-primary/15 text-primary"
  return <span className={(base + styles + " " + className).trim()} {...props} />
}

export default Badge


