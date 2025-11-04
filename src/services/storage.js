// Anter/src/services/storage.js
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// دالة لرفع ملف (صورة) إلى Firebase Storage
export const uploadFile = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytes(storageRef, blob);
    
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
