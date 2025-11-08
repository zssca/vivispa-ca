import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary/90 text-primary-foreground",
        secondary:
          "border-secondary/40 bg-secondary/90 text-secondary-foreground",
        destructive:
          "border-destructive/40 bg-destructive/90 text-white",
        outline:
          "border-border/90 bg-background/80 text-foreground",
        success:
          "border-green-600/40 bg-green-500/90 text-white",
        warning:
          "border-amber-500/40 bg-amber-400/90 text-amber-950",
        primary:
          "border-blue-600/40 bg-blue-500/90 text-white",
        holiday:
          "border-red-600/40 bg-red-500/90 text-white",
        seasonal:
          "border-teal-600/40 bg-teal-500/90 text-white",
        bestSeller:
          "border-purple-600/40 bg-purple-500/90 text-white",
        newClient:
          "border-indigo-600/40 bg-indigo-500/90 text-white",
        flashSale:
          "border-rose-600/40 bg-rose-500/90 text-white",
        anniversary:
          "border-yellow-600/40 bg-yellow-500/90 text-yellow-950",
        // Canadian themed badges
        canada:
          "border-red-700/40 bg-gradient-to-r from-red-600 to-red-500 text-white",
        calgary:
          "border-red-800/40 bg-red-700/90 text-white",
        festival:
          "border-fuchsia-600/40 bg-fuchsia-500/90 text-white",
        thanksgiving:
          "border-orange-600/40 bg-orange-500/90 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
