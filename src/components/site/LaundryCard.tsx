import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, PackageCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./RatingStars";
import { rupees, type LaundryProvider } from "@/data/marketplace";

export function LaundryCard({ provider }: { provider: LaundryProvider }) {
  return (
    <article className="surface-card flex flex-col gap-4 p-6 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{provider.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {provider.area} · {provider.distanceKm} km away
          </p>
        </div>
        {provider.verified && (
          <Badge variant="secondary" className="gap-1">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Verified
          </Badge>
        )}
      </div>

      <RatingStars rating={provider.rating} reviews={provider.reviews} />

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-muted/70 p-3">
          <p className="inline-flex items-center gap-1 text-muted-foreground">
            <Timer className="h-3.5 w-3.5" /> Pickup
          </p>
          <p className="mt-1 font-medium">{provider.pickup}</p>
        </div>
        <div className="rounded-xl bg-muted/70 p-3">
          <p className="inline-flex items-center gap-1 text-muted-foreground">
            <PackageCheck className="h-3.5 w-3.5" /> Delivery
          </p>
          <p className="mt-1 font-medium">{provider.delivery}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {provider.services.slice(0, 4).map((s) => (
          <span key={s.name} className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium">
            {s.name} · {s.price}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <p className="text-sm">
          <span className="text-xs text-muted-foreground">Starts at </span>
          <span className="font-display text-xl font-bold">{rupees(provider.startingPrice)}</span>
          <span className="text-xs text-muted-foreground">/kg</span>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/laundry/$id" params={{ id: provider.id }}>
              Details
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/laundry/book" search={{ provider: provider.id }}>
              Book Pickup
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
