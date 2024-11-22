import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const exerciseId = Number(params.id);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { message: "Invalid exercise ID.", error: true },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
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
