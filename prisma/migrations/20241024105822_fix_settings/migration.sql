/*
  Warnings:

  - The primary key for the `Devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Devices` table. All the data in the column will be lost.
  - The primary key for the `Settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Settings` table. All the data in the column will be lost.
  - The required column `devices_id` was added to the `Devices` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_settingsId_fkey";

-- AlterTable
ALTER TABLE "Devices" DROP CONSTRAINT "Devices_pkey",
DROP COLUMN "id",
ADD COLUMN     "devices_id" TEXT NOT NULL,
ADD CONSTRAINT "Devices_pkey" PRIMARY KEY ("devices_id");

-- AlterTable
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_pkey",
DROP COLUMN "id",
ADD COLUMN     "settings_id" SERIAL NOT NULL,
ADD CONSTRAINT "Settings_pkey" PRIMARY KEY ("settings_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("settings_id") ON DELETE RESTRICT ON UPDATE CASCADE;
