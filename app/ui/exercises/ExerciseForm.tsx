"use client";

import { Difficulty, MediaType } from "@prisma/client";
import { ApiErrorProps, ExerciseFormProps, UpdateExercise } from "@/app/lib/definitions";
import { handleFileUpload, validateForm } from "@/app/lib/utils";
import { useExerciseMutation } from "@/app/queries/useExerciseMutation";
import {
  Button,
  DetailOptions,
  DifficultySelect,
  EditInput,
} from "@/app/ui/FormInputs";
import ImagePicker from "@/app/ui/ImagePicker";
import ToggleStatus from "@/app/ui/ToggleStatus";
import { useState } from "react";
import FeedbackMessage from "../FeedbackMessage";

const ExerciseForm = ({ mode, exercise }: ExerciseFormProps) => {
  const [error, setError] = useState<ApiErrorProps | null>(null);
  
  const handleError = (error: ApiErrorProps) => {
    setError(error);
  }
  
  const mutation = useExerciseMutation({mode, exercise, onError: handleError});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const file = formData.get("thumbnail") as File | null;

    if (file && file.size === 0) {
      formData.delete("thumbnail");
    }

    try {
      const data = {
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        difficulty: formData.get("difficulty") as Difficulty,
        instruction: formData.get("instruction") as string,
        muscleGroup: (formData.getAll("muscleGroup") as string[]).map((id) => ({
          id,
        })),
        targetMuscle: (formData.getAll("targetMuscle") as string[]).map(
          (id) => ({
            id,
          })
        ),
        equipment: (formData.getAll("equipment") as string[]).map((id) => ({
          id,
        })),
      };

      validateForm(data);

      let mutationData: UpdateExercise = { ...data };

      if (file && file.size > 0 && file.name) {
        const mediaKey = await handleFileUpload(file);
        mutationData = {
          ...data,
          media: [{ mediaKey, type: MediaType.THUMBNAIL }],
        };
      }

      mutation.mutate(mutationData);
    } catch (error) {
      console.error("Error:", error);
    }
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
        <ImagePicker id="thumbnail" defaultImage={exercise?.media[0]?.mediaKey ?? ""} />
        {/* Exercise Difficulty */}
        <DifficultySelect label="Difficulty" name="difficulty" defaultValue={exercise?.difficulty} />
        {/* Equipment */}
        <DetailOptions exerciseOption="equipment" currentValues={exercise?.equipment} outputName="Equipment" />
        {/* TargetedMuscle */}
        <DetailOptions exerciseOption="targetMuscle" currentValues={exercise?.targetMuscle} outputName="Target Muscles" />
        {/* MuscleGroup */}
        <DetailOptions exerciseOption="muscleGroup" currentValues={exercise?.muscleGroup} outputName="Muscle Groups" />
      </div>
      <div className="flex gap-4 justify-end">
        <div>
          {exercise && (
            <ToggleStatus id={exercise.id} currentStatus={exercise.status} />
          )}
        </div>
          {error &&
          error.details.map(detail => (
            <FeedbackMessage key={detail.path[0]} type="error" title={error.message} message={detail.message} />
          ))
          }
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-sm px-2 rounded disabled:opacity-75 disabled:hover:opacity-75 disabled:cursor-not-allowed"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default ExerciseForm;
