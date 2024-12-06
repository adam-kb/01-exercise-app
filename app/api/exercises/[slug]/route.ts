import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { FetchedExercise, unifiedExerciseSelect } from "@/app/lib/definitions";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const exerciseSlug = (await params).slug;

  if (!exerciseSlug) {
    return NextResponse.json(
      { message: "Failed to retrieve exercise.", error: true },
      { status: 500 }
    );
  }

  try {
    const exercise: FetchedExercise | null = await prisma.exercise.findUnique({
      where: { slug: exerciseSlug },
      select: unifiedExerciseSelect
    });

    if (!exercise) {
      return NextResponse.json(
        { message: "Error fetching exercise.", error: true },
        { status: 404 }
      );
    }

    return NextResponse.json(exercise, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercise.", error);

    return NextResponse.json(
      { message: "Failed to retrieve exercise.", error: true },
      { status: 500 }
    );
  }
};
