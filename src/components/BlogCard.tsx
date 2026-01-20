/**
 * BlogCard Component
 * 
 * Displays a blog post preview in the sidebar list.
 * Shows category badges, title, description, and formatted date.
 * 
 * Features:
 * - Category badges with color coding
 * - Hover effect for interactivity
 * - Clean selection highlight with left border
 * - "Read more" link styling
 * 
 * @param {Object} props - Component props
 * @param {Blog} props.blog - Blog data object
 * @param {() => void} props.onClick - Click handler to select this blog
 * @param {boolean} props.isSelected - Whether this blog is currently selected
 */
import type { Blog } from "../types/blog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected?: boolean;
}

/**
 * Formats an ISO date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date like "Jan 11, 2026"
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function BlogCard({ blog, onClick, isSelected }: BlogCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`
        p-4 cursor-pointer transition-all duration-200 border-l-4
        hover:bg-accent/50
        ${isSelected
          ? 'border-l-primary bg-accent/30'
          : 'border-l-transparent hover:border-l-muted-foreground/30'
        }
      `}
    >
      {/* Category Badges */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {blog.category.slice(0, 2).map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="text-xs font-medium px-2 py-0"
          >
            {cat}
          </Badge>
        ))}
        {blog.category.length > 2 && (
          <Badge variant="outline" className="text-xs px-2 py-0">
            +{blog.category.length - 2}
          </Badge>
        )}
      </div>

      {/* Blog Title */}
      <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
        {blog.title}
      </h3>

      {/* Blog Description - truncated */}
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
        {blog.description}
      </p>

      {/* Read more link and date */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-primary font-medium">
          Read now →
        </span>
        <span className="text-muted-foreground">
          {formatDate(blog.date)}
        </span>
      </div>
    </Card>
  );
}
