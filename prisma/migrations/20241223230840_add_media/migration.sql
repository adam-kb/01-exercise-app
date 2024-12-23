-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('THUMBNAIL', 'VIDEO');

-- AlterTable
ALTER TABLE "_ExerciseToEquipment" ADD CONSTRAINT "_ExerciseToEquipment_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ExerciseToEquipment_AB_unique";

-- AlterTable
ALTER TABLE "_ExerciseToGroup" ADD CONSTRAINT "_ExerciseToGroup_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ExerciseToGroup_AB_unique";

-- AlterTable
ALTER TABLE "_ExerciseToMuscle" ADD CONSTRAINT "_ExerciseToMuscle_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ExerciseToMuscle_AB_unique";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "mediaKey" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
