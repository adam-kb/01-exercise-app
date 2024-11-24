import { FeaturedExerciseOutputData } from "@/app/lib/definitions";
import { useQuery } from "@tanstack/react-query";

// TODO: Re-org these fn? Keep the tanstack hooks separate?
const fetchFeaturedExercises = async () => {
  const response = await fetch("/api/exercises");

  if (!response.ok) {
    throw new Error("Error fetching exercises");
  }

  return response.json();
};

export const useFeaturedExercises = () => {
  return useQuery<FeaturedExerciseOutputData[]>({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
  });
};

export const fetchExercise = async (exerciseSlug: string) => {
  const response = await fetch(`/api/exercises/${exerciseSlug}`);

  if (!response.ok) {
    throw new Error("Error fetching exercise.");
  }

  return response.json();
};

export const useExercise = (exerciseSlug: string) => {
  return useQuery({
    queryKey: ["exercises", exerciseSlug],
    queryFn: () => fetchExercise(exerciseSlug),
  });
};
