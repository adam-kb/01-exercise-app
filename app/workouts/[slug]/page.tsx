import { Metadata } from "next";
import { getQueryClient } from "@/app/getQueryClient";
import { getWorkoutData } from "@/app/queries/useWorkouts";
import Workout from "@/app/ui/workouts/Workout";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {

  const workoutSlug = (await params).slug

  const workout = await getWorkoutData(workoutSlug);

  return {
    title: workout.name,
    description: workout.description
  }
}

const WorkoutPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const workoutSlug = (await params).slug;

  const queryClient = getQueryClient();
  const workoutData = await getWorkoutData(workoutSlug);

  queryClient.setQueryData(["workouts", workoutSlug], workoutData);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Workout workout={workoutData} />
      </HydrationBoundary>
    </main>
  )
}

export default WorkoutPage;