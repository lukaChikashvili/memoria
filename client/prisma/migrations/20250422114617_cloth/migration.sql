-- CreateTable
CREATE TABLE "Cloth" (
    "id" SERIAL NOT NULL,
    "shirt" TEXT,
    "shirtTexture" TEXT,
    "skirt" TEXT,
    "skirtTexture" TEXT,
    "removeHair" BOOLEAN NOT NULL DEFAULT false,
    "removeShirt" BOOLEAN NOT NULL DEFAULT false,
    "removeSkirt" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cloth_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cloth" ADD CONSTRAINT "Cloth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
