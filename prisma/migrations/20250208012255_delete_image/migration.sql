/*
  Warnings:

  - You are about to drop the column `image` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `imageSelfie` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "imageId",
DROP COLUMN "imageSelfie";
