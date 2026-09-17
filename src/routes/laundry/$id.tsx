import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, MapPin, PackageCheck, Timer } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RatingStars } from "@/components/site/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLaundry } from "@/data/marketplace";

export const Route = createFileRoute("/laundry/$id")({
  loader: ({ params }) => {
    const provider = getLaundry(params.id);
    if (!provider) throw notFound();
    return provider;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Laundry partner"} — Services & Pricing | TiffinConnect` },
      { name: "description", content: loaderData?.about ?? "Laundry services, pricing and pickup slots." },
      { property: "og:title", content: `${loaderData?.name ?? "Laundry partner"} | TiffinConnect` },
      { property: "og:description", content: loaderData?.about ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LaundryDetail,
});

function LaundryDetail() {
  const provider = Route.useLoaderData();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="surface-card p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">{provider.name}</h1>
                {provider.verified && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </Badge>
                )}
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {provider.area} · {provider.distanceKm} km away
              </p>
              <div className="mt-3">
                <RatingStars rating={provider.rating} reviews={provider.reviews} />
              </div>
            </div>
            <Button size="lg" asChild>
              <Link to="/laundry/book" search={{ provider: provider.id }}>
                Book Laundry Pickup
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{provider.about}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/70 p-4">
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Timer className="h-4 w-4" /> Pickup
              </p>
              <p className="mt-1 font-medium">{provider.pickup}</p>
            </div>
            <div className="rounded-xl bg-muted/70 p-4">
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <PackageCheck className="h-4 w-4" /> Delivery
              </p>
              <p className="mt-1 font-medium">{provider.delivery}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-bold">Services and pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {provider.services.map((s) => (
            <div key={s.name} className="surface-card flex items-center justify-between gap-3 p-5">
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.note}</p>
              </div>
              <p className="font-display text-lg font-bold">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
