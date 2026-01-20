/**
 * Header Component
 * 
 * Main navigation header for the CA Monk Blog application.
 * Features:
 * - Brand logo on the left (clickable to return home)
 * - Collapsible navigation menu for mobile (hamburger)
 * - Navigation to different pages
 * - Create blog button
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onCreateClick - Callback when Create Blog button is clicked
 * @param {string} props.currentPage - Current active page
 * @param {(page: string) => void} props.onNavigate - Navigation callback
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenSquare, Menu, X } from "lucide-react";

interface HeaderProps {
    onCreateClick: () => void;
    currentPage: string;
    onNavigate: (page: string) => void;
}

// Navigation items configuration
const NAV_ITEMS = [
    { id: "study", label: "Study" },
    { id: "practice", label: "Practice" },
    { id: "events", label: "Events" },
    { id: "jobs", label: "Job Board" },
    { id: "mentors", label: "Mentors" },
];

export default function Header({ onCreateClick, currentPage, onNavigate }: HeaderProps) {
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Handle navigation and close mobile menu
     */
    const handleNavigate = (page: string) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between mx-auto px-4">
                {/* Brand Logo - Clickable to go home */}
                <button
                    onClick={() => handleNavigate("home")}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                        CA
                    </div>
                    <span className="font-bold text-lg tracking-tight">CA MONK</span>
                </button>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6 text-sm">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={`transition-colors hover:text-foreground ${currentPage === item.id
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onCreateClick}
                        size="sm"
                        className="gap-2"
                    >
                        <PenSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Create</span>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <nav className="lg:hidden border-t bg-background px-4 py-3 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={`block w-full text-left py-2 text-sm transition-colors hover:text-foreground ${currentPage === item.id
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            )}
        </header>
    );
}
