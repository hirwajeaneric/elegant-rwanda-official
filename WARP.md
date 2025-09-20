# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Elegant Travel and Tours is a Next.js 15 application for a Unique travel company specializing in Rwanda tours, car rentals, cab services, and air travel assistance. The project uses the App Router architecture with TypeScript, Tailwind CSS, and shadcn/ui components.

## Common Commands

### Development
```bash
npm run dev           # Start development server with Turbopack
npm run build         # Build for production with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema changes to database
npx prisma studio     # Open Prisma Studio GUI
npx prisma migrate dev # Apply migrations in development
```

### Testing and Quality
```bash
npm run lint          # Lint TypeScript and React code
npx tsc --noEmit     # Type check without emitting files
```

## Architecture Overview

### Project Structure
- **App Router**: Uses Next.js 15 App Router in `src/app/`
- **Route Groups**: `(public-pages)` contains all public-facing pages
- **Component Organization**: Modular component structure in `src/components/`
- **Data Layer**: Static data in `src/data/` with TypeScript interfaces
- **Schema Validation**: Zod schemas in `src/lib/schemas.ts`

### Key Directories
- `src/app/(public-pages)/`: All public routes (tours, contact, gallery, etc.)
- `src/components/`: Reusable UI components organized by feature
  - `ui/`: shadcn/ui base components
  - `home/`: Homepage-specific components
  - `tours/`, `events/`, `gallery/`: Feature-specific components
  - `layout/`: Navigation and layout components
- `src/data/`: Static data exports (tours, events, testimonials, etc.)
- `src/lib/`: Utility functions and shared schemas

### Technology Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand (based on dependencies)
- **Database**: Dual setup with Prisma and MongoDB/Mongoose
- **Analytics**: Vercel Analytics and Speed Insights
- **Additional**: Firebase, PDF generation (jsPDF), rich text editing (Jodit)

### Data Models
The application uses TypeScript interfaces for data modeling:
- **Tour**: Complete tour information with itinerary, pricing, and metadata
- **Event**: Event details with registration and scheduling
- **Form Schemas**: Comprehensive Zod schemas for all forms (contact, booking, etc.)

### Component Patterns
- **Page Wrapper**: Consistent layout wrapper for all pages
- **Form Components**: Reusable form components with validation
- **Feature Sections**: Self-contained sections (hero, services, testimonials)
- **UI Components**: shadcn/ui pattern with variants and proper TypeScript

## Development Guidelines

### File Organization
- Use the established component directory structure
- Place feature-specific components in their respective directories
- Keep data interfaces co-located with their data files
- Use the `@/` alias for imports from `src/`

### Styling Approach
- Follow the established Tailwind CSS patterns
- Use the custom design system defined in the configuration
- Leverage shadcn/ui components for consistency
- Maintain the Unique travel aesthetic with appropriate typography and colors

### Form Handling
- All forms use React Hook Form with Zod validation
- Form schemas are centralized in `src/lib/schemas.ts`
- Follow the established pattern for form components with proper error handling

### Data Management
- Static data is managed through TypeScript exports in `src/data/`
- Use the provided utility functions for data access
- Maintain type safety with proper interfaces

### Database Considerations
- The project has both Prisma and Mongoose configured
- Database operations should consider this dual setup
- Use appropriate ORM based on the specific use case

## SEO and Metadata
- Each page has comprehensive metadata for SEO
- Uses Next.js metadata API with proper OpenGraph and Twitter cards
- Structured data and sitemap generation are configured

## Deployment
- Optimized for Vercel deployment
- Uses Turbopack for faster builds
- Analytics and speed insights are integrated