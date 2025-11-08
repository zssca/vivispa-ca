import { useState, useEffect } from 'react';
import { LocationServices } from '@/types/data';

export function useSquareServices(location: 'downtown' | 'edmonton-trail') {
  const [data, setData] = useState<LocationServices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/services?location=${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [location]);

  return { data, loading, error };
}