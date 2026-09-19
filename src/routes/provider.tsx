import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { rupees } from "@/data/marketplace";

export const Route = createFileRoute("/provider")({
  head: () => ({
    meta: [
      { title: "Provider Dashboard — Orders, Menu & Earnings | TiffinConnect" },
      {
        name: "description",
        content:
          "Tiffin and laundry partners manage menus, pricing plans, subscriptions, orders, delivery areas and earnings from one dashboard.",
      },
      { property: "og:title", content: "Provider Dashboard | TiffinConnect" },
      { property: "og:description", content: "Manage orders, menus, subscribers and earnings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProviderDashboard,
});

const nav = [
  { label: "Overview", active: true },
  { label: "Orders" },
  { label: "Menu & Items" },
  { label: "Pricing Plans" },
  { label: "Subscriptions" },
  { label: "Customers" },
  { label: "Delivery Areas" },
  { label: "Offers" },
  { label: "Earnings" },
  { label: "Ratings" },
  { label: "Availability" },
];

const revenue = [
  { month: "Apr", value: 78000 },
  { month: "May", value: 84500 },
  { month: "Jun", value: 91200 },
  { month: "Jul", value: 88400 },
  { month: "Aug", value: 99600 },
  { month: "Sep", value: 112300 },
];

const ordersData = [
  { day: "Mon", orders: 62 },
  { day: "Tue", orders: 58 },
  { day: "Wed", orders: 71 },
  { day: "Thu", orders: 66 },
  { day: "Fri", orders: 78 },
  { day: "Sat", orders: 84 },
];

const pending = [
  { id: "TC-TIF-48231", customer: "Neha Kulkarni", item: "Monthly Plan · Lunch", amount: 2500 },
  { id: "TC-TIF-48230", customer: "Imran Shaikh", item: "Daily · Dinner ×2", amount: 220 },
  { id: "TC-TIF-48229", customer: "Ritu Agarwal", item: "Weekly Plan · Lunch", amount: 680 },
];

function ProviderDashboard() {
  return (
    <DashboardShell
      title="Maa Kitchen"
      subtitle="Kothrud, Pune · Verified partner since 2023"
      nav={nav}
    >
      <div className="flex flex-wrap gap-2">
        {["Available", "Fully Booked", "Closed Today"].map((state, i) => (
          <Button
            key={state}
            size="sm"
            variant={i === 0 ? "default" : "outline"}
            onClick={() => toast.success(`Status set to ${state}`)}
          >
            {state}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's orders" value="48" hint="+12% vs yesterday" />
        <StatCard label="Weekly orders" value="419" />
        <StatCard label="Monthly revenue" value={rupees(112300)} hint="Best month yet" />
        <StatCard label="Active subscribers" value="186" hint="24 renewals this week" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Revenue trend</h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Orders this week</h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="orders" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Pending orders</h2>
          <Badge variant="secondary">3 waiting for approval</Badge>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {pending.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-sm font-medium">{o.customer}</p>
                <p className="text-xs text-muted-foreground">
                  {o.id} · {o.item}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{rupees(o.amount)}</span>
                <Button size="sm" onClick={() => toast.success(`Order ${o.id} accepted`)}>
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Order ${o.id} rejected`)}>
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="surface-card p-6">
          <h2 className="font-display text-base font-semibold">Customer ratings</h2>
          <p className="mt-3 font-display text-3xl font-bold">4.8 ★</p>
          <p className="text-sm text-muted-foreground">412 reviews · 96% positive</p>
        </section>
        <section className="surface-card p-6">
          <h2 className="font-display text-base font-semibold">Delivery areas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Kothrud", "Karve Nagar", "Warje", "Erandwane"].map((a) => (
              <span key={a} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {a}
              </span>
            ))}
          </div>
        </section>
        <section className="surface-card p-6">
          <h2 className="font-display text-base font-semibold">Active offers</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>FIRST50 · ₹50 off first order</li>
            <li>MONTHLY10 · 10% off monthly plans</li>
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
