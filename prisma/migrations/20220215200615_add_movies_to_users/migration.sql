-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
