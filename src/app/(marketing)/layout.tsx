"use client"

import { Navbar } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Container } from "@/components/ui/container"
import { usePathname } from "next/navigation"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-14 sm:pt-16 md:pt-18">
        {!isHomePage && (
          <Container className="py-3 sm:py-4">
            <Breadcrumbs />
          </Container>
        )}
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
} 