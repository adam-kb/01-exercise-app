/*
  Warnings:

  - You are about to drop the `ExerciseEquipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseMuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseTargetedMuscle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseEquipment" DROP CONSTRAINT "ExerciseEquipment_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseEquipment" DROP CONSTRAINT "ExerciseEquipment_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseMedia" DROP CONSTRAINT "ExerciseMedia_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_muscleGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTag" DROP CONSTRAINT "ExerciseTag_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTag" DROP CONSTRAINT "ExerciseTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTargetedMuscle" DROP CONSTRAINT "ExerciseTargetedMuscle_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTargetedMuscle" DROP CONSTRAINT "ExerciseTargetedMuscle_muscleId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "ExerciseEquipment";

-- DropTable
DROP TABLE "ExerciseMedia";

-- DropTable
DROP TABLE "ExerciseMuscleGroup";

-- DropTable
DROP TABLE "ExerciseTag";

-- DropTable
DROP TABLE "ExerciseTargetedMuscle";

-- DropTable
DROP TABLE "Tag";

-- DropEnum
DROP TYPE "MediaType";

-- CreateTable
CREATE TABLE "FeaturedExercise" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "featuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeaturedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToMuscle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToEquipment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedExercise_exerciseId_key" ON "FeaturedExercise"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToMuscle_AB_unique" ON "_ExerciseToMuscle"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToMuscle_B_index" ON "_ExerciseToMuscle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToGroup_AB_unique" ON "_ExerciseToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToGroup_B_index" ON "_ExerciseToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToEquipment_AB_unique" ON "_ExerciseToEquipment"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToEquipment_B_index" ON "_ExerciseToEquipment"("B");

-- AddForeignKey
ALTER TABLE "FeaturedExercise" ADD CONSTRAINT "FeaturedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscle" ADD CONSTRAINT "_ExerciseToMuscle_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscle" ADD CONSTRAINT "_ExerciseToMuscle_B_fkey" FOREIGN KEY ("B") REFERENCES "TargetedMuscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToGroup" ADD CONSTRAINT "_ExerciseToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToGroup" ADD CONSTRAINT "_ExerciseToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToEquipment" ADD CONSTRAINT "_ExerciseToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToEquipment" ADD CONSTRAINT "_ExerciseToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
