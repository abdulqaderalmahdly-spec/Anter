// Anter/src/screens/ChatsListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getCurrentUser } from '../services/auth';
import { subscribeToUserChats } from '../services/chats';
import ChatItem from '../components/ChatItem';
import { COLORS } from '../constants/colors';

const ChatsListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserChats(currentUser.uid, (fetchedChats) => {
      setChats(fetchedChats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleChatPress = (chat) => {
    // تحديد المستخدم الآخر في المحادثة
    const otherUserId = chat.users.find(uid => uid !== currentUser.uid);
    
    // بيانات وهمية للمستخدم الآخر (يجب جلبها من Firestore في تطبيق حقيقي)
    const otherUser = {
      uid: otherUserId,
      displayName: `مستخدم ${otherUserId.substring(0, 4)}`,
    };

    navigation.navigate('Chat', { chatId: chat.id, otherUser });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item)}>
            <ChatItem chat={item} currentUserId={currentUser.uid} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>لا توجد محادثات حالياً.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.lightText,
    textAlign: 'right',
  },
});

export default ChatsListScreen;
