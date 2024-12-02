import { Exercise as ExerciseType } from "@/app/lib/definitions";

import { Difficulty } from "@prisma/client";
import DetailOptions from "./edit/DetailOptions";
import EditInput from "./edit/EditInput";

const ExerciseEditForm = ({ exercise }: { exercise: ExerciseType }) => {
  const difficulties = Object.values(Difficulty);

  return (
    <main>
      <form action="">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className="text-3xl font-bold mb-8">Edit Exercise</h2>
          {/* Exercise Name */}
          <EditInput
            label="Exercise Name"
            name="name"
            placeholder="Push Up, Back Squat, Ring Dips, etc..."
            defaultValue={exercise.name}
          />
          {/* Exercise Description */}
          <EditInput
            label="Exercise Description"
            name="description"
            placeholder="An Exercise involving..."
            defaultValue={
              exercise.description || "A description of the exercise..."
            }
            type="textarea"
          />
          {/* Exercise Difficulty */}
          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="mb-2 block text-sm font-medium"
            >
              Exercise Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={exercise.difficulty}
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
          {/* Equipment */}
          <DetailOptions
            exerciseOption="equipment"
            currentValues={exercise.equipment}
            outputName="Equipment"
          />
          {/* TargetedMuscle */}
          <DetailOptions
            exerciseOption="targetedMuscle"
            currentValues={exercise.targetedMuscles}
            outputName="Targeted Muscles"
          />
          {/* MuscleGroup */}
          <DetailOptions
            exerciseOption="muscleGroup"
            currentValues={exercise.muscleGroups}
            outputName="Muscle Groups"
          />
        </div>
      </form>
    </main>
  );
};

export default ExerciseEditForm;
