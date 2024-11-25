import { Exercise as ExercistType } from "@/app/lib/definitions";

const Exercise = ({ exercise }: { exercise: ExercistType }) => {

  return <main>
    <h1 className="text-3xl font-bold">{exercise.name}</h1>
    <p>{exercise.description}</p>

    <h3 className="text-xl text-gray-700 font-bold">Equipment Needed:</h3>
    <ul>
      {exercise.equipment && exercise.equipment.map(equipment => (
        <li key={equipment.name}>
          <span>{equipment.name}</span>
        </li>
      ))}
    </ul>

    <h3 className="text-xl text-gray-700 font-bold">Muscle Groups:</h3>
    <ul>
      {exercise.muscleGroups && exercise.muscleGroups.map(group => (
        <li key={group.name}>
          <span>{group.name}</span>
        </li>
      ))}
    </ul>

    <h3 className="text-xl text-gray-700 font-bold">Targeted Muscles:</h3>
    <ul>
    {exercise.targetedMuscles && exercise.targetedMuscles.map(muscles => (
      <li key={muscles.name}>{muscles.name}</li>
    ))}
    </ul>
  </main>
}

export default Exercise;
