// components/views/RankingView.jsx
"use client";
import { ST } from "../UI";
import { cPts } from "../../lib/logic";

export default function RankingView({ users, ses, rko }) {
  function computeStats(u) {
    let pts = 0, ex = 0, gn = 0, fn = 0, tot = 0;
    Object.entries(u.b2 || {}).forEach(([id, ap]) => {
      const r = rko[id];
      if (!r) return;
      tot++;
      const p = cPts(ap, r);
      if (p === 3) { ex++; pts += 3; }
      else if (p === 1) { gn++; pts += 1; }
      else fn++;
    });
    return { pts, ex, gn, fn, tot };
  }

  const withStats = users.map((u) => ({ u, stats: computeStats(u) }));
  const sorted = withStats.sort((a, b) => b.stats.pts - a.stats.pts);

  return (
    <div style={ST.card}>
      <div style={ST.ct}>🏆 Ranking — Fase Eliminatoria</div>
      {sorted.map(({ u, stats }, i) => {
        const yo = ses?.id === u.id;
        return (
          <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, marginBottom: 5, border: `1px solid ${yo ? "#3b82f6" : "#1e293b"}`, background: yo ? "rgba(59,130,246,.06)" : "transparent" }}>
            <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span style={{ color: "#475569", fontWeight: 700, fontSize: 14 }}>{i + 1}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: yo ? "#60a5fa" : "#e2e8f0", fontSize: 14 }}>
                {u.apodo || u.nom}{yo && <span style={{ fontSize: 11, color: "#60a5fa", marginLeft: 5 }}>(tú)</span>}
              </div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{stats.tot} ap · 🟢{stats.ex} · 🟡{stats.gn} · ⚫{stats.fn}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fbbf24" }}>{stats.pts}<span style={{ fontSize: 11, color: "#475569", marginLeft: 2 }}>pts</span></div>
          </div>
        );
      })}
      {!users.length && <div style={{ color: "#475569", fontSize: 13 }}>Sin jugadores</div>}
    </div>
  );
}
