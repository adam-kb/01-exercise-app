import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {
    const exercises = await prisma.exercise.findMany({
      include: {
        muscleGroups: {
          include: {
            muscleGroup: true, // This will give you the full muscleGroup details
          },
        }, // Include related muscle groups
        targetedMuscles: true, // Include related targeted muscles
        equipment: true, // Include related equipment
      },
    });

    // return NextResponse.json(exercises);
    return new NextResponse(JSON.stringify(exercises), { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 }
    );
  }
};
 