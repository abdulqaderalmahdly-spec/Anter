// Anter/src/screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { createPost } from '../services/posts';
import { getCurrentUser } from '../services/auth';
import { COLORS } from '../constants/colors';

const CreatePostScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!text.trim()) {
      Alert.alert('خطأ', 'الرجاء كتابة محتوى المنشور.');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      Alert.alert('خطأ', 'يجب تسجيل الدخول لإنشاء منشور.');
      return;
    }

    setLoading(true);
    try {
      // حالياً، لا يوجد دعم لرفع الصور، لذا نمرر null
      await createPost(user.uid, text.trim());
      Alert.alert('نجاح', 'تم نشر المنشور بنجاح!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في نشر المنشور.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء منشور جديد</Text>
      <TextInput
        style={styles.input}
        placeholder="ماذا يدور في ذهنك؟"
        placeholderTextColor={COLORS.lightText}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
        textAlign="right"
      />
      <Button 
        title={loading ? 'جاري النشر...' : 'نشر'} 
        onPress={handleCreatePost} 
        color={COLORS.primary} 
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'right',
  },
});

export default CreatePostScreen;
