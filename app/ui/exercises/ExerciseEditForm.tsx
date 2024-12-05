import { Exercise, UpdateExercise } from "@/app/lib/definitions";

import { Difficulty } from "@prisma/client";
import DetailOptions from "./edit/DetailOptions";
import EditInput from "./edit/EditInput";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateExercise } from "@/app/queries/useExercises";

const ExerciseEditForm = ({ exercise }: { exercise: Exercise }) => {
  const difficulties = Object.values(Difficulty);
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
    onError: (error: unknown) => {
      console.error('Error in mutation:', error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      difficulty: formData.get('difficulty') as Difficulty,
      instruction: formData.get('instruction') as string,
      muscleGroups: (formData.getAll('muscleGroup') as string[]).map((id) => ({ id })),
      targetedMuscles: (formData.getAll('targetedMuscle') as string[]).map((id) => ({ id })),
      equipment: (formData.getAll('equipment') as string[]).map((id) => ({ id })),
    };

    mutation.mutate(data);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
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
          {/* Exercise Instruction */}
          <EditInput
            label="Exercise Instruction"
            name="instruction"
            placeholder="An Exercise involving..."
            defaultValue={
              exercise.instruction || "Put your left foot in..."
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
            currentValues={exercise.targetMuscle}
            outputName="Targeted Muscles"
          />
          {/* MuscleGroup */}
          <DetailOptions
            exerciseOption="muscleGroup"
            currentValues={exercise.muscleGroup}
            outputName="Muscle Groups"
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </main>
  );
};

export default ExerciseEditForm;
