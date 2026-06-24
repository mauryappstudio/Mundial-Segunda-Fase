// components/views/GruposView.jsx
"use client";
import { useState } from "react";
import { GRUPOS, PG, flag } from "../../lib/data";
import { calcTabla } from "../../lib/logic";
import { ST, MatchScoreRow, AdminResultInput, Pill } from "../UI";

export default function GruposView({ isAdmin, rg, agd, top8, saveResultadoGrupo }) {
  const [diaF, setDiaF] = useState("Todos");
  const [gF, setGF] = useState(null);
  const [drafts, setDrafts] = useState({});

  const dias = ["Todos", ...[...new Set(PG.map((p) => p.f))]];
  const pf = diaF === "Todos" ? PG : PG.filter((p) => p.f === diaF);

  return (
    <div>
      <div style={{ background: isAdmin ? "rgba(245,158,11,.1)" : "#0d2545", border: isAdmin ? "1px solid #f59e0b" : "1px solid #1e3a5f", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 10, color: isAdmin ? "#f59e0b" : "#93c5fd", textAlign: "center" }}>
        {isAdmin ? "🔐 Ingresa aquí los resultados en el orden real de juego. Las tablas se calculan abajo automáticamente." : "📊 Partidos en orden cronológico — tablas de grupos al final"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "linear-gradient(135deg,#1e3a5f,#0d2545)", borderRadius: 10, marginBottom: 10, fontWeight: 800, fontSize: 13, color: "#e2e8f0" }}>
        <span>⚽ PROGRESO {agd && <span style={{ color: "#10b981", fontSize: 11, marginLeft: 6 }}>✅ TODOS LOS GRUPOS COMPLETOS</span>}</span>
        <span style={{ fontSize: 12, color: "#60a5fa" }}>{Object.keys(rg).length}/72</span>
      </div>

      <div style={{ fontSize: 12, fontWeight: 800, color: "#3b82f6", padding: "6px 2px", textTransform: "uppercase", letterSpacing: 2 }}>📅 PARTIDOS — ORDEN OFICIAL FIFA</div>
      <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "5px 0", marginBottom: 4 }}>
        {dias.map((d) => (
          <Pill key={d} active={diaF === d} onClick={() => setDiaF(d)}>{d}</Pill>
        ))}
      </div>

      {[...new Set(pf.map((p) => p.f))].map((fecha) => (
        <div key={fecha}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#a78bfa", padding: "8px 2px 3px", textTransform: "uppercase", letterSpacing: 1 }}>📅 {fecha}</div>
          {pf.filter((p) => p.f === fecha).map((p) => {
            const res = rg[p.id];
            return (
              <div key={p.id} style={{ ...ST.mc, borderLeft: `3px solid ${res ? "#10b981" : "#334155"}` }}>
                <div style={{ fontSize: 9, color: "#475569", fontWeight: 700, marginBottom: 2 }}>Grupo {p.g}</div>
                <MatchScoreRow loc={p.loc} vis={p.vis} res={res} />
                {isAdmin && !res && (
                  <AdminResultInput
                    matchId={p.id}
                    drafts={drafts}
                    setDrafts={setDrafts}
                    onSave={(id, l, v) => saveResultadoGrupo(id, l, v)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ fontSize: 12, fontWeight: 800, color: "#fbbf24", padding: "14px 2px 6px", textTransform: "uppercase", letterSpacing: 2, borderTop: "2px solid #1e3a5f", marginTop: 10 }}>
        📊 TABLAS DE CLASIFICACIÓN
      </div>
      <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "5px 0", marginBottom: 4 }}>
        {[null, ...Object.keys(GRUPOS)].map((g) => (
          <Pill key={g || "t"} active={gF === g} onClick={() => setGF(g)}>{g || "Todos"}</Pill>
        ))}
      </div>

      {Object.entries(GRUPOS).filter(([g]) => gF === null || gF === g).map(([g]) => {
        const tab = calcTabla(g, rg);
        const done = PG.filter((p) => p.g === g).every((p) => rg[p.id]);
        return (
          <div key={g} style={ST.card}>
            <div style={ST.ct}>
              <span>GRUPO {g}</span>
              {done && <span style={{ color: "#10b981" }}>✅</span>}
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    {["#", "Equipo", "PJ", "PG", "PE", "PP", "GF", "GC", "GD", "Pts"].map((h) => (
                      <th key={h} style={{ padding: "4px 3px", textAlign: "left", color: "#475569", fontWeight: 700, borderBottom: "1px solid #1e293b" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab.map((r, i) => (
                    <tr key={r.e} style={{ background: i === 0 ? "rgba(16,185,129,.12)" : i === 1 ? "rgba(16,185,129,.05)" : i === 2 && done && top8.includes(g) ? "rgba(245,158,11,.08)" : "transparent" }}>
                      <td style={{ padding: "5px 3px" }}>
                        {i < 2 ? <span style={ST.bdg}>✓</span> : i === 2 && done && top8.includes(g) ? <span style={{ ...ST.bdg, background: "#f59e0b" }}>3°↑</span> : i + 1}
                      </td>
                      <td style={{ padding: "5px 3px" }}><span style={{ fontSize: 14, marginRight: 4 }}>{flag(r.e)}</span>{r.e}</td>
                      {[r.pj, r.pg, r.pe, r.pp, r.gf, r.gc].map((v, idx) => (
                        <td key={idx} style={{ padding: "5px 2px", textAlign: "center" }}>{v}</td>
                      ))}
                      <td style={{ padding: "5px 2px", textAlign: "center", color: r.d > 0 ? "#10b981" : r.d < 0 ? "#ef4444" : "#64748b" }}>{r.d > 0 ? "+" : ""}{r.d}</td>
                      <td style={{ padding: "5px 2px", textAlign: "center", fontWeight: 800, color: "#fbbf24", fontSize: 14 }}>{r.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
