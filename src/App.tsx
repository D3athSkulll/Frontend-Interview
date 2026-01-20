/**
 * App Component
 * 
 * Main application layout for the CA Monk Blog.
 * Handles page navigation using React state (no router needed).
 * 
 * Features:
 * - Header with navigation
 * - Multiple page views (home, study, practice, events, jobs, mentors, privacy, terms)
 * - Blog list with filtering by category
 * - Create blog modal
 * - Improved footer with links
 * 
 * State Management:
 * - currentPage: Active page for navigation
 * - selectedId: Currently selected blog ID
 * - isCreateOpen: Modal visibility state
 */
import { useState, useEffect } from 'react'
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlogForm from './components/CreateBlogForm';

// Page components
import StudyPage from './pages/StudyPage';
import PracticePage from './pages/PracticePage';
import EventsPage from './pages/EventsPage';
import JobBoardPage from './pages/JobBoardPage';
import MentorsPage from './pages/MentorsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

import './App.css'

// Page type for navigation
type PageType = 'home' | 'study' | 'practice' | 'events' | 'jobs' | 'mentors' | 'privacy' | 'terms';

export default function App() {
  // Current page for navigation - initialize from URL
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') as PageType;
      // Simple validation: check if page exists in our PageType union roughly, or just fallback
      if (['study', 'practice', 'events', 'jobs', 'mentors', 'privacy', 'terms', 'home'].includes(page)) {
        return page;
      }
    }
    return 'home';
  });

  // Track currently selected blog for detail view - initialize from URL
  const [selectedId, setSelectedId] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return Number(params.get('blogId')) || 0;
    }
    return 0;
  });

  // Sync state to URL in address bar
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage !== 'home') params.set('page', currentPage);
    if (selectedId) params.set('blogId', selectedId.toString());

    // Update URL without reloading page
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [currentPage, selectedId]);

  // Modal state for create blog form
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /**
   * Handle blog deletion - clear selection
   */
  const handleDelete = () => {
    setSelectedId(0);
  };

  /**
   * Render the appropriate page content based on currentPage
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'study':
        return <StudyPage />;
      case 'practice':
        return <PracticePage />;
      case 'events':
        return <EventsPage />;
      case 'jobs':
        return <JobBoardPage />;
      case 'mentors':
        return <MentorsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-8 lg:py-12">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                  CA Monk Blog
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  Stay updated with the latest trends in finance, accounting, and career growth.
                </p>
              </div>
            </section>

            {/* Main Content Area */}
            <main className="container mx-auto px-4 py-6 lg:py-8">
              {/* Mobile: Stacked layout */}
              <div className="lg:hidden space-y-6">
                <section>
                  <BlogList
                    onSelect={setSelectedId}
                    selectedId={selectedId}
                  />
                </section>
                <section>
                  <BlogDetail id={selectedId} onDelete={handleDelete} />
                </section>
              </div>

              {/* Desktop: Side-by-side layout */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-4 xl:col-span-3">
                  <div className="sticky top-20">
                    <BlogList
                      onSelect={setSelectedId}
                      selectedId={selectedId}
                    />
                  </div>
                </aside>
                <section className="lg:col-span-8 xl:col-span-9">
                  <BlogDetail id={selectedId} onDelete={handleDelete} />
                </section>
              </div>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Header */}
      <Header
        onCreateClick={() => setIsCreateOpen(true)}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as PageType)}
      />

      {/* Page Content */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-auto text-left">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  CA
                </div>
                <span className="font-bold text-lg">CA MONK</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering the next generation of finance professionals with knowledge, community, and mentorship.
              </p>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('study')}
                    className="hover:text-foreground transition-colors"
                  >
                    Webinars
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('practice')}
                    className="hover:text-foreground transition-colors"
                  >
                    Case Studies
                  </button>
                </li>
              </ul>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => setCurrentPage('jobs')}
                    className="hover:text-foreground transition-colors"
                  >
                    Job Board
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('practice')}
                    className="hover:text-foreground transition-colors"
                  >
                    Practice Tests
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('mentors')}
                    className="hover:text-foreground transition-colors"
                  >
                    Mentorship
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>© 2026 CA Monk. All rights reserved.</span>
            <div className="flex gap-6">
              <button
                onClick={() => setCurrentPage('privacy')}
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setCurrentPage('terms')}
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Create Blog Modal */}
      <CreateBlogForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
