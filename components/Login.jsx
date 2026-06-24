// components/Login.jsx
"use client";
import { useState } from "react";
import { ADMIN_PASS, CLAVE_INI } from "../lib/data";

export default function Login({ users, onLogin, onAdmin }) {
  const [modo, setModo] = useState("in");
  const [nom, setNom] = useState("");
  const [pw, setPw] = useState("");
  const [ap, setAp] = useState("");
  const [err, setErr] = useState("");

  function norm(s) {
    return (s || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function doIn() {
    const u = users.find((x) => norm(x.nom) === norm(nom));
    if (!u) return setErr("❌ Usuario no encontrado");
    if (u.pw !== pw.trim()) return setErr("❌ Contraseña incorrecta");
    setErr("");
    onLogin(u.id, u.pw === CLAVE_INI);
  }

  function doAdmin() {
    if (ap === ADMIN_PASS) {
      setErr("");
      onAdmin();
    } else setErr("❌ Clave incorrecta");
  }

  const inputStyle = {
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#e2e8f0",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };
  const lblStyle = { fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 2, display: "block" };
  const btnStyle = {
    border: "none",
    color: "#fff",
    borderRadius: 8,
    padding: "11px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0f1e,#0d1f3c)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#0d1526", borderRadius: 16, padding: "24px 20px", border: "1px solid #1e3a5f" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 52 }}>🏆</div>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 4, color: "#fbbf24" }}>MUNDIAL 2026</div>
          <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 2, marginTop: 4, fontWeight: 700 }}>⚡ FASE ELIMINATORIA</div>
          <div style={{ fontSize: 10, color: "#475569", letterSpacing: 4, marginTop: 2 }}>USA · CANADA · MEXICO</div>
        </div>

        <div style={{ display: "flex", gap: 2, background: "#0a0f1e", borderRadius: 10, padding: 4, marginBottom: 14 }}>
          {[["in", "👤 Jugador"], ["adm", "🔐 Admin"]].map(([k, l]) => (
            <button
              key={k}
              onClick={() => { setModo(k); setErr(""); }}
              style={{
                flex: 1,
                background: modo === k ? "#1e3a5f" : "transparent",
                border: "none",
                color: modo === k ? "#fbbf24" : "#64748b",
                padding: "7px",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {modo === "in" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={lblStyle}>Nombre</label>
            <input style={inputStyle} value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Tu nombre..." onKeyDown={(e) => e.key === "Enter" && doIn()} />
            <label style={lblStyle}>Contraseña</label>
            <input style={inputStyle} type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••" onKeyDown={(e) => e.key === "Enter" && doIn()} />
            {err && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", borderRadius: 6, padding: "6px 10px", fontSize: 13 }}>{err}</div>}
            <button style={{ ...btnStyle, background: "linear-gradient(135deg,#3b82f6,#6366f1)" }} onClick={doIn}>
              Entrar →
            </button>
            <div style={{ background: "rgba(59,130,246,.08)", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#64748b", textAlign: "center" }}>
              Primera vez: clave <b style={{ color: "#fbbf24" }}>1234</b>
            </div>
            {users.length > 0 && (
              <div style={{ marginTop: 10, borderTop: "1px solid #1e293b", paddingTop: 10 }}>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>JUGADORES ({users.length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {users.map((u) => (
                    <span
                      key={u.id}
                      onClick={() => setNom(u.nom)}
                      style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "#94a3b8", cursor: "pointer" }}
                    >
                      {u.apodo || u.nom}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {modo === "adm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: "rgba(245,158,11,.1)", border: "1px solid #f59e0b", borderRadius: 8, padding: 8, color: "#f59e0b", fontSize: 13, fontWeight: 700, textAlign: "center" }}>
              🔐 Acceso Admin
            </div>
            <label style={lblStyle}>Clave</label>
            <input style={inputStyle} type="password" value={ap} onChange={(e) => setAp(e.target.value)} placeholder="Clave..." onKeyDown={(e) => e.key === "Enter" && doAdmin()} />
            {err && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", borderRadius: 6, padding: "6px 10px", fontSize: 13 }}>{err}</div>}
            <button style={{ ...btnStyle, background: "linear-gradient(135deg,#f59e0b,#ef4444)" }} onClick={doAdmin}>
              Acceder →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

