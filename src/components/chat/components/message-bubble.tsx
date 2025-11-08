import * as React from 'react';
import { cn } from '@/lib/utils';
import { ReadReceipt } from './read-receipt';
import { formatTime } from '../../whatsapp-chat/whatsapp-utils';
import type { Message } from '../../whatsapp-chat/whatsapp.types';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex w-full mb-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] px-3 py-2 relative transition-colors duration-200 ease-out break-words',
          isUser
            ? 'ml-4 rounded-lg rounded-br-md bg-primary text-primary-foreground'
            : 'mr-4 rounded-lg rounded-bl-md bg-muted/60 text-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap leading-[1.4] m-0 break-words">
          {message.text}
        </p>

        <div className="flex items-center justify-end gap-1 mt-1">
          <span
            className={cn(
              'text-xs font-normal opacity-70 flex-shrink-0',
              isUser ? 'text-primary-foreground/70' : 'text-foreground/70'
            )}
          >
            {formatTime(message.timestamp)}
          </span>
          {isUser && <ReadReceipt />}
        </div>
      </div>
    </div>
  );
} 