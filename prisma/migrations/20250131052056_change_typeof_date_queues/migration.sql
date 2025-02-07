-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Queues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '20-11-2024',
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
