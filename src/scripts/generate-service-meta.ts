/**
 * Script to generate optimized meta titles and descriptions for service pages
 * 
 * This script creates SEO-friendly meta titles and descriptions using the primary 
 * and secondary keywords for each service page.
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { serviceKeywordsMap } from './update-service-keywords.js'

interface ServiceMeta {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
}

// Generate SEO-optimized meta titles and descriptions
function generateServiceMetas(): ServiceMeta[] {
  const results: ServiceMeta[] = []
  
  // Map service slugs to default title formats
  const serviceTitles: Record<string, string> = {
    'hydroderma-facial': 'Hydroderma Facial Treatment',
    'laser-hair-removal': 'Laser Hair Removal',
    'laser-pigmentation-removal': 'Laser Pigmentation Removal',
    'ipl-photofacial': 'IPL Photofacial',
    'microneedling': 'Microneedling',
    'vascular-vein-removal': 'Vascular Lesion Removal',
    'eyelash-extensions': 'Eyelash Extensions',
    'laser-skin-tightening': 'Laser Skin Tightening',
    'skin-tag-removal': 'Skin Tag Removal',
    'japanese-head-spa': 'Japanese Head Spa'
  }
  
  for (const [slug, keywords] of Object.entries(serviceKeywordsMap)) {
    const { primaryKeyword, secondaryKeywords } = keywords
    const baseTitle = serviceTitles[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    
    // Create SEO optimized title
    // Format: Primary Service - Primary Keyword | Vivi Aesthetics & Spa
    const metaTitle = `${baseTitle} - ${primaryKeyword} | Vivi Aesthetics & Spa`
    
    // Create SEO optimized description
    // Format: Get professional [service] at Vivi Aesthetics & Spa. [Primary keyword] with [benefits/features using secondary keywords].
    const secondaryTerms = secondaryKeywords.slice(0, 2).join(' and ')
    const metaDescription = `Get professional ${baseTitle} at Vivi Aesthetics & Spa. ${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} with expert technicians and advanced technology. We offer ${secondaryTerms} for optimal results.`
    
    results.push({
      slug,
      title: baseTitle,
      metaTitle,
      metaDescription
    })
  }
  
  return results
}

// Print the generated meta data in a readable format
function printServiceMetas(serviceMetas: ServiceMeta[]) {
  console.log('=== Generated Service Meta Data ===\n')
  
  serviceMetas.forEach(meta => {
    console.log(`Service: ${meta.title} (${meta.slug})`)
    console.log(`Meta Title: ${meta.metaTitle} (${meta.metaTitle.length} chars)`)
    console.log(`Meta Description: ${meta.metaDescription} (${meta.metaDescription.length} chars)`)
    console.log('---')
  })
}

// Export function to update service files with generated meta titles and descriptions
async function updateServiceMetaData() {
  const serviceMetas = generateServiceMetas()
  const serviceDataPath = path.join(process.cwd(), 'src', 'data', 'services')
  
  console.log('Starting service meta data updates...')
  
  for (const meta of serviceMetas) {
    try {
      const filePath = path.join(serviceDataPath, `${meta.slug}.ts`)
      
      if (!fs.existsSync(filePath)) {
        console.error(`Service file for ${meta.slug} does not exist at ${filePath}`)
        continue
      }
      
      // Read the file content
      let fileContent = fs.readFileSync(filePath, 'utf8')
      
      // Update meta title and description
      if (fileContent.includes('metaTitle:')) {
        fileContent = fileContent.replace(/metaTitle:\s*['"].*?['"]/g, `metaTitle: '${meta.metaTitle}'`)
      } else {
        // Add metaTitle before the closing }
        const insertIndex = fileContent.lastIndexOf('}')
        fileContent = fileContent.slice(0, insertIndex) + `  metaTitle: '${meta.metaTitle}',\n` + fileContent.slice(insertIndex)
      }
      
      if (fileContent.includes('metaDescription:')) {
        fileContent = fileContent.replace(/metaDescription:\s*['"].*?['"]/g, `metaDescription: '${meta.metaDescription}'`)
      } else {
        // Add metaDescription before the closing }
        const insertIndex = fileContent.lastIndexOf('}')
        fileContent = fileContent.slice(0, insertIndex) + `  metaDescription: '${meta.metaDescription}',\n` + fileContent.slice(insertIndex)
      }
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, fileContent, 'utf8')
      console.log(`Updated meta data for ${meta.slug}`)
    } catch (error) {
      console.error(`Error updating meta data for ${meta.slug}:`, error)
    }
  }
  
  console.log('Finished updating service meta data')
}

// Run the script when executed directly
if (require.main === module) {
  const serviceMetas = generateServiceMetas()
  printServiceMetas(serviceMetas)
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  rl.question('\nDo you want to update service files with these meta tags? (y/n) ', (answer: string) => {
    if (answer.toLowerCase() === 'y') {
      updateServiceMetaData().catch(console.error)
    } else {
      console.log('Operation cancelled')
    }
    rl.close()
  })
}

export { generateServiceMetas, updateServiceMetaData } 