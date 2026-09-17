import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MapPin,
  Search,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProviderCard } from "@/components/site/ProviderCard";
import { LaundryCard } from "@/components/site/LaundryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { laundryProviders, tiffinProviders } from "@/data/marketplace";
import heroTiffin from "@/assets/hero-tiffin.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TiffinConnect — Fresh Homemade Tiffin & Laundry in Pune" },
      {
        name: "description",
        content:
          "Discover trusted local tiffin providers, subscribe to daily or monthly meal plans and schedule doorstep laundry pickup with TiffinConnect.",
      },
      { property: "og:title", content: "TiffinConnect — Fresh Homemade Tiffin & Laundry in Pune" },
      {
        property: "og:description",
        content:
          "Home-cooked meals delivered daily and laundry picked up from your door. One platform for both.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  {
    icon: UtensilsCrossed,
    title: "Daily Tiffin",
    text: "Fresh homemade meals cooked in small batches and delivered hot, every single day.",
    to: "/tiffin",
    cta: "Browse kitchens",
  },
  {
    icon: CalendarCheck,
    title: "Monthly Meal Plans",
    text: "Affordable subscriptions for students, working professionals and families. Pause or skip anytime.",
    to: "/plans",
    cta: "See plans",
  },
  {
    icon: Shirt,
    title: "Laundry Services",
    text: "Pickup, wash, iron, dry clean and doorstep delivery from verified laundry partners.",
    to: "/laundry",
    cta: "Explore laundry",
  },
];

const steps = [
  { title: "Tell us your location", text: "Enter your area or pincode to see providers who deliver to you." },
  { title: "Compare and choose", text: "Check menus, prices, ratings and real reviews before you commit." },
  { title: "Pick a plan", text: "Order a single meal or subscribe daily, weekly or monthly." },
  { title: "Track till the doorstep", text: "Live status updates from kitchen to delivery, every day." },
];

const trust = [
  { icon: BadgeCheck, label: "Verified kitchens", value: "420+" },
  { icon: Wallet, label: "Avg. monthly saving", value: "₹1,800" },
  { icon: Sparkles, label: "Meals delivered", value: "2.1 lakh" },
  { icon: MapPin, label: "Areas served in Pune", value: "36" },
];

function Home() {
  const [service, setService] = useState("tiffin");

  return (
    <SiteLayout>
      <section className="hero-glow">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Your Daily Meal &amp; Laundry, All in One Place
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Fresh Homemade Meals, <span className="text-primary">Delivered to Your Door.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Discover trusted local tiffin providers, choose your perfect meal plan and get fresh food
              delivered every day.
            </p>

            <div className="surface-card mt-8 grid gap-3 p-4 sm:grid-cols-[1.1fr_1.1fr_auto]">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground" htmlFor="service">
                  What are you looking for?
                </label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger id="service" className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiffin">Tiffin Service</SelectItem>
                    <SelectItem value="plan">Monthly Meal Plan</SelectItem>
                    <SelectItem value="laundry">Laundry Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground" htmlFor="location">
                  Enter your location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    defaultValue="Kothrud, Pune"
                    className="h-11 rounded-xl pl-9"
                    placeholder="Area or pincode"
                  />
                </div>
              </div>
              <Button size="lg" asChild className="self-end">
                <Link to={service === "laundry" ? "/laundry" : service === "plan" ? "/plans" : "/tiffin"}>
                  <Search className="h-4 w-4" />
                  Search
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/tiffin">
                  Find Tiffin <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="hero" asChild>
                <Link to="/laundry">Explore Laundry</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroTiffin}
              alt="Fresh Indian thali with dal, rice, roti, sabzi and salad in a steel tiffin"
              width={1408}
              height={1008}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="surface-card absolute -bottom-6 left-4 hidden gap-3 p-4 sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold">Today&apos;s lunch is on the way</p>
                <p className="text-xs text-muted-foreground">Maa Kitchen · arriving by 1:10 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.label} className="surface-card flex items-center gap-3 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                <t.icon className="h-5 w-5 text-accent" />
              </span>
              <div>
                <p className="font-display text-xl font-bold">{t.value}</p>
                <p className="text-xs text-muted-foreground">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">Everything You Need, In One Place</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Food and laundry are the two chores that eat your week. TiffinConnect handles both with local,
          verified partners.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="surface-card group p-7 hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
                <s.icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              <Link
                to={s.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                {s.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Top rated tiffin kitchens near you</h2>
            <p className="mt-2 text-muted-foreground">Recommended for Kothrud based on ratings and distance.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tiffin">View all kitchens</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tiffinProviders.slice(0, 3).map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">How TiffinConnect works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="surface-card p-6">
                <span className="font-display text-3xl font-bold text-primary/30">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Laundry partners ready for pickup</h2>
            <p className="mt-2 text-muted-foreground">Wash, iron and dry clean with 24 to 72 hour turnaround.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/laundry">See all laundry services</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {laundryProviders.slice(0, 3).map((p) => (
            <LaundryCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="surface-card hero-glow flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Run a kitchen or laundry service?</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              List your business free, get verified and start receiving subscription orders from customers in
              your area within 48 hours.
            </p>
          </div>
          <Button size="lg" variant="hero" asChild>
            <Link to="/partner">Become a Partner</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
