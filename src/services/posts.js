// Anter/src/services/posts.js
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  increment
} from 'firebase/firestore';

const postsCollection = collection(db, 'posts');

// دالة إنشاء منشور جديد
export const createPost = async (userId, text, imageUrl = null) => {
  try {
    await addDoc(postsCollection, {
      userId,
      text,
      imageUrl,
      likes: [], // قائمة بمعرفات المستخدمين الذين أعجبوا بالمنشور
      commentsCount: 0,
      createdAt: serverTimestamp(),
    });
    console.log('Post created successfully');
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// دالة جلب جميع المنشورات (مرتبة زمنياً)
export const fetchPosts = async () => {
  try {
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      likesCount: doc.data().likes?.length || 0, // حساب عدد الإعجابات
      createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
    }));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// دالة الإعجاب بالمنشور
export const likePost = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

// دالة إلغاء الإعجاب بالمنشور
export const unlikePost = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId),
  });
};

// دالة إضافة تعليق
export const addComment = async (postId, userId, text) => {
  const commentsCollection = collection(db, 'posts', postId, 'comments');
  await addDoc(commentsCollection, {
    userId,
    text,
    createdAt: serverTimestamp(),
  });
  // تحديث عداد التعليقات في وثيقة المنشور الرئيسية
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    commentsCount: increment(1),
  });
};

// دالة جلب التعليقات
export const fetchComments = async (postId) => {
  const commentsCollection = collection(db, 'posts', postId, 'comments');
  const q = query(commentsCollection, orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
  }));
};

// دالة إرسال نكز (Poke) - يتم تخزينها في مجموعة الإشعارات
export const sendPoke = async (senderId, receiverId) => {
  const notificationsCollection = collection(db, 'notifications');
  await addDoc(notificationsCollection, {
    type: 'poke',
    senderId,
    receiverId,
    read: false,
    createdAt: serverTimestamp(),
  });
};
