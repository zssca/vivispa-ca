'use client';

import * as React from 'react';
import { Phone, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// Simple avatar replacement using div and Next.js Image
const Avatar = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`${className} flex items-center justify-center rounded-full overflow-hidden bg-gray-100`}>
    {children}
  </div>
);
const AvatarImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="p-2 w-full h-full flex items-center justify-center">
    <Image src={src} alt={alt} width={24} height={24} className="object-cover" />
  </div>
);
const AvatarFallback = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`${className} flex items-center justify-center w-full h-full text-xs font-medium`}>
    {children}
  </div>
);
import { Button } from '@/components/ui/button';
import { handlePhoneCall, handleWhatsAppRedirect } from '../../whatsapp-chat/whatsapp-utils';

interface ChatHeaderProps {
  isOnline: boolean;
  onClose: () => void;
  lastUserMessage?: string;
}

export function ChatHeader({ isOnline, onClose, lastUserMessage }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
      {/* User Info Section */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar className="h-10 w-10 ring-2 ring-green-500/20 ring-offset-1">
          <AvatarImage src="/assets/logos/logo.svg" alt="Vivi Aesthetics & Spa" />
        </Avatar>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            Vivi Aesthetics & Spa
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div 
              className={`w-2 h-2 rounded-full ${
                isOnline 
                  ? 'bg-green-500 shadow-sm shadow-green-500/50' 
                  : 'bg-gray-400'
              }`}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-muted-foreground">
              {isOnline ? 'Online' : 'Away'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 ml-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handlePhoneCall} 
          aria-label="Call Vivi Aesthetics & Spa"
          className="h-9 w-9 hover:bg-green-50 hover:text-green-700 transition-colors"
        >
          <Phone className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleWhatsAppRedirect(lastUserMessage)}
          aria-label="Continue in WhatsApp"
          className="h-9 w-9 hover:bg-green-50 hover:text-green-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }} 
          aria-label="Close chat"
          className="h-9 w-9 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
} 