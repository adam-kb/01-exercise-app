import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/getQueryClient";
import { createWorkout, updateWorkout } from "@/app/queries/useExercises";
import { ApiErrorProps } from "../lib/definitions";

type WorkoutMutationProps = {
  mode: "create" | "update";
  workout?: { slug: string };
  onError?: (error: ApiErrorProps) => void;
};

export const useWorkoutMutation = ({
  mode,
  workout,
  onError,
}: WorkoutMutationProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const mutationFn = mode === "update" ? updateWorkout : createWorkout;
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      const slug = "slug" in response ? response.slug : workout?.slug;
      queryClient.invalidateQueries({ queryKey: ["workouts", slug]});
      router.push(`/workouts/${slug}`)
    },
    onError: (error: unknown) => {
      console.error("Error in mutation:", error)

      if (onError && typeof error === "object" && error !== null) {
        onError(error as ApiErrorProps);
      }
    },
  })

  return mutation;
};
