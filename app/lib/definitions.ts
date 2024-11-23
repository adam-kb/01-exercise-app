import {
  Prisma,
  Difficulty as ExerciseDifficulty,
  ExerciseStatus,
} from "@prisma/client";

// Represents the output of a FeaturedExercise query, including the associated exercise with selected fields.
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

// Enum types
export type Difficulty = ExerciseDifficulty;
export type Status = ExerciseStatus;
