'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { BackToTopButton } from '@/components/back-to-top-button';
import { cn } from '@/lib/utils';

// Dynamic import WhatsApp chat with delayed loading
const WhatsAppChat = dynamic(
  () => import('@/components/whatsapp-chat').then(mod => ({
    default: mod.WhatsAppChat
  })),
  {
    ssr: false, // Client-side only for chat functionality
  }
);

export function FloatingActionButtons() {
    const [isBackToTopVisible, setIsBackToTopVisible] = React.useState(false);
    const [shouldLoadChat, setShouldLoadChat] = React.useState(false);

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
        const timer = setTimeout(() => setShouldLoadChat(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-4 left-4 right-4 flex items-end justify-between z-[700]">
            {/* Back to top button on the left */}
            <div className={cn(
                isBackToTopVisible
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
            )}>
                <BackToTopButton onVisibilityChange={setIsBackToTopVisible} />
            </div>
            
            {/* Chat and call buttons on the right */}
            <div className="flex items-center gap-2">
                {shouldLoadChat && <WhatsAppChat />}
            </div>
        </div>
    );
} 