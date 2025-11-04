// Anter/src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { register } from '../services/auth';
import { COLORS } from '../constants/colors';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }
    try {
      await register(email, password);
      Alert.alert('نجاح', 'تم إنشاء الحساب بنجاح! (في التطبيق الحقيقي سيتم الانتقال)');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('خطأ في التسجيل', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب جديد</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        placeholderTextColor={COLORS.lightText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        placeholderTextColor={COLORS.lightText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textAlign="right"
      />
      <Button title="إنشاء حساب" onPress={handleRegister} color={COLORS.primary} />
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>لديك حساب بالفعل؟ </Text>
        <Button title="تسجيل الدخول" onPress={() => navigation.navigate('Login')} color={COLORS.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 40,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  linkContainer: {
    marginTop: 20,
    flexDirection: 'row-reverse', // لعرض العناصر من اليمين لليسار
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default RegisterScreen;
