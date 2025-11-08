import { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/data-loader';
import { Service } from '@/types/service';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all services
  const services = getAllItems<Service>('services');

  // Base URL for the site
  const baseUrl = 'https://vivispa.ca';

  // Service URLs
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...serviceUrls];
} 