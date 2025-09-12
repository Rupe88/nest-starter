import { VideoPlayer } from "./video-player"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Code, Zap } from "lucide-react"

export function DemoSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Live Demo
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">See NestBoost in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how you can build and deploy a complete NestJS API in minutes, not hours
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">From Zero to Production API</CardTitle>
                  <CardDescription>Complete walkthrough of building a secure NestJS API</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>8 min demo</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <VideoPlayer
                src="/placeholder.mp4?height=400&width=800&query=NestJS API development demo video"
                poster="/placeholder.jpg?height=400&width=800&query=NestJS development screenshot"
                title="NestBoost Demo: Building Production APIs"
                className="aspect-video"
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Lightning Setup</CardTitle>
                <CardDescription>Get started in under 2 minutes with our CLI tool</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Production Ready</CardTitle>
                <CardDescription>Security, testing, and deployment included out of the box</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Save Weeks</CardTitle>
                <CardDescription>Skip the boilerplate and focus on your business logic</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
