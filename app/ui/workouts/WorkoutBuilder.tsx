import { useWorkoutActions as workoutStore } from "@/app/lib/store/hooks/useWorkoutAction";
import { useWorkoutFormStore } from "@/app/lib/store/workoutFormStore";

const WorkoutBuilder = () => {
  const workout = useWorkoutFormStore((state) => state.workout);
  const { removeExercise, addSet, removeSet, updateSet } = workoutStore();

  return (
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
                  Set: {set.setNumber} - <input type="text" defaultValue={set.reps?.toString()} className="w-12 border" onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateSet(exercise.exerciseId, set.setNumber.toString(), { reps: isNaN(val) ? null : val });
                  }} />
                  <button onClick={() => removeSet(exercise.exerciseId, set.setNumber)}>remove set</button>
                </li>
              ))}
            </ul>
            <button onClick={() => addSet(exercise.exerciseId)}>&#43; Add Set</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutBuilder;
