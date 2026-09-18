import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { StatusTimeline } from "@/components/site/StatusTimeline";
import { Button } from "@/components/ui/button";
import { laundryStatusFlow, orders, rupees, tiffinStatusFlow } from "@/data/marketplace";

export const Route = createFileRoute("/track/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Track order ${params.id} | TiffinConnect` },
      {
        name: "description",
        content: "Follow your tiffin delivery or laundry order step by step, from kitchen or pickup to your door.",
      },
      { property: "og:title", content: `Track order ${params.id} | TiffinConnect` },
      { property: "og:description", content: "Live status updates for your TiffinConnect order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackOrder,
});

function TrackOrder() {
  const { id } = Route.useParams();
  const order = orders.find((o) => o.id === id);
  const isLaundry = (order?.type ?? (id.includes("LAU") ? "Laundry" : "Tiffin")) === "Laundry";
  const steps = isLaundry ? laundryStatusFlow : tiffinStatusFlow;
  const current = Math.max(0, steps.indexOf(order?.status ?? (isLaundry ? "Washing" : "Out for Delivery")));

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Order Tracking"
        title={`Order ${id}`}
        subtitle={order ? `${order.provider} · ${order.detail}` : "Live status for this order."}
      />

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="surface-card p-7">
          <h2 className="font-display text-lg font-semibold">Status</h2>
          <div className="mt-6">
            <StatusTimeline steps={steps} current={current} />
          </div>
          <div className="mt-2 flex h-44 items-center justify-center rounded-2xl bg-muted/70 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Live map view appears here during delivery
            </span>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="surface-card p-6">
            <h2 className="font-display text-base font-semibold">Delivery partner</h2>
            <p className="mt-3 text-sm font-medium">Suresh Pawar</p>
            <p className="text-xs text-muted-foreground">Two-wheeler · MH12 DJ 4471</p>
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">Estimated arrival </span>
              <span className="font-semibold">{isLaundry ? "19 Sep, 11:00 AM" : "Today, 1:10 PM"}</span>
            </p>
            <Button variant="outline" className="mt-4 w-full">
              <Phone className="h-4 w-4" /> Contact partner
            </Button>
          </div>

          <div className="surface-card p-6">
            <h2 className="font-display text-base font-semibold">Order details</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Provider</dt>
                <dd className="text-right font-medium">{order?.provider ?? "Maa Kitchen"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Placed on</dt>
                <dd className="font-medium">{order?.date ?? "16 Sep 2026"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-medium">{rupees(order?.amount ?? 2600)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Address</dt>
                <dd className="text-right font-medium">Kothrud, Pune 411038</dd>
              </div>
            </dl>
            <Button variant="ghost" className="mt-4 w-full" asChild>
              <Link to="/orders">Back to all orders</Link>
            </Button>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
