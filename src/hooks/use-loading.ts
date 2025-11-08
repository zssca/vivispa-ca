import { useState, useEffect } from 'react';

/**
 * Hook for managing loading states with optional delays and minimum loading time
 */
export function useLoading(
  initialLoading = false,
  minLoadingTime = 500
) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  };

  const stopLoading = async () => {
    if (loadingStartTime && minLoadingTime > 0) {
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = minLoadingTime - elapsedTime;
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
    }
    
    setIsLoading(false);
    setLoadingStartTime(null);
  };

  return { isLoading, startLoading, stopLoading };
}

/**
 * Hook for managing async operations with loading states
 */
export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await operation();
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, isLoading, execute, retry: execute };
}

/**
 * Hook for simulating loading states in development
 */
export function useSimulatedLoading(
  actualData: any,
  delay = 1000,
  enabled = process.env.NODE_ENV === 'development'
) {
  const [isLoading, setIsLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, delay]);

  return { isLoading: enabled ? isLoading : false, data: actualData };
}

/**
 * Hook for managing multiple loading states
 */
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  };

  const isAnyLoading = Object.values(loadingStates).some(Boolean);
  const isLoading = (key: string) => loadingStates[key] ?? false;

  return { 
    loadingStates, 
    setLoading, 
    isAnyLoading, 
    isLoading 
  };
}

/**
 * Hook for progressive loading with skeleton phases
 */
export function useProgressiveLoading<T>(
  phases: Array<{
    name: string;
    duration: number;
    loader: () => Promise<T>;
  }>
) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const executePhases = async () => {
      try {
        for (let i = 0; i < phases.length; i++) {
          if (cancelled) return;
          
          const phase = phases[i];
          if (!phase) continue;
          
          setCurrentPhase(i);
          
          // Wait for minimum phase duration
          const startTime = Date.now();
          const result = await phase.loader();
          const elapsed = Date.now() - startTime;
          const remaining = phase.duration - elapsed;
          
          if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
          }
          
          if (!cancelled && i === phases.length - 1) {
            setData(result);
          }
        }
        
        if (!cancelled) {
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Loading failed'));
          setIsLoading(false);
        }
      }
    };

    executePhases();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    currentPhase,
    phaseName: phases[currentPhase]?.name || 'Loading',
    data,
    error,
    totalPhases: phases.length
  };
}
