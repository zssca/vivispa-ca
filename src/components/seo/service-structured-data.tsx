import { Service } from '@/types/service'
import { generateServiceStructuredData } from '@/lib/structured-data'
import { cn } from '@/lib/utils'

interface ServiceStructuredDataProps {
  service: Service
  className?: string
}

/**
 * Component for rendering JSON-LD structured data for a service
 * Handles both light and dark mode contexts through metadata
 */
export function ServiceStructuredData({ service, className }: ServiceStructuredDataProps) {
  // Generate the structured data
  const structuredData = generateServiceStructuredData(service)
  
  // Early return if we don't have valid structured data
  if (!structuredData || Object.keys(structuredData).length === 0) {
    return null
  }
  
  return (
    <div className={cn('hidden', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </div>
  )
} 