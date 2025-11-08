import * as React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full mb-2">
      <div className="max-w-[80%] px-3 py-2 bg-muted/60 text-foreground rounded-lg rounded-bl-md mr-4">
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 