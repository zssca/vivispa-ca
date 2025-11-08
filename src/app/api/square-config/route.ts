import { NextResponse } from 'next/server';
import { getConfigurationStatus } from '@/lib/square-config';

export async function GET() {
  try {
    const status = getConfigurationStatus();
    
    return NextResponse.json({
      success: true,
      configuration: status,
      message: status.isConfigured 
        ? 'Square is properly configured' 
        : 'Square configuration is incomplete',
    });
  } catch (error) {
    console.error('Error checking Square configuration:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check configuration',
      configuration: {
        hasAccessToken: false,
        hasApplicationId: false,
        hasLocationIds: false,
        environment: 'unknown',
        isConfigured: false,
      },
    }, { status: 500 });
  }
} 