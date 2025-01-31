import { Workout, WorkoutSelect } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const workoutSlug = (await params).slug;

  if (!workoutSlug) {
    return NextResponse.json(
      { message: "Failed to retreive workout.", error: true },
      { status: 500 }
    );
  }

  try {
    const workout: Workout | null = await prisma.workout.findUnique({
      where: {slug: workoutSlug},
      include: WorkoutSelect
    })

    return NextResponse.json(workout, {status: 200});

  } catch (error) {
    console.error("Error Fetching Workout", error);
    
    return NextResponse.json(
      {message: error || "Failed to retreive workout", error: true},
      {status: 500}
    )
  }
};
