// Anter/src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import StoriesScreen from '../screens/StoriesScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CreateStoryScreen from '../screens/CreateStoryScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'الخلاصة' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'تفاصيل المنشور' }} />
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'الرسائل' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'محادثة' }} />
      <Stack.Screen name="Stories" component={StoriesScreen} options={{ title: 'القصص' }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'إنشاء منشور' }} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} options={{ title: 'إنشاء قصة' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'تعديل الملف الشخصي' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
