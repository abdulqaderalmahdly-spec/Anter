// Anter/src/screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../services/posts';
import { getCurrentUser } from '../services/auth';
import { uploadFile } from '../services/storage';
import { COLORS } from '../constants/colors';

const CreatePostScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!text.trim() && !imageUri) {
      Alert.alert('خطأ', 'الرجاء كتابة محتوى المنشور أو اختيار صورة.');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      Alert.alert('خطأ', 'يجب تسجيل الدخول لإنشاء منشور.');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    try {
      if (imageUri) {
        const path = `posts/${user.uid}/${Date.now()}`;
        imageUrl = await uploadFile(imageUri, path);
      }

      await createPost(user.uid, text.trim(), imageUrl);
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
      
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <Button title="إزالة الصورة" onPress={() => setImageUri(null)} color={COLORS.danger} />
        </View>
      )}

      <Button title="اختيار صورة" onPress={pickImage} color={COLORS.secondary} />
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title={loading ? 'جاري النشر...' : 'نشر'} 
          onPress={handleCreatePost} 
          color={COLORS.primary} 
          disabled={loading}
        />
      </View>
      {loading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 10 }} />}
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
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'right',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default CreatePostScreen;
