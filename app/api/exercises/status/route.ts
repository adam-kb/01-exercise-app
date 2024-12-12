import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const PUT = async (request: Request) => {
  try {
    const { id, status } = await request.json();

    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: { status },
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
