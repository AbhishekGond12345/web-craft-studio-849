import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  ShoppingCart,
  UtensilsCrossed,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const links = [
  { to: "/", label: "Home" },
  { to: "/tiffin", label: "Find Tiffin" },
  { to: "/plans", label: "Tiffin Plans" },
  { to: "/laundry", label: "Laundry" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/partner", label: "Become a Partner" },
  { to: "/orders", label: "Track Order" },
];

const notifications = [
  { title: "Lunch is out for delivery", detail: "Maa Kitchen · arriving by 1:10 PM" },
  { title: "Laundry ready for delivery", detail: "Sparkle Laundry Co. · 5 kg wash & iron" },
  { title: "Subscription renews in 3 days", detail: "Monthly plan · ₹2,600" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          Tiffin<span className="-ml-2 text-primary">Connect</span>
        </Link>

        <ul className="ml-4 hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary-soft [&.active]:text-secondary-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative hidden sm:inline-flex">
                <Bell />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5">
                  <span className="text-sm font-medium">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.detail}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild aria-label="Cart" className="relative">
            <Link to="/checkout">
              <ShoppingCart />
              <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center rounded-full bg-accent p-0 text-[10px] text-accent-foreground">
                2
              </Badge>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-1 md:inline-flex">
                <User className="h-4 w-4" />
                Aarav
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Aarav Mehta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">My dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/orders">My orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/provider">Provider dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin">Admin panel</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/register">Sign Up</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 xl:hidden">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link to="/register" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
