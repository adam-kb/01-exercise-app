import { Difficulty } from "@prisma/client";
import { z } from "zod";
import prisma from "./prisma";

// const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

const FormSchema = z.object({
  id: z.number(),
  name: z.string().max(40, {message: "Please keep the name under 40 characters."}),
  slug: z.string(),
  description: z.string().max(250, {message: "Please keep the description under 250 characters."}),
  difficulty: z.nativeEnum(Difficulty),
  muscleGroups: z.array(z.string()),
  targetMuscles: z.array(z.string()),
  equipment: z.array(z.string()),
});

const UpdateExercise = FormSchema.omit({id: true, slug: true});

export const updateExercise = async (id: number, formData: FormData) => {
  const {name, description, difficulty, muscleGroups, targetMuscles, equipment} = UpdateExercise.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    difficulty: formData.get('difficulty'),
    muscleGroups: formData.get('muscleGroups'),
    targetMuscles: formData.get('targetMuscles'),
    equipment: formData.get('equipment')
  });

  try {
    const exerciseData = await prisma.exercise.findUnique({
      where: { id },
      // data: {
        // .. What data? Do we know whats updated? Does it matter if the value is the same? Does prisma skip a record that is of identical value
      // }
    })
  } catch (error) {
    //
  }
}