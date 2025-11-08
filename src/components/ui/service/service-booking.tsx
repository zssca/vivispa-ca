"use client"

import Link from 'next/link'
import { Service } from '@/types/service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'

interface ServiceBookingProps {
  service: Service
}

export function ServiceBooking({ service }: ServiceBookingProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Book Your Treatment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Ready to experience {service.title}? Book your consultation today and let our specialists 
          create a personalized treatment plan for you.
        </p>
        
        <div className="space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/booking">
              Book Consultation
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/contact">
              Ask Questions
            </Link>
          </Button>
        </div>
        
        <div className="pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Call us at{' '}
            <a 
              href="tel:+14037087654" 
              className="font-medium text-primary hover:underline"
            >
              (403) 708-7654
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}