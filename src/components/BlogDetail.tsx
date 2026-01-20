/**
 * BlogDetail Component
 * 
 * Displays the full content of a selected blog post.
 * Fetches individual blog by ID using TanStack Query.
 * 
 * Features:
 * - Large cover image with overlay gradient
 * - Category badges and metadata (read time, date)
 * - Share button (native share or copy link)
 * - Delete button with confirmation
 * - Justified text alignment for content
 * - Author attribution section
 * 
 * @param {Object} props - Component props
 * @param {number} props.id - Blog ID to fetch and display
 * @param {() => void} props.onDelete - Callback when blog is deleted
 */
import { useState } from "react";
import { useBlog, useDeleteBlog } from "../hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, Clock, Calendar, User, Trash2, Loader2, Check } from "lucide-react";

interface BlogDetailProps {
  id: number;
  onDelete?: () => void;
}

/**
 * Estimates reading time based on word count
 * Average reading speed: ~200 words per minute
 */
function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} Min`;
}

/**
 * Formats date to readable format
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function BlogDetail({ id, onDelete }: BlogDetailProps) {
  // Fetch single blog by ID using TanStack Query
  const { data: blog, isLoading, error } = useBlog(id);

  // Delete mutation
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Share state for UI feedback
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

  /**
   * Handle share functionality
   * Uses native share API if available, otherwise copies link
   */
  const handleShare = async () => {
    const shareData = {
      title: blog?.title || 'CA Monk Blog',
      text: blog?.description || 'Check out this article on CA Monk',
      url: window.location.href,
    };

    try {
      // Try native share API first (mobile browsers)
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareState('copied');

        // Reset after 2 seconds
        setTimeout(() => setShareState('idle'), 2000);
      }
    } catch (err) {
      // If share fails, try clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      } catch {
        console.error('Failed to share or copy');
      }
    }
  };

  /**
   * Handle delete with confirmation
   */
  const handleDelete = () => {
    if (!blog?.id) return;

    deleteBlog(blog.id, {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        onDelete?.();
      }
    });
  };

  // Empty state - no blog selected
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-64 lg:h-96 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">📖</span>
        </div>
        <h3 className="text-lg font-medium mb-2">Select an article</h3>
        <p className="text-sm text-muted-foreground">
          Choose a blog from the list to start reading
        </p>
      </div>
    );
  }

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-48 lg:h-64 rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center h-64 lg:h-96 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-medium text-destructive mb-2">Failed to load article</h3>
        <p className="text-sm text-muted-foreground">
          Please try selecting another article
        </p>
      </div>
    );
  }

  return (
    <article className="space-y-6 text-left">
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 sm:h-64 lg:h-80 object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Category Badges and Action Buttons */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="font-medium">
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {/* Share Button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleShare}
          >
            {shareState === 'copied' ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </Button>

          {/* Delete Button with Confirmation */}
          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Metadata Row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{calculateReadTime(blog.content)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(blog.date)}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
        {blog.title}
      </h1>

      {/* Description - styled as blockquote */}
      <blockquote className="text-base lg:text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
        {blog.description}
      </blockquote>

      {/* Content - justified text for better readability */}
      <div className="space-y-4">
        {blog.content.split('\n\n').map((paragraph, index) => (
          <p
            key={index}
            className="text-sm sm:text-base leading-relaxed text-justify hyphens-auto"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Author Attribution */}
      <div className="border-t pt-6 mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Written by CA Monk</p>
            <p className="text-xs text-muted-foreground">
              Professional insights for finance & accounting
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
