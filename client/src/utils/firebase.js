

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "talent-ai-61fb3.firebaseapp.com",
  projectId: "talent-ai-61fb3",
  storageBucket: "talent-ai-61fb3.firebasestorage.app",
  messagingSenderId: "372310873127",
  appId: "1:372310873127:web:86770a6c82b9c3a725ea02"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };