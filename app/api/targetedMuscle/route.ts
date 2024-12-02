import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {
    const targetedMuscles = await prisma.targetedMuscle.findMany();

    if (!targetedMuscles) {
      throw new Error("Error fetching Targeted Muscles");
    }

    return NextResponse.json(targetedMuscles, {status: 200});
  } catch (error) {
    console.error("Error fetching Targeted Muscles:", error);

    return NextResponse.json(
      { message: "Failed to retrieve Targeted Muscles.", error: true },
      { status: 500 }
    );
  }
}
