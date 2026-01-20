import { Skeleton } from "@/components/ui/skeleton";

export function BlogListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton
          key={i}
          className="h-24 w-full rounded-lg"
        />
      ))}
    </div>
  );
}
