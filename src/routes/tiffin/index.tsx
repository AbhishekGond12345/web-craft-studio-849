import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProviderCard } from "@/components/site/ProviderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tiffinProviders, type MealType } from "@/data/marketplace";

export const Route = createFileRoute("/tiffin/")({
  head: () => ({
    meta: [
      { title: "Find Tiffin Services Near You | TiffinConnect" },
      {
        name: "description",
        content:
          "Compare verified tiffin providers by price, rating, cuisine and meal type. Veg and non-veg daily and monthly tiffin plans in Pune.",
      },
      { property: "og:title", content: "Find Tiffin Services Near You | TiffinConnect" },
      {
        property: "og:description",
        content: "Compare verified tiffin kitchens by price, rating, distance and meal type.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FindTiffin,
});

const mealTypes: MealType[] = ["Breakfast", "Lunch", "Dinner"];

function FindTiffin() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200);
  const [meals, setMeals] = useState<MealType[]>([]);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("rating");

  const toggleMeal = (meal: MealType) =>
    setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));

  const results = useMemo(() => {
    const list = tiffinProviders.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.cuisine.toLowerCase().includes(q);
      const matchesDiet =
        diet === "all" || (diet === "veg" ? p.veg === "Pure Veg" : p.veg === "Veg & Non-Veg");
      const matchesPrice = p.startingPrice <= maxPrice;
      const matchesMeals = meals.length === 0 || meals.every((m) => p.mealTypes.includes(m));
      const matchesRating = p.rating >= Number(minRating);
      return matchesQuery && matchesDiet && matchesPrice && matchesMeals && matchesRating;
    });

    return [...list].sort((a, b) => {
      if (sort === "price") return a.startingPrice - b.startingPrice;
      if (sort === "distance") return a.distanceKm - b.distanceKm;
      if (sort === "popular") return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
  }, [query, diet, maxPrice, meals, minRating, sort]);

  const resetFilters = () => {
    setQuery("");
    setDiet("all");
    setMaxPrice(200);
    setMeals([]);
    setMinRating("0");
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Tiffin Marketplace"
        title="Find Your Perfect Tiffin"
        subtitle="Home kitchens near you, compared on price, rating, cuisine and delivery time."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kitchen, cuisine or area"
              className="h-12 rounded-xl pl-9"
              aria-label="Search tiffin providers"
            />
          </div>
          <div className="relative sm:w-64">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input defaultValue="Kothrud, Pune" className="h-12 rounded-xl pl-9" aria-label="Location" />
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[270px_1fr] lg:px-8">
        <aside className="surface-card h-fit p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-display text-base font-semibold">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </h2>
            <button type="button" onClick={resetFilters} className="text-xs font-medium text-primary hover:underline">
              Reset
            </button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Food preference</Label>
            <Select value={diet} onValueChange={setDiet}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All providers</SelectItem>
                <SelectItem value="veg">Vegetarian only</SelectItem>
                <SelectItem value="nonveg">Serves non-vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <Label>Price up to ₹{maxPrice} per meal</Label>
            <Slider
              value={[maxPrice]}
              min={50}
              max={200}
              step={5}
              onValueChange={(v) => setMaxPrice(v[0] ?? 200)}
            />
          </div>

          <Separator className="my-4" />

          <fieldset className="space-y-2.5">
            <legend className="mb-2 text-sm font-medium">Meal type</legend>
            {mealTypes.map((meal) => (
              <label key={meal} className="flex cursor-pointer items-center gap-2.5 text-sm">
                <Checkbox checked={meals.includes(meal)} onCheckedChange={() => toggleMeal(meal)} />
                {meal}
              </label>
            ))}
          </fieldset>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Minimum rating</Label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4.0 and above</SelectItem>
                <SelectItem value="4.5">4.5 and above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{results.length}</span> kitchens delivering
              to Kothrud
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-40 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Price: low to high</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="popular">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="surface-card p-12 text-center">
              <h3 className="font-display text-lg font-semibold">No kitchens match these filters</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your price range or clearing the meal type filters.
              </p>
              <Button className="mt-5" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {results.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}
