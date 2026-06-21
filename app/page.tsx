export default function HomePage() {
  return (
    <main className="main-container">
      <section className="hero-card">
        <p className="eyebrow">Mini Core MVC</p>

        <h1>Cálculo de Costos de Envío</h1>

        <p className="description">
          Aplicación desarrollada con Next.js para calcular el costo total de
          envíos por repartidor dentro de un rango de fechas, aplicando la tarifa
          por kilogramo según la zona de entrega.
        </p>

        <div className="status-box">
          <strong>Fase 1 completada:</strong>
          <span> Proyecto base creado y estructura MVC preparada.</span>
        </div>
      </section>
    </main>
  );
}