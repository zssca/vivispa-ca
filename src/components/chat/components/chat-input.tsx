'use client';

import * as React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export function ChatInput({
  inputValue,
  onInputChange,
  onSendMessage,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="flex items-center p-3 md:p-2 border-t bg-background safe-area-bottom">
      <Input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        className="flex-grow mr-2 border rounded-full px-4 h-10 md:h-9"
        aria-label="Chat input"
      />
      <Button
        type="button"
        size="icon"
        onClick={onSendMessage}
        className="rounded-full h-10 w-10 md:h-9 md:w-9 shrink-0"
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
} 