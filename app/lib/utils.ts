import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
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

export const isOptionCurrent = <T extends object>(
  option: T,
  currentValues: T[],
  key: keyof T
): boolean => {
  return currentValues.some((current) => current[key] === option[key]);
};

export const slugify = (name: string): string => {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove non-alphanumeric characters except hyphens
};