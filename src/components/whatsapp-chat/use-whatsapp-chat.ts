import * as React from 'react';
// import { useMobile } from '@/hooks/ui/use-mobile'; // Commented out as this hook may not exist
// Fallback mobile detection
const useMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};
import { createMessage } from './whatsapp-utils';
import type { Message } from './whatsapp.types';

const QUICK_MESSAGES = [
  { id: '1', text: 'I want to book a consultation' },
  { id: '2', text: 'What beauty treatments do you offer?' },
  { id: '3', text: 'What are your business hours?' },
  { id: '4', text: 'How much do your services cost?' },
  { id: '5', text: 'Do you offer facial treatments?' },
  { id: '6', text: 'What laser treatments are available?' },
];

export function useWhatsAppChat() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible] = React.useState(true);
  const scrollPositionRef = React.useRef<number>(0);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'welcome',
      text: 'Welcome to Vivi Aesthetics & Spa! How can we help you today? We offer premium beauty and wellness treatments. You can select a quick message below or type your own.',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [isTyping] = React.useState(false);
  const [isOnline] = React.useState(true);
  const [lastUserMessage, setLastUserMessage] = React.useState('');

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isMobile && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, isTyping, isMobile]);

  // Handle scroll restoration when drawer closes
  React.useEffect(() => {
    if (!isOpen && scrollPositionRef.current !== 0) {
      const storedPosition = scrollPositionRef.current;
      // Multiple restoration attempts to ensure it works
      const restore = () => {
        window.scrollTo({ top: storedPosition, behavior: 'instant' });
      };
      
      restore();
      setTimeout(restore, 50);
      setTimeout(restore, 150);
      setTimeout(restore, 300);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = createMessage(text, 'user');
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setHasInteracted(true);
    setLastUserMessage(text);
  };

  const handleQuickMessage = (text: string) => {
    handleSendMessage(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOpen = () => {
    // Store current scroll position before opening
    if (typeof window !== 'undefined') {
      scrollPositionRef.current = window.scrollY;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Restore scroll position after drawer closes
    if (typeof window !== 'undefined') {
      const storedPosition = scrollPositionRef.current;
      // Use multiple approaches to prevent scroll
      window.setTimeout(() => {
        window.scrollTo({ top: storedPosition, behavior: 'instant' });
      }, 0);
      // Additional fallback
      window.setTimeout(() => {
        window.scrollTo({ top: storedPosition, behavior: 'instant' });
      }, 100);
    }
  };

  return {
    isOpen,
    isVisible,
    messages,
    inputValue,
    hasInteracted,
    isTyping,
    isOnline,
    lastUserMessage,
    messagesEndRef,
    QUICK_MESSAGES,
    handleSendMessage: () => handleSendMessage(inputValue),
    handleQuickMessage,
    handleInputChange,
    handleOpen,
    handleClose,
  };
} 