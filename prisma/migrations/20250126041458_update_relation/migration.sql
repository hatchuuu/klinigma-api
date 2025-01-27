-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "policlinics" TEXT,
    "birthDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "polyclinicId" INTEGER NOT NULL,
    CONSTRAINT "Admins_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "polyclinicId" INTEGER NOT NULL,
    "polyName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "schedules" TEXT NOT NULL,
    "availableDays" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("availableDays", "createdAt", "descriptions", "email", "gender", "id", "image", "location", "name", "phoneNumber", "polyName", "polyclinicId", "schedules") SELECT "availableDays", "createdAt", "descriptions", "email", "gender", "id", "image", "location", "name", "phoneNumber", "polyName", "polyclinicId", "schedules" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
CREATE UNIQUE INDEX "Doctors_polyclinicId_key" ON "Doctors"("polyclinicId");
CREATE UNIQUE INDEX "Doctors_email_key" ON "Doctors"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
