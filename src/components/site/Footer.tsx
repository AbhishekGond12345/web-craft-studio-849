import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, UtensilsCrossed } from "lucide-react";

const columns = [
  {
    title: "Services",
    links: [
      { to: "/tiffin", label: "Find Tiffin" },
      { to: "/plans", label: "Tiffin Plans" },
      { to: "/laundry", label: "Laundry Services" },
      { to: "/laundry/book", label: "Book Pickup" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/partner", label: "Become a Partner" },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help & Support" },
      { to: "/orders", label: "Track Order" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <UtensilsCrossed className="h-5 w-5" />
            </span>
            Tiffin<span className="-ml-2 text-primary">Connect</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Your daily meal and laundry, all in one place. Trusted home kitchens and laundry partners across Pune.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Baner Road, Pune 411045
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +91 80 4718 2200
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> support@tiffinconnect.in
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/70 py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © 2026 TiffinConnect Technologies Pvt. Ltd. Made in Pune, India.
        </p>
      </div>
    </footer>
  );
}
