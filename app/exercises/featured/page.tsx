import { fetchFeaturedExercises } from "@/app/queries/useExercises";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/getQueryClient";
import { FeatureExerciseOutputData } from "@/app/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured",
  description: "Find featured Exercises",
};

const FeaturedExercisePage = async () => {
  const queryClient = getQueryClient();

  const exercises: FeatureExerciseOutputData[] = await queryClient.fetchQuery({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {exercises.map(featured => (
          <div key={featured.exercise.id}>
            <p>{featured.exercise.name}</p>
          </div>
        ))}
      </HydrationBoundary>
    </main>
  )
}

export default FeaturedExercisePage;