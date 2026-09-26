import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TiffinConnect — Support, Sales & Partnerships" },
      {
        name: "description",
        content:
          "Reach the TiffinConnect team by phone, email or the contact form for order support, partnerships and press enquiries.",
      },
      { property: "og:title", content: "Contact TiffinConnect" },
      { property: "og:description", content: "Support hours, phone, email and our Pune office address." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const details = [
  { icon: Phone, label: "Customer support", value: "+91 80 4718 2200" },
  { icon: Mail, label: "Email", value: "support@tiffinconnect.in" },
  { icon: MapPin, label: "Office", value: "3rd Floor, Sai Capital, Baner Road, Pune 411045" },
  { icon: Clock, label: "Support hours", value: "Every day, 7:00 AM to 11:00 PM IST" },
];

function Contact() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact Us" title="We are here to help" subtitle="Most order issues are resolved within an hour." />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="surface-card p-7">
          <h2 className="font-display text-xl font-semibold">Send us a message</h2>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent. We will reply within one working day.");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="c-name">Your name</Label>
                <Input id="c-name" className="rounded-xl" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-phone">Mobile number</Label>
                <Input id="c-phone" className="rounded-xl" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" className="rounded-xl" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-order">Order ID (optional)</Label>
              <Input id="c-order" placeholder="TC-TIF-48219" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-message">How can we help?</Label>
              <Textarea id="c-message" rows={5} className="rounded-xl" required />
            </div>
            <Button type="submit" size="lg">
              Send message
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          {details.map((d) => (
            <div key={d.label} className="surface-card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                <d.icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{d.label}</p>
                <p className="mt-1 font-medium">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
