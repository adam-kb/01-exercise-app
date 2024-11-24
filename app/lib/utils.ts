import prisma from "@/app/lib/prisma";
import { ExerciseStatus } from "@prisma/client";
import { ValidateExerciseOptions } from "./definitions";


// TODO: Does this belong here? If not, where? Is this a util?
export const isValidExercise = async ({
  slug,
  id,
}: ValidateExerciseOptions) => {
  if (!slug && !id) {
    throw new Error("Exercise ID or slug must be provided.");
  }

  const exercise = await prisma.exercise.findFirst({
    where: {
      AND: [
        { status: ExerciseStatus.ACTIVE },
        {
          OR: [{ id, slug }],
        },
      ],
    },
  });
  return exercise !== null;
};
