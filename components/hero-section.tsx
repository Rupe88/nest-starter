'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BuyButton from './BuyButton';

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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <BuyButton />
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
                onClick={() => (window.location.href = '/demo')}
              >
                View Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-medium">$100 off</span> for the
              first 100 customers (23 left)
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
                    <h3 className="font-semibold text-foreground">2FA Auth</h3>
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

            {/* Terminal Card - Replacing the original code preview */}
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
