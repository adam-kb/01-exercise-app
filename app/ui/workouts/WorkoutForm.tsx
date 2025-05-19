'use client';

import { Button, EditInput } from "@/app/ui/FormInputs";
import { useEffect, useState } from "react";
import { ApiErrorProps, WorkoutDraft } from "@/app/lib/definitions";
import { useWorkoutFormStore } from "@/app/lib/store/workoutFormStore";
import { useWorkoutActions as workoutStore } from "@/app/lib/store/hooks/useWorkoutAction";
import { useWorkoutMutation } from "@/app/queries/useWorkoutMutation";
import ExerciseSearch from "../search/ExerciseSearch";
import WorkoutBuilder from "./WorkoutBuilder";
import Card from "@/app/ui/Card";

type WorkoutFormProps = {
  mode: "update" | "create";
  existingWorkout?: WorkoutDraft;
}

const WorkoutForm = ({ mode, existingWorkout }: WorkoutFormProps) => {
  const [error, setError] = useState<ApiErrorProps | null>(null);

  const handleError = (error: ApiErrorProps) => {
    setError(error);
  }
  useEffect(() => {
    if (mode === "update" && existingWorkout) {
      useWorkoutFormStore.getState().hydrate(existingWorkout);
    }
  }, [mode, existingWorkout]);

  const workout = useWorkoutFormStore((state) => state.workout);
  const mutation = useWorkoutMutation({ mode, workout: workout, onError: handleError });
  const { setName, setDescription, addExercise } = workoutStore();

  const handleSubmit = () => {
    mutation.mutate(workout)
  }

  let buttonText;

  if (mutation.isPending) {
    buttonText = "Processing...";
  } else if (mode === "update") {
    buttonText = "Update Workout";
  } else {
    buttonText = "Create Workout";
  }
  return (
    <>
      <Card>
        <h1 className="text-3xl font-bold">{buttonText}</h1>

        {mode === "create" ? (<EditInput
          label="Workout Name"
          name="name"
          placeholder="Push Day 1, Pull Day 2, etc..."
          defaultValue={workout?.name}
          onChange={(e) => setName(e.target.value)}
        />) : (<p>{workout.name}</p>)}
        {mode === "update" && workout.id && <p>{workout.id}</p>}
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
        {error && error.message}
        <Button className="button-primary" disabled={mutation.isPending} onClick={handleSubmit}>{buttonText}</Button>
      </Card>
    </>
  )
}

export default WorkoutForm
