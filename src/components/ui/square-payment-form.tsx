'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart } from '@/types/data';
import { formatPrice } from '@/lib/square-client';
import { AlertTriangle, CreditCard, Shield } from 'lucide-react';
import { 
  SquareCard, 
  SquarePayments, 
  PaymentResult, 
  CustomerInfo 
} from '@/types/square';

interface SquarePaymentFormProps {
  cart: ShoppingCart;
  onPaymentSuccess: (result: PaymentResult) => void;
  onPaymentError: (error: PaymentResult) => void;
}

export function SquarePaymentForm({ cart, onPaymentSuccess, onPaymentError }: SquarePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [configurationError, setConfigurationError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const cardButton = useRef<SquareCard | null>(null);
  const payments = useRef<SquarePayments | null>(null);

  useEffect(() => {
    loadSquareSDK();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSquareSDK = () => {
    // Check for required environment variables
    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DOWNTOWN || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!applicationId || applicationId === 'your_square_application_id_here') {
      setConfigurationError('Square Application ID not configured. Please contact support.');
      setIsLoading(false);
      return;
    }

    if (!locationId || locationId === 'your_downtown_location_id_here') {
      setConfigurationError('Square Location ID not configured. Please contact support.');
      setIsLoading(false);
      return;
    }

    if (window.Square) {
      setSdkLoaded(true);
      setIsLoading(false);
      initializeSquare();
      return;
    }

    const script = document.createElement('script');
    // Use production URL since environment variables are configured for production
    const isProduction = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production';
    script.src = isProduction 
      ? 'https://web.squarecdn.com/v1/square.js' 
      : 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.async = true;
    script.onload = () => {
      setSdkLoaded(true);
      setIsLoading(false);
      initializeSquare();
    };
    script.onerror = () => {
      console.error('Failed to load Square SDK');
      setIsLoading(false);
      setConfigurationError('Failed to load payment system. Please refresh the page and try again.');
    };
    document.head.appendChild(script);
  };

  const initializeSquare = async () => {
    if (!window.Square) {
      console.error('Square SDK not loaded');
      setConfigurationError('Payment system not available. Please refresh the page.');
      return;
    }

    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DOWNTOWN || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!applicationId || !locationId || 
        applicationId === 'your_square_application_id_here' || 
        locationId === 'your_downtown_location_id_here') {
      setConfigurationError('Payment system configuration incomplete. Please contact support.');
      return;
    }

    try {
      console.log('Initializing Square with:', { applicationId, locationId });
      
      // Initialize Square Payments
      payments.current = window.Square.payments(applicationId, locationId);

      // Initialize card form with better error handling
      const card = await payments.current.card();
      await card.attach('#card-container');

      cardButton.current = card;
      
      // Show warning for localhost
      if (window.location.hostname === 'localhost') {
        console.warn('Note: Some Square features may be limited on localhost. Deploy to HTTPS for full functionality.');
      }
    } catch (error) {
      console.error('Error initializing Square:', error);
      // Provide more helpful error message
      if (window.location.hostname === 'localhost') {
        setConfigurationError('Payment initialization failed. Note: Square requires HTTPS for full functionality. Some features may be limited on localhost.');
      } else {
        setConfigurationError('Payment system initialization failed. Please refresh the page and try again.');
      }
    }
  };

  const handlePayment = async () => {
    if (!cardButton.current || !payments.current) {
      onPaymentError({ 
        success: false, 
        error: 'Payment system not ready. Please refresh the page.' 
      });
      return;
    }

    // Validate customer information
    if (!customerInfo.email || !customerInfo.firstName) {
      onPaymentError({ 
        success: false, 
        error: 'Please fill in all required customer information.' 
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      onPaymentError({ 
        success: false, 
        error: 'Please enter a valid email address.' 
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Tokenize the card
      const result = await cardButton.current.tokenize();
      
      if (result.status === 'OK' && result.token) {
        // Send payment to our API
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            cart: cart,
            customerInfo: customerInfo,
          }),
        });

        const paymentResult: PaymentResult = await response.json();

        if (response.ok && paymentResult.success) {
          onPaymentSuccess(paymentResult);
        } else {
          onPaymentError(paymentResult);
        }
      } else {
        onPaymentError({ 
          success: false, 
          error: result.errors?.[0]?.detail || 'Payment tokenization failed.' 
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError({ 
        success: false, 
        error: 'Payment processing failed. Please try again.' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading payment system...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (configurationError) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {configurationError}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!sdkLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load payment system. Please refresh the page and try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Payment Card */}
        <div className="space-y-4">
          <h3 className="font-semibold">Payment Details</h3>
          <div id="card-container" ref={cardRef} className="min-h-[100px] border rounded-md p-3"></div>
        </div>

        {/* Security Notice */}
        <div className="bg-muted/50 rounded-md p-3">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Secure Payment Processing</p>
              <p>Your payment information is processed securely by Square and never stored on our servers.</p>
            </div>
          </div>
        </div>

        {/* Order Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>{formatPrice(cart.total, cart.currency)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !customerInfo.email || !customerInfo.firstName}
          className="w-full"
          size="lg"
        >
          {isProcessing ? 'Processing...' : `Pay ${formatPrice(cart.total, cart.currency)}`}
        </Button>
      </CardContent>
    </Card>
  );
}