// components/views/PerfilModal.jsx
"use client";

export default function PerfilModal({ user, onCambiarClave, onClose, onEditApodo }) {
  function editApodo() {
    const na = prompt("Nuevo apodo:", user.apodo || "");
    if (na !== null) onEditApodo(na);
  }

  const btnStyle = { width: "100%", border: "none", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
      <div style={{ background: "#0d1526", borderRadius: 16, padding: "22px 20px", border: "1px solid #1e3a5f", width: "100%", maxWidth: 340 }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 40 }}>👤</div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#e2e8f0", marginTop: 6 }}>{user.nom}</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>{user.apodo ? `Apodo: ${user.apodo}` : "Sin apodo"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={editApodo} style={{ ...btnStyle, background: "#1e293b", border: "1px solid #334155", color: "#94a3b8" }}>
            ✏️ Cambiar apodo
          </button>
          <button onClick={onCambiarClave} style={{ ...btnStyle, background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#fff" }}>
            🔑 Cambiar contraseña
          </button>
          <button onClick={onClose} style={{ ...btnStyle, background: "#334155", color: "#fff" }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
