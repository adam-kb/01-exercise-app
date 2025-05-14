/*
  Warnings:

  - You are about to drop the column `intensity` on the `ExerciseWorkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExerciseWorkout" DROP COLUMN "intensity";

-- AlterTable
ALTER TABLE "WorkoutHistory" ADD COLUMN     "intensity" INTEGER;
