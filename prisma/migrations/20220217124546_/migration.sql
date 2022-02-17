-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_movieId_fkey";

-- CreateTable
CREATE TABLE "_GenreToMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovies_AB_unique" ON "_GenreToMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovies_B_index" ON "_GenreToMovies"("B");

-- AddForeignKey
ALTER TABLE "_GenreToMovies" ADD FOREIGN KEY ("A") REFERENCES "Genre"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovies" ADD FOREIGN KEY ("B") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
