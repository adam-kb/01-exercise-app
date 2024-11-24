"use client";

import { useExercise } from "@/app/queries/useExercises";

const Exercise = ({ slug }: { slug: string }) => {
  const { isPending, isError, data: exercise, error } = useExercise(slug);
  
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(exercise);

  return (
    <>
      <h1>{exercise.name}</h1>
    </>
  );
};

export default Exercise;
