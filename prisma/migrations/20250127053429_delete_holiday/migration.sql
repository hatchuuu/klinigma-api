/*
  Warnings:

  - You are about to drop the column `isHoliday` on the `Schedules` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    CONSTRAINT "Schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Schedules" ("day", "doctorId", "endTime", "id", "startTime") SELECT "day", "doctorId", "endTime", "id", "startTime" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
