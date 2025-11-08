#!/usr/bin/env node

/**
 * Test script to verify Square configuration
 * Run with: node scripts/test-square-config.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testSquareConfiguration() {
  console.log('🔍 Testing Square Configuration...\n');
  
  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connectivity...');
    try {
      const response = await makeRequest(`${BASE_URL}/api/checkout`);
      console.log('✅ Server is running');
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error) {
      console.log('❌ Server is not running or not accessible');
      console.log(`   Error: ${error.message}\n`);
      return;
    }
    
    // Test 2: Check Square configuration
    console.log('2. Testing Square configuration...');
    try {
      const response = await makeRequest(`${BASE_URL}/api/square-config`);
      if (response.status === 200) {
        const config = response.data.configuration;
        console.log('✅ Square configuration endpoint is accessible');
        console.log(`   Access Token: ${config.hasAccessToken ? '✅ Configured' : '❌ Missing'}`);
        console.log(`   Application ID: ${config.hasApplicationId ? '✅ Configured' : '❌ Missing'}`);
        console.log(`   Location IDs: ${config.hasLocationIds ? '✅ Configured' : '❌ Missing'}`);
        console.log(`   Environment: ${config.environment}`);
        console.log(`   Overall Status: ${config.isConfigured ? '✅ Configured' : '❌ Incomplete'}\n`);
        
        if (!config.isConfigured) {
          console.log('⚠️  Square is not fully configured. Please check your environment variables.');
          console.log('   See SQUARE_SETUP.md for setup instructions.\n');
        }
      } else {
        console.log('❌ Square configuration endpoint returned error');
        console.log(`   Status: ${response.status}\n`);
      }
    } catch (error) {
      console.log('❌ Square configuration endpoint is not accessible');
      console.log(`   Error: ${error.message}\n`);
    }
    
    // Test 3: Check environment variables (if running locally)
    if (BASE_URL.includes('localhost')) {
      console.log('3. Checking environment variables...');
      console.log('   Note: This test only works when running the script from the project directory');
      
      try {
        require('dotenv').config({ path: '.env.local' });
        const env = process.env;
        
        const requiredVars = [
          'SQUARE_ACCESS_TOKEN',
          'SQUARE_APPLICATION_ID',
          'SQUARE_LOCATION_ID_DOWNTOWN',
          'NEXT_PUBLIC_SQUARE_APPLICATION_ID',
          'NEXT_PUBLIC_SQUARE_LOCATION_ID_DOWNTOWN'
        ];
        
        let allConfigured = true;
        requiredVars.forEach(varName => {
          const value = env[varName];
          const isConfigured = value && !value.includes('your_') && !value.includes('placeholder');
          console.log(`   ${varName}: ${isConfigured ? '✅ Set' : '❌ Missing or placeholder'}`);
          if (!isConfigured) allConfigured = false;
        });
        
        if (allConfigured) {
          console.log('\n✅ All required environment variables are configured');
        } else {
          console.log('\n⚠️  Some environment variables are missing or have placeholder values');
          console.log('   Please check your .env.local file and update with actual values');
        }
      } catch (error) {
        console.log('❌ Could not check environment variables');
        console.log(`   Error: ${error.message}`);
      }
    }
    
    console.log('\n📋 Summary:');
    console.log('   - If all tests pass, your Square integration should work correctly');
    console.log('   - If any tests fail, please check the setup instructions in SQUARE_SETUP.md');
    console.log('   - For production, ensure HTTPS is enabled and all credentials are production-ready');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSquareConfiguration().catch(console.error); 