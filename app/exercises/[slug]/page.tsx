import { getQueryClient } from "@/app/getQueryClient";
import { isValidExercise } from "@/app/lib/utils";
import { getExerciseData } from "@/app/queries/useExercises";
import ExerciseDataWrapper from "@/app/ui/exercises/ExerciseDataWrapper";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function isExerciseAvailable(slug: string): Promise<boolean> {
  const { exerciseStatus } = await isValidExercise({ slug });
  return exerciseStatus !== null;
}

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {

  const exerciseSlug = (await params).slug

  if (!(await isExerciseAvailable(exerciseSlug))) {
    return {}; // Skip metadata generation
  }

  const exercise = await getExerciseData(exerciseSlug);

  return {
    title: exercise.name,
    description: exercise.description
  }
}

const ExercisePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {

  const exerciseSlug = (await params).slug;

  const { exerciseStatus } = await isValidExercise({ slug: exerciseSlug });

  if (!exerciseStatus) {
    notFound();
  }

  if (exerciseStatus === "ARCHIVED") {
    return <p>Exercise has been archived.</p>
  }

  const queryClient = getQueryClient();
  const exercise = await getExerciseData(exerciseSlug);

  queryClient.setQueryData(["exercises", exerciseSlug], exercise);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExerciseDataWrapper slug={exerciseSlug} edit={false} />
      </HydrationBoundary>
    </main>
  );
};

export default ExercisePage;
