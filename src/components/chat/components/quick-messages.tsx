'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const QUICK_MESSAGES = [
  { id: '1', text: 'I want to book a consultation' },
  { id: '2', text: 'What beauty treatments do you offer?' },
  { id: '3', text: 'What are your business hours?' },
  { id: '4', text: 'How much do your services cost?' },
  { id: '5', text: 'Do you offer facial treatments?' },
  { id: '6', text: 'What laser treatments are available?' },
];

interface QuickMessagesProps {
  onSendMessage: (message: string) => void;
}

export function QuickMessages({ onSendMessage }: QuickMessagesProps) {
  return (
    <div className="py-2 md:py-2">
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-1">
          {QUICK_MESSAGES.map((msg) => (
            <CarouselItem key={msg.id} className="basis-auto">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full font-normal text-xs md:text-sm whitespace-nowrap"
                onClick={() => onSendMessage(msg.text)}
              >
                {msg.text}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 