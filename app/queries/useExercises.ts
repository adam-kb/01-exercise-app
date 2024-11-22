import { useQuery } from "@tanstack/react-query";
import { Exercise } from "../lib/definitions";

const fetchExercises = async () => {
    const response = await fetch("/api/exercises");

    if(!response.ok) {
      throw new Error("Failed to fetch exercises");
    }

    return response.json();
};

export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });
};
