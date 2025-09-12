import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Building Secure NestJS APIs with TypeORM and PostgreSQL",
    description:
      "Learn how to create production-ready APIs with proper authentication, validation, and database integration.",
    author: "NestBoost Team",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Tutorial",
    slug: "secure-nestjs-apis-typeorm-postgresql",
  },
  {
    id: 2,
    title: "Implementing 2FA Authentication in NestJS Applications",
    description: "Step-by-step guide to adding two-factor authentication using authenticator apps and QR codes.",
    author: "Security Expert",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Security",
    slug: "2fa-authentication-nestjs",
  },
  {
    id: 3,
    title: "Docker Best Practices for NestJS Microservices",
    description: "Optimize your containerized NestJS applications for production deployment and scalability.",
    author: "DevOps Team",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "DevOps",
    slug: "docker-nestjs-microservices",
  },
  {
    id: 4,
    title: "Performance Optimization Techniques for NestJS",
    description: "Boost your API performance with caching, database optimization, and efficient middleware.",
    author: "Performance Team",
    date: "2023-12-28",
    readTime: "15 min read",
    category: "Performance",
    slug: "nestjs-performance-optimization",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NestBoost <span className="text-green-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn about NestJS best practices, security patterns, and development tips from our team of experts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900 hover:text-green-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
