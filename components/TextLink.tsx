import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TextLinkProps {
  text: string;
  onPress: () => void;
}

export const TextLink: React.FC<TextLinkProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
