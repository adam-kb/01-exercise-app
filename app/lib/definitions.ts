import {
  Prisma,
  Difficulty as ExerciseDifficulty,
  Status as ExerciseStatus
} from "@prisma/client";

export type Exercise = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  difficulty: Difficulty;
  instruction: string | null;
  targetMuscle: { name: string }[];
  muscleGroup: { name: string }[];
  equipment: { name: string }[];
};

export type UpdateExercise = {
  name: string;
  description: string | null;
  difficulty: Difficulty;
  instruction: string | null;
  targetedMuscles: { id: string }[];
  muscleGroups: { id: string }[];
  equipment: { id: string }[];
}

// naming is hard
export type ExerciseDetailObjectShape = {
  id: number;
  name: string;
  description?: string;
}

// Enum types
export type Difficulty = ExerciseDifficulty;
export type Status = ExerciseStatus;

export type ExerciseLinkProps = {
  href: string;
  slug: string;
  children: string;
}

// Represents the output of a FeaturedExercise query, including the associated exercise with selected fields.
export type FeatureExerciseOutputData = Prisma.FeatureExerciseGetPayload<{
  include: {
    exercise: {
      select: {
        id: true;
        name: true;
        slug: true;
        description: true;
        instruction: true;
        difficulty: true;
        muscleGroup: { select: { name: true } };
        targetMuscle: { select: { name: true } };
        equipment: { select: { name: true } };
      };
    };
  };
}>;

export type ValidateExerciseOptions = {
  slug?: string;
  id?: number;
};

export type Equipment = ExerciseDetailObjectShape
export type MuscleGroup = ExerciseDetailObjectShape
export type TargetMuscle = ExerciseDetailObjectShape
