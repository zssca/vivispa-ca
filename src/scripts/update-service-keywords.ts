/**
 * Script to update service data files with SEO keywords
 * 
 * This script helps update the service data files with primary and secondary keywords
 * for SEO optimization. It reads from a configuration map and updates the service files accordingly.
 */

import fs from 'fs'
import path from 'path'

interface ServiceKeywords {
  primaryKeyword: string
  secondaryKeywords: string[]
}

// Configuration mapping service slugs to their keywords
const serviceKeywordsMap: Record<string, ServiceKeywords> = {
  'hydroderma-facial': {
  primaryKeyword: 'hydroderma facial in calgary',
  secondaryKeywords: ['hydroderma facial treatment calgary', 'best hydroderma facial in calgary']
},
  'laser-hair-removal': {
    primaryKeyword: 'laser hair removal in calgary',
    secondaryKeywords: ['best laser hair removal in calgary', 'laser hair removal near me in calgary']
  },
  'laser-pigmentation-removal': {
    primaryKeyword: 'laser pigmentation removal in calgary',
    secondaryKeywords: ['pigmentation treatment calgary', 'laser for dark spots in calgary']
  },
  'ipl-photofacial': {
    primaryKeyword: 'ipl photofacial in calgary',
    secondaryKeywords: ['photofacial treatment calgary', 'intense pulsed light therapy in calgary']
  },
  'microneedling': {
    primaryKeyword: 'microneedling in calgary',
    secondaryKeywords: ['skin needling calgary', 'collagen induction therapy in calgary']
  },
  'vascular-vein-removal': {
    primaryKeyword: 'vascular lesion removal in calgary',
    secondaryKeywords: ['spider vein removal calgary', 'vein removal in calgary']
  },
  'eyelash-extensions': {
    primaryKeyword: 'eyelash extensions in calgary',
    secondaryKeywords: ['best eyelash extensions in calgary', 'natural looking eyelash extensions in calgary']
  },
  'laser-skin-tightening': {
    primaryKeyword: 'laser skin tightening in calgary',
    secondaryKeywords: ['skin tightening treatment calgary', 'non-surgical skin lifting in calgary']
  },
  'skin-tag-removal': {
    primaryKeyword: 'skin tag removal in calgary',
    secondaryKeywords: ['mole removal calgary', 'skin lesion removal in calgary']
  },
  'japanese-head-spa': {
    primaryKeyword: 'japanese head spa in calgary',
    secondaryKeywords: ['head spa calgary', 'scalp massage in calgary']
  }
}

// Function to update a service file with keywords
async function updateServiceFile(serviceDataPath: string, slug: string, keywords: ServiceKeywords) {
  try {
    const filePath = path.join(serviceDataPath, `${slug}.ts`)
    
    if (!fs.existsSync(filePath)) {
      console.error(`Service file for ${slug} does not exist at ${filePath}`)
      return false
    }
    
    // Read the file content
    let fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Check if file already has the primaryKeyword and secondaryKeywords
    const hasPrimaryKeyword = fileContent.includes('primaryKeyword:')
    const hasSecondaryKeywords = fileContent.includes('secondaryKeywords:')
    
    if (hasPrimaryKeyword && hasSecondaryKeywords) {
      // Update existing keywords
      fileContent = fileContent
        .replace(/primaryKeyword:\s*['"].*?['"]/g, `primaryKeyword: '${keywords.primaryKeyword}'`)
        .replace(/secondaryKeywords:\s*\[.*?\]/g, `secondaryKeywords: ['${keywords.secondaryKeywords.join("', '")}']`)
    } else {
      // Add new keywords - need to find a good spot to insert before the closing }
      const insertIndex = fileContent.lastIndexOf('}')
      
      if (insertIndex === -1) {
        console.error(`Could not find a position to insert keywords in ${slug}.ts`)
        return false
      }
      
      const keywordData = `
  primaryKeyword: '${keywords.primaryKeyword}',
  secondaryKeywords: ['${keywords.secondaryKeywords.join("', '")}'],
`
      
      fileContent = fileContent.slice(0, insertIndex) + keywordData + fileContent.slice(insertIndex)
    }
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, fileContent, 'utf8')
    console.log(`Updated service keywords for ${slug}`)
    return true
  } catch (error) {
    console.error(`Error updating ${slug}.ts:`, error)
    return false
  }
}

// Main function to run the script
async function updateServiceKeywords() {
  const serviceDataPath = path.join(process.cwd(), 'src', 'data', 'services')
  
  console.log('Starting service keyword updates...')
  
  for (const [slug, keywords] of Object.entries(serviceKeywordsMap)) {
    await updateServiceFile(serviceDataPath, slug, keywords)
  }
  
  console.log('Finished updating service keywords')
}

// Run the script when executed directly
if (require.main === module) {
  updateServiceKeywords().catch(console.error)
}

export { updateServiceKeywords, serviceKeywordsMap } 