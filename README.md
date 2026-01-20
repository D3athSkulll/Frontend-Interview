# CA Monk Blog Application

A modern, responsive blog application built with React, TypeScript, TanStack Query, Tailwind CSS, and shadcn/ui.

## 🚀 Features Implemented

### Core Functionality
- **Blog Management**: Full CRUD operations (Create, Read, Delete) for blog posts.
- **State Management**: Using **TanStack Query** for efficient server state management, caching, and optimistic updates.
- **Dynamic Routing**: URL synchronization allows deep linking to specific pages (`?page=study`) and blog posts (`?blogId=1`).

### UI/UX Improvements
- **Responsive Design**: 
  - Mobile-first approach with hamburger menu navigation.
  - Horizontal scrolling article list on mobile devices.
  - Sticky sidebar layout for desktop views.
- **Visual Polish**:
  - Clean, modern typography with justified text alignment.
  - Interactive hover states and selection effects.
  - 4-column footer layout with proper alignment.
- **Filtering & Search**:
  - Filter blogs by category tags.
  - Automatic sorting by date (latest first).
- **Share Functionality**:
  - Native share sheet support for mobile devices.
  - Clipboard copy fallback for desktop users.

### Static Pages
Added dedicated views for platform sections:
- **Study**: Educational resources and guides.
- **Practice**: Mock tests and quizzes.
- **Events**: Upcoming workshops and webinars.
- **Job Board**: Career opportunities.
- **Mentors**: Expert profiles.
- **Legal**: Privacy Policy and Terms of Service.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **State/Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Backend (JSON Server)**
   ```bash
   npm run server
   ```
   Runs on `http://localhost:3001`

3. **Start Frontend**
   ```bash
   npm run dev
   ```
   Runs on `http://localhost:5173`

## 📝 Change Log

### Phase 1: Foundation
- Set up React Query provider and hooks (`useBlogs`, `useBlog`).
- Created responsive `Header` and `BlogList` components.
- Implemented `BlogDetail` with article rendering.
- Added `CreateBlogForm` with validation.

### Phase 2: Enhancements
- **Navigation**: Implemented state-based routing synced with URL parameters.
- **Interactivity**: Added share button, category filters, and clear filter options.
- **Mobile Experience**: Improved touch targets, added horizontal scrolling, and hamburger menu.
- **Visuals**: refined container widths, text alignment, and footer hierarchy.
