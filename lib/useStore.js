// lib/useStore.js
import { useState, useEffect, useCallback } from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { calcTop8, allGDone } from "./logic";
import { CLAVE_INI } from "./data";

// Documento único con el estado del torneo: resultados grupo, KO, top8, avanza
const TORNEO_DOC = doc(db, "torneo", "estado");
const USERS_COL = collection(db, "usuarios");

export function useTorneo() {
  const [rg, setRg] = useState({});
  const [rko, setRko] = useState({});
  const [top8, setTop8] = useState([]);
  const [avanza, setAvanza] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(TORNEO_DOC, (snap) => {
      const data = snap.data() || {};
      setRg(data.rg || {});
      setRko(data.rko || {});
      setTop8(data.top8 || []);
      setAvanza(data.avanza || {});
      setLoaded(true);
    });
    return unsub;
  }, []);

  const saveResultadoGrupo = useCallback(async (matchId, l, v) => {
    const newRg = { ...rg, [matchId]: { l, v } };
    const newTop8 = allGDone(newRg) ? calcTop8(newRg) : top8;
    await setDoc(TORNEO_DOC, { rg: newRg, top8: newTop8 }, { merge: true });
  }, [rg, top8]);

  const saveResultadoKO = useCallback(async (matchId, l, v) => {
    const newRko = { ...rko, [matchId]: { l, v } };
    await setDoc(TORNEO_DOC, { rko: newRko }, { merge: true });
  }, [rko]);

  const saveAvanza = useCallback(async (matchId, equipo) => {
    const newAvanza = { ...avanza, [matchId]: equipo };
    await setDoc(TORNEO_DOC, { avanza: newAvanza }, { merge: true });
  }, [avanza]);

  const undoAvanza = useCallback(async (matchId) => {
    const newAvanza = { ...avanza };
    delete newAvanza[matchId];
    await setDoc(TORNEO_DOC, { avanza: newAvanza }, { merge: true });
  }, [avanza]);

  return {
    rg, rko, top8, avanza, loaded,
    saveResultadoGrupo, saveResultadoKO, saveAvanza, undoAvanza,
  };
}

export function useUsuarios() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const q = query(USERS_COL, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoaded(true);
    });
    return unsub;
  }, []);

  const crearUsuario = useCallback(async (nom, apodo) => {
    const id = String(Date.now());
    await setDoc(doc(USERS_COL, id), {
      nom,
      apodo: apodo || "",
      pw: CLAVE_INI,
      b1: {},
      b2: {},
      gc: false,
      fc: {},
      createdAt: Date.now(),
    });
    return id;
  }, []);

  const actualizarUsuario = useCallback(async (id, patch) => {
    await setDoc(doc(USERS_COL, id), patch, { merge: true });
  }, []);

  return { users, loaded, crearUsuario, actualizarUsuario };
}
