import { HeroSection } from '@/components/hero-section';
import { Navigation } from '@/components/navigation';
import { PricingSection } from '@/components/pricing-section';
import { FAQSection } from '@/components/faq-section';
import { DemoSection } from '@/components/demo-section';
import { Footer } from '@/components/footer';
import { globalFetch } from '@/shared/utils/globalFetch';
import { ProductListResponse } from '../types/dodo';
import ProductList from './widgets/product-list/ui/product-list';
const HomePage = async () => {
  const products = await globalFetch('/api/products') as ProductListResponse[];
console.log(products);


//   console.log(products);
  return (
    <main className="min-h-screen bg-background">
      <ProductList products={products}/>
      <Navigation />
      <HeroSection />
      <DemoSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
};
export default HomePage;
