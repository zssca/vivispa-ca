"use client"

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3 px-4 text-sm font-medium transition-all hover:text-primary focus-visible:outline-none [&[data-state=open]]:text-primary [&[data-state=open]>svg]:rotate-180",
        "sm:py-4 sm:px-5 sm:text-base md:py-5 md:px-6 md:text-lg lg:py-6",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300 sm:h-4 sm:w-4 md:h-5 md:w-5" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  hasNestedContent?: boolean;
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, hasNestedContent = false, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-xs transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "sm:text-sm md:text-base",
      className
    )}
    {...props}
  >
    {hasNestedContent ? (
      children
    ) : (
      <div className="py-3 px-4 sm:py-4 sm:px-5 md:py-5 md:px-6 lg:py-6 text-muted-foreground">{children}</div>
    )}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; 