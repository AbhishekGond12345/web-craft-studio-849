import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 font-semibold text-secondary-foreground">
        <Star className="h-3.5 w-3.5 fill-current text-warning" aria-hidden />
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && <span className="text-muted-foreground">({reviews} reviews)</span>}
    </span>
  );
}
