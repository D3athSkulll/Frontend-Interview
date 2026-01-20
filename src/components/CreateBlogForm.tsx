/**
 * CreateBlogForm Component
 * 
 * Modal form for creating a new blog post.
 * Uses TanStack Query mutation for API submission.
 * 
 * Features:
 * - Form validation with error messages
 * - Multiple category selection
 * - Auto-generates date and cover image URL
 * - Success/error feedback
 * - Query invalidation on success
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {() => void} props.onClose - Callback to close the modal
 */
import { useState } from "react";
import { useCreateBlog } from "../hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Loader2, Check } from "lucide-react";

interface CreateBlogFormProps {
    isOpen: boolean;
    onClose: () => void;
}

// Available categories for blogs
const CATEGORIES = [
    "FINANCE", "TECH", "CAREER", "EDUCATION",
    "REGULATIONS", "LIFESTYLE"
];

// Default cover images to randomly select from
const COVER_IMAGES = [
    "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
    "https://images.pexels.com/photos/5212327/pexels-photo-5212327.jpeg",
    "https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg",
    "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
    "https://images.pexels.com/photos/3943724/pexels-photo-3943724.jpeg",
];

export default function CreateBlogForm({ isOpen, onClose }: CreateBlogFormProps) {
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState("");

    // TanStack Query mutation for creating blogs
    const { mutate, isPending, isSuccess, isError, reset } = useCreateBlog();

    /**
     * Toggle category selection
     */
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    /**
     * Reset form to initial state
     */
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setContent("");
        setSelectedCategories([]);
        setCoverImage("");
        reset();
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!title.trim() || !description.trim() || !content.trim() || selectedCategories.length === 0) {
            return;
        }

        // Create blog object with generated data
        const newBlog = {
            title: title.trim(),
            description: description.trim(),
            content: content.trim(),
            category: selectedCategories,
            date: new Date().toISOString(),
            // Use provided cover image or random default
            coverImage: coverImage.trim() || COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)],
        };

        // Submit via mutation
        mutate(newBlog, {
            onSuccess: () => {
                // Close after short delay to show success state
                setTimeout(() => {
                    resetForm();
                    onClose();
                }, 1500);
            }
        });
    };

    /**
     * Handle modal close with cleanup
     */
    const handleClose = () => {
        resetForm();
        onClose();
    };

    // Don't render if modal is closed
    if (!isOpen) return null;

    return (
        // Modal Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            {/* Modal Content */}
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-in fade-in-0 zoom-in-95">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Create New Blog</h2>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Success State */}
                {isSuccess && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Blog Created!</h3>
                        <p className="text-sm text-muted-foreground">
                            Your article has been published successfully
                        </p>
                    </div>
                )}

                {/* Form */}
                {!isSuccess && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {isError && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                Failed to create blog. Please try again.
                            </div>
                        )}

                        {/* Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="Enter blog title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Categories */}
                        <div className="space-y-2">
                            <Label>Categories * (select at least one)</Label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => (
                                    <Badge
                                        key={cat}
                                        variant={selectedCategories.includes(cat) ? "default" : "outline"}
                                        className="cursor-pointer transition-colors"
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Input
                                id="description"
                                placeholder="Brief summary of the blog..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Cover Image URL */}
                        <div className="space-y-2">
                            <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                            <Input
                                id="coverImage"
                                placeholder="https://example.com/image.jpg"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Leave empty for a random default image
                            </p>
                        </div>

                        {/* Content Field */}
                        <div className="space-y-2">
                            <Label htmlFor="content">Content *</Label>
                            <Textarea
                                id="content"
                                placeholder="Write your blog content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Use two line breaks to separate paragraphs
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending || !title || !description || !content || selectedCategories.length === 0}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Publish Blog"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
}
