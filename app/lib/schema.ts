import { z } from "zod";

export const excerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  difficulty: z.string(),
  muscleGroups: z.array(z.string()),
  targetMuscles: z.array(z.string()),
  equipment: z.array(z.string()),
});
