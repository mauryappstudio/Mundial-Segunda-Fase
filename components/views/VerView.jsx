// components/views/VerView.jsx
"use client";
import { useState } from "react";
import { flag } from "../../lib/data";
import { cPts } from "../../lib/logic";

const PAGE_SIZE = 6;

export default function VerView({ users, ko }) {
  const [page, setPage] = useState(0);

  if (!users.length) {
    return <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: "20px 0" }}>Aún no hay jugadores registrados</div>;
  }

  const allKO = ko.allKO.filter((p) => p.ok);
  if (!allKO.length) {
    return <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: "20px 0" }}>Aún no hay partidos disponibles para apostar</div>;
  }

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const pageUsers = users.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const faseNames = { R32: "RONDA DE 32", OCT: "OCTAVOS", QUA: "CUARTOS", SEM: "SEMIFINALES", FIN: "FINAL / 3ER LUGAR" };
  let lastFase = "";

  return (
    <div>
      <div style={{ background: "#0d2545", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px", fontSize: 12, marginBottom: 10, color: "#93c5fd", textAlign: "center" }}>
        👁 Solo apuestas confirmadas por ronda. Los borradores son privados.
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            style={{ background: page === 0 ? "#1e293b" : "#3b82f6", border: "none", color: "#fff", padding: "6px 14px", fontSize: 14, fontWeight: 700, borderRadius: 8, cursor: "pointer", opacity: page === 0 ? 0.4 : 1 }}
          >
            ◀
          </button>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Jugadores {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, users.length)} de {users.length}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            style={{ background: page >= totalPages - 1 ? "#1e293b" : "#3b82f6", border: "none", color: "#fff", padding: "6px 14px", fontSize: 14, fontWeight: 700, borderRadius: 8, cursor: "pointer", opacity: page >= totalPages - 1 ? 0.4 : 1 }}
          >
            ▶
          </button>
        </div>
      )}

      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #1e3a5f" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: `${280 + pageUsers.length * 100}px` }}>
          <thead>
            <tr style={{ background: "#0d1526" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", color: "#fbbf24", fontWeight: 800, position: "sticky", left: 0, background: "#0d1526", zIndex: 2, borderBottom: "2px solid #1e3a5f", minWidth: 160 }}>PARTIDO</th>
              {pageUsers.map((u) => (
                <th key={u.id} style={{ padding: "8px 6px", textAlign: "center", color: "#60a5fa", fontWeight: 800, borderBottom: "2px solid #1e3a5f", borderLeft: "1px solid #1e293b", minWidth: 90, fontSize: 11 }}>
                  {u.apodo || u.nom}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allKO.map((p) => {
              const rows = [];
              if (p.fase !== lastFase) {
                lastFase = p.fase;
                rows.push(
                  <tr key={`sep-${p.id}`}>
                    <td colSpan={pageUsers.length + 1} style={{ padding: "6px 10px", background: "#1e3a5f", color: "#a78bfa", fontWeight: 800, fontSize: 10, letterSpacing: 1, position: "sticky", left: 0 }}>
                      {faseNames[p.fase] || p.fase}
                    </td>
                  </tr>
                );
              }
              rows.push(
                <tr key={p.id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "6px 10px", position: "sticky", left: 0, background: "#0a0f1e", zIndex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 9, color: "#475569", fontWeight: 700 }}>{p.lbl}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, flexWrap: "wrap" }}>
                      <span>{flag(p.loc)}</span><span style={{ fontSize: 10 }}>{p.loc}</span>
                      <span style={{ color: "#475569" }}>vs</span>
                      <span>{flag(p.vis)}</span><span style={{ fontSize: 10 }}>{p.vis}</span>
                    </div>
                    {p.r && <div style={{ fontSize: 11, fontWeight: 900, color: "#fbbf24", marginTop: 2 }}>Resultado: {p.r.l}–{p.r.v}</div>}
                  </td>
                  {pageUsers.map((u) => {
                    const ap = u.b2?.[p.id];
                    const conf = u.fc?.[p.fase];
                    const pts = p.r && ap ? cPts(ap, p.r) : null;
                    let content, color;
                    if (conf && ap) { content = `${ap.l}–${ap.v}`; color = "#fbbf24"; }
                    else if (conf && !ap) { content = "—"; color = "#475569"; }
                    else { content = "🔒"; color = "#334155"; }
                    return (
                      <td key={u.id} style={{ padding: 6, textAlign: "center", borderLeft: "1px solid #1e293b" }}>
                        <div style={{ fontWeight: 800, color, fontSize: 13 }}>{content}</div>
                        {p.r && ap && conf && <div style={{ fontSize: 13, marginTop: 2 }}>{pts === 3 ? "🟢" : pts === 1 ? "🟡" : "⚫"}</div>}
                      </td>
                    );
                  })}
                </tr>
              );
              return rows;
            })}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 8 }}>
        👈 Desliza la tabla horizontalmente para ver más jugadores
      </div>
    </div>
  );
}
