import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Typography components based on ShadCN UI
// Using Tailwind v4 responsive typography

type TypographyProps = HTMLAttributes<HTMLElement>;

export function H1({ className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-4xl",
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl",
        className
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl",
        className
      )}
      {...props}
    />
  );
}

export function P({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("text-xl text-muted-foreground md:text-2xl", className)}
      {...props}
    />
  );
}

export function Large({ className, ...props }: TypographyProps) {
  return (
    <div
      className={cn("text-lg font-semibold sm:text-xl", className)}
      {...props}
    />
  );
}

export function Small({ className, ...props }: TypographyProps) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function Blockquote({ className, ...props }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200",
        className
      )}
      {...props}
    />
  );
}

export function InlineCode({ className, ...props }: TypographyProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  );
}

export function List({ className, ...props }: TypographyProps) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
} 