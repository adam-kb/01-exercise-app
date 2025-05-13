import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { WorkoutDraft } from "@/app/lib/definitions";
import { WorkoutFormSchema } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma";
import { slugify } from "@/app/lib/utils";

export const POST = async (request: Request) => {
  try {
    const workoutPayload = (await request.json()) as WorkoutDraft

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
            intensity: ex.intensity ?? null,
            duration: ex.duration ?? null,
            exercise: {
              connect: { id: ex.exerciseId },
            },
            intendedSets: {
              create: ex.intendedSets.map((set) => ({
                setNumber: set.setNumber,
                reps:
                  typeof set.reps === "string"
                    ? parseInt(set.reps)
                    : set.reps ?? null,
                weight:
                  typeof set.weight === "string"
                    ? parseFloat(set.weight)
                    : set.weight ?? null,
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
