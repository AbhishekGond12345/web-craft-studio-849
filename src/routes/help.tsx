import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — Raise a Ticket | TiffinConnect" },
      {
        name: "description",
        content:
          "Get help with orders, subscriptions, refunds and laundry pickups. Raise a support ticket and track its status.",
      },
      { property: "og:title", content: "Help & Support | TiffinConnect" },
      { property: "og:description", content: "Support topics, ticket status and a direct line to our team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});

const topics = [
  ["Order issues", "Late delivery, wrong meal, missing items"],
  ["Subscriptions", "Pause, skip, renew or cancel a plan"],
  ["Payments & refunds", "Failed payments, wallet credits, refunds"],
  ["Laundry", "Pickup delays, damaged or missing garments"],
  ["Account", "Login, addresses, notifications"],
  ["Partners", "Listing, payouts, verification"],
];

const tickets = [
  { id: "TKT-8821", subject: "Dinner not delivered on 12 Sep", status: "Resolved" },
  { id: "TKT-8905", subject: "Refund pending for laundry order", status: "In progress" },
];

function Help() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Help & Support" title="How can we help you today?" subtitle="Browse a topic or raise a ticket and our team will respond within a few hours." />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(([title, text]) => (
            <div key={title} className="surface-card p-6 hover:-translate-y-1">
              <h2 className="font-display text-base font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-xl font-semibold">Raise a support ticket</h2>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Ticket created. We will update you by SMS.");
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="t-order">Order ID</Label>
                <Input id="t-order" placeholder="TC-TIF-48219" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-subject">Subject</Label>
                <Input id="t-subject" placeholder="Meal was cold on arrival" className="rounded-xl" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-detail">Describe the issue</Label>
                <Textarea id="t-detail" rows={5} className="rounded-xl" required />
              </div>
              <Button type="submit" size="lg">
                Submit ticket
              </Button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="surface-card p-6">
              <h2 className="font-display text-lg font-semibold">Your tickets</h2>
              <ul className="mt-4 divide-y divide-border">
                {tickets.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-medium">{t.subject}</p>
                      <p className="text-xs text-muted-foreground">{t.id}</p>
                    </div>
                    <Badge variant={t.status === "Resolved" ? "secondary" : "default"}>{t.status}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h2 className="font-display text-lg font-semibold">Prefer to talk?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Call +91 80 4718 2200 between 7:00 AM and 11:00 PM, any day of the week.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/contact">Contact page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
