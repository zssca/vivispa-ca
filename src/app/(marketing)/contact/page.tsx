import { Metadata } from 'next';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { MapPin, ExternalLink } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: 'Contact Us | Vivi Aesthetics & Spa',
  description: 'Contact Vivi Aesthetics & Spa in Calgary. Visit us at our Downtown or Edmonton Trail locations.',
};

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <div className="text-center space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          We&apos;d love to hear from you! Visit one of our locations or contact us using the information below.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden border border-border/40">
            
            <CardHeader className="bg-muted/30">
              <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary">{location.name} Location</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-6">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="w-24 bg-muted/20 font-medium">Address</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{location.address}</p>
                          <p className="text-sm">{location.city}, {location.province} {location.postalCode}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="w-24 bg-muted/20 font-medium">Phone</TableCell>
                      <TableCell>
                        <Link 
                          href={`tel:${location.phone}`} 
                          className="text-sm hover:text-primary transition-colors"
                        >
                          {location.phone}
                        </Link>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="w-24 bg-muted/20 font-medium align-top">Hours</TableCell>
                      <TableCell>
                        <div className="grid grid-cols-1 gap-1">
                          {location.hours.map((hour) => (
                            <div key={hour.day} className="flex text-sm">
                              <span className="font-medium w-24">{hour.day}</span>
                              <span>{hour.hours}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {location.embedMapUrl && (
                <div className="w-full h-60 relative rounded-md overflow-hidden border border-border/40">
                  <iframe
                    src={location.embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location.name} location map`}
                    className="absolute inset-0"
                  ></iframe>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex gap-3 justify-between pt-2 pb-4 px-6">
              <Button variant="outline" className="flex-1 border-primary/30 hover:bg-primary/5 hover:text-primary" asChild>
                <Link 
                  href={location.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/booking?location=${location.id}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
} 