import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Shield, Zap, Database, Dock as Docker, Code2, Clock, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Clock className="h-3 w-3 mr-1" />
                15 Days Free Access
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Ship Secure <span className="text-primary">NestJS</span> Backends{" "}
                <span className="text-accent">Faster</span>
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Production-ready NestJS boilerplates with 2FA authentication, Docker, TypeORM, and PostgreSQL. Skip the
                repetitive setup and focus on building your core features.
              </p>
            </div>

            {/* Time Savings Breakdown */}
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground mb-4">Time saved with NestBoost:</h3>
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Zap className="h-5 w-5 mr-2" />
                Get NestBoost
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-medium">$100 off</span> for the first 100 customers (23 left)
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
                    <p className="text-sm text-card-foreground">Enterprise-grade framework</p>
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
                    <h3 className="font-semibold text-foreground">2FA Auth</h3>
                    <p className="text-sm text-card-foreground">Authenticator integration</p>
                  </div>
                </div>
              </Card>

              {/* Docker */}
              <Card className="p-6 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Docker className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Docker</h3>
                    <p className="text-sm text-card-foreground">Production deployment</p>
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
                    <h3 className="font-semibold text-foreground">PostgreSQL</h3>
                    <p className="text-sm text-card-foreground">TypeORM integration</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Code Preview */}
            <Card className="mt-6 p-4 bg-card border-border">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Ready to use</span>
                </div>
                <pre className="text-sm font-mono text-foreground">
                  <code>{`git clone nestboost-starter
npm install
docker-compose up -d
npm run start:dev`}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
