// Anter/src/screens/ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getCurrentUser } from '../services/auth';
import { sendMessage, subscribeToChatMessages } from '../services/chats';
import { COLORS } from '../constants/colors';

const ChatScreen = ({ route, navigation }) => {
  const { chatId, otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigation.goBack();
      return;
    }

    // تعيين عنوان الشاشة باسم المستخدم الآخر
    navigation.setOptions({ title: otherUser.displayName || 'محادثة' });

    // الاشتراك في رسائل الدردشة
    const unsubscribe = subscribeToChatMessages(chatId, (newMessages) => {
      // تحويل تنسيق الرسائل ليتوافق مع GiftedChat
      const giftedMessages = newMessages.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.senderId,
          name: msg.senderId === currentUser.uid ? currentUser.displayName : otherUser.displayName,
          // avatar: 'https://placeimg.com/140/140/any', // يمكن إضافة صورة رمزية هنا
        },
      })).reverse(); // GiftedChat يتوقع الرسائل بترتيب عكسي (الأحدث أولاً)

      setMessages(giftedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId, currentUser, otherUser.displayName, navigation]);

  const onSend = useCallback(async (newMessages = []) => {
    const messageToSend = newMessages[0];
    
    try {
      await sendMessage(chatId, currentUser.uid, otherUser.uid, messageToSend.text);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [chatId, currentUser, otherUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUser.uid,
      }}
      placeholder="اكتب رسالتك..."
      renderLoading={() => <ActivityIndicator size="small" color={COLORS.primary} />}
      renderUsernameOnMessage={true}
      // دعم RTL
      locale="ar"
      textInputStyle={{ textAlign: 'right' }}
      messagesContainerStyle={{ transform: [{ scaleY: -1 }] }} // لعرض الرسائل بترتيب صحيح مع RTL
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default ChatScreen;
