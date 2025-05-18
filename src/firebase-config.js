// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAew2Pz8YG6hW2T-qU5Wwcpa3ZOFEjnmM0",
  authDomain: "word-quiz-c906a.firebaseapp.com",
  projectId: "word-quiz-c906a",
  storageBucket: "word-quiz-c906a.firebasestorage.app",
  messagingSenderId: "1030585664281",
  appId: "1:1030585664281:web:a79d7ec9dbd4c26596bb88",
  measurementId: "G-4T1V26MGPE"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 추출
const db = getFirestore(app);

export { db };
