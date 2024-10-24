-- CreateTable
CREATE TABLE
    "User" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "lastName" TEXT,
        "firstName" TEXT,
        "phoneNumber" TEXT,
        "address" TEXT,
        "bio" TEXT,
        "birthdate" TIMESTAMP(3),
        "profilePicture" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "passwordHash" TEXT,
        "refreshToken" TEXT,
        "telegramId" TEXT,
        "settingsId" TEXT NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "Settings" (
        "id" TEXT NOT NULL,
        "settings" JSONB NOT NULL,
        "userId" TEXT NOT NULL,
        CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "Devices" (
        "id" TEXT NOT NULL,
        "deviceId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_deviceId_key" ON "Devices" ("deviceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;