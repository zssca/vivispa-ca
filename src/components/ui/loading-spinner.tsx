import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  text = "Loading..." 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn(
        "animate-spin rounded-full border-4 border-gray-300 border-t-primary",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-lg text-muted-foreground font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

export function FullPageLoadingSpinner({ 
  text = "Website unavailable" 
}: { 
  text?: string 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="w-16 h-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary mx-auto" />
        <p className="text-lg text-muted-foreground animate-pulse">
          {text}
        </p>
      </div>
    </div>
  )
}