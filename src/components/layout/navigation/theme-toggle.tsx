"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Mount after client-side hydration to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR or before hydration, return a placeholder
  if (!mounted) {
    return <div className="w-[70px] h-6" aria-hidden="true" />
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setTheme("light")}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/60 focus:outline-none transition-colors"
        aria-label="Switch to light mode"
      >
        <Sun 
          size={16} 
          className={cn(
            "text-muted-foreground transition-colors",
            theme !== "dark" && "text-amber-500"
          )} 
        />
      </button>

      <SwitchPrimitive.Root
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className={cn(
          "group relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none",
          theme === "dark" ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
        )}
      >
        <SwitchPrimitive.Thumb 
          className={cn(
            "pointer-events-none block h-[16px] w-[16px] rounded-full bg-white ring-0 transition-transform",
            theme === "dark" ? "translate-x-[16px]" : "translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>

      <button
        onClick={() => setTheme("dark")}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/60 focus:outline-none transition-colors"
        aria-label="Switch to dark mode"
      >
        <Moon 
          size={16} 
          className={cn(
            "text-muted-foreground transition-colors",
            theme === "dark" && "text-blue-400"
          )} 
        />
      </button>
    </div>
  )
} 