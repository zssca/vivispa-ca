"use client"

import { Service } from '@/types/service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Clock, Calendar } from 'lucide-react'

interface ServiceInfoProps {
  service: Service & {
    benefits?: string[];
    procedure?: string;
    scientificInfo?: string;
    historyAndDevelopment?: string;
  }
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Full Description */}
      {service.fullDescription && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary">About This Treatment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Key Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Procedure Details */}
      {service.procedure && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Treatment Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {service.procedure}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Scientific Information */}
      {service.scientificInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary">
              Scientific Background
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {service.scientificInfo}
            </p>
          </CardContent>
        </Card>
      )}

      {/* History and Development */}
      {service.historyAndDevelopment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              History & Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {service.historyAndDevelopment}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}