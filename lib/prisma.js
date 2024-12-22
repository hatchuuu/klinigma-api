import { PrismaClient } from '@prisma/client'

const globalPrisma = globalThis.prisma

export const prisma = globalPrisma || new PrismaClient()
if (process.env.NODE_ENV === 'production') {
    globalPrisma.prisma = prisma
}