import { Difficulty } from "@prisma/client";
import { z } from "zod";

const FormSchema = z.object({
  id: z.coerce.number(),
  name: z.string().max(40, {message: "Please keep the name under 40 characters."}),
  slug: z.string(),
  description: z.string().max(250, {message: "Please keep the description under 250 characters."}).optional(),
  difficulty: z.nativeEnum(Difficulty),
  instruction: z.string().max(250, {message: "Please keep the description under 250 characters."}).optional(),
  muscleGroup: z.array(z.object({id: z.coerce.number()})).optional(),
  targetMuscle: z.array(z.object({id: z.coerce.number()})).optional(),
  equipment: z.array(z.object({id: z.coerce.number()})).optional(),
});

export const UpdateExerciseSchema = FormSchema.omit({slug: true});

export const CreateExerciseSchema = FormSchema.omit({id: true, slug: true});