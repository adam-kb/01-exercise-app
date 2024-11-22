import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {
    const exercises = await prisma.exercise.findMany();

    return NextResponse.json(exercises);
  } catch (error) {
    console.error(error);

    return {
      message: "Failed to retreive exercises.",
      error: true,
    };
  }
};
 