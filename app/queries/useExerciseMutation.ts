import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/getQueryClient";
import { createExercise, updateExercise } from "@/app/queries/useExercises";

export const useExerciseMutation = (mode: "create" | "update", exercise?: { slug: string }) => {
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
    },
  });

  return mutation;
};
