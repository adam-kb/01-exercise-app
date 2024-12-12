import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
import { unifiedExerciseSelect } from "@/app/lib/definitions";

export const GET = async () => {
  try {
    const featureExercises =
      await prisma.featureExercise.findMany({
        where: {
          exercise: {
            status: ExerciseStatus.ACTIVE,
          },
        },
        include: {
          exercise: {
            select: unifiedExerciseSelect
          },
        },
        orderBy: {
          featuredAt: "desc",
        },
      });

    return NextResponse.json(featureExercises, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises.", error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 }
    );
  }
};
