import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
import { ValidateExerciseOptions } from "./definitions";

// TODO: Does this belong here? If not, where? Is this a util?
export const isValidExercise = async ({
  slug,
  id,
}: ValidateExerciseOptions): Promise<{exerciseStatus: ExerciseStatus | null}> => {
  if (!slug && !id) {
    return {exerciseStatus: null}
  }

  const exercise = await prisma.exercise.findFirst({
    where: {
      AND: [
        // { status: ExerciseStatus.ACTIVE },
        {
          OR: [{ id, slug }],
        },
      ],
    },
  });

  if(!exercise) {
    throw new Error("Exercise not found")
  }
  
  return {exerciseStatus: exercise.status};
};

export const isOptionCurrent = <T extends object>(
  option: T,
  currentValues: T[] | undefined,
  key: keyof T
): boolean => {
  return !!currentValues?.some((current) => current[key] === option[key]);
};

export const slugify = (name: string): string => {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove non-alphanumeric characters except hyphens
};