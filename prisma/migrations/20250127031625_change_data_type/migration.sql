/*
  Warnings:

  - The primary key for the `DoctorSchedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Polyclinics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Queues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
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
    "polyclinicId" TEXT,
    CONSTRAINT "Admins_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("createdAt", "email", "id", "name", "password", "polyclinicId", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "polyclinicId", "role", "updatedAt" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE TABLE "new_DoctorSchedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isHoliday" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "DoctorSchedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DoctorSchedules" ("day", "doctorId", "endTime", "id", "isHoliday", "startTime") SELECT "day", "doctorId", "endTime", "id", "isHoliday", "startTime" FROM "DoctorSchedules";
DROP TABLE "DoctorSchedules";
ALTER TABLE "new_DoctorSchedules" RENAME TO "DoctorSchedules";
CREATE TABLE "new_Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("id", "name", "polyclinicId", "polyclinicName") SELECT "id", "name", "polyclinicId", "polyclinicName" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
CREATE TABLE "new_Polyclinics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "polyclinicName" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL
);
INSERT INTO "new_Polyclinics" ("descriptions", "id", "polyclinicName") SELECT "descriptions", "id", "polyclinicName" FROM "Polyclinics";
DROP TABLE "Polyclinics";
ALTER TABLE "new_Polyclinics" RENAME TO "Polyclinics";
CREATE UNIQUE INDEX "Polyclinics_polyclinicName_key" ON "Polyclinics"("polyclinicName");
CREATE TABLE "new_Queues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Queues_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Queues_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Queues" ("date", "doctorId", "id", "polyclinicId", "queueNumber", "time", "userId") SELECT "date", "doctorId", "id", "polyclinicId", "queueNumber", "time", "userId" FROM "Queues";
DROP TABLE "Queues";
ALTER TABLE "new_Queues" RENAME TO "Queues";
CREATE UNIQUE INDEX "Queues_userId_date_time_key" ON "Queues"("userId", "date", "time");
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Users" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
