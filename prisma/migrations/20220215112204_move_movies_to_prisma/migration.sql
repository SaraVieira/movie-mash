/*
  Warnings:

  - Added the required column `adult` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backdropsId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalLanguage` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postersId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteAverage` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "backdropsId" INTEGER NOT NULL,
ADD COLUMN     "originalLanguage" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" INTEGER NOT NULL,
ADD COLUMN     "postersId" INTEGER NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL,
ADD COLUMN     "voteAverage" INTEGER NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Backdrops" (
    "id" SERIAL NOT NULL,
    "w300" TEXT,
    "w780" TEXT,
    "w1280" TEXT,
    "original" TEXT,

    CONSTRAINT "Backdrops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posters" (
    "id" SERIAL NOT NULL,
    "w92" TEXT,
    "w154" TEXT,
    "w185" TEXT,
    "w342" TEXT,
    "w500" TEXT,
    "w780" TEXT,
    "original" TEXT,

    CONSTRAINT "Posters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "moviesId" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_backdropsId_fkey" FOREIGN KEY ("backdropsId") REFERENCES "Backdrops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_postersId_fkey" FOREIGN KEY ("postersId") REFERENCES "Posters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
