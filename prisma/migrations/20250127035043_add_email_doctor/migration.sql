/*
  Warnings:

  - Added the required column `email` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("id", "name", "polyclinicId", "polyclinicName") SELECT "id", "name", "polyclinicId", "polyclinicName" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
