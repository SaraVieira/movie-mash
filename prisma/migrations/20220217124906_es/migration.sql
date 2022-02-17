/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genreId` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[A,B]` on the table `_GenreToMovies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_GenreToMovies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovies" DROP CONSTRAINT "_GenreToMovies_A_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "genreId",
DROP COLUMN "movieId",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "moviesId" TEXT,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "genreId";

-- AlterTable
ALTER TABLE "_GenreToMovies" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovies_AB_unique" ON "_GenreToMovies"("A", "B");

-- AddForeignKey
ALTER TABLE "_GenreToMovies" ADD FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
