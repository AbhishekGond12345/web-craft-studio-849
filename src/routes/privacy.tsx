import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | TiffinConnect" },
      {
        name: "description",
        content:
          "How TiffinConnect collects, uses, shares and protects your personal data, including delivery addresses and payment information.",
      },
      { property: "og:title", content: "Privacy Policy | TiffinConnect" },
      { property: "og:description", content: "What data we collect, why we collect it and your rights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  ["Information we collect", "Your name, mobile number, email, delivery addresses, order history, food preferences and device information. Payment details are processed by our payment partner and never stored on our servers."],
  ["How we use it", "To place and deliver your orders, run subscriptions, recommend providers near you, prevent fraud and send order and offer notifications."],
  ["Sharing with partners", "Providers and delivery partners receive only the details needed to fulfil your order: your name, phone number, delivery address and order contents."],
  ["Location data", "We use your area or pincode to show providers who deliver to you. Precise location is used only while a delivery is in progress."],
  ["Data retention", "Order records are retained for seven years for tax purposes. You can delete your account anytime; personal identifiers are removed within 30 days."],
  ["Your rights", "You can access, correct or export your data, withdraw marketing consent and request deletion by writing to privacy@tiffinconnect.in."],
  ["Security", "Data is encrypted in transit and at rest. Access to customer records is restricted to authorised support staff and is logged."],
  ["Contact", "For any privacy question, email privacy@tiffinconnect.in or write to our Pune office at 3rd Floor, Sai Capital, Baner Road, Pune 411045."],
];

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated 1 September 2026" />
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
