/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Rating" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
