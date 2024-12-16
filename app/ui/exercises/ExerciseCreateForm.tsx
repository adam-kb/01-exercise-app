import Card from "../Card";
import ExerciseForm from "./ExerciseForm";

const ExerciseCreateform = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Create an Exercise</h2>
      <Card><ExerciseForm mode="create" /></Card>
    </>
  )
};

export default ExerciseCreateform;
