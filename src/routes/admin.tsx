import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardShell, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { rupees } from "@/data/marketplace";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Providers, Orders & Payouts | TiffinConnect" },
      {
        name: "description",
        content:
          "Admin control centre for verifying providers, managing orders, payments, subscriptions, reviews, coupons and complaints.",
      },
      { property: "og:title", content: "Admin Panel | TiffinConnect" },
      { property: "og:description", content: "Platform operations, verification queue and revenue overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

const nav = [
  { label: "Overview", active: true },
  { label: "Customers" },
  { label: "Tiffin Providers" },
  { label: "Laundry Providers" },
  { label: "Verification Queue" },
  { label: "Orders" },
  { label: "Payments" },
  { label: "Subscriptions" },
  { label: "Reviews" },
  { label: "Coupons" },
  { label: "Categories" },
  { label: "Locations" },
  { label: "Complaints" },
  { label: "Refunds" },
  { label: "Notifications" },
];

const queue = [
  { name: "Annapurna Tiffin Seva", type: "Tiffin", area: "Sinhagad Road", docs: "FSSAI, Aadhaar" },
  { name: "CleanPress Laundry", type: "Laundry", area: "Wakad", docs: "GST, Shop Act" },
  { name: "Ruchi Ghar Bhojan", type: "Tiffin", area: "Hadapsar", docs: "FSSAI pending" },
];

const complaints = [
  { id: "CMP-1182", customer: "Pooja Deshpande", issue: "Cold food delivered", status: "Open" },
  { id: "CMP-1179", customer: "Rahul Nikam", issue: "Laundry delayed by a day", status: "In review" },
  { id: "CMP-1174", customer: "Sadaf Khan", issue: "Refund not credited", status: "Resolved" },
];

function Admin() {
  return (
    <DashboardShell title="Admin control centre" subtitle="Platform health for 16 September 2026" nav={nav}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total users" value="38,412" hint="+864 this month" />
        <StatCard label="Active providers" value="463" hint="420 verified" />
        <StatCard label="Tiffin orders (Sep)" value="52,108" />
        <StatCard label="Laundry orders (Sep)" value="11,740" />
        <StatCard label="Monthly revenue" value={rupees(8940000)} hint="Platform GMV" />
        <StatCard label="Pending verification" value="12" hint="Oldest waiting 2 days" />
      </div>

      <section className="surface-card p-6">
        <h2 className="font-display text-lg font-semibold">Verification queue</h2>
        <ul className="mt-4 divide-y divide-border">
          {queue.map((q) => (
            <li key={q.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-sm font-medium">
                  {q.name} <Badge variant="secondary">{q.type}</Badge>
                </p>
                <p className="text-xs text-muted-foreground">
                  {q.area} · documents: {q.docs}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => toast.success(`${q.name} verified`)}>
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast(`${q.name} sent back for documents`)}>
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Complaints</h2>
          <ul className="mt-4 divide-y divide-border">
            {complaints.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{c.issue}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.id} · {c.customer}
                  </p>
                </div>
                <Badge variant={c.status === "Resolved" ? "secondary" : "default"}>{c.status}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Active coupons</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["FIRST50", "₹50 off first order · 3,120 uses"],
              ["MONTHLY10", "10% off monthly plans · 842 uses"],
              ["FESTIVE20", "20% off festival thali · 410 uses"],
              ["REFER100", "₹100 referral credit · 1,268 uses"],
            ].map(([code, detail]) => (
              <li key={code} className="flex items-center justify-between gap-3 rounded-xl bg-muted/70 px-4 py-3">
                <span className="font-semibold">{code}</span>
                <span className="text-xs text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
