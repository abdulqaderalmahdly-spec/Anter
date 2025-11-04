// Anter/src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { login } from '../services/auth';
import { COLORS } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }
    try {
      await login(email, password);
      // في تطبيق حقيقي، سيتم إعادة توجيه المستخدم إلى الشاشة الرئيسية (Feed)
      Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح! (في التطبيق الحقيقي سيتم الانتقال)');
    } catch (error) {
      Alert.alert('خطأ في تسجيل الدخول', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
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
      <Button title="تسجيل الدخول" onPress={handleLogin} color={COLORS.primary} />
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>ليس لديك حساب؟ </Text>
        <Button title="إنشاء حساب" onPress={() => navigation.navigate('Register')} color={COLORS.secondary} />
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

export default LoginScreen;
