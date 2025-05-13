import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { WorkoutDraft } from "../definitions";

type WorkoutFormStore = {
  workout: WorkoutDraft;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  // setAuthorId: (authorId: number) => void;
  // setAuthor: (author: string) => void; // should be scraped from the user etc etc. getting to it
  addExercise: (exerciseName: string, exerciseId: number) => void;
  removeExercise: (exerciseId: number) => void;
  addSet: (exerciseId: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  updateSet: (
    exerciseId: number,
    setNumber: string,
    updates: Partial<WorkoutDraft["exercises"][0]["intendedSets"][0]>
  ) => void;
};

const createSet = (index: number) => ({
  setNumber: index + 1,
  reps: "",
  weight: "",
});

export const useWorkoutFormStore = create<WorkoutFormStore>()(
  devtools(
    immer<WorkoutFormStore>((set) => ({
      workout: {
        name: "",
        slug: "",
        description: "",
        authorUserName: "testuser", // Mimic the only user we have username and id 
        authorId: 1,
        exercises: [],
      },
      setName: (name) =>
        set((state) => {
          state.workout.name = name;
        }),
      setDescription: (description) =>
        set((state) => {
          state.workout.description = description;
        }),
      addExercise: (exerciseName, exerciseId) =>
        set((state) => {
          const exercise = state.workout.exercises.find(e => e.exerciseId === exerciseId);
          if (exercise) return;
          
          state.workout.exercises.push({
            name: exerciseName,
            exerciseId,
            order: null,
            intensity: null,
            note: "",
            duration: 0,
            intendedSets: [createSet(0), createSet(1), createSet(2)],
          });
        }),
      removeExercise: (exerciseId) =>
        set((state) => {
          state.workout.exercises = state.workout.exercises.filter(
            (e) => e.exerciseId !== exerciseId
          );
        }),
      addSet: (exerciseId) =>
        set((state) => {
          const exercise = state.workout.exercises.find(e => e.exerciseId === exerciseId);
          if (!exercise) return;

          const newSet = createSet(exercise.intendedSets.length)
          exercise.intendedSets.push(newSet);
        }),
      removeSet: (exerciseId, setNumber) =>
        set((state) => {
          const exercise = state.workout.exercises.find(e => e.exerciseId === exerciseId);
          if (!exercise) return;

          exercise.intendedSets = exercise.intendedSets
            .filter((set) => set.setNumber !== setNumber)
            .map((set, i: number) => ({
              ...set,
              setNumber: i + 1
            }))
        }),
      updateSet: (exerciseId, setNumber, updates) => 
        set((state) => {
          const exercise = state.workout.exercises.find(e => e.exerciseId === exerciseId);
          const setToUpdate = exercise?.intendedSets.find(set => set.setNumber === parseInt(setNumber))
          if(!setToUpdate) return

          Object.assign(setToUpdate, updates)
        }),
    }))
  )
);
