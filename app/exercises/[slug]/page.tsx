import { getQueryClient } from "@/app/getQueryClient";
import { isValidExercise } from "@/app/lib/utils";
import { fetchExercise } from "@/app/queries/useExercises";
import ExerciseDataWrapper from "@/app/ui/exercises/ExerciseDataWrapper";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

const ExercisePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const exerciseSlug = (await params).slug;

  const {exerciseStatus} = await isValidExercise({ slug: exerciseSlug });

  if (!exerciseStatus) {
    notFound();
  }

  if(exerciseStatus === "ARCHIVED") {
    return <p>Exercise has been archived.</p>
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["exercises", exerciseSlug],
    queryFn: () => fetchExercise(exerciseSlug),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExerciseDataWrapper slug={exerciseSlug} edit={false} />
      </HydrationBoundary>
    </main>
  );
};

export default ExercisePage;
