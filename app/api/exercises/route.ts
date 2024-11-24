import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { ExerciseStatus } from "@prisma/client";
import { FeaturedExerciseOutputData } from "@/app/lib/definitions";

export const GET = async () => {
  try {
    const featuredExercises: FeaturedExerciseOutputData[] =
      await prisma.featuredExercise.findMany({
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
              targetedMuscles: {
                select: { name: true },
              },
              muscleGroups: {
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

    return NextResponse.json(featuredExercises, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises.", error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 }
    );
  }
};
