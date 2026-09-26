import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your Account | TiffinConnect" },
      {
        name: "description",
        content:
          "Sign up as a customer to order tiffin and laundry, or register your kitchen or laundry business as a partner.",
      },
      { property: "og:title", content: "Create Your Account | TiffinConnect" },
      { property: "og:description", content: "Join TiffinConnect as a customer or service partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Register,
});

function Register() {
  const [role, setRole] = useState<"customer" | "provider">("customer");

  return (
    <div className="hero-glow flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 font-display text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          Tiffin<span className="-ml-2 text-primary">Connect</span>
        </Link>

        <div className="surface-card mt-8 p-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">It takes less than a minute.</p>

          <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-full bg-secondary p-1.5">
            {(["customer", "provider"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-full px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  role === r ? "bg-card shadow-sm" : "text-muted-foreground"
                }`}
              >
                {r === "customer" ? "I want to order" : "I run a business"}
              </button>
            ))}
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Account created. Welcome to TiffinConnect!");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="fullname">Full name</Label>
                <Input id="fullname" placeholder="Aarav Mehta" className="rounded-xl" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile">Mobile number</Label>
                <Input id="mobile" placeholder="+91 98765 43210" className="rounded-xl" required />
              </div>
            </div>
            {role === "provider" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="business">Business name</Label>
                  <Input id="business" placeholder="Maa Kitchen" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="type">Service type</Label>
                  <Input id="type" placeholder="Tiffin or Laundry" className="rounded-xl" />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" type="email" placeholder="you@example.in" className="rounded-xl" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-city">City and area</Label>
              <Input id="reg-city" placeholder="Kothrud, Pune" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-password">Password</Label>
              <Input id="reg-password" type="password" className="rounded-xl" required />
            </div>
            <Button type="submit" size="lg">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
