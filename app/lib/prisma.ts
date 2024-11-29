import { PrismaClient } from "@prisma/client";

console.log("Prisma DATABASE_URL:", process.env.DATABASE_URL);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // "query", "info", "warn", "error"
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
