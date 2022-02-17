/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovies" DROP CONSTRAINT "_GenreToMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovies" DROP CONSTRAINT "_GenreToMovies_B_fkey";

-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "genres" TEXT[];

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "_GenreToMovies";
