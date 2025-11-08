"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { getServiceBySlug } from "@/data/services";

interface BreadcrumbSegment {
  href: string;
  label: string;
  isCurrentPage: boolean;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const [segments, setSegments] = useState<BreadcrumbSegment[]>([]);
  
  useEffect(() => {
    // Skip processing breadcrumbs for homepage
    if (pathname !== "/") {
      async function generateBreadcrumbs() {
        // Base segment for home
        const breadcrumbSegments: BreadcrumbSegment[] = [
          { href: "/", label: "Home", isCurrentPage: pathname === "/" }
        ];
        
        // Split the pathname into parts
        const parts = pathname.split("/").filter(Boolean);
        
        // Keep track of the full path while we build it up
        let currentPath = "";
        
        // Process each path segment
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!part) continue; // Skip empty parts
          
          currentPath += `/${part}`;
          const isCurrentPage = i === parts.length - 1;
          
          // Handle dynamic service slugs
          if (currentPath.startsWith("/services/") && part !== "services") {
            try {
              // Fetch the actual service to get its proper title
              const service = await getServiceBySlug(part);
              if (service) {
                breadcrumbSegments.push({
                  href: currentPath,
                  label: service.title,
                  isCurrentPage
                });
                continue;
              }
            } catch (error) {
              console.error("Error fetching service:", error);
            }
          }
          
          // Format the label (replace hyphens with spaces, capitalize)
          const label = part
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          
          breadcrumbSegments.push({
            href: currentPath,
            label,
            isCurrentPage
          });
        }
        
        setSegments(breadcrumbSegments);
      }
      
      generateBreadcrumbs();
    }
  }, [pathname]);

  // Return null after hooks are called
  if (pathname === "/" || segments.length <= 1) {
    return null;
  }

  // Determine if we need to truncate with ellipsis
  const shouldShowEllipsis = segments.length > 4;
  const visibleSegments = shouldShowEllipsis 
    ? [...segments.slice(0, 1), ...segments.slice(-3)] 
    : segments;

  return (
    <Breadcrumb className="w-full py-2">
      <BreadcrumbList className="list-none flex flex-wrap gap-1 items-center text-sm">
        {visibleSegments.map((segment) => {
          const isActualLastSegment = segments.length > 0 && segment.href === segments[segments.length -1]?.href;

          // Determine if this segment is the one just before the ellipsis in the original full path
          const isPreEllipsisSegment = shouldShowEllipsis && segments.length > 1 && segment.href === segments[0]?.href;

          return (
            <React.Fragment key={segment.href}>
              <BreadcrumbItem className="m-0 p-0 flex items-center">
                {isActualLastSegment ? (
                  <BreadcrumbPage className="font-medium text-muted-foreground">{segment.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="hover:underline">
                    <Link 
                      href={segment.href}
                    >
                      {segment.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {isPreEllipsisSegment && (
                <>
                  <BreadcrumbSeparator className="mx-1 flex items-center" />
                  <BreadcrumbItem className="m-0 p-0">
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="mx-1 flex items-center" />
                </>
              )}
              
              {!isActualLastSegment && !isPreEllipsisSegment && (
                <BreadcrumbSeparator className="mx-1 flex items-center">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
} 