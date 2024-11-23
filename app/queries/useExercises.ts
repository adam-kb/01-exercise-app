import { FeaturedExerciseOutputData } from "../lib/definitions";
import { useQuery } from "@tanstack/react-query";

const fetchFeaturedExercises = async () => {
    const response = await fetch("/api/exercises");

    if(!response.ok) {
      throw new Error("Error fetching exercises");
    }

    return response.json();
};

export const useExercises = () => {
  return useQuery<FeaturedExerciseOutputData[]>({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
  });
};


// export class Api {
//   public get(input: RequestInfo, params = {}): Promise<Response> {
//     const body = new URLSearchParams(params).toString();
//     return fetch(input, {method: 'GET', body});
//   }
// }

