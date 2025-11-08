'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { BackToTopButton } from './back-to-top-button';
import { CallButton } from './call-button';
import { cn } from "@/lib/utils";

// Dynamic import WhatsApp chat with delayed loading
const WhatsAppChat = dynamic(
  () => import('./whatsapp-chat').then(mod => ({
    default: mod.WhatsAppChat
  })),
  {
    ssr: false, // Client-side only for chat functionality
  }
);

interface FloatingWidgetsProps {
  showWhatsApp?: boolean;
  showCall?: boolean;
  showBackToTop?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  phoneNumber?: string;
  delayChatLoading?: boolean;
}

export function FloatingWidgets({
  showWhatsApp = true,
  showCall = true,
  showBackToTop = true,
  position = 'bottom-right',
  className,
  phoneNumber,
  delayChatLoading = true
}: FloatingWidgetsProps) {
  const [isBackToTopVisible, setIsBackToTopVisible] = React.useState(false);
  const [shouldLoadChat, setShouldLoadChat] = React.useState(!delayChatLoading);

  const toggleVisibility = React.useCallback(() => {
    const shouldBeVisible = window.scrollY > 300;
    if (shouldBeVisible !== isBackToTopVisible) {
      setIsBackToTopVisible(shouldBeVisible);
    }
  }, [isBackToTopVisible]);

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  // Delay chat loading for better initial performance
  React.useEffect(() => {
    if (delayChatLoading) {
      const timer = setTimeout(() => setShouldLoadChat(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [delayChatLoading]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  return (
    <>
      {/* Left side - Back to top button */}
      {showBackToTop && (
        <div className={cn(
          'fixed bottom-4 left-4 z-[700]',
          isBackToTopVisible
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        )}>
          <BackToTopButton onVisibilityChange={setIsBackToTopVisible} />
        </div>
      )}
      
      {/* Right side - Chat and call buttons */}
      <div className={cn(
        'fixed flex flex-col items-center gap-3 z-[700]',
        'bottom-4 right-4',
        className
      )}>
        {showWhatsApp && shouldLoadChat && <WhatsAppChat />}
      </div>
    </>
  );
} 