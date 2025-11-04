// Anter/src/screens/StoriesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { fetchActiveStories } from '../services/stories';
import { getCurrentUser } from '../services/auth';
import { COLORS } from '../constants/colors';

const StoriesScreen = ({ navigation }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const loadStories = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        // يجب جلب قائمة المستخدمين المتابعين أولاً
        // حالياً، نستخدم قائمة وهمية أو نعتبر أن المستخدم يتابع نفسه
        const followingUserIds = [currentUser.uid]; 
        const fetchedStories = await fetchActiveStories(followingUserIds);
        setStories(fetchedStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, [currentUser]);

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity style={styles.storyItem} onPress={() => viewStory(item)}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.storyImage}>
        <Text style={styles.storyText}>{item.text}</Text>
        <Text style={styles.storyViews}>👁️ {item.views}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const viewStory = (story) => {
    // منطق عرض القصة (يمكن استخدام مكتبة خارجية أو شاشة عرض مخصصة)
    Alert.alert('عرض القصة', `القصة من: ${story.userId}\nالمحتوى: ${story.text || 'صورة فقط'}`);
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
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={renderStoryItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>لا توجد قصص نشطة حالياً.</Text>
            <Button title="نشر قصة جديدة" onPress={() => navigation.navigate('CreateStory')} color={COLORS.primary} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    padding: 10,
  },
  storyItem: {
    flex: 1,
    margin: 5,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  storyImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  storyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  storyViews: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.lightText,
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default StoriesScreen;
