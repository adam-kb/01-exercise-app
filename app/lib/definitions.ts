import {
  Prisma,
  Difficulty as ExerciseDifficulty,
  ExerciseStatus,
} from "@prisma/client";

export type Exercise = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  difficulty: Difficulty;
  targetedMuscles: { name: string }[];
  muscleGroups: { name: string }[];
  equipment: { name: string }[];
};

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

export type ExerciseLinkProps = {
  href: string;
  slug: string;
  children: string;
}
