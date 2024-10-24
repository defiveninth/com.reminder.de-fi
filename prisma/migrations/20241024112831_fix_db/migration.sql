/*
  Warnings:

  - You are about to drop the column `settingsId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_settingsId_fkey";

-- AlterTable
ALTER TABLE "Devices" ALTER COLUMN "deviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "settingsId";

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
