// Anter/src/components/ChatItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { COLORS } from '../constants/colors';

const ChatItem = ({ chat, currentUserId }) => {
  // تحديد المستخدم الآخر
  const otherUserId = chat.users.find(uid => uid !== currentUserId);
  
  // بيانات وهمية للمستخدم الآخر
  const otherUser = {
    displayName: `مستخدم ${otherUserId.substring(0, 4)}`,
    photoURL: null,
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.username}>{otherUser.displayName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {chat.lastMessage || 'ابدأ محادثة جديدة'}
        </Text>
      </View>
      <Avatar uri={otherUser.photoURL} size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'right',
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.lightText,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default ChatItem;
