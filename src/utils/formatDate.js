// Anter/src/utils/formatDate.js
// دالة مساعدة لتنسيق التاريخ (مثال بسيط)
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
