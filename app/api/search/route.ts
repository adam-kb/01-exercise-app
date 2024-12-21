import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query");

  if (query === null || typeof query !== "string") {
    return NextResponse.json(
      { message: "Query parameter must be a string.", error: true },
      { status: 500 }
    );
  }

  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            equipment: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            muscleGroup: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            targetMuscle: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        equipment: true,
        muscleGroup: true,
        targetMuscle: true,
      },
    });

    return NextResponse.json(exercises, { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching exercises.", error);

    return NextResponse.json(
      { message: "Internal server error.", error: true },
      { status: 500 }
    );
  }
};
