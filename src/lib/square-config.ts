// Square Configuration Helper
// This file manages Square API configuration and provides fallbacks

import { SquareConfig } from '@/types/square';

// Get Square configuration with fallbacks
export function getSquareConfig(): SquareConfig {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN || process.env.ACCESS_TOKEN;
  const environment = (process.env.SQUARE_ENVIRONMENT || process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT) === 'production' ? 'production' : 'sandbox';
  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || 'your_square_application_id_here';
  
  const locationIds = {
    downtown: process.env.SQUARE_LOCATION_ID_DOWNTOWN || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DOWNTOWN || 'your_downtown_location_id_here',
    edmontonTrail: process.env.SQUARE_LOCATION_ID_EDMONTON_TRAIL || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_EDMONTON_TRAIL || 'your_edmonton_trail_location_id_here',
  };

  const merchantId = process.env.SQUARE_MERCHANT_ID;

  if (!accessToken) {
    throw new Error('Square access token is required. Please configure SQUARE_ACCESS_TOKEN environment variable.');
  }

  return {
    accessToken,
    environment,
    applicationId,
    locationIds,
    merchantId,
  };
}

// Check if Square is properly configured
export function isSquareConfigured(): boolean {
  try {
    const config = getSquareConfig();
    return !!(config.accessToken && config.applicationId && config.locationIds.downtown);
  } catch {
    return false;
  }
}

// Get configuration status for debugging
export function getConfigurationStatus() {
  const config = getSquareConfig();
  return {
    hasAccessToken: !!config.accessToken,
    hasApplicationId: !!config.applicationId,
    hasLocationIds: !!(config.locationIds.downtown && config.locationIds.edmontonTrail),
    environment: config.environment,
    isConfigured: isSquareConfigured(),
  };
} 