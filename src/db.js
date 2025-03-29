import { PrismaClient } from '@prisma/client';

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const db = global.prisma;

export default db;
