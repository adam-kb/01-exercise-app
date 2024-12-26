import { fetchFeaturedExercises } from "@/app/queries/useExercises";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Exercises from "@/app/ui/exercises/Exercises";

import { getQueryClient } from "@/app/getQueryClient";
import { FeatureExerciseOutputData } from "@/app/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured | Exercise App",
  description: "Homepage of the Exercise App",
};

const FeaturedExercisePage = async () => {
  const queryClient = getQueryClient();

  const exercises: FeatureExerciseOutputData[] = await queryClient.fetchQuery({
    queryKey: ["exercises", "featured"],
    queryFn: fetchFeaturedExercises,
  });

  return (
    <main>
      {exercises.map(featured => (
        <div key={featured.exercise.id}>
          <p>{featured.exercise.name}</p>
        </div>
      ))}
    </main>
  )
}

export default FeaturedExercisePage;