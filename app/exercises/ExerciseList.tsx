'use client'

import Link from "next/link";
import { useExercises } from "../queries/useExercises";

const ExerciseList = () => {
  const { isPending, isError, data: featuredExercises, error } = useExercises();

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const flattenedFeaturedExercises = featuredExercises.map(featured => featured.exercise)

  return (
    <ul>
      {flattenedFeaturedExercises.map(exercise => (
        <li key={exercise.id} className="my-4">
          <h1 className="text-2xl font-bold">
            <Link href={`/exercises/${exercise.slug}`} >{exercise.name}</Link>
          </h1>
          <p>{exercise.description}</p>

          <h2 className="font-bold">Equipment:</h2>
          <ul>
            {exercise.equipment.map(equipment => (
              <li key={equipment.name}>{equipment.name}</li>
            )
            )}
          </ul>

            <h2 className="font-bold">Muscle Groups</h2>
          <ul>
            {exercise.muscleGroups.map(group => (
              <li key={group.name}>{group.name}</li>
            )
            )}
          </ul>
        </li>
      ))
      }
    </ul >
  )
}

export default ExerciseList;
