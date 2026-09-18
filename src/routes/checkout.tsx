import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Landmark, PartyPopper, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { rupees, tiffinProviders } from "@/data/marketplace";

type CheckoutSearch = { provider?: string; plan?: string; qty?: number };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    provider: typeof search.provider === "string" ? search.provider : undefined,
    plan: typeof search.plan === "string" ? search.plan : undefined,
    qty: Number(search.qty) > 0 ? Number(search.qty) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Book Your Tiffin Plan | TiffinConnect" },
      {
        name: "description",
        content:
          "Complete your tiffin booking in five steps: meal, plan, delivery address, schedule and payment by UPI, card, net banking or cash.",
      },
      { property: "og:title", content: "Checkout | TiffinConnect" },
      { property: "og:description", content: "Secure five-step checkout for your tiffin subscription." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const steps = ["Select Meal", "Select Plan", "Delivery Address", "Delivery Schedule", "Payment"];

const payments = [
  { id: "upi", label: "UPI (GPay, PhonePe, Paytm)", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", icon: Wallet },
];

function Checkout() {
  const search = Route.useSearch();
  const provider = tiffinProviders.find((p) => p.id === search.provider) ?? tiffinProviders[0]!;

  const [step, setStep] = useState(0);
  const [meal, setMeal] = useState(provider.todaysMenu[0]!.meal);
  const [planId, setPlanId] = useState(search.plan ?? "monthly");
  const [quantity, setQuantity] = useState(search.qty ?? 1);
  const [payment, setPayment] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placed, setPlaced] = useState(false);

  const plan = provider.plans.find((p) => p.id === planId) ?? provider.plans[0]!;
  const deliveryFee = plan.id === "daily" ? 25 : 0;
  const total = plan.price * quantity + deliveryFee - discount;
  const orderId = `TC-TIF-${48220 + provider.name.length}`;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FIRST50") {
      setDiscount(50);
      toast.success("Coupon FIRST50 applied — ₹50 off");
    } else if (coupon.trim().toUpperCase() === "MONTHLY10") {
      setDiscount(Math.min(300, Math.round(plan.price * 0.1)));
      toast.success("Coupon MONTHLY10 applied");
    } else {
      setDiscount(0);
      toast.error("That coupon code is not valid");
    }
  };

  if (placed) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="surface-card p-8 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft">
              <PartyPopper className="h-8 w-8 text-primary" />
            </span>
            <h1 className="mt-5 text-3xl font-bold">Your Tiffin Has Been Booked!</h1>
            <p className="mt-2 text-muted-foreground">
              A confirmation has been sent to your registered mobile number.
            </p>

            <dl className="mt-7 grid gap-3 text-left">
              {[
                ["Order ID", orderId],
                ["Provider", provider.name],
                ["Plan", `${plan.name} · ${plan.meals}`],
                ["First delivery date", "17 September 2026"],
                ["Delivery time", meal === "Dinner" ? "7:30 PM - 9:00 PM" : "12:00 PM - 1:30 PM"],
                ["Address", "Flat 402, Sai Residency, Kothrud, Pune 411038"],
                ["Payment status", payment === "cod" ? "Pay on delivery" : "Paid"],
                ["Amount", rupees(total)],
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
                  Track this order
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Checkout" title="Complete your booking" subtitle={`Ordering from ${provider.name}, ${provider.area}`} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="surface-card p-7">
            {step === 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold">Select your meal</h2>
                <div className="mt-5 grid gap-3">
                  {provider.todaysMenu.map((m) => (
                    <button
                      key={m.meal}
                      type="button"
                      onClick={() => setMeal(m.meal)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        meal === m.meal ? "border-primary bg-primary-soft/50" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">{m.meal}</p>
                        <p className="font-display font-bold">{rupees(m.price)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{m.items.join(" · ")}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Delivery {m.time}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <Label htmlFor="qty">Number of tiffins</Label>
                  <Input
                    id="qty"
                    type="number"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-24 rounded-xl"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold">Select your plan</h2>
                <div className="mt-5 grid gap-3">
                  {provider.plans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanId(p.id)}
                      className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${
                        planId === p.id ? "border-primary bg-primary-soft/50" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.meals}</p>
                        {p.save && <p className="mt-1 text-xs font-semibold text-primary">{p.save}</p>}
                      </div>
                      <p className="font-display text-lg font-bold">
                        {rupees(p.price)}
                        <span className="block text-xs font-normal text-muted-foreground">{p.period}</span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <h2 className="font-display text-xl font-semibold">Delivery address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" defaultValue="Aarav Mehta" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="mobile">Mobile number</Label>
                    <Input id="mobile" defaultValue="+91 98765 43210" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    defaultValue="Flat 402, Sai Residency, Lane 5, Kothrud, Pune 411038"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Home", "Hostel", "Office", "Other"].map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <h2 className="font-display text-xl font-semibold">Delivery schedule</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="start">Start date</Label>
                    <Input id="start" type="date" defaultValue="2026-09-17" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="slot">Preferred time slot</Label>
                    <Input
                      id="slot"
                      defaultValue={meal === "Dinner" ? "7:30 PM - 8:00 PM" : "12:30 PM - 1:00 PM"}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <p className="rounded-xl bg-muted/70 p-4 text-sm text-muted-foreground">
                  Deliveries run Monday to Saturday. Skip a day before 9 PM the previous night and your plan
                  automatically extends.
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-xl font-semibold">Payment method</h2>
                <RadioGroup value={payment} onValueChange={setPayment} className="mt-5 grid gap-3">
                  {payments.map((p) => (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                        payment === p.id ? "border-primary bg-primary-soft/50" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <RadioGroupItem value={p.id} id={p.id} />
                      <p.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{p.label}</span>
                    </label>
                  ))}
                </RadioGroup>
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
                <Button size="lg" onClick={() => setPlaced(true)}>
                  Pay {rupees(total)}
                </Button>
              )}
            </div>
          </div>

          <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Provider</dt>
                <dd className="font-medium">{provider.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Meal plan</dt>
                <dd className="text-right font-medium">
                  {plan.name} · {meal}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Quantity</dt>
                <dd className="font-medium">{quantity}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Delivery fee</dt>
                <dd className="font-medium">{deliveryFee === 0 ? "Free" : rupees(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Discount</dt>
                <dd className="font-medium text-primary">- {rupees(discount)}</dd>
              </div>
            </dl>

            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-display text-2xl font-bold">{rupees(total)}</span>
            </div>

            <div className="mt-5 flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="rounded-xl"
                aria-label="Coupon code"
              />
              <Button variant="outline" onClick={applyCoupon}>
                Apply
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Try FIRST50 or MONTHLY10</p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
