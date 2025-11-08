import { Service } from '@/types/service'
import { cn } from '@/lib/utils'
import { ServiceStructuredData } from './service-structured-data'
import { PageMeta } from './page-meta'

interface ServiceSeoProps {
  service: Service
  className?: string
}

/**
 * ServiceSeo component that handles all SEO aspects for a service page
 * Combines meta tags and structured data
 */
export function ServiceSeo({ service, className }: ServiceSeoProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivispa.ca'
  
  // Prepare canonical URL
  const canonical = service.canonicalUrl 
    ? (service.canonicalUrl.startsWith('http') ? service.canonicalUrl : `${siteUrl}${service.canonicalUrl}`)
    : `${siteUrl}/services/${service.slug}`
  
  // Prepare image URLs with absolute paths
  const serviceImage = service.image 
    ? (service.image.startsWith('http') ? service.image : `${siteUrl}${service.image}`)
    : `${siteUrl}/images/placeholder-service.jpg`
  
  // Generate optimized SEO title using primary keyword if available
  const seoTitle = service.metaTitle || 
    (service.primaryKeyword 
      ? `${service.title} | ${service.primaryKeyword}` 
      : service.title)
  
  // Generate optimized SEO description using primary and secondary keywords
  const seoDescription = service.metaDescription || 
    (service.primaryKeyword && service.previewDescription
      ? `${service.previewDescription} | ${service.primaryKeyword}`
      : service.previewDescription)
  
  // Combine all keywords for meta tags
  const allKeywords = [
    ...(service.primaryKeyword ? [service.primaryKeyword] : []),
    ...(service.secondaryKeywords || []),
    ...(service.keywords || [])
  ]
  
  // Prepare Open Graph content with absolute paths
  const ogTitle = service.openGraph?.title || seoTitle
  const ogDescription = service.openGraph?.description || seoDescription
  const ogImage = service.openGraph?.image 
    ? (service.openGraph.image.startsWith('http') ? service.openGraph.image : `${siteUrl}${service.openGraph.image}`)
    : serviceImage
  
  // Prepare Twitter content with absolute paths
  const twitterTitle = service.twitter?.title || ogTitle
  const twitterDescription = service.twitter?.description || ogDescription
  const twitterImage = service.twitter?.image 
    ? (service.twitter.image.startsWith('http') ? service.twitter.image : `${siteUrl}${service.twitter.image}`)
    : ogImage
  
  // Determine image dimensions and types for better social sharing
  const imageDimensions = {
    width: 1200,
    height: 630
  }
  
  const imageType = ogImage.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
  
  return (
    <div className={cn('service-seo', className)}>
      <PageMeta
        title={seoTitle}
        description={seoDescription}
        keywords={allKeywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        ogImage={ogImage}
        ogImageWidth={imageDimensions.width}
        ogImageHeight={imageDimensions.height}
        ogImageType={imageType}
        ogType="website"
        ogLocale="en_CA"
        ogSiteName="Vivi Aesthetics & Spa"
        twitterTitle={twitterTitle}
        twitterDescription={twitterDescription}
        twitterImage={twitterImage}
        twitterCard={service.twitter?.card || 'summary_large_image'}
        twitterSite="@vivispa.ca"
        twitterCreator="@vivispa.ca"
        geo={{
          region: 'CA-AB',
          placename: 'Calgary'
        }}
      />
      
      <ServiceStructuredData service={service} />
    </div>
  )
} 