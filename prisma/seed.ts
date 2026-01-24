import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding database...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 12);
  const contentPassword = await bcrypt.hash("content123", 12);
  const editorPassword = await bcrypt.hash("editor123", 12);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@elegantrwanda.com" },
    update: {
      password: adminPassword,
      active: true,
    },
    create: {
      email: "admin@elegantrwanda.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      active: true,
    },
  });

  console.log("Created admin user:", admin.email);

  // Create or update content manager user
  const contentManager = await prisma.user.upsert({
    where: { email: "content@elegantrwanda.com" },
    update: {
      password: contentPassword,
      active: true,
    },
    create: {
      email: "content@elegantrwanda.com",
      name: "Content Manager",
      password: contentPassword,
      role: "CONTENT_MANAGER",
      active: true,
    },
  });

  console.log("Created content manager user:", contentManager.email);

  // Create or update editor user
  const editor = await prisma.user.upsert({
    where: { email: "editor@elegantrwanda.com" },
    update: {
      password: editorPassword,
      active: true,
    },
    create: {
      email: "editor@elegantrwanda.com",
      name: "Editor User",
      password: editorPassword,
      role: "EDITOR",
      active: true,
    },
  });

  console.log("Created editor user:", editor.email);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
