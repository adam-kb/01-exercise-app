import { isValidExercise } from "@/app/lib/utils";
import { fetchExercise } from "@/app/queries/useExercises";
import ExerciseDataWrapper from "@/app/ui/exercises/ExerciseDataWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

const ExercisePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const exerciseSlug = (await params).slug;

  const slugExists = await isValidExercise({ slug: exerciseSlug });

  if (!slugExists) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["exercises", exerciseSlug],
    queryFn: () => fetchExercise(exerciseSlug),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExerciseDataWrapper slug={exerciseSlug} />
      </HydrationBoundary>
    </main>
  );
};

export default ExercisePage;
