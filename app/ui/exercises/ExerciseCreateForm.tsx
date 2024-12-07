'use client'

import { Difficulty } from "@prisma/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createExercise } from "@/app/queries/useExercises";
import { useRouter } from "next/navigation";
import ExerciseForm from "./ExerciseForm";

const ExerciseCreateform = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createExercise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push(`/exercises/${data.slug}`);
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
      muscleGroup: (formData
        .getAll('muscleGroup') as string[]).map((id) => ({ id })),
      targetMuscle: (formData
        .getAll('targetMuscle') as string[]).map((id) => ({ id })),
      equipment: (formData
        .getAll('equipment') as string[]).map((id) => ({ id })),
    };

    mutation.mutate(data);
  }

  return <ExerciseForm mode="create" handleSubmit={handleSubmit} />;
};

export default ExerciseCreateform;
