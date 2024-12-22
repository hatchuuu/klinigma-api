/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Booking";

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "DoctorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "scheduleDay" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);
