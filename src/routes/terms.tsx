import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | TiffinConnect" },
      {
        name: "description",
        content:
          "The terms that govern use of TiffinConnect, including orders, subscriptions, cancellations, refunds and partner obligations.",
      },
      { property: "og:title", content: "Terms & Conditions | TiffinConnect" },
      { property: "og:description", content: "Orders, subscriptions, cancellations, refunds and partner terms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

const sections = [
  ["1. Using TiffinConnect", "TiffinConnect is a marketplace that connects customers with independent tiffin and laundry businesses. We facilitate discovery, ordering and payment; food preparation and laundry work are carried out by the partner you select."],
  ["2. Accounts", "You must provide accurate contact details and a valid Indian mobile number. You are responsible for activity on your account. Partner accounts additionally require FSSAI or Shop Act registration where applicable."],
  ["3. Orders and subscriptions", "Daily orders must be placed before the provider's cut-off time. Subscription plans run for the number of delivery days stated in the plan. Skipped days extend plan validity for up to 60 days."],
  ["4. Pricing and payment", "All prices are in Indian Rupees and include applicable taxes. We accept UPI, cards, net banking, wallet balance and cash on delivery. Cash on delivery may be unavailable for high-value subscriptions."],
  ["5. Cancellations and refunds", "A single meal can be cancelled before preparation begins. Subscriptions can be cancelled anytime; unused days are refunded to your wallet within seven working days. Verified quality complaints are refunded in full."],
  ["6. Partner obligations", "Partners must maintain hygiene standards, honour published menus and pricing, and deliver within the stated window. Repeated verified complaints can lead to suspension of the listing."],
  ["7. Liability", "TiffinConnect is not liable for indirect losses. Our aggregate liability for any order is limited to the amount you paid for that order."],
  ["8. Changes to these terms", "We may update these terms and will notify you in the app and by email at least seven days before changes take effect."],
];

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated 1 September 2026" />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {sections.map(([title, text]) => (
            <article key={title}>
              <h2 className="font-display text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
