import * as React from "react"

export function Separator({ className = "", ...props }: React.ComponentProps<'div'>) {
  return <div className={("h-px w-full bg-border " + className).trim()} {...props} />
}

export default Separator


