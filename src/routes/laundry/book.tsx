import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, PartyPopper } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { laundryProviders, rupees } from "@/data/marketplace";

type BookSearch = { provider?: string };

export const Route = createFileRoute("/laundry/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    provider: typeof search.provider === "string" ? search.provider : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Laundry Pickup | TiffinConnect" },
      {
        name: "description",
        content:
          "Pick your laundry partner and services, choose a pickup date and slot, and pay by UPI, card or cash on delivery.",
      },
      { property: "og:title", content: "Book a Laundry Pickup | TiffinConnect" },
      { property: "og:description", content: "Schedule doorstep laundry pickup in under a minute." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookLaundry,
});

const steps = ["Provider", "Services", "Pickup", "Address & Payment"];

function BookLaundry() {
  const search = Route.useSearch();
  const [providerId, setProviderId] = useState(search.provider ?? laundryProviders[0]!.id);
  const [step, setStep] = useState(search.provider ? 1 : 0);
  const [services, setServices] = useState<string[]>(["Wash & Fold"]);
  const [kg, setKg] = useState(5);
  const [pieces, setPieces] = useState(0);
  const [payment, setPayment] = useState("upi");
  const [booked, setBooked] = useState(false);

  const provider = laundryProviders.find((p) => p.id === providerId)!;
  const estimate = services.length * (kg * provider.startingPrice) + pieces * 10;
  const orderId = "TC-LAU-20981";

  const toggleService = (name: string) =>
    setServices((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));

  if (booked) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="surface-card p-8 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
              <PartyPopper className="h-8 w-8 text-accent" />
            </span>
            <h1 className="mt-5 text-3xl font-bold">Pickup scheduled!</h1>
            <p className="mt-2 text-muted-foreground">{provider.name} will collect your laundry as planned.</p>
            <dl className="mt-7 grid gap-3 text-left">
              {[
                ["Laundry Order ID", orderId],
                ["Pickup date", "17 September 2026"],
                ["Pickup time", "6:00 PM - 8:00 PM"],
                ["Expected delivery", "19 September 2026"],
                ["Services", services.join(", ") || "Wash & Fold"],
                ["Estimated amount", rupees(estimate)],
                ["Payment status", payment === "cod" ? "Pay on delivery" : "Paid"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 rounded-xl bg-muted/70 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/track/$id" params={{ id: orderId }}>
                  Track laundry order
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/laundry">Back to laundry</Link>
              </Button>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Laundry Booking" title="Book a laundry pickup" subtitle="Four quick steps and a delivery partner is on the way." />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ol className="mb-8 flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                      ? "bg-primary-soft text-secondary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : <span>{i + 1}</span>}
                {s}
              </button>
            </li>
          ))}
        </ol>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="surface-card p-7">
            {step === 0 && (
              <div className="grid gap-3">
                <h2 className="font-display text-xl font-semibold">Select a laundry provider</h2>
                {laundryProviders.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProviderId(p.id)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      providerId === p.id ? "border-primary bg-primary-soft/50" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.area} · pickup {p.pickup.toLowerCase()}
                      </p>
                    </div>
                    <p className="font-display font-bold">{rupees(p.startingPrice)}/kg</p>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold">Select services</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {provider.services.map((s) => (
                    <label
                      key={s.name}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border p-4 transition-colors hover:bg-secondary"
                    >
                      <span className="flex items-center gap-3">
                        <Checkbox
                          checked={services.includes(s.name)}
                          onCheckedChange={() => toggleService(s.name)}
                        />
                        <span>
                          <span className="block text-sm font-medium">{s.name}</span>
                          <span className="block text-xs text-muted-foreground">{s.note}</span>
                        </span>
                      </span>
                      <span className="text-sm font-semibold">{s.price}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="kg">Approximate weight (kg)</Label>
                    <Input
                      id="kg"
                      type="number"
                      min={1}
                      value={kg}
                      onChange={(e) => setKg(Math.max(1, Number(e.target.value)))}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pieces">Pieces for ironing / dry clean</Label>
                    <Input
                      id="pieces"
                      type="number"
                      min={0}
                      value={pieces}
                      onChange={(e) => setPieces(Math.max(0, Number(e.target.value)))}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <h2 className="font-display text-xl font-semibold">Pickup date and time</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="date">Pickup date</Label>
                    <Input id="date" type="date" defaultValue="2026-09-17" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="time">Pickup slot</Label>
                    <Input id="time" defaultValue="6:00 PM - 8:00 PM" className="rounded-xl" />
                  </div>
                </div>
                <p className="rounded-xl bg-muted/70 p-4 text-sm text-muted-foreground">
                  Expected delivery: {provider.delivery} after pickup. You will get a message before the partner
                  arrives.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <h2 className="font-display text-xl font-semibold">Address and payment</h2>
                <div className="space-y-1.5">
                  <Label htmlFor="laundry-address">Pickup address</Label>
                  <Textarea
                    id="laundry-address"
                    rows={3}
                    defaultValue="Flat 402, Sai Residency, Lane 5, Kothrud, Pune 411038"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "upi", label: "UPI" },
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "netbanking", label: "Net Banking" },
                    { id: "cod", label: "Cash on Delivery" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPayment(p.id)}
                      className={`rounded-2xl border p-4 text-left text-sm font-medium transition-colors ${
                        payment === p.id ? "border-primary bg-primary-soft/50" : "border-border hover:bg-secondary"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-7" />
            <div className="flex justify-between gap-3">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
              ) : (
                <Button size="lg" onClick={() => setBooked(true)}>
                  Confirm booking
                </Button>
              )}
            </div>
          </div>

          <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-semibold">Booking summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Provider</dt>
                <dd className="text-right font-medium">{provider.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Services</dt>
                <dd className="text-right font-medium">{services.length || 0}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Weight</dt>
                <dd className="font-medium">{kg} kg</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Pieces</dt>
                <dd className="font-medium">{pieces}</dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium">Estimate</span>
              <span className="font-display text-2xl font-bold">{rupees(estimate)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Final amount is confirmed after weighing at pickup.
            </p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
