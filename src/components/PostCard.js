// Anter/src/components/PostCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>بطاقة المنشور (PostCard)</Text>
      {/* سيتم إضافة تفاصيل المنشور هنا */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  text: {
    textAlign: 'right',
  },
});

export default PostCard;
