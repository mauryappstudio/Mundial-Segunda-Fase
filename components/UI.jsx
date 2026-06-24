// components/UI.jsx
"use client";
import { flag } from "../lib/data";

export const ST = {
  card: { background: "#0d1526", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #1e3a5f" },
  ct: { fontSize: 12, fontWeight: 800, color: "#fbbf24", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, display: "flex", justifyContent: "space-between", alignItems: "center" },
  mc: { background: "#111827", borderRadius: 8, padding: "8px 10px", marginBottom: 3 },
  sb: { background: "#1e3a5f", color: "#fbbf24", padding: "3px 10px", borderRadius: 20, fontSize: 13, fontWeight: 900, whiteSpace: "nowrap" },
  vb: { background: "#1e293b", color: "#475569", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 },
  si: { width: 42, background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", borderRadius: 6, padding: "4px 6px", fontSize: 14, textAlign: "center" },
  bok: { background: "#10b981", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  bbet: { background: "linear-gradient(135deg,#3b82f6,#6366f1)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  bdg: { display: "inline-block", background: "#10b981", color: "#fff", borderRadius: 3, padding: "1px 4px", fontSize: 9, fontWeight: 700 },
  camp: { background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#0a0f1e", borderRadius: 12, padding: 14, fontWeight: 900, fontSize: 16, textAlign: "center", marginTop: 8 },
};

export function NumInput({ value, onChange, onEnterNext }) {
  return (
    <input
      type="number"
      min="0"
      max="20"
      placeholder="0"
      inputMode="numeric"
      enterKeyHint="next"
      value={value === undefined || value === null ? "" : value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (onEnterNext) onEnterNext(e.target);
          else {
            const inputs = Array.from(document.querySelectorAll('input[type="number"]'));
            const idx = inputs.indexOf(e.target);
            if (idx >= 0 && idx < inputs.length - 1) {
              inputs[idx + 1].focus();
              inputs[idx + 1].select();
            } else e.target.blur();
          }
        }
      }}
      style={ST.si}
    />
  );
}

export function MatchScoreRow({ loc, vis, res }) {
  const nd = !loc || !vis;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, minWidth: 0 }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>{nd ? "🌐" : flag(loc)}</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{loc || "Por definir"}</span>
      </div>
      <div style={{ flexShrink: 0 }}>
        {res ? <span style={ST.sb}>{res.l}–{res.v}</span> : <span style={ST.vb}>vs</span>}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, justifyContent: "flex-end", minWidth: 0 }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{vis || "Por definir"}</span>
        <span style={{ fontSize: 16, flexShrink: 0 }}>{nd ? "🌐" : flag(vis)}</span>
      </div>
    </div>
  );
}

export function AdminResultInput({ matchId, drafts, setDrafts, onSave }) {
  const a = drafts[matchId] || {};
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 5, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, color: "#f59e0b" }}>Resultado:</span>
      <NumInput value={a.l} onChange={(v) => setDrafts((p) => ({ ...p, [matchId]: { ...p[matchId], l: v } }))} />
      <span style={{ color: "#475569" }}>—</span>
      <NumInput value={a.v} onChange={(v) => setDrafts((p) => ({ ...p, [matchId]: { ...p[matchId], v: v } }))} />
      <button
        style={ST.bok}
        onClick={() => {
          const cur = drafts[matchId] || {};
          const l = parseInt(cur.l), v = parseInt(cur.v);
          if (isNaN(l) || isNaN(v)) return;
          onSave(matchId, l, v);
          setDrafts((p) => { const n = { ...p }; delete n[matchId]; return n; });
        }}
      >
        ✓ Guardar
      </button>
    </div>
  );
}

export function Pill({ children, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "#1e3a5f" : "#1e293b",
        border: active ? `1px solid ${color || "#3b82f6"}` : "1px solid #334155",
        color: active ? (color === "#a78bfa" ? "#a78bfa" : "#60a5fa") : "#64748b",
        borderRadius: 20,
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
