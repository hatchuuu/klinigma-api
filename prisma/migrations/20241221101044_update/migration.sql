/*
  Warnings:

  - You are about to drop the column `DoctorId` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "DoctorId",
ADD COLUMN     "doctorId" INTEGER NOT NULL;
