import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TiffinConnect — Home Kitchens & Laundry Partners in Pune" },
      {
        name: "description",
        content:
          "TiffinConnect connects home kitchens and local laundry businesses with customers who need reliable daily meals and clean clothes.",
      },
      { property: "og:title", content: "About TiffinConnect" },
      { property: "og:description", content: "Why we built a marketplace for daily meals and laundry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const numbers = [
  ["2023", "Founded in Pune"],
  ["463", "Partner businesses"],
  ["38,412", "Registered customers"],
  ["2.1 lakh", "Meals delivered"],
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="Good food and clean clothes, without the daily stress"
        subtitle="We started TiffinConnect because finding a reliable tiffin in a new city should not depend on WhatsApp forwards and luck."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-5 text-muted-foreground">
          <p>
            In 2023, our founders moved to Pune for work and spent three months cycling through tiffin services
            they found on hostel noticeboards. Menus changed without warning, quality dropped after the first
            week, and there was no way to compare one kitchen against another.
          </p>
          <p>
            TiffinConnect fixes that. Every kitchen on the platform publishes its daily and weekly menu, its
            pricing and its delivery area. Customers rate food quality, hygiene and delivery separately, so
            ratings actually mean something. Verified kitchens complete FSSAI and identity checks before going
            live.
          </p>
          <p>
            Laundry came next for the same reason. Local laundries do excellent work but have no easy way to
            take scheduled orders online. Today customers can book a pickup slot, track their clothes through
            washing and quality check, and get everything delivered back in 24 to 72 hours.
          </p>
          <p>
            We take a 12% commission and nothing else. The rest goes to the people who cook the food and press
            the clothes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map(([value, label]) => (
            <div key={label} className="surface-card p-5">
              <p className="font-display text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="surface-card mt-10 flex flex-wrap items-center justify-between gap-4 p-7">
          <p className="font-display text-lg font-semibold">Want to work with us or list your business?</p>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/partner">Become a Partner</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
