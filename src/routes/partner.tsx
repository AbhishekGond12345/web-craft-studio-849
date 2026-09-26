import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, IndianRupee, LineChart, Users } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Become a Partner — List Your Tiffin or Laundry Business | TiffinConnect" },
      {
        name: "description",
        content:
          "List your home kitchen or laundry service free on TiffinConnect, get verified and start receiving subscription orders in 48 hours.",
      },
      { property: "og:title", content: "Become a TiffinConnect Partner" },
      { property: "og:description", content: "Free listing, verified badge and steady subscription orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partner,
});

const benefits = [
  { icon: Users, title: "Ready customers", text: "38,000+ customers already order daily meals and laundry in your city." },
  { icon: IndianRupee, title: "Predictable income", text: "Monthly subscriptions mean steady revenue instead of one-off orders." },
  { icon: BadgeCheck, title: "Verified badge", text: "Complete KYC and FSSAI checks once to earn customer trust." },
  { icon: LineChart, title: "Business tools", text: "Menus, pricing, delivery areas, analytics and payouts in one dashboard." },
];

function Partner() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Become a Partner"
        title="Grow your kitchen or laundry business with TiffinConnect"
        subtitle="Free listing. No setup fee. You keep control of your menu, pricing and delivery area."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="surface-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                <b.icon className="h-5 w-5 text-primary" />
              </span>
              <h2 className="mt-4 font-display text-base font-semibold">{b.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-xl font-semibold">Register your business</h2>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Application received. Our team will call you within 24 hours.");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="biz-name">Business name</Label>
                  <Input id="biz-name" placeholder="Ghar Ka Swad" className="rounded-xl" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="owner">Owner name</Label>
                  <Input id="owner" placeholder="Rekha Sharma" className="rounded-xl" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="biz-phone">Mobile number</Label>
                  <Input id="biz-phone" placeholder="+91 90280 77341" className="rounded-xl" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="biz-type">Service type</Label>
                  <Input id="biz-type" placeholder="Tiffin / Laundry" className="rounded-xl" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biz-area">Delivery areas / pincodes</Label>
                <Input id="biz-area" placeholder="Viman Nagar, Kharadi, 411014" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biz-about">Tell us about your food or services</Label>
                <Textarea id="biz-about" rows={4} className="rounded-xl" placeholder="Daily veg thali, 40 orders capacity..." />
              </div>
              <Button type="submit" size="lg">
                Submit application
              </Button>
            </form>
          </div>

          <div className="surface-card p-7">
            <h2 className="font-display text-xl font-semibold">How onboarding works</h2>
            <ol className="mt-6 space-y-6">
              {[
                ["Apply in 2 minutes", "Share your business details and delivery areas."],
                ["Verification call", "We check FSSAI or Shop Act documents and identity proof."],
                ["Set up your listing", "Upload your logo, add menus, pricing plans and timings."],
                ["Go live", "Start receiving orders. Payouts are settled every Monday."],
              ].map(([title, text], i) => (
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
            <div className="mt-8 rounded-2xl bg-muted/70 p-5 text-sm text-muted-foreground">
              Commission is 12% per order with no monthly fee. Cancel your listing anytime.
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
