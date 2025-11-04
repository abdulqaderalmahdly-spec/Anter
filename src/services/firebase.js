// Anter/src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { setDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore'; // تم إضافة setDoc, arrayUnion, arrayRemove, increment

// يجب استبدال هذه الإعدادات بإعدادات مشروع Firebase الخاص بك
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { setDoc, arrayUnion, arrayRemove, increment }; // تصدير setDoc, arrayUnion, arrayRemove, increment

// ملاحظة: يجب على المستخدم استبدال قيم firebaseConfig الفعلية
