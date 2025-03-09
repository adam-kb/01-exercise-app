import ExerciseCreateform from "@/app/ui/exercises/ExerciseCreateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
  description: "Create an exercise",
};

const CreateExercisePage = () => {
  return (
    <main>
      <ExerciseCreateform />
    </main>
  )
};

export default CreateExercisePage
