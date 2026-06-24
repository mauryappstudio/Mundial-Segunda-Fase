// components/views/AdminView.jsx
"use client";
import { useState } from "react";
import { CLAVE_INI } from "../../lib/data";
import { ST } from "../UI";

export default function AdminView({ users, rg, rko, crearUsuario, actualizarUsuario }) {
  const [nom, setNom] = useState("");
  const [apodo, setApodo] = useState("");
  const [okMsg, setOkMsg] = useState("");

  async function crear() {
    const n = nom.trim();
    if (!n) return;
    const exists = users.find((u) => u.nom.toLowerCase() === n.toLowerCase());
    if (exists) return;
    await crearUsuario(n, apodo.trim());
    setNom("");
    setApodo("");
    setOkMsg("✅ Creado con clave 1234");
    setTimeout(() => setOkMsg(""), 2500);
  }

  function resetClave(u) {
    const np = prompt(`Nueva clave para ${u.nom}:`);
    if (np && np.length >= 4) actualizarUsuario(u.id, { pw: np });
    else if (np) alert("Mínimo 4 caracteres");
  }

  const inputStyle = { background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", borderRadius: 8, padding: "7px 10px", fontSize: 13 };

  return (
    <div>
      <div style={ST.card}>
        <div style={ST.ct}>⚙️ JUGADORES — Fase Eliminatoria</div>
        <div style={{ background: "rgba(59,130,246,.08)", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#60a5fa", marginBottom: 10 }}>
          Crea aquí a cada jugador con su nombre y apodo. Clave inicial para todos: <b>1234</b>. El apodo es lo que verán los demás en el ranking. Deben cambiar la clave al entrar por primera vez.
        </div>

        <div style={{ background: "#0a0f1e", borderRadius: 8, padding: "10px 12px", border: "1px solid #334155", marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700, marginBottom: 8 }}>+ NUEVO JUGADOR</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <input style={{ ...inputStyle, flex: 2, minWidth: 120 }} placeholder="Nombre completo..." value={nom} onChange={(e) => setNom(e.target.value)} />
            <input style={{ ...inputStyle, flex: 1, minWidth: 90 }} placeholder="Apodo..." value={apodo} onChange={(e) => setApodo(e.target.value)} />
            <button onClick={crear} style={{ background: "#10b981", border: "none", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Crear
            </button>
          </div>
          {okMsg && <div style={{ fontSize: 12, color: "#10b981", marginTop: 5 }}>{okMsg}</div>}
        </div>

        {users.map((u) => (
          <div key={u.id} style={{ background: "#0a0f1e", borderRadius: 8, padding: "10px 12px", border: "1px solid #1e293b", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  👤 {u.nom} {u.apodo && <span style={{ color: "#64748b", fontSize: 12, marginLeft: 5 }}>({u.apodo})</span>}
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
                  {Object.keys(u.b2 || {}).length} apuestas
                </div>
              </div>
              <button onClick={() => resetClave(u)} style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", border: "none", color: "#fff", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                🔑 Reset clave
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={ST.card}>
        <div style={ST.ct}>📊 ESTADO</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[["👥", users.length, "Jugadores"], ["⚽", `${Object.keys(rg).length}/72`, "Grupo (F1)"], ["🏆", Object.keys(rko).length, "Eliminatoria"]].map(([ic, v, l]) => (
            <div key={l} style={{ background: "#0a0f1e", borderRadius: 8, padding: 10, textAlign: "center", border: "1px solid #1e293b" }}>
              <span style={{ fontSize: 20 }}>{ic}</span>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#fbbf24" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
