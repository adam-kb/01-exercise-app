import { WorkoutDraft } from "@/app/lib/definitions";

const Workout = ({ workout }: { workout: WorkoutDraft }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold inline-block">{workout.name}</h1> <span className="text-md text-gray-500 italic">by {workout.authorUserName}</span>
      </div>
      <div>
        <h2 className="text-2xl">Exercises</h2>
        <ul>
          {workout.exercises.map(exercise => (
            <li key={exercise.exerciseId}>
              <div>
                <h3>{exercise.name}</h3>
                <p>{exercise.note}</p>
                <ul className=" flex-col gap-2">
                  {exercise.intendedSets.map(set => (
                    <li className="gap-2 flex" key={set.setNumber}>
                      <span>{set.setNumber} {set.reps}</span>
                      {/* <input type="number" className="border" id={`user-set-${set.id}`} placeholder={set.reps?.toString()}></input> */}
                      {/* <input type="number" className="border" id={`user-weight-${set.id}`} placeholder={set.weight?.toString()}></input> */}
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
