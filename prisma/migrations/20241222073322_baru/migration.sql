-- CreateTable
CREATE TABLE "Doctors" (
    "id" SERIAL NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "polyName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "invitedAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "availableDays" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "quota" INTEGER NOT NULL,
    "booked" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "polyclinicId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "scheduleDay" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_email_key" ON "Doctors"("email");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
