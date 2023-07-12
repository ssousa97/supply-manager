/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
