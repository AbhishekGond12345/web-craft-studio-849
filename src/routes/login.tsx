import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Customer, Provider & Admin | TiffinConnect" },
      {
        name: "description",
        content: "Sign in to TiffinConnect to manage your tiffin subscription, laundry orders or partner business.",
      },
      { property: "og:title", content: "Login | TiffinConnect" },
      { property: "og:description", content: "Sign in as a customer, provider or admin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const roles = [
  { id: "customer", label: "Customer", to: "/dashboard" },
  { id: "provider", label: "Provider", to: "/provider" },
  { id: "admin", label: "Admin", to: "/admin" },
] as const;

function Login() {
  const [role, setRole] = useState<(typeof roles)[number]>(roles[0]);

  return (
    <div className="hero-glow flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 font-display text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          Tiffin<span className="-ml-2 text-primary">Connect</span>
        </Link>

        <div className="surface-card mt-8 p-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to continue your meal and laundry plans.</p>

          <div className="mt-6 grid grid-cols-3 gap-1.5 rounded-full bg-secondary p-1.5">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  role.id === r.id ? "bg-card shadow-sm" : "text-muted-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(`Signed in as ${role.label}`);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email or mobile</Label>
              <Input id="email" defaultValue="aarav.mehta@example.in" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" className="rounded-xl" />
            </div>
            <Button type="submit" size="lg" asChild>
              <Link to={role.to}>Log in as {role.label}</Link>
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to TiffinConnect?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
