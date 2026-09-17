import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, Shirt, Sparkles, Timer, WashingMachine } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LaundryCard } from "@/components/site/LaundryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { laundryProviders } from "@/data/marketplace";
import heroLaundry from "@/assets/hero-laundry.jpg";

export const Route = createFileRoute("/laundry/")({
  head: () => ({
    meta: [
      { title: "Laundry Services Near You — Wash, Iron & Dry Clean | TiffinConnect" },
      {
        name: "description",
        content:
          "Schedule laundry pickup in minutes. Wash & fold from ₹45/kg, ironing from ₹7/piece and dry cleaning from verified Pune laundry partners.",
      },
      { property: "og:title", content: "Laundry Services Near You | TiffinConnect" },
      {
        property: "og:description",
        content: "Pickup, wash, iron and doorstep delivery from verified laundry partners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Laundry,
});

const serviceCatalogue = [
  { name: "Wash & Fold", price: "from ₹45/kg", icon: WashingMachine },
  { name: "Wash & Iron", price: "from ₹60/kg", icon: Shirt },
  { name: "Ironing", price: "from ₹7/piece", icon: Sparkles },
  { name: "Dry Cleaning", price: "from ₹120/piece", icon: Shirt },
  { name: "Premium Cleaning", price: "from ₹350/piece", icon: Sparkles },
  { name: "Shoe Cleaning", price: "from ₹249/pair", icon: WashingMachine },
  { name: "Blanket Cleaning", price: "from ₹249/piece", icon: Shirt },
  { name: "Curtain Cleaning", price: "from ₹220/panel", icon: Sparkles },
];

function Laundry() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return laundryProviders;
    return laundryProviders.filter(
      (p) => p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SiteLayout>
      <section className="hero-glow border-b border-border/70">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Laundry Marketplace</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Laundry Made Simple.</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Schedule pickup, choose your services and get fresh, clean clothes delivered back to your doorstep.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by area or laundry name"
                  className="h-12 rounded-xl pl-9"
                  aria-label="Search laundry providers"
                />
              </div>
              <Button size="lg" asChild>
                <Link to="/laundry/book">
                  <Search className="h-4 w-4" /> Book Laundry Pickup
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-primary" /> Pickup in 90 minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" /> Free re-wash guarantee
              </span>
            </div>
          </div>
          <img
            src={heroLaundry}
            alt="Neatly folded fresh laundry in a basket"
            loading="lazy"
            width={1408}
            height={1008}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Services and pricing</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCatalogue.map((s) => (
            <div key={s.name} className="surface-card flex items-center gap-3 p-5 hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                <s.icon className="h-5 w-5 text-accent" />
              </span>
              <div>
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {results.length} laundry partners near you
        </h2>
        {results.length === 0 ? (
          <div className="surface-card mt-6 p-12 text-center">
            <h3 className="font-display text-lg font-semibold">No partners found in that area</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try a nearby area such as Baner, Kothrud or Katraj.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => (
              <LaundryCard key={p.id} provider={p} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
