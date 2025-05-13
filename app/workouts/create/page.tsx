'use client';

import { EditInput } from "@/app/ui/FormInputs";
import { useState, useMemo, useEffect } from "react";
import ExerciseSearchResults from "@/app/ui/search/ExerciseSearchResults";
import { ApiErrorProps } from "@/app/lib/definitions";
import { useWorkoutFormStore } from "@/app/lib/store/workoutFormStore";
import { debounce } from "@/app/lib/utils";
import { useWorkoutActions as workoutStore } from "@/app/lib/store/hooks/useWorkoutAction";
import { useWorkoutMutation } from "@/app/queries/useWorkoutMutation";

const CreateWorkoutPage = () => {
  const [error, setError] = useState<ApiErrorProps | null>(null);

  const handleError = (error: ApiErrorProps) => {
    setError(error);
  }
  const workout = useWorkoutFormStore((state) => state.workout)
  const { setName, setDescription, addExercise, removeExercise, addSet, removeSet, updateSet } = workoutStore();

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log("Debounced search:", value);
    setSearchQuery(value)
  };

  const { callback: debouncedSearch, cancel } = useMemo(() => debounce(handleSearch, 300), []);

  const handleSubmit = () => {
    const mutation = useWorkoutMutation({ mode: "create", workout: workout, onError: handleError });
    mutation.mutate(workout)
  }
  useEffect(() => {
    return () => {
      cancel(); // cancel on unmount
    };
  }, [cancel]);

  return (<>
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
    <EditInput
      label="Choose Exercises"
      name="exercises"
      placeholder="Pushup, Pullup, Squat"
      defaultValue={inputValue}
      onChange={(e) => {
        const val = e.target.value;
        setInputValue(val)
        debouncedSearch(val)
      }}
    />

    {searchQuery && (
      <ExerciseSearchResults
        searchQuery={searchQuery}
        mode="select"
        onSelect={(exercise) => addExercise(exercise.name, exercise.id)} />
    )}

    <div>
      <h2 className="text-2xl font-bold">Selected Exercises for Workout</h2>
      <ul>
        {workout.exercises && workout.exercises.map(exercise => (
          <li key={exercise.exerciseId}>
            <button onClick={() => removeExercise(exercise.exerciseId)}>Remove Exercise</button>
            <h4 className="text-xl font-bold">{exercise.name}</h4>
            <ul>
              {exercise.intendedSets && exercise.intendedSets.map(set => (
                <li key={set.setNumber} className="mt-4">
                  Set: {set.setNumber} - <input type="text" value={set.reps?.toString()} className="w-12 border" onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateSet(exercise.exerciseId, set.setNumber.toString(), { reps: isNaN(val) ? null : val });
                  }} />
                  <button onClick={() => removeSet(exercise.exerciseId, set.setNumber)}>remove set</button>
                </li>
              ))}
            </ul>
            <button onClick={() => addSet(exercise.exerciseId)}>Add Set + </button>
          </li>
        ))}
      </ul>
    </div>
  </>
  )
}

export default CreateWorkoutPage;
