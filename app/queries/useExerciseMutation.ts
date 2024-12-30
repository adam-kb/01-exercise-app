import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/getQueryClient";
import { createExercise, updateExercise } from "@/app/queries/useExercises";
import { ApiErrorProps } from "../lib/definitions";

type ExerciseMutationProps = {
  mode: "create" | "update";
  exercise?: { slug: string };
  onError?: (error: ApiErrorProps) => void;
};

export const useExerciseMutation = ({ mode, exercise, onError }: ExerciseMutationProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const mutationFn = mode === "update" ? updateExercise : createExercise;

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      const slug = "slug" in response ? response.slug : exercise?.slug;
      queryClient.invalidateQueries({ queryKey: ["exercises", slug] });
      router.push(`/exercises/${slug}`);
    },
    onError: (error: unknown) => {
      console.error("Error in mutation:", error);
      
      if (onError && typeof error === "object" && error !== null) {
        onError(error as ApiErrorProps);
      }
    },
  });

  return mutation;
};
