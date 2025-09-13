import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowLeft, Clock, Users, Star } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 text-gray-600 hover:text-green-600 hover:bg-green-50">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700">Live Demo</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See NestBoost in <span className="text-green-600">Action</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how NestBoost helps you build secure, production-ready NestJS applications in minutes, not hours.
            </p>
          </div>

          {/* Video Player */}
          <Card className="mb-12 overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
              <div className="text-center">
                <div className="h-20 w-20 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-green-700 transition-colors cursor-pointer">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <p className="text-gray-600">Demo video coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  We're preparing an in-depth walkthrough of NestBoost features
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Quick Setup</CardTitle>
                <CardDescription>See how to get a full NestJS app running in under 5 minutes</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">2FA Authentication</CardTitle>
                <CardDescription>Complete authentication system with two-factor security</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Production Ready</CardTitle>
                <CardDescription>Docker, PostgreSQL, and deployment configurations included</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Next Project?</h2>
            <p className="text-gray-600 mb-6">Join hundreds of developers who are shipping faster with NestBoost</p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/#pricing">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
