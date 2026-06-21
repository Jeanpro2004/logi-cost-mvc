import { calculateShippingCostsByDateRange } from "@/services/shippingCost.service";
import type { ShippingCostResult } from "@/types/shipping.types";

export type ShippingCostControllerResponse =
  | {
      success: true;
      data: ShippingCostResult[];
    }
  | {
      success: false;
      message: string;
    };

function isValidDateFormat(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
}

function isStartDateAfterEndDate(startDate: string, endDate: string): boolean {
  return new Date(startDate) > new Date(endDate);
}

export async function getShippingCostsController(
  startDate: string | null,
  endDate: string | null
): Promise<ShippingCostControllerResponse> {
  if (!startDate || !endDate) {
    return {
      success: false,
      message: "Fecha inicio y fecha fin son obligatorias.",
    };
  }

  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    return {
      success: false,
      message: "Las fechas deben tener el formato YYYY-MM-DD.",
    };
  }

  if (isStartDateAfterEndDate(startDate, endDate)) {
    return {
      success: false,
      message: "La fecha inicio no puede ser mayor que la fecha fin.",
    };
  }

  const data = await calculateShippingCostsByDateRange(startDate, endDate);

  return {
    success: true,
    data,
  };
}