import { useQuery } from "@tanstack/react-query"
import { Workout } from "../lib/definitions";

export const fetchWorkouts = async (): Promise<Workout[]> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const response = await fetch(`${baseUrl}/api/workouts`);

  console.log(response);
  if(!response.ok) {
    console.log(response);
    throw new Error("Error fetching workouts")
  }

  return response.json();
}

export const getWorkoutData = async (slug: string): Promise<Workout> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const response = await fetch(`${baseUrl}/api/workouts/${slug}`);

  if(!response.ok) {
    console.log(response);
    throw new Error("Error fetching workout");
  }

  return response.json();
}

export const useWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts
  })
}