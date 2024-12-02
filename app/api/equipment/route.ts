import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async () => {
  try {
    const equipment = await prisma.equipment.findMany();

    if (!equipment) {
      throw new Error("Error fetching Equipment");
    }

    return NextResponse.json(equipment, {status: 200});
  } catch (error) {
    console.error("Error fetching Equipment:", error);

    return NextResponse.json(
      { message: "Failed to retrieve Equipment.", error: true },
      { status: 500 }
    );
  }
}
