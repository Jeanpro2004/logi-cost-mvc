# LogiCost MVC

Aplicación Mini Core desarrollada con **Next.js** para calcular el costo total de envíos realizados por repartidores dentro de un rango de fechas, aplicando la tarifa por kilogramo definida según la zona de entrega.

Este proyecto fue desarrollado como ejercicio académico para demostrar la aplicación del patrón **MVC** en un problema concreto de logística.

---

## Objetivo del proyecto

Una empresa de logística necesita calcular cuánto costaron los envíos realizados por cada repartidor en un período determinado.

Cada envío tiene:

* Un repartidor asignado.
* Una zona de entrega.
* Un peso en kilogramos.
* Una fecha de envío.

Cada zona tiene una tarifa fija por kilogramo.
El sistema filtra los envíos por rango de fechas y calcula el costo total generado por cada repartidor y zona.

---

## Tecnologías utilizadas

* Next.js
* TypeScript
* React
* Supabase
* PostgreSQL
* CSS
* Vercel

---

## Framework MVC utilizado

El proyecto utiliza **Next.js** como framework principal y aplica una adaptación del patrón **MVC** dentro de la estructura del proyecto.

Aunque Next.js no es un framework MVC tradicional, permite organizar el código separando responsabilidades de forma clara:

| Capa MVC   | Implementación en el proyecto                     | Responsabilidad                                              |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Model      | `models/`, `types/`, `repositories/`              | Representar datos y consultar la base de datos               |
| View       | `app/page.tsx`, `components/shipping/`            | Mostrar el formulario y la tabla de resultados               |
| Controller | `controllers/`, `app/api/shipping-costs/route.ts` | Recibir la solicitud, validar fechas y devolver la respuesta |
| Service    | `services/shippingCost.service.ts`                | Aplicar la lógica de negocio del cálculo                     |

---

## Estructura del proyecto

```txt
logi-cost-mvc/
├── app/
│   ├── api/
│   │   └── shipping-costs/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── shipping/
│       ├── DateRangeForm.tsx
│       ├── ShippingCostDashboard.tsx
│       └── ShippingCostTable.tsx
│
├── controllers/
│   └── shippingCost.controller.ts
│
├── services/
│   └── shippingCost.service.ts
│
├── repositories/
│   └── shipping.repository.ts
│
├── models/
│   ├── envio.model.ts
│   ├── repartidor.model.ts
│   └── zona.model.ts
│
├── types/
│   └── shipping.types.ts
│
├── lib/
│   └── supabase.ts
│
├── .env.example
├── package.json
└── README.md
```

---

## Modelo de datos

El sistema utiliza 3 tablas principales:

### Tabla: repartidor

| Campo         | Tipo    | Descripción                        |
| ------------- | ------- | ---------------------------------- |
| id_repartidor | INT, PK | Identificador único del repartidor |
| nombre        | VARCHAR | Nombre completo del repartidor     |
| email         | VARCHAR | Correo de contacto                 |

### Tabla: zonas

| Campo         | Tipo    | Descripción                    |
| ------------- | ------- | ------------------------------ |
| id_zona       | INT, PK | Identificador único de la zona |
| nombre_zona   | VARCHAR | Nombre de la zona              |
| tarifa_por_kg | DECIMAL | Costo en USD por kg entregado  |

### Tabla: envios

| Campo         | Tipo    | Descripción                      |
| ------------- | ------- | -------------------------------- |
| id_envio      | INT, PK | Identificador único del envío    |
| id_repartidor | INT, FK | Referencia al repartidor         |
| id_zona       | INT, FK | Referencia a la zona             |
| peso_kg       | DECIMAL | Peso del paquete en kilogramos   |
| fecha_envio   | DATE    | Fecha en que se realizó el envío |

---

## Lógica de cálculo

Para cada envío dentro del rango de fechas seleccionado, se aplica la fórmula:

```txt
costo_envio = peso_kg × tarifa_por_kg
```

Luego, los resultados se agrupan por repartidor y zona:

```txt
costo_total = suma de todos los costos de envío del repartidor en esa zona
```

Ejemplo:

```txt
Peso: 10 kg
Tarifa zona Norte: $1.50
Costo del envío: 10 × 1.50 = $15.00
```

Si un repartidor tiene envíos en varias zonas, el sistema calcula cada zona por separado para respetar la tarifa correspondiente.

---

## Funcionalidad principal

La aplicación permite:

1. Ingresar una fecha de inicio.
2. Ingresar una fecha de fin.
3. Consultar los envíos registrados en ese rango.
4. Calcular el costo total por repartidor y zona.
5. Mostrar los resultados en una tabla.

La tabla muestra:

* Repartidor
* Cantidad de envíos
* Total de kilogramos
* Zona
* Tarifa por kilogramo
* Costo total

---

## Endpoint principal

El backend expone el siguiente endpoint:

```txt
GET /api/shipping-costs?startDate=2025-05-01&endDate=2025-05-31
```

Ejemplo de respuesta:

```json
{
  "success": true,
  "data": [
    {
      "repartidor": "Andrés López",
      "zona": "Norte",
      "cantidadEnvios": 2,
      "totalKg": 18.5,
      "tarifaPorKg": 1.5,
      "costoTotal": 27.75
    }
  ]
}
```

---

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/Jeanpro2004/logi-cost-mvc.git
```

Entrar al proyecto:

```bash
cd logi-cost-mvc
```

Instalar dependencias:

```bash
npm install
```

Crear archivo de variables de entorno:

```bash
cp .env.example .env.local
```

Configurar las variables reales de Supabase en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Ejecutar el proyecto localmente:

```bash
npm run dev
```

Abrir en el navegador:

```txt
http://localhost:3000
```

---

## Base de datos

La base de datos fue creada en Supabase usando PostgreSQL.

Tablas utilizadas:

```txt
repartidor
zonas
envios
```

La aplicación consulta los envíos por rango de fechas, une la información con repartidores y zonas, y calcula el costo total usando la tarifa correspondiente.

---

## Scripts disponibles

Ejecutar en desarrollo:

```bash
npm run dev
```

Compilar el proyecto:

```bash
npm run build
```

Ejecutar versión de producción local:

```bash
npm start
```

---

## Deploy

El proyecto puede ser desplegado en Vercel.

Pasos generales:

1. Subir el repositorio a GitHub.
2. Conectar el repositorio con Vercel.
3. Configurar las variables de entorno en Vercel.
4. Ejecutar el deploy.
5. Abrir el link público del proyecto.

Link del proyecto deployado:

```txt
Pendiente agregar link de Vercel
```

---

## Video explicativo

Link del video explicativo:

```txt
Pendiente agregar link de Loom o YouTube
```

El video debe mostrar:

1. Estructura del proyecto.
2. Separación Model / View / Controller.
3. Funcionamiento del formulario.
4. Resultado del cálculo por rango de fechas.
5. Endpoint backend funcionando.

---

## Documentación y recursos utilizados

* Documentación oficial de Next.js: https://nextjs.org/docs
* Documentación oficial de Supabase: https://supabase.com/docs
* Documentación de Supabase con Next.js: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
* Documentación de Vercel para Next.js: https://vercel.com/docs/frameworks/full-stack/nextjs

---

## Autor

Jean Paul Rodríguez

---

## Estado del proyecto

Proyecto funcional en desarrollo.

Funcionalidades completadas:

* Estructura base en Next.js.
* Base de datos en Supabase.
* Modelos TypeScript.
* Repository para consultar envíos.
* Service para calcular costos.
* Controller/API Route.
* Vista principal con formulario y tabla.
