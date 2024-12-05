import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { UpdateExercise } from "@/app/lib/definitions";

type MuscleGroupInput = {
  id: string;
};

export const PUT = async (request: Request) => {
  try {
    console.log('API route hit');
    const data = await request.json() as UpdateExercise;
    console.log('Data received in PUT:', data);

    const targetedMuscles: MuscleGroupInput[] = data.targetedMuscles.map(m => ({id: m.id}))

    const updatedExercise = await prisma.exercise.update({
      where: { name: data.name},
      data: {
        name: data.name,
        description: data.description,
        difficulty: data.difficulty,
        targetedMuscles: {
          // set: targetedMuscles
        }
      }
    })

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
