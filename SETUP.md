# Quick Setup Guide

This is a step-by-step guide to get the project running in under 5 minutes.

## Prerequisites Checklist

- [ ] Node.js 20+ installed
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] PostgreSQL database ready (or Neon account)

## Setup Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your actual values
# Required: DATABASE_URL, EMAIL, EMAIL_PASSWORD
```

### 3. Setup Database

```bash
# Generate Prisma Client
pnpm prisma generate

# Create database tables
pnpm prisma db push

# Verify setup (opens Prisma Studio)
pnpm prisma studio
```

### 4. Start Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## Common Issues

### "Table does not exist in the current database"

**Solution**: Run database migrations

```bash
pnpm prisma db push
# or
pnpm prisma migrate dev --name init
```

### "Can't resolve '@/generated/prisma'"

**Solution**: Generate Prisma Client

```bash
pnpm prisma generate
```

### Email not sending

**Solution**: For Gmail users

1. Enable 2-Factor Authentication
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use the app password in `.env` as `EMAIL_PASSWORD`

### Port 3000 already in use

The dev server will automatically use port 3001 (or next available). Check the terminal output for the actual URL.

## Quick Database Setup Options

### Option 1: Neon (Free, Recommended)

1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string to `DATABASE_URL` in `.env`
4. Run `pnpm prisma db push`

### Option 2: Supabase (Free)

1. Sign up at https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Add to `DATABASE_URL` in `.env`
5. Run `pnpm prisma db push`

### Option 3: Local PostgreSQL

```bash
# macOS
brew install postgresql@15
brew services start postgresql@15
createdb elegant_rwanda

# Linux
sudo apt-get install postgresql
sudo systemctl start postgresql
sudo -u postgres createdb elegant_rwanda

# Update .env
DATABASE_URL=postgresql://localhost:5432/elegant_rwanda

# Run migrations
pnpm prisma db push
```

## Verification Checklist

After setup, verify everything works:

- [ ] Dev server starts without errors
- [ ] Homepage loads at http://localhost:3000 (or 3001)
- [ ] Prisma Studio opens (`pnpm prisma studio`)
- [ ] No TypeScript errors (`pnpm exec tsc --noEmit`)
- [ ] Newsletter signup works (test at /#newsletter or contact page)

## Need Help?

See the main [README.md](./README.md) for detailed documentation.
