import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardShell, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { orders, rupees, tiffinProviders } from "@/data/marketplace";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Plans, Orders & Wallet | TiffinConnect" },
      {
        name: "description",
        content:
          "Manage your tiffin subscription, laundry orders, saved addresses, wallet balance and favourite providers.",
      },
      { property: "og:title", content: "My Dashboard | TiffinConnect" },
      { property: "og:description", content: "Your subscriptions, orders, wallet and favourites in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const nav = [
  { label: "Dashboard", active: true },
  { label: "My Tiffin Plans" },
  { label: "My Laundry Orders" },
  { label: "Orders", to: "/orders" },
  { label: "Subscriptions" },
  { label: "Addresses" },
  { label: "Payments" },
  { label: "Favorites" },
  { label: "Reviews" },
  { label: "Notifications" },
  { label: "Help & Support", to: "/help" },
  { label: "Logout", to: "/login" },
];

function Dashboard() {
  const favourites = tiffinProviders.slice(0, 3);

  return (
    <DashboardShell title="Welcome back, Aarav" subtitle="Here is what is cooking and washing today." nav={nav}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active subscription" value="Maa Kitchen" hint="Monthly · Lunch + Dinner" />
        <StatCard label="Next delivery" value="Today 1:10 PM" hint="Out for delivery" />
        <StatCard label="Wallet balance" value={rupees(640)} hint="₹100 referral credit added" />
        <StatCard label="Total savings" value={rupees(4380)} hint="Since January 2026" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Active tiffin subscription</h2>
          <div className="mt-4 rounded-2xl bg-muted/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">Maa Kitchen · Monthly Plan</p>
                <p className="text-sm text-muted-foreground">Lunch + Dinner · renews 10 Oct 2026</p>
              </div>
              <p className="font-display text-xl font-bold">{rupees(2600)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.success("Subscription paused until you resume")}>
                Pause
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Tomorrow's delivery skipped")}>
                Skip a day
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Address updated to Office")}>
                Change address
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Preference set to low oil")}>
                Meal preference
              </Button>
            </div>
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-semibold">Active laundry order</h2>
          <div className="mt-4 rounded-2xl bg-muted/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">Sparkle Laundry Co.</p>
                <p className="text-sm text-muted-foreground">Wash &amp; Iron · 5 kg · picked up 14 Sep</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">Washing</Badge>
            </div>
            <Button size="sm" className="mt-4" asChild>
              <Link to="/track/$id" params={{ id: "TC-LAU-20874" }}>
                Track laundry
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="surface-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Recent orders</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/orders">View all</Link>
          </Button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium">
                  {o.provider} <span className="text-muted-foreground">· {o.detail}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {o.id} · {o.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{o.status}</Badge>
                <span className="text-sm font-semibold">{rupees(o.amount)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-card p-6">
        <h2 className="font-display text-lg font-semibold">Favourite providers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {favourites.map((p) => (
            <Link
              key={p.id}
              to="/tiffin/$id"
              params={{ id: p.id }}
              className="rounded-2xl bg-muted/70 p-4 transition-colors hover:bg-secondary"
            >
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.area} · {p.rating.toFixed(1)} ★
              </p>
            </Link>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
