// import { fetchExercises } from "../queries/useExercises";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Exercises from "@/app/ui/exercises/Exercises";

const ExercisesPage = async () => {
  const queryClient = new QueryClient();

  // const exercises = await queryClient.fetchQuery({
  //   queryKey: ["exercises"],
  //   queryFn: fetchExercises,
  // });

  return (
    <main>
      <h2 className="text-4xl font-bold text-slate-800">Exercises Page</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Exercises />
      </HydrationBoundary>
    </main>
  )
}

export default ExercisesPage;
