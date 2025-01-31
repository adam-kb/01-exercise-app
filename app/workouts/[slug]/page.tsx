import { getQueryClient } from "@/app/getQueryClient";
import { getWorkoutData } from "@/app/queries/useWorkouts";
import Workout from "@/app/ui/workouts/Workout";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const WorkoutPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const workoutSlug = (await params).slug;

  const queryClient = getQueryClient();
  const workoutData = await getWorkoutData(workoutSlug);

  queryClient.setQueryData(["workouts", workoutSlug], workoutData);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>Workout Page</h1>
        <Workout workout={workoutData} />
      </HydrationBoundary>
    </main>
  )
}

export default WorkoutPage;