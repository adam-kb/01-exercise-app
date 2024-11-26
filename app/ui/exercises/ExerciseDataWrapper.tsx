"use client";

import { useExercise } from "@/app/queries/useExercises";
import Exercise from "./Exercise";
import Loading from "../Loading";
import ExerciseEditForm from "./ExerciseEditForm";
import Link from "next/link";

const ExerciseDataWrapper = ({ slug, edit }: { slug: string, edit: boolean }) => {
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

  if(edit) {
    return <ExerciseEditForm exercise={exercise} />
  }

  return (
    <>
      <Link href={`/exercises/${slug}/edit`}>Edit Exercise</Link>
      <Exercise exercise={exercise} />
    </>
  );
};

export default ExerciseDataWrapper;
