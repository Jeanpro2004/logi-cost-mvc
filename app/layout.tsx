import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiCost MVC",
  description:
    "Mini Core MVC desarrollado en Next.js para calcular costos de envío por repartidor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}