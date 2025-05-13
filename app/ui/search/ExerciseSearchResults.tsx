'use client';

import { useQuery } from "@tanstack/react-query";
import ExerciseLink from "../exercises/ExerciseLink";
import { fetchSearchResults } from "@/app/queries/useSearchResults";
import { ExerciseWithRelations } from "@/app/lib/definitions";

type ExerciseResultProps = {
  searchQuery: string
  mode: "select" | "navigate"
  onSelect?: (exercise: ExerciseWithRelations) => void
}

const ExerciseSearchResults = ({ searchQuery, mode, onSelect }: ExerciseResultProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["autocomplete-search", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery)
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No Search results for &ldquo;{searchQuery}&ldquo;</p>

  return (
    <ul>
      {data.map((exercise) => (
        <li key={exercise.id}>
          {mode === "navigate" && (
            <ExerciseLink slug={exercise.slug}>
              {exercise.name}
            </ExerciseLink>
          )}
          {<button onClick={() => onSelect?.(exercise)}>{exercise.name}</button>}
        </li>
      ))
      }
    </ul>
  )
}

export default ExerciseSearchResults