export interface Exercise {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  difficulty: Difficulty; // Enum type for difficulty
  featured?: FeaturedExercise; // Link to the FeaturedExercise model
  muscleGroups: MuscleGroup[];
  targetedMuscles: TargetedMuscle[];
  equipment: Equipment[];
  instructions: ExerciseInstruction[];
}

export interface MuscleGroup {
  id: number;
  name: string;
  description?: string;
}

export interface TargetedMuscle {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
  description?: string;
}

export interface ExerciseInstruction {
  id: number;
  instruction: string;
}

export interface FeaturedExercise {
  id: number;
  exerciseId: number; // References the Exercise model
  featuredAt: Date; // Timestamp for when the exercise was featured
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';