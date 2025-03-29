import { PrismaClient } from '@prisma/client';

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const globalForPrisma = globalForPrisma.prisma || globalThis;

const db = new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = db;
}

export default db;
