// Anter/src/services/posts.js
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const postsCollection = collection(db, 'posts');

// دالة إنشاء منشور جديد
export const createPost = async (userId, text, imageUrl = null) => {
  try {
    await addDoc(postsCollection, {
      userId,
      text,
      imageUrl,
      likesCount: 0,
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
      // تحويل تاريخ الإنشاء إلى تنسيق قابل للقراءة إذا كان موجوداً
      createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
    }));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// هنا سيتم إضافة دوال التفاعل (الإعجاب، التعليق، الحذف، التعديل) لاحقاً
