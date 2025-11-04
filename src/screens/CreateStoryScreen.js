// Anter/src/screens/CreateStoryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { publishStory } from '../services/stories';
import { getCurrentUser } from '../services/auth';
import { uploadFile } from '../services/storage';
import { COLORS } from '../constants/colors';

const CreateStoryScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16], // نسبة شاشة الهاتف
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePublishStory = async () => {
    if (!imageUri) {
      Alert.alert('خطأ', 'الرجاء اختيار صورة للقصة.');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      Alert.alert('خطأ', 'يجب تسجيل الدخول لنشر قصة.');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    try {
      const path = `stories/${user.uid}/${Date.now()}`;
      imageUrl = await uploadFile(imageUri, path);

      await publishStory(user.uid, imageUrl, text.trim());
      Alert.alert('نجاح', 'تم نشر القصة بنجاح!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في نشر القصة.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء قصة جديدة</Text>
      
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}

      <Button title="اختيار صورة القصة" onPress={pickImage} color={COLORS.secondary} />

      <TextInput
        style={styles.input}
        placeholder="نص اختياري للقصة"
        placeholderTextColor={COLORS.lightText}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
        textAlign="right"
      />
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title={loading ? 'جاري النشر...' : 'نشر القصة'} 
          onPress={handlePublishStory} 
          color={COLORS.primary} 
          disabled={loading || !imageUri}
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
    marginTop: 20,
    fontSize: 16,
    minHeight: 80,
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
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default CreateStoryScreen;
