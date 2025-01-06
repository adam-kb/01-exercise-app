import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchWorkouts } from "../queries/useWorkouts";
import { getQueryClient } from "../getQueryClient";
import { WorkoutsResponse } from "../lib/definitions";
import Card from "../ui/Card";

const WorkoutsPage = async () => {
  const queryClient = getQueryClient();

  const data: WorkoutsResponse = await queryClient.fetchQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {data && (
          <>
            <ul>
              {data.workouts.map(workout => (
                <li key={workout.id}>
                  <Card>
                    <p>{workout.name}</p>
                    <ul>
                      {workout.exercises.map(exercise => (
                        <li key={exercise.exercise.id}>
                          <p>{exercise.exercise.name}</p>

                          {exercise.intendedSets.length > 0 && (
                            <ul>
                              {exercise.intendedSets.map(set => (
                                <li key={set.id}>{set.setNumber} {set.reps} x {set.weight}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </HydrationBoundary>
    </main>
  )
}

export default WorkoutsPage;
