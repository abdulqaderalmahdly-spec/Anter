// Anter/src/services/stories.js
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const storiesCollection = collection(db, 'stories');

// دالة نشر قصة جديدة
export const publishStory = async (userId, imageUrl, text = null) => {
  try {
    // تاريخ انتهاء الصلاحية (24 ساعة من الآن)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    await addDoc(storiesCollection, {
      userId,
      imageUrl,
      text,
      views: 0,
      createdAt: serverTimestamp(),
      expiresAt: expiryDate,
    });
    console.log('Story published successfully');
  } catch (error) {
    console.error('Error publishing story:', error);
    throw error;
  }
};

// دالة جلب القصص النشطة للمستخدمين الذين تتابعهم
export const fetchActiveStories = async (followingUserIds) => {
  try {
    const now = new Date();
    // جلب القصص التي لم تنته صلاحيتها والتي تخص المستخدمين المتابعين
    const q = query(
      storiesCollection,
      where('userId', 'in', followingUserIds),
      where('expiresAt', '>', now)
    );

    const querySnapshot = await getDocs(q);
    const stories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));
    return stories;
  } catch (error) {
    console.error('Error fetching active stories:', error);
    // في حالة عدم وجود مستخدمين للمتابعة، قد يحدث خطأ في Firebase، لذا نرجع مصفوفة فارغة
    if (error.code === 'failed-precondition') {
      return [];
    }
    throw error;
  }
};
