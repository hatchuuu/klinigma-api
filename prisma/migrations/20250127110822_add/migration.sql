-- AlterTable
ALTER TABLE "Admins" ADD COLUMN "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN "refreshToken" TEXT;
