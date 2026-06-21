import { NextRequest, NextResponse } from "next/server";
import { getShippingCostsController } from "@/controllers/shippingCost.controller";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const response = await getShippingCostsController(startDate, endDate);

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in shipping costs API:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado al calcular los costos de envío.",
      },
      { status: 500 }
    );
  }
}