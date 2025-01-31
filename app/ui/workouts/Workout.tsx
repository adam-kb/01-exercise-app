import { Workout as WorkoutData } from "@/app/lib/definitions";

const Workout = ({ workout }: { workout: WorkoutData }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold inline-block">{workout.name}</h1> <span className="text-md text-gray-500 italic">by {workout.author.userName}</span>
      </div>
      <div>
        <h2 className="text-2xl">Exercises</h2>
        <ul>
          {workout.exercises.map(assignedExercise => (
            <li key={assignedExercise.exercise.id}>
              <div>
                <h3>{assignedExercise.exercise.name}</h3>
                <p>{assignedExercise.exercise.description}</p>
                <ul className=" flex-col gap-2">
                  {assignedExercise.intendedSets.map(set => (
                    <li className="gap-2 flex" key={set.id}>
                      <span>{set.setNumber} {set.reps} &times; {set.weight}</span>
                      <input type="number" className="border" id={`user-set-${set.id}`} placeholder={set.reps?.toString()}></input>
                      <input type="number" className="border" id={`user-weight-${set.id}`} placeholder={set.weight?.toString()}></input>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Workout;
