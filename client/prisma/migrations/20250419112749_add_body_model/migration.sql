/*
  Warnings:

  - You are about to drop the `DeadPeople` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeadPeople" DROP CONSTRAINT "DeadPeople_createdById_fkey";

-- DropTable
DROP TABLE "DeadPeople";

-- CreateTable
CREATE TABLE "Body" (
    "id" TEXT NOT NULL,
    "bodyColor" TEXT NOT NULL,
    "hair" TEXT NOT NULL,
    "eye" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Body_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Body" ADD CONSTRAINT "Body_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
