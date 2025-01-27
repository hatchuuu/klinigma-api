/*
  Warnings:

  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `birthDate` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `policlinics` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `availableDays` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `descriptions` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `polyName` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `schedules` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `currentQueue` on the `Queues` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `Queues` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthDate` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `polyclinicName` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Queues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queueNumber` to the `Queues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Queues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Queues` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bookings";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DoctorSchedules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctorId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isHoliday" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "DoctorSchedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "polyclinicId" INTEGER,
    CONSTRAINT "Admins_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("createdAt", "email", "id", "name", "password", "polyclinicId", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "polyclinicId", "role", "updatedAt" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE TABLE "new_Doctors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("id", "name", "polyclinicId") SELECT "id", "name", "polyclinicId" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
CREATE TABLE "new_Queues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Queues_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Queues_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Queues" ("date", "id", "polyclinicId") SELECT "date", "id", "polyclinicId" FROM "Queues";
DROP TABLE "Queues";
ALTER TABLE "new_Queues" RENAME TO "Queues";
CREATE UNIQUE INDEX "Queues_userId_date_time_key" ON "Queues"("userId", "date", "time");
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_Users" ("email", "id", "name", "phoneNumber") SELECT "email", "id", "name", "phoneNumber" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
