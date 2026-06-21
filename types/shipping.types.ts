import type { Repartidor } from "@/models/repartidor.model";
import type { Zona } from "@/models/zona.model";

export interface EnvioWithRelations {
  id_envio: number;
  peso_kg: number;
  fecha_envio: string;
  repartidor: Repartidor | null;
  zonas: Zona | null;
}

export interface ShippingCostResult {
  repartidor: string;
  zona: string;
  cantidadEnvios: number;
  totalKg: number;
  tarifaPorKg: number;
  costoTotal: number;
}