/**
 * Site configuration data for Vivi Aesthetics & Spa website
 */
export const siteConfig = {
  name: "Vivi Aesthetics & Spa",
  title: "Vivi Aesthetics & Spa | Premium Beauty & Wellness Treatments",
  description: "Vivi Aesthetics & Spa offers premium beauty and wellness treatments to help you look and feel your best.",
  url: "https://vivispa.ca",
  ogImage: "/assets/logos/logo-light.svg",
  links: {
    instagram: "https://instagram.com/vivispa.ca",
    facebook: "https://facebook.com/vivispa.ca",
    twitter: "https://twitter.com/vivispa.ca",
    youtube: "https://youtube.com/c/vivispa.ca",
  },
  contact: {
    email: "ViviAestheticsSpa@gmail.com",
    phone: "+1 (403) 708-7654",
  },
};

/**
 * Business information for structured data and contact pages
 */
export const businessInfo = {
  name: "Vivi Aesthetics & Spa Ltd.",
  legalName: "Vivi Aesthetics & Spa Ltd.",
  registrationNumber: "AB1234567",
  foundedYear: 2015,
  description: "Premium aesthetic services and treatments in Calgary, Alberta.",
  contactEmail: "ViviAestheticsSpa@gmail.com",
  contactPhone: "+1 (403) 708-7654",
  hours: {
    monday: "9:00 AM - 7:00 PM",
    tuesday: "9:00 AM - 7:00 PM",
    wednesday: "9:00 AM - 7:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "11:00 AM - 5:00 PM",
  },
  socialLinks: {
    instagram: "https://instagram.com/vivispa.ca",
    facebook: "https://facebook.com/vivispa.ca",
    twitter: "https://twitter.com/vivispa.ca",
    youtube: "https://youtube.com/c/vivispa.ca",
  },
  mainAddress: {
    street: "123 8th Avenue SW",
    city: "Calgary",
    province: "Alberta",
    postalCode: "T2P 2J9",
    country: "Canada",
  },
};

/**
 * Navigation items for the website
 */
export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/locations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Facials & Skin Care", href: "/services#facials" },
    { name: "Laser Treatments", href: "/services#laser" },
    { name: "Body Treatments", href: "/services#body" },
    { name: "Specialty Treatments", href: "/services#specialty" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
  cta: { name: "Book Appointment", href: "/booking" },
};

/**
 * FAQ categories with sample questions for the website
 */
export const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    faqs: [
      {
        question: "What should I expect during my first visit?",
        answer: "During your first visit to Vivi Aesthetics & Spa, you'll complete a brief health and skin assessment form. You'll then meet with one of our skin care specialists who will analyze your skin, discuss your concerns and goals, and recommend treatments tailored to your specific needs. We encourage you to arrive 15 minutes early for your first appointment to complete paperwork and get comfortable in our space."
      },
      {
        question: "How do I book an appointment?",
        answer: "You can book an appointment through our online booking system, by calling us at +1 (403) 708-7654, or by emailing ViviAestheticsSpa@gmail.com. We recommend booking 1-2 weeks in advance for most treatments, though we do try to accommodate last-minute appointments when possible."
      },
      {
        question: "Do you offer gift cards?",
        answer: "Yes, we offer digital and physical gift cards in any denomination. Gift cards can be purchased online, by phone, or in person at either of our locations. They make perfect gifts for birthdays, anniversaries, or any special occasion."
      },
      {
        question: "What qualifications do your aestheticians have?",
        answer: "All of our aestheticians are licensed professionals with specialized training in their respective areas of expertise. Many have additional certifications in advanced treatments like laser therapy, microneedling, and medical-grade facials. We invest in ongoing education to ensure our team stays current with the latest techniques and technologies."
      },
      {
        question: "Do you accept insurance or health spending accounts?",
        answer: "We provide detailed receipts for all treatments that may be eligible for health spending accounts or insurance reimbursement. Coverage varies by provider, so we recommend checking with your insurance company regarding specific treatment eligibility before your appointment."
      },
      {
        question: "What COVID-19 safety measures do you have in place?",
        answer: "We maintain rigorous cleaning protocols, including sanitizing treatment rooms between clients, frequent disinfection of high-touch surfaces, and HEPA air filtration systems. Our staff follows all public health guidelines, and we ask clients to reschedule if they're experiencing any symptoms or have had recent exposure to COVID-19."
      },
      {
        question: "Are your treatments suitable for all skin types and tones?",
        answer: "Yes, we offer treatments suitable for all skin types, conditions, and tones. During your consultation, our specialists will assess your specific needs and customize treatments accordingly. We use advanced technologies and products designed to safely treat diverse skin tones."
      }
    ]
  },
  {
    id: "treatments",
    name: "Treatment Questions",
    faqs: [
      {
        question: "How often should I get a facial?",
        answer: "For optimal results, we recommend a professional facial every 4-6 weeks, which aligns with your skin's natural renewal cycle. However, the frequency may vary based on your skin type, concerns, and goals. Our specialists can create a personalized treatment schedule during your consultation."
      },
      {
        question: "Is there any downtime after treatments?",
        answer: "Downtime varies by treatment. Many of our facials have little to no downtime, while some advanced treatments like microneedling or intense laser treatments may require 1-3 days of social downtime. We'll always discuss potential downtime before your treatment so you can plan accordingly."
      },
      {
        question: "What age should I start anti-aging treatments?",
        answer: "Preventative skin care can begin as early as your 20s with proper sun protection and quality skin care products. Professional treatments for prevention typically start in your late 20s to early 30s. Our philosophy is that the best approach is proactive rather than reactive when it comes to skin aging."
      }
    ]
  },
  {
    id: "policies",
    name: "Policies & Procedures",
    faqs: [
      {
        question: "What is your cancellation policy?",
        answer: "We require 24 hours notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee of 50% of the service price. No-shows will be charged the full service price."
      },
      {
        question: "Do you offer consultations?",
        answer: "Yes, we offer complimentary 15-minute consultations for most services. For advanced treatments like laser procedures or specialized skin concerns, we provide in-depth 30-minute consultations that can be credited toward your treatment if booked within 30 days."
      },
      {
        question: "Are your products cruelty-free?",
        answer: "Yes, the majority of our retail products and professional treatment products are cruelty-free. We also offer many vegan options. Our staff can help identify products that align with your specific preferences and values."
      }
    ]
  }
]; 