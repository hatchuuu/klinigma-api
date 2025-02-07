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
    CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Doctors" ("createdAt", "email", "id", "name", "polyclinicId", "polyclinicName", "updatedAt") SELECT "createdAt", "email", "id", "name", "polyclinicId", "polyclinicName", "updatedAt" FROM "Doctors";
DROP TABLE "Doctors";
ALTER TABLE "new_Doctors" RENAME TO "Doctors";
CREATE TABLE "new_Queues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Queues_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Queues_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Queues" ("date", "doctorId", "id", "polyclinicId", "queueNumber", "status", "time", "userId") SELECT "date", "doctorId", "id", "polyclinicId", "queueNumber", "status", "time", "userId" FROM "Queues";
DROP TABLE "Queues";
ALTER TABLE "new_Queues" RENAME TO "Queues";
CREATE UNIQUE INDEX "Queues_userId_date_time_key" ON "Queues"("userId", "date", "time");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
