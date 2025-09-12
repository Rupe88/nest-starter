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
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about NestBoost
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 border-gray-200 rounded-lg mb-4 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline text-gray-900 hover:text-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
