import { Navigation } from "@/components/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone } from "lucide-react"

const faqData = [
  {
    question: "What is NestBoost and how does it help developers?",
    answer:
      "NestBoost is a comprehensive toolkit for building production-ready NestJS applications. It provides pre-built modules, security patterns, authentication systems, and deployment configurations that help developers ship faster and more securely.",
  },
  {
    question: "Do I need prior NestJS experience to use NestBoost?",
    answer:
      "While basic NestJS knowledge is helpful, NestBoost is designed to be beginner-friendly. Our extensive documentation, tutorials, and examples help developers of all skill levels get started quickly.",
  },
  {
    question: "What databases are supported?",
    answer:
      "NestBoost supports PostgreSQL, MySQL, MongoDB, and SQLite out of the box. We provide TypeORM and Mongoose integrations with optimized configurations for each database type.",
  },
  {
    question: "Is there a free tier available?",
    answer:
      "Yes! Our Starter plan is completely free and includes basic templates, documentation access, and community support. It's perfect for learning and small projects.",
  },
  {
    question: "How do I deploy my NestBoost application?",
    answer:
      "NestBoost includes deployment configurations for popular platforms like Vercel, AWS, Docker, and Kubernetes. We provide step-by-step guides and automated deployment scripts for each platform.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer multiple support channels: community Discord for free users, email support for Pro users, and priority support with video calls for Enterprise customers. All plans include access to our comprehensive documentation.",
  },
  {
    question: "Can I customize the templates and modules?",
    answer:
      "All NestBoost templates and modules are fully customizable. You get the complete source code and can modify anything to fit your specific requirements.",
  },
  {
    question: "How often do you update the templates?",
    answer:
      "We update our templates monthly to include the latest NestJS features, security patches, and best practices. Pro and Enterprise users get early access to new templates and features.",
  },
  {
    question: "Do you provide authentication and authorization modules?",
    answer:
      "Yes! NestBoost includes complete authentication systems with JWT, OAuth, 2FA, role-based access control, and integration with popular providers like Auth0, Firebase, and Supabase.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "Enterprise includes everything in Pro plus: custom template development, dedicated support engineer, architecture reviews, team training sessions, and SLA guarantees for support response times.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about NestBoost, our features, pricing, and support options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
              <CardDescription>Everything you need to know about getting started with NestBoost</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Community Discord</CardTitle>
                  <CardDescription>Join our active community for quick help and discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Join Discord
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>Get detailed help via email within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Priority Support</CardTitle>
                  <CardDescription>Enterprise customers get priority phone support</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
