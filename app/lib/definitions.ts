import {
  Prisma,
  Difficulty as ExerciseDifficulty,
  Status as ExerciseStatus,
  MediaType,
} from "@prisma/client";

// Reusable Select Objects for Queries
export const unifiedExerciseSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  instruction: true,
  difficulty: true,
  status: true,
  media: { select: { mediaKey: true, type: true} },
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


export const WorkoutSelect = {
    author: {
      select: {
        userName: true
      }
    },
    exercises: {
      include: {
        exercise: true,
        intendedSets: true
      },
    }
} as const;

export type Workout = Prisma.WorkoutGetPayload<{
  include: typeof WorkoutSelect
}>;

export type WorkoutsResponse = {
  workouts: Workout[]
}

// CRUD Operation Types
export type CreateExercise = Omit<
  UnifiedExercise,
  "id" | "slug" | "status" | "targetMuscle" | "muscleGroup" | "equipment" | "media"
> & {
  media?: [{mediaKey: string, type: MediaType}];
  targetMuscle: { id: string }[]; // Use `id` for creating/updating
  muscleGroup: { id: string }[];
  equipment: { id: string }[];
};

export type UpdateExercise = Omit<CreateExercise, "slug"> & {
  id: string,
  media?: [{mediaKey: string, type: MediaType}];
};

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
        media: { select: {mediaKey: true, type: true} };
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

export type ExerciseDetailObjectShape = {
  id: number;
  name: string;
  description?: string;
};

export type Equipment = ExerciseDetailObjectShape;
export type MuscleGroup = ExerciseDetailObjectShape;
export type TargetMuscle = ExerciseDetailObjectShape;

export type ExerciseLinkProps = {
  href?: string;
  slug: string;
  children: string;
};

export type MutateFn<TInput, TOutput> = (data: TInput) => Promise<TOutput>;

export type QueryResponse = {
  [key: string]: string;
};

export type ExerciseWithRelations = Prisma.ExerciseGetPayload<{
  include: {
    equipment: true;
    muscleGroup: true;
    targetMuscle: true;
  };
}>;

export type SearchResponse = {
  exercises: ExerciseWithRelations[];
};

export type ExerciseMedia = {
  media: { select: { mediaKey: true} }
}


export type ExerciseFormProps = {
  mode: "create" | "update";
  exercise?: FetchedExercise;
};

export class ApiError extends Error {
  details: unknown;

  constructor (message: string, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.details = details;
  }

}

export type EquipmentDetailGroups = "equipment" | "muscleGroup" | "targetMuscle";

type ApiErrorDetails = {
  message: string;
  errorCode: string;
  path: (string | number)[]
}

export type ApiErrorProps = {
  name: string;
  message: string;
  details: ApiErrorDetails[],
}