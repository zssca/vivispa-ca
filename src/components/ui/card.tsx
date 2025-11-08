import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-lg border min-h-[80px]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 sm:gap-1.5 p-3 sm:p-4 md:p-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-3 sm:[.border-b]:pb-4 md:[.border-b]:pb-5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base sm:text-lg md:text-xl leading-none font-semibold min-h-[1.5em]", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-1.5 min-h-[1.5em]", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-3 sm:p-4 md:p-5", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-3 sm:p-4 md:p-5 [.border-t]:pt-3 sm:[.border-t]:pt-4 md:[.border-t]:pt-5", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
