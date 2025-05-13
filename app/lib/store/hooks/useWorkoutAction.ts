import { useShallow } from "zustand/shallow";
import { useWorkoutFormStore } from "../workoutFormStore";

export const useWorkoutActions = () =>
  useWorkoutFormStore(
    useShallow((state) => ({
      setName: state.setName,
      setDescription: state.setDescription,
      addExercise: state.addExercise,
      removeExercise: state.removeExercise,
      addSet: state.addSet,
      removeSet: state.removeSet,
      updateSet: state.updateSet,
    }))
  );
