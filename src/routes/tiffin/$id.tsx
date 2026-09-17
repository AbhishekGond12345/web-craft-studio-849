import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Clock, Heart, Minus, Phone, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RatingStars } from "@/components/site/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getProvider, rupees, tiffinProviders } from "@/data/marketplace";

export const Route = createFileRoute("/tiffin/$id")({
  loader: ({ params }) => {
    const provider = getProvider(params.id);
    if (!provider) throw notFound();
    return provider;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Tiffin provider"} — Menu, Plans & Reviews | TiffinConnect` },
      {
        name: "description",
        content:
          loaderData?.about.slice(0, 155) ??
          "Menu, subscription plans and customer reviews for this tiffin provider.",
      },
      { property: "og:title", content: `${loaderData?.name ?? "Tiffin provider"} | TiffinConnect` },
      { property: "og:description", content: loaderData?.about.slice(0, 155) ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProviderDetail,
});

function ProviderDetail() {
  const provider = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [meal, setMeal] = useState(provider.todaysMenu[0]!.meal);

  const selected = provider.todaysMenu.find((m) => m.meal === meal) ?? provider.todaysMenu[0]!;
  const related = tiffinProviders.filter((p) => p.id !== provider.id).slice(0, 3);

  return (
    <SiteLayout>
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <img
          src={provider.image}
          alt={`${provider.name} kitchen`}
          width={1008}
          height={704}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card -mt-16 relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-soft font-display text-2xl font-bold text-primary">
            {provider.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold sm:text-3xl">{provider.name}</h1>
              {provider.verified && (
                <Badge className="gap-1 bg-primary text-primary-foreground">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified Provider
                </Badge>
              )}
              <Badge variant="secondary">{provider.veg}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {provider.cuisine} · by {provider.owner}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <RatingStars rating={provider.rating} reviews={provider.reviews} />
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {provider.area}, {provider.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {provider.deliveryTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="h-4 w-4" /> {provider.phone}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success(`${provider.name} saved to favourites`)}
            >
              <Heart className="h-4 w-4" /> Save
            </Button>
            <Button asChild>
              <Link to="/checkout" search={{ provider: provider.id }}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <Tabs defaultValue="overview">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-secondary/70 p-1.5">
              <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="today" className="rounded-xl">Today&apos;s Menu</TabsTrigger>
              <TabsTrigger value="weekly" className="rounded-xl">Weekly Menu</TabsTrigger>
              <TabsTrigger value="plans" className="rounded-xl">Plans</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-5">
              <div className="surface-card p-6">
                <h2 className="font-display text-lg font-semibold">About this kitchen</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{provider.about}</p>
                <Separator className="my-5" />
                <h3 className="text-sm font-semibold">Delivery areas</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.deliveryAreas.map((a) => (
                    <span key={a} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {a}
                    </span>
                  ))}
                </div>
                <Separator className="my-5" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Availability today</p>
                    <p className="mt-1 text-sm font-semibold">{provider.availability}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Meals served</p>
                    <p className="mt-1 text-sm font-semibold">{provider.mealTypes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Starting price</p>
                    <p className="mt-1 text-sm font-semibold">{rupees(provider.startingPrice)} per meal</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="today" className="mt-6 space-y-5">
              {provider.todaysMenu.map((m) => (
                <div key={m.meal} className="surface-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{m.meal}</h3>
                      <p className="text-xs text-muted-foreground">Delivery window {m.time}</p>
                    </div>
                    <p className="font-display text-xl font-bold">{rupees(m.price)}</p>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {m.items.map((item) => (
                      <li key={item} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <div className="surface-card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Day</th>
                      <th className="px-5 py-3">Lunch</th>
                      <th className="px-5 py-3">Dinner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provider.weeklyMenu.map((d) => (
                      <tr key={d.day} className="border-t border-border">
                        <td className="px-5 py-3 font-medium">{d.day}</td>
                        <td className="px-5 py-3 text-muted-foreground">{d.lunch}</td>
                        <td className="px-5 py-3 text-muted-foreground">{d.dinner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="plans" className="mt-6 grid gap-5 sm:grid-cols-3">
              {provider.plans.map((plan) => (
                <div key={plan.id} className="surface-card flex flex-col p-6">
                  <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 font-display text-3xl font-bold">{rupees(plan.price)}</p>
                  <p className="text-xs text-muted-foreground">{plan.period}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{plan.meals}</p>
                  {plan.save && (
                    <span className="mt-3 w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold">
                      {plan.save}
                    </span>
                  )}
                  <Button className="mt-5" asChild>
                    <Link to="/checkout" search={{ provider: provider.id, plan: plan.id }}>
                      Subscribe
                    </Link>
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-4">
              {provider.reviewList.map((r) => (
                <div key={r.name} className="surface-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{r.name}</p>
                    <RatingStars rating={r.rating} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            <div className="surface-card p-6">
              <h2 className="font-display text-lg font-semibold">Order today&apos;s tiffin</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.todaysMenu.map((m) => (
                  <button
                    key={m.meal}
                    type="button"
                    onClick={() => setMeal(m.meal)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      meal === m.meal
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m.meal}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>

              <Separator className="my-5" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold">{rupees(selected.price * quantity)}</span>
              </div>
              <Button className="mt-4 w-full" size="lg" asChild>
                <Link to="/checkout" search={{ provider: provider.id, qty: quantity }}>
                  Proceed to checkout
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free delivery on subscriptions · Cancel anytime
              </p>
            </div>

            <div className="surface-card p-6">
              <h3 className="font-display text-base font-semibold">Similar kitchens</h3>
              <ul className="mt-4 space-y-3">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/tiffin/$id"
                      params={{ id: p.id }}
                      className="flex items-center justify-between gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                    >
                      <span className="text-sm font-medium">{p.name}</span>
                      <RatingStars rating={p.rating} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
