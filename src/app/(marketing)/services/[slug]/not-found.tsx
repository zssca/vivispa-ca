import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export default function ServiceNotFound() {
  return (
    <Section spacing="lg" centered>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Service Not Found</h1>
      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
        Sorry, the service you are looking for does not exist or has been removed.
      </p>
      <Link href="/services" passHref>
        <Button>View All Services</Button>
      </Link>
    </Section>
  )
} 