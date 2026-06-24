// components/App.jsx
"use client";
import { useState, useMemo } from "react";
import Login from "./Login";
import CambiarClave from "./CambiarClave";
import GruposView from "./views/GruposView";
import BracketView from "./views/BracketView";
import ApostarView from "./views/ApostarView";
import VerView from "./views/VerView";
import RankingView from "./views/RankingView";
import AdminView from "./views/AdminView";
import PerfilModal from "./views/PerfilModal";
import { useTorneo, useUsuarios } from "../lib/useStore";
import { calcKO } from "../lib/logic";
import { allGDone } from "../lib/logic";

export default function App() {
  const { rg, rko, top8, avanza, loaded: torneoLoaded, saveResultadoGrupo, saveResultadoKO, saveAvanza, undoAvanza } = useTorneo();
  const { users, loaded: usersLoaded, crearUsuario, actualizarUsuario } = useUsuarios();

  const [ses, setSes] = useState(null); // {id, admin, primero}
  const [tab, setTab] = useState("g");
  const [showPerfil, setShowPerfil] = useState(false);
  const [showClave, setShowClave] = useState(false);

  const isAdmin = ses?.admin;
  const me = ses && !isAdmin ? users.find((u) => u.id === ses.id) : null;
  const agd = allGDone(rg);
  const ko = useMemo(() => calcKO(rg, rko, top8, avanza), [rg, rko, top8, avanza]);

  if (!torneoLoaded || !usersLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
          <div style={{ color: "#64748b" }}>Cargando...</div>
        </div>
      </div>
    );
  }

  if (!ses) {
    return (
      <Login
        users={users}
        onLogin={(id, primero) => { setSes({ id, admin: false, primero }); setTab("g"); }}
        onAdmin={() => { setSes({ admin: true }); setTab("adm"); }}
      />
    );
  }

  if (ses.primero && me) {
    return (
      <CambiarClave
        user={me}
        obligatorio={true}
        onDone={async (nv) => {
          await actualizarUsuario(me.id, { pw: nv });
          setSes((p) => ({ ...p, primero: false }));
        }}
      />
    );
  }

  const navItems = isAdmin
    ? [["adm", "⚙️ ADMIN"], ["g", "📊 Grupos"], ["b", "🗺 Cuadro"], ["v", "👁 Ver"], ["r", "🏆 Ranking"]]
    : [["g", "📊 Grupos"], ["b", "🗺 Cuadro"], ["p", "🎯 Apostar"], ["v", "👁 Ver"], ["r", "🏆 Ranking"]];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", fontFamily: "system-ui,sans-serif" }}>
      <header style={{ background: "#0d1526", borderBottom: "1px solid #1e3a5f", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🏆</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 3, color: "#fbbf24" }}>MUNDIAL 2026</div>
              <div style={{ fontSize: 9, color: "#a78bfa", letterSpacing: 1, fontWeight: 700 }}>FASE ELIMINATORIA</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {isAdmin ? (
              <button
                onClick={() => setTab("adm")}
                style={{ background: "rgba(245,158,11,.15)", border: "1px solid #f59e0b", borderRadius: 20, padding: "4px 10px", fontSize: 12, color: "#f59e0b", fontWeight: 700, cursor: "pointer" }}
              >
                🔐 ADMIN
              </button>
            ) : (
              <button
                onClick={() => setShowPerfil(true)}
                style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: "4px 10px", fontSize: 12, color: "#94a3b8", cursor: "pointer" }}
              >
                👤 {me?.apodo || me?.nom}
              </button>
            )}
            <button
              onClick={() => setSes(null)}
              style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}
            >
              Salir
            </button>
          </div>
        </div>
        <nav style={{ display: "flex", overflowX: "auto", padding: "0 8px" }}>
          {navItems.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                background: isAdmin && k === "adm" ? "rgba(245,158,11,.12)" : "transparent",
                border: "none",
                color: tab === k ? "#fbbf24" : isAdmin && k === "adm" ? "#f59e0b" : "#64748b",
                padding: "9px 10px",
                fontSize: 12,
                fontWeight: isAdmin && k === "adm" ? 800 : 600,
                borderBottom: tab === k ? "2px solid #fbbf24" : "2px solid transparent",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: "8px 6px", maxWidth: 900, margin: "0 auto" }}>
        {tab === "g" && (
          <GruposView
            isAdmin={isAdmin}
            rg={rg}
            agd={agd}
            top8={top8}
            saveResultadoGrupo={saveResultadoGrupo}
          />
        )}
        {tab === "b" && (
          <BracketView
            isAdmin={isAdmin}
            rg={rg}
            top8={top8}
            ko={ko}
            avanza={avanza}
            saveResultadoKO={saveResultadoKO}
            saveAvanza={saveAvanza}
            undoAvanza={undoAvanza}
          />
        )}
        {tab === "p" && !isAdmin && (
          <ApostarView
            me={me}
            ko={ko}
            agd={agd}
            actualizarUsuario={actualizarUsuario}
          />
        )}
        {tab === "v" && <VerView users={users} ko={ko} />}
        {tab === "r" && <RankingView users={users} ses={ses} rko={rko} />}
        {tab === "adm" && isAdmin && (
          <AdminView
            users={users}
            rg={rg}
            rko={rko}
            crearUsuario={crearUsuario}
            actualizarUsuario={actualizarUsuario}
          />
        )}
      </main>

      {showPerfil && me && (
        <PerfilModal
          user={me}
          onCambiarClave={() => { setShowPerfil(false); setShowClave(true); }}
          onClose={() => setShowPerfil(false)}
          onEditApodo={(apodo) => actualizarUsuario(me.id, { apodo })}
        />
      )}
      {showClave && me && (
        <CambiarClave
          user={me}
          obligatorio={false}
          onDone={async (nv) => {
            if (nv) await actualizarUsuario(me.id, { pw: nv });
            setShowClave(false);
          }}
        />
      )}
    </div>
  );
}
