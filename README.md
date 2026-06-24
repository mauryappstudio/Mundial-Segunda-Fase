# 🏆 Mundial 2026 — Apuestas Fase Eliminatoria

App de apuestas para la fase eliminatoria del Mundial 2026, con datos en tiempo real (Firebase Firestore), instalable como PWA en cualquier celular.

## Stack

- **Next.js 14** (App Router) — frontend en React
- **Firebase Firestore** — base de datos en tiempo real (todos ven los mismos datos al instante)
- **PWA** — instalable como app nativa desde el navegador
- **Vercel** — hosting gratuito

## Estructura

```
app/                  → páginas Next.js
components/           → componentes React
  views/              → cada pestaña de la app (Grupos, Bracket, Apostar, Ver, Ranking, Admin)
lib/
  firebase.js         → configuración de Firebase
  data.js             → datos del torneo (grupos, partidos, bracket FIFA oficial)
  logic.js            → cálculos (tablas, puntos, avance de fases)
  useStore.js         → hooks de sincronización en tiempo real con Firestore
public/
  manifest.json       → configuración PWA
  sw.js               → service worker (offline)
  icons/               → íconos de la app
```

## Cómo correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Cómo desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub
2. Entra a https://vercel.com → "Add New Project"
3. Conecta tu repositorio de GitHub
4. Vercel detecta automáticamente que es Next.js — no necesitas configurar nada más
5. Click en "Deploy"
6. En unos minutos tendrás una URL pública (ej: `mundial2026.vercel.app`)

## Cómo instalar la app en el celular (PWA)

Una vez desplegada en Vercel:

**Android (Chrome):**
1. Abre la URL en Chrome
2. Aparece un banner "Agregar a pantalla de inicio" o ve a ⋮ → "Instalar app"

**iPhone (Safari):**
1. Abre la URL en Safari
2. Toca el botón compartir (cuadrado con flecha)
3. "Agregar a pantalla de inicio"

## Credenciales

- **Admin:** clave `admin2026`
- **Jugadores nuevos:** clave inicial `1234` (deben cambiarla al primer ingreso)

## Notas sobre Firestore

La base de datos está en **modo de prueba** (acceso abierto, válido 30 días desde su creación — suficiente para la duración del torneo). Si necesitas extenderlo más allá del Mundial, hay que actualizar las reglas de seguridad en Firebase Console → Firestore → Reglas.
