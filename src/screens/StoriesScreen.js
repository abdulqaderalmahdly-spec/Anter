// Anter/src/screens/StoriesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StoriesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>شاشة القصص (StoriesScreen)</mtext>
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

export default StoriesScreen;
