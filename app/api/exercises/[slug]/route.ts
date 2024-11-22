import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }>}
) => {
  try {
    const slug =  (await params).slug;

    const exercise = await prisma.exercise.findUnique({
      where: { slug: slug },
      include: {
        muscleGroups: true, // Include related muscle groups
        targetedMuscles: true, // Include related targeted muscles
        equipment: true, // Include related equipment
      },
    });

    if (!exercise) {
      return NextResponse.json(
        { message: "Error fetching exercise.", error: true },
        { status: 404 }
      );
    }

    return NextResponse.json(exercise);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to retrieve exercise.", error: true },
      { status: 500 }
    );
  }
};
