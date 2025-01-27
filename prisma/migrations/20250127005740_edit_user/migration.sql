/*
  Warnings:

  - You are about to drop the column `image` on the `Polyclinics` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Polyclinics` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Polyclinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "polyclinicName" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL
);
INSERT INTO "new_Polyclinics" ("descriptions", "id", "polyclinicName") SELECT "descriptions", "id", "polyclinicName" FROM "Polyclinics";
DROP TABLE "Polyclinics";
ALTER TABLE "new_Polyclinics" RENAME TO "Polyclinics";
CREATE UNIQUE INDEX "Polyclinics_polyclinicName_key" ON "Polyclinics"("polyclinicName");
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Users" ("email", "id", "name") SELECT "email", "id", "name" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
