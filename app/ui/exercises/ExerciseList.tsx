"use client";

import { useFeaturedExercises } from "@/app/queries/useExercises";
import ExerciseLink from "./ExerciseLink";

const ExerciseList = () => {
  const {
    isPending,
    isError,
    data: featuredExercises,
    error,
  } = useFeaturedExercises();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const flattenedFeaturedExercises = featuredExercises.map(
    (featured) => featured.exercise
  );

  return (
    <ul>
      {flattenedFeaturedExercises.map((exercise) => (
        <li key={exercise.id} className="my-4">
          <h1 className="text-2xl font-bold">
            <ExerciseLink
              href={`/exercises/${exercise.slug}`}
              slug={exercise.slug}
            >
              {exercise.name}
            </ExerciseLink>
          </h1>
          <p>{exercise.description}</p>

          <h2 className="font-bold">Equipment:</h2>
          <ul>
            {exercise.equipment.map((equipment) => (
              <li key={equipment.name}>{equipment.name}</li>
            ))}
          </ul>

          <h2 className="font-bold">Muscle Groups</h2>
          <ul>
            {exercise.muscleGroups.map((group) => (
              <li key={group.name}>{group.name}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ExerciseList;
