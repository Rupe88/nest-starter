'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Gift } from 'lucide-react';
import { globalFetch } from '@/shared/utils/globalFetch';
import { Product } from '@/types/dodo';
import ProductList from '@/app/widgets/product-list/ui/product-list';

export function PricingSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  // Fetch products for Starter card
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await globalFetch<Product[]>('/api/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  return (
    <section id="pricing" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            <Gift className="h-3 w-3 mr-1" />
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Save hours of repetitive code,{' '}
            <span className="text-primary">ship fast</span>,{' '}
            <span className="text-accent">get profitable!</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Choose the perfect NestBoost package for your project needs. All
            packages include lifetime updates and 15 days free access.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Package */}
          <Card className="relative border-border hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Full secure boilerplate</CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-accent">$40</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  PassportJS, Robust JWT, QR Code + Authenticator, Docker,
                  TypeORM, NestJS
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    NestJS boilerplate with TypeScript
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    JWT Authentication + PassportJS
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    2FA Authenticator + QR Code integration
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    Docker + PostgreSQL + TypeORM setup
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    Social login (Google & GitHub) - free & secure
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {loading && <p>Loading products...</p>}
              {!loading && <ProductList products={products} />}
            </CardFooter>
          </Card>

          {/* Pro Package */}
          <Card className="relative border-accent shadow-lg scale-105 bg-card">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-accent-foreground px-4 py-1">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>
                Advanced features for production apps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">Everything in Starter</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  Role-based Access Control (RBAC)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  Rate limiting + CORS configuration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  Email verification + password reset system
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => showToast('Pro package coming soon 🚀')}
              >
                Buy Pro
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Package */}
          <Card className="relative border-border hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>
                Full-featured platform for teams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">Everything in Pro</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  Microservices + Redis caching + BullMQ
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">Monitoring & logging setup</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  CI/CD templates + advanced DB patterns
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">
                  1-on-1 setup call & priority support
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => showToast('Enterprise package coming soon 🚀')}
              >
                Buy Enterprise
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-8 right-8 text-accent-foreground px-6 py-3 rounded-lg shadow-lg animate-slide-in bg-primary">
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
}
