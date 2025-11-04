// Anter/src/services/chats.js
import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';

// دالة إرسال رسالة
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  try {
    const chatRef = doc(db, 'chats', chatId);
    const messagesCollection = collection(chatRef, 'messages');

    await addDoc(messagesCollection, {
      senderId,
      text,
      timestamp: new Date(),
    });

    // تحديث آخر رسالة في وثيقة الدردشة الرئيسية
    await setDoc(chatRef, {
      lastMessage: text,
      lastMessageAt: new Date(),
      users: [senderId, receiverId],
    }, { merge: true });

  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// دالة جلب قائمة الرسائل في محادثة معينة (استخدام onSnapshot للاستماع للتغييرات)
export const subscribeToChatMessages = (chatId, callback) => {
  const messagesCollection = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesCollection, orderBy('timestamp', 'asc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString(),
    }));
    callback(messages);
  });

  return unsubscribe;
};

// دالة جلب قائمة المحادثات للمستخدم (استخدام onSnapshot للاستماع للتغييرات)
export const subscribeToUserChats = (userId, callback) => {
  const chatsCollection = collection(db, 'chats');
  const q = query(chatsCollection, orderBy('lastMessageAt', 'desc')); // يجب إضافة شرط where('users', 'array-contains', userId) في تطبيق حقيقي

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })).filter(chat => chat.users && chat.users.includes(userId)); // تصفية مؤقتة

    callback(chats);
  });

  return unsubscribe;
};
