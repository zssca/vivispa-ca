"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Service } from '@/types/service'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { X } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ServiceGalleryProps {
  service: Service
}

export function ServiceGallery({ service }: ServiceGalleryProps) {
  const defaultImagePath = '/assets/placeholder.webp'
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  // Use gallery images if available, otherwise fall back to the main service image
  const galleryImages = service.galleryImages && service.galleryImages.length > 0 
    ? service.galleryImages 
    : [service.image || defaultImagePath];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((imageSrc, index) => (
          <Card 
            key={index} 
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setSelectedImage({ src: imageSrc, alt: `${service.title} - Image ${index + 1}` })}
          >
            <AspectRatio ratio={4/3}>
              <Image
                src={imageSrc}
                alt={`${service.title} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
          </Card>
        ))}
      </div>

      {/* Image preview modal */}
      <AlertDialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <AlertDialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
          <VisuallyHidden>
            <AlertDialogHeader>
              <AlertDialogTitle>Image Preview</AlertDialogTitle>
              <AlertDialogDescription>
                Enlarged view of the selected image
              </AlertDialogDescription>
            </AlertDialogHeader>
          </VisuallyHidden>
          
          {selectedImage && (
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 95vw, 1200px"
                />
              </AspectRatio>
              
              <AlertDialogCancel className="absolute top-4 right-4 w-8 h-8 rounded-full p-0 bg-background/80 hover:bg-background border-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close image preview</span>
              </AlertDialogCancel>
            </div>
          )}
          
          <VisuallyHidden>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setSelectedImage(null)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </VisuallyHidden>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}