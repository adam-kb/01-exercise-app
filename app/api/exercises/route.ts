import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
import { FeatureExerciseOutputData } from "@/app/lib/definitions";

export const GET = async () => {
  try {
    const featureExercises: FeatureExerciseOutputData[] =
      await prisma.featureExercise.findMany({
        where: {
          exercise: {
            status: ExerciseStatus.ACTIVE,
          },
        },
        include: {
          exercise: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              difficulty: true,
              instruction: true,
              targetMuscle: {
                select: { name: true },
              },
              muscleGroup: {
                select: { name: true },
              },
              equipment: {
                select: { name: true },
              },
            },
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
