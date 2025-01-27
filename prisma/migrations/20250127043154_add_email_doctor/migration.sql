-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("email", "id", "name", "polyclinicId", "polyclinicName") SELECT "email", "id", "name", "polyclinicId", "polyclinicName" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
