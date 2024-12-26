import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { CreateExercise } from "@/app/lib/definitions";
import { CreateExerciseSchema } from "@/app/lib/actions";
import { Prisma } from "@prisma/client";
import { slugify } from "@/app/lib/utils";

export const POST = async (request: Request) => {
  try {
    const exercisePayload = (await request.json()) as CreateExercise;

    const data = CreateExerciseSchema.parse(exercisePayload);

    const createdExercise = await prisma.exercise.create({
      data: {
        name: data.name,
        slug: slugify(data.name),
        description: data.description,
        instruction: data.instruction,
        difficulty: data.difficulty,
        media: data.media
          ? {
              create: data.media.map((item) => ({
                mediaKey: item.mediaKey,
                type: item.type,
              })),
            }
          : undefined,
        targetMuscle: {
          connect: data.targetMuscle?.map(({ id }) => ({ id })),
        },
        muscleGroup: {
          connect: data.muscleGroup?.map(({ id }) => ({ id })),
        },
        equipment: {
          connect: data.equipment?.map(({ id }) => ({ id })),
        },
      },
    });

    return NextResponse.json(createdExercise);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      return NextResponse.json(
        { error: "Database error: " + error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
