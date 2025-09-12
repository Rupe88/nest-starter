import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// This would typically come from a CMS or database
const getBlogPost = (slug: string) => {
  const posts = {
    "secure-nestjs-apis-typeorm-postgresql": {
      title: "Building Secure NestJS APIs with TypeORM and PostgreSQL",
      author: "NestBoost Team",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Tutorial",
      content: `
        <h2>Introduction</h2>
        <p>Building secure APIs is crucial for any production application. In this comprehensive guide, we'll walk through creating a robust NestJS API with TypeORM and PostgreSQL.</p>
        
        <h2>Setting Up the Project</h2>
        <p>First, let's initialize our NestJS project with the necessary dependencies:</p>
        <pre><code>npm i -g @nestjs/cli
nest new secure-api
cd secure-api
npm install @nestjs/typeorm typeorm pg @nestjs/passport passport passport-jwt</code></pre>
        
        <h2>Database Configuration</h2>
        <p>Configure TypeORM with PostgreSQL for optimal security and performance...</p>
        
        <h2>Authentication & Authorization</h2>
        <p>Implement JWT-based authentication with proper token validation and refresh mechanisms...</p>
        
        <h2>Input Validation</h2>
        <p>Use class-validator and class-transformer for robust input validation...</p>
        
        <h2>Conclusion</h2>
        <p>Following these practices will help you build secure, scalable NestJS applications ready for production deployment.</p>
      `,
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 text-gray-600 hover:text-green-600 hover:bg-green-50">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">{post.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-pre:bg-gray-100 prose-code:text-green-600 prose-a:text-green-600 hover:prose-a:text-green-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  )
}
