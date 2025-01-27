/*
  Warnings:

  - You are about to drop the `DoctorSchedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DoctorSchedules";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isHoliday" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
