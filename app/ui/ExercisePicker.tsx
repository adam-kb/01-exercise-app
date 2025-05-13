'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchSearchResults } from "@/app/queries/useSearchResults";

const ExercisePicker = ({ searchQuery }: { searchQuery: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery)
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No Search results for &ldquo;{searchQuery}&ldquo;</p>

  return (
    <div className="flex gap-4 flex-col">
      {data.map((exercise) => (
        <div key={exercise.id}>
          {exercise.name}
        </div>
      ))}
    </div>
  )
}

export default ExercisePicker;
