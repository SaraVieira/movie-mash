-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VIEWER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'VIEWER';

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "allowRegistration" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
