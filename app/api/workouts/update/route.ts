import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { WorkoutDraft } from "@/app/lib/definitions";
import { UpdateWorkoutSchema } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma";
import { slugify, toOptionalFloat, toOptionalInt } from "@/app/lib/utils";
import { z } from "zod";

export const PATCH = async (request: Request) => {
  try {
    const workoutPayload = (await request.json()) as WorkoutDraft;

    try {
      const data = UpdateWorkoutSchema.parse(workoutPayload);
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
    const data = UpdateWorkoutSchema.parse(workoutPayload);

    const updatedWorkout = await prisma.workout.update({
      where: { id: data.id },
      data: {
        name: data.name.trim(),
        slug: slugify(data.name.trim()),
        description: data.description?.trim() ?? null,
    
        // 🚨 This deletes all related ExerciseWorkout records,
        // which automatically deletes dependent IntendedSets via cascading FK
        exercises: {
          deleteMany: {},
    
          create: data.exercises.map((ex) => ({
            note: ex.note?.trim() ?? null,
            order: ex.order ?? null,
            duration: ex.duration ?? null,
    
            // ✅ Connect the base Exercise
            exercise: {
              connect: { id: ex.exerciseId },
            },
    
            // ✅ Create IntendedSets per ExerciseWorkout
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

    return NextResponse.json(updatedWorkout);
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
