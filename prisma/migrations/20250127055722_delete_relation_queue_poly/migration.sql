/*
  Warnings:

  - You are about to drop the column `polyclinicId` on the `Queues` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Queues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Queues_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Queues" ("date", "doctorId", "id", "queueNumber", "time", "userId") SELECT "date", "doctorId", "id", "queueNumber", "time", "userId" FROM "Queues";
DROP TABLE "Queues";
ALTER TABLE "new_Queues" RENAME TO "Queues";
CREATE UNIQUE INDEX "Queues_userId_date_time_key" ON "Queues"("userId", "date", "time");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
