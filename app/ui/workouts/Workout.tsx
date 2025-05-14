import { WorkoutDraft } from "@/app/lib/definitions";
import WorkoutSetOverview from "./WorkoutSetOverview";

const Workout = ({ workout }: { workout: WorkoutDraft }) => {

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold inline-block">{workout.name}</h1> <span className="text-md text-gray-500 italic">by {workout.authorUserName}</span>
        {workout.description && <p>{workout.description}</p>}
      </div>
      <div>
        <h2 className="text-2xl">Exercises</h2>
        <ul>
          {workout.exercises.map(exercise => (
            <li key={exercise.exerciseId}>
              <div>
                <h3>{exercise.name}</h3>
                <p>{exercise.note}</p>
                <WorkoutSetOverview sets={exercise.intendedSets} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Workout;
