// Anter/src/components/StoryItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StoryItem = ({ story }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>عنصر القصة (StoryItem)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default StoryItem;
