// components/views/ApostarView.jsx
"use client";
import { useState } from "react";
import { flag } from "../../lib/data";
import { cPts, gana } from "../../lib/logic";
import { ST, NumInput } from "../UI";

export default function ApostarView({ me, ko, agd, actualizarUsuario }) {
  const [drafts, setDrafts] = useState({});
  const [confirm, setConfirm] = useState(null);

  if (!agd) {
    return (
      <div style={{ background: "rgba(71,85,105,.15)", border: "1px dashed #334155", borderRadius: 10, padding: 20, textAlign: "center", color: "#64748b", fontSize: 14 }}>
        🔒 Las apuestas se abren cuando termine la Fase de Grupos
      </div>
    );
  }
  if (!me) return null;

  const secs = [
    { lbl: "Ronda de 32", data: ko.r32, fase: "R32" },
    { lbl: "Octavos de Final", data: ko.oct.filter((p) => p.ok), fase: "OCT" },
    { lbl: "Cuartos de Final", data: ko.qua.filter((p) => p.ok), fase: "QUA" },
    { lbl: "Semifinales", data: ko.sem.filter((p) => p.ok), fase: "SEM" },
    { lbl: "3er Lugar", data: ko.ter.filter((p) => p.ok), fase: "FIN" },
    { lbl: "🏆 FINAL", data: ko.fin.filter((p) => p.ok), fase: "FIN" },
  ];

  async function confirmarFase(fase, partidos) {
    const newB2 = { ...(me.b2 || {}) };
    partidos.forEach((p) => {
      if (drafts[p.id]) newB2[p.id] = drafts[p.id];
    });
    const newFc = { ...(me.fc || {}), [fase]: true };
    await actualizarUsuario(me.id, { b2: newB2, fc: newFc });
    setDrafts({});
    setConfirm(null);
  }

  const camp = gana(ko.fin[0]?.loc, ko.fin[0]?.vis, ko.fin[0]?.r, ko.fin[0]?.id, {});

  return (
    <div>
      <div style={{ background: "#0d2545", border: "1px solid #1e3a5f", borderRadius: 8, padding: "7px 12px", fontSize: 12, marginBottom: 10, color: "#93c5fd", textAlign: "center" }}>
        🟢 Exacto=3pts · 🟡 Ganador/Empate=1pt · ⚫ Fallo=0
      </div>

      {secs.map(({ lbl, data, fase }) => {
        if (!data.length) return null;
        const confirmed = me.fc?.[fase];
        const hechos = data.filter((p) => drafts[p.id] !== undefined || me.b2?.[p.id]).length;

        return (
          <div key={lbl}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#3b82f6", padding: "8px 2px 4px", textTransform: "uppercase", letterSpacing: 2 }}>{lbl}</div>
            {data.map((p) => (
              <BetCard key={p.id} p={p} me={me} fase={fase} drafts={drafts} setDrafts={setDrafts} />
            ))}
            {!confirmed && hechos > 0 && (
              <div style={{ background: "rgba(59,130,246,.08)", border: "1px dashed #3b82f6", borderRadius: 8, padding: "10px 14px", margin: "6px 0", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#60a5fa", marginBottom: 6 }}>{hechos}/{data.length} pronósticos listos en {lbl}</div>
                <button
                  onClick={() => {
                    const items = data.map((p) => ({ loc: p.loc, vis: p.vis, ap: drafts[p.id] || me.b2?.[p.id] || null, id: p.id }));
                    setConfirm({ fase, items, pendientes: items.filter((r) => !r.ap).length, partidos: data });
                  }}
                  style={{ background: "linear-gradient(135deg,#f59e0b,#10b981)", border: "none", color: "#fff", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
                >
                  🔒 Confirmar apuestas — {lbl}
                </button>
              </div>
            )}
            {confirmed && (
              <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid #10b981", borderRadius: 8, padding: "6px 12px", margin: "4px 0", fontSize: 12, color: "#10b981", textAlign: "center" }}>
                ✅ {lbl} confirmado
              </div>
            )}
          </div>
        );
      })}

      {camp && <div style={ST.camp}>🏆 CAMPEÓN: {flag(camp)} {camp} 🏆</div>}

      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
          <div style={{ background: "#0d1526", borderRadius: 16, padding: "22px 20px", border: "2px solid #f59e0b", width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 36 }}>⚠️</div>
              <div style={{ fontWeight: 900, fontSize: 15, color: "#fbbf24", marginTop: 8 }}>¿Confirmar estas apuestas?</div>
            </div>
            {confirm.pendientes > 0 && (
              <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "8px 12px", marginBottom: 10, fontSize: 13, color: "#f87171", textAlign: "center" }}>
                ⚠️ {confirm.pendientes} partido(s) sin pronosticar quedarán en blanco
              </div>
            )}
            <div style={{ background: "#0a0f1e", borderRadius: 8, padding: 10, marginBottom: 12, maxHeight: 180, overflowY: "auto" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 5, fontWeight: 700 }}>TUS PRONÓSTICOS:</div>
              {confirm.items.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid #1e293b", fontSize: 12 }}>
                  <span style={{ color: "#94a3b8", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>{r.loc} vs {r.vis}</span>
                  <span style={{ fontWeight: 800, color: r.ap ? "#fbbf24" : "#475569", flexShrink: 0 }}>{r.ap ? `${r.ap.l}–${r.ap.v}` : "—"}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#ef4444", textAlign: "center", marginBottom: 12, fontWeight: 600 }}>🔒 Una vez confirmado NO podrás modificar</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => confirmarFase(confirm.fase, confirm.partidos)} style={{ flex: 1, background: "linear-gradient(135deg,#10b981,#059669)", border: "none", color: "#fff", borderRadius: 8, padding: 11, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                ✅ Confirmar
              </button>
              <button onClick={() => setConfirm(null)} style={{ flex: 1, background: "#334155", border: "none", color: "#fff", borderRadius: 8, padding: 11, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                ✏️ Seguir editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BetCard({ p, me, fase, drafts, setDrafts }) {
  const apConf = me.b2?.[p.id];
  const pts = p.r && apConf ? cPts(apConf, p.r) : null;
  const conf = me.fc?.[fase];
  const hasBor = drafts[p.id] !== undefined;
  const bc = !p.r ? (hasBor ? "#3b82f6" : "#334155") : pts === 3 ? "#10b981" : pts === 1 ? "#f59e0b" : "#475569";

  return (
    <div style={{ ...ST.mc, borderLeft: `3px solid ${bc}` }}>
      <div style={{ fontSize: 9, color: "#475569", fontWeight: 700, marginBottom: 2 }}>{p.lbl}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}>
          <span style={{ fontSize: 16 }}>{flag(p.loc)}</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.loc}</span>
        </div>
        {p.r ? <span style={ST.sb}>{p.r.l}–{p.r.v}</span> : <span style={ST.vb}>vs</span>}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, justifyContent: "flex-end" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{p.vis}</span>
          <span style={{ fontSize: 16 }}>{flag(p.vis)}</span>
        </div>
      </div>

      {p.r ? (
        <>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, fontSize: 12, flexWrap: "wrap" }}>
            {apConf ? (
              <>
                <span style={{ color: "#64748b" }}>Tu apuesta: </span>
                <b style={{ color: "#e2e8f0" }}>{apConf.l}–{apConf.v}</b>
                <span style={{ fontWeight: 800, color: pts === 3 ? "#10b981" : pts === 1 ? "#f59e0b" : "#6b7280" }}>
                  {pts === 3 ? " 🟢 +3" : pts === 1 ? " 🟡 +1" : " ⚫ +0"}
                </span>
              </>
            ) : <span style={{ color: "#6b7280", fontSize: 11 }}>Sin pronóstico</span>}
          </div>
        </>
      ) : conf ? (
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, fontSize: 12 }}>
          {apConf ? (
            <>
              <span style={{ fontSize: 11, color: "#10b981" }}>✅ </span>
              <b style={{ color: "#fbbf24" }}>{apConf.l}–{apConf.v}</b>
            </>
          ) : <span style={{ color: "#6b7280", fontSize: 11 }}>✅ Sin pronóstico</span>}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 5 }}>
          <NumInput
            value={drafts[p.id]?.l ?? apConf?.l}
            onChange={(v) => setDrafts((prev) => ({ ...prev, [p.id]: { ...prev[p.id], l: parseInt(v) || 0 } }))}
          />
          <span style={{ color: "#475569" }}>—</span>
          <NumInput
            value={drafts[p.id]?.v ?? apConf?.v}
            onChange={(v) => setDrafts((prev) => ({ ...prev, [p.id]: { ...prev[p.id], v: parseInt(v) || 0 } }))}
          />
          {hasBor && <span style={{ fontSize: 10, color: "#3b82f6" }}>✏️</span>}
        </div>
      )}
    </div>
  );
}
