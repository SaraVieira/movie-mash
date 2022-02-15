/*
  Warnings:

  - You are about to drop the column `backdropsId` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `postersId` on the `Movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_backdropsId_fkey";

-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_postersId_fkey";

-- AlterTable
ALTER TABLE "Backdrops" ADD COLUMN     "moviesId" TEXT;

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "backdropsId",
DROP COLUMN "postersId";

-- AlterTable
ALTER TABLE "Posters" ADD COLUMN     "moviesId" TEXT;

-- AddForeignKey
ALTER TABLE "Backdrops" ADD CONSTRAINT "Backdrops_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posters" ADD CONSTRAINT "Posters_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
