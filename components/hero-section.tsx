'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Shield,
  Zap,
  Database,
  Container,
  Code2,
  Clock,
  CheckCircle,
  Copy,
  Check,
  CreditCard,
  ArrowLeft,
  Star,
  Users,
} from 'lucide-react';
import { globalFetch } from '@/shared/utils/globalFetch';
import { Product, ProductListResponse } from '@/types/dodo';
import ProductList from '@/app/widgets/product-list/ui/product-list';

// Product Card Component
interface ProductCardProps {
  product: ProductListResponse;
  onPayClick: (product: ProductListResponse) => void;
  loading?: boolean;
}

// Integrated CTA and Social Proof Component
function CTASection({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      text: 'Perfect boilerplate for production apps',
    },
    {
      name: 'Sarah Kim',
      role: 'Tech Lead',
      avatar: 'https://avatars.githubusercontent.com/u/105001135?v=4',
      text: 'Saved me weeks of setup time!',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Full Stack Dev',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
      text: 'Amazing authentication system!',
    },
    {
      name: 'Emily Johnson',
      role: 'CTO',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
      text: 'Our go-to starter for all projects',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 flex space-x-40 ">
      {/* Main CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">
              Loading products...
            </span>
          </div>
        )}
        {!loading && <ProductList products={products} />}
      </div>

      {/* Enhanced Social Proof Card */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left: Avatar Stack & Rating */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-4">
            {/* Avatar Stack */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {testimonials.map((user, index) => (
                  <div
                    key={index}
                    className="relative w-12 h-12 rounded-full border-3 border-background overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg"
                    style={{ zIndex: 10 - index }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                    {index === currentTestimonial && (
                      <div className="absolute inset-0 ring-3 ring-green-500 ring-offset-2 ring-offset-background rounded-full animate-pulse" />
                    )}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-3 border-background bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  +18
                </div>
              </div>
              <div className="space-x-7 flex flex-col items-center sm:items-start lg:items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                  <span className="text-lg font-bold text-foreground ml-2">
                    5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Terminal Card Component
function TerminalCard() {
  const [copied, setCopied] = useState(false);

  const commands = [
    'git clone https://github.com/nestboost/starter.git',
    'cd nestboost-starter',
    'pnpm install',
    'docker compose up -d',
    'pnpm run start:dev',
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mt-6 p-0 bg-gray-900 border-gray-700 font-mono overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-gray-300 text-sm font-semibold ml-2">
          terminal — nestboost-starter
        </div>
        <button
          onClick={handleCopy}
          className="ml-auto p-1.5 rounded hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400 hover:text-gray-300" />
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-4 bg-gray-900">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Ready to use</span>
          </div>
          <div className="space-y-1">
            {commands.map((command, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-400 select-none">$</span>
                <span className="text-green-300 break-all">{command}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-800">
            <span className="text-green-400 select-none">$</span>
            <span className="text-green-400 animate-pulse">_</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleBackToHero = () => {
    setShowProducts(false);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {showProducts ? (
          /* Product Selection View */
          <div className="space-y-8">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={handleBackToHero}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Overview
            </Button>

            {/* Products Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Choose Your <span className="text-primary">NestJS</span> Starter
                Kit
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get instant access to production-ready boilerplates
              </p>
            </div>

            {/* Products Grid */}
          </div>
        ) : (
          /* Original Hero Content */
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Clock className="h-3 w-3 mr-1" />
                  Only $40 for the first 100 customers
                </Badge>

                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Ship Secure <span className="text-primary">NestJS</span>{' '}
                  Backends <span className="text-accent">Faster</span>
                </h1>

                <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                  Production-ready NestJS boilerplates with 2FA authentication,
                  Docker, TypeORM, and PostgreSQL. Skip the repetitive setup and
                  focus on building your core features.
                </p>
              </div>

              {/* Time Savings Breakdown */}
              <Card className="p-6 bg-card/50 border-primary/20">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground mb-4">
                    Time saved with NestBoost:
                  </h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>+ 8 hrs setting up authentication & 2FA</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>+ 6 hrs configuring Docker & deployment</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>+ 4 hrs setting up TypeORM & PostgreSQL</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>+ 3 hrs implementing security best practices</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>+ 4 hrs writing tests & documentation</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <Zap className="h-4 w-4" />
                      <span>= 25+ hours of development time saved</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* CTA Section with Integrated Social Proof */}
              <CTASection products={products} loading={loading} />

              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-medium">Only $40 </span> for
                the first 100 customers (23 left)
              </p>
            </div>

            {/* Right Column - Tech Stack Visualization */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* NestJS */}
                <Card className="p-6 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">NestJS</h3>
                      <p className="text-sm text-card-foreground">
                        Enterprise-grade framework
                      </p>
                    </div>
                  </div>
                </Card>

                {/* 2FA Auth */}
                <Card className="p-6 bg-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        2FA Auth
                      </h3>
                      <p className="text-sm text-card-foreground">
                        Authenticator integration
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Docker */}
                <Card className="p-6 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Container className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Docker</h3>
                      <p className="text-sm text-card-foreground">
                        Production deployment
                      </p>
                    </div>
                  </div>
                </Card>

                {/* PostgreSQL */}
                <Card className="p-6 bg-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Database className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        PostgreSQL
                      </h3>
                      <p className="text-sm text-card-foreground">
                        TypeORM integration
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="relative z-10">
                <TerminalCard />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
