import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
import { ExerciseFormInputs, ValidateExerciseOptions } from "./definitions";

// TODO: Does this belong here? If not, where? Is this a util?
export const isValidExercise = async ({
  slug,
  id,
}: ValidateExerciseOptions): Promise<{
  exerciseStatus: ExerciseStatus | null;
}> => {
  if (!slug && !id) {
    return { exerciseStatus: null };
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

  if (!exercise) {
    return { exerciseStatus: null}
  }

  return { exerciseStatus: exercise.status };
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

const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0; // Generate a random number between 0 and 15
    const value = char === "x" ? random : (random & 0x3) | 0x8; // Adjust for 'y' in the UUID
    return value.toString(16); // Convert to hexadecimal
  });
};

// Example usage
export const appendUUIDToFileName = (fileName: string): string => {
  const uuid = generateUUID();
  const extension = fileName.split(".").pop(); // Get the file extension
  const baseName = fileName.replace(/\.[^/.]+$/, ""); // Remove the extension
  return `${baseName}-${uuid}.${extension}`;
};

export const validateForm = (data: Partial<ExerciseFormInputs>) => {
  if (!data.name) throw new Error("Name is required");
  if (!data.difficulty) throw new Error("Difficulty is required");
};

export const handleFileUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Could not upload file");
  }

  const { mediaKey } = await response.json();
  return mediaKey;
};
