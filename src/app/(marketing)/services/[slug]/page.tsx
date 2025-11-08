import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/ui/service-detail'
import { ServiceSeo } from '@/components/seo'
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services'

interface ServicePageParams {
  slug: string
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs
}

export async function generateMetadata(props: { 
  params: ServicePageParams 
}): Promise<Metadata> {
  // First await the params object entirely
  const params = await Promise.resolve(props.params)
  const slug = params.slug
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The service you are looking for does not exist.',
    }
  }
  
  // Prepare base URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivispa.ca'
  
  // Prepare canonical URL
  const canonical = service.canonicalUrl 
    ? (service.canonicalUrl.startsWith('http') ? service.canonicalUrl : `${siteUrl}${service.canonicalUrl}`)
    : `${siteUrl}/services/${service.slug}`
  
  // Prepare image URLs with absolute paths
  const serviceImage = service.image 
    ? (service.image.startsWith('http') ? service.image : `${siteUrl}${service.image}`)
    : `${siteUrl}/images/placeholder-service.jpg`
  
  // Generate optimized SEO title using primary keyword - limited to 60 characters
  const seoTitle = service.metaTitle || 
    (service.primaryKeyword 
      ? `${service.title} in Calgary | Vivi Aesthetics`
      : `${service.title} | Vivi Aesthetics & Spa Calgary`).slice(0, 60)
  
  // Generate optimized SEO description using primary and secondary keywords - limited to 155-160 characters
  let seoDescription = service.metaDescription
  
  if (!seoDescription) {
    // Create a description with primary and secondary keywords
    const keywords = [
      service.primaryKeyword,
      ...(service.secondaryKeywords || []).slice(0, 1) // Include just first secondary keyword
    ].filter(Boolean).join(' and ')
    
    seoDescription = keywords 
      ? `Professional ${service.title.toLowerCase()} treatments in Calgary. ${keywords}. Book your personalized session at Vivi Aesthetics & Spa today.`
      : `Experience premium ${service.title.toLowerCase()} treatments at Calgary's top-rated aesthetic spa. Book your appointment at Vivi Aesthetics & Spa.`
      
    // Ensure description is within 155-160 character limit
    seoDescription = seoDescription.slice(0, 160)
  }
  
  // Combine all keywords for meta tags
  const allKeywords = [
    ...(service.primaryKeyword ? [service.primaryKeyword] : []),
    ...(service.secondaryKeywords || []),
    ...(service.keywords || []),
    'Calgary', `${service.title} Calgary`, 'aesthetic spa', 'spa treatments'
  ]
  
  // Get OG image with absolute path
  const ogImage = service.openGraph?.image
    ? (service.openGraph.image.startsWith('http') ? service.openGraph.image : `${siteUrl}${service.openGraph.image}`)
    : serviceImage
  
  // Get Twitter image with absolute path
  const twitterImage = service.twitter?.image
    ? (service.twitter.image.startsWith('http') ? service.twitter.image : `${siteUrl}${service.twitter.image}`)
    : ogImage
  
  // Safely handle types for OpenGraph and Twitter cards
  const ogType = service.openGraph?.type || 'website'
  const twitterCard = service.twitter?.card || 'summary_large_image'
  
  // Enhanced og:image object with proper dimensions
  const ogImageObject = {
    url: ogImage,
    width: 1200,
    height: 630,
    alt: service.primaryKeyword 
      ? `${service.title} - ${service.primaryKeyword}` 
      : `${service.title} at Vivi Aesthetics & Spa Calgary`,
    type: ogImage.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
  }
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: service.openGraph?.title || seoTitle,
      description: service.openGraph?.description || seoDescription,
      images: [ogImageObject],
      url: canonical,
      type: ogType as 'website' | 'article' | 'book' | 'profile',
      locale: 'en_CA',
      siteName: 'Vivi Aesthetics & Spa',
    },
    twitter: {
      card: twitterCard as 'summary_large_image' | 'summary' | 'player' | 'app',
      title: service.twitter?.title || seoTitle,
      description: service.twitter?.description || seoDescription,
      images: [twitterImage],
      site: '@vivispa.ca',
      creator: '@vivispa.ca',
    },
    other: {
      'geo.region': 'CA-AB',
      'geo.placename': 'Calgary',
      'og:locale:alternate': 'en_US',
    }
  }
}

export default async function ServicePage(props: { 
  params: ServicePageParams
}) {
  // First await the params object entirely
  const params = await Promise.resolve(props.params)
  const slug = params.slug
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  return (
    <>
      <ServiceSeo service={service} />
      <ServiceDetail service={service} />
    </>
  )
}