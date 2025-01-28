/*
  Warnings:

  - A unique constraint covering the columns `[numberKTP]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numberBPJS]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_numberKTP_key" ON "Users"("numberKTP");

-- CreateIndex
CREATE UNIQUE INDEX "Users_numberBPJS_key" ON "Users"("numberBPJS");
