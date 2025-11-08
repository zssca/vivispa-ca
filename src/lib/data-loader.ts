import { cache } from 'react';

// Re-export all data access utilities for backward compatibility
export * from './utils/data-access';

// Simple cached functions for common data operations
export const getAllServices = cache(() => {
  const { getAllServices } = require('./utils/data-access');
  return getAllServices();
});

export const getServiceBySlug = cache((slug: string) => {
  const { getServiceBySlugUtil } = require('./utils/data-access');
  return getServiceBySlugUtil(slug);
});

export const getServiceById = cache((id: string) => {
  const { getService } = require('./utils/data-access');
  return getService(id);
});

// Legacy compatibility functions
export const getAllItems = cache(<T>(source: string): T[] => {
  switch (source) {
    case 'services':
      return getAllServices() as T[];
    default:
      console.warn(`Legacy data source '${source}' is deprecated. Use specific utility functions instead.`);
      return [];
  }
});

export const getItemById = cache(<T>(source: string, id: string): T | undefined => {
  switch (source) {
    case 'services':
      return getServiceById(id) as T;
    default:
      console.warn(`Legacy data source '${source}' is deprecated. Use specific utility functions instead.`);
      return undefined;
  }
});

export const getItemBySlug = cache(<T>(source: string, slug: string): T | undefined => {
  switch (source) {
    case 'services':
      return getServiceBySlug(slug) as T;
    default:
      console.warn(`Legacy data source '${source}' is deprecated. Use specific utility functions instead.`);
      return undefined;
  }
});