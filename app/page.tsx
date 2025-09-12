import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DemoSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
