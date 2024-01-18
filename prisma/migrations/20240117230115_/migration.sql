/*
  Warnings:

  - You are about to drop the column `userId` on the `Update` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_userId_fkey";

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "userId";
