import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// Build the absolute path to the unified database
const dbPath = path.join(process.cwd(), "prisma", "dev.db");

// Initialize the Prisma 7 adapter
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Pass the adapter! 
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;