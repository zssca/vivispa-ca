import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ShoppingCartProvider } from "@/contexts/shopping-cart-context";
import { SkeletonProvider } from "@/contexts/skeleton-context";
import { FloatingWidgets } from "@/components/floating-widgets";
import { defaultMetadata } from "./metadata";
import GoogleAnalytics from "@/components/google-analytics";

/**
 * Configure fonts with next/font
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

/**
 * Metadata for the application
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = defaultMetadata;

/**
 * Root layout component that wraps all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${roboto.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen antialiased">
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkeletonProvider>
            <ShoppingCartProvider>
              {children}
              <FloatingWidgets />
            </ShoppingCartProvider>
          </SkeletonProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
