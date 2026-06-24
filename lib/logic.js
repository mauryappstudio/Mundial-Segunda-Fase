// lib/logic.js
import { GRUPOS, PG, R32_DEF, OCT_PAR, OCT_IDS, QUA_PAR, QUA_IDS, SEM_PAR, SEM_IDS } from "./data";

export function calcTabla(g, rg) {
  const t = {};
  GRUPOS[g].forEach((e) => {
    t[e] = { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
  });
  PG.filter((p) => p.g === g).forEach((p) => {
    const r = rg[p.id];
    if (!r) return;
    t[p.loc].pj++;
    t[p.vis].pj++;
    t[p.loc].gf += r.l;
    t[p.loc].gc += r.v;
    t[p.vis].gf += r.v;
    t[p.vis].gc += r.l;
    if (r.l > r.v) {
      t[p.loc].pg++;
      t[p.loc].pts += 3;
      t[p.vis].pp++;
    } else if (r.l < r.v) {
      t[p.vis].pg++;
      t[p.vis].pts += 3;
      t[p.loc].pp++;
    } else {
      t[p.loc].pe++;
      t[p.loc].pts++;
      t[p.vis].pe++;
      t[p.vis].pts++;
    }
  });
  return Object.entries(t)
    .map(([e, s]) => ({ e, ...s, d: s.gf - s.gc }))
    .sort((a, b) => b.pts - a.pts || b.d - a.d || b.gf - a.gf);
}

export function allTabs(rg) {
  const t = {};
  Object.keys(GRUPOS).forEach((g) => {
    t[g] = calcTabla(g, rg);
  });
  return t;
}

export function allGDone(rg) {
  return PG.every((p) => rg[p.id]);
}

export function calcTop8(rg) {
  const tabs = allTabs(rg);
  const t3 = Object.entries(tabs)
    .map(([g, t]) => ({
      g,
      ...t[2],
      pts: t[2]?.pts || 0,
      d: t[2]?.d || 0,
      gf: t[2]?.gf || 0,
    }))
    .filter((x) => x.e)
    .sort((a, b) => b.pts - a.pts || b.d - a.d || b.gf - a.gf);
  return t3.slice(0, 8).map((x) => x.g);
}

export function gana(l, v, r, matchId, avanza) {
  if (!r) return null;
  if (r.l !== r.v) return r.l > r.v ? l : v;
  if (matchId && avanza && avanza[matchId]) return avanza[matchId];
  return null;
}

export function pierde(l, v, r, matchId, avanza) {
  if (!r) return null;
  if (r.l !== r.v) return r.l > r.v ? v : l;
  if (matchId && avanza && avanza[matchId]) return avanza[matchId] === l ? v : l;
  return null;
}

export function cPts(ap, r) {
  if (!r || !ap || ap.l === undefined) return null;
  if (ap.l === r.l && ap.v === r.v) return 3;
  const a = ap.l > ap.v ? "L" : ap.l < ap.v ? "V" : "E";
  const b = r.l > r.v ? "L" : r.l < r.v ? "V" : "E";
  return a === b ? 1 : 0;
}

function getEq(c, tabs, top8, used) {
  const e1 = tabs[c.p1.g]?.[c.p1.n - 1]?.e || null;
  let e2 = null;
  if (c.p2) {
    e2 = tabs[c.p2.g]?.[c.p2.n - 1]?.e || null;
  } else {
    for (const g of top8 || []) {
      if (c.t3.includes(g) && !used.has(g)) {
        used.add(g);
        e2 = tabs[g]?.[2]?.e || null;
        break;
      }
    }
  }
  return { e1, e2 };
}

export function calcKO(rg, rko, top8, avanza) {
  const tabs = allTabs(rg);
  const used = new Set();

  const r32 = R32_DEF.map((c) => {
    const { e1, e2 } = getEq(c, tabs, top8, used);
    return {
      id: c.id,
      lbl: c.id,
      fase: "R32",
      loc: e1,
      vis: e2,
      r: rko[c.id] || null,
      ok: !!(e1 && e2),
    };
  });

  const oct = OCT_PAR.map(([a, b], i) => {
    const p1 = r32[a], p2 = r32[b];
    const l = gana(p1?.loc, p1?.vis, p1?.r, p1?.id, avanza);
    const v = gana(p2?.loc, p2?.vis, p2?.r, p2?.id, avanza);
    return {
      id: OCT_IDS[i],
      lbl: OCT_IDS[i],
      fase: "OCT",
      loc: l,
      vis: v,
      r: rko[OCT_IDS[i]] || null,
      ok: !!(l && v),
      de: [p1?.lbl, p2?.lbl],
    };
  });

  const qua = QUA_PAR.map(([a, b], i) => {
    const p1 = oct[a], p2 = oct[b];
    const l = gana(p1?.loc, p1?.vis, p1?.r, p1?.id, avanza);
    const v = gana(p2?.loc, p2?.vis, p2?.r, p2?.id, avanza);
    return {
      id: QUA_IDS[i],
      lbl: QUA_IDS[i],
      fase: "QUA",
      loc: l,
      vis: v,
      r: rko[QUA_IDS[i]] || null,
      ok: !!(l && v),
      de: [p1?.lbl, p2?.lbl],
    };
  });

  const sem = SEM_PAR.map(([a, b], i) => {
    const p1 = qua[a], p2 = qua[b];
    const l = gana(p1?.loc, p1?.vis, p1?.r, p1?.id, avanza);
    const v = gana(p2?.loc, p2?.vis, p2?.r, p2?.id, avanza);
    return {
      id: SEM_IDS[i],
      lbl: SEM_IDS[i],
      fase: "SEM",
      loc: l,
      vis: v,
      r: rko[SEM_IDS[i]] || null,
      ok: !!(l && v),
      de: [p1?.lbl, p2?.lbl],
    };
  });

  const s1 = sem[0], s2 = sem[1];
  const fin = [
    {
      id: "M104",
      lbl: "FINAL",
      fase: "FIN",
      loc: gana(s1?.loc, s1?.vis, s1?.r, s1?.id, avanza),
      vis: gana(s2?.loc, s2?.vis, s2?.r, s2?.id, avanza),
      r: rko["M104"] || null,
      ok: !!(s1?.r && s2?.r),
    },
  ];
  const ter = [
    {
      id: "M103",
      lbl: "3er Lugar",
      fase: "FIN",
      loc: pierde(s1?.loc, s1?.vis, s1?.r, s1?.id, avanza),
      vis: pierde(s2?.loc, s2?.vis, s2?.r, s2?.id, avanza),
      r: rko["M103"] || null,
      ok: !!(s1?.r && s2?.r),
    },
  ];

  return {
    r32, oct, qua, sem, fin, ter,
    allKO: [...r32, ...oct, ...qua, ...sem, ...fin, ...ter],
  };
}
