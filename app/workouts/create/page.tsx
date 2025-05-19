import WorkoutForm from "@/app/ui/workouts/WorkoutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
  description: "Create a workout",
};

const CreateWorkoutPage = () => {
  return <WorkoutForm mode="create" />
}

export default CreateWorkoutPage;
