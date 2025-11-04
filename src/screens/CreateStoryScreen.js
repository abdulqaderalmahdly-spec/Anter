// Anter/src/screens/CreateStoryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateStoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>شاشة إنشاء قصة (CreateStoryScreen)</Text>
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

export default CreateStoryScreen;
