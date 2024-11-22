'use client'

import Link from "next/link";
import { useExercises } from "../queries/useExercises";

const ExerciseList = () => {
  const { isPending, isError, data: exercises, error } = useExercises();

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {exercises.map(exercise => (
        <li key={exercise.id}>
          <Link href={`/exercises/${exercise.slug}`} >{exercise.name}</Link>
          <p>{exercise.description}</p>
          <ul>{exercise.equipment.map((exercise) => (
            <li key={exercise.id + 'equip'}>{exercise.name}</li>
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
