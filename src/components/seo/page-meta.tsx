import { cn } from '@/lib/utils'

interface PageMetaProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogImageType?: string
  ogType?: string
  ogTitle?: string
  ogDescription?: string
  ogLocale?: string
  ogSiteName?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterSite?: string
  twitterCreator?: string
  geo?: {
    region?: string
    placename?: string
    position?: string
  }
  className?: string
  noIndex?: boolean
  alternateLanguages?: {
    language: string
    url: string
  }[]
}

/**
 * PageMeta component for rendering meta tags for a specific page
 * Handles SEO tags for individual pages including open graph and Twitter
 */
export function PageMeta({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageType,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogLocale = 'en_CA',
  ogSiteName,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterSite,
  twitterCreator,
  geo,
  className,
  noIndex = false,
  alternateLanguages,
}: PageMetaProps) {
  const keywordsString = keywords && keywords.length > 0 
    ? keywords.join(', ') 
    : undefined

  return (
    <div className={cn('page-meta hidden', className)}>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots Meta Tags */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph Meta Tags */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageWidth && <meta property="og:image:width" content={String(ogImageWidth)} />}
      {ogImageHeight && <meta property="og:image:height" content={String(ogImageHeight)} />}
      {ogImageType && <meta property="og:image:type" content={ogImageType} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {ogLocale && <meta property="og:locale" content={ogLocale} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}

      {/* Twitter Meta Tags */}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Geo Meta Tags */}
      {geo?.region && <meta name="geo.region" content={geo.region} />}
      {geo?.placename && <meta name="geo.placename" content={geo.placename} />}
      {geo?.position && <meta name="geo.position" content={geo.position} />}
      
      {/* Alternate Languages */}
      {alternateLanguages && alternateLanguages.map(alt => (
        <link key={alt.language} rel="alternate" hrefLang={alt.language} href={alt.url} />
      ))}
    </div>
  )
} 