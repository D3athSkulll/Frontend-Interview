/**
 * BlogList Component
 * 
 * Displays a scrollable list of blog cards with filtering capability.
 * Blogs are sorted by date (latest first).
 * 
 * Features:
 * - "Latest Articles" header with article count
 * - Category filter badges to filter by tags
 * - Clear filter option
 * - Loading skeleton and error states
 * - Responsive layout: vertical on desktop, horizontal on mobile
 * 
 * @param {Object} props - Component props
 * @param {(id: number) => void} props.onSelect - Callback when a blog is selected
 * @param {number} props.selectedId - Currently selected blog ID
 */
import { useState, useMemo } from "react";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "./BlogCard";
import { BlogListSkeleton } from "./BlogListSkeleton";
import { AlertCircle, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedId?: number;
}

export default function BlogList({ onSelect, selectedId }: BlogListProps) {
  // Active category filter
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Fetch all blogs using TanStack Query
  const { data, isLoading, error, refetch } = useBlogs();

  // Get unique categories from all blogs
  const allCategories = useMemo(() => {
    if (!data) return [];
    const categories = new Set<string>();
    data.forEach(blog => blog.category.forEach(cat => categories.add(cat)));
    return Array.from(categories).sort();
  }, [data]);

  // Sort blogs by date (latest first) and filter by category
  const filteredBlogs = useMemo(() => {
    if (!data) return [];

    // Sort by date descending (latest first)
    const sorted = [...data].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Apply category filter if active
    if (activeFilter) {
      return sorted.filter(blog => blog.category.includes(activeFilter));
    }

    return sorted;
  }, [data, activeFilter]);

  // Show skeleton loader while fetching
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Latest Articles</h2>
        <BlogListSkeleton />
      </div>
    );
  }

  // Show error state with retry button
  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Latest Articles</h2>
        <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg bg-destructive/10">
          <AlertCircle className="h-10 w-10 text-destructive mb-2" />
          <p className="text-sm text-destructive font-medium">Failed to load blogs</p>
          <p className="text-xs text-muted-foreground mb-3">Please check your connection</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {activeFilter ? `${activeFilter} Articles` : "Latest Articles"}
        </h2>
        <span className="text-sm text-muted-foreground">
          {filteredBlogs.length} articles
        </span>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="h-3 w-3" />
          <span>Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((category) => (
            <Badge
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className="cursor-pointer text-xs transition-colors hover:bg-primary/80"
              onClick={() => setActiveFilter(
                activeFilter === category ? null : category
              )}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Clear Filter Button */}
        {activeFilter && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-muted-foreground"
            onClick={() => setActiveFilter(null)}
          >
            <X className="h-3 w-3" />
            Clear filter
          </Button>
        )}
      </div>

      {/* No results message */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No articles found for "{activeFilter}"</p>
          <Button
            variant="link"
            size="sm"
            onClick={() => setActiveFilter(null)}
          >
            Clear filter
          </Button>
        </div>
      )}

      {/* Mobile: Horizontal scroll */}
      <div className="lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="flex-shrink-0 w-64 snap-start">
              <BlogCard
                blog={blog}
                onClick={() => onSelect(blog.id!)}
                isSelected={selectedId === blog.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical scroll */}
      <div className="hidden lg:block">
        <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={() => onSelect(blog.id!)}
              isSelected={selectedId === blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
