// components/CambiarClave.jsx
"use client";
import { useState } from "react";
import { CLAVE_INI } from "../lib/data";

export default function CambiarClave({ user, obligatorio, onDone }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [conf, setConf] = useState("");
  const [err, setErr] = useState("");

  function go() {
    if (!obligatorio && actual !== user.pw) return setErr("❌ Clave actual incorrecta");
    if (nueva.length < 4) return setErr("❌ Mínimo 4 caracteres");
    if (nueva !== conf) return setErr("❌ No coinciden");
    if (nueva === CLAVE_INI) return setErr("❌ No uses 1234");
    onDone(nueva);
  }

  const inputStyle = {
    background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0",
    borderRadius: 8, padding: "9px 12px", fontSize: 14, width: "100%", outline: "none",
  };
  const lblStyle = { fontSize: 12, color: "#64748b", fontWeight: 600 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
      <div style={{ background: "#0d1526", borderRadius: 16, padding: "22px 20px", border: "1px solid #1e3a5f", width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 36 }}>🔑</div>
          <div style={{ fontWeight: 900, fontSize: 15, color: "#fbbf24", marginTop: 6 }}>
            {obligatorio ? "Crea tu contraseña" : "Cambiar contraseña"}
          </div>
          {obligatorio && <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>Debes cambiar la clave 1234 antes de continuar</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {!obligatorio && (
            <>
              <label style={lblStyle}>Clave actual</label>
              <input style={inputStyle} type="password" value={actual} onChange={(e) => setActual(e.target.value)} placeholder="••••••" />
            </>
          )}
          <label style={lblStyle}>Nueva clave (mín. 4)</label>
          <input style={inputStyle} type="password" value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="Nueva clave..." />
          <label style={lblStyle}>Confirmar</label>
          <input style={inputStyle} type="password" value={conf} onChange={(e) => setConf(e.target.value)} placeholder="Repetir..." onKeyDown={(e) => e.key === "Enter" && go()} />
          {err && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", borderRadius: 6, padding: "6px 10px", fontSize: 13 }}>{err}</div>}
          <button onClick={go} style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", border: "none", color: "#fff", borderRadius: 8, padding: 11, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Guardar →
          </button>
          {!obligatorio && (
            <button onClick={() => onDone(null)} style={{ background: "#334155", border: "none", color: "#fff", borderRadius: 8, padding: 11, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
