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

export const WorkoutFormSchema = z.object({
  name: z.string().min(1, "Workout name is required").trim(),
  slug: z.string().trim().optional(), // optional: regenerate server-side
  description: z.string().optional().nullable(),
  authorId: z.number().int().positive(),
  authorUserName: z.string(),
  exercises: z.array(
    z.object({
      name: z.string().min(1),
      exerciseId: z.number().int().positive(),
      order: z.number().int().nonnegative().optional().nullable(),
      intensity: z.number().int().optional().nullable(),
      note: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),

      intendedSets: z.array(
        z.object({
          setNumber: z.number().int().nonnegative(),
          reps: z.preprocess(
            (val) => {
              if (val === "" || val === null || val === undefined) return null;
              if (typeof val === "string") return parseInt(val, 10);
              return val;
            },
            z.union([z.number().int().nonnegative(), z.null()])
          ),
          weight: z.preprocess(
            (val) => {
              if (val === "" || val === null || val === undefined) return null;
              if (typeof val === "string") return parseFloat(val);
              return val;
            },
            z.union([z.number().nonnegative(), z.null()])
          ).optional(),
        })
      ).min(1, "Each exercise must include at least one set"),
    })
  ).min(1, "Workout must include at least one exercise"),
});