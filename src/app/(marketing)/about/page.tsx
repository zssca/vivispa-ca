import { Container, Section } from "@/components/ui";
import { H1, H2, P, Lead, Blockquote } from "@/components/ui/typography";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calgary\'s Premier Aesthetic Spa | Vivi Aesthetics",
  description: "Experience Calgary\'s top-rated aesthetic spa with expert practitioners, personalized treatments, and premium skincare services. Discover the perfect blend of luxury and results.",
};

export default function AboutPage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            <H1>About Vivi Aesthetic Spa</H1>
            <Lead className="mt-4">
              Your journey to radiant beauty and wellness begins here.
            </Lead>
            <P className="mt-6">
              Founded with a passion for aesthetic excellence, Vivi Aesthetic Spa has been providing 
              exceptional beauty and wellness services since 2018. Our team of highly trained 
              professionals is dedicated to enhancing your natural beauty using the latest technologies 
              and premium products.
            </P>
          </div>
        </Container>
      </Section>

      <Section spacing="md" backgroundClass="bg-secondary/50">
        <Container>
          <H2 className="text-center">Our Mission</H2>
          <div className="max-w-3xl mx-auto mt-8">
            <Blockquote className="text-center italic">
              &ldquo;To provide exceptional aesthetic services that enhance natural beauty, boost confidence, 
              and promote overall wellness in a relaxing and luxurious environment.&rdquo;
            </Blockquote>
            <P className="mt-8 text-center">
              At Vivi Aesthetic Spa, we believe that beauty is not just skin deep. Our holistic approach 
              combines cutting-edge treatments with personalized care to help you look and feel your best.
            </P>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <H2 className="text-xl md:text-2xl">Expertise</H2>
              <P className="mt-4">
                Our team consists of certified professionals with years of experience in aesthetic treatments.
                We regularly update our skills through continuous education and training.
              </P>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <H2 className="text-xl md:text-2xl">Quality</H2>
              <P className="mt-4">
                We use only premium products and state-of-the-art equipment to deliver safe and effective 
                treatments that meet the highest industry standards.
              </P>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <H2 className="text-xl md:text-2xl">Care</H2>
              <P className="mt-4">
                Your comfort and satisfaction are our top priorities. We take the time to understand your 
                unique needs and goals to provide personalized care.
              </P>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" backgroundClass="bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <H2>Visit Us Today</H2>
            <P className="mt-4">
              Experience the Vivi difference for yourself. Our friendly team is ready to welcome you 
              and help you embark on your journey to enhanced beauty and wellness.
            </P>
            <div className="mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/booking">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
} 