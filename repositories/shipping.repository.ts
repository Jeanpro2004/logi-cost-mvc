import { supabase } from "@/lib/supabase";
import type { EnvioWithRelations } from "@/types/shipping.types";

type RawShipment = {
  id_envio: number;
  peso_kg: number;
  fecha_envio: string;
  repartidor: {
    id_repartidor: number;
    nombre: string;
    email: string | null;
  } | null;
  zonas: {
    id_zona: number;
    nombre_zona: string;
    tarifa_por_kg: number;
  } | null;
};

export async function getShipmentsByDateRange(
  startDate: string,
  endDate: string
): Promise<EnvioWithRelations[]> {
  const { data, error } = await supabase
    .from("envios")
    .select(
      `
      id_envio,
      peso_kg,
      fecha_envio,
      repartidor (
        id_repartidor,
        nombre,
        email
      ),
      zonas (
        id_zona,
        nombre_zona,
        tarifa_por_kg
      )
    `
    )
    .gte("fecha_envio", startDate)
    .lte("fecha_envio", endDate)
    .order("fecha_envio", { ascending: true });

  if (error) {
    throw new Error(`Error fetching shipments: ${error.message}`);
  }

  const shipments = (data ?? []) as unknown as RawShipment[];

  return shipments.map((shipment) => ({
    id_envio: shipment.id_envio,
    peso_kg: Number(shipment.peso_kg),
    fecha_envio: shipment.fecha_envio,
    repartidor: shipment.repartidor,
    zonas: shipment.zonas
      ? {
          ...shipment.zonas,
          tarifa_por_kg: Number(shipment.zonas.tarifa_por_kg),
        }
      : null,
  }));
}