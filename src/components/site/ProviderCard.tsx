import { Link } from "@tanstack/react-router";
import { BadgeCheck, Bike, Clock, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./RatingStars";
import { rupees, type TiffinProvider } from "@/data/marketplace";

export function ProviderCard({ provider }: { provider: TiffinProvider }) {
  const today = provider.todaysMenu[0];

  return (
    <article className="surface-card group flex flex-col overflow-hidden hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <img
          src={provider.image}
          alt={`${provider.name} home-cooked meal`}
          loading="lazy"
          width={1008}
          height={704}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className={provider.veg === "Pure Veg" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
            {provider.veg}
          </Badge>
          {provider.verified && (
            <Badge variant="secondary" className="gap-1">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Verified
            </Badge>
          )}
        </div>
        <button
          type="button"
          aria-label={`Save ${provider.name} to favourites`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-muted-foreground transition-colors hover:text-accent"
        >
          <Heart className="h-4 w-4" />
        </button>
        {provider.availability !== "Available" && (
          <span className="absolute bottom-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-destructive">
            {provider.availability}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{provider.name}</h3>
            <p className="text-xs text-muted-foreground">{provider.cuisine}</p>
          </div>
          <RatingStars rating={provider.rating} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {provider.area} · {provider.distanceKm} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {provider.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bike className="h-3.5 w-3.5" /> {provider.reviews} reviews
          </span>
        </div>

        <div className="rounded-xl bg-muted/70 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Today&apos;s {today.meal}
          </p>
          <p className="mt-1 line-clamp-2 text-sm">{today.items.join(" · ")}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <p className="text-sm">
            <span className="text-xs text-muted-foreground">Starts at </span>
            <span className="font-display text-xl font-bold">{rupees(provider.startingPrice)}</span>
            <span className="text-xs text-muted-foreground">/meal</span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/tiffin/$id" params={{ id: provider.id }}>
                Details
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/checkout" search={{ provider: provider.id }}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
