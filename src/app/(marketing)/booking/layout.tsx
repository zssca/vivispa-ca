import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment | Vivi Aesthetics & Spa',
  description: 'Book your appointment at Vivi Aesthetics & Spa. Choose from our Downtown or Edmonton Trail locations and select your preferred service.',
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 