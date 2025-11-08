'use client';

import React, { createContext, useContext, useState } from 'react';

interface SkeletonContextType {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  sectionLoading: Record<string, boolean>;
  setSectionLoading: (section: string, loading: boolean) => void;
  showSkeletonForDuration: (section: string, duration: number) => void;
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(undefined);

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [sectionLoading, setSectionLoadingState] = useState<Record<string, boolean>>({});

  const setSectionLoading = (section: string, loading: boolean) => {
    setSectionLoadingState(prev => ({ ...prev, [section]: loading }));
  };

  const showSkeletonForDuration = (section: string, duration: number) => {
    setSectionLoading(section, true);
    setTimeout(() => {
      setSectionLoading(section, false);
    }, duration);
  };

  return (
    <SkeletonContext.Provider 
      value={{ 
        globalLoading, 
        setGlobalLoading, 
        sectionLoading, 
        setSectionLoading, 
        showSkeletonForDuration 
      }}
    >
      {children}
    </SkeletonContext.Provider>
  );
}

export function useSkeleton() {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('useSkeleton must be used within a SkeletonProvider');
  }
  return context;
}

/**
 * Hook to control skeleton loading for a specific section
 */
export function useSectionSkeleton(sectionName: string) {
  const { sectionLoading, setSectionLoading, showSkeletonForDuration } = useSkeleton();
  
  const isLoading = sectionLoading[sectionName] || false;
  const setLoading = (loading: boolean) => setSectionLoading(sectionName, loading);
  const showForDuration = (duration: number) => showSkeletonForDuration(sectionName, duration);

  return { isLoading, setLoading, showForDuration };
}

/**
 * Hook to simulate loading for development/testing
 */
export function useSkeletonDemo(sectionName: string, enabled = false) {
  const { setSectionLoading } = useSkeleton();
  
  React.useEffect(() => {
    if (enabled) {
      setSectionLoading(sectionName, true);
      const timer = setTimeout(() => {
        setSectionLoading(sectionName, false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [enabled, sectionName, setSectionLoading]);
}
