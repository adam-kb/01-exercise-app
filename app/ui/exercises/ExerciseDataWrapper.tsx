"use client";

import { useExercise } from "@/app/queries/useExercises";
import Exercise from "./Exercise";
import Loading from "../Loading";

const ExerciseDataWrapper = ({ slug }: { slug: string }) => {
  const { data: exercise, isPending, error } = useExercise(slug);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <span> Error: {error.message}</span>;
  }

  if (!exercise) {
    return <p>No exercise Found</p>;
  }

  return (
    <>
      <Exercise exercise={exercise} />
    </>
  );
};

export default ExerciseDataWrapper;
