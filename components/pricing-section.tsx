"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Star, Gift } from "lucide-react"

export function PricingSection() {
  const handleGumroadPurchase = (productId: string) => {
    // Gumroad integration - opens Gumroad overlay
    window.open(`https://gumroad.com/l/${productId}`, "_blank")
  }

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            <Gift className="h-3 w-3 mr-1" />
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Save hours of repetitive code, <span className="text-primary">ship fast</span>,{" "}
            <span className="text-accent">get profitable!</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Choose the perfect NestBoost package for your project needs. All packages include lifetime updates and 15
            days free access.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Package - Made this tier free */}
          <Card className="relative border-border hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Perfect for side projects and MVPs</CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-accent">FREE</span>
                </div>
                <p className="text-sm text-muted-foreground">Open source. Build unlimited projects!</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">NestJS boilerplate with TypeScript</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">JWT Authentication & Authorization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">TypeORM with PostgreSQL setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Docker configuration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">API documentation with Swagger</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Basic security middleware</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Community support</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-accent hover:bg-accent/90"
                onClick={() => window.open("https://github.com/Rupe88/TImer-Daju", "_blank")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Get Free Starter
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Package - Most Popular */}
          <Card className="relative border-accent shadow-lg scale-105 bg-card">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-accent-foreground px-4 py-1">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>Everything you need for production apps</CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-foreground">$249</span>
                  <div className="text-sm text-muted-foreground">
                    <div className="line-through">$349</div>
                    <div className="text-accent font-medium">$100 off</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">One-time payment. Build unlimited projects!</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Everything in Starter, plus:</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">2FA Authentication with Authenticator</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Advanced security middleware</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Rate limiting & CORS configuration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Email verification system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Role-based access control (RBAC)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Production Docker compose</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Comprehensive test suite</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Priority email support</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => handleGumroadPurchase("nestboost-pro")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Get Pro
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Package */}
          <Card className="relative border-border hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For teams and complex applications</CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-foreground">$399</span>
                  <div className="text-sm text-muted-foreground">
                    <div className="line-through">$499</div>
                    <div className="text-accent font-medium">$100 off</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">One-time payment. Build unlimited projects!</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Everything in Pro, plus:</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Microservices architecture template</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Redis caching integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Message queue (Bull/BullMQ)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Monitoring & logging setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">CI/CD pipeline templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Advanced database patterns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">1-on-1 setup call (30 min)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">Priority support & consultation</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => handleGumroadPurchase("nestboost-enterprise")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Get Enterprise
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>15 days free access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>Lifetime updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Secure payment powered by <span className="font-medium">Gumroad</span>. No subscription, pay once and own it
            forever.
          </p>
        </div>
      </div>
    </section>
  )
}
