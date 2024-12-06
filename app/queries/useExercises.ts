import {
  FetchedExercise,
  UpdateExercise,
  CreateExercise,
  FeatureExerciseOutputData,
} from "@/app/lib/definitions";
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
  return useQuery<FeatureExerciseOutputData[]>({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
  });
};

export const fetchExercise = async (
  exerciseSlug: string
): Promise<FetchedExercise> => {
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

export const updateExercise = async (
  exerciseData: UpdateExercise
): Promise<UpdateExercise> => {
  const response = await fetch("/api/exercises/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exerciseData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Unable to update exercise.");
  }

  return response.json();
};

export const createExercise = async (
  exerciseData: CreateExercise
): Promise<FetchedExercise> => {
  const response = await fetch("/api/exercises/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exerciseData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Unable to update exercise.");
  }

  return response.json();
};
