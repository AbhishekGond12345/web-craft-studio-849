import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarX2, Check, PauseCircle, RefreshCw, Truck, Utensils } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { rupees } from "@/data/marketplace";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Tiffin Subscription Plans — Daily, Weekly & Monthly | TiffinConnect" },
      {
        name: "description",
        content:
          "Choose a daily, weekly or monthly tiffin plan from ₹100 a day. Pause, skip a day, change address or meal preference anytime.",
      },
      { property: "og:title", content: "Tiffin Subscription Plans | TiffinConnect" },
      {
        property: "og:description",
        content: "Daily, weekly and monthly meal plans with pause, skip and auto-renewal built in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Plans,
});

const plans = [
  {
    id: "daily",
    name: "Daily Plan",
    price: { lunch: 100, dinner: 100, both: 190, custom: 140 },
    period: "per day",
    tag: "",
    features: ["Order any day, no commitment", "Choose your kitchen each day", "Pay per meal", "Free delivery above ₹150"],
  },
  {
    id: "weekly",
    name: "Weekly Plan",
    price: { lunch: 650, dinner: 650, both: 1200, custom: 900 },
    period: "per week",
    tag: "Most flexible",
    features: ["6 days a week delivery", "Skip up to 2 days", "Change meal preference weekly", "Free delivery"],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: { lunch: 2500, dinner: 2500, both: 4600, custom: 3400 },
    period: "per month",
    tag: "Best value",
    features: [
      "26 days of meals",
      "Pause subscription anytime",
      "Skip days and extend validity",
      "Priority delivery slot",
      "Free delivery + festival specials",
    ],
  },
];

const mealOptions = [
  { id: "lunch", label: "Lunch only" },
  { id: "dinner", label: "Dinner only" },
  { id: "both", label: "Lunch + Dinner" },
  { id: "custom", label: "Custom meal plan" },
] as const;

const controls = [
  { icon: PauseCircle, title: "Pause subscription", text: "Travelling or home for a week? Pause and resume with one tap." },
  { icon: CalendarX2, title: "Skip a day", text: "Skip before 9 PM the previous night and your plan extends by a day." },
  { icon: Truck, title: "Change delivery address", text: "Switch between home, hostel and office addresses per delivery." },
  { icon: Utensils, title: "Change meal preference", text: "Move between veg, jain, low-oil or high-protein meals monthly." },
  { icon: RefreshCw, title: "Automatic renewal", text: "Plans renew on the last day. Turn it off anytime from your dashboard." },
  { icon: Check, title: "Delivery schedule", text: "Pick a 30-minute delivery window that matches your routine." },
];

function Plans() {
  const [meal, setMeal] = useState<(typeof mealOptions)[number]["id"]>("lunch");

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Subscription Plans"
        title="Meal plans that fit your routine and budget"
        subtitle="Start with a single day or save up to 22% with a monthly plan. Every plan can be paused, skipped or changed."
      >
        <div className="inline-flex flex-wrap gap-1.5 rounded-full bg-card p-1.5 shadow-[var(--shadow-soft)]">
          {mealOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMeal(option.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                meal === option.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = plan.price[meal];
            const monthlyEquivalent = plan.id === "daily" ? price * 26 : plan.id === "weekly" ? price * 4 : price;
            const saving = plan.id === "monthly" ? plans[0]!.price[meal] * 26 - price : 0;
            return (
              <article
                key={plan.id}
                className={`surface-card flex flex-col p-7 ${plan.id === "monthly" ? "ring-2 ring-primary" : ""}`}
              >
                {plan.tag && (
                  <span className="mb-3 w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold">
                    {plan.tag}
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{plan.name}</h2>
                <p className="mt-3 font-display text-4xl font-bold">{rupees(price)}</p>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  ≈ {rupees(monthlyEquivalent)} per month for {mealOptions.find((m) => m.id === meal)?.label.toLowerCase()}
                </p>
                {saving > 0 && (
                  <p className="mt-2 text-sm font-semibold text-primary">You save {rupees(saving)} a month</p>
                )}
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-7"
                  size="lg"
                  variant={plan.id === "monthly" ? "default" : "outline"}
                  asChild
                >
                  <Link to="/checkout" search={{ plan: plan.id }}>
                    Choose {plan.name}
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Full control over your subscription</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <div key={c.title} className="surface-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                  <c.icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
