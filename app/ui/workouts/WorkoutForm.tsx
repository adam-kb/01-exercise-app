'use client';

import { Button, EditInput } from "@/app/ui/FormInputs";
import { useState } from "react";
import { ApiErrorProps } from "@/app/lib/definitions";
import { useWorkoutFormStore } from "@/app/lib/store/workoutFormStore";
import { useWorkoutActions as workoutStore } from "@/app/lib/store/hooks/useWorkoutAction";
import { useWorkoutMutation } from "@/app/queries/useWorkoutMutation";
import ExerciseSearch from "../search/ExerciseSearch";
import WorkoutBuilder from "./WorkoutBuilder";

const WorkoutForm = () => {
  const [error, setError] = useState<ApiErrorProps | null>(null);

  const handleError = (error: ApiErrorProps) => {
    setError(error);
  }
  const workout = useWorkoutFormStore((state) => state.workout);
  const mutation = useWorkoutMutation({ mode: "create", workout: workout, onError: handleError });
  const { setName, setDescription, addExercise } = workoutStore();

  const handleSubmit = () => {
    mutation.mutate(workout)
  }

  let buttonText;

  if (mutation.isPending) {
    buttonText = "Processing...";
  // } else if (mode === "update") {
    // buttonText = "Update Exercise";
  } else {
    buttonText = "Create Workout";
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Create Workout</h1>

      <EditInput
        label="Workout Name"
        name="name"
        placeholder="Push Day 1, Pull Day 2, etc..."
        defaultValue={workout?.name}
        onChange={(e) => setName(e.target.value)}
      />
      <EditInput
        label="Workout Description"
        name="name"
        placeholder="What its about"
        defaultValue={workout?.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h2>Exercises</h2>
      <ExerciseSearch onSelect={({ name, id }) => addExercise(name, id)} />
      <WorkoutBuilder />
      <Button className="button-primary" disabled={mutation.isPending} onClick={handleSubmit}>{buttonText}</Button>
    </>
  )
}

export default WorkoutForm
