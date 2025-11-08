'use client';

import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/ui/faq-section";
import { Section } from "@/components/ui/section";
import { getBookingFaqs } from "@/data/faqs";
import { ServiceCategory, ServiceItem, LocationServices } from '@/types/data';
import { useSquareServices } from '@/hooks/use-square-services';
import React, { useState } from 'react';
import { BookingTableSkeleton } from '@/components/ui/skeletons';

export default function BookingPage() {
  // Get booking-specific FAQs
  const bookingFaqs = getBookingFaqs();
  const [activeTab, setActiveTab] = useState<'downtown' | 'edmonton-trail'>('downtown');
  
  return (
    <>
      <Section spacing="md">
        <div className="space-y-6 md:space-y-8">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Book an Appointment</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Choose your preferred location and service to book your appointment.
            </p>
          </div>

          <Tabs defaultValue="downtown" className="w-full" onValueChange={(value) => setActiveTab(value as 'downtown' | 'edmonton-trail')}>
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-md p-1">
              <TabsTrigger value="downtown">
                Downtown Location
              </TabsTrigger>
              <TabsTrigger value="edmonton-trail">
                Edmonton Trail Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="downtown" className="mt-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <LocationServicesWithData location="downtown" />
            </TabsContent>
            
            <TabsContent value="edmonton-trail" className="mt-6 animate-in fade-in-50 slide-in-from-bottom-5">
              <LocationServicesWithData location="edmonton-trail" />
            </TabsContent>
          </Tabs>
        </div>
      </Section>
      
      {/* Booking FAQs Section */}
      {bookingFaqs.length > 0 && (
        <Section 
          backgroundClass="bg-muted/30" 
          spacing="md"
        >
          <FAQSection 
            faqs={bookingFaqs} 
            title="Booking FAQs"
            description="Find answers to commonly asked questions about our booking process, policies, and what to expect."
          />
        </Section>
      )}
    </>
  );
}

interface LocationServicesListProps {
  locationData: {
    location: string;
    categories: ServiceCategory[];
  };
}

function LocationServicesList({ locationData }: LocationServicesListProps) {
  const { categories } = locationData;
  
  // Reorder categories to put special offers first if they exist
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "(Limited-Time Offers)") return -1;
    if (b.name === "(Limited-Time Offers)") return 1;
    return 0;
  });
  
  return (
    <div className="space-y-6">
      <h2 className="scroll-m-20 text-2xl font-bold tracking-tight text-primary md:text-3xl">{locationData.location} Services</h2>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {sortedCategories.map((category, index) => (
          <AccordionItem 
            key={`${category.name}-${index}`} 
            value={`category-${index}`}
            className="border border-border rounded-md overflow-hidden"
          >
            <AccordionTrigger 
              className="text-base md:text-lg font-medium transition-all hover:bg-muted/10 data-[state=open]:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              {category.name === "(Limited-Time Offers)" ? "Limited Time Offers" : category.name}
            </AccordionTrigger>
            <AccordionContent hasNestedContent>
              {category.name === "(Limited-Time Offers)" ? (
                <SpecialOffersTable services={category.services} />
              ) : (
                <ServicesTable services={category.services} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface ServicesTableProps {
  services: ServiceItem[];
}

function ServicesTable({ services }: ServicesTableProps) {
  const hasSubcategories = services.some(s => s.subcategory);
  
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
            <TableHead className="font-sans w-[35%] md:w-[40%] pl-5 pr-2 py-4 font-semibold text-foreground">Service</TableHead>
            {hasSubcategories && (
              <TableHead className="font-sans w-[15%] px-2 py-4 font-semibold text-foreground">Type</TableHead>
            )}
            <TableHead className={`font-sans text-right ${hasSubcategories ? 'w-[15%] md:w-[15%]' : 'w-[20%] md:w-[20%]'} px-2 py-4 font-semibold text-foreground`}>Price</TableHead>
            <TableHead className="font-sans text-right w-[20%] md:w-[20%] px-2 py-4 font-semibold text-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service, index) => (
            <TableRow key={index} className="hover:bg-muted/10">
              <TableCell className="font-sans pl-5 pr-2 py-4 font-medium text-foreground">
                {service.name}
              </TableCell>
              {hasSubcategories && (
                <TableCell className="font-sans px-2 py-4 text-sm text-foreground">
                  {service.subcategory}
                </TableCell>
              )}
              <TableCell className="font-sans text-right px-2 py-4 font-medium text-foreground">
                {service.price}
              </TableCell>
              <TableCell className="font-sans text-right px-2 py-4">
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link href={service.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <span>Book Now</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SpecialOffersTable({ services }: ServicesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
            <TableHead className="font-sans w-[45%] pl-5 pr-2 py-4 font-semibold text-foreground">Service</TableHead>
            <TableHead className="font-sans text-right w-[20%] px-2 py-4 font-semibold text-foreground">Price</TableHead>
            <TableHead className="font-sans text-right w-[20%] px-2 py-4 font-semibold text-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service, index) => (
            <TableRow key={index} className="hover:bg-muted/10">
              <TableCell className="font-sans pl-5 pr-2 py-4 font-medium text-foreground">
                {service.name}
              </TableCell>
              <TableCell className="font-sans text-right px-2 py-4 font-medium text-foreground">
                <div className="flex flex-col items-end">
                  <span className="font-sans font-medium">{service.price}</span>
                  {service.oldPrice && (
                    <span className="font-sans text-sm line-through text-muted-foreground">{service.oldPrice}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-sans text-right px-2 py-4">
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link href={service.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <CalendarPlus className="h-4 w-4" />
                    <span>Book Now</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function LocationServicesWithData({ location }: { location: 'downtown' | 'edmonton-trail' }) {
  const { data, loading, error } = useSquareServices(location);

  if (loading) {
    return <LocationServicesListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading services: {error}</p>
        <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No services available.</p>
      </div>
    );
  }

  return <LocationServicesList locationData={data} />;
}

function LocationServicesListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <BookingTableSkeleton key={i} />
      ))}
    </div>
  );
}

