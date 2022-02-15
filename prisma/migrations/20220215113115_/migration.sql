/*
  Warnings:

  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_moviesId_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "moviesId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Movies_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
