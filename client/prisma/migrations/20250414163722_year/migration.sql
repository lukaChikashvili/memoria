/*
  Warnings:

  - You are about to drop the column `birthDate` on the `DeadPeople` table. All the data in the column will be lost.
  - You are about to drop the column `deathDate` on the `DeadPeople` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeadPeople" DROP COLUMN "birthDate",
DROP COLUMN "deathDate",
ADD COLUMN     "birthYear" INTEGER,
ADD COLUMN     "deathYear" INTEGER;
