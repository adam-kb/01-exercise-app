import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {

    const exercises2 = await prisma.exercise.
    const exercises = await prisma.exercise.findMany({
      include: {
        muscleGroups: true,
        targetedMuscles: true,
        equipment: true,
        },
        take
      },
    );

    return new NextResponse(JSON.stringify(exercises), { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 },
    );
  }
};
 