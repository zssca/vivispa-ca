'use client';

import * as React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle 
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { ChatWindow } from '../chat';
import { WhatsAppIcon } from '../icons/whatsapp-icon';
import { handlePhoneCall } from './whatsapp-utils';
import { useWhatsAppChat } from './use-whatsapp-chat';

interface FloatingActionButtonProps {
  onClick?: () => void;
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
}

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ onClick, isVisible, children, className, 'aria-label': ariaLabel }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={cn(
        'h-12 w-12 rounded-full text-white border-0 p-0',
        isVisible 
          ? 'opacity-100' 
          : 'opacity-0 pointer-events-none',
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
});
FloatingActionButton.displayName = 'FloatingActionButton';


export function WhatsAppChat() {
  const {
    isOpen,
    isVisible,
    messages,
    inputValue,
    hasInteracted,
    isTyping,
    isOnline,
    lastUserMessage,
    messagesEndRef,
    handleSendMessage,
    handleQuickMessage,
    handleInputChange,
    handleOpen,
    handleClose,
  } = useWhatsAppChat();

  const ChatContent = (
    <ChatWindow
      messages={messages}
      isOnline={isOnline}
      isTyping={isTyping}
      inputValue={inputValue}
      hasInteracted={hasInteracted}
      lastUserMessage={lastUserMessage}
      onSendMessage={handleSendMessage}
      onQuickMessage={handleQuickMessage}
      onInputChange={handleInputChange}
      onClose={handleClose}
      messagesEndRef={messagesEndRef}
    />
  );

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Call Button */}
      <FloatingActionButton
        onClick={handlePhoneCall}
        isVisible={isVisible}
        aria-label="Call us"
        className="bg-blue-500 hover:bg-blue-600 shadow-lg"
      >
        <Phone size={20} />
      </FloatingActionButton>
      
      {/* WhatsApp Chat Button */}
      <Drawer 
        open={isOpen} 
        onOpenChange={(open) => !open && handleClose()}
        preventScrollRestoration={true}
      >
        <DrawerTrigger asChild>
          <FloatingActionButton
            onClick={handleOpen}
            isVisible={isVisible}
            aria-label="Open chat"
            className="bg-green-500 hover:bg-green-600 shadow-lg"
          >
            <WhatsAppIcon size={20} />
          </FloatingActionButton>
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh] px-0 pb-0">
          <DrawerHeader className="px-0 pb-0">
            <DrawerTitle className="sr-only">WhatsApp Chat</DrawerTitle>
          </DrawerHeader>
          <div className="h-[75vh] max-h-[600px]">
            {ChatContent}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}