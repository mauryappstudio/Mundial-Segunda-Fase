// components/views/BracketView.jsx
"use client";
import { useState } from "react";
import { GRUPOS, PG, flag } from "../../lib/data";
import { calcTabla, gana } from "../../lib/logic";
import { ST, NumInput } from "../UI";

export default function BracketView({ isAdmin, rg, top8, ko, avanza, saveResultadoKO, saveAvanza, undoAvanza }) {
  const [drafts, setDrafts] = useState({});
  const agd = PG.every((p) => rg[p.id]);

  if (!agd) {
    return (
      <div>
        <div style={{ background: "rgba(71,85,105,.15)", border: "1px dashed #334155", borderRadius: 10, padding: 20, textAlign: "center", color: "#64748b", fontSize: 14 }}>
          🔒 El cuadro se mostrará completo cuando termine la Fase de Grupos ({Object.keys(rg).length}/72)
        </div>
        <ClasificadosResumen rg={rg} top8={top8} />
      </div>
    );
  }

  const camp = gana(ko.fin[0]?.loc, ko.fin[0]?.vis, ko.fin[0]?.r, ko.fin[0]?.id, avanza);

  function KoBox({ p, labelExtra }) {
    const gw = gana(p.loc, p.vis, p.r, p.id, avanza);
    const esEmpate = p.r && p.r.l === p.r.v;
    const necesitaDesempate = esEmpate && !avanza[p.id];
    const a = drafts[p.id] || {};

    return (
      <div style={{ background: "#0a0f1e", border: `1px solid ${necesitaDesempate ? "#f59e0b" : p.r ? "#10b981" : "#1e293b"}`, borderRadius: 8, overflow: "hidden", width: 165 }}>
        <div style={{ fontSize: 9, color: "#3b82f6", fontWeight: 700, padding: "3px 8px", background: "#0d1526", display: "flex", justifyContent: "space-between" }}>
          {p.lbl}
          {labelExtra && <span style={{ color: "#64748b" }}>{labelExtra}</span>}
        </div>
        {[{ e: p.loc, k: "l" }, { e: p.vis, k: "v" }].map(({ e, k }) => {
          const iw = gw && gw === e;
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: iw ? "rgba(16,185,129,.12)" : "transparent", borderBottom: k === "l" ? "1px solid #1e293b" : "none" }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{e ? flag(e) : "🌐"}</span>
              <span style={{ fontSize: 11, flex: 1, fontWeight: 600, color: iw ? "#10b981" : "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e || "Por definir"}</span>
              {p.r && <span style={{ fontSize: 12, fontWeight: 900, color: "#fbbf24" }}>{p.r[k]}</span>}
            </div>
          );
        })}
        {p.r && <div style={{ fontSize: 9, color: "#64748b", padding: "2px 8px", fontStyle: "italic" }}>Resultado 90 min</div>}

        {isAdmin && !p.r && p.ok && (
          <div style={{ display: "flex", gap: 3, alignItems: "center", padding: "4px 6px", flexWrap: "wrap" }}>
            <NumInput value={a.l} onChange={(v) => setDrafts((prev) => ({ ...prev, [p.id]: { ...prev[p.id], l: v } }))} />
            <span style={{ color: "#475569", fontSize: 11 }}>—</span>
            <NumInput value={a.v} onChange={(v) => setDrafts((prev) => ({ ...prev, [p.id]: { ...prev[p.id], v: v } }))} />
            <button
              onClick={() => {
                const cur = drafts[p.id] || {};
                const l = parseInt(cur.l), v = parseInt(cur.v);
                if (isNaN(l) || isNaN(v)) return;
                saveResultadoKO(p.id, l, v);
                setDrafts((prev) => { const n = { ...prev }; delete n[p.id]; return n; });
              }}
              style={{ background: "#10b981", border: "none", color: "#fff", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
            >
              ✓
            </button>
          </div>
        )}

        {isAdmin && necesitaDesempate && (
          <div style={{ background: "rgba(245,158,11,.12)", padding: "5px 6px", borderTop: "1px solid #1e293b" }}>
            <div style={{ fontSize: 9, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>⚠️ Empate — ¿quién avanzó?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <button onClick={() => saveAvanza(p.id, p.loc)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", padding: "4px 6px", fontSize: 10, fontWeight: 600, textAlign: "left", cursor: "pointer", borderRadius: 4 }}>
                {flag(p.loc)} {p.loc}
              </button>
              <button onClick={() => saveAvanza(p.id, p.vis)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", padding: "4px 6px", fontSize: 10, fontWeight: 600, textAlign: "left", cursor: "pointer", borderRadius: 4 }}>
                {flag(p.vis)} {p.vis}
              </button>
            </div>
          </div>
        )}

        {esEmpate && avanza[p.id] && (
          <div style={{ background: "rgba(16,185,129,.1)", padding: "4px 8px", fontSize: 10, color: "#10b981", fontWeight: 700 }}>
            ⚡ Avanza: {flag(avanza[p.id])} {avanza[p.id]}
            {isAdmin && (
              <span style={{ cursor: "pointer", marginLeft: 6, color: "#64748b" }} onClick={() => undoAvanza(p.id)}>✏️</span>
            )}
          </div>
        )}
      </div>
    );
  }

  function Col({ title, boxes, justify }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: justify || "space-around", minWidth: 165 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#a78bfa", textAlign: "center", letterSpacing: 1, marginBottom: 4 }}>{title}</div>
        {boxes}
      </div>
    );
  }

  return (
    <div>
      <ClasificadosResumen rg={rg} top8={top8} />

      <div style={{ overflowX: "auto", paddingBottom: 10 }}>
        <div style={{ display: "flex", gap: 20, minWidth: 1100, padding: "10px 4px" }}>
          <Col title="RONDA DE 32" boxes={ko.r32.map((p) => <KoBox key={p.id} p={p} />)} justify="space-between" />
          <Col title="OCTAVOS" boxes={ko.oct.map((p) => <KoBox key={p.id} p={p} labelExtra={p.de ? `${p.de[0]}/${p.de[1]}` : ""} />)} />
          <Col title="CUARTOS" boxes={ko.qua.map((p) => <KoBox key={p.id} p={p} />)} />
          <Col title="SEMIS" boxes={ko.sem.map((p) => <KoBox key={p.id} p={p} />)} justify="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", minWidth: 165 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#fbbf24", textAlign: "center", letterSpacing: 1 }}>🏆 FINAL</div>
            <KoBox p={ko.fin[0]} />
            <div style={{ fontSize: 9, fontWeight: 700, color: "#64748b", textAlign: "center", marginTop: 6 }}>3ER LUGAR</div>
            <KoBox p={ko.ter[0]} />
          </div>
        </div>
      </div>

      {camp && <div style={ST.camp}>🏆 CAMPEÓN: {flag(camp)} {camp} 🏆</div>}
    </div>
  );
}

function ClasificadosResumen({ rg, top8 }) {
  return (
    <div style={ST.card}>
      <div style={ST.ct}>CLASIFICADOS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 6 }}>
        {Object.entries(GRUPOS).map(([g]) => {
          const t = calcTabla(g, rg);
          const done = PG.filter((p) => p.g === g).every((p) => rg[p.id]);
          return (
            <div key={g} style={{ background: "#0a0f1e", borderRadius: 8, padding: "6px 8px", border: "1px solid #1e293b" }}>
              <div style={{ fontWeight: 800, color: "#fbbf24", fontSize: 10, marginBottom: 4 }}>GRUPO {g}</div>
              {t.slice(0, 3).map((r, i) => (
                <div key={r.e} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "1px 0", opacity: i === 2 && !(done && top8.includes(g)) ? 0.4 : 1 }}>
                  <span>{flag(r.e)}</span>
                  <span style={{ flex: 1 }}>{r.e}</span>
                  {i < 2 && done && <span style={{ color: "#10b981" }}>✓</span>}
                  {i === 2 && done && top8.includes(g) && <span style={{ color: "#f59e0b" }}>3°</span>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
