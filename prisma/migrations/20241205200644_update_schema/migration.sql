/*
  Warnings:

  - The `status` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ExerciseInstruction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturedExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TargetedMuscle` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'FEATURED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "ExerciseInstruction" DROP CONSTRAINT "ExerciseInstruction_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedExercise" DROP CONSTRAINT "FeaturedExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToMuscle" DROP CONSTRAINT "_ExerciseToMuscle_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "instruction" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "ExerciseInstruction";

-- DropTable
DROP TABLE "FeaturedExercise";

-- DropTable
DROP TABLE "TargetedMuscle";

-- DropEnum
DROP TYPE "ExerciseStatus";

-- CreateTable
CREATE TABLE "FeatureExercise" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "featuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetMuscle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TargetMuscle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureExercise_exerciseId_key" ON "FeatureExercise"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "TargetMuscle_name_key" ON "TargetMuscle"("name");

-- AddForeignKey
ALTER TABLE "FeatureExercise" ADD CONSTRAINT "FeatureExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscle" ADD CONSTRAINT "_ExerciseToMuscle_B_fkey" FOREIGN KEY ("B") REFERENCES "TargetMuscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
