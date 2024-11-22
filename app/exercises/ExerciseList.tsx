'use client'

import { useExercises } from "../queries/useExercises";

const ExerciseList = () => {
  const { isPending, isError, data: exercises, error } = useExercises();

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log(exercises);
  return (
    <ul>
      {exercises.map(exercise => (
        <li key={exercise.id}>
          <h3>{exercise.name}</h3>
          <p>{exercise.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default ExerciseList;
