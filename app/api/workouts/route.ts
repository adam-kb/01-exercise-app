import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { WorkoutSelect } from "@/app/lib/definitions";

export const GET = async () => {
  try {
    const workouts = await prisma.workout.findMany({
      include: WorkoutSelect
    });

    return NextResponse.json({ workouts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workouts.", error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 }
    );
  }
};
