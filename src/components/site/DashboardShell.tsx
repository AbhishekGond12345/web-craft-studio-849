import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";

export type NavItem = { label: string; to?: string; active?: boolean };

export function DashboardShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="h-fit rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)] lg:sticky lg:top-24">
          <nav>
            <ul className="grid gap-0.5">
              {nav.map((item) => {
                const classes = `block rounded-xl px-3 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-primary-soft font-semibold text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`;
                return (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className={classes}>
                        {item.label}
                      </Link>
                    ) : (
                      <button type="button" className={`w-full text-left ${classes}`}>
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6 space-y-6">{children}</div>
        </div>
      </div>
    </SiteLayout>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="surface-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-primary">{hint}</p>}
    </div>
  );
}
