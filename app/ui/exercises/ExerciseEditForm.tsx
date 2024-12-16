import { FetchedExercise } from "@/app/lib/definitions";

import ExerciseForm from "./ExerciseForm";
import Card from "../Card";

const ExerciseEditForm = ({ exercise }: { exercise: FetchedExercise }) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Edit Exercise: {exercise.name}</h2>
      <Card><ExerciseForm mode="update" exercise={exercise} /></Card>;
    </>
  )
};

export default ExerciseEditForm;
