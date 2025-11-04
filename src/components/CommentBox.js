// Anter/src/components/CommentBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentBox = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>صندوق التعليق (CommentBox)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  text: {
    textAlign: 'right',
  },
});

export default CommentBox;
