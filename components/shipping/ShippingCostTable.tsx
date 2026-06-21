import type { ShippingCostResult } from "@/types/shipping.types";

interface ShippingCostTableProps {
  results: ShippingCostResult[];
  hasSearched: boolean;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatKg(value: number): string {
  return `${value.toFixed(2)} kg`;
}

export function ShippingCostTable({
  results,
  hasSearched,
}: ShippingCostTableProps) {
  if (!hasSearched) {
    return (
      <div className="empty-state">
        Ingresa un rango de fechas para calcular los costos de envío.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="empty-state">
        No existen envíos registrados en el rango seleccionado.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="results-table">
        <thead>
          <tr>
            <th>Repartidor</th>
            <th>Envíos</th>
            <th>Total kg</th>
            <th>Zona</th>
            <th>Tarifa/kg</th>
            <th>Costo total</th>
          </tr>
        </thead>

        <tbody>
          {results.map((result) => (
            <tr key={`${result.repartidor}-${result.zona}`}>
              <td>{result.repartidor}</td>
              <td>{result.cantidadEnvios}</td>
              <td>{formatKg(result.totalKg)}</td>
              <td>{result.zona}</td>
              <td>{formatCurrency(result.tarifaPorKg)}</td>
              <td className="total-cell">{formatCurrency(result.costoTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}