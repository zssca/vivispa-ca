"use client";

import { FC } from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Facebook, 
  ChevronUp
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { locations } from '@/data/locations';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { NAV_ITEMS } from "@/types/navigation";
import { serviceCategories } from "@/data/services";

type SocialLink = {
  name: string
  href: string
  icon: typeof Instagram | typeof Facebook
}

// Social media links
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/vivispa.ca/",
    icon: Instagram
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/vivispa.ca/",
    icon: Facebook
  }
]

export const Footer: FC = () => {
  return (
    <footer className="border-t bg-accent/10 print:hidden">
      <Container size="xl">
        <div className="py-8 md:py-10 lg:py-12">
          {/* Table-like structure for footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Column 1: About */}
            <div className="space-y-4 p-4">
              <div className="flex items-center gap-2.5">
                <Image 
                  src="/assets/logos/logo-light.svg"
                  alt="Vivi Aesthetics & Spa Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain dark:invert"
                />
                <span className="font-serif text-lg font-semibold">Vivi Aesthetics & Spa</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Experience the ultimate in aesthetic treatments and spa services
                with our team of licensed professionals. We offer premium services
                tailored to your unique beauty and wellness needs.
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-3 pt-1">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4 p-4">
              <h3 className="text-base font-semibold md:text-lg">Quick Links</h3>
              <table className="w-full">
                <tbody>
                  {NAV_ITEMS.map((item) => (
                    <tr key={item.href}>
                      <td className="py-1.5">
                        <Link 
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Column 3: Service Categories */}
            <div className="space-y-4 p-4">
              <h3 className="text-base font-semibold md:text-lg">Our Services</h3>
              <table className="w-full">
                <tbody>
                  {serviceCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="py-1.5">
                        <Link 
                          href={`/services?category=${encodeURIComponent(category.name.toLowerCase())}`}
                          className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Column 4: Locations */}
            <div className="space-y-4 p-4">
              <h3 className="text-base font-semibold md:text-lg">Our Locations</h3>
              <table className="w-full">
                <tbody>
                  {locations.map((location) => (
                    <tr key={location.id}>
                      <td className="py-2 space-y-1">
                        <span className="text-sm font-medium block">{location.name}</span>
                        <address className="text-xs text-muted-foreground not-italic">
                          {location.address}<br />
                          {location.city}, {location.province} {location.postalCode}
                        </address>
                        <div className="text-xs text-muted-foreground">
                          {location.phone && (
                            <Link
                              href={`tel:${location.phone.replace(/[^0-9]/g, '')}`} 
                              className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                              {location.phone}
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Booking CTA */}
        <div className="py-6 px-4 md:px-8 lg:px-10 my-6 bg-primary text-primary-foreground rounded-lg text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-1">Ready to Transform Your Look?</h3>
              <p className="text-sm md:text-base opacity-90">Book your appointment today and experience our premium services.</p>
            </div>
            <Button 
              asChild 
              variant="secondary" 
              size="lg" 
              rounded="full"
              className="px-6 md:px-8 py-5 sm:py-6 whitespace-nowrap"
            >
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
        
        {/* Bottom section: Copyright and scroll to top */}
        <div className="py-5 border-t flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Vivi Aesthetics & Spa. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
              <Link 
                href="/privacy-policy" 
                className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="https://zss.ca" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
              >
                Website built by ZSS.ca
              </Link>
            </div>
          </div>
          
          {/* Scroll to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors self-center sm:self-end"
            aria-label="Scroll to top"
            suppressHydrationWarning
          >
            <span>Back to top</span>
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
};