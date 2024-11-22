// export type Exercise = {
//   id: number;
//   name: string;
//   slug: string;
//   description?: string;
//   createdAt: Date;
//   updatedAt: Date;
//   muscleGroups: {
//     id: number;
//     name: string;
//     description?: string;
//   }[];
//   targetedMuscles: {
//     id: number;
//     name: string;
//   }[];
//   equipment: {
//     id: number;
//     name: string;
//     description?: string;
//   }[];
//   instructions: {
//     id: number;
//     instruction: string;
//   }[];
// };


export interface Exercise {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
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
