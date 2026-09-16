import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusTimeline({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const done = i <= current;
        const active = i === current;
        return (
          <li key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className={cn("h-10 w-0.5", i < current ? "bg-primary" : "bg-border")} />
              )}
            </div>
            <div className="pb-8">
              <p className={cn("text-sm font-medium", !done && "text-muted-foreground")}>{step}</p>
              {active && <p className="text-xs text-primary">In progress now</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
