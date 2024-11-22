export type Exercise = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  muscleGroups: {
    id: number;
    name: string;
    description: string;
  }[];
  targetedMuscles: {
    id: number;
    name: string;
  }[];
  equipment: {
    id: number;
    name: string;
  }[];
};