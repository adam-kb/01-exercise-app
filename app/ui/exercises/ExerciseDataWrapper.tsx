"use client";

import { useExercise } from "@/app/queries/useExercises";
import Exercise from "./Exercise";
import Loading from "../Loading";
import ExerciseEditForm from "./ExerciseEditForm";
import Link from "next/link";
import Card from "../Card";
import usePrefetchExerciseDetails from "@/app/queries/usePrefetchExerciseDetails";

const ExerciseDataWrapper = ({
  slug,
  edit,
}: {
  slug: string;
  edit: boolean;
}) => {
  const { data: exercise, isLoading, isError, error } = useExercise(slug);
  
  const handleInteraction = usePrefetchExerciseDetails();
  
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span> Error: {error.message}</span>;
  }

  if (!exercise) {
    return <p>No exercise Found</p>;
  }

  if (edit) {
    return <ExerciseEditForm exercise={exercise} />;
  }

  return (
    <>
      <Card>
        <Link href={`/exercises/${slug}/edit`} onMouseEnter={handleInteraction} onFocus={handleInteraction}>Edit Exercise</Link>
        <Exercise exercise={exercise} />
      </Card>
    </>
  );
};

export default ExerciseDataWrapper;
