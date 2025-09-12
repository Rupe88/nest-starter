import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </a>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <a href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </a>
          </Button>

          <article>
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-pre:bg-muted prose-code:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  )
}
