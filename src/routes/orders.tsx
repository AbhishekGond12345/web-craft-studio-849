import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { orders, rupees } from "@/data/marketplace";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders & Order Tracking | TiffinConnect" },
      {
        name: "description",
        content: "View your tiffin and laundry orders, check live status and track any order with its order ID.",
      },
      { property: "og:title", content: "My Orders | TiffinConnect" },
      { property: "og:description", content: "Track tiffin deliveries and laundry pickups in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Orders,
});

function Orders() {
  const [filter, setFilter] = useState("all");
  const [orderId, setOrderId] = useState("");

  const visible = orders.filter((o) => filter === "all" || o.type.toLowerCase() === filter);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Track Order" title="Your orders" subtitle="Everything you have booked on TiffinConnect, tiffin and laundry.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter order ID e.g. TC-TIF-48219"
            className="h-12 rounded-xl sm:w-80"
            aria-label="Order ID"
          />
          <Button size="lg" asChild disabled={!orderId}>
            <Link to="/track/$id" params={{ id: orderId || "TC-TIF-48219" }}>
              Track order
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-2">
          {[
            { id: "all", label: "All orders" },
            { id: "tiffin", label: "Tiffin" },
            { id: "laundry", label: "Laundry" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {visible.map((o) => (
            <article key={o.id} className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold">{o.provider}</h2>
                  <Badge variant="secondary">{o.type}</Badge>
                  <Badge
                    className={
                      o.status === "Delivered"
                        ? "bg-primary-soft text-secondary-foreground"
                        : "bg-accent text-accent-foreground"
                    }
                  >
                    {o.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{o.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {o.id} · {o.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-display text-xl font-bold">{rupees(o.amount)}</p>
                <Button variant="outline" asChild>
                  <Link to="/track/$id" params={{ id: o.id }}>
                    Track
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
