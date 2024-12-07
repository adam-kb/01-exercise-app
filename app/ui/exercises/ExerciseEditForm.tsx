import { FetchedExercise } from "@/app/lib/definitions";
import ExerciseForm from "./ExerciseForm";

const ExerciseEditForm = ({ exercise }: { exercise: FetchedExercise }) => {

  return (
    <main>
      <ExerciseForm
        mode="update"
        exercise={exercise}
      />
    </main>
  );
};

export default ExerciseEditForm;
