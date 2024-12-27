import { Difficulty, MediaType, Status } from "@prisma/client";
import { z } from "zod";

const MediaSchema = z.object({
  mediaKey: z
    .string()
    .min(1,"Media key is required")
    .max(60, "Filename is too long")
    .regex(
      /^(?:[a-zA-Z0-9_-]{11,}|[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png))$/,
      "Invalid media key format. Must be a valid YouTube ID or a file name (e.g., push-up.jpg)."
    ),
  type: z.nativeEnum(MediaType),
});

const FormSchema = z.object({
  id: z.coerce.number(),
  name: z.string().max(40, {message: "Please keep the name under 40 characters."}),
  slug: z.string(),
  description: z.string().max(250, {message: "Please keep the description under 250 characters."}).optional(),
  difficulty: z.nativeEnum(Difficulty),
  status: z.nativeEnum(Status).optional(),
  media: z.array(MediaSchema).optional(),
  instruction: z.string().max(250, {message: "Please keep the instruction under 250 characters."}).optional(),
  muscleGroup: z.array(z.object({id: z.coerce.number()})).optional(),
  targetMuscle: z.array(z.object({id: z.coerce.number()})).optional(),
  equipment: z.array(z.object({id: z.coerce.number()})).optional(),
});

export const UpdateExerciseSchema = FormSchema.omit({slug: true});

export const CreateExerciseSchema = FormSchema.omit({id: true, slug: true});