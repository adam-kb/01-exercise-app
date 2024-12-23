import { ExerciseWithRelations } from "../lib/definitions";

export const fetchSearchResults = async (
  searchQuery: string
): Promise<ExerciseWithRelations[]> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const response = await fetch(`${baseUrl}/api/search?query=${encodeURIComponent(searchQuery)}`);

  if (!response.ok) {
    throw new Error("Error fetching search results.");
  }

  return response.json();
};
