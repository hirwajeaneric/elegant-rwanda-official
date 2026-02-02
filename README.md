# Elegant Rwanda - Travel and Tours Platform

A modern Next.js 15 application for Elegant Travel & Tours, a unique travel company specializing in Rwanda tours, car rentals, cab services, and air travel assistance.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM v7
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Email**: Nodemailer
- **Analytics**: Vercel Analytics & Speed Insights
- **Internationalization**: next-intl
- **Additional**: Firebase, jsPDF, Jodit (rich text editor)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (recommended) or npm/yarn
- **PostgreSQL** database (or use a cloud provider like Neon, Supabase, etc.)
- **Git**

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd elegant-rwanda-backup
```

### 2. Install Dependencies

```bash
pnpm install
```

Or if using npm:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Email Configuration (Gmail example)
EMAIL=your-email@gmail.com
EMAIL_CLIENT=GMAIL
EMAIL_PASSWORD=your-app-specific-password

# Admin Emails (for notifications)
ADMIN_EMAIL_1=admin1@example.com
ADMIN_EMAIL_2=admin2@example.com
```

#### Getting Email Credentials (Gmail)

1. Enable 2-factor authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASSWORD`

⚠️ **Important**: Never commit the `.env` file to version control!

### 4. Database Setup

This project uses **Prisma v7** with the new configuration system.

#### Option A: Using a Cloud Database (Recommended)

**Neon Database** (Free tier available):

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your `.env` file as `DATABASE_URL`

**Supabase**:

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Project Settings → Database
4. Add it to your `.env` file

#### Option B: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb elegant_rwanda

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://localhost:5432/elegant_rwanda
```

#### Run Database Migrations

```bash
# Generate Prisma Client
pnpm prisma generate

# Create database tables
pnpm prisma db push

# Or use migrations (recommended for production)
pnpm prisma migrate dev --name init
```

### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
elegant-rwanda-backup/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public-pages)/      # Public routes (tours, contact, gallery, etc.)
│   │   ├── api/                 # API routes
│   │   └── layout.tsx           # Root layout
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui base components
│   │   ├── home/                # Homepage components
│   │   ├── tours/               # Tour-related components
│   │   ├── events/              # Event components
│   │   ├── gallery/             # Gallery components
│   │   └── layout/              # Navigation & layout
│   ├── data/                    # Static data & TypeScript interfaces
│   ├── lib/                     # Utilities, schemas, helpers
│   │   ├── prisma.ts           # Prisma client setup
│   │   ├── schemas.ts          # Zod validation schemas
│   │   └── email.ts            # Email utilities
│   └── generated/              # Prisma generated client
├── prisma/
│   └── schema.prisma           # Database schema
├── prisma.config.ts            # Prisma v7 configuration
├── public/                     # Static assets
└── package.json
```

## 🗄️ Database Schema

The application currently includes:

- **NewsletterSubscriber**: Email newsletter subscription management
  - Email, first name, source tracking
  - Subscription preferences (JSON)
  - Active status and timestamps

To view the full schema:

```bash
pnpm prisma studio
```

## 🔧 Available Scripts

### Development

```bash
pnpm dev              # Start dev server with Turbopack (faster)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### Database

```bash
pnpm prisma generate   # Generate Prisma Client
pnpm prisma db push    # Push schema changes to database
pnpm prisma migrate dev # Create and apply migrations
pnpm prisma studio     # Open Prisma Studio (database GUI)
```

### Type Checking

```bash
pnpm exec tsc --noEmit  # TypeScript type checking
```

## 🔑 Key Features

- **Multi-language Support**: Internationalization with next-intl
- **Newsletter System**: Email subscription with preferences
- **Form Validation**: Comprehensive Zod schemas for all forms
- **Email Notifications**: Automated emails via Nodemailer
- **SEO Optimized**: Proper metadata, OpenGraph, and Twitter cards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Extensive shadcn/ui integration

## 🎨 Styling & Design System

The project uses Tailwind CSS 4 with a custom design system. The configuration includes:

- Custom color palette optimized for travel/tourism
- Typography system with professional fonts
- Responsive breakpoints
- Animation utilities
- shadcn/ui component variants

## 📧 Email Configuration

The application sends emails for:

- Newsletter subscriptions
- Contact form submissions
- Booking confirmations

Email templates are managed in `src/lib/email.ts`

## 🔐 Environment Variables Reference

| Variable              | Description                  | Required |
| --------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Application URL              | Yes      |
| `DATABASE_URL`        | PostgreSQL connection string | Yes      |
| `EMAIL`               | Sender email address         | Yes      |
| `EMAIL_CLIENT`        | Email provider (GMAIL, etc.) | Yes      |
| `EMAIL_PASSWORD`      | Email app password           | Yes      |
| `ADMIN_EMAIL_1`       | Primary admin email          | Yes      |
| `ADMIN_EMAIL_2`       | Secondary admin email        | No       |

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
pnpm prisma db pull
```

If you see SSL/TLS errors, ensure your `DATABASE_URL` includes SSL parameters:

```text
postgresql://user:pass@host:port/db?sslmode=require
```

### Prisma Client Not Found

```bash
# Regenerate Prisma Client
pnpm prisma generate
```

### Port Already in Use

The dev server will automatically use the next available port (e.g., 3001) if port 3000 is occupied.

### Type Errors

```bash
# Run type checking
pnpm exec tsc --noEmit

# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Migration Issues

```bash
# Reset database (⚠️ WARNING: This deletes all data!)
pnpm prisma migrate reset

# Or just push schema without migrations
pnpm prisma db push
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Zod](https://zod.dev)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

Vercel will automatically:

- Run `pnpm prisma generate`
- Build with Turbopack
- Set up edge functions

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📝 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📞 Support

For issues or questions, please contact:

- Email: <hirwajeric@gmail.com>
- Phone: 0780599859

---

Built with ❤️ using Next.js 15 and modern web technologies by Hirwa Jean Eric.
