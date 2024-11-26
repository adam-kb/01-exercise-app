import { isValidExercise } from "@/app/lib/utils";
import { fetchExercise } from "@/app/queries/useExercises";
import { notFound } from "next/navigation";
import ExerciseDataWrapper from "@/app/ui/exercises/ExerciseDataWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const EditPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  
  const exerciseSlug = (await params).slug;

  console.log(exerciseSlug);

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
        <ExerciseDataWrapper slug={exerciseSlug} edit={true} />
      </HydrationBoundary>
    </main>
  )
};

export default EditPage;
