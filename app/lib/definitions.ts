// import {
//   Prisma,
//   Difficulty as ExerciseDifficulty,
//   Status as ExerciseStatus
// } from "@prisma/client";

// export type Exercise = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string | null;
//   difficulty: Difficulty;
//   instruction: string | null;
//   targetMuscle: { name: string }[];
//   muscleGroup: { name: string }[];
//   equipment: { name: string }[];
// };

// export type UpdateExercise = {
//   id: string,
//   name: string;
//   slug?: string;
//   description: string | null;
//   difficulty: Difficulty;
//   instruction: string | null;
//   targetMuscle: { id: string }[];
//   muscleGroup: { id: string }[];
//   equipment: { id: string }[];
// }

// export type ExerciseForForm = {
//   id: string,
//   name: string;
//   slug?: string;
//   description: string | null;
//   difficulty: Difficulty;
//   instruction: string | null;
//   targetMuscle: { name: string }[];
//   muscleGroup: { name: string }[];
//   equipment: { name: string }[];
// }

// // naming is hard
// export type ExerciseDetailObjectShape = {
//   id: number;
//   name: string;
//   description?: string;
// }

// // Enum types
// export type Difficulty = ExerciseDifficulty;
// export type Status = ExerciseStatus;

// export type ExerciseLinkProps = {
//   href: string;
//   slug: string;
//   children: string;
// }

// // Represents the output of a FeaturedExercise query, including the associated exercise with selected fields.


// export type ValidateExerciseOptions = {
//   slug?: string;
//   id?: number;
// };

// export type Equipment = ExerciseDetailObjectShape
// export type MuscleGroup = ExerciseDetailObjectShape
// export type TargetMuscle = ExerciseDetailObjectShape

// import { Prisma, Difficulty as ExerciseDifficulty, Status as ExerciseStatus } from "@prisma/client";

// // Base Exercise type from Prisma
// export type ExerciseBase = Prisma.ExerciseGetPayload<{
//   include: {
//     targetMuscle: { select: { name: true } };
//     muscleGroup: { select: { name: true } };
//     equipment: { select: { name: true } };
//   };
// }>;

// // Use when fetching or displaying exercise details
// export type Exercise = Omit<ExerciseBase, "id" | "createdAt" | "updatedAt"> & { id: string };

// // Use when creating a new exercise
// export type CreateExercise = Omit<Exercise, "id" | "slug">;

// // Use when updating an exercise
// export type UpdateExercise = Omit<Exercise, "slug">;

// // Type for form inputs
// export type ExerciseFormInputs = Partial<CreateExercise | UpdateExercise>;

// export type FetchedExercise = Prisma.ExerciseGetPayload<{
//   select: {
//     id: true;
//     name: true;
//     slug: true;
//     description: true;
//     instruction: true;
//     difficulty: true;
//     status: true;
//     targetMuscle: { select: { name: true } };
//     muscleGroup: { select: { name: true } };
//     equipment: { select: { name: true } };
//   };
// }>;


import { Prisma, Difficulty as ExerciseDifficulty, Status as ExerciseStatus } from "@prisma/client";

// Reusable Select Objects for Queries
export const unifiedExerciseSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  instruction: true,
  difficulty: true,
  status: true,
  targetMuscle: { select: { id: true, name: true } }, // Unified: Fetch both `id` and `name`
  muscleGroup: { select: { id: true, name: true } },
  equipment: { select: { id: true, name: true } },
} as const;

// Minimal Exercise Select (e.g., for lists or summaries)
export const minimalExerciseSelect = {
  id: true,
  name: true,
  slug: true,
} as const;

// Dynamic Types for Queries
export type UnifiedExercise = Prisma.ExerciseGetPayload<{
  select: typeof unifiedExerciseSelect;
}>;

export type MinimalExercise = Prisma.ExerciseGetPayload<{
  select: typeof minimalExerciseSelect;
}>;

// CRUD Operation Types
export type CreateExercise = Omit<UnifiedExercise, "id" | "slug" | "status" | "targetMuscle" | "muscleGroup" | "equipment"> & {
  targetMuscle: { id: string }[]; // Use `id` for creating/updating
  muscleGroup: { id: string }[];
  equipment: { id: string }[];
};

export type UpdateExercise = Omit<CreateExercise, "slug"> & { id: string };

// Form Input Types
export type ExerciseFormInputs = Partial<CreateExercise>;

// Enum Types
export type Difficulty = ExerciseDifficulty;
export type Status = ExerciseStatus;

// Utility for Fetched Exercise (Unified Query Example)
export type FetchedExercise = UnifiedExercise;

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
