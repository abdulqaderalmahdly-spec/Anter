// Anter/src/screens/EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { getCurrentUser } from '../services/auth';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { COLORS } from '../constants/colors';

const EditProfileScreen = ({ navigation }) => {
  const currentUser = getCurrentUser();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigation.goBack();
      return;
    }

    const loadProfile = async () => {
      const userRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || '');
        setBio(data.bio || '');
      }
      setLoading(false);
    };
    loadProfile();
  }, [currentUser, navigation]);

  const handleSave = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        bio: bio.trim(),
      });
      Alert.alert('نجاح', 'تم حفظ التغييرات بنجاح.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في حفظ التغييرات.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>جاري تحميل البيانات...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>تعديل الملف الشخصي</Text>
      
      <Text style={styles.label}>الاسم المعروض</Text>
      <TextInput
        style={styles.input}
        placeholder="الاسم المعروض"
        placeholderTextColor={COLORS.lightText}
        value={displayName}
        onChangeText={setDisplayName}
        textAlign="right"
      />

      <Text style={styles.label}>السيرة الذاتية (Bio)</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="اكتب شيئاً عن نفسك..."
        placeholderTextColor={COLORS.lightText}
        value={bio}
        onChangeText={setBio}
        multiline
        textAlignVertical="top"
        textAlign="right"
      />

      <Button 
        title={loading ? 'جاري الحفظ...' : 'حفظ التغييرات'} 
        onPress={handleSave} 
        color={COLORS.primary} 
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    color: COLORS.text,
  },
  label: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 5,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bioInput: {
    minHeight: 100,
  },
  text: {
    textAlign: 'right',
  }
});

export default EditProfileScreen;
