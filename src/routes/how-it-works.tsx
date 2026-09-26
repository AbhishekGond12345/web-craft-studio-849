import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How TiffinConnect Works — Tiffin & Laundry in 4 Steps" },
      {
        name: "description",
        content:
          "See how ordering works: find providers near you, pick a meal plan or laundry service, schedule delivery and track every order.",
      },
      { property: "og:title", content: "How TiffinConnect Works" },
      { property: "og:description", content: "Four simple steps for daily meals and doorstep laundry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const tiffinSteps = [
  ["Enter your location", "We show only kitchens that actually deliver to your area or pincode."],
  ["Compare kitchens", "Check today's menu, weekly menu, prices, hygiene ratings and reviews."],
  ["Choose a plan", "Order one meal or subscribe daily, weekly or monthly. Pause or skip anytime."],
  ["Track till delivery", "Follow your tiffin from kitchen to doorstep with live status updates."],
];

const laundrySteps = [
  ["Pick a laundry partner", "Compare pricing per kg and per piece, plus pickup and delivery times."],
  ["Select services", "Wash & fold, wash & iron, dry cleaning, shoe, blanket or curtain cleaning."],
  ["Schedule a pickup", "Choose a date and a two-hour slot that suits you."],
  ["Get it back fresh", "Quality checked, neatly folded and delivered back to your door."],
];

const faqs = [
  ["Is there a minimum subscription?", "No. You can order a single tiffin for a day before committing to a weekly or monthly plan."],
  ["Can I pause my plan when I travel?", "Yes. Pause from your dashboard and your remaining days carry forward with no expiry for 60 days."],
  ["How is hygiene checked?", "Every verified kitchen submits FSSAI registration and passes a physical inspection before going live."],
  ["What payment methods are supported?", "UPI, credit and debit cards, net banking, wallet balance and cash on delivery."],
  ["What if a delivery is late or wrong?", "Raise a complaint from the order page. Verified issues are refunded to your wallet within 24 hours."],
];

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="How It Works"
        title="From your phone to your doorstep"
        subtitle="Two services, one simple flow. Here is exactly what happens after you tap order."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {[
            { title: "Ordering tiffin", steps: tiffinSteps, to: "/tiffin", cta: "Find Tiffin" },
            { title: "Booking laundry", steps: laundrySteps, to: "/laundry", cta: "Explore Laundry" },
          ].map((block) => (
            <div key={block.title} className="surface-card p-7">
              <h2 className="font-display text-xl font-semibold">{block.title}</h2>
              <ol className="mt-6 space-y-6">
                {block.steps.map(([title, text], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button className="mt-7" asChild>
                <Link to={block.to}>{block.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-5">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q!}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
