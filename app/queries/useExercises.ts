import {
  FetchedExercise,
  UpdateExercise,
  CreateExercise,
  FeatureExerciseOutputData,
  ApiError,
} from "@/app/lib/definitions";
import { Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/getQueryClient";

type InfinitePaginatedResponse = {
  data: FetchedExercise[];
  nextCursor: number | null;
};

export const fetchExercises = async ({
  pageParam = 0,
}): Promise<InfinitePaginatedResponse> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const cursorPosition = pageParam || "";

  const response = await fetch(
    `${baseUrl}/api/exercises?cursor=${cursorPosition}&limit=4`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching exercise.");
  }

  return response.json();
};

export const useExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchExercises,
  });
};

export const fetchExercise = async (
  exerciseSlug: string
): Promise<FetchedExercise> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
  const response = await fetch(`${baseUrl}/api/exercises/${exerciseSlug}`);

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

export const fetchFeaturedExercises = async (): Promise<
  FeatureExerciseOutputData[]
> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const response = await fetch(`${baseUrl}/api/exercises/featured`);

  if (!response.ok) {
    throw new Error("Error fetching exercises");
  }

  return response.json();
};

export const getExerciseData = async (
  slug: string
): Promise<FetchedExercise> => {
  const queryClient = getQueryClient();

  return await queryClient.fetchQuery({
    queryKey: ["exercises", slug],
    queryFn: () => fetchExercise(slug),
  });
};

export const useFeaturedExercises = () => {
  return useQuery<FeatureExerciseOutputData[]>({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
  });
};

export const updateExercise = async (
  exerciseData: UpdateExercise
): Promise<FetchedExercise> => {
  const response = await fetch("/api/exercises/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exerciseData),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new ApiError(
      error.message || "unable to update exercise",
      error.details || null
    )
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
    throw new Error(error.message || "Unable to create exercise.");
  }

  return response.json();
};

export const updateExerciseStatus = async (data: {
  id: number;
  exerciseStatus: Omit<Status, "FEATURED">;
}): Promise<{ id: string; status: Omit<Status, "FEATURED"> }> => {
  const response = await fetch("/api/exercises/status", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: data.id, status: data.exerciseStatus }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Unable to update exercise.");
  }

  return response.json();
};
