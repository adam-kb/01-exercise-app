import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Status as ExerciseStatus } from "@prisma/client";
import { unifiedExerciseSelect } from "@/app/lib/definitions";


export const GET = async (request: NextRequest) => {
  try {
    const cursor = parseInt(request.nextUrl.searchParams.get("cursor") || "0", 10);
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "4", 10);

    const exercises = await prisma.exercise.findMany({
      where: { status: ExerciseStatus.ACTIVE },
      select: unifiedExerciseSelect,
      orderBy: { createdAt: "asc" },
      skip: cursor ? 1 : 0,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined
    });

    const nextCursor = exercises.length === limit
      ? exercises[exercises.length - 1].id.toString()
      : null;

    return NextResponse.json({data: exercises, nextCursor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises.", error);

    return NextResponse.json(
      { message: "Failed to retrieve exercises.", error: true },
      { status: 500 }
    );
  }
};
