import ExerciseCreateform from "@/app/ui/exercises/ExerciseCreateForm";
import { Difficulty } from "@prisma/client";

const defaultValues = {
  name: "",
  description: "",
  instruction: "",
  difficulty: Difficulty.Beginner, // Replace with your actual default
  muscleGroup: [],
  targetMuscle: [],
  equipment: [],
};

const CreateExercisePage = () => {
  return (
    <main>
      <ExerciseCreateform exercise={defaultValues}/>
    </main>
  )
};

export default CreateExercisePage