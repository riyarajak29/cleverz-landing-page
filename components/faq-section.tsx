import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the AI tutor work?",
    answer:
      "Our AI tutor uses advanced language models to provide instant, personalized explanations for any question. It breaks down complex concepts into easy-to-understand steps, provides relevant examples, and adapts to your learning pace.",
  },
  {
    question: "Is Cleverz suitable for JEE Main and Advanced?",
    answer:
      "Yes! Cleverz covers the complete syllabus for both JEE Main and Advanced. Our content is regularly updated to match the latest exam patterns and includes difficulty levels appropriate for both exams.",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Your progress dashboard shows detailed analytics including subject-wise mastery, streak tracking, points earned, daily goals, and your position on the leaderboard. All data is synchronized across devices.",
  },
  {
    question: "What happens after my 3 free questions?",
    answer:
      "After your 3 free questions, you'll need to sign in with Google to continue. This allows us to save your progress, personalize your experience, and unlock unlimited questions with our AI tutor.",
  },
  {
    question: "How is the pricing structured?",
    answer:
      "We offer three tiers: Free (limited access), Standard (full AI access + progress tracking), and Premium (everything + priority support + exclusive content). Check our pricing page for detailed comparisons.",
  },
  {
    question: "Can I use Cleverz on mobile devices?",
    answer:
      "Yes! Cleverz is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Your progress syncs automatically across all devices.",
  },
  {
    question: "Do you offer mock tests?",
    answer:
      "Yes, our platform includes full-length mock tests, chapter-wise tests, and daily practice quizzes. All tests come with detailed solutions and performance analysis.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied with Cleverz, contact our support team within 7 days of purchase for a full refund.",
  },
]

export function FAQSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Everything you need to know about Cleverz
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6 transition-colors hover:bg-muted/50"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold text-balance">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center pt-8">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
