-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL,
    "seen" BOOLEAN,
    "liked" BOOLEAN,
    "disliked" BOOLEAN,
    "watchlist" BOOLEAN,
    "comments" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
