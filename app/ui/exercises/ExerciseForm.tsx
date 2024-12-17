"use client";

import { Difficulty } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { FetchedExercise } from "@/app/lib/definitions";

import { createExercise, updateExercise } from "@/app/queries/useExercises";

import {
  DetailOptions,
  DifficultySelect,
  EditInput,
} from "@/app/ui/FormInputs";
import ToggleStatus from "../ToggleStatus";
import { getQueryClient } from "@/app/getQueryClient";

type ExerciseFormProps = {
  mode: "create" | "update";
  exercise?: FetchedExercise;
};

const ExerciseForm = ({ mode, exercise }: ExerciseFormProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const mutationFn = mode === "update" ? updateExercise : createExercise;

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      const slug = "slug" in response ? response.slug : exercise?.slug;

      // queryClient.invalidateQueries({ queryKey: ['exercises'] });
      queryClient.invalidateQueries({ queryKey: ["exercises", slug] });

      router.push(`/exercises/${slug}`);
    },
    onError: (error: unknown) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      difficulty: formData.get("difficulty") as Difficulty,
      instruction: formData.get("instruction") as string,
      muscleGroup: (formData.getAll("muscleGroup") as string[]).map((id) => ({
        id,
      })),
      targetMuscle: (formData.getAll("targetMuscle") as string[]).map((id) => ({
        id,
      })),
      equipment: (formData.getAll("equipment") as string[]).map((id) => ({
        id,
      })),
    };

    mutation.mutate(data);
  };

  let buttonText;

  if (mutation.isPending) {
    buttonText = "Processing...";
  } else if (mode === "update") {
    buttonText = "Update Exercise";
  } else {
    buttonText = "Create Exercise";
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
      <div className="flex gap-4 justify-end">
        <div>
          {exercise && (
            <ToggleStatus id={exercise.id} currentStatus={exercise.status} />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-sm px-2 rounded"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
