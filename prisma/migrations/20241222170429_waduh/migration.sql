/*
  Warnings:

  - You are about to drop the column `invitedAt` on the `Doctors` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctors" DROP COLUMN "invitedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
