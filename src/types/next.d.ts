import { ReactNode } from 'react';

declare module 'next' {
  // Extend the PageProps interface to be more flexible
  export interface PageProps<P extends Record<string, unknown> = Record<string, unknown>> {
    params: P;
    searchParams?: Record<string, string | string[] | undefined>;
    children?: ReactNode;
  }
} 