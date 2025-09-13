import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "How quickly can I deploy my first NestJS API?",
    answer:
      "With NestBoost templates, you can have a production-ready API deployed in under 10 minutes. Our pre-configured templates include authentication, database setup, and deployment scripts.",
  },
  {
    question: "What's included in the starter templates?",
    answer:
      "Each template includes authentication, database integration, API documentation, testing setup, Docker configuration, and deployment scripts for popular platforms.",
  },
  {
    question: "Do you support TypeScript and JavaScript?",
    answer:
      "Yes! All our templates are built with TypeScript by default, but we also provide JavaScript versions for developers who prefer it.",
  },
  {
    question: "Can I use my own database?",
    answer:
      "NestBoost works with PostgreSQL, MySQL, MongoDB, and SQLite. We provide migration scripts and connection configurations for each.",
  },
  {
    question: "Is there ongoing support after purchase?",
    answer:
      "Yes! All plans include community support, and Pro/Enterprise plans get priority email and video call support from our team.",
  },
]

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 bg-gradient-to-br from-white via-green-50/20 via-emerald-50/10 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(34,197,94,0.02)_50%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about NestBoost
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm border border-green-100/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-200/70 hover:bg-green-50/20 px-6 py-2"
              >
                <AccordionTrigger className="text-left hover:no-underline text-gray-900 hover:text-green-600 font-semibold transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
