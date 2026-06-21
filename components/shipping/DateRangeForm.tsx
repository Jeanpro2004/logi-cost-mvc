"use client";

import { FormEvent, useState } from "react";

interface DateRangeFormProps {
  onSubmit: (startDate: string, endDate: string) => void;
  loading: boolean;
}

export function DateRangeForm({ onSubmit, loading }: DateRangeFormProps) {
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(startDate, endDate);
  }

  return (
    <form className="date-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="startDate">Fecha Inicio</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="endDate">Fecha Fin</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Calculando..." : "Calcular costos"}
      </button>
    </form>
  );
}