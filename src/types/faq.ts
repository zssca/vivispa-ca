export interface FAQ {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  faqs: FAQ[]
} 