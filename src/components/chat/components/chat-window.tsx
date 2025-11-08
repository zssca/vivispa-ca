'use client';

import * as React from 'react';
// ScrollArea replacement with simple div
const ScrollArea = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`${className} overflow-y-auto`}>{children}</div>
);
import { ChatHeader } from './chat-header';
import { MessageBubble } from './message-bubble';
import { QuickMessages } from './quick-messages';
import { ChatInput } from './chat-input';
import { TypingIndicator } from './typing-indicator';
import { ContinueButton } from '../../continue-button';
import { handleWhatsAppRedirect } from '../../whatsapp-chat/whatsapp-utils';
import type { Message } from '../../whatsapp-chat/whatsapp.types';

interface ChatWindowProps {
  messages: Message[];
  isOnline: boolean;
  isTyping: boolean;
  inputValue: string;
  hasInteracted: boolean;
  lastUserMessage: string;
  onSendMessage: () => void;
  onQuickMessage: (message: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatWindow({
  messages,
  isOnline,
  isTyping,
  inputValue,
  hasInteracted,
  lastUserMessage,
  onSendMessage,
  onQuickMessage,
  onInputChange,
  onClose,
  messagesEndRef,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader isOnline={isOnline} onClose={onClose} lastUserMessage={lastUserMessage} />
      <ScrollArea className="flex-grow px-3 py-2 md:p-4">
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="border-t">
        {hasInteracted ? (
          <ContinueButton onClick={() => handleWhatsAppRedirect(lastUserMessage)} />
        ) : (
          <QuickMessages onSendMessage={onQuickMessage} />
        )}
        <ChatInput
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
} 