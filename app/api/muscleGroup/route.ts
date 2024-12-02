import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {
    const muscleGroups = await prisma.muscleGroup.findMany();

    if (!muscleGroups) {
      throw new Error("Error fetching Muscle Group");
    }

    return NextResponse.json(muscleGroups, {status: 200});
  } catch (error) {
    console.error("Error fetching Muscle Group:", error);

    return NextResponse.json(
      { message: "Failed to retrieve Muscle Group.", error: true },
      { status: 500 }
    );
  }
}
