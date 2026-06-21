"use client";

import { useState } from "react";
import { DateRangeForm } from "@/components/shipping/DateRangeForm";
import { ShippingCostTable } from "@/components/shipping/ShippingCostTable";
import type { ShippingCostResult } from "@/types/shipping.types";

type ShippingCostApiResponse =
  | {
      success: true;
      data: ShippingCostResult[];
    }
  | {
      success: false;
      message: string;
    };

export function ShippingCostDashboard() {
  const [results, setResults] = useState<ShippingCostResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(startDate: string, endDate: string) {
    try {
      setLoading(true);
      setErrorMessage("");
      setHasSearched(true);

      const response = await fetch(
        `/api/shipping-costs?startDate=${startDate}&endDate=${endDate}`
      );

      const payload = (await response.json()) as ShippingCostApiResponse;

      if (!payload.success) {
        setResults([]);
        setErrorMessage(payload.message);
        return;
      }

      setResults(payload.data);
    } catch (error) {
      console.error("Error fetching shipping costs:", error);
      setResults([]);
      setErrorMessage("No se pudieron calcular los costos de envío.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <p className="eyebrow">Mini Core MVC</p>
        <h1>Cálculo de Costos de Envío</h1>
        <p className="description">
          Filtra los envíos por rango de fechas y calcula el costo total
          generado por cada repartidor según la tarifa por kilogramo de cada zona.
        </p>
      </div>

      <DateRangeForm onSubmit={handleSearch} loading={loading} />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <ShippingCostTable results={results} hasSearched={hasSearched} />
    </section>
  );
}