/*
  Warnings:

  - The `moviesId` column on the `Genre` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_moviesId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "moviesId",
ADD COLUMN     "moviesId" INTEGER;

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "popularity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "voteAverage" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Movies_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
