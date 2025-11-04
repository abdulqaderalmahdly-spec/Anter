// Anter/src/components/PostCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import Avatar from './Avatar';
import { formatDate } from '../utils/formatDate';

const PostCard = ({ post, onLike, onComment, onProfilePress }) => {
  // بيانات وهمية للمستخدم حتى يتم تطبيق نظام المستخدم كاملاً
  const dummyUser = {
    displayName: 'مستخدم تجريبي',
    photoURL: null,
  };

  return (
    <View style={styles.card}>
      {/* رأس المنشور */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{dummyUser.displayName}</Text>
          <Text style={styles.timestamp}>{formatDate(post.createdAt)}</Text>
        </View>
        <TouchableOpacity onPress={() => onProfilePress(post.userId)}>
          <Avatar uri={dummyUser.photoURL} size={40} />
        </TouchableOpacity>
      </View>

      {/* محتوى المنشور */}
      <Text style={styles.postText}>{post.text}</Text>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}

      {/* التفاعلات */}
      <View style={styles.actions}>
        <Text style={styles.actionText}>❤️ {post.likesCount || 0}</Text>
        <Text style={styles.actionText}>💬 {post.commentsCount || 0}</Text>
      </View>

      {/* أزرار التفاعل */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onComment}>
          <Text style={styles.buttonText}>تعليق</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLike}>
          <Text style={styles.buttonText}>إعجاب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  postText: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 10,
    color: COLORS.text,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.lightText,
    marginRight: 15,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    paddingTop: 5,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default PostCard;
