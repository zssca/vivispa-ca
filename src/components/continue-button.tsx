'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

export function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-3 bg-muted/30">
      <Button
        onClick={onClick}
        variant="default"
        size="lg"
        className="w-full max-w-sm"
      >
        Continue on WhatsApp
      </Button>
    </div>
  );
} 