-- DropForeignKey
ALTER TABLE "IntendedSets" DROP CONSTRAINT "IntendedSets_workoutId_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "IntendedSets" ADD CONSTRAINT "IntendedSets_workoutId_exerciseId_fkey" FOREIGN KEY ("workoutId", "exerciseId") REFERENCES "ExerciseWorkout"("workoutId", "exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;
