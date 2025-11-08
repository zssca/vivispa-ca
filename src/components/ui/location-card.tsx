import Image from 'next/image';
import { MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import { type Location } from '@/data/locations';
import { CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';

interface LocationCardProps {
  location: Location;
  showHours?: boolean;
  showMap?: boolean;
  showButtons?: boolean;
  index?: number;
}

export function LocationCard({
  location,
  showHours = true,
  showMap = false,
  showButtons = true,
  index = 0,
}: LocationCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative w-full">
        <AspectRatio ratio={16/9}>
          <Image
            src={location.imageUrl}
            alt={`${location.name} Location`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </AspectRatio>
      </div>
      
      <CardContent className="flex-grow p-4 sm:p-6">
        <h3 className="scroll-m-20 text-xl font-bold tracking-tight mb-4">{location.name} Location</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm leading-normal">{location.address}</p>
              <p className="text-sm leading-normal">{location.city}, {location.province} {location.postalCode}</p>
            </div>
          </div>
          
          {showHours && (
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                {location.hours.map((hour) => (
                  <p key={hour.day} className="text-sm leading-normal">
                    <span className="font-medium">{hour.day}:</span> {hour.hours}
                  </p>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
            <a 
              href={`tel:${location.phone}`} 
              className="text-sm hover:text-primary transition-colors"
              rel="noopener"
            >
              {location.phone}
            </a>
          </div>
          
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
            <a 
              href={`mailto:${location.email}`} 
              className="text-sm hover:text-primary transition-colors"
              rel="noopener"
            >
              {location.email}
            </a>
          </div>
        </div>
        
        {showButtons && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              href={location.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </a>
            <a 
              href={location.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Book Appointment
            </a>
          </div>
        )}
      </CardContent>
      
      {showMap && (
        <div className="w-full h-52 relative">
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
    </Card>
  );
} 