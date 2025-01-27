-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'user',
    "birthDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Polyclinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "polyclinicName" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "schedule" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Doctors" (
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
    "availableDays" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "polyclinicId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "status" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "scheduleDay" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Queues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "polyclinicId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "currentQueue" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Polyclinics_polyclinicName_key" ON "Polyclinics"("polyclinicName");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_email_key" ON "Doctors"("email");
