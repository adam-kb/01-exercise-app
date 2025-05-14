import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { WorkoutDraft } from "@/app/lib/definitions";
import { WorkoutFormSchema } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma";
import { slugify, toOptionalFloat, toOptionalInt } from "@/app/lib/utils";
import { z } from "zod";

export const POST = async (request: Request) => {
  try {
    const workoutPayload = (await request.json()) as WorkoutDraft;

    try {
      const data = WorkoutFormSchema.parse(workoutPayload);
      console.log("Zod validation passed:", data);
    } catch (err) {
      console.error("Zod validation failed:", JSON.stringify(err, null, 2));

      if (err instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: "Validation failed", issues: err.errors }),
          { status: 400 }
        );
      }
    }
    const data = WorkoutFormSchema.parse(workoutPayload);

    const createdWorkout = await prisma.workout.create({
      data: {
        name: data.name.trim(),
        slug: slugify(data.name.trim()),
        description: data.description?.trim() ?? null,
        author: {
          connect: { id: data.authorId },
        },
        exercises: {
          create: data.exercises.map((ex) => ({
            note: ex.note?.trim() ?? null,
            order: ex.order ?? null,
            duration: ex.duration ?? null,
            exercise: {
              connect: { id: ex.exerciseId },
            },
            intendedSets: {
              create: ex.intendedSets.map((set) => ({
                setNumber: set.setNumber,
                reps: toOptionalInt(set.reps),
                weight: toOptionalFloat(set.weight),
              })),
            },
          })),
        },
      },
      include: {
        exercises: {
          include: {
            intendedSets: true,
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(createdWorkout);
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
