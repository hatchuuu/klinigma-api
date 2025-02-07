-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,
    "image" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "polyclinicId" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,
    "numberKTP" TEXT NOT NULL,
    "numberKK" TEXT NOT NULL,
    "numberBPJS" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "imageSelfie" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedules" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "quota" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polyclinics" (
    "id" TEXT NOT NULL,
    "polyclinicName" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,

    CONSTRAINT "Polyclinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queues" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "polyclinicId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '20-11-2024',
    "time" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Queues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_numberKTP_key" ON "Users"("numberKTP");

-- CreateIndex
CREATE UNIQUE INDEX "Users_numberBPJS_key" ON "Users"("numberBPJS");

-- CreateIndex
CREATE UNIQUE INDEX "Polyclinics_polyclinicName_key" ON "Polyclinics"("polyclinicName");

-- CreateIndex
CREATE UNIQUE INDEX "Queues_userId_date_time_key" ON "Queues"("userId", "date", "time");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queues" ADD CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queues" ADD CONSTRAINT "Queues_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queues" ADD CONSTRAINT "Queues_polyclinicId_fkey" FOREIGN KEY ("polyclinicId") REFERENCES "Polyclinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
