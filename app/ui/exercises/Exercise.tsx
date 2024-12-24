import { FetchedExercise } from "@/app/lib/definitions";
import Link from "next/link";
import ExerciseThumbnail from "./ExerciseThumbnail";

const Exercise = ({ exercise }: { exercise: FetchedExercise }) => {
  return (
    <main>
      {exercise.media.length > 0 && exercise.media.map(item => (
        <ExerciseThumbnail key={item.mediaKey} media={item} />
      ))}

      <h1 className="text-3xl font-bold">
        <Link href={`/exercises/${exercise.slug}`}>
          {exercise.name}
        </Link>
      </h1>
      <h3 className="text-xl text-gray-700 font-bold">Description</h3>
      <p>{exercise.description}</p>
      <h3 className="text-xl text-gray-700 font-bold">
        How to perform the {exercise.name}
      </h3>
      <p>{exercise.instruction}</p>
      <h3 className="text-xl text-gray-700 font-bold">Equipment Needed:</h3>
      <ul>
        {exercise.equipment &&
          exercise.equipment.map((equipment) => (
            <li key={equipment.name}>
              <span>{equipment.name}</span>
            </li>
          ))}
      </ul>

      <h3 className="text-xl text-gray-700 font-bold">Muscle Groups:</h3>
      <ul>
        {exercise.muscleGroup &&
          exercise.muscleGroup.map((group) => (
            <li key={group.name}>
              <span>{group.name}</span>
            </li>
          ))}
      </ul>

      <h3 className="text-xl text-gray-700 font-bold">Targeted Muscles:</h3>
      <ul>
        {exercise.targetMuscle &&
          exercise.targetMuscle.map((muscle) => (
            <li key={muscle.name}>{muscle.name}</li>
          ))}
      </ul>
    </main>
  );
};

export default Exercise;
