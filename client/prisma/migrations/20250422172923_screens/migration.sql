/*
  Warnings:

  - You are about to drop the column `screenshotUrls` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "screenshotUrls";

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
