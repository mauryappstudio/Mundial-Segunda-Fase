// lib/data.js

export const GRUPOS = {
  A: ["México", "Sudáfrica", "Corea del Sur", "Chequia"],
  B: ["Canadá", "Bosnia", "Qatar", "Suiza"],
  C: ["Brasil", "Marruecos", "Haití", "Escocia"],
  D: ["EEUU", "Paraguay", "Australia", "Turquía"],
  E: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"],
  F: ["Países Bajos", "Japón", "Suecia", "Túnez"],
  G: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"],
  H: ["España", "Cabo Verde", "Arabia Saudí", "Uruguay"],
  I: ["Francia", "Senegal", "Irak", "Noruega"],
  J: ["Argentina", "Argelia", "Austria", "Jordania"],
  K: ["Portugal", "Congo DR", "Uzbekistán", "Colombia"],
  L: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
};

export const FL = {
  México: "🇲🇽", Sudáfrica: "🇿🇦", "Corea del Sur": "🇰🇷", Chequia: "🇨🇿",
  Canadá: "🇨🇦", Bosnia: "🇧🇦", Qatar: "🇶🇦", Suiza: "🇨🇭",
  Brasil: "🇧🇷", Marruecos: "🇲🇦", Haití: "🇭🇹", Escocia: "🏴",
  EEUU: "🇺🇸", Paraguay: "🇵🇾", Australia: "🇦🇺", Turquía: "🇹🇷",
  Alemania: "🇩🇪", Curazao: "🇨🇼", "Costa de Marfil": "🇨🇮", Ecuador: "🇪🇨",
  "Países Bajos": "🇳🇱", Japón: "🇯🇵", Suecia: "🇸🇪", Túnez: "🇹🇳",
  Bélgica: "🇧🇪", Egipto: "🇪🇬", Irán: "🇮🇷", "Nueva Zelanda": "🇳🇿",
  España: "🇪🇸", "Cabo Verde": "🇨🇻", "Arabia Saudí": "🇸🇦", Uruguay: "🇺🇾",
  Francia: "🇫🇷", Senegal: "🇸🇳", Irak: "🇮🇶", Noruega: "🇳🇴",
  Argentina: "🇦🇷", Argelia: "🇩🇿", Austria: "🇦🇹", Jordania: "🇯🇴",
  Portugal: "🇵🇹", "Congo DR": "🇨🇩", Uzbekistán: "🇺🇿", Colombia: "🇨🇴",
  Inglaterra: "🏴", Croacia: "🇭🇷", Ghana: "🇬🇭", Panamá: "🇵🇦",
};

export function flag(e) {
  return FL[e] || "🌐";
}

export const PG = [
  { id: "G01", f: "Jun 11", loc: "México", vis: "Sudáfrica", g: "A" },
  { id: "G02", f: "Jun 11", loc: "Corea del Sur", vis: "Chequia", g: "A" },
  { id: "G03", f: "Jun 12", loc: "Canadá", vis: "Bosnia", g: "B" },
  { id: "G04", f: "Jun 12", loc: "EEUU", vis: "Paraguay", g: "D" },
  { id: "G05", f: "Jun 13", loc: "Qatar", vis: "Suiza", g: "B" },
  { id: "G06", f: "Jun 13", loc: "Brasil", vis: "Marruecos", g: "C" },
  { id: "G07", f: "Jun 13", loc: "Haití", vis: "Escocia", g: "C" },
  { id: "G08", f: "Jun 13", loc: "Australia", vis: "Turquía", g: "D" },
  { id: "G09", f: "Jun 14", loc: "Alemania", vis: "Curazao", g: "E" },
  { id: "G10", f: "Jun 14", loc: "Países Bajos", vis: "Japón", g: "F" },
  { id: "G11", f: "Jun 14", loc: "Costa de Marfil", vis: "Ecuador", g: "E" },
  { id: "G12", f: "Jun 14", loc: "Suecia", vis: "Túnez", g: "F" },
  { id: "G13", f: "Jun 15", loc: "España", vis: "Cabo Verde", g: "H" },
  { id: "G14", f: "Jun 15", loc: "Bélgica", vis: "Egipto", g: "G" },
  { id: "G15", f: "Jun 15", loc: "Arabia Saudí", vis: "Uruguay", g: "H" },
  { id: "G16", f: "Jun 15", loc: "Irán", vis: "Nueva Zelanda", g: "G" },
  { id: "G17", f: "Jun 16", loc: "Francia", vis: "Senegal", g: "I" },
  { id: "G18", f: "Jun 16", loc: "Irak", vis: "Noruega", g: "I" },
  { id: "G19", f: "Jun 16", loc: "Argentina", vis: "Argelia", g: "J" },
  { id: "G20", f: "Jun 16", loc: "Austria", vis: "Jordania", g: "J" },
  { id: "G21", f: "Jun 17", loc: "Portugal", vis: "Congo DR", g: "K" },
  { id: "G22", f: "Jun 17", loc: "Inglaterra", vis: "Croacia", g: "L" },
  { id: "G23", f: "Jun 17", loc: "Ghana", vis: "Panamá", g: "L" },
  { id: "G24", f: "Jun 17", loc: "Uzbekistán", vis: "Colombia", g: "K" },
  { id: "G25", f: "Jun 18", loc: "Chequia", vis: "Sudáfrica", g: "A" },
  { id: "G26", f: "Jun 18", loc: "Suiza", vis: "Bosnia", g: "B" },
  { id: "G27", f: "Jun 18", loc: "Canadá", vis: "Qatar", g: "B" },
  { id: "G28", f: "Jun 18", loc: "México", vis: "Corea del Sur", g: "A" },
  { id: "G29", f: "Jun 19", loc: "Escocia", vis: "Marruecos", g: "C" },
  { id: "G30", f: "Jun 19", loc: "EEUU", vis: "Australia", g: "D" },
  { id: "G31", f: "Jun 19", loc: "Brasil", vis: "Haití", g: "C" },
  { id: "G32", f: "Jun 19", loc: "Turquía", vis: "Paraguay", g: "D" },
  { id: "G33", f: "Jun 20", loc: "Países Bajos", vis: "Suecia", g: "F" },
  { id: "G34", f: "Jun 20", loc: "Alemania", vis: "Costa de Marfil", g: "E" },
  { id: "G35", f: "Jun 20", loc: "Ecuador", vis: "Curazao", g: "E" },
  { id: "G36", f: "Jun 20", loc: "Túnez", vis: "Japón", g: "F" },
  { id: "G37", f: "Jun 21", loc: "España", vis: "Arabia Saudí", g: "H" },
  { id: "G38", f: "Jun 21", loc: "Bélgica", vis: "Irán", g: "G" },
  { id: "G39", f: "Jun 21", loc: "Uruguay", vis: "Cabo Verde", g: "H" },
  { id: "G40", f: "Jun 21", loc: "Nueva Zelanda", vis: "Egipto", g: "G" },
  { id: "G41", f: "Jun 22", loc: "Argentina", vis: "Austria", g: "J" },
  { id: "G42", f: "Jun 22", loc: "Francia", vis: "Irak", g: "I" },
  { id: "G43", f: "Jun 22", loc: "Noruega", vis: "Senegal", g: "I" },
  { id: "G44", f: "Jun 22", loc: "Jordania", vis: "Argelia", g: "J" },
  { id: "G45", f: "Jun 23", loc: "Portugal", vis: "Uzbekistán", g: "K" },
  { id: "G46", f: "Jun 23", loc: "Inglaterra", vis: "Ghana", g: "L" },
  { id: "G47", f: "Jun 23", loc: "Panamá", vis: "Croacia", g: "L" },
  { id: "G48", f: "Jun 23", loc: "Colombia", vis: "Congo DR", g: "K" },
  { id: "G49", f: "Jun 24", loc: "Suiza", vis: "Canadá", g: "B" },
  { id: "G50", f: "Jun 24", loc: "Bosnia", vis: "Qatar", g: "B" },
  { id: "G51", f: "Jun 24", loc: "Escocia", vis: "Brasil", g: "C" },
  { id: "G52", f: "Jun 24", loc: "Marruecos", vis: "Haití", g: "C" },
  { id: "G53", f: "Jun 24", loc: "Chequia", vis: "México", g: "A" },
  { id: "G54", f: "Jun 24", loc: "Sudáfrica", vis: "Corea del Sur", g: "A" },
  { id: "G55", f: "Jun 25", loc: "Ecuador", vis: "Alemania", g: "E" },
  { id: "G56", f: "Jun 25", loc: "Curazao", vis: "Costa de Marfil", g: "E" },
  { id: "G57", f: "Jun 25", loc: "Japón", vis: "Suecia", g: "F" },
  { id: "G58", f: "Jun 25", loc: "Túnez", vis: "Países Bajos", g: "F" },
  { id: "G59", f: "Jun 25", loc: "Turquía", vis: "EEUU", g: "D" },
  { id: "G60", f: "Jun 25", loc: "Paraguay", vis: "Australia", g: "D" },
  { id: "G61", f: "Jun 26", loc: "Noruega", vis: "Francia", g: "I" },
  { id: "G62", f: "Jun 26", loc: "Senegal", vis: "Irak", g: "I" },
  { id: "G63", f: "Jun 26", loc: "Cabo Verde", vis: "Arabia Saudí", g: "H" },
  { id: "G64", f: "Jun 26", loc: "Uruguay", vis: "España", g: "H" },
  { id: "G65", f: "Jun 26", loc: "Egipto", vis: "Irán", g: "G" },
  { id: "G66", f: "Jun 26", loc: "Nueva Zelanda", vis: "Bélgica", g: "G" },
  { id: "G67", f: "Jun 27", loc: "Panamá", vis: "Inglaterra", g: "L" },
  { id: "G68", f: "Jun 27", loc: "Croacia", vis: "Ghana", g: "L" },
  { id: "G69", f: "Jun 27", loc: "Colombia", vis: "Portugal", g: "K" },
  { id: "G70", f: "Jun 27", loc: "Congo DR", vis: "Uzbekistán", g: "K" },
  { id: "G71", f: "Jun 27", loc: "Argelia", vis: "Austria", g: "J" },
  { id: "G72", f: "Jun 27", loc: "Jordania", vis: "Argentina", g: "J" },
];

// ══════════════════════════════════════════════════════════════
// CRUCES OFICIALES REALES de la Ronda de 32 (16avos de final)
// Verificados contra fuentes periodísticas oficiales el 27-jun-2026
// (Depor, ElGrafico, LaNacion, FutbolRed, Infobae, Yahoo, SI.com)
// Los 8 mejores terceros confirmados: Paraguay(D), Suecia(F),
// Bosnia(B), Senegal(I), Ecuador(E), Congo DR(K), Irán(G), Ghana(L)
// ══════════════════════════════════════════════════════════════
export const R32_DEF = [
  { id: "M73", p1: { n: 1, g: "E" }, p2: null, t3: ["D"] },            // Alemania vs Paraguay (3°D)
  { id: "M74", p1: { n: 1, g: "I" }, p2: null, t3: ["F"] },            // Francia vs Suecia (3°F)
  { id: "M75", p1: { n: 2, g: "A" }, p2: { n: 2, g: "B" }, t3: null },  // Sudáfrica vs Canadá
  { id: "M76", p1: { n: 1, g: "F" }, p2: { n: 2, g: "C" }, t3: null },  // Países Bajos vs Marruecos
  { id: "M77", p1: { n: 2, g: "K" }, p2: { n: 2, g: "L" }, t3: null },  // Portugal vs Croacia
  { id: "M78", p1: { n: 1, g: "H" }, p2: { n: 2, g: "J" }, t3: null },  // España vs Austria
  { id: "M79", p1: { n: 1, g: "D" }, p2: null, t3: ["B"] },            // EEUU vs Bosnia (3°B)
  { id: "M80", p1: { n: 1, g: "G" }, p2: null, t3: ["I"] },            // Bélgica vs Senegal (3°I)
  { id: "M81", p1: { n: 1, g: "C" }, p2: { n: 2, g: "F" }, t3: null },  // Brasil vs Japón
  { id: "M82", p1: { n: 2, g: "E" }, p2: { n: 2, g: "I" }, t3: null },  // Costa de Marfil vs Noruega
  { id: "M83", p1: { n: 1, g: "A" }, p2: null, t3: ["E"] },            // México vs Ecuador (3°E)
  { id: "M84", p1: { n: 1, g: "L" }, p2: null, t3: ["K"] },            // Inglaterra vs Congo DR (3°K)
  { id: "M85", p1: { n: 1, g: "J" }, p2: { n: 2, g: "H" }, t3: null },  // Argentina vs Cabo Verde
  { id: "M86", p1: { n: 2, g: "D" }, p2: { n: 2, g: "G" }, t3: null },  // Australia vs Egipto
  { id: "M87", p1: { n: 1, g: "B" }, p2: null, t3: ["G"] },            // Suiza vs Irán (3°G)
  { id: "M88", p1: { n: 1, g: "K" }, p2: null, t3: ["L"] },            // Colombia vs Ghana (3°L)
];

// Octavos M89-M96 (índices en R32_DEF, 0-based)
export const OCT_PAR = [
  [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15],
];
export const OCT_IDS = ["M89", "M90", "M91", "M92", "M93", "M94", "M95", "M96"];

// Cuartos M97-M100 (índices en array oct)
export const QUA_PAR = [[0, 1], [2, 3], [4, 5], [6, 7]];
export const QUA_IDS = ["M97", "M98", "M99", "M100"];

// Semis M101-M102 (índices en array qua)
export const SEM_PAR = [[0, 1], [2, 3]];
export const SEM_IDS = ["M101", "M102"];

export const ADMIN_PASS = "admin2026";
export const CLAVE_INI = "1234";
