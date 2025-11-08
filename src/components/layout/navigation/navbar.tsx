"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { NAV_ITEMS } from "@/types/navigation"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useShoppingCart } from "@/contexts/shopping-cart-context"

export function Navbar() {
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const { getTotalItems } = useShoppingCart()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  
  // Handle scroll event for transparent/solid navbar transition and hide/show behavior
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update background transparency
      setIsScrolled(currentScrollY > 10)
      
      // Determine if header should be hidden or shown
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setIsHidden(true)
      } else {
        // Scrolling up or at top - show header
        setIsHidden(false)
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Mount component after hydration to prevent mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when an item is clicked
  const handleItemClick = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  // Determine current theme
  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark")
  
  // Use appropriate logo based on theme
  const logoSrc = isDarkTheme 
    ? "/assets/logos/logo-dark.svg" 
    : "/assets/logos/logo-light.svg"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b" 
          : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <Container>
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2"
            aria-label="Vivi Aesthetics & Spa - Home"
          >
            {mounted ? (
              <Image 
                src={logoSrc} 
                alt="Vivi Aesthetics & Spa Logo"
                width={40}
                height={40}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              />
            ) : (
              // Placeholder while loading to prevent hydration mismatch
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            )}
            <span className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Vivi Aesthetics & Spa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || 
                (pathname.startsWith(item.href) && item.href !== "/")
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1.5 no-underline hover:no-underline",
                    isActive 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Shopping Cart */}
            <Button asChild variant="ghost" size="default" className="relative">
              <Link href="/shop/cart" aria-label="Shopping Cart">
                <ShoppingCart className="w-5 h-5" />
                {mounted && getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-2">
              <Button asChild variant="shop" size="default" rounded="full">
                <Link href="/shop">Shop</Link>
              </Button>
              
              <Button asChild variant="offers" size="default" rounded="full">
                <Link href="/offers">Offers</Link>
              </Button>
              
              <Button asChild size="default" rounded="full">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden gap-2">
            {/* Shopping Cart */}
            <Button asChild variant="ghost" size="default" className="relative">
              <Link href="/shop/cart" aria-label="Shopping Cart">
                <ShoppingCart className="w-5 h-5" />
                {mounted && getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Link>
            </Button>
            
            <ThemeToggle />
            
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-10 h-10 p-0 rounded-md hover:bg-muted/50 transition-colors" 
                  aria-label="Menu"
                >
                  <div className="relative flex flex-col justify-center items-center w-full h-full">
                    <span className={cn(
                      "absolute block h-0.5 w-6 bg-foreground transition-all duration-200",
                      isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                    )} />
                    <span className={cn(
                      "absolute block h-0.5 w-6 bg-foreground transition-opacity duration-150",
                      isOpen ? "opacity-0" : "opacity-100"
                    )} />
                    <span className={cn(
                      "absolute block h-0.5 w-6 bg-foreground transition-all duration-200",
                      isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                    )} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 max-h-[calc(100vh-4rem)] overflow-y-auto mt-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || 
                    (pathname.startsWith(item.href) && item.href !== "/")
                  
                  return (
                    <DropdownMenuItem key={item.href} asChild onClick={handleItemClick}>
                      <Link
                        href={item.href}
                        className={cn(
                          "w-full py-3 px-4 no-underline hover:no-underline text-base",
                          isActive && "text-primary font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                
                {/* Separator before booking buttons */}
                <DropdownMenuSeparator className="my-2" />
                
                {/* Action Buttons */}
                <div className="p-3 space-y-3">
                  <Button asChild size="lg" rounded="full" className="w-full" onClick={handleItemClick}>
                    <Link href="/booking">Book Now</Link>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button asChild variant="shop" size="lg" rounded="full" className="flex-1" onClick={handleItemClick}>
                      <Link href="/shop">Shop</Link>
                    </Button>
                    
                    <Button asChild variant="offers" size="lg" rounded="full" className="flex-1" onClick={handleItemClick}>
                      <Link href="/offers">Offers</Link>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  )
} 