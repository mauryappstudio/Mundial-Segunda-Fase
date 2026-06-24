// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuLd9r2zEOD-OWj0C6m1SG45B-dm2UtbM",
  authDomain: "mundial-segunda-fase.firebaseapp.com",
  projectId: "mundial-segunda-fase",
  storageBucket: "mundial-segunda-fase.firebasestorage.app",
  messagingSenderId: "680304113842",
  appId: "1:680304113842:web:2d174f32e2781e0d89b1ab",
};

// Evita reinicializar Firebase en hot-reload de Next.js
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
