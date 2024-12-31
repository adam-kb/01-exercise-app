import { getQueryClient } from "../getQueryClient";
import { EquipmentDetailGroups } from "../lib/definitions";
import { fetchExerciseDetailOptions } from "./useEquipment";

const usePrefetchExerciseDetails = () => {
  const queryClient = getQueryClient();
  
  const prefetchDetails = () => {
    const exerciseDetailGroups: EquipmentDetailGroups[] = ["equipment", "muscleGroup", "targetMuscle"];
    
    exerciseDetailGroups.forEach((detail) => {
      queryClient.prefetchQuery({
        queryKey: [detail],
        queryFn: () => fetchExerciseDetailOptions(detail),
        staleTime: 1000 * 60 * 60
      });
    });
  }

  return prefetchDetails;
};

export default usePrefetchExerciseDetails;