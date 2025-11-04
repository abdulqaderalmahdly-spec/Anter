// Anter/src/screens/FeedScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>شاشة الخلاصة (FeedScreen)</Text>
      <Text style={styles.text}>هنا ستظهر منشورات المستخدمين الذين تتابعهم.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default FeedScreen;
