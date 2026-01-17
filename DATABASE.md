# Database Guide

This guide covers database operations for the Elegant Rwanda project using Prisma v7.

## Overview

The project uses:

- **Prisma ORM v7** with the new configuration system
- **PostgreSQL** as the database
- **PostgreSQL Adapter** (`@prisma/adapter-pg`) for connection pooling

## Configuration Files

- `prisma/schema.prisma`: Database schema definition
- `prisma.config.ts`: Prisma v7 configuration (datasource URL)
- `src/lib/prisma.ts`: Prisma Client initialization with adapter

## Common Commands

```bash
# Generate Prisma Client (run after schema changes)
pnpm prisma generate

# Push schema changes to database (development)
pnpm prisma db push

# Create a migration (production-ready)
pnpm prisma migrate dev --name description_of_changes

# Apply migrations to production
pnpm prisma migrate deploy

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Reset database (⚠️ DELETES ALL DATA)
pnpm prisma migrate reset

# Pull schema from existing database
pnpm prisma db pull

# Validate schema
pnpm prisma validate

# Format schema file
pnpm prisma format
```

## Current Schema

### NewsletterSubscriber

Stores newsletter subscription information:

```prisma
model NewsletterSubscriber {
  id          String   @id @default(cuid())
  email       String   @unique
  firstName   String?
  source      String?  // Where they subscribed from
  preferences Json?    // Store preferences as JSON
  subscribedAt DateTime @default(now())
  updatedAt    DateTime @updatedAt
  active       Boolean  @default(true)

  @@index([email])
  @@index([source])
  @@index([subscribedAt])
}
```

## Making Schema Changes

### 1. Edit the Schema

Edit `prisma/schema.prisma`:

```prisma
model YourNewModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
}
```

### 2. Generate Prisma Client

```bash
pnpm prisma generate
```

### 3. Apply Changes

**For Development:**

```bash
pnpm prisma db push
```

**For Production (creates migration):**

```bash
pnpm prisma migrate dev --name add_your_model
```

### 4. Use in Code

```typescript
import { prisma } from "@/lib/prisma";

// Create
const item = await prisma.yourNewModel.create({
  data: {
    name: "Example",
  },
});

// Read
const items = await prisma.yourNewModel.findMany();

// Update
await prisma.yourNewModel.update({
  where: { id: "123" },
  data: { name: "Updated" },
});

// Delete
await prisma.yourNewModel.delete({
  where: { id: "123" },
});
```

## Prisma v7 Specifics

This project uses Prisma v7's new configuration system:

### Key Differences from v5/v6

1. **No `url` in schema.prisma datasource**

   ```prisma
   datasource db {
     provider = "postgresql"
     // url is now in prisma.config.ts
   }
   ```

2. **Adapter required in PrismaClient**

   ```typescript
   import { PrismaPg } from "@prisma/adapter-pg";
   import { Pool } from "pg";

   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   const adapter = new PrismaPg(pool);

   const prisma = new PrismaClient({ adapter });
   ```

3. **Connection pooling built-in**
   The adapter handles connection pooling automatically.

## Troubleshooting

### "Table does not exist"

```bash
pnpm prisma db push
```

### "Generated Prisma Client does not match schema"

```bash
pnpm prisma generate
```

### "Cannot find module '@/generated/prisma'"

```bash
# Ensure generation path is correct in schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

# Then regenerate
pnpm prisma generate
```

### Migration conflicts

```bash
# Mark migration as applied without running
pnpm prisma migrate resolve --applied migration_name

# Or reset everything (⚠️ DELETES DATA)
pnpm prisma migrate reset
```

### SSL Connection Issues

Ensure your `DATABASE_URL` includes SSL parameters:

```env
# For Neon/Supabase
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# For local development without SSL
DATABASE_URL=postgresql://localhost:5432/elegant_rwanda
```

## Best Practices

### 1. Always Generate After Schema Changes

```bash
pnpm prisma generate
```

### 2. Use Migrations for Production

```bash
# Development
pnpm prisma migrate dev --name descriptive_name

# Production
pnpm prisma migrate deploy
```

### 3. Seed Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.newsletterSubscriber.create({
    data: {
      email: "test@example.com",
      firstName: "Test User",
      source: "seed",
      active: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run with:

```bash
pnpm prisma db seed
```

### 4. Type Safety

Always use the generated Prisma types:

```typescript
import { NewsletterSubscriber, Prisma } from "@/generated/prisma/client";

// Using generated types
const createData: Prisma.NewsletterSubscriberCreateInput = {
  email: "user@example.com",
  firstName: "John",
};

const subscriber: NewsletterSubscriber =
  await prisma.newsletterSubscriber.create({
    data: createData,
  });
```

## Performance Tips

1. **Use connection pooling** (already configured via adapter)
2. **Select only needed fields**:

   ```typescript
   await prisma.user.findMany({
     select: { id: true, email: true },
   });
   ```

3. **Use indexes** (already configured in schema)
4. **Batch operations**:
   ```typescript
   await prisma.newsletterSubscriber.createMany({
     data: [...]
   });
   ```

## Resources

- [Prisma v7 Documentation](https://www.prisma.io/docs)
- [Prisma v7 Migration Guide](https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- [PostgreSQL Adapter Docs](https://www.prisma.io/docs/orm/overview/databases/postgresql#adapter)
