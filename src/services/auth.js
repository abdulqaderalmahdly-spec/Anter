// Anter/src/services/auth.js
import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// ... (دوال login, register, logout, getCurrentUser كما هي)

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message);
  }
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // إضافة وثيقة للمستخدم الجديد في Firestore لتخزين بيانات الملف الشخصي والمتابعات والحظر
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      email: email,
      displayName: 'مستخدم جديد',
      bio: '',
      followers: [],
      following: [],
      blockedUsers: [],
      createdAt: new Date(),
    });
    return userCredential.user;
  } catch (error) {
    console.error("Register Error:", error);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error(error.message);
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// دوال المتابعة والحظر (تتطلب Firestore)
export const followUser = async (currentUserId, targetUserId) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const targetUserRef = doc(db, 'users', targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUserId)
  });
  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUserId)
  });
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const targetUserRef = doc(db, 'users', targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId)
  });
  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId)
  });
};

export const blockUser = async (currentUserId, targetUserId) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  await updateDoc(currentUserRef, {
    blockedUsers: arrayUnion(targetUserId)
  });
  // إلغاء المتابعة تلقائياً عند الحظر
  await unfollowUser(currentUserId, targetUserId);
};

export const unblockUser = async (currentUserId, targetUserId) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  await updateDoc(currentUserRef, {
    blockedUsers: arrayRemove(targetUserId)
  });
};
