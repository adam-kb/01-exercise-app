'use client';

import { FetchedExercise } from "@/app/lib/definitions";
import { DetailOptions, DifficultySelect, EditInput } from "@/app/ui/FormInputs";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Difficulty } from "@prisma/client";
import { createExercise, updateExercise } from "@/app/queries/useExercises";


type ExerciseFormProps = {
  mode: "create" | "update";
  exercise?: FetchedExercise
};

const ExerciseForm = ({ mode, exercise}: ExerciseFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = mode === 'update' ? updateExercise : createExercise;

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      // Invalidate exercises query and navigate
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      
      // For create, navigate to the new exercise's page
      // For update, navigate back to the exercise details
      const slug = 'slug' in response ? response.slug : exercise?.slug;
      router.push(`/exercises/${slug}`);
    },
    onError: (error: unknown) => {
      console.error('Error in mutation:', error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      difficulty: formData.get('difficulty') as Difficulty,
      instruction: formData.get('instruction') as string,
      muscleGroup: (formData.getAll('muscleGroup') as string[]).map((id) => ({ id })),
      targetMuscle: (formData.getAll('targetMuscle') as string[]).map((id) => ({ id })),
      equipment: (formData.getAll('equipment') as string[]).map((id) => ({ id })),
    };

    mutation.mutate(data);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <h2 className="text-3xl font-bold mb-8">Edit Exercise</h2>
        {mode === "update" && (
          <input type="hidden" name="id" defaultValue={exercise?.id} />
        )}
        {/* Exercise Name */}
        <EditInput
          label="Exercise Name"
          name="name"
          placeholder="Push Up, Back Squat, Ring Dips, etc..."
          defaultValue={exercise?.name}
        />
        {/* Exercise Description */}
        <EditInput
          label="Exercise Description"
          name="description"
          placeholder="An Exercise involving..."
          defaultValue={exercise?.description || ""}
          type="textarea"
        />
        {/* Exercise Instruction */}
        <EditInput
          label="Exercise Instruction"
          name="instruction"
          placeholder="Instructions to perform the exercise..."
          defaultValue={exercise?.instruction || ""}
          type="textarea"
        />
        {/* Exercise Difficulty */}
        <DifficultySelect
          label="Difficulty"
          name="difficulty"
          defaultValue={exercise?.difficulty}
        />
        {/* Equipment */}
        <DetailOptions
          exerciseOption="equipment"
          currentValues={exercise?.equipment}
          outputName="Equipment"
        />
        {/* TargetedMuscle */}
        <DetailOptions
          exerciseOption="targetMuscle"
          currentValues={exercise?.targetMuscle}
          outputName="Target Muscles"
        />
        {/* MuscleGroup */}
        <DetailOptions
          exerciseOption="muscleGroup"
          currentValues={exercise?.muscleGroup}
          outputName="Muscle Groups"
        />
      </div>
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default ExerciseForm;
