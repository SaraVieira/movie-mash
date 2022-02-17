/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `moviesId` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Genre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_moviesId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
DROP COLUMN "moviesId",
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "movieId" TEXT NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("movieId");

-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "genreId" INTEGER;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
