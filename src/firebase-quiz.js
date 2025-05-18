// src/firebase-quiz.js
import { db } from './firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// 시험 문제 저장 함수
export const saveQuizToFirebase = async (testId, questions) => {
  try {
    console.log("🔥 Firebase에 문제 저장 시도:", testId);
    await setDoc(doc(db, 'quizzes', testId), { questions });
    console.log('✅ 문제 저장 성공:', testId);
  } catch (error) {
    console.error('❌ 문제 저장 실패:', error);
  }
};

// 시험 문제 불러오기 함수
export const loadQuizFromFirebase = async (testId) => {
  try {
    const docRef = doc(db, 'quizzes', testId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('✅ 문제 불러오기 성공:', testId);
      return docSnap.data().questions;
    } else {
      console.warn('⚠️ 해당 시험 ID 문서 없음:', testId);
      return null;
    }
  } catch (error) {
    console.error('❌ 문제 불러오기 실패:', error);
    return null;
  }
};
