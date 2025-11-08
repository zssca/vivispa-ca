/**
 * Main script to run all service SEO optimization tasks in sequence
 * 
 * This script orchestrates the SEO optimization process for service pages:
 * 1. Updates service data files with primary and secondary keywords
 * 2. Generates and updates meta titles and descriptions
 */

import { updateServiceKeywords } from './update-service-keywords.js'
import { updateServiceMetaData } from './generate-service-meta.js'

async function optimizeServiceSEO() {
  console.log('=== Starting Service SEO Optimization ===\n')
  
  // Step 1: Update service data files with keywords
  console.log('Step 1: Updating service files with keywords...')
  await updateServiceKeywords()
  console.log('\n')
  
  // Step 2: Generate and update meta titles and descriptions
  console.log('Step 2: Updating service meta titles and descriptions...')
  await updateServiceMetaData()
  console.log('\n')
  
  console.log('=== Service SEO Optimization Complete ===')
  console.log('Remember to rebuild your project to apply these changes!')
}

// Run the script when executed directly
if (require.main === module) {
  optimizeServiceSEO().catch(error => {
    console.error('Error during SEO optimization:', error)
    process.exit(1)
  })
}

export { optimizeServiceSEO } 