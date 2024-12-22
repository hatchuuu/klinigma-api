/*
  Warnings:

  - The primary key for the `Bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `currentQueue` on the `Polyclinics` table. All the data in the column will be lost.
  - Added the required column `polyName` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doctors" ADD COLUMN     "polyName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Polyclinics" DROP COLUMN "currentQueue";

-- CreateTable
CREATE TABLE "Queues" (
    "id" SERIAL NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "currentQueue" INTEGER NOT NULL,

    CONSTRAINT "Queues_pkey" PRIMARY KEY ("id")
);
