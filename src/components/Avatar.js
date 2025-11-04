// Anter/src/components/Avatar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Avatar = ({ uri, size = 40 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.text}>صورة</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
});

export default Avatar;
