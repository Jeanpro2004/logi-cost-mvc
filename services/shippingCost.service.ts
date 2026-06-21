import { getShipmentsByDateRange } from "@/repositories/shipping.repository";
import type {
  EnvioWithRelations,
  ShippingCostResult,
} from "@/types/shipping.types";

function roundToTwoDecimals(value: number): number {
  return Number(value.toFixed(2));
}

function buildGroupKey(shipment: EnvioWithRelations): string {
  const repartidorId = shipment.repartidor?.id_repartidor ?? "sin-repartidor";
  const zonaId = shipment.zonas?.id_zona ?? "sin-zona";

  return `${repartidorId}-${zonaId}`;
}

export async function calculateShippingCostsByDateRange(
  startDate: string,
  endDate: string
): Promise<ShippingCostResult[]> {
  const shipments = await getShipmentsByDateRange(startDate, endDate);

  const groupedResults = new Map<string, ShippingCostResult>();

  shipments.forEach((shipment) => {
    if (!shipment.repartidor || !shipment.zonas) {
      return;
    }

    const groupKey = buildGroupKey(shipment);

    const currentResult = groupedResults.get(groupKey);

    const pesoKg = Number(shipment.peso_kg);
    const tarifaPorKg = Number(shipment.zonas.tarifa_por_kg);
    const costoEnvio = pesoKg * tarifaPorKg;

    if (!currentResult) {
      groupedResults.set(groupKey, {
        repartidor: shipment.repartidor.nombre,
        zona: shipment.zonas.nombre_zona,
        cantidadEnvios: 1,
        totalKg: roundToTwoDecimals(pesoKg),
        tarifaPorKg: roundToTwoDecimals(tarifaPorKg),
        costoTotal: roundToTwoDecimals(costoEnvio),
      });

      return;
    }

    currentResult.cantidadEnvios += 1;
    currentResult.totalKg = roundToTwoDecimals(currentResult.totalKg + pesoKg);
    currentResult.costoTotal = roundToTwoDecimals(
      currentResult.costoTotal + costoEnvio
    );

    groupedResults.set(groupKey, currentResult);
  });

  return Array.from(groupedResults.values()).sort((a, b) => {
    const repartidorComparison = a.repartidor.localeCompare(b.repartidor);

    if (repartidorComparison !== 0) {
      return repartidorComparison;
    }

    return a.zona.localeCompare(b.zona);
  });
}