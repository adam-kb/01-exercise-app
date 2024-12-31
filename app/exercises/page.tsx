import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Exercises from "@/app/ui/exercises/Exercises";
import { fetchExercises } from "../queries/useExercises";
import { getQueryClient } from "../getQueryClient";

const ExercisesPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infiniteExercises"],
    queryFn: ({ pageParam = 0 }) => fetchExercises({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <main>
      <h2 className="text-4xl font-bold text-slate-800">Exercises Page</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Exercises />
      </HydrationBoundary>
    </main>
  );
};

export default ExercisesPage;
