import { UpdateExerciseSchema } from "@/app/lib/actions";
import { UpdateExercise } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

export const PUT = async (request: Request) => {
  try {
    const exercisePayload = (await request.json()) as UpdateExercise;

    const result = UpdateExerciseSchema.safeParse(exercisePayload);

    if (!result.success) {
      const errorMessages = result.error.errors.map((issue: ZodIssue) => ({
        message: issue.message,
        errorCode: issue.code,
        path: issue.path,
      }));

      return NextResponse.json(
        { error: "Bad request", details: errorMessages },
        { status: 400 }
      );
    }

    const data = result.data;

    const updatedExercise = await prisma.exercise.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        instruction: data.instruction,
        difficulty: data.difficulty,
        media: data.media
          ? {
              deleteMany: {},
              create: data.media.map((item) => ({
                mediaKey: item.mediaKey,
                type: item.type,
              })),
            }
          : undefined,
        targetMuscle: {
          set: data.targetMuscle?.map(({ id }) => ({ id })),
        },
        muscleGroup: {
          set: data.muscleGroup?.map(({ id }) => ({ id })),
        },
        equipment: {
          set: data.equipment?.map(({ id }) => ({ id })),
        },
      },
    });

    return NextResponse.json(updatedExercise);
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
