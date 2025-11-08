import Script from 'next/script';
import { cn } from '@/lib/utils';

interface DefaultSeoProps {
  canonicalUrl?: string;
  className?: string;
}

export function DefaultSeo({ canonicalUrl, className }: DefaultSeoProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivispa.ca';
  const canonical = canonicalUrl || siteUrl;

  return (
    <div className={cn('seo-container', className)}>
      <link rel="canonical" href={canonical} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Google Analytics Script - Replace with your GA ID */}
      <Script 
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </div>
  );
} 