// Anter/src/components/ChatItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatItem = ({ chat }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>عنصر المحادثة (ChatItem)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    textAlign: 'right',
  },
});

export default ChatItem;
