import { Prisma } from "@prisma/client";

// Enum types
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Status = "ACTIVE" | "FEATURED" | "ARCHIVED";

// Custom output type based on Exercise
export type FeaturedExerciseOutputData = Prisma.FeaturedExerciseGetPayload<{
  include: {
    exercise: {
      select: {
        id: true;
        name: true;
        slug: true;
        description: true;
        difficulty: true;
        muscleGroups: { select: { name: true } };
        targetedMuscles: { select: { name: true } };
        equipment: { select: { name: true } };
      };
    };
  };
}>;
