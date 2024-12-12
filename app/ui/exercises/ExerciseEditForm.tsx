import { FetchedExercise } from "@/app/lib/definitions";

import ExerciseForm from "./ExerciseForm";
import Card from "../Card";

const ExerciseEditForm = ({ exercise }: { exercise: FetchedExercise }) => {
  return <Card><ExerciseForm mode="update" exercise={exercise} /></Card>;
};

export default ExerciseEditForm;
